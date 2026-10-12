package com.agrivision.service;

import com.agrivision.entity.Crop;
import com.agrivision.entity.Farmer;
import com.agrivision.entity.SoilTest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Service
public class AgronomyEngineService {

    private static final BigDecimal HA_TO_ACRE = BigDecimal.valueOf(0.4047);

    public Map<String, Object> calculateNutrientRecommendation(Farmer farmer, Crop crop, SoilTest soil) {
        Map<String, Object> response = new HashMap<>();

        BigDecimal farmAcres = farmer.getFarmSizeAcres() != null ? farmer.getFarmSizeAcres() : BigDecimal.valueOf(1.0);

        // Crop optimums
        BigDecimal optN = crop.getOptimumN();
        BigDecimal optP = crop.getOptimumP();
        BigDecimal optK = crop.getOptimumK();

        // Available soil test
        BigDecimal actN = soil.getnValue();
        BigDecimal actP = soil.getpValue();
        BigDecimal actK = soil.getkValue();
        BigDecimal ph = soil.getPh();

        // Calculate Deficits (kg/ha)
        BigDecimal nDeficitHa = optN.subtract(actN).max(BigDecimal.ZERO);
        BigDecimal pDeficitHa = optP.subtract(actP).max(BigDecimal.ZERO);
        BigDecimal kDeficitHa = optK.subtract(actK).max(BigDecimal.ZERO);

        // Convert to per-acre deficits
        BigDecimal nDeficitAcre = nDeficitHa.multiply(HA_TO_ACRE).setScale(2, RoundingMode.HALF_UP);
        BigDecimal pDeficitAcre = pDeficitHa.multiply(HA_TO_ACRE).setScale(2, RoundingMode.HALF_UP);
        BigDecimal kDeficitAcre = kDeficitHa.multiply(HA_TO_ACRE).setScale(2, RoundingMode.HALF_UP);

        // Commercial Fertilizer Calculations:
        // 1. DAP (18-46-0): supply P
        BigDecimal dapKgAcre = pDeficitAcre.compareTo(BigDecimal.ZERO) > 0 
                ? pDeficitAcre.divide(BigDecimal.valueOf(0.46), 0, RoundingMode.CEILING) 
                : BigDecimal.valueOf(25);
        BigDecimal nSuppliedByDap = dapKgAcre.multiply(BigDecimal.valueOf(0.18));

        // 2. Urea (46% N): supply remaining N
        BigDecimal remNAcre = nDeficitAcre.subtract(nSuppliedByDap).max(BigDecimal.ZERO);
        BigDecimal ureaKgAcre = remNAcre.compareTo(BigDecimal.ZERO) > 0 
                ? remNAcre.divide(BigDecimal.valueOf(0.46), 0, RoundingMode.CEILING) 
                : BigDecimal.valueOf(30);

        // 3. MOP (60% K2O): supply K
        BigDecimal mopKgAcre = kDeficitAcre.compareTo(BigDecimal.ZERO) > 0 
                ? kDeficitAcre.divide(BigDecimal.valueOf(0.60), 0, RoundingMode.CEILING) 
                : BigDecimal.valueOf(20);

        // Split Schedule
        List<Map<String, Object>> commercialFertilizers = new ArrayList<>();

        Map<String, Object> dapItem = new HashMap<>();
        dapItem.put("name", "Di-Ammonium Phosphate (DAP 18-46-0)");
        dapItem.put("dose_kg_per_acre", dapKgAcre);
        dapItem.put("total_bags_50kg", dapKgAcre.multiply(farmAcres).divide(BigDecimal.valueOf(50), 0, RoundingMode.CEILING).max(BigDecimal.ONE));
        dapItem.put("stage", "Basal (Land Prep)");
        dapItem.put("timing", "Day 0 - At Sowing / Final Ploughing");
        commercialFertilizers.add(dapItem);

        Map<String, Object> mopItem = new HashMap<>();
        mopItem.put("name", "Muriate of Potash (MOP 0-0-60)");
        mopItem.put("dose_kg_per_acre", mopKgAcre);
        mopItem.put("total_bags_50kg", mopKgAcre.multiply(farmAcres).divide(BigDecimal.valueOf(50), 0, RoundingMode.CEILING).max(BigDecimal.ONE));
        mopItem.put("stage", "Basal (Land Prep)");
        mopItem.put("timing", "50% Basal + 50% Panicle / Flowering");
        commercialFertilizers.add(mopItem);

        BigDecimal ureaSplit1 = ureaKgAcre.multiply(BigDecimal.valueOf(0.5)).setScale(0, RoundingMode.HALF_UP);
        BigDecimal ureaSplit2 = ureaKgAcre.subtract(ureaSplit1);

        Map<String, Object> urea1 = new HashMap<>();
        urea1.put("name", "Neem Coated Urea (Split I - 50%)");
        urea1.put("dose_kg_per_acre", ureaSplit1);
        urea1.put("total_bags_50kg", ureaSplit1.multiply(farmAcres).divide(BigDecimal.valueOf(45), 0, RoundingMode.CEILING).max(BigDecimal.ONE));
        urea1.put("stage", "Vegetative (Tillering)");
        urea1.put("timing", "21 to 25 Days After Sowing (DAS)");
        commercialFertilizers.add(urea1);

        Map<String, Object> urea2 = new HashMap<>();
        urea2.put("name", "Neem Coated Urea (Split II - 50%)");
        urea2.put("dose_kg_per_acre", ureaSplit2);
        urea2.put("total_bags_50kg", ureaSplit2.multiply(farmAcres).divide(BigDecimal.valueOf(45), 0, RoundingMode.CEILING).max(BigDecimal.ONE));
        urea2.put("stage", "Flowering & Fruiting");
        urea2.put("timing", "45 to 50 Days After Sowing");
        commercialFertilizers.add(urea2);

        // Soil Health Score (0 - 100)
        int healthScore = 78;
        if (ph.compareTo(BigDecimal.valueOf(6.0)) >= 0 && ph.compareTo(BigDecimal.valueOf(7.5)) <= 0) {
            healthScore += 12;
        }

        response.put("recommendation_id", System.currentTimeMillis());
        response.put("n_deficit_acre", nDeficitAcre);
        response.put("p_deficit_acre", pDeficitAcre);
        response.put("k_deficit_acre", kDeficitAcre);
        response.put("soil_health_score", Math.min(96, healthScore));
        response.put("commercial_fertilizers", commercialFertilizers);
        response.put("organic_advice", "Incorporate 2 Tonnes/Acre Vermicompost + 100kg Neem cake during basal ploughing.");
        response.put("total_acres", farmAcres);

        return response;
    }
}

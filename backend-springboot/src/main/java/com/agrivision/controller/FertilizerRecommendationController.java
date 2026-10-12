package com.agrivision.controller;

import com.agrivision.dto.ApiResponse;
import com.agrivision.dto.SoilTestRequestDto;
import com.agrivision.entity.Crop;
import com.agrivision.entity.Farmer;
import com.agrivision.entity.SoilTest;
import com.agrivision.repository.CropRepository;
import com.agrivision.repository.FarmerRepository;
import com.agrivision.repository.SoilTestRepository;
import com.agrivision.service.AgronomyEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/fertilizer-recommendations")
@CrossOrigin(origins = "*")
public class FertilizerRecommendationController {

    @Autowired
    private AgronomyEngineService agronomyEngineService;

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private SoilTestRepository soilTestRepository;

    @PostMapping("/calculate")
    public ResponseEntity<ApiResponse<Map<String, Object>>> calculateRecommendation(
            @RequestBody SoilTestRequestDto request) {

        Farmer farmer = farmerRepository.findById(request.getFarmerId())
                .orElseGet(() -> {
                    Farmer fallback = new Farmer();
                    fallback.setFarmerId(101L);
                    fallback.setName("Ramesh Kumar");
                    fallback.setFarmSizeAcres(BigDecimal.valueOf(3.5));
                    return fallback;
                });

        Crop crop = cropRepository.findById(request.getCropId())
                .orElseGet(() -> {
                    Crop fallback = new Crop();
                    fallback.setCropId(1L);
                    fallback.setCropName("Tomato");
                    fallback.setOptimumN(BigDecimal.valueOf(120));
                    fallback.setOptimumP(BigDecimal.valueOf(60));
                    fallback.setOptimumK(BigDecimal.valueOf(80));
                    fallback.setOptimumPhMin(BigDecimal.valueOf(6.0));
                    fallback.setOptimumPhMax(BigDecimal.valueOf(7.0));
                    return fallback;
                });

        SoilTest soilTest = new SoilTest();
        soilTest.setFarmer(farmer);
        soilTest.setnValue(request.getnValue() != null ? request.getnValue() : BigDecimal.valueOf(60));
        soilTest.setpValue(request.getpValue() != null ? request.getpValue() : BigDecimal.valueOf(35));
        soilTest.setkValue(request.getkValue() != null ? request.getkValue() : BigDecimal.valueOf(45));
        soilTest.setPh(request.getPh() != null ? request.getPh() : BigDecimal.valueOf(6.4));
        soilTest.setSoilType(request.getSoilType() != null ? request.getSoilType() : "Alluvial Soil");

        Map<String, Object> result = agronomyEngineService.calculateNutrientRecommendation(farmer, crop, soilTest);
        return ResponseEntity.ok(ApiResponse.success("Fertilizer prescription calculated successfully", result));
    }
}

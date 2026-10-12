import { Crop, SoilTest, RecommendationResult, CommercialFertilizerItem, Farmer } from '../types';
import { COMMERCIAL_FERTILIZERS, ORGANIC_REMEDIES } from '../data/fertilizerData';

export function calculateFertilizerRecommendation(
  farmer: Farmer,
  crop: Crop,
  soil: SoilTest,
  analysisId?: number
): RecommendationResult {
  const farmAcres = farmer.farm_size_acres || 1;

  // Conversion: kg/ha to kg/acre is approximately kg/ha * 0.404686
  const haToAcre = 0.4047;

  // Optimum requirements in kg/ha
  const optN = crop.optimum_n;
  const optP = crop.optimum_p;
  const optK = crop.optimum_k;

  // Actual available in soil test (kg/ha)
  const actN = soil.n_value;
  const actP = soil.p_value;
  const actK = soil.k_value;

  // pH Factor adjustment
  let phStatus: RecommendationResult['ph_status'] = 'Optimal';
  let pEfficiencyMultiplier = 1.0;
  let soilAmendments: string[] = [];

  if (soil.ph < 5.5) {
    phStatus = 'Strongly Acidic';
    pEfficiencyMultiplier = 0.70; // 30% P is fixed by iron/aluminum oxides
    soilAmendments.push('Apply Agricultural Calcitic Lime (CaCO3) @ 300-400 kg/acre during land preparation to neutralize acidity and unlock bound phosphorus.');
  } else if (soil.ph < 6.2) {
    phStatus = 'Mildly Acidic';
    pEfficiencyMultiplier = 0.85;
    soilAmendments.push('Incorporate 150 kg/acre Dolomite or agricultural limestone to balance soil calcium-magnesium ratio.');
  } else if (soil.ph > 8.2) {
    phStatus = 'Highly Alkaline';
    pEfficiencyMultiplier = 0.75; // Micronutrients and P fixed as calcium phosphates
    soilAmendments.push('Apply Agricultural Gypsum (CaSO4·2H2O) @ 400 kg/acre followed by good drainage to displace exchangeable sodium.');
    soilAmendments.push('Foliar spray of Chelated Zinc (Zn-EDTA 12%) @ 1g/L to overcome alkaline-induced zinc lockout.');
  } else if (soil.ph > 7.5) {
    phStatus = 'Alkaline';
    pEfficiencyMultiplier = 0.90;
    soilAmendments.push('Add Sulphur-enriched compost or single super phosphate (SSP) which has an acidifying rhizosphere effect.');
  }

  // Calculate Net Deficits (kg/ha)
  const nDeficitHa = Math.max(0, optN - actN);
  const pDeficitHa = Math.max(0, (optP / pEfficiencyMultiplier) - actP);
  const kDeficitHa = Math.max(0, optK - actK);

  // Convert to per-acre pure nutrient deficit
  const nDeficitAcre = nDeficitHa * haToAcre;
  const pDeficitAcre = pDeficitHa * haToAcre;
  const kDeficitAcre = kDeficitHa * haToAcre;

  // Fertilizer allocation algorithm:
  // 1. Supply Phosphorus using DAP (18% N, 46% P2O5)
  // DAP required = pDeficitAcre / 0.46
  const dapKgPerAcre = Math.round(pDeficitAcre > 0 ? pDeficitAcre / 0.46 : 25);
  // Nitrogen supplied by DAP = DAP * 0.18
  const nSuppliedByDap = dapKgPerAcre * 0.18;

  // 2. Supply Remaining Nitrogen using Urea (46% N)
  const remainingNAcre = Math.max(0, nDeficitAcre - nSuppliedByDap);
  const ureaKgPerAcre = Math.round(remainingNAcre > 0 ? remainingNAcre / 0.46 : 30);

  // 3. Supply Potassium using MOP (60% K2O)
  const mopKgPerAcre = Math.round(kDeficitAcre > 0 ? kDeficitAcre / 0.60 : 20);

  // Split doses schedule
  const commercialList: CommercialFertilizerItem[] = [];

  // DAP as Basal
  const totalDapBags = Math.ceil((dapKgPerAcre * farmAcres) / 50);
  commercialList.push({
    name: 'Di-Ammonium Phosphate (DAP 18-46-0)',
    grade: '18-46-0',
    dose_kg_per_acre: dapKgPerAcre,
    total_bags_50kg: Math.max(1, totalDapBags),
    stage: 'Basal (Land Prep)',
    timing: 'Day 0 - At the time of sowing / final ploughing',
    instructions: 'Drill or place in furrows 5 cm below seed depth to prevent seed burning and ensure immediate seedling root contact.'
  });

  // MOP split
  const totalMopBags = Math.ceil((mopKgPerAcre * farmAcres) / 50);
  commercialList.push({
    name: 'Muriate of Potash (MOP 0-0-60)',
    grade: '0-0-60',
    dose_kg_per_acre: mopKgPerAcre,
    total_bags_50kg: Math.max(1, totalMopBags),
    stage: 'Basal (Land Prep)',
    timing: '50% at sowing (Basal) + 50% at flowering/grain-filling',
    instructions: 'Broadcast and lightly rake into soil before irrigation; enhances cell wall stiffness and drought tolerance.'
  });

  // Urea in 2 to 3 splits
  const ureaSplit1 = Math.round(ureaKgPerAcre * 0.4);
  const ureaSplit2 = Math.round(ureaKgPerAcre * 0.4);
  const ureaSplit3 = Math.round(ureaKgPerAcre * 0.2);
  const totalUreaBags = Math.ceil((ureaKgPerAcre * farmAcres) / 45);

  commercialList.push({
    name: 'Neem Coated Urea (Split I - 40%)',
    grade: '46-0-0',
    dose_kg_per_acre: ureaSplit1,
    total_bags_50kg: Math.max(1, Math.ceil((ureaSplit1 * farmAcres) / 45)),
    stage: 'Vegetative (Tillering)',
    timing: '20 to 25 Days After Sowing (DAS)',
    instructions: 'Broadcast in afternoon when foliage is free from dew. Irrigate within 24 hours to prevent volatilization loss.'
  });

  commercialList.push({
    name: 'Neem Coated Urea (Split II - 40%)',
    grade: '46-0-0',
    dose_kg_per_acre: ureaSplit2,
    total_bags_50kg: Math.max(1, Math.ceil((ureaSplit2 * farmAcres) / 45)),
    stage: 'Flowering & Fruiting',
    timing: '45 to 50 Days After Sowing (Panicle initiation / bud stage)',
    instructions: 'Apply under moist soil conditions; avoid heavy standing water pools.'
  });

  if (ureaSplit3 > 10) {
    commercialList.push({
      name: 'Neem Coated Urea (Split III - 20%)',
      grade: '46-0-0',
      dose_kg_per_acre: ureaSplit3,
      total_bags_50kg: Math.max(1, Math.ceil((ureaSplit3 * farmAcres) / 45)),
      stage: 'Flowering & Fruiting',
      timing: '65 to 70 DAS (Grain/Fruit development stage)',
      instructions: 'Final top dressing to ensure full grain weight and fruit size.'
    });
  }

  // Zinc Sulphate if needed or standard
  commercialList.push({
    name: 'Zinc Sulphate Monohydrate (33% Zn)',
    grade: 'Micronutrient',
    dose_kg_per_acre: 10,
    total_bags_50kg: Math.max(1, Math.ceil((10 * farmAcres) / 10)),
    stage: 'Basal (Land Prep)',
    timing: 'At land preparation (Separate from DAP)',
    instructions: 'CRITICAL: Never mix Zinc Sulphate directly with DAP/Phosphates in the same bucket; apply separately with 3 days interval.'
  });

  // Calculate Soil Health Score (0-100)
  const nScore = Math.min(100, Math.round((actN / optN) * 100));
  const pScore = Math.min(100, Math.round((actP / optP) * 100));
  const kScore = Math.min(100, Math.round((actK / optK) * 100));
  const phScore = (soil.ph >= 6.0 && soil.ph <= 7.5) ? 95 : 70;
  const ocScore = (soil.organic_carbon_percentage >= 0.75) ? 95 : (soil.organic_carbon_percentage >= 0.5 ? 80 : 60);

  const soilHealthScore = Math.round((nScore * 0.25) + (pScore * 0.25) + (kScore * 0.2) + (phScore * 0.15) + (ocScore * 0.15));

  // Estimate total cost for farmer
  const ureaCost = totalUreaBags * 266;
  const dapCost = totalDapBags * 1350;
  const mopCost = totalMopBags * 1700;
  const zincCost = Math.max(1, Math.ceil((10 * farmAcres) / 10)) * 550;
  const totalCost = ureaCost + dapCost + mopCost + zincCost;

  return {
    recommendation_id: Date.now(),
    farmer_id: farmer.farmer_id,
    soil_id: soil.soil_id,
    crop_id: crop.crop_id,
    analysis_id: analysisId,
    date: new Date().toISOString(),
    n_deficit: Math.round(nDeficitAcre),
    p_deficit: Math.round(pDeficitAcre),
    k_deficit: Math.round(kDeficitAcre),
    ph_status: phStatus,
    soil_health_score: Math.min(98, Math.max(35, soilHealthScore)),
    commercial_fertilizers: commercialList,
    organic_alternatives: ORGANIC_REMEDIES,
    soil_amendments: soilAmendments,
    spray_protocol: '19:19:19 water-soluble NPK foliar spray @ 5g/L at 30 and 45 DAS to immediately correct hidden hunger symptoms.',
    precautionary_notes: [
      'Avoid broadcasting urea when plant foliage is wet to prevent leaf scorch.',
      'Maintain 2-3 cm thin water film in paddy fields during fertilizer application; do not drain water for 48 hours.',
      'Incorporate organic manure (FYM or Vermicompost) at least 15 days before chemical fertilizer application.',
      'Wear protective rubber gloves and mask during micronutrient chemical handling.'
    ],
    total_estimated_cost_inr: totalCost
  };
}

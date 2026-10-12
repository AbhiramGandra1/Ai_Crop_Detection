export interface FertilizerSpec {
  id: string;
  name: string;
  grade: string;
  n_percent: number;
  p_percent: number;
  k_percent: number;
  description: string;
  bag_weight_kg: number;
  average_price_per_bag: number;
  best_for: string;
}

export const COMMERCIAL_FERTILIZERS: FertilizerSpec[] = [
  {
    id: 'urea',
    name: 'Neem Coated Urea',
    grade: '46-0-0',
    n_percent: 46,
    p_percent: 0,
    k_percent: 0,
    description: 'High-analysis nitrogen fertilizer for rapid vegetative growth, chlorophyll synthesis, and leafy vigor.',
    bag_weight_kg: 45,
    average_price_per_bag: 266,
    best_for: 'Nitrogen deficiency, vegetative shoot promotion'
  },
  {
    id: 'dap',
    name: 'Di-Ammonium Phosphate (DAP)',
    grade: '18-46-0',
    n_percent: 18,
    p_percent: 46,
    k_percent: 0,
    description: 'High phosphorus source for early root establishment, seedling vigor, and uniform flower induction.',
    bag_weight_kg: 50,
    average_price_per_bag: 1350,
    best_for: 'Basal application, root development, phosphorus deficiency'
  },
  {
    id: 'mop',
    name: 'Muriate of Potash (MOP)',
    grade: '0-0-60',
    n_percent: 0,
    p_percent: 0,
    k_percent: 60,
    description: 'Concentrated potassium chloride for disease resistance, water balance, grain filling, and fruit firmness.',
    bag_weight_kg: 50,
    average_price_per_bag: 1700,
    best_for: 'Potassium deficiency, drought resistance, grain weight'
  },
  {
    id: 'ssp',
    name: 'Single Super Phosphate (SSP)',
    grade: '0-16-0 + 11% S + 19% Ca',
    n_percent: 0,
    p_percent: 16,
    k_percent: 0,
    description: 'Supplies soluble phosphate with essential Sulphur and Calcium, highly recommended for oilseeds and legumes.',
    bag_weight_kg: 50,
    average_price_per_bag: 480,
    best_for: 'Phosphorus, Sulphur enrichment, acidic or alkaline soils'
  },
  {
    id: 'npk-10-26-26',
    name: 'NPK Complex 10:26:26',
    grade: '10-26-26',
    n_percent: 10,
    p_percent: 26,
    k_percent: 26,
    description: 'Balanced high P & K fertilizer ideal for basal dressing and reproductive phase nutrition.',
    bag_weight_kg: 50,
    average_price_per_bag: 1470,
    best_for: 'Vegetables, potato, sugarcane and fruit crops'
  },
  {
    id: 'zinc-sulphate',
    name: 'Zinc Sulphate Monohydrate (33% Zn)',
    grade: 'Micronutrient (33% Zn + 15% S)',
    n_percent: 0,
    p_percent: 0,
    k_percent: 0,
    description: 'Vital micronutrient to prevent Khaira disease in rice, little leaf in vegetables, and stunted interveinal chlorosis.',
    bag_weight_kg: 10,
    average_price_per_bag: 550,
    best_for: 'Zinc deficiency, sandy soils, high pH alkaline soils'
  }
];

export const ORGANIC_REMEDIES = [
  {
    name: 'Enriched Vermicompost',
    dosage: '1.5 - 2.0 Tonnes / Acre',
    application: 'Broadcast during final land preparation and incorporate into top 15cm soil layer',
    benefit: 'Improves soil water retention, cation exchange capacity, and microbial flora.'
  },
  {
    name: 'De-oiled Neem Cake (Azadirachtin coated)',
    dosage: '100 - 150 kg / Acre',
    application: 'Basal soil incorporation 7 days prior to seed sowing / transplanting',
    benefit: 'Natural nitrification inhibitor; suppresses root-knot nematodes and subterranean termites.'
  },
  {
    name: 'Bio-Fertilizer Consortia (Azotobacter + PSB + KMB)',
    dosage: '2 kg / Acre mixed with 100kg FYM',
    application: 'Soil application at sowing or seedling root dip for 30 minutes',
    benefit: 'Biological nitrogen fixation (20-30 kg N/ha) and solubilization of fixed soil phosphorus.'
  },
  {
    name: 'Fermented Jeevamrutha Microbial Tonic',
    dosage: '200 Litres / Acre through irrigation water (Fertigation)',
    application: 'Apply every 15-21 days during active vegetative growth phase',
    benefit: 'Supplies native beneficial rhizosphere microbes and organic growth humic compounds.'
  }
];

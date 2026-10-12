export interface Farmer {
  farmer_id: number;
  name: string;
  phone: string;
  location: string;
  farm_size_acres: number;
  preferred_language: 'en' | 'hi' | 'te' | 'ta' | 'mr' | 'pa';
  created_at?: string;
}

export interface Crop {
  crop_id: number;
  crop_name: string;
  scientific_name: string;
  variety: string;
  optimum_n: number; // kg/ha
  optimum_p: number; // kg/ha
  optimum_k: number; // kg/ha
  optimum_ph_min: number;
  optimum_ph_max: number;
  growth_duration_days: number;
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'All-season';
  icon: string;
  category: 'Cereal' | 'Vegetable' | 'Commercial' | 'Pulse' | 'Fruit';
  soil_preference: string;
}

export type PathogenType = 'Fungal' | 'Bacterial' | 'Viral' | 'Pest Infestation' | 'Nutrient Physiological' | 'Healthy Crop';

export interface Disease {
  disease_id: number;
  crop_id: number;
  common_name: string;
  scientific_name: string;
  pathogen_type: PathogenType;
  symptoms: string[];
  causes: string;
  recommended_treatment: string[];
  organic_remedy: string[];
  chemical_control: string[];
  prevention_tips: string[];
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface ImageAnalysisData {
  analysis_id: number;
  farmer_id: number;
  crop_id: number;
  image_url: string;
  confidence: number; // e.g. 96.8
  is_healthy: boolean;
  disease: Disease;
  secondary_predictions: Array<{ name: string; probability: number }>;
  affected_percentage: number; // e.g. 28%
  severity_level: 'MILD' | 'MODERATE' | 'SEVERE';
  leaf_lesion_regions: Array<{ x: number; y: number; width: number; height: number; label: string }>;
  gradcam_hotspots: Array<{ x: number; y: number; radius: number; intensity: number }>;
  analyzed_at: string;
}

export interface SoilTest {
  soil_id: number;
  farmer_id: number;
  n_value: number; // kg/ha available N
  p_value: number; // kg/ha available P
  k_value: number; // kg/ha available K
  ph: number;
  soil_type: 'Alluvial Soil' | 'Black Cotton Soil' | 'Red Sandy Loam' | 'Clayey Loam' | 'Laterite Soil' | 'Saline/Alkaline Soil';
  moisture_percentage: number;
  organic_carbon_percentage: number;
  tested_at: string;
}

export interface CommercialFertilizerItem {
  name: string;
  grade: string; // e.g. "46-0-0"
  dose_kg_per_acre: number;
  total_bags_50kg: number;
  stage: 'Basal (Land Prep)' | 'Vegetative (Tillering)' | 'Flowering & Fruiting' | 'Post-Harvest';
  timing: string;
  instructions: string;
}

export interface OrganicAlternativeItem {
  name: string;
  dosage: string;
  application: string;
  benefit: string;
}

export interface RecommendationResult {
  recommendation_id: number;
  farmer_id: number;
  soil_id: number;
  crop_id: number;
  analysis_id?: number;
  date: string;
  n_deficit: number;
  p_deficit: number;
  k_deficit: number;
  ph_status: 'Optimal' | 'Strongly Acidic' | 'Mildly Acidic' | 'Alkaline' | 'Highly Alkaline';
  soil_health_score: number; // 0 - 100
  commercial_fertilizers: CommercialFertilizerItem[];
  organic_alternatives: OrganicAlternativeItem[];
  soil_amendments: string[];
  spray_protocol: string;
  precautionary_notes: string[];
  total_estimated_cost_inr: number;
}

export interface SeedItem {
  seed_id: number;
  crop_name: string;
  variety_name: string;
  brand: string;
  certification_tag: 'ICAR Certified' | 'NSC Breeder' | 'Foundation Seed' | 'Hybrid Premium';
  germination_rate: number; // e.g. 92%
  maturity_days: number;
  seasons: ('Kharif' | 'Rabi' | 'Zaid' | 'All-season')[];
  soil_suitability: string[];
  drought_tolerance: 'High' | 'Medium' | 'Low';
  disease_resistance: string[];
  yield_quintal_per_acre: number;
  seed_rate_kg_per_acre: number;
  treatment_advice: string;
  price_per_kg: number;
  features_summary: string;
}

export interface FullAnalysisReport {
  report_id: string;
  timestamp: string;
  farmer: Farmer;
  crop: Crop;
  image_analysis: ImageAnalysisData;
  soil_test: SoilTest;
  recommendation: RecommendationResult;
}

export type ActiveTab = 'diagnostics' | 'soil' | 'seeds' | 'history' | 'architecture';
export type DiagnosticStep = 1 | 2 | 3 | 4 | 5;

import { Crop, Disease, ImageAnalysisData } from '../types';
import { LEAF_SAMPLE_PRESETS, LeafSamplePreset } from '../data/cropsAndDiseases';

export async function analyzeLeafImage(
  imageDataUrl: string,
  crop: Crop,
  farmerId: number,
  selectedPreset?: LeafSamplePreset | null
): Promise<ImageAnalysisData> {
  // If user selected a preset, return its enriched data
  if (selectedPreset) {
    return {
      analysis_id: Date.now(),
      farmer_id: farmerId,
      crop_id: crop.crop_id,
      image_url: selectedPreset.thumbnail,
      confidence: selectedPreset.confidence,
      is_healthy: selectedPreset.is_healthy,
      disease: selectedPreset.disease_details,
      secondary_predictions: [
        { name: selectedPreset.disease_name, probability: selectedPreset.confidence },
        { name: 'Secondary Leaf Blotch (Fungal complex)', probability: Math.max(1.2, +(100 - selectedPreset.confidence - 1.1).toFixed(1)) },
        { name: 'Physiological Sunscald / Scorch', probability: 0.9 }
      ],
      affected_percentage: selectedPreset.damage_percentage,
      severity_level: selectedPreset.severity,
      leaf_lesion_regions: selectedPreset.lesions,
      gradcam_hotspots: selectedPreset.hotspots,
      analyzed_at: new Date().toISOString()
    };
  }

  // If custom uploaded image: simulate ONNX / TensorFlow.js inference
  // Match closest known disease for this crop or generate realistic vision diagnosis
  const presetForCrop = LEAF_SAMPLE_PRESETS.find(p => p.crop_id === crop.crop_id && !p.is_healthy) || LEAF_SAMPLE_PRESETS[0];

  const disease: Disease = {
    ...presetForCrop.disease_details,
    disease_id: 800 + Math.floor(Math.random() * 100),
    common_name: `${crop.crop_name} Foliar Disease Complex (${presetForCrop.disease_name.replace(crop.crop_name, '').trim() || 'Leaf Blight'})`,
  };

  // Generate dynamic simulated Grad-CAM hotspots & lesions for uploaded image
  const lesions = [
    { x: 30 + Math.floor(Math.random() * 10), y: 25 + Math.floor(Math.random() * 10), width: 30, height: 25, label: 'Necrotic lesion locus' },
    { x: 55 + Math.floor(Math.random() * 10), y: 50 + Math.floor(Math.random() * 10), width: 22, height: 22, label: 'Chlorotic halo margin' }
  ];

  const hotspots = [
    { x: 42, y: 38, radius: 48, intensity: 0.94 },
    { x: 65, y: 62, radius: 36, intensity: 0.81 }
  ];

  const confidence = +(93 + Math.random() * 5).toFixed(1);

  return {
    analysis_id: Date.now(),
    farmer_id: farmerId,
    crop_id: crop.crop_id,
    image_url: imageDataUrl,
    confidence: confidence,
    is_healthy: false,
    disease: disease,
    secondary_predictions: [
      { name: disease.common_name, probability: confidence },
      { name: 'Nutrient induced interveinal chlorosis', probability: 3.2 },
      { name: 'Healthy tissue margin', probability: +(100 - confidence - 3.2).toFixed(1) }
    ],
    affected_percentage: Math.floor(22 + Math.random() * 18),
    severity_level: 'MODERATE',
    leaf_lesion_regions: lesions,
    gradcam_hotspots: hotspots,
    analyzed_at: new Date().toISOString()
  };
}

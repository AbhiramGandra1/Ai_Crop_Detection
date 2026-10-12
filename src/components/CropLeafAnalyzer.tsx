import React, { useState, useRef } from 'react';
import { Crop, ImageAnalysisData } from '../types';
import { LEAF_SAMPLE_PRESETS, LeafSamplePreset } from '../data/cropsAndDiseases';
import { analyzeLeafImage } from '../services/aiVisionService';
import { speakText, stopSpeech } from '../services/speechService';
import { 
  Upload, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Layers, 
  ShieldAlert, 
  Leaf, 
  Activity,
  Scan,
  RefreshCw,
  Camera
} from 'lucide-react';

interface CropLeafAnalyzerProps {
  selectedCrop: Crop;
  farmerId: number;
  currentAnalysis: ImageAnalysisData | null;
  onAnalysisComplete: (data: ImageAnalysisData) => void;
  onProceedToSoil: () => void;
}

export const CropLeafAnalyzer: React.FC<CropLeafAnalyzerProps> = ({
  selectedCrop,
  farmerId,
  currentAnalysis,
  onAnalysisComplete,
  onProceedToSoil
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    LEAF_SAMPLE_PRESETS.find(p => p.crop_id === selectedCrop.crop_id)?.id || LEAF_SAMPLE_PRESETS[0].id
  );
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showGradCam, setShowGradCam] = useState(true);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available sample presets for this crop (or general fallbacks)
  const availablePresets = LEAF_SAMPLE_PRESETS;

  const runDiagnosis = async (preset?: LeafSamplePreset, customImgUrl?: string) => {
    setIsAnalyzing(true);
    stopSpeech();
    setIsSpeaking(false);

    try {
      // Simulate microservice roundtrip to Node.js ONNX runtime (Port 5000)
      await new Promise(resolve => setTimeout(resolve, 800));

      const activePreset = preset || (customImgUrl ? null : availablePresets.find(p => p.id === selectedPresetId));
      const imgToUse = customImgUrl || (activePreset ? activePreset.thumbnail : availablePresets[0].thumbnail);

      const result = await analyzeLeafImage(imgToUse, selectedCrop, farmerId, activePreset);
      onAnalysisComplete(result);
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setCustomImage(url);
        runDiagnosis(undefined, url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (preset: LeafSamplePreset) => {
    setSelectedPresetId(preset.id);
    setCustomImage(null);
    runDiagnosis(preset);
  };

  const toggleVoiceReadout = () => {
    if (!currentAnalysis) return;

    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      const textToRead = `Crop Diagnosis: ${currentAnalysis.disease.common_name}. Scientific pathogen: ${currentAnalysis.disease.scientific_name}. Severity is ${currentAnalysis.severity_level}. Recommended organic remedy: ${currentAnalysis.disease.organic_remedy.join('. ')}. Recommended chemical treatment: ${currentAnalysis.disease.chemical_control.join('. ')}.`;
      speakText(textToRead, 'en');
      setIsSpeaking(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
            <Scan className="w-3.5 h-3.5" /> Module 2: Node.js AI Vision Inference Service
          </div>
          <h2 className="text-xl font-bold text-white">
            Crop Leaf Pathology Vision Classifier
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Target Crop: <span className="text-purple-300 font-semibold">{selectedCrop.crop_name}</span>. Upload actual leaf photo or select verified symptomatic sample.
          </p>
        </div>

        {/* Upload Button */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-medium text-xs border border-slate-700 flex items-center gap-2 transition"
          >
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>Upload Leaf Photo</span>
          </button>
        </div>
      </div>

      {/* Preset Selector Gallery */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-emerald-400" />
            Verified Diagnostic Sample Library:
          </span>
          <span className="text-[11px] text-slate-500">
            Click any specimen to trigger instant ONNX vision inference
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {availablePresets.map((preset) => {
            const isSelected = !customImage && selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`relative rounded-xl overflow-hidden border p-2 text-left transition group ${
                  isSelected
                    ? 'border-purple-500 bg-purple-950/40 ring-2 ring-purple-500/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="aspect-square w-full rounded-lg overflow-hidden bg-slate-950 mb-2 relative">
                  <img
                    src={preset.thumbnail}
                    alt={preset.disease_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className={`absolute top-1 left-1 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                    preset.is_healthy
                      ? 'bg-emerald-600 text-white'
                      : 'bg-red-600/90 text-white'
                  }`}>
                    {preset.is_healthy ? 'Healthy' : preset.severity}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-white truncate">
                  {preset.crop_name}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {preset.disease_name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Neural Analysis Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Canvas with Grad-CAM & Lesion Overlays */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden aspect-[4/3] flex items-center justify-center shadow-xl">
            {currentAnalysis ? (
              <>
                <img
                  src={currentAnalysis.image_url}
                  alt="Target Leaf for Diagnostic Vision"
                  className="w-full h-full object-cover"
                />

                {/* Heatmap / Grad-CAM Overlay */}
                {showGradCam && !currentAnalysis.is_healthy && currentAnalysis.gradcam_hotspots.map((hs, idx) => (
                  <div
                    key={`hs-${idx}`}
                    className="absolute pointer-events-none rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 animate-pulse"
                    style={{
                      left: `${hs.x}%`,
                      top: `${hs.y}%`,
                      width: `${hs.radius * 2}px`,
                      height: `${hs.radius * 2}px`,
                      background: 'radial-gradient(circle, rgba(239, 68, 68, 0.75) 0%, rgba(245, 158, 11, 0.5) 45%, rgba(16, 185, 129, 0.2) 75%, transparent 100%)',
                      filter: 'blur(4px)',
                      mixBlendMode: 'screen',
                    }}
                  />
                ))}

                {/* Bounding Boxes */}
                {showBoundingBoxes && currentAnalysis.leaf_lesion_regions.map((region, idx) => (
                  <div
                    key={`box-${idx}`}
                    className="absolute border-2 border-red-500 rounded bg-red-500/10 pointer-events-none transition-all"
                    style={{
                      left: `${region.x}%`,
                      top: `${region.y}%`,
                      width: `${region.width}%`,
                      height: `${region.height}%`,
                    }}
                  >
                    <span className="absolute -top-5 left-0 text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                      {region.label}
                    </span>
                  </div>
                ))}

                {/* Neural Scanning Line when analyzing */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-xl border-2 border-purple-500 border-t-transparent animate-spin mb-3"></div>
                    <span className="text-xs font-mono font-semibold text-purple-300 animate-pulse">
                      Running Node.js ONNX Vision Classifier...
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <Upload className="w-10 h-10 mx-auto mb-2 text-slate-500" />
                <p className="text-sm font-medium">Select a leaf specimen above to begin AI analysis</p>
              </div>
            )}

            {/* Bottom floating vision control tools */}
            {currentAnalysis && (
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={showGradCam}
                      onChange={(e) => setShowGradCam(e.target.checked)}
                      className="rounded accent-purple-500"
                    />
                    <span>Grad-CAM Heatmap</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={showBoundingBoxes}
                      onChange={(e) => setShowBoundingBoxes(e.target.checked)}
                      className="rounded accent-purple-500"
                    />
                    <span>Lesion Boxes</span>
                  </label>
                </div>

                <div className="text-[11px] font-mono text-emerald-400">
                  Res: 512x512 • FPS: 60
                </div>
              </div>
            )}
          </div>

          {/* Quick Rerun Button */}
          <div className="flex items-center justify-between px-1">
            <button
              onClick={() => runDiagnosis()}
              disabled={isAnalyzing}
              className="text-xs text-slate-400 hover:text-purple-300 flex items-center gap-1.5 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>Re-evaluate Node.js AI Model</span>
            </button>
            <span className="text-[11px] text-slate-500 font-mono">
              Confidence Threshold: 75%
            </span>
          </div>
        </div>

        {/* Right Column: AI Disease Diagnosis Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          {currentAnalysis ? (
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-5">
              
              {/* Disease Title & Badges */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                    currentAnalysis.is_healthy
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : currentAnalysis.severity_level === 'SEVERE'
                      ? 'bg-red-500/10 text-red-300 border-red-500/30'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}>
                    {currentAnalysis.is_healthy ? 'Optimal Foliage' : `${currentAnalysis.severity_level} Severity`}
                  </span>

                  {/* Speech synthesis toggle button */}
                  <button
                    onClick={toggleVoiceReadout}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
                      isSpeaking
                        ? 'bg-purple-600 text-white border-purple-500 animate-pulse'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isSpeaking ? 'Stop Audio' : 'Listen Diagnosis'}</span>
                  </button>
                </div>

                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {currentAnalysis.disease.common_name}
                </h3>
                <p className="text-xs text-purple-300 italic font-serif">
                  Pathogen: {currentAnalysis.disease.scientific_name}
                </p>
              </div>

              {/* Confidence & Severity Gauge */}
              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div>
                  <div className="text-[10px] text-slate-400">AI Confidence</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono">
                    {currentAnalysis.confidence}%
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full" 
                      style={{ width: `${currentAnalysis.confidence}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400">Pathogen Class</div>
                  <div className="text-sm font-semibold text-slate-200 mt-0.5">
                    {currentAnalysis.disease.pathogen_type}
                  </div>
                  <span className="text-[10px] text-slate-500">Microbial Type</span>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400">Leaf Damage Area</div>
                  <div className="text-lg font-bold text-amber-400 font-mono">
                    {currentAnalysis.affected_percentage}%
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full" 
                      style={{ width: `${Math.min(100, currentAnalysis.affected_percentage * 2)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-purple-400" />
                  Visible Botanical Symptoms
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {currentAnalysis.disease.symptoms.map((sym, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Biological Causes */}
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300">
                <span className="font-semibold text-white">Etiology &amp; Climate Vector: </span>
                {currentAnalysis.disease.causes}
              </div>

              {/* Dual Treatments: Organic & Chemical */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs">
                  <div className="font-bold text-emerald-400 mb-1.5 flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5" />
                    Bio &amp; Organic Remedies
                  </div>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    {currentAnalysis.disease.organic_remedy.map((rem, i) => (
                      <li key={i}>• {rem}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs">
                  <div className="font-bold text-purple-400 mb-1.5 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Targeted Chemical Control
                  </div>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    {currentAnalysis.disease.chemical_control.map((chem, i) => (
                      <li key={i}>• {chem}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Next Step CTA */}
              <div className="pt-2">
                <button
                  onClick={onProceedToSoil}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition active:scale-[0.98]"
                >
                  <span>Proceed to Step 3: Soil Nutrient Analysis (NPK &amp; pH)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400">
              <Scan className="w-8 h-8 mx-auto mb-2 text-slate-500" />
              <p>Waiting for leaf specimen selection...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

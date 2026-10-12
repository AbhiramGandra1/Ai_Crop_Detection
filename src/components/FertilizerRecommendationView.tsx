import React, { useState } from 'react';
import { Crop, Farmer, RecommendationResult, SoilTest, ImageAnalysisData } from '../types';
import { speakText, stopSpeech } from '../services/speechService';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  TrendingUp,
  Package,
  Layers,
  FileCheck
} from 'lucide-react';

interface FertilizerRecommendationViewProps {
  farmer: Farmer;
  crop: Crop;
  soil: SoilTest;
  diseaseAnalysis?: ImageAnalysisData | null;
  recommendation: RecommendationResult;
  onSaveAndProceed: () => void;
}

export const FertilizerRecommendationView: React.FC<FertilizerRecommendationViewProps> = ({
  farmer,
  crop,
  soil,
  diseaseAnalysis,
  recommendation,
  onSaveAndProceed
}) => {
  const [activeTab, setActiveTab] = useState<'commercial' | 'organic' | 'amendments'>('commercial');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleVoiceReadout = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      const topFert = recommendation.commercial_fertilizers[0]?.name || 'DAP';
      const speech = `Fertilizer Prescription for ${crop.crop_name} on ${farmer.farm_size_acres} acres: Soil Health Score is ${recommendation.soil_health_score} out of 100. Basal dose recommended: ${topFert} at ${recommendation.commercial_fertilizers[0]?.dose_kg_per_acre} kg per acre. Split urea applications at tillering and flowering. Organic recommendation: Apply Vermicompost and Neem cake during land preparation.`;
      speakText(speech, farmer.preferred_language || 'en');
      setIsSpeaking(true);
    }
  };

  const handleFinalSave = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Confetti fallback
    }
    onSaveAndProceed();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Spring Boot Engine Badge */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-emerald-950/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Module 4: Spring Boot Agronomy Engine Calculated
            </span>
            <span className="text-xs text-slate-400">
              Target: {farmer.farm_size_acres} Acres ({farmer.name})
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">
            Intelligent Nutrient &amp; Fertilizer Prescription
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Optimized stoichiometric formula balancing soil NPK availability against <span className="text-purple-300 font-semibold">{crop.crop_name} ({crop.variety})</span> uptake curves and pH dynamics.
          </p>
        </div>

        {/* Readout button */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleVoiceReadout}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition ${
              isSpeaking
                ? 'bg-purple-600 text-white border-purple-500 animate-pulse'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:text-white'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span>{isSpeaking ? 'Stop Audio Guide' : 'Voice Prescription'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Soil Health Score */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="text-[11px] text-slate-400">Soil Fertility Index</div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">
              {recommendation.soil_health_score}
            </span>
            <span className="text-xs text-slate-500">/ 100</span>
          </div>
          <div className="text-[10px] text-emerald-300 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Productive Potential</span>
          </div>
        </div>

        {/* Net Deficit NPK */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="text-[11px] text-slate-400">Net Nutrient Deficit (Per Acre)</div>
          <div className="text-base font-bold text-white font-mono mt-1">
            N: <span className="text-blue-400">{recommendation.n_deficit}</span> | P: <span className="text-amber-400">{recommendation.p_deficit}</span> | K: <span className="text-emerald-400">{recommendation.k_deficit}</span> <span className="text-xs font-normal text-slate-500">kg</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Stoichiometric Replenishment
          </div>
        </div>

        {/* Soil Reaction Status */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="text-[11px] text-slate-400">Soil Reaction (pH Status)</div>
          <div className="text-base font-bold text-purple-300 mt-1">
            {recommendation.ph_status} (pH {soil.ph.toFixed(1)})
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {recommendation.soil_amendments.length > 0 ? 'Conditioner recommended' : 'Optimal nutrient uptake'}
          </div>
        </div>

        {/* Estimated Fertilizer Cost */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="text-[11px] text-slate-400">Est. Total Investment ({farmer.farm_size_acres} Ac)</div>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-1 flex items-center">
            <span>₹{recommendation.total_estimated_cost_inr.toLocaleString('en-IN')}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Govt. Subsidized Rates
          </div>
        </div>

      </div>

      {/* Tabs Switcher for Commercial / Organic / Amendments */}
      <div className="flex border-b border-slate-800 text-xs font-medium gap-2">
        <button
          onClick={() => setActiveTab('commercial')}
          className={`pb-3 px-3 transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'commercial'
              ? 'border-purple-500 text-purple-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Commercial Fertilizer Schedule ({recommendation.commercial_fertilizers.length} Items)</span>
        </button>
        <button
          onClick={() => setActiveTab('organic')}
          className={`pb-3 px-3 transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'organic'
              ? 'border-purple-500 text-purple-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>Organic &amp; Bio-Fertilizer Alternatives</span>
        </button>
        <button
          onClick={() => setActiveTab('amendments')}
          className={`pb-3 px-3 transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'amendments'
              ? 'border-purple-500 text-purple-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Soil Conditioners &amp; Foliar Protocol</span>
        </button>
      </div>

      {/* Commercial Fertilizer Schedule */}
      {activeTab === 'commercial' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendation.commercial_fertilizers.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 space-y-3 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {item.stage}
                    </span>
                    <h4 className="font-bold text-sm text-white mt-1.5">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">Grade: {item.grade}</span>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-emerald-400 font-mono">
                      {item.dose_kg_per_acre} kg/Ac
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Total: <span className="font-bold text-white">{item.total_bags_50kg} bags</span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Application Timing: {item.timing}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pl-5">
                    {item.instructions}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Organic Alternatives */}
      {activeTab === 'organic' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendation.organic_alternatives.map((org, idx) => (
            <div key={idx} className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-emerald-300 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  {org.name}
                </h4>
                <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                  {org.dosage}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                <span className="font-semibold text-slate-200">Application Method: </span>
                {org.application}
              </p>
              <p className="text-[11px] text-slate-400 italic">
                Benefit: {org.benefit}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Amendments & Warnings */}
      {activeTab === 'amendments' && (
        <div className="space-y-4">
          {recommendation.soil_amendments.length > 0 ? (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-2">
              <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Soil Reaction Correction Protocol
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {recommendation.soil_amendments.map((amend, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>{amend}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Soil pH is in the optimal physiological range ({crop.optimum_ph_min} - {crop.optimum_ph_max}). No corrective liming or gypsum required.</span>
            </div>
          )}

          {/* Foliar spray */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              Emergency Foliar Booster Protocol
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {recommendation.spray_protocol}
            </p>
          </div>

          {/* Precautions */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-slate-300">Standard Agronomic Safety Rules:</h4>
            <ul className="space-y-1 text-slate-400 text-[11px]">
              {recommendation.precautionary_notes.map((note, i) => (
                <li key={i}>• {note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Save Result and View Report Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>Module 5: Save record into database and compile official agronomy certificate dossier.</span>
        </div>

        <button
          onClick={handleFinalSave}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition active:scale-[0.98]"
        >
          <span>Save Result &amp; View Official Report</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Crop, SoilTest } from '../types';
import { 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  Droplet, 
  TestTube, 
  Info,
  Sliders,
  RotateCcw
} from 'lucide-react';

interface SoilNutrientAnalyzerProps {
  selectedCrop: Crop;
  farmerId: number;
  initialSoilData: SoilTest;
  onSaveSoilData: (soilData: SoilTest) => void;
  onProceedToRecommendation: () => void;
}

export const SoilNutrientAnalyzer: React.FC<SoilNutrientAnalyzerProps> = ({
  selectedCrop,
  farmerId,
  initialSoilData,
  onSaveSoilData,
  onProceedToRecommendation
}) => {
  const [soil, setSoil] = useState<SoilTest>(initialSoilData);

  const soilTypes: SoilTest['soil_type'][] = [
    'Alluvial Soil',
    'Black Cotton Soil',
    'Red Sandy Loam',
    'Clayey Loam',
    'Laterite Soil',
    'Saline/Alkaline Soil'
  ];

  const handleUpdate = <K extends keyof SoilTest>(field: K, value: SoilTest[K]) => {
    const updated = { ...soil, [field]: value };
    setSoil(updated);
    onSaveSoilData(updated);
  };

  // Preset soil tests for quick demonstration
  const applyPreset = (type: 'deficient-n' | 'acidic' | 'alkaline' | 'balanced') => {
    let preset: Partial<SoilTest> = {};
    if (type === 'deficient-n') {
      preset = { n_value: 45, p_value: 38, k_value: 48, ph: 6.8, soil_type: 'Alluvial Soil', organic_carbon_percentage: 0.38 };
    } else if (type === 'acidic') {
      preset = { n_value: 80, p_value: 22, k_value: 40, ph: 5.2, soil_type: 'Red Sandy Loam', organic_carbon_percentage: 0.52 };
    } else if (type === 'alkaline') {
      preset = { n_value: 95, p_value: 30, k_value: 75, ph: 8.4, soil_type: 'Black Cotton Soil', organic_carbon_percentage: 0.65 };
    } else {
      preset = { n_value: selectedCrop.optimum_n - 15, p_value: selectedCrop.optimum_p - 10, k_value: selectedCrop.optimum_k - 8, ph: 6.5, soil_type: 'Alluvial Soil', organic_carbon_percentage: 0.82 };
    }
    const updated = { ...soil, ...preset };
    setSoil(updated);
    onSaveSoilData(updated);
  };

  // Helper for NPK status
  const getNutrientStatus = (actual: number, optimal: number) => {
    const ratio = actual / optimal;
    if (ratio < 0.6) return { label: 'Deficient (Low)', color: 'text-red-400 bg-red-500/10 border-red-500/20' };
    if (ratio < 0.9) return { label: 'Moderately Low', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    if (ratio <= 1.2) return { label: 'Adequate (Optimal)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    return { label: 'Surplus (High)', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };
  };

  const nStatus = getNutrientStatus(soil.n_value, selectedCrop.optimum_n);
  const pStatus = getNutrientStatus(soil.p_value, selectedCrop.optimum_p);
  const kStatus = getNutrientStatus(soil.k_value, selectedCrop.optimum_k);

  // pH status
  const getPhStatus = (ph: number) => {
    if (ph < 5.5) return { label: 'Strongly Acidic (Requires Calcitic Lime)', color: 'text-red-400' };
    if (ph < 6.0) return { label: 'Moderately Acidic (P fixation prone)', color: 'text-amber-400' };
    if (ph <= 7.5) return { label: 'Neutral to Optimal (High nutrient bioavailability)', color: 'text-emerald-400' };
    if (ph <= 8.2) return { label: 'Moderately Alkaline', color: 'text-amber-400' };
    return { label: 'Strongly Alkaline / Saline (Requires Gypsum)', color: 'text-red-400' };
  };

  const phStatus = getPhStatus(soil.ph);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
            <TestTube className="w-3.5 h-3.5" /> Module 3: Soil Nutrient Analysis (NPK &amp; Physicochemical)
          </div>
          <h2 className="text-xl font-bold text-white">
            Soil Test Parameters Entry
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Calibrated against <span className="text-emerald-400 font-semibold">{selectedCrop.crop_name}</span> standard nutritional demands.
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" /> Sample Presets:
          </span>
          <button
            onClick={() => applyPreset('deficient-n')}
            className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            Nitrogen Starved
          </button>
          <button
            onClick={() => applyPreset('acidic')}
            className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            Acidic Red (pH 5.2)
          </button>
          <button
            onClick={() => applyPreset('alkaline')}
            className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            Alkaline (pH 8.4)
          </button>
          <button
            onClick={() => applyPreset('balanced')}
            className="px-2.5 py-1 rounded-lg text-xs bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 border border-emerald-800 transition"
          >
            Balanced Soil
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Soil NPK Sliders */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-5">
            <h3 className="font-bold text-base text-white flex items-center justify-between">
              <span>Primary Macronutrients (Available N-P-K)</span>
              <span className="text-xs font-normal text-slate-400">Unit: kg/hectare</span>
            </h3>

            {/* Nitrogen (N) */}
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  Available Nitrogen (N)
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${nStatus.color}`}>
                    {nStatus.label}
                  </span>
                  <span className="font-mono font-bold text-white text-sm">{soil.n_value} kg/ha</span>
                </div>
              </div>
              <input
                type="range"
                min="20"
                max="250"
                step="2"
                value={soil.n_value}
                onChange={(e) => handleUpdate('n_value', parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Low (&lt;100)</span>
                <span className="text-slate-400">Crop Target: {selectedCrop.optimum_n} kg/ha</span>
                <span>High (&gt;200)</span>
              </div>
            </div>

            {/* Phosphorus (P) */}
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Available Phosphorus (P₂O₅)
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pStatus.color}`}>
                    {pStatus.label}
                  </span>
                  <span className="font-mono font-bold text-white text-sm">{soil.p_value} kg/ha</span>
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="1"
                value={soil.p_value}
                onChange={(e) => handleUpdate('p_value', parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Low (&lt;25)</span>
                <span className="text-slate-400">Crop Target: {selectedCrop.optimum_p} kg/ha</span>
                <span>High (&gt;80)</span>
              </div>
            </div>

            {/* Potassium (K) */}
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Available Potassium (K₂O)
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${kStatus.color}`}>
                    {kStatus.label}
                  </span>
                  <span className="font-mono font-bold text-white text-sm">{soil.k_value} kg/ha</span>
                </div>
              </div>
              <input
                type="range"
                min="15"
                max="150"
                step="2"
                value={soil.k_value}
                onChange={(e) => handleUpdate('k_value', parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Low (&lt;35)</span>
                <span className="text-slate-400">Crop Target: {selectedCrop.optimum_k} kg/ha</span>
                <span>High (&gt;100)</span>
              </div>
            </div>

            {/* Soil pH Level */}
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-2">
                  <TestTube className="w-3.5 h-3.5 text-purple-400" />
                  Soil Reaction (pH Value)
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${phStatus.color}`}>
                    {phStatus.label}
                  </span>
                  <span className="font-mono font-bold text-white text-base">{soil.ph.toFixed(1)}</span>
                </div>
              </div>

              {/* pH Color Rainbow track */}
              <div className="relative pt-1">
                <div className="h-2 w-full rounded-full bg-gradient-to-r from-red-600 via-yellow-400 via-green-500 to-indigo-600 opacity-80" />
                <input
                  type="range"
                  min="4.0"
                  max="9.5"
                  step="0.1"
                  value={soil.ph}
                  onChange={(e) => handleUpdate('ph', parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer mt-1"
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-500">
                <span className="text-red-400">4.0 (Acidic)</span>
                <span className="text-emerald-400">7.0 (Neutral)</span>
                <span className="text-indigo-400">9.5 (Alkaline)</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Physicochemical & Soil Classification */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-4">
            <h3 className="font-bold text-base text-white">
              Physicochemical Characteristics
            </h3>

            {/* Soil Type Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Soil Classification (Pedology)
              </label>
              <select
                value={soil.soil_type}
                onChange={(e) => handleUpdate('soil_type', e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-medium"
              >
                {soilTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                Preferred by {selectedCrop.crop_name}: <span className="text-emerald-400">{selectedCrop.soil_preference}</span>
              </p>
            </div>

            {/* Organic Carbon % */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Organic Carbon (OC %)</span>
                <span className="font-mono text-white font-bold">{soil.organic_carbon_percentage.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.5"
                step="0.05"
                value={soil.organic_carbon_percentage}
                onChange={(e) => handleUpdate('organic_carbon_percentage', parseFloat(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500 flex justify-between mt-0.5">
                <span>Low (&lt;0.5%)</span>
                <span>Medium (0.5-0.75%)</span>
                <span>High (&gt;0.75%)</span>
              </div>
            </div>

            {/* Soil Moisture % */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Gravimetric Moisture (%)</span>
                <span className="font-mono text-white font-bold">{soil.moisture_percentage}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="5"
                value={soil.moisture_percentage}
                onChange={(e) => handleUpdate('moisture_percentage', parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500 flex justify-between mt-0.5">
                <span>Dry (&lt;20%)</span>
                <span>Field Capacity (35-50%)</span>
                <span>Saturated (&gt;65%)</span>
              </div>
            </div>

            {/* Summary Benchmark Card */}
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Agronomy Calibration Summary
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Soil test data will be piped directly into the Spring Boot stoichiometric engine to generate precise split dosages, calculate amendment requirements, and prevent environmental leaching.
              </p>
            </div>

            {/* Next CTA */}
            <div className="pt-2">
              <button
                onClick={onProceedToRecommendation}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition active:scale-[0.98]"
              >
                <span>Run Spring Boot Fertilizer Recommendation Engine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

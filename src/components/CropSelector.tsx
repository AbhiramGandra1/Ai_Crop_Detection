import React from 'react';
import { Crop } from '../types';
import { CROPS_DATA } from '../data/cropsAndDiseases';
import { CheckCircle2, ArrowRight, Sparkles, Clock, Globe } from 'lucide-react';

interface CropSelectorProps {
  selectedCrop: Crop;
  onSelectCrop: (crop: Crop) => void;
  onProceed: () => void;
}

export const CropSelector: React.FC<CropSelectorProps> = ({
  selectedCrop,
  onSelectCrop,
  onProceed
}) => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-purple-950/40 via-slate-900 to-emerald-950/30 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Module 1: Crop Selection &amp; Agronomy Baseline
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Select Your Target Cultivar
          </h2>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            The intelligent diagnostic pipeline customizes leaf pathology neural weights and soil stoichiometric thresholds based on crop biological genetics.
          </p>
        </div>
      </div>

      {/* Grid of crops */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CROPS_DATA.map((crop) => {
          const isSelected = crop.crop_id === selectedCrop.crop_id;
          return (
            <div
              key={crop.crop_id}
              onClick={() => onSelectCrop(crop)}
              className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 relative text-left flex flex-col justify-between group ${
                isSelected
                  ? 'bg-purple-950/30 border-purple-500 ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                    {crop.icon}
                  </div>
                  {isSelected ? (
                    <div className="flex items-center gap-1 text-xs font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-500 px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800">
                      {crop.category}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition">
                  {crop.crop_name}
                </h3>
                <p className="text-xs text-slate-400 italic">
                  {crop.scientific_name}
                </p>
                <div className="text-[11px] text-emerald-400 font-medium mt-1">
                  Var: {crop.variety.split('/')[0]}
                </div>

                {/* Optimal Agronomic Benchmarks */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Target N-P-K:</span>
                    <span className="font-mono text-slate-200">{crop.optimum_n}-{crop.optimum_p}-{crop.optimum_k} kg/ha</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Ideal Soil pH:</span>
                    <span className="font-mono text-slate-200">{crop.optimum_ph_min} - {crop.optimum_ph_max}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-500" /> Duration:</span>
                    <span className="text-slate-200">{crop.growth_duration_days} days ({crop.season})</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2">
                <span className={`w-full py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-800/70 text-slate-300 group-hover:bg-slate-700'
                }`}>
                  {isSelected ? 'Active Selection' : 'Select Crop'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action CTA */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
            {selectedCrop.icon}
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              Selected: <span className="text-emerald-400">{selectedCrop.crop_name}</span> ({selectedCrop.variety})
            </div>
            <div className="text-xs text-slate-400">
              Optimal pH: {selectedCrop.optimum_ph_min}-{selectedCrop.optimum_ph_max} • Standard NPK: {selectedCrop.optimum_n}:{selectedCrop.optimum_p}:{selectedCrop.optimum_k}
            </div>
          </div>
        </div>

        <button
          onClick={onProceed}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 flex items-center gap-2 transition active:scale-[0.98]"
        >
          <span>Proceed to Leaf Vision AI</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SeedItem, Crop } from '../types';
import { SEED_DATABASE } from '../data/seedDatabase';
import { CROPS_DATA } from '../data/cropsAndDiseases';
import { 
  Database, 
  Search, 
  Filter, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Droplet, 
  Sun, 
  CheckCircle2, 
  Tag, 
  Sprout,
  ArrowRight,
  TrendingUp,
  Percent
} from 'lucide-react';

interface SeedCatalogViewProps {
  onSelectCropFromSeed?: (crop: Crop) => void;
}

export const SeedCatalogView: React.FC<SeedCatalogViewProps> = ({
  onSelectCropFromSeed
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('All');
  const [showAiAdvisor, setShowAiAdvisor] = useState(false);

  // AI Seed Advisor form state
  const [advisorSoil, setAdvisorSoil] = useState('Alluvial Soil');
  const [advisorSeason, setAdvisorSeason] = useState('Kharif');
  const [advisorWater, setAdvisorWater] = useState<'Drip / Assured' | 'Rainfed / Drought Prone'>('Drip / Assured');
  const [advisorRecommendation, setAdvisorRecommendation] = useState<SeedItem | null>(null);

  const filteredSeeds = SEED_DATABASE.filter(seed => {
    const matchesSearch = 
      seed.variety_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seed.crop_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seed.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seed.disease_resistance.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSeason = selectedSeason === 'All' || seed.seasons.includes(selectedSeason as any);
    const matchesCrop = selectedCropFilter === 'All' || seed.crop_name === selectedCropFilter;

    return matchesSearch && matchesSeason && matchesCrop;
  });

  const runSeedAdvisor = () => {
    // Score seeds based on matching soil, season, and drought requirements
    let bestSeed = SEED_DATABASE[0];
    let maxScore = -1;

    SEED_DATABASE.forEach(seed => {
      let score = 0;
      if (seed.seasons.includes(advisorSeason as any)) score += 3;
      if (seed.soil_suitability.some(s => s.toLowerCase().includes(advisorSoil.toLowerCase().split(' ')[0]))) score += 3;
      if (advisorWater === 'Rainfed / Drought Prone' && seed.drought_tolerance === 'High') score += 4;
      if (seed.germination_rate >= 94) score += 2;

      if (score > maxScore) {
        maxScore = score;
        bestSeed = seed;
      }
    });

    setAdvisorRecommendation(bestSeed);
  };

  const handleAdoptSeed = (seed: SeedItem) => {
    if (!onSelectCropFromSeed) return;
    const matchedCrop = CROPS_DATA.find(c => c.crop_name.toLowerCase().includes(seed.crop_name.toLowerCase())) || CROPS_DATA[0];
    onSelectCropFromSeed(matchedCrop);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-emerald-950/30 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
            <Database className="w-3.5 h-3.5" /> Simulated National Certified Seed Database
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            High-Yield &amp; Disease-Resistant Seed Registry
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Simulated catalog of certified breeders, ICAR foundation cultivars, germination percentages, and biological resistance genetic traits.
          </p>
        </div>

        <button
          onClick={() => setShowAiAdvisor(!showAiAdvisor)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>{showAiAdvisor ? 'Close Seed Advisor' : 'AI Seed Match Advisor'}</span>
        </button>
      </div>

      {/* AI Seed Advisor Interactive Quiz Card */}
      {showAiAdvisor && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">AI Seed Cultivar Advisor</h3>
                <p className="text-xs text-slate-400">Match farm soil, climatic season, and water status to optimal seed genetics</p>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-mono">Neural Agronomy Scoring</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Soil Classification</label>
              <select
                value={advisorSoil}
                onChange={(e) => setAdvisorSoil(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Alluvial Soil">Alluvial Soil</option>
                <option value="Black Cotton Soil">Black Cotton Soil</option>
                <option value="Sandy Loam">Sandy Loam</option>
                <option value="Clayey Loam">Clayey Loam</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Sowing Season</label>
              <select
                value={advisorSeason}
                onChange={(e) => setAdvisorSeason(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Kharif">Kharif (Monsoon)</option>
                <option value="Rabi">Rabi (Winter)</option>
                <option value="Zaid">Zaid (Summer)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Irrigation Availability</label>
              <select
                value={advisorWater}
                onChange={(e) => setAdvisorWater(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Drip / Assured">Drip / Assured Irrigation</option>
                <option value="Rainfed / Drought Prone">Rainfed / Drought Prone</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={runSeedAdvisor}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md shadow-purple-600/25 flex items-center gap-2 transition"
            >
              <span>Compute Genetic Match</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Advisor Result Output */}
          {advisorRecommendation && (
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Recommended Cultivar: 98% Compatibility Match
                </span>
                <h4 className="font-bold text-base text-white mt-1">
                  {advisorRecommendation.crop_name} - {advisorRecommendation.variety_name}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {advisorRecommendation.features_summary}
                </p>
                <div className="text-[11px] text-slate-400 mt-1">
                  Expected Yield: <span className="font-bold text-emerald-400">{advisorRecommendation.yield_quintal_per_acre} Q/Acre</span> • Germination: <span className="font-bold text-white">{advisorRecommendation.germination_rate}%</span>
                </div>
              </div>

              <button
                onClick={() => handleAdoptSeed(advisorRecommendation)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 transition"
              >
                Adopt for Diagnostic Pipeline
              </button>
            </div>
          )}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by variety, resistance gene, or brand..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 placeholder:text-slate-500"
          />
        </div>

        {/* Season & Crop Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCropFilter}
            onChange={(e) => setSelectedCropFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
          >
            <option value="All">All Crops</option>
            <option value="Tomato">Tomato</option>
            <option value="Rice (Paddy)">Rice (Paddy)</option>
            <option value="Wheat">Wheat</option>
            <option value="Potato">Potato</option>
            <option value="Maize (Corn)">Maize (Corn)</option>
            <option value="Cotton">Cotton</option>
            <option value="Sugarcane">Sugarcane</option>
            <option value="Soybean">Soybean</option>
          </select>

          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
          >
            <option value="All">All Seasons</option>
            <option value="Kharif">Kharif (Monsoon)</option>
            <option value="Rabi">Rabi (Winter)</option>
            <option value="Zaid">Zaid (Summer)</option>
          </select>
        </div>

      </div>

      {/* Seeds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSeeds.map((seed) => (
          <div
            key={seed.seed_id}
            className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-5 space-y-4 transition flex flex-col justify-between group shadow-lg"
          >
            <div>
              
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {seed.certification_tag}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <Percent className="w-3 h-3" /> {seed.germination_rate}% Germination
                </span>
              </div>

              {/* Title & Brand */}
              <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition">
                {seed.crop_name}: {seed.variety_name}
              </h3>
              <p className="text-xs text-slate-400">
                Breeder: <span className="text-slate-300 font-medium">{seed.brand}</span>
              </p>

              {/* Summary */}
              <p className="text-xs text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                {seed.features_summary}
              </p>

              {/* Agronomic specs */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 my-3 text-[11px]">
                <div>
                  <div className="text-slate-500 text-[10px]">Maturity</div>
                  <div className="font-bold text-white">{seed.maturity_days} Days</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">Yield Est.</div>
                  <div className="font-bold text-emerald-400">{seed.yield_quintal_per_acre} Q/Ac</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">Seed Rate</div>
                  <div className="font-bold text-white">{seed.seed_rate_kg_per_acre} kg/Ac</div>
                </div>
              </div>

              {/* Resistance traits */}
              <div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Disease Resistance Genetics:
                </div>
                <div className="flex flex-wrap gap-1">
                  {seed.disease_resistance.map((trait, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Seed Treatment Advice */}
              <div className="mt-3 p-2 rounded-lg bg-purple-950/20 border border-purple-900/30 text-[11px] text-purple-200">
                <span className="font-semibold text-purple-300">Seed Dress Protocol: </span>
                {seed.treatment_advice}
              </div>

            </div>

            {/* Bottom Adopt CTA */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Market MRP: <span className="font-mono font-bold text-white">₹{seed.price_per_kg}/kg</span>
              </span>

              <button
                onClick={() => handleAdoptSeed(seed)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white text-xs font-semibold transition flex items-center gap-1.5"
              >
                <span>Select for Farm</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

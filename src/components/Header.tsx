import React from 'react';
import { Farmer, ActiveTab } from '../types';
import { 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Globe, 
  Server, 
  UserCheck, 
  Sprout, 
  Cpu, 
  FileText, 
  Database,
  Layers,
  ChevronDown,
  Download
} from 'lucide-react';

interface HeaderProps {
  farmer: Farmer;
  onOpenAuth: () => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  sunlightMode: boolean;
  onToggleSunlightMode: () => void;
  speechEnabled: boolean;
  onToggleSpeech: () => void;
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  farmer,
  onOpenAuth,
  activeTab,
  onSelectTab,
  sunlightMode,
  onToggleSunlightMode,
  speechEnabled,
  onToggleSpeech,
  onOpenArchitecture
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      {/* Top Corporate Status Bar */}
      <div className="border-b border-slate-800/50 bg-slate-900/60 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Spring Boot API :8080 &amp; Node AI :5000 Live
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">
              Accenture Industry X • Smart Agriculture Platform
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/agrivision-project.zip"
              download="agrivision-project.zip"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP (VS Code)</span>
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenArchitecture}
              className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-medium transition"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Spring Boot &amp; Docker Compose</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-purple-600/20 flex items-center justify-center">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sprout className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                AgriVision AI
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Accenture AgriTech
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Precision Crop Pathology &amp; Intelligent Fertilizer Recommender
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => onSelectTab('diagnostics')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'diagnostics'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>Crop Diagnostics</span>
          </button>
          <button
            onClick={() => onSelectTab('soil')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'soil'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Soil NPK Analyzer</span>
          </button>
          <button
            onClick={() => onSelectTab('seeds')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'seeds'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Seed Database</span>
          </button>
          <button
            onClick={() => onSelectTab('history')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Reports &amp; History</span>
          </button>
        </nav>

        {/* Right side farmer profile & accessibility controls */}
        <div className="flex items-center gap-2.5">
          {/* Sunlight Mode Toggle */}
          <button
            onClick={onToggleSunlightMode}
            title={sunlightMode ? 'Switch to Night Mode' : 'Sunlight Mode (High Contrast for Outdoor Field)'}
            className={`p-2 rounded-xl border transition ${
              sunlightMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-300'
            }`}
          >
            {sunlightMode ? <Sun className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Voice Guidance Readout Toggle */}
          <button
            onClick={onToggleSpeech}
            title={speechEnabled ? 'Voice Guidance Active' : 'Enable Voice Guidance for Farmers'}
            className={`p-2 rounded-xl border transition ${
              speechEnabled
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-300'
            }`}
          >
            {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Farmer Profile Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition group text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold flex items-center justify-center text-xs">
              {farmer.name.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-white group-hover:text-purple-300 flex items-center gap-1">
                <span>{farmer.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-[10px] text-slate-400 leading-none">
                {farmer.farm_size_acres} Ac • {farmer.location.split(',')[0]}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

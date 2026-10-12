import React from 'react';
import { Farmer } from '../types';
import { Volume2, VolumeX, Sun, Globe, HelpCircle } from 'lucide-react';

interface FarmerAccessibilityBarProps {
  farmer: Farmer;
  speechEnabled: boolean;
  onToggleSpeech: () => void;
  sunlightMode: boolean;
  onToggleSunlightMode: () => void;
  onOpenLanguageGuide: () => void;
}

export const FarmerAccessibilityBar: React.FC<FarmerAccessibilityBarProps> = ({
  farmer,
  speechEnabled,
  onToggleSpeech,
  sunlightMode,
  onToggleSunlightMode,
  onOpenLanguageGuide
}) => {
  const languageGreetings: Record<string, string> = {
    en: 'Welcome, Farmer',
    hi: 'नमस्ते किसान मित्र',
    te: 'రైతు మిత్రునికి స్వాగతం',
    ta: 'வணக்கம் உழவரே',
    mr: 'शेतकरी मित्राचे स्वागत आहे',
    pa: 'ਕਿਸਾਨ ਵੀਰ ਜੀ ਦਾ ਸੁਆਗਤ ਹੈ'
  };

  const greeting = languageGreetings[farmer.preferred_language] || languageGreetings.en;

  return (
    <div className="no-print w-full bg-gradient-to-r from-purple-950/30 via-slate-900 to-emerald-950/20 border-b border-slate-800/60 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left greeting in farmer preferred language */}
        <div className="flex items-center gap-2 text-slate-300">
          <span className="font-bold text-white text-sm">
            {greeting}, {farmer.name}!
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">
            {farmer.farm_size_acres} Acres in {farmer.location}
          </span>
        </div>

        {/* Accessibility quick toggles */}
        <div className="flex items-center gap-2">
          {/* Sunlight Field Contrast */}
          <button
            onClick={onToggleSunlightMode}
            className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
              sunlightMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>{sunlightMode ? 'Sunlight High Contrast: ON' : 'Sunlight Mode (Outdoor)'}</span>
          </button>

          {/* Voice Narration */}
          <button
            onClick={onToggleSpeech}
            className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
              speechEnabled
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {speechEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{speechEnabled ? 'Voice Reader: Ready' : 'Enable Voice Assist'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

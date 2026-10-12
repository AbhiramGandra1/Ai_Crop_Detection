import React from 'react';
import { DiagnosticStep } from '../types';
import { Sprout, Upload, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

interface WorkflowStepperProps {
  currentStep: DiagnosticStep;
  onSelectStep: (step: DiagnosticStep) => void;
  hasDiagnosis: boolean;
  hasSoilData: boolean;
  hasRecommendation: boolean;
}

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({
  currentStep,
  onSelectStep,
  hasDiagnosis,
  hasSoilData,
  hasRecommendation,
}) => {
  const steps = [
    {
      step: 1 as DiagnosticStep,
      title: 'Select Crop',
      subtitle: 'Crop & Variety',
      icon: Sprout,
      isAccessible: true,
      isCompleted: true,
    },
    {
      step: 2 as DiagnosticStep,
      title: 'Leaf AI Vision',
      subtitle: 'Disease Detection',
      icon: Upload,
      isAccessible: true,
      isCompleted: hasDiagnosis,
    },
    {
      step: 3 as DiagnosticStep,
      title: 'Soil NPK & pH',
      subtitle: 'Soil Parameters',
      icon: Layers,
      isAccessible: hasDiagnosis,
      isCompleted: hasSoilData,
    },
    {
      step: 4 as DiagnosticStep,
      title: 'Fertilizer Recommender',
      subtitle: 'Spring Boot Agronomy',
      icon: Sparkles,
      isAccessible: hasDiagnosis && hasSoilData,
      isCompleted: hasRecommendation,
    },
    {
      step: 5 as DiagnosticStep,
      title: 'Diagnosis Report',
      subtitle: 'Official Agronomy Dossier',
      icon: CheckCircle2,
      isAccessible: hasRecommendation,
      isCompleted: hasRecommendation,
    },
  ];

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-3 sm:p-4 mb-6 backdrop-blur-md">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1 font-medium">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          <span>System Workflow Pipeline (Section 10 Implementation)</span>
        </span>
        <span className="text-slate-500">Step {currentStep} of 5</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.step;
          const isDone = s.isCompleted && s.step < currentStep;

          return (
            <button
              key={s.step}
              onClick={() => s.isAccessible && onSelectStep(s.step)}
              disabled={!s.isAccessible}
              className={`relative text-left p-2.5 rounded-xl border transition flex flex-col justify-between ${
                isActive
                  ? 'bg-purple-950/40 border-purple-500 shadow-md shadow-purple-500/10'
                  : s.isAccessible
                  ? 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-slate-300'
                  : 'bg-slate-950/20 border-slate-800/40 text-slate-600 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                  isActive
                    ? 'bg-purple-500 text-white'
                    : isDone
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {isDone ? '✓' : s.step}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : isDone ? 'text-emerald-400' : 'text-slate-500'}`} />
              </div>

              <div>
                <div className={`font-semibold text-xs leading-tight ${isActive ? 'text-white' : 'text-slate-200'}`}>
                  {s.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {s.subtitle}
                </div>
              </div>

              {isActive && (
                <div className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-purple-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

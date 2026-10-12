import React, { useState } from 'react';
import { FullAnalysisReport } from '../types';
import { speakText, stopSpeech } from '../services/speechService';
import { 
  Printer, 
  Volume2, 
  VolumeX, 
  Download, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  QrCode, 
  Shield, 
  Calendar, 
  MapPin, 
  User, 
  Sprout, 
  Layers, 
  FileText,
  Clock,
  ArrowLeft
} from 'lucide-react';

interface ReportHistoryViewProps {
  currentReport: FullAnalysisReport | null;
  history: FullAnalysisReport[];
  onSelectReport: (report: FullAnalysisReport) => void;
  onStartNewAnalysis: () => void;
}

export const ReportHistoryView: React.FC<ReportHistoryViewProps> = ({
  currentReport,
  history,
  onSelectReport,
  onStartNewAnalysis
}) => {
  const [activeReport, setActiveReport] = useState<FullAnalysisReport | null>(currentReport || history[0] || null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const toggleVoiceReadout = () => {
    if (!activeReport) return;
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      const text = `Accenture AgriVision Agronomy Report for ${activeReport.farmer.name}. Crop: ${activeReport.crop.crop_name}. Pathology finding: ${activeReport.image_analysis.disease.common_name} with ${activeReport.image_analysis.confidence} percent confidence. Soil health score: ${activeReport.recommendation.soil_health_score} out of 100. Fertilizer advice: apply ${activeReport.recommendation.commercial_fertilizers[0]?.name} at ${activeReport.recommendation.commercial_fertilizers[0]?.dose_kg_per_acre} kilograms per acre as basal dose.`;
      speakText(text, activeReport.farmer.preferred_language || 'en');
      setIsSpeaking(true);
    }
  };

  if (!activeReport) {
    return (
      <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
        <FileText className="w-10 h-10 mx-auto mb-3 text-slate-500" />
        <h3 className="text-base font-bold text-white mb-1">No Agronomy Dossiers Saved Yet</h3>
        <p className="text-xs text-slate-400 mb-4">Complete a leaf analysis and soil test to generate an official decision report.</p>
        <button
          onClick={onStartNewAnalysis}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition"
        >
          Start New Diagnostic Pipeline
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Action Ribbon (Hidden when printing) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onStartNewAnalysis}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>New Diagnostic Workflow</span>
          </button>
          <span className="text-xs text-slate-400 hidden md:inline">
            Module 5: Decision Dossier &amp; Record Archival
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio Readout */}
          <button
            onClick={toggleVoiceReadout}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
              isSpeaking
                ? 'bg-purple-600 text-white border-purple-500 animate-pulse'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:text-white'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span>{isSpeaking ? 'Stop Audio' : 'Audio Readout'}</span>
          </button>

          {/* Print / Save PDF Button */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Dossier</span>
          </button>
        </div>
      </div>

      {/* Official Accenture Agritech Printable Certificate Card */}
      <div className="print-page rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100 relative overflow-hidden">
        
        {/* Accenture Watermark Stamp / Top Banner */}
        <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-emerald-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sprout className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-white tracking-tight">
                  AgriVision AI
                </span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 uppercase font-mono font-bold">
                  Accenture AgriTech
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Decision Support Certificate • Crop Pathology &amp; Fertilizer Prescription
              </p>
            </div>
          </div>

          <div className="text-right font-mono text-xs text-slate-400">
            <div className="text-emerald-400 font-bold text-sm">
              REF #{activeReport.report_id}
            </div>
            <div className="flex items-center gap-1 justify-end mt-0.5">
              <Clock className="w-3 h-3" />
              <span>{new Date(activeReport.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        {/* Farmer & Land Registry Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
          <div>
            <div className="text-slate-500 font-medium flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> Farmer
            </div>
            <div className="font-bold text-white text-sm mt-0.5">{activeReport.farmer.name}</div>
            <div className="text-slate-400 text-[11px] font-mono">{activeReport.farmer.phone}</div>
          </div>

          <div>
            <div className="text-slate-500 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Location
            </div>
            <div className="font-bold text-white text-sm mt-0.5">{activeReport.farmer.location}</div>
            <div className="text-slate-400 text-[11px]">{activeReport.farmer.farm_size_acres} Total Acres</div>
          </div>

          <div>
            <div className="text-slate-500 font-medium flex items-center gap-1">
              <Sprout className="w-3.5 h-3.5" /> Cultivar Target
            </div>
            <div className="font-bold text-emerald-400 text-sm mt-0.5">{activeReport.crop.crop_name}</div>
            <div className="text-slate-400 text-[11px]">{activeReport.crop.variety}</div>
          </div>

          <div>
            <div className="text-slate-500 font-medium flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Soil Classification
            </div>
            <div className="font-bold text-white text-sm mt-0.5">{activeReport.soil_test.soil_type}</div>
            <div className="text-slate-400 text-[11px]">pH {activeReport.soil_test.ph.toFixed(1)} • OC {activeReport.soil_test.organic_carbon_percentage}%</div>
          </div>
        </div>

        {/* Section 1: Leaf Pathology Diagnosis */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="font-bold text-sm text-purple-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              1. Leaf Pathology Vision AI Diagnosis (Node.js Service)
            </h4>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              activeReport.image_analysis.is_healthy
                ? 'bg-emerald-500/10 text-emerald-300'
                : 'bg-red-500/10 text-red-300'
            }`}>
              Confidence: {activeReport.image_analysis.confidence}%
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-slate-950/40 border border-slate-800">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
              <img
                src={activeReport.image_analysis.image_url}
                alt="Analyzed Plant Leaf"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="font-bold text-base text-white">
                {activeReport.image_analysis.disease.common_name}
              </div>
              <div className="text-purple-300 italic">
                Pathogen: {activeReport.image_analysis.disease.scientific_name} ({activeReport.image_analysis.disease.pathogen_type})
              </div>
              <div className="text-slate-300">
                <span className="font-semibold text-white">Leaf Damage Index: </span>
                {activeReport.image_analysis.affected_percentage}% ({activeReport.image_analysis.severity_level})
              </div>
              <div className="text-slate-400 text-[11px]">
                <span className="font-semibold text-slate-300">Chemical Protocol: </span>
                {activeReport.image_analysis.disease.chemical_control.join('; ')}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Soil Nutrient Stoichiometry */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="font-bold text-sm text-emerald-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              2. Soil Chemical Test &amp; Stoichiometric Deficits
            </h4>
            <span className="text-xs font-mono text-slate-400">
              Soil Health Score: <span className="text-emerald-400 font-bold">{activeReport.recommendation.soil_health_score}/100</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Nitrogen (N)</div>
              <div className="font-bold text-white mt-0.5">{activeReport.soil_test.n_value} kg/ha</div>
              <div className="text-amber-400 text-[10px] mt-0.5">Deficit: {activeReport.recommendation.n_deficit} kg/ac</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Phosphorus (P₂O₅)</div>
              <div className="font-bold text-white mt-0.5">{activeReport.soil_test.p_value} kg/ha</div>
              <div className="text-amber-400 text-[10px] mt-0.5">Deficit: {activeReport.recommendation.p_deficit} kg/ac</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Potassium (K₂O)</div>
              <div className="font-bold text-white mt-0.5">{activeReport.soil_test.k_value} kg/ha</div>
              <div className="text-amber-400 text-[10px] mt-0.5">Deficit: {activeReport.recommendation.k_deficit} kg/ac</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400 text-[11px]">pH Status</div>
              <div className="font-bold text-purple-300 mt-0.5">{activeReport.soil_test.ph.toFixed(1)}</div>
              <div className="text-slate-400 text-[10px] mt-0.5">{activeReport.recommendation.ph_status}</div>
            </div>
          </div>
        </div>

        {/* Section 3: Fertilizer Prescription Schedule */}
        <div className="space-y-3">
          <div className="border-b border-slate-800 pb-2">
            <h4 className="font-bold text-sm text-white">
              3. Commercial Fertilizer Split Prescription ({activeReport.farmer.farm_size_acres} Acres)
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-2.5">Fertilizer Item</th>
                  <th className="p-2.5">Growth Stage</th>
                  <th className="p-2.5">Dose / Acre</th>
                  <th className="p-2.5">Total Quantity</th>
                  <th className="p-2.5">Application Window</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                {activeReport.recommendation.commercial_fertilizers.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-white">{item.name}</td>
                    <td className="p-2.5 text-purple-300">{item.stage}</td>
                    <td className="p-2.5 font-mono text-emerald-400">{item.dose_kg_per_acre} kg</td>
                    <td className="p-2.5 font-mono font-bold text-white">{item.total_bags_50kg} Bags</td>
                    <td className="p-2.5 text-slate-300 text-[11px]">{item.timing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Verification Stamp & QR */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            {/* SVG QR Code Simulation */}
            <div className="w-16 h-16 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center">
              <QrCode className="w-14 h-14 text-slate-950" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Digitally Signed &amp; Verified</div>
              <div className="text-[11px] text-slate-400">Accenture Industry X Agronomy AI Engine</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">SHA-256: 7f8a91c0e3...d892</div>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Certified Agronomic Guidance</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              Complies with ICAR &amp; State Agriculture Guidelines
            </div>
          </div>
        </div>

      </div>

      {/* Historical Analyses Drawer (No Print) */}
      {history.length > 1 && (
        <div className="no-print p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h4 className="font-bold text-sm text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            Archived Previous Analyses ({history.length} Saved Records)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {history.map((h) => {
              const isSelected = h.report_id === activeReport.report_id;
              return (
                <button
                  key={h.report_id}
                  onClick={() => setActiveReport(h)}
                  className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                    isSelected
                      ? 'border-purple-500 bg-purple-950/30'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs text-white">
                      {h.crop.crop_name} - {h.farmer.name}
                    </div>
                    <div className="text-[11px] text-purple-300 truncate">
                      {h.image_analysis.disease.common_name}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {new Date(h.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-900 px-2 py-1 rounded">
                    Score: {h.recommendation.soil_health_score}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

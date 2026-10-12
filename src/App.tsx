import React, { useState, useEffect } from 'react';
import { 
  Farmer, 
  Crop, 
  ImageAnalysisData, 
  SoilTest, 
  RecommendationResult, 
  FullAnalysisReport, 
  ActiveTab, 
  DiagnosticStep 
} from './types';
import { INITIAL_FARMERS } from './data/initialFarmers';
import { CROPS_DATA, LEAF_SAMPLE_PRESETS } from './data/cropsAndDiseases';
import { calculateFertilizerRecommendation } from './services/agronomyEngine';
import { analyzeLeafImage } from './services/aiVisionService';
import { Header } from './components/Header';
import { FarmerAccessibilityBar } from './components/FarmerAccessibilityBar';
import { WorkflowStepper } from './components/WorkflowStepper';
import { CropSelector } from './components/CropSelector';
import { CropLeafAnalyzer } from './components/CropLeafAnalyzer';
import { SoilNutrientAnalyzer } from './components/SoilNutrientAnalyzer';
import { FertilizerRecommendationView } from './components/FertilizerRecommendationView';
import { ReportHistoryView } from './components/ReportHistoryView';
import { SeedCatalogView } from './components/SeedCatalogView';
import { FarmerAuthModal } from './components/FarmerAuthModal';
import { ArchitectureModal } from './components/ArchitectureModal';

export default function App() {
  // Farmer Persona
  const [currentFarmer, setCurrentFarmer] = useState<Farmer>(() => {
    const saved = localStorage.getItem('agrivision_farmer');
    return saved ? JSON.parse(saved) : INITIAL_FARMERS[0];
  });

  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('diagnostics');
  const [diagnosticStep, setDiagnosticStep] = useState<DiagnosticStep>(1);

  // Crop & Pipeline State
  const [selectedCrop, setSelectedCrop] = useState<Crop>(CROPS_DATA[0]); // Default: Tomato
  const [currentAnalysis, setCurrentAnalysis] = useState<ImageAnalysisData | null>(null);
  
  // Soil Test State
  const [soilData, setSoilData] = useState<SoilTest>({
    soil_id: 501,
    farmer_id: currentFarmer.farmer_id,
    n_value: 65,
    p_value: 32,
    k_value: 45,
    ph: 6.4,
    soil_type: 'Alluvial Soil',
    moisture_percentage: 42,
    organic_carbon_percentage: 0.62,
    tested_at: new Date().toISOString()
  });

  // Fertilizer Recommendation Result
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);

  // Historical Records
  const [history, setHistory] = useState<FullAnalysisReport[]>(() => {
    const saved = localStorage.getItem('agrivision_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [];
  });

  // Modals & UI Toggles
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isArchOpen, setIsArchOpen] = useState(false);
  const [sunlightMode, setSunlightMode] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  // Initialize initial analysis & recommendation so app has rich data from turn 1
  useEffect(() => {
    const initDefaultDiagnosis = async () => {
      const defaultPreset = LEAF_SAMPLE_PRESETS[0];
      const initialDiag = await analyzeLeafImage(defaultPreset.thumbnail, selectedCrop, currentFarmer.farmer_id, defaultPreset);
      setCurrentAnalysis(initialDiag);

      const rec = calculateFertilizerRecommendation(currentFarmer, selectedCrop, soilData, initialDiag.analysis_id);
      setRecommendation(rec);

      // Seed initial history item if history is empty
      if (history.length === 0) {
        const initialReport: FullAnalysisReport = {
          report_id: 'ACN-AGRI-2026-X892F',
          timestamp: new Date().toISOString(),
          farmer: currentFarmer,
          crop: selectedCrop,
          image_analysis: initialDiag,
          soil_test: soilData,
          recommendation: rec
        };
        setHistory([initialReport]);
        localStorage.setItem('agrivision_history', JSON.stringify([initialReport]));
      }
    };

    initDefaultDiagnosis();
  }, []);

  // Update body class for sunlight mode
  useEffect(() => {
    if (sunlightMode) {
      document.body.classList.add('sunlight-mode');
    } else {
      document.body.classList.remove('sunlight-mode');
    }
  }, [sunlightMode]);

  // Recalculate recommendation when farmer, crop, or soil changes
  useEffect(() => {
    if (currentFarmer && selectedCrop && soilData) {
      const updatedRec = calculateFertilizerRecommendation(
        currentFarmer,
        selectedCrop,
        soilData,
        currentAnalysis?.analysis_id
      );
      setRecommendation(updatedRec);
    }
  }, [currentFarmer, selectedCrop, soilData, currentAnalysis]);

  // Handlers
  const handleSelectFarmer = (farmer: Farmer) => {
    setCurrentFarmer(farmer);
    localStorage.setItem('agrivision_farmer', JSON.stringify(farmer));
    setSoilData(prev => ({ ...prev, farmer_id: farmer.farmer_id }));
  };

  const handleSelectCrop = (crop: Crop) => {
    setSelectedCrop(crop);
    // Find matching preset for this crop
    const preset = LEAF_SAMPLE_PRESETS.find(p => p.crop_id === crop.crop_id) || LEAF_SAMPLE_PRESETS[0];
    analyzeLeafImage(preset.thumbnail, crop, currentFarmer.farmer_id, preset).then(diag => {
      setCurrentAnalysis(diag);
    });
  };

  const handleAnalysisComplete = (data: ImageAnalysisData) => {
    setCurrentAnalysis(data);
  };

  const handleSaveReportAndProceed = () => {
    if (!currentAnalysis || !recommendation) return;

    const newReport: FullAnalysisReport = {
      report_id: `ACN-AGRI-2026-X${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      farmer: currentFarmer,
      crop: selectedCrop,
      image_analysis: currentAnalysis,
      soil_test: soilData,
      recommendation: recommendation
    };

    const updated = [newReport, ...history];
    setHistory(updated);
    localStorage.setItem('agrivision_history', JSON.stringify(updated));
    setDiagnosticStep(5);
  };

  const handleSelectCropFromSeed = (crop: Crop) => {
    handleSelectCrop(crop);
    setActiveTab('diagnostics');
    setDiagnosticStep(2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-purple-600 selection:text-white">
      
      {/* Top Navbar */}
      <Header
        farmer={currentFarmer}
        onOpenAuth={() => setIsAuthOpen(true)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        sunlightMode={sunlightMode}
        onToggleSunlightMode={() => setSunlightMode(!sunlightMode)}
        speechEnabled={speechEnabled}
        onToggleSpeech={() => setSpeechEnabled(!speechEnabled)}
        onOpenArchitecture={() => setIsArchOpen(true)}
      />

      {/* Farmer Accessibility & Language Ribbon */}
      <FarmerAccessibilityBar
        farmer={currentFarmer}
        speechEnabled={speechEnabled}
        onToggleSpeech={() => setSpeechEnabled(!speechEnabled)}
        sunlightMode={sunlightMode}
        onToggleSunlightMode={() => setSunlightMode(!sunlightMode)}
        onOpenLanguageGuide={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        
        {/* Tab 1: Diagnostics Workflow (Modules 1 - 5 Pipeline) */}
        {activeTab === 'diagnostics' && (
          <div className="space-y-6">
            
            {/* Step Navigation Pipeline */}
            <WorkflowStepper
              currentStep={diagnosticStep}
              onSelectStep={setDiagnosticStep}
              hasDiagnosis={!!currentAnalysis}
              hasSoilData={true}
              hasRecommendation={!!recommendation}
            />

            {/* Step 1: Crop Selection */}
            {diagnosticStep === 1 && (
              <CropSelector
                selectedCrop={selectedCrop}
                onSelectCrop={handleSelectCrop}
                onProceed={() => setDiagnosticStep(2)}
              />
            )}

            {/* Step 2: Leaf Image Vision Analysis (Node.js AI) */}
            {diagnosticStep === 2 && (
              <CropLeafAnalyzer
                selectedCrop={selectedCrop}
                farmerId={currentFarmer.farmer_id}
                currentAnalysis={currentAnalysis}
                onAnalysisComplete={handleAnalysisComplete}
                onProceedToSoil={() => setDiagnosticStep(3)}
              />
            )}

            {/* Step 3: Soil Nutrient Analysis (NPK, pH & Physicochemical) */}
            {diagnosticStep === 3 && (
              <SoilNutrientAnalyzer
                selectedCrop={selectedCrop}
                farmerId={currentFarmer.farmer_id}
                initialSoilData={soilData}
                onSaveSoilData={setSoilData}
                onProceedToRecommendation={() => setDiagnosticStep(4)}
              />
            )}

            {/* Step 4: Spring Boot Fertilizer Recommendation Engine */}
            {diagnosticStep === 4 && recommendation && (
              <FertilizerRecommendationView
                farmer={currentFarmer}
                crop={selectedCrop}
                soil={soilData}
                diseaseAnalysis={currentAnalysis}
                recommendation={recommendation}
                onSaveAndProceed={handleSaveReportAndProceed}
              />
            )}

            {/* Step 5: Official Agronomy Report */}
            {diagnosticStep === 5 && (
              <ReportHistoryView
                currentReport={history[0] || null}
                history={history}
                onSelectReport={(rep) => {}}
                onStartNewAnalysis={() => setDiagnosticStep(1)}
              />
            )}

          </div>
        )}

        {/* Tab 2: Standalone Soil NPK Analyzer */}
        {activeTab === 'soil' && (
          <div className="space-y-6">
            <SoilNutrientAnalyzer
              selectedCrop={selectedCrop}
              farmerId={currentFarmer.farmer_id}
              initialSoilData={soilData}
              onSaveSoilData={setSoilData}
              onProceedToRecommendation={() => {
                setActiveTab('diagnostics');
                setDiagnosticStep(4);
              }}
            />
          </div>
        )}

        {/* Tab 3: Simulated Seed Database */}
        {activeTab === 'seeds' && (
          <div className="space-y-6">
            <SeedCatalogView
              onSelectCropFromSeed={handleSelectCropFromSeed}
            />
          </div>
        )}

        {/* Tab 4: Reports & History Archive */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <ReportHistoryView
              currentReport={history[0] || null}
              history={history}
              onSelectReport={(rep) => {}}
              onStartNewAnalysis={() => {
                setActiveTab('diagnostics');
                setDiagnosticStep(1);
              }}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="no-print border-t border-slate-800/80 bg-slate-950 py-6 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">AgriVision AI</span>
            <span>•</span>
            <span>Accenture Industry X Applied Intelligence</span>
            <span>•</span>
            <span className="text-slate-400">AI-Based Crop Disease Detection &amp; Intelligent Fertilizer Recommender</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsArchOpen(true)}
              className="text-purple-400 hover:text-purple-300 transition underline underline-offset-4"
            >
              Docker Compose &amp; Architecture Specs
            </button>
            <span>•</span>
            <span>PostgreSQL ERD Engine</span>
          </div>
        </div>
      </footer>

      {/* Farmer Authentication Modal */}
      <FarmerAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentFarmer={currentFarmer}
        onSelectFarmer={handleSelectFarmer}
      />

      {/* Architecture & Docker Compose Modal */}
      <ArchitectureModal
        isOpen={isArchOpen}
        onClose={() => setIsArchOpen(false)}
      />

    </div>
  );
}

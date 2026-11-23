import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SymptomAssessment from './pages/SymptomAssessment';
import PredictionResult from './pages/PredictionResult';
import HealthGuidance from './pages/HealthGuidance';
import HowItWorks from './pages/HowItWorks';
import { SYMPTOMS } from './data/symptoms';
import { predictDisease } from './api/predictionApi';

export default function App() {
  // Sync page state with URL hash
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').trim();
    const validPages = ['home', 'assessment', 'result', 'guidance', 'how-it-works'];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useMockMode, setUseMockMode] = useState(
    import.meta.env.VITE_USE_MOCK === 'true' || false
  );

  // Set for O(1) membership check
  const selectedSymptomIds = useMemo(() => {
    return new Set(selectedSymptoms.map((s) => s.id));
  }, [selectedSymptoms]);

  // Keep URL hash in sync
  useEffect(() => {
    window.location.hash = activePage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Handle hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      const validPages = ['home', 'assessment', 'result', 'guidance', 'how-it-works'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Symptom selection handlers
  const handleToggleSymptom = (symptom) => {
    setError(null);
    setSelectedSymptoms((prev) => {
      const exists = prev.some((s) => s.id === symptom.id);
      if (exists) {

        
        return prev.filter((s) => s.id !== symptom.id);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const handleRemoveSymptom = (symptom) => {
    setError(null);
    setSelectedSymptoms((prev) => prev.filter((s) => s.id !== symptom.id));
  };

  const handleClearSelection = () => {
    setSelectedSymptoms([]);
    setError(null);
  };

  // Run ensemble prediction
  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;

    setIsLoading(true);
    setError(null);

    const symptomIds = selectedSymptoms.map((s) => s.id);

    try {
      const result = await predictDisease(symptomIds, { allowMock: useMockMode });
      setPrediction(result);
      setIsLoading(false);
      setActivePage('result');
    } catch (err) {
      console.error('[App] Prediction error:', err);
      setIsLoading(false);
      setError('Unable to analyze the symptoms right now. Please try again.');
    }
  };

  // Start new assessment: reset selections & result, return to assessment
  const handleNewAssessment = () => {
    setSelectedSymptoms([]);
    setPrediction(null);
    setError(null);
    setActivePage('assessment');
  };

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
  };

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="main-content" id="main-content">
        {activePage === 'home' && (
          <Home onNavigate={handleNavigate} />
        )}

        {activePage === 'assessment' && (
          <SymptomAssessment
            allSymptoms={SYMPTOMS}
            selectedSymptoms={selectedSymptoms}
            selectedSymptomIds={selectedSymptomIds}
            onToggleSymptom={handleToggleSymptom}
            onRemoveSymptom={handleRemoveSymptom}
            onClearSelection={handleClearSelection}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            error={error}
            onRetry={handleAnalyze}
            useMockMode={useMockMode}
            onToggleMockMode={setUseMockMode}
          />
        )}

        {activePage === 'result' && (
          <PredictionResult
            prediction={prediction}
            selectedSymptoms={selectedSymptoms}
            onNewAssessment={handleNewAssessment}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'guidance' && (
          <HealthGuidance />
        )}

        {activePage === 'how-it-works' && (
          <HowItWorks />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

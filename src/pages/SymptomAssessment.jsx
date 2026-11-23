import React from 'react';
import SymptomSearch from '../components/SymptomSearch';
import SelectedSymptoms from '../components/SelectedSymptoms';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function SymptomAssessment({
  allSymptoms = [],
  selectedSymptoms = [],
  selectedSymptomIds = new Set(),
  onToggleSymptom,
  onRemoveSymptom,
  onClearSelection,
  onAnalyze,
  isLoading = false,
  error = null,
  onRetry,
  useMockMode = false,
  onToggleMockMode
}) {
  return (
    <div className="assessment-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Symptom Assessment</h1>
          <p className="page-subtitle">
            Select the symptoms you are experiencing to evaluate them with the ensemble models.
          </p>
        </div>

        {/* Loading Indicator */}
        {isLoading && <LoadingState />}

        {/* Error Notification */}
        {error && !isLoading && (
          <ErrorState message={error} onRetry={onRetry} />
        )}

        {/* Assessment Two-Column Layout */}
        <div className="assessment-layout">
          <SymptomSearch
            allSymptoms={allSymptoms}
            selectedSymptomIds={selectedSymptomIds}
            onToggleSymptom={onToggleSymptom}
          />

          <SelectedSymptoms
            selectedSymptoms={selectedSymptoms}
            onRemoveSymptom={onRemoveSymptom}
            onClearSelection={onClearSelection}
            onAnalyze={onAnalyze}
            isLoading={isLoading}
            useMockMode={useMockMode}
            onToggleMockMode={onToggleMockMode}
          />
        </div>
      </div>
    </div>
  );
}

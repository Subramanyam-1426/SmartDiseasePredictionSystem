import React from 'react';
import Button from './Button';

export default function SelectedSymptoms({
  selectedSymptoms = [],
  onRemoveSymptom,
  onClearSelection,
  onAnalyze,
  isLoading = false,
  useMockMode = false,
  onToggleMockMode
}) {
  const count = selectedSymptoms.length;
  const hasSelection = count > 0;

  return (
    <div className="selected-column">
      <div className="selected-panel-header">
        <h2 className="selected-panel-title">Selected Symptoms</h2>
        <span className="selected-counter">
          {count} {count === 1 ? 'symptom' : 'symptoms'} selected
        </span>
      </div>

      {/* Selected Chips Area */}
      <div className="selected-chips-container" aria-live="polite">
        {!hasSelection ? (
          <div className="empty-selection-box">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="empty-selection-text">No symptoms selected yet.</p>
            <p className="empty-selection-hint">
              Select symptoms from the left panel to begin analysis.
            </p>
          </div>
        ) : (
          selectedSymptoms.map((symptom) => (
            <div key={symptom.id} className="chip">
              <span>{symptom.label}</span>
              <button
                type="button"
                className="chip-remove"
                onClick={() => onRemoveSymptom(symptom)}
                aria-label={`Remove ${symptom.label}`}
                title={`Remove ${symptom.label}`}
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>

      {/* Optional Demo Mode Toggle */}
      {typeof onToggleMockMode === 'function' && (
        <div className="demo-mode-toggle" style={{ marginBottom: '1rem' }}>
          <label htmlFor="demo-mode-check" style={{ cursor: 'pointer', userSelect: 'none' }}>
            <span>Demo Mode (offline mock data)</span>
          </label>
          <input
            type="checkbox"
            id="demo-mode-check"
            className="demo-checkbox"
            checked={useMockMode}
            onChange={(e) => onToggleMockMode(e.target.checked)}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="selected-actions">
        <Button
          variant="primary"
          size="lg"
          disabled={!hasSelection || isLoading}
          onClick={onAnalyze}
          id="analyze-symptoms-btn"
        >
          {isLoading ? 'Analyzing Symptoms...' : 'Analyze Symptoms'}
        </Button>

        {hasSelection && (
          <Button
            variant="outline"
            size="base"
            disabled={isLoading}
            onClick={onClearSelection}
          >
            Clear Selection
          </Button>
        )}
      </div>
    </div>
  );
}

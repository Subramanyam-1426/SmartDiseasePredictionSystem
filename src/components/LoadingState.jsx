import React from 'react';

export default function LoadingState() {
  return (
    <div className="loading-box" role="status" aria-live="polite">
      <div className="spinner" />
      <h3 className="loading-title">Analyzing symptom pattern...</h3>
      <p className="loading-desc">
        Formatting symptom vector &bull; Querying 4 ML models &bull; Calculating majority vote
      </p>
    </div>
  );
}

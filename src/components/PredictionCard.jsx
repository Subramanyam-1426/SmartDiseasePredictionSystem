import React from 'react';

export default function PredictionCard({
  disease = 'Unknown',
  winnerVotes = 3,
  totalVotes = 4,
  isMock = false
}) {
  return (
    <div className="result-hero-card">
      <div className="result-hero-left">
        <div className="result-hero-caption">Predicted Disease</div>
        <h2 className="result-disease-name">{disease}</h2>
        <div className="result-hero-vote-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Majority Vote: {winnerVotes} / {totalVotes} Models</span>
        </div>
        {isMock && (
          <div>
            <span className="result-mock-badge">Demo Mode: Mock Prediction</span>
          </div>
        )}
      </div>
    </div>
  );
}

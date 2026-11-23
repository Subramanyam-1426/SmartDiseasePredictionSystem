import React from 'react';
import PredictionCard from '../components/PredictionCard';
import ModelPredictions from '../components/ModelPredictions';
import VotingSummary from '../components/VotingSummary';
import Button from '../components/Button';

export default function PredictionResult({
  prediction,
  selectedSymptoms = [],
  onNewAssessment,
  onNavigate
}) {
  // If no prediction is available yet
  if (!prediction) {
    return (
      <div className="result-page">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <div className="content-card" style={{ maxWidth: '560px', margin: '0 auto', padding: '3rem 2rem' }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="1.75"
              style={{ margin: '0 auto 1.25rem' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h2 className="page-title" style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>
              No Prediction Available
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
              Please select symptoms and run an assessment to generate multi-model ensemble predictions.
            </p>
            <Button variant="primary" size="lg" onClick={() => onNavigate('assessment')}>
              Go to Symptom Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const {
    finalPrediction = 'Unknown',
    winnerVotes = 3,
    totalVotes = 4,
    modelPredictions = [],
    votes = {},
    isMock = false
  } = prediction;

  return (
    <div className="result-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Prediction Result</h1>
          <p className="page-subtitle">
            Prediction based on the selected symptom pattern.
          </p>
        </div>

        {/* Medium-sized Result Card */}
        <PredictionCard
          disease={finalPrediction}
          winnerVotes={winnerVotes}
          totalVotes={totalVotes}
          isMock={isMock}
        />

        {/* Model Predictions Table + Voting Summary Grid */}
        <div className="result-sections-grid">
          <ModelPredictions modelPredictions={modelPredictions} />
          <VotingSummary
            finalPrediction={finalPrediction}
            winnerVotes={winnerVotes}
            totalVotes={totalVotes}
            votes={votes}
          />
        </div>

        {/* Selected Symptoms on Result Page */}
        <div className="selected-symptoms-section">
          <h3 className="content-card-title" style={{ marginBottom: '0.5rem' }}>
            <span>Selected Symptoms</span>
            <span className="badge badge-primary">{selectedSymptoms.length} Input Features</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            The following symptoms were evaluated as active features (value 1) in the 132-dimension symptom vector:
          </p>
          <div className="chips-wrap">
            {selectedSymptoms.map((symptom) => (
              <span key={symptom.id} className="chip">
                {symptom.label}
              </span>
            ))}
          </div>
        </div>

        {/* Explanation Box */}
        <div className="explanation-box">
          <h4 className="explanation-title">How the result was generated</h4>
          <p className="explanation-text">
            The selected symptoms were provided to four machine-learning classifiers. Each model generated an individual disease prediction. The final prediction was selected using majority voting.
          </p>
        </div>

        {/* Action Button: New Assessment */}
        <div className="result-page-actions">
          <Button
            variant="primary"
            size="lg"
            onClick={onNewAssessment}
            id="new-assessment-btn"
          >
            New Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}

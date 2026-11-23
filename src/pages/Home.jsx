import React from 'react';
import Button from '../components/Button';
import ModelCard from '../components/ModelCard';

export default function Home({ onNavigate }) {
  const models = [
    {
      name: 'Linear SVM',
      typeTag: 'Margin Classifier',
      description: 'Separates disease classes using a linear decision boundary.'
    },
    {
      name: 'K-Nearest Neighbors',
      typeTag: 'Instance-Based',
      description: 'Predicts based on the nearest symptom patterns.'
    },
    {
      name: 'Random Forest',
      typeTag: 'Ensemble Bagging',
      description: 'Combines multiple decision trees for classification.'
    },
    {
      name: 'Gradient Boosting',
      typeTag: 'Sequential Boosting',
      description: 'Builds trees sequentially to improve classification.'
    }
  ];

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section" aria-labelledby="hero-heading">
          <span className="hero-label">MULTI-MODEL DISEASE PREDICTION</span>
          <h1 id="hero-heading" className="hero-title">
            Smart Disease Prediction
          </h1>
          <p className="hero-desc">
            Analyze your symptoms using multiple machine-learning models and majority voting.
          </p>
          <div className="hero-actions">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('assessment')}
            >
              Start Symptom Assessment
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('how-it-works')}
            >
              How It Works
            </Button>
          </div>
        </section>

        {/* Project Information Cards */}
        <section aria-label="Dataset and Model Statistics">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">132</div>
              <div className="stat-label">Symptom Features</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4</div>
              <div className="stat-label">Machine Learning Models</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">41</div>
              <div className="stat-label">Disease Classes</div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="workflow-section" aria-labelledby="workflow-heading">
          <div className="section-header">
            <h2 id="workflow-heading" className="section-title">
              How the Prediction Works
            </h2>
            <p className="section-subtitle">
              A 4-step ensemble pipeline designed for balanced consensus.
            </p>
          </div>

          <div className="workflow-steps">
            <div className="workflow-step">
              <span className="step-number">01</span>
              <h3 className="step-title">Select Symptoms</h3>
              <p className="step-desc">
                Choose the exact symptoms you are currently experiencing from 132 standardized clinical features.
              </p>
            </div>

            <div className="workflow-step">
              <span className="step-number">02</span>
              <h3 className="step-title">Four ML Models Analyze</h3>
              <p className="step-desc">
                Linear SVM, KNN, Random Forest, and Gradient Boosting each evaluate the symptom pattern independently.
              </p>
            </div>

            <div className="workflow-step">
              <span className="step-number">03</span>
              <h3 className="step-title">Majority Voting</h3>
              <p className="step-desc">
                Individual predictions are aggregated via hard voting to eliminate single-model bias.
              </p>
            </div>

            <div className="workflow-step">
              <span className="step-number">04</span>
              <h3 className="step-title">Final Prediction</h3>
              <p className="step-desc">
                The disease class with the highest vote count is returned as the final ensemble prediction.
              </p>
            </div>
          </div>
        </section>

        {/* Machine Learning Models Section */}
        <section className="models-section" aria-labelledby="models-heading">
          <div className="section-header">
            <h2 id="models-heading" className="section-title">
              Four Machine-Learning Models
            </h2>
            <p className="section-subtitle">
              Diverse algorithmic architectures combined into a unified voting ensemble.
            </p>
          </div>

          <div className="models-grid">
            {models.map((model) => (
              <ModelCard
                key={model.name}
                name={model.name}
                typeTag={model.typeTag}
                description={model.description}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

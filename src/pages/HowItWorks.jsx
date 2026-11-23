import React from 'react';
import ModelCard from '../components/ModelCard';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'User Selects Symptoms',
      desc: 'The user selects active symptoms through a searchable interface containing all 132 standardized symptoms present in the clinical training dataset.'
    },
    {
      step: '02',
      title: 'Input Vector Conversion',
      desc: 'The selected symptoms are transformed into a 132-element binary feature vector (0 for absent, 1 for present), exactly matching the feature schema expected by the machine-learning pipeline.'
    },
    {
      step: '03',
      title: 'Four ML Models Generate Predictions',
      desc: 'The binary symptom vector is passed simultaneously to four independently trained classification models: Linear SVM, K-Nearest Neighbors, Random Forest, and Gradient Boosting.'
    },
    {
      step: '04',
      title: 'Hard Voting / Majority Voting',
      desc: 'Predictions from all four models are aggregated using hard voting (plurality consensus). Each model casts exactly one vote for its predicted disease class.'
    },
    {
      step: '05',
      title: 'Final Disease Prediction',
      desc: 'The disease class that receives the highest count of model votes (e.g. 3 out of 4) is designated as the ensemble decision, reducing individual model bias and variance.'
    }
  ];

  const models = [
    {
      name: 'Linear SVM',
      typeTag: 'Support Vector Machine',
      description: 'Finds the optimal separating hyperplane that maximizes the margin between different disease clusters in high-dimensional feature space.'
    },
    {
      name: 'K-Nearest Neighbors (KNN)',
      typeTag: 'Instance-Based Learner',
      description: 'Measures metric distance (such as Euclidean distance) to historical patient records and assigns the majority disease class of the closest neighbors.'
    },
    {
      name: 'Random Forest',
      typeTag: 'Bagging Ensemble',
      description: 'Constructs an ensemble of uncorrelated decision trees trained on bootstrap samples with random feature subsets, mitigating individual tree overfitting.'
    },
    {
      name: 'Gradient Boosting',
      typeTag: 'Boosting Ensemble',
      description: 'Sequentially optimizes shallow decision trees by correcting residual errors from prior stages using gradient descent on the loss function.'
    }
  ];

  return (
    <div className="how-it-works-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">How It Works</h1>
          <p className="page-subtitle">
            An overview of the machine-learning pipeline, ensemble voting logic, and model architectures.
          </p>
        </div>

        {/* 5-Step Process */}
        <section style={{ marginBottom: '3.5rem' }} aria-labelledby="pipeline-steps-heading">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
            <h2 id="pipeline-steps-heading" className="section-title">
              Prediction Pipeline (5 Steps)
            </h2>
            <p className="section-subtitle">
              From symptom selection to majority-voting ensemble consensus.
            </p>
          </div>

          <div className="steps-vertical">
            {steps.map((item) => (
              <div key={item.step} className="step-card-horizontal">
                <div className="step-badge-large">{item.step}</div>
                <div className="step-body">
                  <h3 className="step-heading">{item.title}</h3>
                  <p className="step-detail">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Four ML Classifiers */}
        <section style={{ marginBottom: '3rem' }} aria-labelledby="ensemble-models-heading">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
            <h2 id="ensemble-models-heading" className="section-title">
              The Four Machine-Learning Classifiers
            </h2>
            <p className="section-subtitle">
              Diverse algorithmic foundations combined to achieve robust predictions.
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

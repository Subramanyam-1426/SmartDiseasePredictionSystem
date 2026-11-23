import React from 'react';

export default function ModelPredictions({ modelPredictions = [] }) {
  return (
    <div className="content-card">
      <h3 className="content-card-title">
        <span>Model Predictions</span>
        <span className="badge badge-primary">4 Classifiers</span>
      </h3>

      <div className="models-table-container">
        <table className="models-table" aria-label="Individual ML Model Predictions">
          <thead>
            <tr>
              <th>Model</th>
              <th>Prediction</th>
              <th style={{ textAlign: 'center', width: '80px' }}>Vote</th>
            </tr>
          </thead>
          <tbody>
            {modelPredictions.map((model) => (
              <tr
                key={model.key}
                className={model.agreesWithFinal ? 'agree-row' : ''}
              >
                <td className="model-name-cell">{model.name}</td>
                <td>{model.prediction}</td>
                <td style={{ textAlign: 'center' }}>
                  {model.agreesWithFinal ? (
                    <span className="vote-agree-check" title="Matches majority prediction">
                      &#10003;
                    </span>
                  ) : (
                    <span style={{ color: 'var(--color-text-light)' }}>&mdash;</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

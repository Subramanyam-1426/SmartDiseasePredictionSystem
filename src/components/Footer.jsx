import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <div className="footer-brand">Smart Disease Prediction</div>
            <div className="footer-tagline">Machine Learning Project &bull; Model Ensemble</div>
          </div>
          <div className="footer-disclaimer">
            Educational use only &mdash; not a medical diagnosis.
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';

export default function ModelCard({ name, typeTag, description }) {
  return (
    <div className="model-card">
      <div className="model-card-header">
        <span className="model-type-tag">{typeTag}</span>
      </div>
      <h3 className="model-card-title">{name}</h3>
      <p className="model-card-desc">{description}</p>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { SYMPTOM_CATEGORIES } from '../data/symptoms';

export default function SymptomSearch({
  allSymptoms = [],
  selectedSymptomIds = new Set(),
  onToggleSymptom
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter symptoms based on query and category
  const filteredSymptoms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allSymptoms.filter((symptom) => {
      const matchesSearch =
        !q ||
        symptom.label.toLowerCase().includes(q) ||
        symptom.id.toLowerCase().includes(q);

      const matchesCategory =
        activeCategory === 'All' || symptom.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allSymptoms, searchQuery, activeCategory]);

  return (
    <div className="selection-column">
      <div className="search-box-wrapper">
        <span className="search-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          id="symptom-search-input"
          className="search-input"
          placeholder="Search symptoms (e.g. fever, headache, cough)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search symptoms"
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search input"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Category Pills Bar */}
      <div className="category-filter-bar" role="tablist" aria-label="Symptom Categories">
        {SYMPTOM_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Header */}
      <div className="symptom-results-header">
        <span className="results-count">
          Showing {filteredSymptoms.length} of {allSymptoms.length} symptoms
        </span>
        {searchQuery && (
          <button
            type="button"
            className="btn-outline btn-sm"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Symptoms Selectable List */}
      <div className="symptoms-scroll-container" role="list">
        {filteredSymptoms.length === 0 ? (
          <div className="empty-selection-box">
            <p className="empty-selection-text">No symptoms matching "{searchQuery}"</p>
            <p className="empty-selection-hint">Try searching for a different keyword or reset categories.</p>
          </div>
        ) : (
          filteredSymptoms.map((symptom) => {
            const isSelected = selectedSymptomIds.has(symptom.id);

            return (
              <button
                key={symptom.id}
                type="button"
                className={`symptom-row-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => onToggleSymptom(symptom)}
                aria-pressed={isSelected}
              >
                <div>
                  <span className="symptom-row-title">{symptom.label}</span>
                </div>
                <div className="symptom-row-meta">
                  <span className="symptom-cat-badge">{symptom.category}</span>
                  <div className="symptom-check-circle" aria-hidden="true">
                    {isSelected && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

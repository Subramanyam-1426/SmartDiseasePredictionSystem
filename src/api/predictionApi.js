/**
 * API Service Layer for Disease Prediction
 * 
 * Centralizes all communication between the React frontend and
 * the Python ML backend ensemble service.
 */

import { getMockPrediction } from './mockPrediction';

// Configurable API base URL (can be set via .env or VITE_API_BASE_URL)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

// Global flag to enable mock fallback when backend server is offline
const FORCE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

/**
 * Normalizes backend prediction response into a clean, consistent UI model.
 * Keeps response mapping in one central place.
 * 
 * @param {object} raw - Raw API response
 * @returns {object} Normalized prediction object
 */
export function normalizePredictionResponse(raw) {
  if (!raw) {
    throw new Error('Empty prediction response received from backend.');
  }

  const finalPrediction =
    raw.final_prediction ||
    raw.finalPrediction ||
    raw.prediction ||
    'Unknown';

  const rawPredictions = raw.predictions || {};

  const modelMap = [
    {
      key: 'svm',
      name: 'Linear SVM',
      val: rawPredictions.svm || rawPredictions.linear_svm || rawPredictions['Linear SVM'] || 'N/A'
    },
    {
      key: 'knn',
      name: 'KNN',
      val: rawPredictions.knn || rawPredictions.k_nearest_neighbors || rawPredictions['KNN'] || 'N/A'
    },
    {
      key: 'random_forest',
      name: 'Random Forest',
      val: rawPredictions.random_forest || rawPredictions.rf || rawPredictions['Random Forest'] || 'N/A'
    },
    {
      key: 'gradient_boosting',
      name: 'Gradient Boosting',
      val: rawPredictions.gradient_boosting || rawPredictions.gb || rawPredictions['Gradient Boosting'] || 'N/A'
    }
  ];

  const modelPredictions = modelMap.map((m) => ({
    key: m.key,
    name: m.name,
    prediction: m.val,
    agreesWithFinal: m.val.toLowerCase().trim() === finalPrediction.toLowerCase().trim()
  }));

  // Build or extract votes object
  let votes = raw.votes;
  if (!votes || typeof votes !== 'object') {
    votes = {};
    modelPredictions.forEach((m) => {
      if (m.prediction && m.prediction !== 'N/A') {
        votes[m.prediction] = (votes[m.prediction] || 0) + 1;
      }
    });
  }

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0) || 4;
  const winnerVotes = votes[finalPrediction] || modelPredictions.filter((m) => m.agreesWithFinal).length;

  return {
    finalPrediction,
    winnerVotes,
    totalVotes,
    modelPredictions,
    votes,
    isMock: Boolean(raw.is_mock)
  };
}

/**
 * Sends selected symptoms to backend API and returns normalized predictions.
 * 
 * @param {string[]} symptoms - Array of selected symptom identifiers
 * @param {object} options - Optional configuration (e.g. allowMockFallback)
 * @returns {Promise<object>} Normalized prediction response
 */
export async function predictDisease(symptoms = [], options = {}) {
  const allowMock = options.allowMock ?? true;

  if (FORCE_MOCK) {
    console.info('[PredictionApi] VITE_USE_MOCK is set to true. Using mock service.');
    const mockRaw = await getMockPrediction(symptoms);
    return normalizePredictionResponse(mockRaw);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        symptoms: symptoms
      })
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`Server returned HTTP ${response.status}: ${errText}`);
    }

    const data = await response.json();
    return normalizePredictionResponse(data);
  } catch (error) {
    console.error('[PredictionApi] Backend request failed:', error);

    // If backend is offline and mock fallback is allowed for college presentation testing
    if (allowMock) {
      console.warn(
        '[PredictionApi] Live backend unreachable at ' +
          API_BASE_URL +
          '. Falling back to local mock prediction for UI testing.'
      );
      const mockRaw = await getMockPrediction(symptoms);
      return normalizePredictionResponse(mockRaw);
    }

    // User-facing clean error message
    throw new Error('Unable to analyze the symptoms right now. Please try again.');
  }
}

export default {
  predictDisease,
  normalizePredictionResponse
};

/**
 * ==============================================================
 * TEMPORARY MOCK PREDICTION SERVICE
 * ==============================================================
 * 
 * IMPORTANT NOTICE:
 * This file contains strictly TEMPORARY mock data for UI testing
 * and demonstration when the Python ML backend is offline.
 * 
 * - Clearly separated from production API logic.
 * - Easy to remove or disable.
 * - Does NOT replace real machine learning predictions.
 * ==============================================================
 */

/**
 * Generates a mock ensemble response based on selected symptoms
 * to demonstrate the hard-voting UI workflow.
 * 
 * @param {string[]} symptomIds - Array of symptom IDs selected by the user
 * @returns {Promise<object>} Mock prediction response structure
 */
export async function getMockPrediction(symptomIds = []) {
  // Simulate network latency (400-600ms) for realistic UX testing
  await new Promise((resolve) => setTimeout(resolve, 500));

  const lower = symptomIds.map((s) => s.toLowerCase());

  let predictedDisease = 'Common Cold';
  let minorityDisease = 'Allergy';

  if (
    lower.some((s) => s.includes('rash') || s.includes('itching') || s.includes('nodal'))
  ) {
    predictedDisease = 'Fungal infection';
    minorityDisease = 'Drug Reaction';
  } else if (
    lower.some((s) => s.includes('joint') || s.includes('muscle') || s.includes('knee'))
  ) {
    predictedDisease = 'Arthritis';
    minorityDisease = 'Osteoarthristis';
  } else if (
    lower.some((s) => s.includes('yellow') || s.includes('liver') || s.includes('jaundice'))
  ) {
    predictedDisease = 'Jaundice';
    minorityDisease = 'Hepatitis B';
  } else if (
    lower.some((s) => s.includes('chills') || s.includes('high_fever') || s.includes('sweat'))
  ) {
    predictedDisease = 'Malaria';
    minorityDisease = 'Dengue';
  } else if (
    lower.some((s) => s.includes('stomach') || s.includes('acidity') || s.includes('vomit'))
  ) {
    predictedDisease = 'GERD';
    minorityDisease = 'Peptic ulcer diseae';
  } else if (
    lower.some((s) => s.includes('chest') || s.includes('breath') || s.includes('cough'))
  ) {
    predictedDisease = 'Bronchial Asthma';
    minorityDisease = 'Pneumonia';
  } else if (
    lower.some((s) => s.includes('headache') || s.includes('dizziness') || s.includes('balance'))
  ) {
    predictedDisease = 'Migraine';
    minorityDisease = 'Hypertension';
  }

  // 3 models predict the dominant disease, 1 predicts minority (3/4 majority voting example)
  return {
    predictions: {
      svm: predictedDisease,
      knn: predictedDisease,
      random_forest: minorityDisease,
      gradient_boosting: predictedDisease
    },
    final_prediction: predictedDisease,
    votes: {
      [predictedDisease]: 3,
      [minorityDisease]: 1
    },
    is_mock: true
  };
}

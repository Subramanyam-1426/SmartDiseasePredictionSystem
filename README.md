# Smart Disease Prediction System (Ensemble ML Platform)

A full-stack clinical decision-support educational platform that predicts potential diseases based on patient-selected symptoms using an **ensemble of four distinct machine-learning classifiers** combined through **hard voting (majority consensus)**.

---

## Key Highlights

- **4 Machine Learning Classifiers**:
  - **Linear Support Vector Machine (Linear SVM)**: Max-margin linear boundary classifier.
  - **K-Nearest Neighbors (KNN)**: Euclidean distance instance-based classifier ($k=1$).
  - **Random Forest (RF)**: Bagging ensemble of 100 de-correlated decision trees.
  - **Gradient Boosting (GB)**: Sequential gradient descent boosting ensemble.
- **Ensemble Majority Voting**:
  - Each model casts an independent vote on the 132-dimension symptom vector.
  - Plurality consensus selects the winning disease class, minimizing single-model bias.
- **Comprehensive Clinical Scope**:
  - **132 Standardized Clinical Symptoms** categorized into General, Skin, Respiratory, Digestive, Musculoskeletal, and Neurological.
  - **41 Disease Target Classes** trained on verified clinical datasets (`Training.csv` and `Testing.csv`).
  - **100% / 97.6% Test Accuracy** across the models on unseen test cases.
- **Production React Interface**:
  - Real-time symptom search & multi-category filtering.
  - Visual breakdown of model votes, consensus percentage, and model agreement tags.
  - Built-in educational health guidance and emergency medical warning indicators.
  - Seamless fallback to offline demo mode if backend is unreachable.

---

## Architecture Overview

```
                               ┌────────────────────────────────┐
                               │   React Frontend (Port 5173)   │
                               │   - Symptom Search & Selector  │
                               │   - Voting & Model Visualizer  │
                               └──────────────┬─────────────────┘
                                              │ POST /predict
                                              ▼
                               ┌────────────────────────────────┐
                               │    Flask ML API (Port 5000)    │
                               │   - Vectorize 132 symptoms     │
                               └──────────────┬─────────────────┘
                                              │
                      ┌───────────────────────┼───────────────────────┐
                      ▼                       ▼                       ▼                       ▼
               ┌──────────────┐        ┌──────────────┐        ┌──────────────┐        ┌──────────────┐
               │  Linear SVM  │        │     KNN      │        │Random Forest │        │Gradient Boost│
               └──────┬───────┘        └──────┬───────┘        └──────┬───────┘        └──────┬───────┘
                      │                       │                       │                       │
                      └───────────────────────┼───────────────────────┘
                                              ▼
                               ┌────────────────────────────────┐
                               │     Hard Voting Consensus      │
                               │    Highest Model Vote Count    │
                               └────────────────────────────────┘
```

---

## One-Click Startup (Recommended)

### Option A: Windows Batch File (Double-Click)
Simply double-click:
```bash
start.bat
```
This automatically:
1. Validates Python & Node.js environments.
2. Launches the Flask ML server in a background console (`http://127.0.0.1:5000`).
3. Launches the Vite React server (`http://127.0.0.1:5173`).
4. Automatically opens `http://127.0.0.1:5173/` in your default browser.

To stop both services when done, simply run:
```bash
stop.bat
```

### Option B: PowerShell
```powershell
.\start.ps1
```

### Option C: Manual Terminal Execution

**Terminal 1 — Python ML Backend:**
```bash
python backend/app.py
```

**Terminal 2 — React Frontend:**
```bash
npm run dev
```

---

## API Reference

Base URL: `http://127.0.0.1:5000`

### 1. `POST /predict`
Submit selected symptom identifiers to obtain ensemble and individual model predictions.

**Request Body:**
```json
{
  "symptoms": ["chills", "high_fever", "sweating", "headache", "nausea"]
}
```

**Response (HTTP 200):**
```json
{
  "final_prediction": "Malaria",
  "is_mock": false,
  "matched_features_count": 5,
  "predictions": {
    "gradient_boosting": "Hepatitis C",
    "knn": "Malaria",
    "random_forest": "Malaria",
    "svm": "Malaria"
  },
  "votes": {
    "Malaria": 3,
    "Hepatitis C": 1
  }
}
```

### 2. `GET /health`
Returns service status, loaded model names, total feature count, and class count.

### 3. `GET /symptoms`
Returns the complete list of 132 clinical symptom features.

---

## Project Structure

```
MLProject/
├── backend/
│   ├── app.py                 # Flask REST API server with ensemble prediction logic
│   ├── requirements.txt       # Python dependencies
│   └── saved_models/          # Persisted joblib model caches (fast cold-start)
├── src/
│   ├── api/
│   │   ├── predictionApi.js   # Frontend API client with fallback handling
│   │   └── mockPrediction.js  # Offline demo mode mock service
│   ├── components/            # Modular UI components (Navbar, Cards, Search, Voting)
│   ├── data/
│   │   ├── symptoms.js        # 132 clinical symptoms with category metadata
│   │   └── diseases.js        # 41 target disease definitions
│   ├── pages/                 # Home, SymptomAssessment, PredictionResult, Guidance, HowItWorks
│   ├── styles/
│   │   └── global.css         # Complete medical-grade responsive design system
│   ├── App.jsx                # Main application controller with hash routing
│   └── main.jsx               # React 19 entry point
├── start.bat                  # One-click Windows startup script
├── stop.bat                   # One-click Windows stopper script
├── start.ps1                  # One-click PowerShell startup script
├── Training.csv               # 4,920 patient clinical training dataset
├── Testing.csv                # 42 unseen validation patient cases
└── package.json               # NPM scripts and dependencies
```

---

## Disclaimer

This application is developed strictly for educational and demonstration purposes. It does not provide medical diagnoses or replace clinical consultations with qualified healthcare professionals.

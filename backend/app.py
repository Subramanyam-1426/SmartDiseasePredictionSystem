"""
Smart Disease Prediction System - Python ML Backend
====================================================
Serves the ensemble machine-learning model combining:
1. Support Vector Machine (Linear SVM)
2. K-Nearest Neighbors (KNN)
3. Random Forest (RF)
4. Gradient Boosting (GB)

Aggregated via Hard-Voting (Majority Consensus) for clinical decision support.
"""

import os
import json
import numpy as np
import pandas as pd
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
# Enable CORS for frontend requests from any local origin (e.g. Vite dev server on 5173 or 3000)
CORS(app, resources={r"/*": {"origins": "*"}})

# Directories and model storage
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, ".."))
MODELS_DIR = os.path.join(BASE_DIR, "saved_models")
TRAIN_CSV = os.path.join(PROJECT_ROOT, "Training.csv")
TEST_CSV = os.path.join(PROJECT_ROOT, "Testing.csv")

os.makedirs(MODELS_DIR, exist_ok=True)

# Global model state
models = {}
label_encoder = None
feature_columns = []


def train_and_cache_models():
    """
    Trains all 4 classification models and persists them with joblib
    for fast server cold-starts.
    """
    global models, label_encoder, feature_columns

    print("[ML Backend] Training models from Training.csv...")
    if not os.path.exists(TRAIN_CSV):
        raise FileNotFoundError(f"Training dataset not found at {TRAIN_CSV}")

    df_train = pd.read_csv(TRAIN_CSV)
    
    # Strip whitespace from columns if any
    df_train.columns = [col.strip() for col in df_train.columns]

    drop_cols = [c for c in ["prognosis", "Unnamed: 133"] if c in df_train.columns]
    X_train = df_train.drop(columns=drop_cols)
    y_train = df_train["prognosis"].str.strip()

    feature_columns = list(X_train.columns)

    # Encode disease names
    encoder = LabelEncoder()
    y_train_encoded = encoder.fit_transform(y_train)

    print(f"[ML Backend] Features: {len(feature_columns)}, Disease classes: {len(encoder.classes_)}")

    # 1. Linear SVM
    print("[ML Backend] Training Linear SVM...")
    svm_model = SVC(kernel="linear", random_state=1, probability=True)
    svm_model.fit(X_train, y_train_encoded)

    # 2. KNN
    print("[ML Backend] Training K-Nearest Neighbors...")
    knn_model = KNeighborsClassifier(n_neighbors=1, metric="euclidean")
    knn_model.fit(X_train, y_train_encoded)

    # 3. Random Forest
    print("[ML Backend] Training Random Forest...")
    rf_model = RandomForestClassifier(n_estimators=100, max_features="sqrt", random_state=42, n_jobs=-1)
    rf_model.fit(X_train, y_train_encoded)

    # 4. Gradient Boosting
    print("[ML Backend] Training Gradient Boosting...")
    gb_model = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
    gb_model.fit(X_train, y_train_encoded)

    # Save to disk
    joblib.dump(svm_model, os.path.join(MODELS_DIR, "svm.joblib"))
    joblib.dump(knn_model, os.path.join(MODELS_DIR, "knn.joblib"))
    joblib.dump(rf_model, os.path.join(MODELS_DIR, "rf.joblib"))
    joblib.dump(gb_model, os.path.join(MODELS_DIR, "gb.joblib"))
    joblib.dump(encoder, os.path.join(MODELS_DIR, "encoder.joblib"))
    joblib.dump(feature_columns, os.path.join(MODELS_DIR, "features.joblib"))

    models = {
        "svm": svm_model,
        "knn": knn_model,
        "random_forest": rf_model,
        "gradient_boosting": gb_model
    }
    label_encoder = encoder
    print("[ML Backend] All 4 models trained and cached successfully!")


def load_or_train_models():
    """Loads cached models or initiates training if not cached."""
    global models, label_encoder, feature_columns

    required_files = [
        os.path.join(MODELS_DIR, "svm.joblib"),
        os.path.join(MODELS_DIR, "knn.joblib"),
        os.path.join(MODELS_DIR, "rf.joblib"),
        os.path.join(MODELS_DIR, "gb.joblib"),
        os.path.join(MODELS_DIR, "encoder.joblib"),
        os.path.join(MODELS_DIR, "features.joblib")
    ]

    all_exist = all(os.path.exists(f) for f in required_files)

    if all_exist:
        try:
            print("[ML Backend] Loading models from cache...")
            models = {
                "svm": joblib.load(os.path.join(MODELS_DIR, "svm.joblib")),
                "knn": joblib.load(os.path.join(MODELS_DIR, "knn.joblib")),
                "random_forest": joblib.load(os.path.join(MODELS_DIR, "rf.joblib")),
                "gradient_boosting": joblib.load(os.path.join(MODELS_DIR, "gb.joblib"))
            }
            label_encoder = joblib.load(os.path.join(MODELS_DIR, "encoder.joblib"))
            feature_columns = joblib.load(os.path.join(MODELS_DIR, "features.joblib"))
            print(f"[ML Backend] Loaded successfully. Classes: {len(label_encoder.classes_)}, Features: {len(feature_columns)}")
            return
        except Exception as e:
            print(f"[ML Backend] Cache read error ({e}), retraining...")

    train_and_cache_models()


# Pre-load models upon module import / server start
load_or_train_models()


@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "service": "Smart Disease Prediction Ensemble API",
        "status": "online",
        "endpoints": {
            "health": "/health",
            "predict": "POST /predict",
            "symptoms": "/symptoms"
        }
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "models_loaded": len(models) == 4,
        "models": ["Linear SVM", "KNN", "Random Forest", "Gradient Boosting"],
        "total_features": len(feature_columns),
        "total_classes": len(label_encoder.classes_) if label_encoder is not None else 0
    })


@app.route("/symptoms", methods=["GET"])
def get_symptoms():
    return jsonify({
        "total": len(feature_columns),
        "symptoms": feature_columns
    })


@app.route("/predict", methods=["POST"])
def predict():
    """
    Accepts JSON body:
    {
        "symptoms": ["itching", "skin_rash", ...]
    }

    Returns ensemble majority voting decision and all individual model predictions.
    """
    data = request.get_json(force=True, silent=True)
    if not data or "symptoms" not in data:
        return jsonify({
            "error": "Invalid request body. Expected JSON with 'symptoms' array."
        }), 400

    selected_symptoms = data.get("symptoms", [])
    if not isinstance(selected_symptoms, list):
        return jsonify({
            "error": "'symptoms' parameter must be a list of symptom strings."
        }), 400

    if len(selected_symptoms) == 0:
        return jsonify({
            "error": "At least one symptom must be selected for prediction."
        }), 400

    # Normalize selected symptom strings (lowercase, stripped, replacing space with underscore)
    normalized_selected = set(
        s.strip().lower().replace(" ", "_") for s in selected_symptoms if isinstance(s, str)
    )

    # Build 132-dimension binary feature vector
    feature_vector = np.zeros((1, len(feature_columns)), dtype=int)
    matched_features = []

    for idx, feature_name in enumerate(feature_columns):
        norm_feat = feature_name.strip().lower().replace(" ", "_")
        if norm_feat in normalized_selected:
            feature_vector[0, idx] = 1
            matched_features.append(feature_name)

    # In case user submitted IDs that didn't match any features directly, try fuzzy/substring match
    if np.sum(feature_vector) == 0:
        for idx, feature_name in enumerate(feature_columns):
            norm_feat = feature_name.strip().lower().replace(" ", "_")
            for sel in normalized_selected:
                if sel in norm_feat or norm_feat in sel:
                    feature_vector[0, idx] = 1
                    matched_features.append(feature_name)
                    break

    # If still no features mapped
    if np.sum(feature_vector) == 0:
        return jsonify({
            "error": "None of the provided symptoms matched the trained clinical features list.",
            "provided_symptoms": selected_symptoms
        }), 400

    # Run predictions across the 4 models
    df_vector = pd.DataFrame(feature_vector, columns=feature_columns)

    pred_svm_idx = models["svm"].predict(df_vector)[0]
    pred_knn_idx = models["knn"].predict(df_vector)[0]
    pred_rf_idx = models["random_forest"].predict(df_vector)[0]
    pred_gb_idx = models["gradient_boosting"].predict(df_vector)[0]

    pred_svm = label_encoder.inverse_transform([pred_svm_idx])[0]
    pred_knn = label_encoder.inverse_transform([pred_knn_idx])[0]
    pred_rf = label_encoder.inverse_transform([pred_rf_idx])[0]
    pred_gb = label_encoder.inverse_transform([pred_gb_idx])[0]

    individual_predictions = {
        "svm": pred_svm,
        "knn": pred_knn,
        "random_forest": pred_rf,
        "gradient_boosting": pred_gb
    }

    # Aggregate votes (Hard Voting / Plurality Consensus)
    votes = {}
    for name, pred in individual_predictions.items():
        votes[pred] = votes.get(pred, 0) + 1

    # Winner is the disease class with max votes
    final_prediction = max(votes.items(), key=lambda item: item[1])[0]

    return jsonify({
        "final_prediction": final_prediction,
        "predictions": individual_predictions,
        "votes": votes,
        "matched_features_count": int(np.sum(feature_vector)),
        "is_mock": False
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"\n=======================================================")
    print(f"  Smart Disease Prediction ML Backend Running")
    print(f"  Port: {port} | Host: 127.0.0.1")
    print(f"=======================================================\n")
    app.run(host="127.0.0.1", port=port, debug=False)

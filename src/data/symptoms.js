/**
 * Master Symptom Features List
 * Exactly 132 features mapped to the machine learning dataset columns.
 */
export const SYMPTOMS = [
  {
    "id": "itching",
    "label": "Itching",
    "category": "Skin",
    "index": 0
  },
  {
    "id": "skin_rash",
    "label": "Skin Rash",
    "category": "Skin",
    "index": 1
  },
  {
    "id": "nodal_skin_eruptions",
    "label": "Nodal Skin Eruptions",
    "category": "Skin",
    "index": 2
  },
  {
    "id": "continuous_sneezing",
    "label": "Continuous Sneezing",
    "category": "General",
    "index": 3
  },
  {
    "id": "shivering",
    "label": "Shivering",
    "category": "General",
    "index": 4
  },
  {
    "id": "chills",
    "label": "Chills",
    "category": "General",
    "index": 5
  },
  {
    "id": "joint_pain",
    "label": "Joint Pain",
    "category": "Musculoskeletal",
    "index": 6
  },
  {
    "id": "stomach_pain",
    "label": "Stomach Pain",
    "category": "Digestive",
    "index": 7
  },
  {
    "id": "acidity",
    "label": "Acidity",
    "category": "Digestive",
    "index": 8
  },
  {
    "id": "ulcers_on_tongue",
    "label": "Ulcers On Tongue",
    "category": "General",
    "index": 9
  },
  {
    "id": "muscle_wasting",
    "label": "Muscle Wasting",
    "category": "Musculoskeletal",
    "index": 10
  },
  {
    "id": "vomiting",
    "label": "Vomiting",
    "category": "Digestive",
    "index": 11
  },
  {
    "id": "burning_micturition",
    "label": "Burning Micturition",
    "category": "Urinary",
    "index": 12
  },
  {
    "id": "spotting_ urination",
    "label": "Spotting During Urination",
    "category": "Urinary",
    "index": 13
  },
  {
    "id": "fatigue",
    "label": "Fatigue",
    "category": "General",
    "index": 14
  },
  {
    "id": "weight_gain",
    "label": "Weight Gain",
    "category": "General",
    "index": 15
  },
  {
    "id": "anxiety",
    "label": "Anxiety",
    "category": "General",
    "index": 16
  },
  {
    "id": "cold_hands_and_feets",
    "label": "Cold Hands and Feet",
    "category": "General",
    "index": 17
  },
  {
    "id": "mood_swings",
    "label": "Mood Swings",
    "category": "General",
    "index": 18
  },
  {
    "id": "weight_loss",
    "label": "Weight Loss",
    "category": "General",
    "index": 19
  },
  {
    "id": "restlessness",
    "label": "Restlessness",
    "category": "General",
    "index": 20
  },
  {
    "id": "lethargy",
    "label": "Lethargy",
    "category": "General",
    "index": 21
  },
  {
    "id": "patches_in_throat",
    "label": "Patches in Throat",
    "category": "Skin",
    "index": 22
  },
  {
    "id": "irregular_sugar_level",
    "label": "Irregular Sugar Level",
    "category": "General",
    "index": 23
  },
  {
    "id": "cough",
    "label": "Cough",
    "category": "Respiratory",
    "index": 24
  },
  {
    "id": "high_fever",
    "label": "High Fever",
    "category": "General",
    "index": 25
  },
  {
    "id": "sunken_eyes",
    "label": "Sunken Eyes",
    "category": "Neurological",
    "index": 26
  },
  {
    "id": "breathlessness",
    "label": "Breathlessness",
    "category": "Respiratory",
    "index": 27
  },
  {
    "id": "sweating",
    "label": "Sweating",
    "category": "General",
    "index": 28
  },
  {
    "id": "dehydration",
    "label": "Dehydration",
    "category": "General",
    "index": 29
  },
  {
    "id": "indigestion",
    "label": "Indigestion",
    "category": "Digestive",
    "index": 30
  },
  {
    "id": "headache",
    "label": "Headache",
    "category": "General",
    "index": 31
  },
  {
    "id": "yellowish_skin",
    "label": "Yellowish Skin",
    "category": "Skin",
    "index": 32
  },
  {
    "id": "dark_urine",
    "label": "Dark Urine",
    "category": "Urinary",
    "index": 33
  },
  {
    "id": "nausea",
    "label": "Nausea",
    "category": "Digestive",
    "index": 34
  },
  {
    "id": "loss_of_appetite",
    "label": "Loss of Appetite",
    "category": "General",
    "index": 35
  },
  {
    "id": "pain_behind_the_eyes",
    "label": "Pain Behind the Eyes",
    "category": "Neurological",
    "index": 36
  },
  {
    "id": "back_pain",
    "label": "Back Pain",
    "category": "Musculoskeletal",
    "index": 37
  },
  {
    "id": "constipation",
    "label": "Constipation",
    "category": "Digestive",
    "index": 38
  },
  {
    "id": "abdominal_pain",
    "label": "Abdominal Pain",
    "category": "Digestive",
    "index": 39
  },
  {
    "id": "diarrhoea",
    "label": "Diarrhoea",
    "category": "Digestive",
    "index": 40
  },
  {
    "id": "mild_fever",
    "label": "Mild Fever",
    "category": "General",
    "index": 41
  },
  {
    "id": "yellow_urine",
    "label": "Yellow Urine",
    "category": "Urinary",
    "index": 42
  },
  {
    "id": "yellowing_of_eyes",
    "label": "Yellowing of Eyes",
    "category": "Neurological",
    "index": 43
  },
  {
    "id": "acute_liver_failure",
    "label": "Acute Liver Failure",
    "category": "General",
    "index": 44
  },
  {
    "id": "fluid_overload",
    "label": "Fluid Overload",
    "category": "Circulatory",
    "index": 45
  },
  {
    "id": "swelling_of_stomach",
    "label": "Swelling of Stomach",
    "category": "Digestive",
    "index": 46
  },
  {
    "id": "swelled_lymph_nodes",
    "label": "Swollen Lymph Nodes",
    "category": "General",
    "index": 47
  },
  {
    "id": "malaise",
    "label": "Malaise",
    "category": "General",
    "index": 48
  },
  {
    "id": "blurred_and_distorted_vision",
    "label": "Blurred and Distorted Vision",
    "category": "Neurological",
    "index": 49
  },
  {
    "id": "phlegm",
    "label": "Phlegm",
    "category": "Respiratory",
    "index": 50
  },
  {
    "id": "throat_irritation",
    "label": "Throat Irritation",
    "category": "Respiratory",
    "index": 51
  },
  {
    "id": "redness_of_eyes",
    "label": "Redness of Eyes",
    "category": "Neurological",
    "index": 52
  },
  {
    "id": "sinus_pressure",
    "label": "Sinus Pressure",
    "category": "Respiratory",
    "index": 53
  },
  {
    "id": "runny_nose",
    "label": "Runny Nose",
    "category": "Respiratory",
    "index": 54
  },
  {
    "id": "congestion",
    "label": "Congestion",
    "category": "Respiratory",
    "index": 55
  },
  {
    "id": "chest_pain",
    "label": "Chest Pain",
    "category": "Circulatory",
    "index": 56
  },
  {
    "id": "weakness_in_limbs",
    "label": "Weakness in Limbs",
    "category": "General",
    "index": 57
  },
  {
    "id": "fast_heart_rate",
    "label": "Fast Heart Rate",
    "category": "Circulatory",
    "index": 58
  },
  {
    "id": "pain_during_bowel_movements",
    "label": "Pain During Bowel Movements",
    "category": "Digestive",
    "index": 59
  },
  {
    "id": "pain_in_anal_region",
    "label": "Pain in Anal Region",
    "category": "Digestive",
    "index": 60
  },
  {
    "id": "bloody_stool",
    "label": "Bloody Stool",
    "category": "Digestive",
    "index": 61
  },
  {
    "id": "irritation_in_anus",
    "label": "Irritation in Anus",
    "category": "General",
    "index": 62
  },
  {
    "id": "neck_pain",
    "label": "Neck Pain",
    "category": "Musculoskeletal",
    "index": 63
  },
  {
    "id": "dizziness",
    "label": "Dizziness",
    "category": "Neurological",
    "index": 64
  },
  {
    "id": "cramps",
    "label": "Cramps",
    "category": "Musculoskeletal",
    "index": 65
  },
  {
    "id": "bruising",
    "label": "Bruising",
    "category": "General",
    "index": 66
  },
  {
    "id": "obesity",
    "label": "Obesity",
    "category": "General",
    "index": 67
  },
  {
    "id": "swollen_legs",
    "label": "Swollen Legs",
    "category": "Circulatory",
    "index": 68
  },
  {
    "id": "swollen_blood_vessels",
    "label": "Swollen Blood Vessels",
    "category": "Circulatory",
    "index": 69
  },
  {
    "id": "puffy_face_and_eyes",
    "label": "Puffy Face and Eyes",
    "category": "Neurological",
    "index": 70
  },
  {
    "id": "enlarged_thyroid",
    "label": "Enlarged Thyroid",
    "category": "General",
    "index": 71
  },
  {
    "id": "brittle_nails",
    "label": "Brittle Nails",
    "category": "Skin",
    "index": 72
  },
  {
    "id": "swollen_extremeties",
    "label": "Swollen Extremities",
    "category": "Circulatory",
    "index": 73
  },
  {
    "id": "excessive_hunger",
    "label": "Excessive Hunger",
    "category": "General",
    "index": 74
  },
  {
    "id": "extra_marital_contacts",
    "label": "History of High-Risk Contact",
    "category": "General",
    "index": 75
  },
  {
    "id": "drying_and_tingling_lips",
    "label": "Drying and Tingling Lips",
    "category": "General",
    "index": 76
  },
  {
    "id": "slurred_speech",
    "label": "Slurred Speech",
    "category": "Neurological",
    "index": 77
  },
  {
    "id": "knee_pain",
    "label": "Knee Pain",
    "category": "Musculoskeletal",
    "index": 78
  },
  {
    "id": "hip_joint_pain",
    "label": "Hip Joint Pain",
    "category": "Musculoskeletal",
    "index": 79
  },
  {
    "id": "muscle_weakness",
    "label": "Muscle Weakness",
    "category": "Musculoskeletal",
    "index": 80
  },
  {
    "id": "stiff_neck",
    "label": "Stiff Neck",
    "category": "Musculoskeletal",
    "index": 81
  },
  {
    "id": "swelling_joints",
    "label": "Swelling Joints",
    "category": "Musculoskeletal",
    "index": 82
  },
  {
    "id": "movement_stiffness",
    "label": "Movement Stiffness",
    "category": "Musculoskeletal",
    "index": 83
  },
  {
    "id": "spinning_movements",
    "label": "Spinning Movements",
    "category": "Neurological",
    "index": 84
  },
  {
    "id": "loss_of_balance",
    "label": "Loss of Balance",
    "category": "Neurological",
    "index": 85
  },
  {
    "id": "unsteadiness",
    "label": "Unsteadiness",
    "category": "Neurological",
    "index": 86
  },
  {
    "id": "weakness_of_one_body_side",
    "label": "Weakness of One Body Side",
    "category": "General",
    "index": 87
  },
  {
    "id": "loss_of_smell",
    "label": "Loss of Smell",
    "category": "Neurological",
    "index": 88
  },
  {
    "id": "bladder_discomfort",
    "label": "Bladder Discomfort",
    "category": "Urinary",
    "index": 89
  },
  {
    "id": "foul_smell_of urine",
    "label": "Foul Smell of Urine",
    "category": "Urinary",
    "index": 90
  },
  {
    "id": "continuous_feel_of_urine",
    "label": "Continuous Urge to Urinate",
    "category": "Urinary",
    "index": 91
  },
  {
    "id": "passage_of_gases",
    "label": "Passage of Gases (Flatulence)",
    "category": "Digestive",
    "index": 92
  },
  {
    "id": "internal_itching",
    "label": "Internal Itching",
    "category": "Skin",
    "index": 93
  },
  {
    "id": "toxic_look_(typhos)",
    "label": "Toxic Look (Typhus)",
    "category": "General",
    "index": 94
  },
  {
    "id": "depression",
    "label": "Depression",
    "category": "General",
    "index": 95
  },
  {
    "id": "irritability",
    "label": "Irritability",
    "category": "General",
    "index": 96
  },
  {
    "id": "muscle_pain",
    "label": "Muscle Pain",
    "category": "Musculoskeletal",
    "index": 97
  },
  {
    "id": "altered_sensorium",
    "label": "Altered Sensorium",
    "category": "Neurological",
    "index": 98
  },
  {
    "id": "red_spots_over_body",
    "label": "Red Spots Over Body",
    "category": "General",
    "index": 99
  },
  {
    "id": "belly_pain",
    "label": "Belly Pain",
    "category": "Digestive",
    "index": 100
  },
  {
    "id": "abnormal_menstruation",
    "label": "Abnormal Menstruation",
    "category": "General",
    "index": 101
  },
  {
    "id": "dischromic _patches",
    "label": "Dischromic Patches",
    "category": "Skin",
    "index": 102
  },
  {
    "id": "watering_from_eyes",
    "label": "Watering from Eyes",
    "category": "Neurological",
    "index": 103
  },
  {
    "id": "increased_appetite",
    "label": "Increased Appetite",
    "category": "General",
    "index": 104
  },
  {
    "id": "polyuria",
    "label": "Polyuria",
    "category": "Urinary",
    "index": 105
  },
  {
    "id": "family_history",
    "label": "Family History",
    "category": "General",
    "index": 106
  },
  {
    "id": "mucoid_sputum",
    "label": "Mucoid Sputum",
    "category": "Respiratory",
    "index": 107
  },
  {
    "id": "rusty_sputum",
    "label": "Rusty Sputum",
    "category": "Respiratory",
    "index": 108
  },
  {
    "id": "lack_of_concentration",
    "label": "Lack of Concentration",
    "category": "Neurological",
    "index": 109
  },
  {
    "id": "visual_disturbances",
    "label": "Visual Disturbances",
    "category": "General",
    "index": 110
  },
  {
    "id": "receiving_blood_transfusion",
    "label": "Receiving Blood Transfusion",
    "category": "Circulatory",
    "index": 111
  },
  {
    "id": "receiving_unsterile_injections",
    "label": "Receiving Unsterile Injections",
    "category": "General",
    "index": 112
  },
  {
    "id": "coma",
    "label": "Coma",
    "category": "Neurological",
    "index": 113
  },
  {
    "id": "stomach_bleeding",
    "label": "Stomach Bleeding",
    "category": "Digestive",
    "index": 114
  },
  {
    "id": "distention_of_abdomen",
    "label": "Distention of Abdomen",
    "category": "Digestive",
    "index": 115
  },
  {
    "id": "history_of_alcohol_consumption",
    "label": "History of Alcohol Consumption",
    "category": "General",
    "index": 116
  },
  {
    "id": "fluid_overload",
    "label": "Fluid Overload",
    "category": "Circulatory",
    "index": 117
  },
  {
    "id": "blood_in_sputum",
    "label": "Blood in Sputum",
    "category": "Respiratory",
    "index": 118
  },
  {
    "id": "prominent_veins_on_calf",
    "label": "Prominent Veins on Calf",
    "category": "Circulatory",
    "index": 119
  },
  {
    "id": "palpitations",
    "label": "Palpitations",
    "category": "Circulatory",
    "index": 120
  },
  {
    "id": "painful_walking",
    "label": "Painful Walking",
    "category": "Musculoskeletal",
    "index": 121
  },
  {
    "id": "pus_filled_pimples",
    "label": "Pus-Filled Pimples",
    "category": "Skin",
    "index": 122
  },
  {
    "id": "blackheads",
    "label": "Blackheads",
    "category": "Skin",
    "index": 123
  },
  {
    "id": "scurring",
    "label": "Scurring",
    "category": "Skin",
    "index": 124
  },
  {
    "id": "skin_peeling",
    "label": "Skin Peeling",
    "category": "Skin",
    "index": 125
  },
  {
    "id": "silver_like_dusting",
    "label": "Silver-Like Dusting",
    "category": "Skin",
    "index": 126
  },
  {
    "id": "small_dents_in_nails",
    "label": "Small Dents in Nails",
    "category": "Skin",
    "index": 127
  },
  {
    "id": "inflammatory_nails",
    "label": "Inflammatory Nails",
    "category": "Skin",
    "index": 128
  },
  {
    "id": "blister",
    "label": "Blister",
    "category": "Skin",
    "index": 129
  },
  {
    "id": "red_sore_around_nose",
    "label": "Red Sore Around Nose",
    "category": "Skin",
    "index": 130
  },
  {
    "id": "yellow_crust_ooze",
    "label": "Yellow Crust Ooze",
    "category": "Skin",
    "index": 131
  }
];

export const SYMPTOM_CATEGORIES = [
  'All',
  'General',
  'Respiratory',
  'Digestive',
  'Musculoskeletal',
  'Skin',
  'Urinary',
  'Neurological',
  'Circulatory'
];

export default SYMPTOMS;

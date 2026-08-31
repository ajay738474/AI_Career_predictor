from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os


# ============================================================
# 1. CREATE FLASK APP
# ============================================================

app = Flask(__name__)
CORS(app)


# ============================================================
# 2. LOAD TRAINED MODEL
# ============================================================

model = joblib.load("career_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")
feature_names = joblib.load("feature_names.pkl")


# ============================================================
# 3. 22 FEATURES
# ============================================================

FEATURES = [
    "CGPA",
    "Python_Skill",
    "SQL_Skill",
    "Machine_Learning_Skill",
    "Deep_Learning_Skill",
    "Data_Analysis_Skill",
    "Statistics_Skill",
    "Programming_Skill",
    "DSA_Skill",
    "Web_Development_Skill",
    "Cybersecurity_Skill",
    "Networking_Skill",
    "Linux_Skill",
    "Cloud_Skill",
    "DevOps_Skill",
    "NLP_Skill",
    "Computer_Vision_Skill",
    "OpenCV_Skill",
    "Projects",
    "Internship",
    "Communication_Skill",
    "Problem_Solving_Skill"
]


# ============================================================
# 4. CAREER REQUIREMENTS
# ============================================================
# Skills are rated from 1-5.
# CGPA is rated from 0-10.
# Projects are number of projects.
# Internship: 1 = Yes, 0 = No.
#
# These requirements are used ONLY for goal-readiness
# analysis. The ML model prediction remains unchanged.
# ============================================================

CAREER_REQUIREMENTS = {

    "AI Engineer": {
        "CGPA": 7.5,
        "Python_Skill": 4,
        "SQL_Skill": 3,
        "Machine_Learning_Skill": 5,
        "Deep_Learning_Skill": 4,
        "Data_Analysis_Skill": 3,
        "Statistics_Skill": 4,
        "Programming_Skill": 4,
        "DSA_Skill": 3,
        "Web_Development_Skill": 2,
        "Cybersecurity_Skill": 1,
        "Networking_Skill": 1,
        "Linux_Skill": 3,
        "Cloud_Skill": 3,
        "DevOps_Skill": 2,
        "NLP_Skill": 3,
        "Computer_Vision_Skill": 3,
        "OpenCV_Skill": 2,
        "Projects": 3,
        "Internship": 1,
        "Communication_Skill": 3,
        "Problem_Solving_Skill": 4
    },

    "ML Engineer": {
        "CGPA": 7.5,
        "Python_Skill": 4,
        "SQL_Skill": 3,
        "Machine_Learning_Skill": 5,
        "Deep_Learning_Skill": 4,
        "Data_Analysis_Skill": 3,
        "Statistics_Skill": 4,
        "Programming_Skill": 4,
        "DSA_Skill": 4,
        "Web_Development_Skill": 2,
        "Cybersecurity_Skill": 1,
        "Networking_Skill": 2,
        "Linux_Skill": 3,
        "Cloud_Skill": 4,
        "DevOps_Skill": 3,
        "NLP_Skill": 2,
        "Computer_Vision_Skill": 2,
        "OpenCV_Skill": 2,
        "Projects": 3,
        "Internship": 1,
        "Communication_Skill": 3,
        "Problem_Solving_Skill": 4
    },

    "Data Scientist": {
        "CGPA": 7.5,
        "Python_Skill": 4,
        "SQL_Skill": 4,
        "Machine_Learning_Skill": 4,
        "Deep_Learning_Skill": 2,
        "Data_Analysis_Skill": 5,
        "Statistics_Skill": 5,
        "Programming_Skill": 3,
        "DSA_Skill": 2,
        "Web_Development_Skill": 1,
        "Cybersecurity_Skill": 1,
        "Networking_Skill": 1,
        "Linux_Skill": 2,
        "Cloud_Skill": 2,
        "DevOps_Skill": 1,
        "NLP_Skill": 2,
        "Computer_Vision_Skill": 1,
        "OpenCV_Skill": 1,
        "Projects": 3,
        "Internship": 1,
        "Communication_Skill": 4,
        "Problem_Solving_Skill": 4
    },

    "Data Analyst": {
        "CGPA": 6.5,
        "Python_Skill": 3,
        "SQL_Skill": 5,
        "Machine_Learning_Skill": 2,
        "Deep_Learning_Skill": 1,
        "Data_Analysis_Skill": 5,
        "Statistics_Skill": 4,
        "Programming_Skill": 3,
        "DSA_Skill": 1,
        "Web_Development_Skill": 1,
        "Cybersecurity_Skill": 1,
        "Networking_Skill": 1,
        "Linux_Skill": 1,
        "Cloud_Skill": 1,
        "DevOps_Skill": 1,
        "NLP_Skill": 1,
        "Computer_Vision_Skill": 1,
        "OpenCV_Skill": 1,
        "Projects": 2,
        "Internship": 1,
        "Communication_Skill": 4,
        "Problem_Solving_Skill": 3
    },

    "Data Engineer": {
        "CGPA": 7.0,
        "Python_Skill": 4,
        "SQL_Skill": 5,
        "Machine_Learning_Skill": 2,
        "Deep_Learning_Skill": 1,
        "Data_Analysis_Skill": 3,
        "Statistics_Skill": 3,
        "Programming_Skill": 4,
        "DSA_Skill": 3,
        "Web_Development_Skill": 2,
        "Cybersecurity_Skill": 2,
        "Networking_Skill": 3,
        "Linux_Skill": 4,
        "Cloud_Skill": 4,
        "DevOps_Skill": 4,
        "NLP_Skill": 1,
        "Computer_Vision_Skill": 1,
        "OpenCV_Skill": 1,
        "Projects": 3,
        "Internship": 1,
        "Communication_Skill": 3,
        "Problem_Solving_Skill": 4
    },

    "Software Engineer": {
        "CGPA": 7.0,
        "Python_Skill": 3,
        "SQL_Skill": 3,
        "Machine_Learning_Skill": 1,
        "Deep_Learning_Skill": 1,
        "Data_Analysis_Skill": 2,
        "Statistics_Skill": 2,
        "Programming_Skill": 5,
        "DSA_Skill": 5,
        "Web_Development_Skill": 4,
        "Cybersecurity_Skill": 2,
        "Networking_Skill": 2,
        "Linux_Skill": 3,
        "Cloud_Skill": 3,
        "DevOps_Skill": 3,
        "NLP_Skill": 1,
        "Computer_Vision_Skill": 1,
        "OpenCV_Skill": 1,
        "Projects": 3,
        "Internship": 1,
        "Communication_Skill": 3,
        "Problem_Solving_Skill": 5
    },

    "Cybersecurity Analyst": {
        "CGPA": 6.5,
        "Python_Skill": 2,
        "SQL_Skill": 3,
        "Machine_Learning_Skill": 1,
        "Deep_Learning_Skill": 1,
        "Data_Analysis_Skill": 2,
        "Statistics_Skill": 2,
        "Programming_Skill": 3,
        "DSA_Skill": 2,
        "Web_Development_Skill": 2,
        "Cybersecurity_Skill": 5,
        "Networking_Skill": 4,
        "Linux_Skill": 4,
        "Cloud_Skill": 3,
        "DevOps_Skill": 2,
        "NLP_Skill": 1,
        "Computer_Vision_Skill": 1,
        "OpenCV_Skill": 1,
        "Projects": 2,
        "Internship": 1,
        "Communication_Skill": 3,
        "Problem_Solving_Skill": 4
    },

    "DevOps Engineer": {
        "CGPA": 6.5,
        "Python_Skill": 3,
        "SQL_Skill": 2,
        "Machine_Learning_Skill": 1,
        "Deep_Learning_Skill": 1,
        "Data_Analysis_Skill": 1,
        "Statistics_Skill": 1,
        "Programming_Skill": 3,
        "DSA_Skill": 2,
        "Web_Development_Skill": 2,
        "Cybersecurity_Skill": 3,
        "Networking_Skill": 4,
        "Linux_Skill": 5,
        "Cloud_Skill": 5,
        "DevOps_Skill": 5,
        "NLP_Skill": 1,
        "Computer_Vision_Skill": 1,
        "OpenCV_Skill": 1,
        "Projects": 3,
        "Internship": 1,
        "Communication_Skill": 3,
        "Problem_Solving_Skill": 4
    },

    "Computer Vision Engineer": {
        "CGPA": 7.5,
        "Python_Skill": 4,
        "SQL_Skill": 2,
        "Machine_Learning_Skill": 4,
        "Deep_Learning_Skill": 5,
        "Data_Analysis_Skill": 2,
        "Statistics_Skill": 4,
        "Programming_Skill": 4,
        "DSA_Skill": 3,
        "Web_Development_Skill": 1,
        "Cybersecurity_Skill": 1,
        "Networking_Skill": 1,
        "Linux_Skill": 3,
        "Cloud_Skill": 2,
        "DevOps_Skill": 1,
        "NLP_Skill": 1,
        "Computer_Vision_Skill": 5,
        "OpenCV_Skill": 5,
        "Projects": 3,
        "Internship": 1,
        "Communication_Skill": 3,
        "Problem_Solving_Skill": 4
    },

    "NLP Engineer": {
        "CGPA": 7.5,
        "Python_Skill": 4,
        "SQL_Skill": 2,
        "Machine_Learning_Skill": 4,
        "Deep_Learning_Skill": 5,
        "Data_Analysis_Skill": 2,
        "Statistics_Skill": 4,
        "Programming_Skill": 4,
        "DSA_Skill": 3,
        "Web_Development_Skill": 1,
        "Cybersecurity_Skill": 1,
        "Networking_Skill": 1,
        "Linux_Skill": 3,
        "Cloud_Skill": 2,
        "DevOps_Skill": 1,
        "NLP_Skill": 5,
        "Computer_Vision_Skill": 1,
        "OpenCV_Skill": 1,
        "Projects": 3,
        "Internship": 1,
        "Communication_Skill": 4,
        "Problem_Solving_Skill": 4
    }
}


# ============================================================
# 5. FIND CAREER REQUIREMENTS
# ============================================================

def get_career_requirements(career_goal):

    if not career_goal:
        return None, None

    goal = career_goal.strip().lower()

    # Direct matching
    for career_name, requirements in CAREER_REQUIREMENTS.items():

        if goal == career_name.lower():
            return career_name, requirements

    # Flexible matching
    aliases = {
        "ai": "AI Engineer",
        "ai engineer": "AI Engineer",
        "artificial intelligence engineer": "AI Engineer",

        "machine learning engineer": "ML Engineer",
        "ml engineer": "ML Engineer",
        "machine learning": "ML Engineer",

        "data scientist": "Data Scientist",
        "data science": "Data Scientist",

        "data analyst": "Data Analyst",
        "data analysis": "Data Analyst",

        "data engineer": "Data Engineer",

        "software engineer": "Software Engineer",
        "software developer": "Software Engineer",
        "developer": "Software Engineer",

        "cybersecurity": "Cybersecurity Analyst",
        "cyber security": "Cybersecurity Analyst",
        "cybersecurity analyst": "Cybersecurity Analyst",

        "devops": "DevOps Engineer",
        "devops engineer": "DevOps Engineer",

        "computer vision": "Computer Vision Engineer",
        "computer vision engineer": "Computer Vision Engineer",

        "nlp": "NLP Engineer",
        "nlp engineer": "NLP Engineer"
    }

    if goal in aliases:
        career_name = aliases[goal]
        return career_name, CAREER_REQUIREMENTS[career_name]

    # Partial matching
    for alias, career_name in aliases.items():

        if alias in goal or goal in alias:
            return career_name, CAREER_REQUIREMENTS[career_name]

    return None, None


# ============================================================
# 6. CALCULATE CAREER READINESS
# ============================================================

def calculate_readiness(student_data, requirements):

    comparisons = []
    strengths = []
    improvements = []

    total_score = 0
    total_weight = 0

    # --------------------------------------------------------
    # CGPA
    # --------------------------------------------------------

    user_cgpa = float(student_data.get("CGPA", 0))
    required_cgpa = float(requirements["CGPA"])

    cgpa_ratio = min(
        user_cgpa / required_cgpa,
        1
    ) if required_cgpa > 0 else 1

    cgpa_score = cgpa_ratio * 100

    cgpa_gap = max(
        round(required_cgpa - user_cgpa, 2),
        0
    )

    comparisons.append({
        "feature": "CGPA",
        "label": "CGPA",
        "your_score": round(user_cgpa, 2),
        "required_score": required_cgpa,
        "gap": cgpa_gap,
        "percentage": round(cgpa_score, 2),
        "status": "Strong" if user_cgpa >= required_cgpa else "Needs Improvement"
    })

    if user_cgpa >= required_cgpa:
        strengths.append("CGPA")
    else:
        improvements.append({
            "skill": "CGPA",
            "current": round(user_cgpa, 2),
            "required": required_cgpa,
            "gap": cgpa_gap
        })

    total_score += cgpa_score
    total_weight += 1


    # --------------------------------------------------------
    # Remaining 21 features
    # --------------------------------------------------------

    for feature in FEATURES:

        if feature == "CGPA":
            continue

        required = requirements.get(feature, 1)

        value = student_data.get(feature, 0)

        # Internship
        if feature == "Internship":

            if isinstance(value, str):

                value_lower = value.strip().lower()

                if value_lower in [
                    "yes",
                    "true",
                    "1"
                ]:
                    value = 1
                else:
                    value = 0

            else:
                value = float(value)

            required = 1

            percentage = 100 if value >= 1 else 0

            gap = 0 if value >= 1 else 1

            display_value = "Yes" if value >= 1 else "No"
            display_required = "Yes"

        else:

            try:
                value = float(value)
            except (TypeError, ValueError):
                value = 0

            required = float(required)

            if required > 0:
                percentage = min(
                    value / required,
                    1
                ) * 100
            else:
                percentage = 100

            gap = max(
                round(required - value, 2),
                0
            )

            display_value = round(value, 2)
            display_required = round(required, 2)

        # ----------------------------------------------------
        # Comparison
        # ----------------------------------------------------

        status = (
            "Strong"
            if percentage >= 100
            else "Needs Improvement"
        )

        comparisons.append({
            "feature": feature,
            "label": feature.replace("_", " "),
            "your_score": display_value,
            "required_score": display_required,
            "gap": gap,
            "percentage": round(percentage, 2),
            "status": status
        })

        # ----------------------------------------------------
        # Strengths / Improvements
        # ----------------------------------------------------

        if percentage >= 100:

            strengths.append(
                feature.replace("_", " ")
            )

        else:

            improvements.append({
                "skill": feature.replace("_", " "),
                "current": display_value,
                "required": display_required,
                "gap": gap
            })

        total_score += percentage
        total_weight += 1


    # --------------------------------------------------------
    # Final readiness
    # --------------------------------------------------------

    readiness = (
        total_score / total_weight
        if total_weight > 0
        else 0
    )

    readiness = round(
        max(0, min(readiness, 100)),
        2
    )

    # --------------------------------------------------------
    # Readiness level
    # --------------------------------------------------------

    if readiness >= 85:

        level = "Excellent"
        message = (
            "You are highly prepared for this career. "
            "Keep improving your advanced skills and practical experience."
        )

    elif readiness >= 70:

        level = "On Track"
        message = (
            "You are on the right path. "
            "Strengthen your remaining skill gaps to become job-ready."
        )

    elif readiness >= 50:

        level = "Developing"
        message = (
            "You have a good foundation, but several important "
            "skills need improvement."
        )

    else:

        level = "Needs Improvement"
        message = (
            "You need to build stronger fundamentals and practical "
            "experience before reaching this career goal."
        )


    # --------------------------------------------------------
    # Sort biggest gaps first
    # --------------------------------------------------------

    improvements.sort(
        key=lambda item: item["gap"],
        reverse=True
    )

    top_improvements = improvements[:6]

    # --------------------------------------------------------
    # Roadmap
    # --------------------------------------------------------

    roadmap = []

    for index, item in enumerate(
        top_improvements[:5],
        start=1
    ):

        roadmap.append({
            "step": index,
            "skill": item["skill"],
            "current": item["current"],
            "target": item["required"],
            "action": (
                f"Improve your {item['skill']} skill "
                f"from {item['current']} to "
                f"{item['required']}."
            )
        })


    return {
        "readiness_percentage": readiness,
        "readiness_level": level,
        "readiness_message": message,
        "skill_comparison": comparisons,
        "strengths": strengths,
        "skills_to_improve": top_improvements,
        "roadmap": roadmap
    }


# ============================================================
# 7. HOME ROUTE
# ============================================================

@app.route("/")
def home():

    return jsonify({
        "message": "AI Career Predictor API is running!",
        "features": len(feature_names),
        "career_analysis": True
    })


# ============================================================
# 8. PREDICTION API
# ============================================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "error": "No data received."
            }), 400


        # ----------------------------------------------------
        # Career goal
        # ----------------------------------------------------

        career_goal = (
            data.get("career_goal")
            or data.get("careerGoal")
            or data.get("goal")
            or ""
        )


        # ----------------------------------------------------
        # Check all model features
        # ----------------------------------------------------

        missing_features = [
            feature
            for feature in feature_names
            if feature not in data
        ]

        if missing_features:

            return jsonify({
                "error": "Missing required features.",
                "missing_features": missing_features
            }), 400


        # ----------------------------------------------------
        # Prepare student data
        # ----------------------------------------------------

        student_values = []

        for feature in feature_names:

            value = data[feature]

            # Convert Internship Yes/No to 1/0
            if feature == "Internship":

                if isinstance(value, str):

                    if value.strip().lower() in [
                        "yes",
                        "true",
                        "1"
                    ]:
                        value = 1
                    else:
                        value = 0

                else:
                    value = float(value)

            else:

                value = float(value)

            student_values.append(value)


        student = pd.DataFrame(
            [student_values],
            columns=feature_names
        )


        # ----------------------------------------------------
        # ML Prediction
        # ----------------------------------------------------

        prediction = model.predict(student)

        job_role = label_encoder.inverse_transform(
            prediction
        )[0]


        # ----------------------------------------------------
        # Probabilities
        # ----------------------------------------------------

        if hasattr(model, "predict_proba"):

            probabilities = model.predict_proba(student)[0]

            classes = model.classes_

            career_probabilities = []

            for class_number, probability in zip(
                classes,
                probabilities
            ):

                role = label_encoder.inverse_transform(
                    [class_number]
                )[0]

                career_probabilities.append({
                    "role": role,
                    "probability": round(
                        probability * 100,
                        2
                    )
                })


            career_probabilities.sort(
                key=lambda x: x["probability"],
                reverse=True
            )

            top_3 = career_probabilities[:3]

            prediction_probability = round(
                max(probabilities) * 100,
                2
            )

        else:

            career_probabilities = []

            top_3 = []

            prediction_probability = 0


        # ----------------------------------------------------
        # Target Career Readiness
        # ----------------------------------------------------

        career_name, requirements = (
            get_career_requirements(career_goal)
        )


        if career_name and requirements:

            readiness_analysis = calculate_readiness(
                data,
                requirements
            )

        else:

            readiness_analysis = {
                "readiness_percentage": 0,
                "readiness_level": "Career Not Recognized",
                "readiness_message": (
                    "Enter a supported career goal to calculate "
                    "your career readiness."
                ),
                "skill_comparison": [],
                "strengths": [],
                "skills_to_improve": [],
                "roadmap": []
            }


        # ----------------------------------------------------
        # FINAL RESPONSE
        # ----------------------------------------------------

        return jsonify({

            # ML prediction
            "recommended_role": job_role,

            "prediction_probability":
                prediction_probability,

            "top_3":
                top_3,

            "career_probabilities":
                career_probabilities,


            # User's target career
            "career_goal":
                career_name if career_name else career_goal,

            "goal_supported":
                bool(career_name),


            # Goal capability
            "goal_readiness":
                readiness_analysis

        })


    except Exception as e:

        print("Prediction Error:", str(e))

        return jsonify({
            "error": str(e)
        }), 500


# ============================================================
# 9. RUN SERVER
# ============================================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=False
    )
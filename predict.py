import joblib
import pandas as pd


# ============================================================
# 1. LOAD SAVED MODEL
# ============================================================

model = joblib.load("career_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")
feature_names = joblib.load("feature_names.pkl")


# ============================================================
# 2. GET STUDENT INFORMATION
# ============================================================

print("\n==========================================")
print("       AI CAREER PREDICTOR")
print("==========================================")

cgpa = float(input("Enter CGPA: "))

python_skill = int(input("Python Skill (1-5): "))
sql_skill = int(input("SQL Skill (1-5): "))
machine_learning_skill = int(input("Machine Learning Skill (1-5): "))
deep_learning_skill = int(input("Deep Learning Skill (1-5): "))
data_analysis_skill = int(input("Data Analysis Skill (1-5): "))
statistics_skill = int(input("Statistics Skill (1-5): "))
programming_skill = int(input("Programming Skill (1-5): "))
dsa_skill = int(input("DSA Skill (1-5): "))
web_development_skill = int(input("Web Development Skill (1-5): "))
cybersecurity_skill = int(input("Cybersecurity Skill (1-5): "))
networking_skill = int(input("Networking Skill (1-5): "))
linux_skill = int(input("Linux Skill (1-5): "))
cloud_skill = int(input("Cloud Skill (1-5): "))
devops_skill = int(input("DevOps Skill (1-5): "))
nlp_skill = int(input("NLP Skill (1-5): "))
computer_vision_skill = int(input("Computer Vision Skill (1-5): "))
opencv_skill = int(input("OpenCV Skill (1-5): "))

projects = int(input("Number of Projects: "))

internship = int(
    input("Internship (0 = No, 1 = Yes): ")
)

communication_skill = int(
    input("Communication Skill (1-5): ")
)

problem_solving_skill = int(
    input("Problem Solving Skill (1-5): ")
)


# ============================================================
# 3. CREATE STUDENT DATA
# ============================================================

student_data = {

    "CGPA": cgpa,

    "Python_Skill": python_skill,
    "SQL_Skill": sql_skill,
    "Machine_Learning_Skill": machine_learning_skill,
    "Deep_Learning_Skill": deep_learning_skill,
    "Data_Analysis_Skill": data_analysis_skill,
    "Statistics_Skill": statistics_skill,
    "Programming_Skill": programming_skill,
    "DSA_Skill": dsa_skill,
    "Web_Development_Skill": web_development_skill,
    "Cybersecurity_Skill": cybersecurity_skill,
    "Networking_Skill": networking_skill,
    "Linux_Skill": linux_skill,
    "Cloud_Skill": cloud_skill,
    "DevOps_Skill": devops_skill,
    "NLP_Skill": nlp_skill,
    "Computer_Vision_Skill": computer_vision_skill,
    "OpenCV_Skill": opencv_skill,

    "Projects": projects,
    "Internship": internship,

    "Communication_Skill": communication_skill,
    "Problem_Solving_Skill": problem_solving_skill
}


student = pd.DataFrame([student_data])

# Keep exactly the same order as training
student = student[feature_names]


# ============================================================
# 4. PREDICTION
# ============================================================

prediction = model.predict(student)

job_role = label_encoder.inverse_transform(
    prediction
)[0]


# ============================================================
# 5. PREDICTION PROBABILITIES
# ============================================================

probabilities = model.predict_proba(student)[0]

classes = model.classes_

career_results = []

for class_number, probability in zip(
    classes,
    probabilities
):

    role = label_encoder.inverse_transform(
        [class_number]
    )[0]

    percentage = probability * 100

    career_results.append(
        (role, percentage)
    )


# Sort highest → lowest
career_results.sort(
    key=lambda x: x[1],
    reverse=True
)


# ============================================================
# 6. TOP 3 CAREERS
# ============================================================

print("\n==========================================")
print("       TOP 3 CAREER RECOMMENDATIONS")
print("==========================================")

for index, (role, percentage) in enumerate(
    career_results[:3],
    start=1
):

    print(
        f"{index}. {role} - {percentage:.2f}%"
    )


# ============================================================
# 7. ALL CAREER PROBABILITIES
# ============================================================

print("\n==========================================")
print("       CAREER PROBABILITIES")
print("==========================================")

for role, percentage in career_results:

    print(
        f"{role:<28} {percentage:.2f}%"
    )


# ============================================================
# 8. CAREER-SPECIFIC SKILLS
# ============================================================

career_skills = {

    "AI Engineer": [
        ("Python", python_skill),
        ("Machine Learning", machine_learning_skill),
        ("Deep Learning", deep_learning_skill),
        ("Programming", programming_skill)
    ],

    "ML Engineer": [
        ("Python", python_skill),
        ("Machine Learning", machine_learning_skill),
        ("Programming", programming_skill),
        ("Deep Learning", deep_learning_skill)
    ],

    "Data Scientist": [
        ("Python", python_skill),
        ("Machine Learning", machine_learning_skill),
        ("Statistics", statistics_skill),
        ("Data Analysis", data_analysis_skill)
    ],

    "Data Analyst": [
        ("SQL", sql_skill),
        ("Data Analysis", data_analysis_skill),
        ("Statistics", statistics_skill),
        ("Python", python_skill)
    ],

    "Data Engineer": [
        ("SQL", sql_skill),
        ("Python", python_skill),
        ("Cloud", cloud_skill),
        ("Programming", programming_skill)
    ],

    "NLP Engineer": [
        ("Python", python_skill),
        ("NLP", nlp_skill),
        ("Machine Learning", machine_learning_skill),
        ("Deep Learning", deep_learning_skill)
    ],

    "Computer Vision Engineer": [
        ("Python", python_skill),
        ("Computer Vision", computer_vision_skill),
        ("OpenCV", opencv_skill),
        ("Deep Learning", deep_learning_skill)
    ],

    "Cybersecurity Analyst": [
        ("Cybersecurity", cybersecurity_skill),
        ("Networking", networking_skill),
        ("Linux", linux_skill),
        ("Problem Solving", problem_solving_skill)
    ],

    "Cloud Engineer": [
        ("Cloud", cloud_skill),
        ("Linux", linux_skill),
        ("Networking", networking_skill),
        ("DevOps", devops_skill)
    ],

    "Software Engineer": [
        ("Programming", programming_skill),
        ("DSA", dsa_skill),
        ("Python", python_skill),
        ("Problem Solving", problem_solving_skill)
    ]
}


# ============================================================
# 9. SKILL GAP ANALYSIS
# ============================================================

print("\n==========================================")
print("          SKILL GAP ANALYSIS")
print("==========================================")

top_career = career_results[0][0]

print(
    f"Target Career: {top_career}"
)


if top_career in career_skills:

    skills = career_skills[top_career]

    total_score = 0

    skill_results = []

    for skill_name, skill_value in skills:

        total_score += skill_value

        # Determine status
        if skill_value == 5:

            status = "Excellent"

            symbol = "OK"

        elif skill_value == 4:

            status = "Good"

            symbol = "GOOD"

        elif skill_value == 3:

            status = "Needs Improvement"

            symbol = "WARN"

        else:

            status = "Weak"

            symbol = "WEAK"

        skill_results.append(
            (skill_name, skill_value, status)
        )


    # ========================================================
    # DISPLAY SKILL ASSESSMENT
    # ========================================================

    print("\nSkill Assessment:\n")

    for skill_name, skill_value, status in skill_results:

        print(
            f"{skill_name:<20} "
            f"{skill_value}/5  "
            f"[{status}]"
        )


    # ========================================================
    # OVERALL SCORE
    # ========================================================

    overall_score = (
        total_score /
        (len(skills) * 5)
    ) * 100


    print(
        f"\nOverall Career Skill Score: "
        f"{overall_score:.2f}%"
    )


    # ========================================================
    # CAREER READINESS
    # ========================================================

    if overall_score >= 80:

        readiness = "Excellent"

    elif overall_score >= 60:

        readiness = "Good"

    elif overall_score >= 40:

        readiness = "Needs Improvement"

    else:

        readiness = "Beginner"


    print(
        f"Career Readiness: {readiness}"
    )


    # ========================================================
    # PRIORITY SKILLS
    # ========================================================

    weak_skills = []

    for skill_name, skill_value, status in skill_results:

        if skill_value <= 3:

            weak_skills.append(
                (skill_name, skill_value)
            )


    print("\n==========================================")
    print("          PRIORITY SKILLS")
    print("==========================================")


    if len(weak_skills) == 0:

        print(
            "Excellent! No major skill gaps found."
        )

    else:

        # Lowest skill first
        weak_skills.sort(
            key=lambda x: x[1]
        )

        for index, (skill_name, skill_value) in enumerate(
            weak_skills,
            start=1
        ):

            print(
                f"{index}. {skill_name} "
                f"({skill_value}/5)"
            )


# ============================================================
# 10. FINAL RESULT
# ============================================================

print("\n==========================================")
print("       FINAL CAREER PREDICTION")
print("==========================================")

print(
    "Recommended Job Role:",
    top_career
)

print(
    "Prediction Probability:",
    f"{career_results[0][1]:.2f}%"
)

print(
    "\nTop Alternative:",
    career_results[1][0],
    f"({career_results[1][1]:.2f}%)"
)

print(
    "Second Alternative:",
    career_results[2][0],
    f"({career_results[2][1]:.2f}%)"
)

print("==========================================")
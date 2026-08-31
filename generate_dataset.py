import pandas as pd
import numpy as np

np.random.seed(42)

roles = [
    "AI Engineer",
    "ML Engineer",
    "Data Scientist",
    "Data Analyst",
    "Data Engineer",
    "NLP Engineer",
    "Computer Vision Engineer",
    "Cybersecurity Analyst",
    "Cloud Engineer",
    "Software Engineer"
]

data = []

for role in roles:

    for _ in range(200):

        # ====================================================
        # GENERAL FEATURES
        # ====================================================

        cgpa = round(np.random.uniform(5.5, 10.0), 2)

        projects = np.random.randint(0, 6)

        internship = np.random.randint(0, 2)

        communication = np.random.randint(1, 6)

        problem_solving = np.random.randint(1, 6)


        # ====================================================
        # GENERAL TECHNICAL SKILLS
        # ====================================================

        python = np.random.randint(1, 6)

        sql = np.random.randint(1, 6)

        machine_learning = np.random.randint(1, 6)

        deep_learning = np.random.randint(1, 6)

        data_analysis = np.random.randint(1, 6)

        statistics = np.random.randint(1, 6)

        programming = np.random.randint(1, 6)

        dsa = np.random.randint(1, 6)

        web_development = np.random.randint(1, 6)


        # ====================================================
        # CYBERSECURITY / CLOUD
        # ====================================================

        cybersecurity = np.random.randint(1, 6)

        networking = np.random.randint(1, 6)

        linux = np.random.randint(1, 6)

        cloud = np.random.randint(1, 6)

        devops = np.random.randint(1, 6)


        # ====================================================
        # NEW SPECIALIZED AI SKILLS
        # ====================================================

        nlp = np.random.randint(1, 6)

        computer_vision = np.random.randint(1, 6)

        opencv = np.random.randint(1, 6)


        # ====================================================
        # CAREER-SPECIFIC PATTERNS
        # ====================================================

        if role == "AI Engineer":

            python = np.random.randint(4, 6)

            machine_learning = np.random.randint(4, 6)

            deep_learning = np.random.randint(4, 6)

            problem_solving = np.random.randint(4, 6)


        elif role == "ML Engineer":

            python = np.random.randint(4, 6)

            machine_learning = np.random.randint(4, 6)

            statistics = np.random.randint(3, 6)

            dsa = np.random.randint(3, 6)

            programming = np.random.randint(3, 6)


        elif role == "Data Scientist":

            python = np.random.randint(4, 6)

            machine_learning = np.random.randint(3, 6)

            statistics = np.random.randint(4, 6)

            data_analysis = np.random.randint(4, 6)


        elif role == "Data Analyst":

            sql = np.random.randint(4, 6)

            data_analysis = np.random.randint(4, 6)

            statistics = np.random.randint(3, 6)

            python = np.random.randint(2, 5)


        elif role == "Data Engineer":

            sql = np.random.randint(4, 6)

            python = np.random.randint(3, 6)

            cloud = np.random.randint(3, 6)

            linux = np.random.randint(3, 6)

            programming = np.random.randint(3, 6)


        elif role == "NLP Engineer":

            python = np.random.randint(4, 6)

            machine_learning = np.random.randint(4, 6)

            deep_learning = np.random.randint(4, 6)

            nlp = np.random.randint(4, 6)

            problem_solving = np.random.randint(3, 6)


        elif role == "Computer Vision Engineer":

            python = np.random.randint(4, 6)

            machine_learning = np.random.randint(4, 6)

            deep_learning = np.random.randint(4, 6)

            computer_vision = np.random.randint(4, 6)

            opencv = np.random.randint(4, 6)

            problem_solving = np.random.randint(3, 6)


        elif role == "Cybersecurity Analyst":

            cybersecurity = np.random.randint(4, 6)

            networking = np.random.randint(4, 6)

            linux = np.random.randint(4, 6)

            problem_solving = np.random.randint(4, 6)


        elif role == "Cloud Engineer":

            cloud = np.random.randint(4, 6)

            networking = np.random.randint(3, 6)

            linux = np.random.randint(4, 6)

            devops = np.random.randint(4, 6)

            programming = np.random.randint(3, 6)


        elif role == "Software Engineer":

            programming = np.random.randint(4, 6)

            dsa = np.random.randint(4, 6)

            problem_solving = np.random.randint(4, 6)

            web_development = np.random.randint(3, 6)


        # ====================================================
        # ADD STUDENT
        # ====================================================

        data.append([

            cgpa,

            python,

            sql,

            machine_learning,

            deep_learning,

            data_analysis,

            statistics,

            programming,

            dsa,

            web_development,

            cybersecurity,

            networking,

            linux,

            cloud,

            devops,

            nlp,

            computer_vision,

            opencv,

            projects,

            internship,

            communication,

            problem_solving,

            role

        ])


# ============================================================
# COLUMN NAMES
# ============================================================

columns = [

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

    "Problem_Solving_Skill",

    "Job_Role"

]


# ============================================================
# CREATE DATAFRAME
# ============================================================

df = pd.DataFrame(
    data,
    columns=columns
)


# ============================================================
# SAVE DATASET
# ============================================================

df.to_csv(
    "data/career_data_2000.csv",
    index=False
)


# ============================================================
# DISPLAY RESULTS
# ============================================================

print("\nDataset generated successfully!")

print(
    "Shape:",
    df.shape
)

print("\nNumber of features:")

print(
    len(columns) - 1
)

print("\nJob Role Distribution:")

print(
    df["Job_Role"].value_counts()
)

print("\nFirst 5 rows:")

print(
    df.head()
)

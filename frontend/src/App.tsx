import { useMemo, useState } from "react";
import "./App.css";

/* =========================================================
   TYPES
========================================================= */

type Student = {
    CGPA: number;

    Python_Skill: number;
    SQL_Skill: number;
    Machine_Learning_Skill: number;
    Deep_Learning_Skill: number;
    Data_Analysis_Skill: number;
    Statistics_Skill: number;
    Programming_Skill: number;
    DSA_Skill: number;
    Web_Development_Skill: number;
    Cybersecurity_Skill: number;
    Networking_Skill: number;
    Linux_Skill: number;
    Cloud_Skill: number;
    DevOps_Skill: number;
    NLP_Skill: number;
    Computer_Vision_Skill: number;
    OpenCV_Skill: number;

    Projects: number;
    Internship: number;

    Communication_Skill: number;
    Problem_Solving_Skill: number;
};

type CareerProbability = {
    role: string;
    probability: number;
};

type PredictionResponse = {
    recommended_role: string;
    prediction_probability: number;
    top_3: CareerProbability[];
    career_probabilities: CareerProbability[];
};

type FeatureType =
    | "cgpa"
    | "skill"
    | "projects"
    | "internship";

type FeatureDefinition = {
    key: keyof Student;
    label: string;
    type: FeatureType;
};

type CareerRequirement = Record<string, number>;

type ReadinessStatus = {
    title: string;
    level: string;
    className: "success" | "warning" | "danger";
    icon: string;
    message: string;
    gaps: string[];
};

/* =========================================================
   INITIAL STUDENT DATA
========================================================= */

const initialStudent: Student = {
    CGPA: 8.2,

    Python_Skill: 5,
    SQL_Skill: 5,
    Machine_Learning_Skill: 2,
    Deep_Learning_Skill: 1,
    Data_Analysis_Skill: 5,
    Statistics_Skill: 3,
    Programming_Skill: 3,
    DSA_Skill: 3,
    Web_Development_Skill: 1,
    Cybersecurity_Skill: 1,
    Networking_Skill: 1,
    Linux_Skill: 1,
    Cloud_Skill: 1,
    DevOps_Skill: 1,
    NLP_Skill: 1,
    Computer_Vision_Skill: 1,
    OpenCV_Skill: 1,

    Projects: 3,
    Internship: 1,

    Communication_Skill: 4,
    Problem_Solving_Skill: 4,
};

/* =========================================================
   22 FEATURES
========================================================= */

const features: FeatureDefinition[] = [
    {
        key: "CGPA",
        label: "CGPA",
        type: "cgpa",
    },

    {
        key: "Python_Skill",
        label: "Python",
        type: "skill",
    },

    {
        key: "SQL_Skill",
        label: "SQL",
        type: "skill",
    },

    {
        key: "Machine_Learning_Skill",
        label: "Machine Learning",
        type: "skill",
    },

    {
        key: "Deep_Learning_Skill",
        label: "Deep Learning",
        type: "skill",
    },

    {
        key: "Data_Analysis_Skill",
        label: "Data Analysis",
        type: "skill",
    },

    {
        key: "Statistics_Skill",
        label: "Statistics",
        type: "skill",
    },

    {
        key: "Programming_Skill",
        label: "Programming",
        type: "skill",
    },

    {
        key: "DSA_Skill",
        label: "DSA",
        type: "skill",
    },

    {
        key: "Web_Development_Skill",
        label: "Web Development",
        type: "skill",
    },

    {
        key: "Cybersecurity_Skill",
        label: "Cybersecurity",
        type: "skill",
    },

    {
        key: "Networking_Skill",
        label: "Networking",
        type: "skill",
    },

    {
        key: "Linux_Skill",
        label: "Linux",
        type: "skill",
    },

    {
        key: "Cloud_Skill",
        label: "Cloud",
        type: "skill",
    },

    {
        key: "DevOps_Skill",
        label: "DevOps",
        type: "skill",
    },

    {
        key: "NLP_Skill",
        label: "NLP",
        type: "skill",
    },

    {
        key: "Computer_Vision_Skill",
        label: "Computer Vision",
        type: "skill",
    },

    {
        key: "OpenCV_Skill",
        label: "OpenCV",
        type: "skill",
    },

    {
        key: "Projects",
        label: "Projects",
        type: "projects",
    },

    {
        key: "Internship",
        label: "Internship",
        type: "internship",
    },

    {
        key: "Communication_Skill",
        label: "Communication",
        type: "skill",
    },

    {
        key: "Problem_Solving_Skill",
        label: "Problem Solving",
        type: "skill",
    },
];

/* =========================================================
   CAREER REQUIREMENTS
========================================================= */

const careerRequirements: Record<
    string,
    CareerRequirement
> = {
    "AI Engineer": {
        CGPA: 7,
        Python: 4,
        SQL: 3,
        MachineLearning: 4,
        DeepLearning: 4,
        DataAnalysis: 3,
        Statistics: 4,
        Programming: 4,
        DSA: 4,
        WebDevelopment: 2,
        Cybersecurity: 2,
        Networking: 2,
        Linux: 3,
        Cloud: 3,
        DevOps: 3,
        NLP: 3,
        ComputerVision: 3,
        OpenCV: 2,
        Projects: 3,
        Internship: 1,
        Communication: 3,
        ProblemSolving: 4,
    },

    "Machine Learning Engineer": {
        CGPA: 7,
        Python: 4,
        SQL: 3,
        MachineLearning: 5,
        DeepLearning: 4,
        DataAnalysis: 3,
        Statistics: 4,
        Programming: 4,
        DSA: 4,
        WebDevelopment: 1,
        Cybersecurity: 1,
        Networking: 1,
        Linux: 3,
        Cloud: 3,
        DevOps: 2,
        NLP: 3,
        ComputerVision: 3,
        OpenCV: 2,
        Projects: 3,
        Internship: 1,
        Communication: 3,
        ProblemSolving: 4,
    },

    "Data Scientist": {
        CGPA: 7,
        Python: 4,
        SQL: 4,
        MachineLearning: 4,
        DeepLearning: 3,
        DataAnalysis: 5,
        Statistics: 5,
        Programming: 3,
        DSA: 3,
        WebDevelopment: 1,
        Cybersecurity: 1,
        Networking: 1,
        Linux: 2,
        Cloud: 2,
        DevOps: 1,
        NLP: 2,
        ComputerVision: 2,
        OpenCV: 1,
        Projects: 3,
        Internship: 1,
        Communication: 4,
        ProblemSolving: 4,
    },

    "Data Analyst": {
        CGPA: 6,
        Python: 3,
        SQL: 5,
        MachineLearning: 2,
        DeepLearning: 1,
        DataAnalysis: 5,
        Statistics: 4,
        Programming: 3,
        DSA: 2,
        WebDevelopment: 1,
        Cybersecurity: 1,
        Networking: 1,
        Linux: 1,
        Cloud: 2,
        DevOps: 1,
        NLP: 1,
        ComputerVision: 1,
        OpenCV: 1,
        Projects: 2,
        Internship: 1,
        Communication: 4,
        ProblemSolving: 4,
    },

    "Software Engineer": {
        CGPA: 6,
        Python: 3,
        SQL: 3,
        MachineLearning: 1,
        DeepLearning: 1,
        DataAnalysis: 2,
        Statistics: 2,
        Programming: 5,
        DSA: 5,
        WebDevelopment: 4,
        Cybersecurity: 2,
        Networking: 2,
        Linux: 3,
        Cloud: 3,
        DevOps: 3,
        NLP: 1,
        ComputerVision: 1,
        OpenCV: 1,
        Projects: 3,
        Internship: 1,
        Communication: 4,
        ProblemSolving: 5,
    },

    "Data Engineer": {
        CGPA: 6,
        Python: 4,
        SQL: 5,
        MachineLearning: 2,
        DeepLearning: 1,
        DataAnalysis: 4,
        Statistics: 3,
        Programming: 4,
        DSA: 3,
        WebDevelopment: 1,
        Cybersecurity: 2,
        Networking: 3,
        Linux: 3,
        Cloud: 4,
        DevOps: 4,
        NLP: 1,
        ComputerVision: 1,
        OpenCV: 1,
        Projects: 3,
        Internship: 1,
        Communication: 3,
        ProblemSolving: 4,
    },

    "Cybersecurity Analyst": {
        CGPA: 6,
        Python: 3,
        SQL: 3,
        MachineLearning: 1,
        DeepLearning: 1,
        DataAnalysis: 2,
        Statistics: 2,
        Programming: 3,
        DSA: 2,
        WebDevelopment: 2,
        Cybersecurity: 5,
        Networking: 5,
        Linux: 4,
        Cloud: 3,
        DevOps: 2,
        NLP: 1,
        ComputerVision: 1,
        OpenCV: 1,
        Projects: 3,
        Internship: 1,
        Communication: 4,
        ProblemSolving: 4,
    },

    "Cloud Engineer": {
        CGPA: 6,
        Python: 3,
        SQL: 2,
        MachineLearning: 1,
        DeepLearning: 1,
        DataAnalysis: 2,
        Statistics: 1,
        Programming: 3,
        DSA: 2,
        WebDevelopment: 2,
        Cybersecurity: 3,
        Networking: 4,
        Linux: 4,
        Cloud: 5,
        DevOps: 4,
        NLP: 1,
        ComputerVision: 1,
        OpenCV: 1,
        Projects: 3,
        Internship: 1,
        Communication: 3,
        ProblemSolving: 4,
    },

    "DevOps Engineer": {
        CGPA: 6,
        Python: 3,
        SQL: 2,
        MachineLearning: 1,
        DeepLearning: 1,
        DataAnalysis: 1,
        Statistics: 1,
        Programming: 3,
        DSA: 2,
        WebDevelopment: 2,
        Cybersecurity: 3,
        Networking: 4,
        Linux: 5,
        Cloud: 5,
        DevOps: 5,
        NLP: 1,
        ComputerVision: 1,
        OpenCV: 1,
        Projects: 3,
        Internship: 1,
        Communication: 3,
        ProblemSolving: 4,
    },

    "NLP Engineer": {
        CGPA: 6,
        Python: 4,
        SQL: 3,
        MachineLearning: 4,
        DeepLearning: 5,
        DataAnalysis: 3,
        Statistics: 4,
        Programming: 4,
        DSA: 3,
        WebDevelopment: 2,
        Cybersecurity: 1,
        Networking: 1,
        Linux: 2,
        Cloud: 3,
        DevOps: 2,
        NLP: 5,
        ComputerVision: 1,
        OpenCV: 1,
        Projects: 3,
        Internship: 1,
        Communication: 4,
        ProblemSolving: 4,
    },

    "Computer Vision Engineer": {
        CGPA: 6,
        Python: 4,
        SQL: 2,
        MachineLearning: 4,
        DeepLearning: 5,
        DataAnalysis: 3,
        Statistics: 4,
        Programming: 4,
        DSA: 3,
        WebDevelopment: 1,
        Cybersecurity: 1,
        Networking: 1,
        Linux: 2,
        Cloud: 3,
        DevOps: 2,
        NLP: 1,
        ComputerVision: 5,
        OpenCV: 5,
        Projects: 3,
        Internship: 1,
        Communication: 3,
        ProblemSolving: 4,
    },
};

/* =========================================================
   CAREER CORE SKILLS
========================================================= */

const careerCoreSkills: Record<string, string[]> = {
    "AI Engineer": [
        "Python",
        "MachineLearning",
        "DeepLearning",
        "Statistics",
        "Programming",
        "DSA",
        "NLP",
        "ComputerVision",
        "ProblemSolving",
    ],

    "Machine Learning Engineer": [
        "Python",
        "MachineLearning",
        "DeepLearning",
        "Statistics",
        "Programming",
        "DSA",
        "DataAnalysis",
        "ProblemSolving",
    ],

    "Data Scientist": [
        "Python",
        "SQL",
        "MachineLearning",
        "DataAnalysis",
        "Statistics",
        "Programming",
        "ProblemSolving",
    ],

    "Data Analyst": [
        "SQL",
        "DataAnalysis",
        "Statistics",
        "Python",
        "Communication",
        "ProblemSolving",
    ],

    "Software Engineer": [
        "Programming",
        "DSA",
        "WebDevelopment",
        "Linux",
        "DevOps",
        "ProblemSolving",
        "Communication",
    ],

    "Data Engineer": [
        "Python",
        "SQL",
        "Programming",
        "DataAnalysis",
        "Cloud",
        "DevOps",
        "Linux",
        "ProblemSolving",
    ],

    "Cybersecurity Analyst": [
        "Cybersecurity",
        "Networking",
        "Linux",
        "Programming",
        "Cloud",
        "ProblemSolving",
        "Communication",
    ],

    "Cloud Engineer": [
        "Cloud",
        "Networking",
        "Linux",
        "DevOps",
        "Cybersecurity",
        "Programming",
        "ProblemSolving",
    ],

    "DevOps Engineer": [
        "DevOps",
        "Cloud",
        "Linux",
        "Networking",
        "Programming",
        "Cybersecurity",
        "ProblemSolving",
    ],

    "NLP Engineer": [
        "Python",
        "MachineLearning",
        "DeepLearning",
        "NLP",
        "Statistics",
        "Programming",
        "ProblemSolving",
    ],

    "Computer Vision Engineer": [
        "Python",
        "MachineLearning",
        "DeepLearning",
        "ComputerVision",
        "OpenCV",
        "Statistics",
        "Programming",
        "ProblemSolving",
    ],
};

/* =========================================================
   FEATURE → REQUIREMENT NAME
========================================================= */

const requirementMap: Record<
    keyof Student,
    string
> = {
    CGPA: "CGPA",

    Python_Skill: "Python",
    SQL_Skill: "SQL",
    Machine_Learning_Skill: "MachineLearning",
    Deep_Learning_Skill: "DeepLearning",
    Data_Analysis_Skill: "DataAnalysis",
    Statistics_Skill: "Statistics",
    Programming_Skill: "Programming",
    DSA_Skill: "DSA",
    Web_Development_Skill: "WebDevelopment",
    Cybersecurity_Skill: "Cybersecurity",
    Networking_Skill: "Networking",
    Linux_Skill: "Linux",
    Cloud_Skill: "Cloud",
    DevOps_Skill: "DevOps",
    NLP_Skill: "NLP",
    Computer_Vision_Skill: "ComputerVision",
    OpenCV_Skill: "OpenCV",

    Projects: "Projects",
    Internship: "Internship",

    Communication_Skill: "Communication",
    Problem_Solving_Skill: "ProblemSolving",
};

/* =========================================================
   DISPLAY LABELS
========================================================= */

const displayLabels: Record<string, string> = {
    CGPA: "CGPA",

    Python: "Python",
    SQL: "SQL",
    MachineLearning: "Machine Learning",
    DeepLearning: "Deep Learning",
    DataAnalysis: "Data Analysis",
    Statistics: "Statistics",
    Programming: "Programming",
    DSA: "DSA",
    WebDevelopment: "Web Development",
    Cybersecurity: "Cybersecurity",
    Networking: "Networking",
    Linux: "Linux",
    Cloud: "Cloud",
    DevOps: "DevOps",
    NLP: "NLP",
    ComputerVision: "Computer Vision",
    OpenCV: "OpenCV",

    Projects: "Projects",
    Internship: "Internship",

    Communication: "Communication",
    ProblemSolving: "Problem Solving",
};

/* =========================================================
   CAREER GOAL MATCHING
========================================================= */

function findCareerRequirements(
    goal: string
): {
    careerName: string;
    requirements: CareerRequirement;
} {
    const text = goal.toLowerCase().trim();

    if (
        text.includes("ai engineer") ||
        text.includes("artificial intelligence")
    ) {
        return {
            careerName: "AI Engineer",
            requirements:
                careerRequirements["AI Engineer"],
        };
    }

    if (
        text.includes("machine learning") ||
        text.includes("ml engineer")
    ) {
        return {
            careerName: "Machine Learning Engineer",
            requirements:
                careerRequirements[
                "Machine Learning Engineer"
                ],
        };
    }

    if (
        text.includes("data scientist") ||
        text.includes("data science")
    ) {
        return {
            careerName: "Data Scientist",
            requirements:
                careerRequirements["Data Scientist"],
        };
    }

    if (
        text.includes("data analyst") ||
        text.includes("business analyst")
    ) {
        return {
            careerName: "Data Analyst",
            requirements:
                careerRequirements["Data Analyst"],
        };
    }

    if (
        text.includes("data engineer") ||
        text.includes("data engineering")
    ) {
        return {
            careerName: "Data Engineer",
            requirements:
                careerRequirements["Data Engineer"],
        };
    }

    if (
        text.includes("cyber") ||
        text.includes("security analyst")
    ) {
        return {
            careerName: "Cybersecurity Analyst",
            requirements:
                careerRequirements[
                "Cybersecurity Analyst"
                ],
        };
    }

    if (
        text.includes("cloud engineer") ||
        text.includes("cloud computing")
    ) {
        return {
            careerName: "Cloud Engineer",
            requirements:
                careerRequirements["Cloud Engineer"],
        };
    }

    if (
        text.includes("devops") ||
        text.includes("dev ops")
    ) {
        return {
            careerName: "DevOps Engineer",
            requirements:
                careerRequirements["DevOps Engineer"],
        };
    }

    if (
        text.includes("nlp") ||
        text.includes("natural language")
    ) {
        return {
            careerName: "NLP Engineer",
            requirements:
                careerRequirements["NLP Engineer"],
        };
    }

    if (
        text.includes("computer vision") ||
        text.includes("vision engineer")
    ) {
        return {
            careerName: "Computer Vision Engineer",
            requirements:
                careerRequirements[
                "Computer Vision Engineer"
                ],
        };
    }

    if (
        text.includes("software") ||
        text.includes("developer")
    ) {
        return {
            careerName: "Software Engineer",
            requirements:
                careerRequirements["Software Engineer"],
        };
    }

    return {
        careerName: "AI Engineer",
        requirements:
            careerRequirements["AI Engineer"],
    };
}

/* =========================================================
   MAIN APP
========================================================= */

function App() {
    const [page, setPage] = useState<
        "home" | "form" | "report"
    >("home");

    const [careerGoal, setCareerGoal] =
        useState("AI Engineer");

    const [student, setStudent] =
        useState<Student>(initialStudent);

    const [result, setResult] =
        useState<PredictionResponse | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    /* =====================================================
       TARGET CAREER
    ===================================================== */

    const targetCareer = useMemo(
        () =>
            findCareerRequirements(
                careerGoal
            ),
        [careerGoal]
    );

    /* =====================================================
       UPDATE STUDENT
    ===================================================== */

    const updateStudent = (
        key: keyof Student,
        value: string
    ) => {
        let numberValue = Number(value);

        if (Number.isNaN(numberValue)) {
            numberValue = 0;
        }

        setStudent((previous) => ({
            ...previous,
            [key]: numberValue,
        }));
    };

    /* =====================================================
       CALCULATE CAREER READINESS
    ===================================================== */

    const calculateReadiness = () => {
        const requirements =
            targetCareer.requirements;

        const coreSkills =
            careerCoreSkills[
            targetCareer.careerName
            ] || [];

        let totalScore = 0;
        let totalWeight = 0;

        features.forEach((feature) => {
            const requirementName =
                requirementMap[feature.key];

            const required =
                requirements[requirementName];

            if (
                required === undefined ||
                required <= 0
            ) {
                return;
            }

            const current =
                Number(student[feature.key]);

            let achievement = 0;

            if (feature.type === "cgpa") {
                achievement =
                    Math.min(
                        current / required,
                        1
                    );
            } else if (
                feature.type === "projects"
            ) {
                achievement =
                    Math.min(
                        current / required,
                        1
                    );
            } else if (
                feature.type === "internship"
            ) {
                achievement =
                    current > 0 ? 1 : 0;
            } else {
                achievement =
                    Math.min(
                        current / required,
                        1
                    );
            }

            const isCoreSkill =
                coreSkills.includes(
                    requirementName
                );

            const weight =
                isCoreSkill ? 3 : 1;

            totalScore +=
                achievement * weight;

            totalWeight += weight;
        });

        if (totalWeight === 0) {
            return 0;
        }

        return Math.round(
            (totalScore / totalWeight) * 100
        );
    };

    const readiness =
        calculateReadiness();

    /* =====================================================
       READINESS STATUS
    ===================================================== */

    const getReadinessStatus =
        (): ReadinessStatus => {
            const requirements =
                targetCareer.requirements;

            const coreSkills =
                careerCoreSkills[
                targetCareer.careerName
                ] || [];

            const criticalGaps: string[] = [];

            coreSkills.forEach(
                (skillName) => {
                    const required =
                        requirements[
                        skillName
                        ];

                    if (
                        required ===
                        undefined ||
                        required <= 0
                    ) {
                        return;
                    }

                    const feature =
                        features.find(
                            (item) =>
                                requirementMap[
                                item.key
                                ] ===
                                skillName
                        );

                    if (!feature) {
                        return;
                    }

                    const current =
                        Number(
                            student[
                            feature.key
                            ]
                        );

                    if (
                        current < required
                    ) {
                        criticalGaps.push(
                            displayLabels[
                            skillName
                            ] ||
                            skillName
                        );
                    }
                }
            );

            if (
                readiness >= 80 &&
                criticalGaps.length <= 1
            ) {
                return {
                    title:
                        `Yes! You are capable of becoming a ${targetCareer.careerName}.`,

                    level: "Strong",

                    className:
                        "success",

                    icon: "✓",

                    message:
                        `Your profile shows strong preparation for ${targetCareer.careerName}. Your core career skills are mostly at or above the required level.`,

                    gaps: criticalGaps,
                };
            }

            if (
                readiness >= 65 &&
                criticalGaps.length <= 3
            ) {
                return {
                    title:
                        `You are on the right path to becoming a ${targetCareer.careerName}.`,

                    level: "Good",

                    className:
                        "warning",

                    icon: "✓",

                    message:
                        `You have a good foundation for ${targetCareer.careerName}. Improve your key skill gaps to become more job-ready.`,

                    gaps: criticalGaps,
                };
            }

            return {
                title:
                    `You can become a ${targetCareer.careerName}, but you need improvement.`,

                level:
                    "Needs Improvement",

                className:
                    "danger",

                icon: "!",

                message:
                    `Your goal is achievable, but some important ${targetCareer.careerName} skills need improvement. Focus on the recommended skills first.`,

                gaps: criticalGaps,
            };
        };

    const readinessStatus =
        getReadinessStatus();

    /* =====================================================
       SKILL REQUIREMENTS
    ===================================================== */

    const skillRequirements =
        useMemo(() => {
            return features.map(
                (feature) => {
                    const requirementName =
                        requirementMap[
                        feature.key
                        ];

                    const required =
                        targetCareer
                            .requirements[
                        requirementName
                        ] ?? 0;

                    const current =
                        Number(
                            student[
                            feature.key
                            ]
                        );

                    let displayCurrent =
                        String(current);

                    let displayRequired =
                        String(required);

                    if (
                        feature.type ===
                        "skill"
                    ) {
                        displayCurrent =
                            `${current}/5`;

                        displayRequired =
                            `${required}/5`;
                    }

                    if (
                        feature.type ===
                        "cgpa"
                    ) {
                        displayCurrent =
                            `${current}/10`;

                        displayRequired =
                            `${required}/10`;
                    }

                    if (
                        feature.type ===
                        "projects"
                    ) {
                        displayCurrent =
                            String(current);

                        displayRequired =
                            `${required}+`;
                    }

                    if (
                        feature.type ===
                        "internship"
                    ) {
                        displayCurrent =
                            current
                                ? "Yes"
                                : "No";

                        displayRequired =
                            required
                                ? "Yes"
                                : "No";
                    }

                    return {
                        key:
                            feature.key,
                        label:
                            feature.label,
                        current,
                        required,
                        displayCurrent,
                        displayRequired,
                        gap: Math.max(
                            required -
                            current,
                            0
                        ),
                        type:
                            feature.type,
                    };
                }
            );
        }, [
            student,
            targetCareer,
        ]);

    /* =====================================================
       TOP SKILLS TO IMPROVE
    ===================================================== */

    const topSkills =
        [...skillRequirements]
            .filter(
                (item) =>
                    item.gap > 0 &&
                    item.type !==
                    "cgpa"
            )
            .sort(
                (a, b) =>
                    b.gap - a.gap
            )
            .slice(0, 5);

    /* =====================================================
       STRENGTHS
    ===================================================== */

    const strengths =
        skillRequirements
            .filter(
                (item) =>
                    item.current >=
                    item.required
            )
            .slice(0, 6);

    /* =====================================================
       ANALYZE CAREER
    ===================================================== */

    const analyzeCareer =
        async () => {
            setLoading(true);
            setError("");

            try {
                const response =
                    await fetch(
                        "https://ai-career-predictor-w2oa.onrender.com/predict",
                        {
                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify(
                                    student
                                ),
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        "Backend prediction failed"
                    );
                }

                const data =
                    (await response.json()) as PredictionResponse;

                setResult(data);

                setPage(
                    "report"
                );
            } catch (err) {
                console.error(
                    err
                );

                setError(
                    "Unable to connect to the Flask backend. Make sure app.py is running on port 5000."
                );
            } finally {
                setLoading(
                    false
                );
            }
        };

    /* =====================================================
       HOME PAGE
    ===================================================== */

    if (page === "home") {
        return (
            <div className="app">

                <header className="navbar">

                    <div className="logo">

                        <span className="logo-icon">
                            🧠
                        </span>

                        <span>
                            AI CAREER PREDICTOR
                        </span>

                    </div>

                    <nav>

                        <button
                            onClick={() =>
                                setPage(
                                    "home"
                                )
                            }
                        >
                            Home
                        </button>

                        <button>
                            About
                        </button>

                        <button>
                            How It Works
                        </button>

                    </nav>

                </header>

                <main className="home-page">

                    <section className="hero">

                        <div className="hero-content">

                            <span className="hero-badge">
                                AI-POWERED CAREER GUIDANCE
                            </span>

                            <h1>
                                Find the Right Career
                                <br />
                                For Your Skills
                            </h1>

                            <p>
                                Discover which career
                                matches your current
                                skills and understand
                                exactly what you need
                                to improve to reach
                                your dream career.
                            </p>

                            <button
                                className="primary-btn"
                                onClick={() =>
                                    setPage(
                                        "form"
                                    )
                                }
                            >
                                Analyze My Career →
                            </button>

                        </div>

                        <div className="hero-visual">

                            <div className="hero-circle">
                                🎯
                            </div>

                        </div>

                    </section>

                    <section className="home-stats">

                        <div>
                            <strong>
                                22
                            </strong>

                            <span>
                                Skills Analyzed
                            </span>
                        </div>

                        <div>
                            <strong>
                                10+
                            </strong>

                            <span>
                                Career Paths
                            </span>
                        </div>

                        <div>
                            <strong>
                                AI
                            </strong>

                            <span>
                                Powered Prediction
                            </span>
                        </div>

                        <div>
                            <strong>
                                100%
                            </strong>

                            <span>
                                Personalized Analysis
                            </span>
                        </div>

                    </section>

                </main>

            </div>
        );
    }
    /* =====================================================
       INPUT FORM PAGE
    ===================================================== */

    if (page === "form") {
        return (
            <div className="app">

                <header className="navbar">

                    <div className="logo">
                        <span className="logo-icon">
                            🧠
                        </span>

                        <span>
                            AI CAREER PREDICTOR
                        </span>
                    </div>

                    <nav>
                        <button
                            onClick={() =>
                                setPage("home")
                            }
                        >
                            Home
                        </button>

                        <button>
                            About
                        </button>

                        <button>
                            How It Works
                        </button>
                    </nav>

                </header>

                <main className="form-page">

                    <button
                        className="back-btn"
                        onClick={() =>
                            setPage("home")
                        }
                    >
                        ← Back to Home
                    </button>

                    <section className="form-heading">

                        <span className="target-icon">
                            🎯
                        </span>

                        <h1>
                            Achieve My Career Goal
                        </h1>

                        <p>
                            Tell us your dream career
                            and your current skills.
                            We will analyze your profile
                            and create a personalized
                            improvement plan.
                        </p>

                    </section>

                    {/* CAREER GOAL */}

                    <div className="goal-box">

                        <label>
                            What is your career goal?
                        </label>

                        <input
                            type="text"
                            value={careerGoal}
                            onChange={(event) =>
                                setCareerGoal(
                                    event.target.value
                                )
                            }
                            placeholder="Example: AI Engineer"
                        />

                        <small>
                            Try: AI Engineer, Data Scientist,
                            Data Analyst, Software Engineer,
                            Cloud Engineer, DevOps Engineer,
                            Cybersecurity Analyst, NLP Engineer
                            or Computer Vision Engineer.
                        </small>

                    </div>

                    {/* 22 FEATURE INPUTS */}

                    <div className="form-card">

                        <div className="form-section-title">
                            <span>📋</span>

                            <div>
                                <h2>
                                    Your Current Profile
                                </h2>

                                <p>
                                    Rate your skills honestly
                                    for a more accurate analysis.
                                </p>
                            </div>
                        </div>

                        <div className="feature-count">
                            22 FEATURES
                        </div>

                        <div className="form-grid">

                            {features.map(
                                (feature, index) => (

                                    <div
                                        className="input-group"
                                        key={feature.key}
                                    >

                                        <label>
                                            <span className="input-number">
                                                {index + 1}
                                            </span>

                                            {feature.label}

                                            {feature.type ===
                                                "skill" &&
                                                (
                                                    <span className="input-hint">
                                                        1–5
                                                    </span>
                                                )}

                                            {feature.type ===
                                                "cgpa" &&
                                                (
                                                    <span className="input-hint">
                                                        0–10
                                                    </span>
                                                )}

                                            {feature.type ===
                                                "projects" &&
                                                (
                                                    <span className="input-hint">
                                                        Count
                                                    </span>
                                                )}
                                        </label>

                                        {feature.type ===
                                            "internship" ? (

                                            <select
                                                value={
                                                    student[
                                                    feature.key
                                                    ]
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    updateStudent(
                                                        feature.key,
                                                        event.target
                                                            .value
                                                    )
                                                }
                                            >

                                                <option value="1">
                                                    Yes
                                                </option>

                                                <option value="0">
                                                    No
                                                </option>

                                            </select>

                                        ) : (

                                            <input
                                                type="number"
                                                value={
                                                    student[
                                                    feature.key
                                                    ]
                                                }
                                                min={
                                                    feature.type ===
                                                        "skill"
                                                        ? 1
                                                        : 0
                                                }
                                                max={
                                                    feature.type ===
                                                        "skill"
                                                        ? 5
                                                        : feature.type ===
                                                            "cgpa"
                                                            ? 10
                                                            : undefined
                                                }
                                                step={
                                                    feature.type ===
                                                        "cgpa"
                                                        ? 0.1
                                                        : 1
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    updateStudent(
                                                        feature.key,
                                                        event.target
                                                            .value
                                                    )
                                                }
                                            />

                                        )}

                                    </div>

                                )
                            )}

                        </div>

                        {/* ERROR */}

                        {error && (
                            <div className="error-message">
                                <span>⚠️</span>

                                <div>
                                    <strong>
                                        Connection Error
                                    </strong>

                                    <p>
                                        {error}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ANALYZE BUTTON */}

                        <button
                            className="analyze-btn"
                            onClick={
                                analyzeCareer
                            }
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="loading-spinner" />
                                    Analyzing Your Profile...
                                </>
                            ) : (
                                <>
                                    Analyze My Career →
                                </>
                            )}

                        </button>

                    </div>

                </main>

            </div>
        );
    }

    /* =====================================================
       REPORT PAGE
    ===================================================== */

    return (
        <div className="app">

            {/* =================================================
               NAVBAR
            ================================================= */}

            <header className="navbar">

                <div className="logo">

                    <span className="logo-icon">
                        🧠
                    </span>

                    <span>
                        AI CAREER PREDICTOR
                    </span>

                </div>

                <nav>

                    <button
                        onClick={() =>
                            setPage("home")
                        }
                    >
                        Home
                    </button>

                    <button>
                        About
                    </button>

                    <button>
                        How It Works
                    </button>

                </nav>

            </header>

            {/* =================================================
               REPORT
            ================================================= */}

            <main className="report-page">

                <button
                    className="back-btn"
                    onClick={() =>
                        setPage("form")
                    }
                >
                    ← Back to Analysis
                </button>

                {/* REPORT HEADER */}

                <section className="report-header">

                    <span className="report-badge">
                        ✨ PERSONALIZED ANALYSIS
                    </span>

                    <h1>
                        Career Goal Analysis Report
                    </h1>

                    <p>
                        We analyzed your complete
                        <strong> 22-feature profile</strong>
                        {" "}and compared it with the
                        requirements of your target career.
                    </p>

                </section>

                {/* =================================================
                   TOP DASHBOARD CARDS
                ================================================= */}

                <section className="top-cards">

                    {/* GOAL CARD */}

                    <div className="dashboard-card goal-card">

                        <div className="card-icon blue-icon">
                            🎯
                        </div>

                        <div>

                            <span className="card-label">
                                YOUR GOAL
                            </span>

                            <h2>
                                {targetCareer.careerName}
                            </h2>

                            <p>
                                Your selected career
                                direction and personalized
                                preparation plan.
                            </p>

                        </div>

                    </div>

                    {/* BEST MATCH */}

                    <div className="dashboard-card match-card">

                        <span className="card-label">
                            CURRENT BEST MATCH
                        </span>

                        <h2>
                            {result?.recommended_role ??
                                "Not Available"}
                        </h2>

                        <div className="big-percentage green">
                            {result?.prediction_probability ??
                                0}
                            %
                        </div>

                        <p>
                            Based on your current
                            22-feature profile.
                        </p>

                    </div>

                    {/* READINESS */}

                    <div
                        className={`dashboard-card readiness-card ${readinessStatus.className}`}
                    >

                        <span className="card-label">
                            GOAL READINESS
                        </span>

                        <div className="readiness-content">

                            <div
                                className="readiness-circle"
                                style={{
                                    background:
                                        `conic-gradient(#16a34a ${readiness}%, #e5e7eb ${readiness}% 100%)`,
                                }}
                            >

                                <div>

                                    <strong>
                                        {readiness}%
                                    </strong>

                                    <span>
                                        Readiness
                                    </span>

                                </div>

                            </div>

                            <div>

                                <h3>
                                    {readinessStatus.level}
                                </h3>

                                <p>
                                    {readinessStatus.message}
                                </p>

                                <span className="readiness-level">
                                    Readiness Level:{" "}
                                    {readinessStatus.level}
                                </span>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =================================================
                   CAPABILITY RESULT
                ================================================= */}

                <section
                    className={`capability-card ${readinessStatus.className}`}
                >

                    <div className="capability-icon">
                        {readinessStatus.icon}
                    </div>

                    <div className="capability-content">

                        <span className="capability-label">
                            CAREER CAPABILITY ASSESSMENT
                        </span>

                        <h2>
                            {readinessStatus.title}
                        </h2>

                        <div className="capability-details">

                            <p>
                                <strong>
                                    Goal:
                                </strong>{" "}
                                {targetCareer.careerName}
                            </p>

                            <p>
                                <strong>
                                    Readiness Score:
                                </strong>{" "}
                                {readiness}%
                            </p>

                        </div>

                        <p>
                            {readinessStatus.message}
                        </p>

                        {readinessStatus.gaps.length >
                            0 && (
                                <div className="critical-gaps">

                                    <strong>
                                        Priority areas:
                                    </strong>

                                    <div>
                                        {readinessStatus.gaps
                                            .slice(0, 5)
                                            .map(
                                                (gap) => (
                                                    <span
                                                        key={gap}
                                                        className="priority-gap"
                                                    >
                                                        {gap}
                                                    </span>
                                                )
                                            )}
                                    </div>

                                </div>
                            )}

                    </div>

                </section>

                {/* =================================================
                   PROFILE SUMMARY
                ================================================= */}

                <section className="dashboard-card profile-card">

                    <div className="section-heading-row">

                        <div>
                            <h2 className="section-title">
                                👤 Your Profile Summary
                            </h2>

                            <p className="section-description">
                                Overview of the information
                                used in your career analysis.
                            </p>
                        </div>

                        <span className="feature-badge">
                            22 FEATURES
                        </span>

                    </div>

                    <div className="profile-grid">

                        <div>
                            <span>
                                CGPA
                            </span>

                            <strong>
                                {student.CGPA}/10
                            </strong>
                        </div>

                        <div>
                            <span>
                                Projects
                            </span>

                            <strong>
                                {student.Projects}
                            </strong>
                        </div>

                        <div>
                            <span>
                                Internship
                            </span>

                            <strong>
                                {student.Internship
                                    ? "Yes"
                                    : "No"}
                            </strong>
                        </div>

                        <div>
                            <span>
                                Technical Skills
                            </span>

                            <strong>
                                {(
                                    (
                                        student.Python_Skill +
                                        student.SQL_Skill +
                                        student.Machine_Learning_Skill +
                                        student.Deep_Learning_Skill +
                                        student.Data_Analysis_Skill +
                                        student.Statistics_Skill +
                                        student.Programming_Skill +
                                        student.DSA_Skill +
                                        student.Web_Development_Skill +
                                        student.Cybersecurity_Skill +
                                        student.Networking_Skill +
                                        student.Linux_Skill +
                                        student.Cloud_Skill +
                                        student.DevOps_Skill +
                                        student.NLP_Skill +
                                        student.Computer_Vision_Skill +
                                        student.OpenCV_Skill
                                    ) / 17
                                ).toFixed(1)}
                                /5
                            </strong>
                        </div>

                        <div>
                            <span>
                                Communication
                            </span>

                            <strong>
                                {student.Communication_Skill}/5
                            </strong>
                        </div>

                        <div>
                            <span>
                                Problem Solving
                            </span>

                            <strong>
                                {student.Problem_Solving_Skill}/5
                            </strong>
                        </div>

                    </div>

                </section>

                {/* =================================================
                   SKILL COMPARISON
                ================================================= */}

                <section className="dashboard-card">

                    <div className="section-heading-row">

                        <div>

                            <h2 className="section-title">
                                📊 Skill Comparison
                            </h2>

                            <p className="section-description">
                                Your current level compared
                                with the requirements for{" "}
                                <strong>
                                    {targetCareer.careerName}
                                </strong>.
                            </p>

                        </div>

                        <span className="feature-badge">
                            ALL 22 FEATURES
                        </span>

                    </div>

                    <div className="skill-table">

                        <div className="skill-row skill-header">

                            <span>
                                Skill
                            </span>

                            <span>
                                Your Level
                            </span>

                            <span>
                                Required
                            </span>

                            <span>
                                Gap
                            </span>

                            <span>
                                Status
                            </span>

                        </div>

                        {skillRequirements.map(
                            (skill) => {

                                const isGood =
                                    skill.current >=
                                    skill.required;

                                const status =
                                    isGood
                                        ? "Excellent"
                                        : skill.gap === 1
                                            ? "Good"
                                            : "Needs Improvement";

                                const statusClass =
                                    isGood
                                        ? "excellent"
                                        : skill.gap === 1
                                            ? "good"
                                            : "needs";

                                let currentPercent = 0;

                                if (
                                    skill.type ===
                                    "cgpa"
                                ) {
                                    currentPercent =
                                        Math.min(
                                            (skill.current /
                                                10) *
                                            100,
                                            100
                                        );
                                } else if (
                                    skill.type ===
                                    "projects"
                                ) {
                                    currentPercent =
                                        Math.min(
                                            (skill.current /
                                                Math.max(
                                                    skill.required,
                                                    1
                                                )) *
                                            100,
                                            100
                                        );
                                } else if (
                                    skill.type ===
                                    "internship"
                                ) {
                                    currentPercent =
                                        skill.current
                                            ? 100
                                            : 0;
                                } else {
                                    currentPercent =
                                        Math.min(
                                            (skill.current /
                                                5) *
                                            100,
                                            100
                                        );
                                }

                                return (
                                    <div
                                        className="skill-row"
                                        key={
                                            skill.key
                                        }
                                    >

                                        <span className="skill-name">
                                            {skill.label}
                                        </span>

                                        <span className="skill-level">

                                            <b>
                                                {
                                                    skill.displayCurrent
                                                }
                                            </b>

                                            <div className="mini-bar">

                                                <div
                                                    style={{
                                                        width: `${currentPercent}%`,
                                                    }}
                                                />

                                            </div>

                                        </span>

                                        <span>
                                            {
                                                skill.displayRequired
                                            }
                                        </span>

                                        <span
                                            className={
                                                skill.gap ===
                                                    0
                                                    ? "gap-zero"
                                                    : "gap-number"
                                            }
                                        >
                                            {skill.gap}
                                        </span>

                                        <span
                                            className={`status ${statusClass}`}
                                        >
                                            {status}
                                        </span>

                                    </div>
                                );
                            }
                        )}

                    </div>

                </section>

                {/* =================================================
                   TWO COLUMN SECTION
                ================================================= */}

                <section className="two-column">

                    {/* TOP SKILLS */}

                    <div className="dashboard-card">

                        <div className="section-heading-row">

                            <div>

                                <h2 className="section-title">
                                    ⭐ Top Skills to Improve
                                </h2>

                                <p className="section-description">
                                    Focus on these areas first
                                    for the biggest improvement.
                                </p>

                            </div>

                        </div>

                        {topSkills.length === 0 ? (

                            <div className="no-gaps">
                                🎉 Excellent! You currently
                                meet all major requirements
                                for this career.
                            </div>

                        ) : (

                            topSkills.map(
                                (skill, index) => (

                                    <div
                                        className="improvement-item"
                                        key={
                                            skill.key
                                        }
                                    >

                                        <div className="rank">
                                            {index + 1}
                                        </div>

                                        <div className="improvement-content">

                                            <div className="improvement-title">

                                                <strong>
                                                    {
                                                        skill.label
                                                    }
                                                </strong>

                                                <span>
                                                    {
                                                        skill.displayCurrent
                                                    }
                                                </span>

                                            </div>

                                            <div className="progress">

                                                <div
                                                    style={{
                                                        width: `${Math.min(
                                                            (skill.current /
                                                                Math.max(
                                                                    skill.required,
                                                                    1
                                                                )) *
                                                            100,
                                                            100
                                                        )}%`,
                                                    }}
                                                />

                                            </div>

                                            <small>
                                                Required:{" "}
                                                {
                                                    skill.displayRequired
                                                }
                                            </small>

                                        </div>

                                        <span
                                            className={`priority ${skill.gap >=
                                                2
                                                ? "high"
                                                : "medium"
                                                }`}
                                        >
                                            {skill.gap >=
                                                2
                                                ? "High Priority"
                                                : "Medium Priority"}
                                        </span>

                                    </div>

                                )
                            )

                        )}

                    </div>

                    {/* STRENGTHS */}

                    <div className="dashboard-card">

                        <h2 className="section-title">
                            💪 Your Strengths
                        </h2>

                        <p className="section-description">
                            Skills where you already meet
                            or exceed the target requirement.
                        </p>

                        <div className="strength-box">

                            <div className="trophy">
                                🏆
                            </div>

                            <div>

                                <h3>
                                    Strong Foundation
                                </h3>

                                <p>
                                    These strengths can help
                                    you progress faster toward
                                    your target career.
                                </p>

                            </div>

                        </div>

                        <div className="strength-list">

                            {strengths.map(
                                (strength) => (

                                    <div
                                        key={
                                            strength.key
                                        }
                                    >

                                        <span>
                                            ✓
                                        </span>

                                        {
                                            strength.label
                                        }

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </section>

                {/* =================================================
                   ROADMAP
                ================================================= */}

                <section className="dashboard-card roadmap-card">

                    <div className="section-heading-row">

                        <div>

                            <h2 className="section-title">
                                🗺️ Your Career Roadmap
                            </h2>

                            <p className="section-description">
                                A practical progression toward
                                becoming a{" "}
                                <strong>
                                    {targetCareer.careerName}
                                </strong>.
                            </p>

                        </div>

                    </div>

                    <div className="roadmap">

                        <div className="roadmap-step">

                            <div className="roadmap-icon">
                                🐍
                            </div>

                            <strong>
                                Strengthen
                                <br />
                                Foundations
                            </strong>

                        </div>

                        <div className="arrow">
                            →
                        </div>

                        <div className="roadmap-step">

                            <div className="roadmap-icon">
                                🧠
                            </div>

                            <strong>
                                Core Career
                                <br />
                                Skills
                            </strong>

                        </div>

                        <div className="arrow">
                            →
                        </div>

                        <div className="roadmap-step">

                            <div className="roadmap-icon">
                                🔬
                            </div>

                            <strong>
                                Advanced
                                <br />
                                Concepts
                            </strong>

                        </div>

                        <div className="arrow">
                            →
                        </div>

                        <div className="roadmap-step">

                            <div className="roadmap-icon">
                                ☁️
                            </div>

                            <strong>
                                Tools &
                                <br />
                                Deployment
                            </strong>

                        </div>

                        <div className="arrow">
                            →
                        </div>

                        <div className="roadmap-step">

                            <div className="roadmap-icon">
                                🚀
                            </div>

                            <strong>
                                Real-World
                                <br />
                                Projects
                            </strong>

                        </div>

                        <div className="arrow">
                            →
                        </div>

                        <div className="roadmap-step">

                            <div className="roadmap-icon">
                                🎯
                            </div>

                            <strong>
                                {targetCareer.careerName}
                                <br />
                                Goal
                            </strong>

                        </div>

                    </div>

                    <div className="roadmap-message">
                        💡 Consistent Learning + Practice +
                        Projects = Career Growth 🚀
                    </div>

                </section>

                {/* =================================================
                   PERSONALIZED ACTION PLAN
                ================================================= */}

                <section className="dashboard-card action-plan-card">

                    <div className="section-heading-row">

                        <div>

                            <h2 className="section-title">
                                ⚡ Personalized Action Plan
                            </h2>

                            <p className="section-description">
                                Based on your current skill
                                gaps, here is where you should
                                focus next.
                            </p>

                        </div>

                    </div>

                    <div className="action-plan-grid">

                        {topSkills
                            .slice(0, 4)
                            .map(
                                (
                                    skill,
                                    index
                                ) => (

                                    <div
                                        className="action-plan-item"
                                        key={
                                            skill.key
                                        }
                                    >

                                        <span className="action-number">
                                            {index + 1}
                                        </span>

                                        <div>

                                            <strong>
                                                Improve{" "}
                                                {
                                                    skill.label
                                                }
                                            </strong>

                                            <p>
                                                Move from{" "}
                                                {
                                                    skill.displayCurrent
                                                }{" "}
                                                to at least{" "}
                                                {
                                                    skill.displayRequired
                                                }.
                                            </p>

                                        </div>

                                    </div>

                                )
                            )}

                        {topSkills.length ===
                            0 && (

                                <div className="action-plan-complete">
                                    🎉 You have no major skill
                                    gaps. Focus on advanced
                                    projects and industry
                                    experience.
                                </div>

                            )}

                    </div>

                </section>

                {/* =================================================
                   RESOURCES
                ================================================= */}

                <section className="dashboard-card">

                    <h2 className="section-title">
                        📚 Recommended Resources
                    </h2>

                    <p className="section-description">
                        Areas that can help you close your
                        current career-readiness gaps.
                    </p>

                    <div className="resources">

                        <div className="resource">

                            <span>
                                🧠
                            </span>

                            <h3>
                                Core Skills
                            </h3>

                            <p>
                                Strengthen the most important
                                technical skills for your
                                target career.
                            </p>

                            <button>
                                Learn Now
                            </button>

                        </div>

                        <div className="resource">

                            <span>
                                💻
                            </span>

                            <h3>
                                Programming
                            </h3>

                            <p>
                                Improve coding, problem solving,
                                DSA and clean programming.
                            </p>

                            <button>
                                Practice
                            </button>

                        </div>

                        <div className="resource">

                            <span>
                                📊
                            </span>

                            <h3>
                                Data & Analytics
                            </h3>

                            <p>
                                Build practical skills in data,
                                statistics and analytics.
                            </p>

                            <button>
                                Explore
                            </button>

                        </div>

                        <div className="resource">

                            <span>
                                ☁️
                            </span>

                            <h3>
                                Cloud & DevOps
                            </h3>

                            <p>
                                Learn deployment, cloud platforms
                                and modern DevOps workflows.
                            </p>

                            <button>
                                Explore
                            </button>

                        </div>

                        <div className="resource">

                            <span>
                                🚀
                            </span>

                            <h3>
                                Projects
                            </h3>

                            <p>
                                Build real-world projects that
                                demonstrate your capabilities.
                            </p>

                            <button>
                                Build
                            </button>

                        </div>

                    </div>

                </section>

                {/* =================================================
                   CAREER PROBABILITY
                ================================================= */}

                <section className="dashboard-card">

                    <div className="section-heading-row">

                        <div>

                            <h2 className="section-title">
                                📈 Career Probability Analysis
                            </h2>

                            <p className="section-description">
                                Model prediction based on your
                                22-feature profile.
                            </p>

                        </div>

                        <span className="feature-badge">
                            AI PREDICTION
                        </span>

                    </div>

                    {result?.career_probabilities
                        ?.slice(0, 10)
                        .map(
                            (
                                career,
                                index
                            ) => (

                                <div
                                    className="career-probability"
                                    key={
                                        career.role
                                    }
                                >

                                    <span className="career-rank">
                                        {index + 1}.
                                    </span>

                                    <strong>
                                        {career.role}
                                    </strong>

                                    <div className="career-bar">

                                        <div
                                            style={{
                                                width: `${Math.min(
                                                    career.probability,
                                                    100
                                                )}%`,
                                            }}
                                        />

                                    </div>

                                    <span className="career-percent">
                                        {
                                            career.probability
                                        }
                                        %
                                    </span>

                                </div>

                            )
                        )}

                    {!result && (

                        <div className="no-result">
                            Career prediction data will
                            appear here after analysis.
                        </div>

                    )}

                </section>

                {/* =================================================
                   FINAL ADVICE
                ================================================= */}

                <section className="final-advice">

                    <div>

                        <span>
                            ✨
                        </span>

                        <h2>
                            Your Career Plan
                        </h2>

                        <p>
                            Stay consistent, improve the
                            identified skill gaps, build
                            real-world projects and gain
                            practical experience.
                        </p>

                    </div>

                    <strong>
                        Your goal of becoming a{" "}
                        {targetCareer.careerName} is
                        achievable. 🚀
                    </strong>

                </section>

                {/* =================================================
                   FOOTER ACTIONS
                ================================================= */}

                <div className="report-actions">

                    <button
                        className="secondary-btn"
                        onClick={() =>
                            setPage("form")
                        }
                    >
                        ← Update My Profile
                    </button>

                    <button
                        className="primary-btn"
                        onClick={() =>
                            setPage("home")
                        }
                    >
                        Start New Analysis →
                    </button>

                </div>

            </main>

        </div>
    );
}

export default App;
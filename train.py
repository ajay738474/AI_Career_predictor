import pandas as pd
import joblib

# ============================================================
# IMPORTS
# ============================================================

from sklearn.preprocessing import LabelEncoder, StandardScaler

from sklearn.model_selection import (
    train_test_split,
    GridSearchCV
)

from sklearn.pipeline import Pipeline

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix
)


# ============================================================
# 1. LOAD DATASET
# ============================================================

df = pd.read_csv(
    "data/career_data_2000.csv"
)

print("\n========== DATASET ==========")

print(df.head())

print("\nShape:", df.shape)

print("\nColumns:")
print(df.columns.tolist())


# ============================================================
# 2. DATASET INFORMATION
# ============================================================

print("\n========== DATASET INFO ==========")

df.info()


# ============================================================
# 3. MISSING VALUES
# ============================================================

print("\n========== MISSING VALUES ==========")

print(df.isnull().sum())


# ============================================================
# 4. JOB ROLE DISTRIBUTION
# ============================================================

print("\n========== JOB ROLE DISTRIBUTION ==========")

print(df["Job_Role"].value_counts())


# ============================================================
# 5. AVERAGE FEATURES BY JOB ROLE
# ============================================================

print("\n========== AVERAGE FEATURES BY JOB ROLE ==========")

average_features = df.groupby(
    "Job_Role"
).mean(numeric_only=True)

print(
    average_features.round(2)
)


# ============================================================
# 6. FEATURES AND TARGET
# ============================================================

X = df.drop(
    "Job_Role",
    axis=1
)

y = df["Job_Role"]


print("\n========== FEATURES AND TARGET ==========")

print("X shape:", X.shape)

print("y shape:", y.shape)

print("\nFeatures:")

print(X.columns.tolist())


# ============================================================
# 7. LABEL ENCODING
# ============================================================

label_encoder = LabelEncoder()

y = label_encoder.fit_transform(y)


print("\n========== JOB ROLE MAPPING ==========")

for number, role in enumerate(
    label_encoder.classes_
):

    print(
        number,
        "=",
        role
    )


# ============================================================
# 8. TRAIN TEST SPLIT
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


print("\n========== TRAIN TEST SPLIT ==========")

print(
    "Training data:",
    X_train.shape
)

print(
    "Testing data :",
    X_test.shape
)


# ============================================================
# 9. LOGISTIC REGRESSION
# ============================================================

print("\n========== LOGISTIC REGRESSION ==========")

logistic_pipeline = Pipeline([
    (
        "scaler",
        StandardScaler()
    ),

    (
        "model",
        LogisticRegression(
            max_iter=2000
        )
    )
])


logistic_params = {

    "model__C": [
        0.01,
        0.1,
        1,
        10,
        100
    ]

}


logistic_grid = GridSearchCV(

    logistic_pipeline,

    logistic_params,

    cv=5,

    scoring="accuracy",

    n_jobs=-1

)


logistic_grid.fit(
    X_train,
    y_train
)


print(
    "Best Parameters:",
    logistic_grid.best_params_
)

print(
    "Best CV Accuracy:",
    round(
        logistic_grid.best_score_,
        4
    )
)


logistic_best = (
    logistic_grid.best_estimator_
)

logistic_pred = logistic_best.predict(
    X_test
)


# ============================================================
# 10. DECISION TREE
# ============================================================

print("\n========== DECISION TREE ==========")

decision_tree = DecisionTreeClassifier(
    random_state=42
)


decision_tree_params = {

    "max_depth": [
        3,
        5,
        10,
        15,
        None
    ],

    "min_samples_split": [
        2,
        5,
        10
    ],

    "min_samples_leaf": [
        1,
        2,
        4
    ]

}


decision_tree_grid = GridSearchCV(

    decision_tree,

    decision_tree_params,

    cv=5,

    scoring="accuracy",

    n_jobs=-1

)


decision_tree_grid.fit(
    X_train,
    y_train
)


print(
    "Best Parameters:",
    decision_tree_grid.best_params_
)

print(
    "Best CV Accuracy:",
    round(
        decision_tree_grid.best_score_,
        4
    )
)


decision_tree_best = (
    decision_tree_grid.best_estimator_
)

dt_pred = decision_tree_best.predict(
    X_test
)


# ============================================================
# 11. RANDOM FOREST
# ============================================================

print("\n========== RANDOM FOREST ==========")

random_forest = RandomForestClassifier(
    random_state=42
)


random_forest_params = {

    "n_estimators": [
        50,
        100,
        200
    ],

    "max_depth": [
        5,
        10,
        20,
        None
    ],

    "min_samples_split": [
        2,
        5
    ],

    "min_samples_leaf": [
        1,
        2
    ]

}


random_forest_grid = GridSearchCV(

    random_forest,

    random_forest_params,

    cv=5,

    scoring="accuracy",

    n_jobs=-1

)


random_forest_grid.fit(
    X_train,
    y_train
)


print(
    "Best Parameters:",
    random_forest_grid.best_params_
)

print(
    "Best CV Accuracy:",
    round(
        random_forest_grid.best_score_,
        4
    )
)


random_forest_best = (
    random_forest_grid.best_estimator_
)

rf_pred = random_forest_best.predict(
    X_test
)


# ============================================================
# 12. KNN
# ============================================================

print("\n========== KNN ==========")

knn_pipeline = Pipeline([

    (
        "scaler",
        StandardScaler()
    ),

    (
        "model",
        KNeighborsClassifier()
    )

])


knn_params = {

    "model__n_neighbors": [
        3,
        5,
        7,
        9,
        11,
        15
    ],

    "model__weights": [
        "uniform",
        "distance"
    ]

}


knn_grid = GridSearchCV(

    knn_pipeline,

    knn_params,

    cv=5,

    scoring="accuracy",

    n_jobs=-1

)


knn_grid.fit(
    X_train,
    y_train
)


print(
    "Best Parameters:",
    knn_grid.best_params_
)

print(
    "Best CV Accuracy:",
    round(
        knn_grid.best_score_,
        4
    )
)


knn_best = (
    knn_grid.best_estimator_
)

knn_pred = knn_best.predict(
    X_test
)


# ============================================================
# 13. SVM
# ============================================================

print("\n========== SVM ==========")

svm_pipeline = Pipeline([

    (
        "scaler",
        StandardScaler()
    ),

    (
        "model",
        SVC(
            probability=True
        )
    )

])


svm_params = {

    "model__C": [
        0.1,
        1,
        10,
        100
    ],

    "model__kernel": [
        "linear",
        "rbf"
    ],

    "model__gamma": [
        "scale",
        "auto"
    ]

}


svm_grid = GridSearchCV(

    svm_pipeline,

    svm_params,

    cv=5,

    scoring="accuracy",

    n_jobs=-1

)


svm_grid.fit(
    X_train,
    y_train
)


print(
    "Best Parameters:",
    svm_grid.best_params_
)

print(
    "Best CV Accuracy:",
    round(
        svm_grid.best_score_,
        4
    )
)


svm_best = (
    svm_grid.best_estimator_
)

svm_pred = svm_best.predict(
    X_test
)


# ============================================================
# 14. MODEL COMPARISON
# ============================================================

models = {

    "Logistic Regression":
        logistic_pred,

    "Decision Tree":
        dt_pred,

    "Random Forest":
        rf_pred,

    "KNN":
        knn_pred,

    "SVM":
        svm_pred

}


results = []


print("\n========== MODEL COMPARISON ==========")


for name, predictions in models.items():

    accuracy = accuracy_score(
        y_test,
        predictions
    )


    precision = precision_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )


    recall = recall_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )


    f1 = f1_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )


    results.append({

        "Model": name,

        "Accuracy": accuracy,

        "Precision": precision,

        "Recall": recall,

        "F1": f1

    })


    print("\n", name)

    print(
        "Accuracy :",
        round(accuracy, 4)
    )

    print(
        "Precision:",
        round(precision, 4)
    )

    print(
        "Recall   :",
        round(recall, 4)
    )

    print(
        "F1-score :",
        round(f1, 4)
    )


# ============================================================
# 15. CONFUSION MATRICES
# ============================================================

print("\n========== CONFUSION MATRICES ==========")


for name, predictions in models.items():

    cm = confusion_matrix(
        y_test,
        predictions
    )

    print(
        f"\n{name}"
    )

    print(cm)


# ============================================================
# 16. FIND BEST MODEL
# ============================================================

best_result = max(
    results,
    key=lambda x: x["Accuracy"]
)


best_model_name = (
    best_result["Model"]
)


print("\n========== BEST MODEL ==========")

print(
    "Model:",
    best_model_name
)


print(
    "Test Accuracy:",
    round(
        best_result["Accuracy"],
        4
    )
)


# ============================================================
# 17. SELECT BEST MODEL OBJECT
# ============================================================

best_models = {

    "Logistic Regression":
        logistic_best,

    "Decision Tree":
        decision_tree_best,

    "Random Forest":
        random_forest_best,

    "KNN":
        knn_best,

    "SVM":
        svm_best

}


best_model = best_models[
    best_model_name
]


# ============================================================
# 18. FEATURE IMPORTANCE
# ============================================================

print("\n========== FEATURE IMPORTANCE ==========")


if best_model_name == "Random Forest":

    importances = (
        best_model.feature_importances_
    )

    feature_importance = pd.DataFrame({

        "Feature": X.columns,

        "Importance": importances

    })


    feature_importance = (
        feature_importance
        .sort_values(
            "Importance",
            ascending=False
        )
    )


    print(
        feature_importance.to_string(
            index=False
        )
    )


elif best_model_name == "Decision Tree":

    importances = (
        best_model.feature_importances_
    )

    feature_importance = pd.DataFrame({

        "Feature": X.columns,

        "Importance": importances

    })


    feature_importance = (
        feature_importance
        .sort_values(
            "Importance",
            ascending=False
        )
    )


    print(
        feature_importance.to_string(
            index=False
        )
    )


elif best_model_name == "Logistic Regression":

    coefficients = (
        best_model.named_steps["model"]
        .coef_
    )

    importance = abs(
        coefficients
    ).mean(axis=0)


    feature_importance = pd.DataFrame({

        "Feature": X.columns,

        "Importance": importance

    })


    feature_importance = (
        feature_importance
        .sort_values(
            "Importance",
            ascending=False
        )
    )


    print(
        feature_importance.to_string(
            index=False
        )
    )


else:

    print(
        "Feature importance is not directly available "
        "for this model."
    )


# ============================================================
# 19. SAVE BEST MODEL
# ============================================================

joblib.dump(
    best_model,
    "career_model.pkl"
)


# ============================================================
# 20. SAVE LABEL ENCODER
# ============================================================

joblib.dump(
    label_encoder,
    "label_encoder.pkl"
)


# ============================================================
# 21. SAVE FEATURE NAMES
# ============================================================

feature_names = X.columns.tolist()


joblib.dump(
    feature_names,
    "feature_names.pkl"
)


# ============================================================
# 22. FINAL SUMMARY
# ============================================================

print("\n========== FINAL SUMMARY ==========")

print(
    "Total students:",
    len(df)
)

print(
    "Training students:",
    len(X_train)
)

print(
    "Testing students:",
    len(X_test)
)


print("\nNumber of features:")

print(
    len(feature_names)
)


print("\nNumber of career roles:")

print(
    len(label_encoder.classes_)
)


print("\nBest Model:")

print(
    best_model_name
)


print(
    "Best Test Accuracy:",
    round(
        best_result["Accuracy"],
        4
    )
)


print("\nSaved files:")

print(
    "career_model.pkl"
)

print(
    "label_encoder.pkl"
)

print(
    "feature_names.pkl"
)


print(
    "\n========== TRAINING COMPLETED =========="
)
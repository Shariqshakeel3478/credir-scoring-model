# ⚡ AI-Powered Credit Scoring System

An ultra-modern, full-stack AI-driven Credit Scoring Application. This system leverages a Machine Learning pipeline to analyze applicant data (such as age, income, and credit history) and predict financial risk, seamlessly integrated with a high-performance Flask API and a futuristic React frontend.

---

## 🚀 Tech Stack

* **Frontend:** React (Vite), Tailwind CSS (Glassmorphism UI)
* **Backend:** Flask (Python)
* **Machine Learning:** Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn
* **Deployment:** Vercel (Frontend) & Render (Backend)

---

## 📅 Project Architecture & Workflow

This project is systematically developed following a structured learning and implementation pipeline:

### 🧠 Data Science & ML Pipeline
* **Exploratory Data Analysis:** Environment setup, data loading (`pd.read_csv()`), and dataset structure analysis.
* **Data Preprocessing:** Data cleaning (`fillna()`, `drop()`), feature engineering, and categorical encoding via `LabelEncoder`.
* **Model Training:** Train/Test split and building a baseline Logistic Regression model.
* **Model Evaluation & Tuning:** Performance comparison using Decision Trees and Random Forests, analyzing Confusion Matrix, Precision, Recall, and F1-Score.
* **Model Export:** Saving the final optimized production model using `joblib`.

### ⚡ Flask Backend API
* **Backend Architecture:** Initializing Flask environment and setting up secure folder structures.
* **API Endpoints:** Creating the core `/predict` POST route to serve the trained ML model.
* **Validation:** Handling JSON inputs, payload validation, and testing backend stability using Postman.

### 💻 Cyberpunk React Frontend
* **UI Initialization:** Setting up React with Vite and styling with an ultra-modern design.
* **Interactive Forms:** Creating a credit application form to collect applicant data.
* **Full-Stack Connectivity:** Establishing seamless integration with the Flask backend using `fetch()`.
* **UX Enhancements:** Integrating interactive charts, loading animations, and conditional states for risk assessment.

### 🌐 Production Deployment
* **Live Hosting:** Hosting the active Flask API on Render.
* **Static Deployment:** Deploying the responsive React build to Vercel.
* **Polishing:** Final repository optimization, documentation, and screenshots.

---

## 🛠️ Installation & Setup

### Prerequisites
* Python 3.x
* Node.js & npm

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py

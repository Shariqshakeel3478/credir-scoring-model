from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)  # Keep this enabled for your upcoming React frontend integration!


try:
    model = joblib.load("../model/model.pkl")
except Exception as e:
    print(f"❌ Error loading model: {str(e)}")
    model = None


columns = [
    'status_account', 'month_duration', 'credit_history', 'purpose', 'credit_amount',
    'status_savings', 'years_employment', 'payment_to_income_ratio', 'status_and_sex',
    'secondary_obligor', 'residence_since', 'collateral', 'age', 'other_installment_plans',
    'housing', 'n_credits', 'job', 'n_guarantors', 'telephone', 'is_foreign_worker'
]

@app.route("/")
def home():
    return {
        "message": "Credit Scoring API Running Successfully"
    }

@app.route("/predict", methods=["POST"])
def predict():
    if not model:
        return jsonify({"error": "Machine learning model is not initialized on the server."}), 500

    try:
       
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"error": "Invalid request. Body must be a valid JSON object."}), 400

        # 2. Day 17 Validation: Check for missing critical fields
        missing_fields = [col for col in columns if col not in data]
        if missing_fields:
            return jsonify({
                "error": "Missing required fields in payload",
                "missing_fields": missing_fields
            }), 400

       
        for numeric_field in ['month_duration', 'credit_amount', 'age']:
            if not isinstance(data[numeric_field], (int, float)):
                return jsonify({"error": f"Field '{numeric_field}' must be a numeric value."}), 400

      
        customer = pd.DataFrame([data])

       
        customer = customer.reindex(
            columns=columns,
            fill_value=0
        )

        
        prediction = model.predict(customer)[0]

       
        probability = model.predict_proba(customer)[0]

        result = (
            "Good Credit Risk"
            if prediction == 1
            else "Bad Credit Risk"
        )

        return jsonify({
            "prediction": result,
            "bad_risk_probability": round(probability[0] * 100, 2),
            "good_risk_probability": round(probability[1] * 100, 2)
        })

    except Exception as e:
        return jsonify({
            "error": "An internal server error occurred.",
            "details": str(e)
        }), 500


if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )
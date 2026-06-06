from flask import Flask, request, jsonify
from flask_cors import CORS
import random

# 1. Flask App Initialize karna
app = Flask(__name__)
CORS(app) # React frontend se connect karne ke liye CORS enable kiya

# 2. Test Route (Jaise Express mein app.get('/') hota hai)
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Credit Scoring Backend (Mock Mode) is running!"})

# 3. Predict Route (Yahan React se data aayega)
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # React se aane wala JSON data lena
        data = request.get_json()
        
        # Abhi hamare paas model file nahi hai, toh ham ek simple rule-based logic laga dete hain:
        # Agar customer ki age 25 se zyada hai aur credit_amount 5000 se kam hai, toh 'Good' warna 'Bad'
        age = data.get('age', 30)
        credit_amount = data.get('credit_amount', 1000)
        
        if age > 25 and credit_amount < 8000:
            result = "Good"
            score = random.randint(700, 850) # Excellent credit score range
        else:
            result = "Bad"
            score = random.randint(300, 600) # Poor credit score range
            
        return jsonify({
            "status": "success",
            "credit_risk": result,
            "credit_score": score,
            "message": "Prediction generated using development mock logic."
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

# 4. Server Run karna (Port 5000 par)
if __name__ == '__main__':
    app.run(debug=True, port=5000)
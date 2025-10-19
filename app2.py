from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
import os


os.environ["HUGGINGFACEHUB_API_TOKEN"] = "Enter Your Api key"


app = Flask(__name__)
CORS(app)

data = pd.read_csv("monthly_expense_dataset_1.csv")

expense_columns = [
    "house_rent", "emi", "electricity", "mobile", "internet", "card",
    "others_bill", "taxes", "groceries", "health", "pub_tran",
    "pri_tran", "others"
]


data["total_expenses"] = data[expense_columns].sum(axis=1)
data["ideal_savings"] = data["monthly_income"] - data["total_expenses"]

data["target_savings"] = data["monthly_income"] * (
    0.3 - (data["total_expenses"] / data["monthly_income"]) * 0.2
)
data["target_savings"] = data["target_savings"].clip(lower=0)


X = data[["monthly_income"] + expense_columns]
y = data["target_savings"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)

print("✅ Machine Learning model trained successfully!")


llm = HuggingFaceEndpoint(
    repo_id="deepseek-ai/DeepSeek-V3.2-Exp",
    task="text-generation",
    temperature=0.7,
)

model_ai = ChatHuggingFace(llm=llm)
print("✅ Hugging Face AI model initialized successfully!")


def generate_model_suggestion(income, total_expenses, predicted_savings):
    savings_rate = (predicted_savings / income) * 100 if income > 0 else 0

    if savings_rate < 10:
        level = "⚠️ Critical"
        message = "Your savings rate is very low. Try to reduce unnecessary expenses immediately."
    elif 10 <= savings_rate <= 25:
        level = "💡 Stable"
        message = "You’re saving moderately. Consider automating your savings and optimizing investments."
    else:
        level = "🏆 Excellent"
        message = "Great job! You’re saving efficiently and ready for long-term wealth building."

    plan = {
        "Short-term (0–6 months)": "Build an emergency fund for 3–6 months of expenses.",
        "Mid-term (6–24 months)": "Start SIPs or recurring deposits to grow wealth steadily.",
        "Long-term (2+ years)": "Invest in mutual funds, equity, or index funds for better returns."
    }

    allocation = {
        "Emergency Fund": "15%",
        "Equity / Index Funds": "35%",
        "PPF / NPS / PF": "25%",
        "FD / Bonds": "15%",
        "Gold / Digital Gold": "10%"
    }

    return {
        "level": level,
        "message": message,
        "recommended_savings": round(predicted_savings, 2),
        "savings_rate": round(savings_rate, 2),
        "plan": plan,
        "investment_allocation": allocation
    }


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data_req = request.get_json()

        income = float(data_req.get("monthly_income", 0))
        expenses = [float(data_req.get(col, 0)) for col in expense_columns]
        total_expenses = sum(expenses)


        input_df = pd.DataFrame([[income] + expenses], columns=["monthly_income"] + expense_columns)
        predicted_savings = model.predict(input_df)[0]

        model_suggestion = generate_model_suggestion(income, total_expenses, predicted_savings)


        ai_prompt = f"""
User's monthly financial summary:
- Income: ₹{income}
- Total Expenses: ₹{total_expenses}
- Model Suggested Savings: ₹{predicted_savings:.2f}

Provide a personalized savings improvement plan (4–5 bullet points) suitable for an Indian user.
Include:
- Budgeting tips
- Smart SIP or mutual fund advice
- Emergency fund guidance
- Simple tax-saving suggestions
- Reducing discretionary spending
"""
        ai_message = model_ai.invoke(ai_prompt)
        ai_response = ai_message.content  

        return jsonify({
            "total_expenses": round(total_expenses, 2),
            "recommended_savings": round(predicted_savings, 2),
            "model_suggestion": model_suggestion,
            "ai_suggestion": ai_response
        })

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)

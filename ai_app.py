from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os


load_dotenv()

app = Flask(__name__)
CORS(app)


api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY is missing! Please set it in your .env file.")


client = OpenAI(api_key=api_key)

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "").strip()

        if not user_message:
            return jsonify({"response": "Please type a message."})


        system_prompt = (
            "You are FinAI, a professional financial assistant. "
            "You only answer questions related to finance, fintech, banking, investing, trading, "
            "cryptocurrency, or economics. "
            "If the user asks something unrelated, respond with: "
            "'I’m designed to answer only fintech-related questions. Please ask about finance or technology in finance.'"
        )

        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.6
        )

        bot_reply = completion.choices[0].message.content.strip()
        return jsonify({"response": bot_reply})

    except Exception as e:
        print("Error:", e)
        return jsonify({"response": "Sorry, something went wrong on the server."}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5012)

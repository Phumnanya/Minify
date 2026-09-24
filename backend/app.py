import os
import hmac
import hashlib
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # tighten this to your frontend's origin before deploying

PAYSTACK_SECRET_KEY = os.environ.get("PAYSTACK_SECRET_KEY")
PAYSTACK_BASE_URL = "https://api.paystack.co"

HEADERS = {
    "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}",
    "Content-Type": "application/json",
}


@app.route("/api/paystack/initialize", methods=["POST"])
def initialize_transaction():
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    amount = data.get("amount")  # naira, as a number (e.g. 4500.00) — NOT kobo

    if not email or amount is None:
        return jsonify({"error": "email and amount are required"}), 400

    try:
        amount = float(amount)
        if amount <= 0:
            raise ValueError
    except (TypeError, ValueError):
        return jsonify({"error": "amount must be a positive number"}), 400

    payload = {
        "email": email,
        "amount": int(round(amount * 100)),  # Paystack expects the amount in kobo
    }

    try:
        response = requests.post(
            f"{PAYSTACK_BASE_URL}/transaction/initialize",
            json=payload,
            headers=HEADERS,
            timeout=10,
        )
        result = response.json()
    except requests.RequestException:
        return jsonify({"error": "Could not reach Paystack"}), 502

    if not result.get("status"):
        return jsonify({"error": result.get("message", "Could not initialize transaction")}), 400

    return jsonify({
        "access_code": result["data"]["access_code"],
        "reference": result["data"]["reference"],
        "authorization_url": result["data"]["authorization_url"],
    })


@app.route("/api/paystack/verify/<reference>", methods=["GET"])
def verify_transaction(reference):
    try:
        response = requests.get(
            f"{PAYSTACK_BASE_URL}/transaction/verify/{reference}",
            headers=HEADERS,
            timeout=10,
        )
        result = response.json()
    except requests.RequestException:
        return jsonify({"error": "Could not reach Paystack"}), 502

    if not result.get("status"):
        return jsonify({"error": result.get("message", "Verification failed")}), 400

    data = result["data"]
    is_success = data.get("status") == "success"

    return jsonify({
        "success": is_success,
        "amount": data.get("amount", 0) / 100,
        "reference": data.get("reference"),
        "paid_at": data.get("paid_at"),
        "customer_email": (data.get("customer") or {}).get("email"),
    })


@app.route("/api/paystack/webhook", methods=["POST"])
def paystack_webhook():
    """
    Paystack calls this independently of the frontend to confirm payment
    events server-to-server. No DB yet, so this just verifies the request
    is genuinely from Paystack and logs it — swap the print() for a DB
    write once you add persistence.
    """
    signature = request.headers.get("x-paystack-signature", "")
    computed_signature = hmac.new(
        (PAYSTACK_SECRET_KEY or "").encode("utf-8"),
        request.data,
        hashlib.sha512,
    ).hexdigest()

    if not hmac.compare_digest(signature, computed_signature):
        return jsonify({"error": "invalid signature"}), 401

    event = request.get_json(silent=True) or {}
    event_type = event.get("event")
    reference = (event.get("data") or {}).get("reference")

    print(f"[Paystack webhook] event={event_type} reference={reference}")

    return jsonify({"status": "received"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
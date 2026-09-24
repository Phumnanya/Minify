# Minify

Minify is a full-stack e-commerce web application featuring a React frontend and a Flask backend, with integrated real-time payment processing via Paystack.

## Features

- Product browsing and detail views
- Shopping cart with persistent state (survives page refresh)
- Quantity adjustment and item removal in cart
- Secure checkout powered by Paystack Inline Checkout
- Server-side payment verification before order confirmation
- Webhook endpoint for real-time payment event confirmation from Paystack

## Tech Stack

**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS
- Zustand (state management, with persistence)
- TanStack Query (data fetching/caching)
- React Router
- Font Awesome (icons)
- `@paystack/inline-js` (Paystack checkout popup)

**Backend**
- Python + Flask
- Paystack REST API (transaction initialize/verify, webhook signature verification)
- python-dotenv (environment variable management)

## Project Structure
Minify/
├── src/ # React frontend source
│ ├── components/
│ ├── views/ # Page-level components (Cart, Overview, etc.)
│ ├── services/ # API service functions (paystack.ts)
│ └── ZustandStore.ts # Global cart state
├── public/
├── backend/ # Flask API
│ ├── app.py
│ ├── requirements.txt
│ └── .env.example
├── package.json
└── README.md


## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- Python 3.9+
- A free [Paystack](https://paystack.com) account (test mode is sufficient)

### 1. Clone the repository

```bash
git clone git@github.com:Phumnanya/Minify.git
cd Minify
```

### 2. Frontend setup

```bash
npm install
npm run dev
```

The frontend runs by default at `http://localhost:5173` (Vite's default port).

### 3. Backend setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

Open `.env` and paste in your Paystack **secret key**:
PAYSTACK_SECRET_KEY=sk_test_your_actual_key_here

You can find this in your Paystack Dashboard under **Settings → API Keys & Webhooks**. Keep the account in test mode while developing — test transactions behave identically to live ones but don't move real money.

Then start the server:

```bash
python3 app.py or python app.py
```

The API runs by default at `http://localhost:5000`.

### 4. Run both together

With the backend running in one terminal and `npm run dev` running in another, the frontend cart/checkout flow will talk to the Flask API automatically.

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `PAYSTACK_SECRET_KEY` | `backend/.env` | Your Paystack secret key. Never commit this file. |

## Payment Flow

1. User adds items to cart (persisted in `localStorage` via Zustand).
2. On checkout, the user enters an email and clicks "Place Order."
3. The frontend calls the backend's `/api/paystack/initialize` endpoint, which creates a transaction with Paystack and returns an access code.
4. The Paystack popup opens using that access code (`resumeTransaction`), so the payment amount is locked in server-side and can't be tampered with client-side.
5. On successful payment, the frontend calls `/api/paystack/verify/<reference>` to confirm the transaction really succeeded before showing the success screen and clearing the cart.
6. Paystack also independently calls `/api/paystack/webhook` to confirm the event server-to-server; the signature is verified using HMAC-SHA512 against the secret key.

## Known Limitations / Next Steps

- No database yet — orders are not persisted. The webhook currently logs events to the console rather than storing them.
- No user authentication — email is collected per-checkout rather than tied to an account.
- Currency is fixed to NGN.

## License

[MIT]
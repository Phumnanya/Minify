const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://backend-glimmering-song-1039.fly.dev";

type InitializeResponse = {
  access_code: string;
  reference: string;
  authorization_url: string;
};

type VerifyResponse = {
  success: boolean;
  amount: number;
  reference: string;
  paid_at: string | null;
  customer_email: string | null;
};

export async function initializePayment(
  email: string,
  amount: number
): Promise<InitializeResponse> {
  const response = await fetch(`${API_BASE_URL}/api/paystack/initialize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, amount }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Failed to initialize payment");
  }

  return response.json();
}

export async function verifyPayment(reference: string): Promise<VerifyResponse> {
  const response = await fetch(`${API_BASE_URL}/api/paystack/verify/${reference}`);

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Failed to verify payment");
  }

  return response.json();
}
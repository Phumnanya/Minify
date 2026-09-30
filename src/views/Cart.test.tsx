import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cart from "./Cart";
import { ZustandStore } from "../ZustandStore";
import { initializePayment, verifyPayment } from "../paystack";

vi.mock("../paystack", () => ({
  initializePayment: vi.fn(),
  verifyPayment: vi.fn(),
}));

// Fake Paystack popup that immediately reports success
vi.mock("@paystack/inline-js", () => ({
  default: class {
    resumeTransaction(_code: string, callbacks: { onSuccess: () => void }) {
      callbacks.onSuccess();
    }
  },
}));

const products = [
  { id: "p1", name: "Blue Shirt", desc: "A shirt", price: 5000, image: "shirt.png" },
  { id: "p2", name: "Red Cap", desc: "A cap", price: 2000, image: "cap.png" },
];

function renderCart() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("Cart", () => {
  beforeEach(() => {
    localStorage.clear();
    ZustandStore.setState({ cart: [] });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => products })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("shows an empty message when the cart has no items", () => {
    renderCart();
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("shows the product name and correct subtotal for items in the cart", async () => {
    ZustandStore.getState().addItem("p1", 2);
    renderCart();

    expect(await screen.findByText("Blue Shirt")).toBeInTheDocument();
    expect(screen.getByText("₦10000")).toBeInTheDocument(); // 2 x 5000
  });

  it("increases quantity when the + button is clicked", async () => {
    const user = userEvent.setup();
    ZustandStore.getState().addItem("p1", 1);
    renderCart();

    await screen.findByText("Blue Shirt");
    await user.click(screen.getByRole("button", { name: "+" }));

    expect(ZustandStore.getState().cart[0].quantity).toBe(2);
  });

  it("removes the item when remove is clicked", async () => {
    const user = userEvent.setup();
    ZustandStore.getState().addItem("p1", 1);
    renderCart();

    await screen.findByText("Blue Shirt");
    await user.click(screen.getByRole("button", { name: /remove/i }));

    expect(ZustandStore.getState().cart).toHaveLength(0);
    expect(screen.queryByText("Blue Shirt")).not.toBeInTheDocument();
  });

  it("rejects an invalid email without starting payment", async () => {
    const user = userEvent.setup();
    ZustandStore.getState().addItem("p1", 1);
    renderCart();

    await screen.findByText("Blue Shirt");
    await user.type(screen.getByLabelText(/email for receipt/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /place order/i }));

    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    expect(initializePayment).not.toHaveBeenCalled();
  });

  it("blocks checkout when the cart is empty", async () => {
    const user = userEvent.setup();
    renderCart();

    await user.type(screen.getByLabelText(/email for receipt/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /place order/i }));

    expect(initializePayment).not.toHaveBeenCalled();
    expect(screen.getAllByText("Your cart is empty.").length).toBeGreaterThan(0);
  });

  it("verifies payment, clears the cart and shows the order ID on success", async () => {
    const user = userEvent.setup();
    vi.mocked(initializePayment).mockResolvedValue({
      access_code: "ac_123",
      reference: "ref_123",
    } as Awaited<ReturnType<typeof initializePayment>>);
    vi.mocked(verifyPayment).mockResolvedValue({
      success: true,
      reference: "ref_123",
    } as Awaited<ReturnType<typeof verifyPayment>>);

    ZustandStore.getState().addItem("p1", 1);
    renderCart();

    await screen.findByText("Blue Shirt");
    await user.type(screen.getByLabelText(/email for receipt/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /place order/i }));

    await waitFor(() => expect(verifyPayment).toHaveBeenCalledWith("ref_123"));
    await waitFor(() => expect(ZustandStore.getState().cart).toHaveLength(0));
    expect(screen.getByText(/Order ID:\s*ref_123/)).toBeInTheDocument();
  });

  it("shows an error and keeps the cart when payment verification fails", async () => {
    const user = userEvent.setup();
    vi.mocked(initializePayment).mockResolvedValue({
      access_code: "ac_123",
      reference: "ref_456",
    } as Awaited<ReturnType<typeof initializePayment>>);
    vi.mocked(verifyPayment).mockResolvedValue({
      success: false,
      reference: "ref_456" 
    } as Awaited<ReturnType<typeof verifyPayment>>);

    ZustandStore.getState().addItem("p1", 1);
    renderCart();

    await screen.findByText("Blue Shirt");
    await user.type(screen.getByLabelText(/email for receipt/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /place order/i }));

    expect(await screen.findByText(/couldn't confirm this payment/i)).toBeInTheDocument();
    expect(ZustandStore.getState().cart).toHaveLength(1);
  });
});
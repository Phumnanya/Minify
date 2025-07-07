import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  increaseItem: (productId: string) => void;
  decreaseItem: (productId: string) => void;
  totalItems: () => number;
}

export const ZustandStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addItem: (productId, quantity) => {
        const cart = get().cart;
        const existing = cart.find((item) => item.productId === productId);

        if (existing) {
          existing.quantity += quantity;
          set({ cart: [...cart] });
        } else {
          set({ cart: [...cart, { productId, quantity }] });
        }
      },

      removeItem: (productId) => {
        const cart = get().cart.filter((item) => item.productId !== productId);
        set({ cart });
      },

      increaseItem: (productId) => {
        const cart = get().cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        set({ cart });
      },

      decreaseItem: (productId) => {
        const cart = get().cart
          .map((item) =>
            item.productId === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);
        set({ cart });
      },
      totalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: "cart-storage",
    }
  )
);

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    console.log("ZustandStore disposed by HMR");
  });
}

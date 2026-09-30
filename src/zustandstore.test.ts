import { describe, it, expect, beforeEach } from "vitest";
import { ZustandStore } from "./ZustandStore";

describe("cart store", () => {
  beforeEach(() => {
    localStorage.clear();
    ZustandStore.setState({ cart: [] });
  });

  it("starts with an empty cart", () => {
    expect(ZustandStore.getState().cart).toEqual([]);
    expect(ZustandStore.getState().totalItems()).toBe(0);
  });

  it("adds a new item to the cart", () => {
    ZustandStore.getState().addItem("p1", 2);
    expect(ZustandStore.getState().cart).toEqual([
      { productId: "p1", quantity: 2 },
    ]);
  });

  it("increases quantity instead of duplicating when the same item is added again", () => {
    ZustandStore.getState().addItem("p1", 1);
    ZustandStore.getState().addItem("p1", 3);

    const { cart } = ZustandStore.getState();
    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(4);
  });

  it("removes an item from the cart", () => {
    ZustandStore.getState().addItem("p1", 1);
    ZustandStore.getState().addItem("p2", 1);
    ZustandStore.getState().removeItem("p1");

    const { cart } = ZustandStore.getState();
    expect(cart).toHaveLength(1);
    expect(cart[0].productId).toBe("p2");
  });

  it("increases an item's quantity by one", () => {
    ZustandStore.getState().addItem("p1", 1);
    ZustandStore.getState().increaseItem("p1");
    expect(ZustandStore.getState().cart[0].quantity).toBe(2);
  });

  it("decreases an item's quantity by one", () => {
    ZustandStore.getState().addItem("p1", 3);
    ZustandStore.getState().decreaseItem("p1");
    expect(ZustandStore.getState().cart[0].quantity).toBe(2);
  });

  it("does not let quantity drop below 1 when decreasing", () => {
    ZustandStore.getState().addItem("p1", 1);
    ZustandStore.getState().decreaseItem("p1");
    expect(ZustandStore.getState().cart[0].quantity).toBe(1);
  });

  it("calculates total items across all products", () => {
    ZustandStore.getState().addItem("p1", 2);
    ZustandStore.getState().addItem("p2", 3);
    expect(ZustandStore.getState().totalItems()).toBe(5);
  });

  it("clears the cart", () => {
    ZustandStore.getState().addItem("p1", 2);
    ZustandStore.getState().clearCart();
    expect(ZustandStore.getState().cart).toEqual([]);
  });
});
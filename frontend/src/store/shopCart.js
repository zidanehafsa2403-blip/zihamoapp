import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useShopCart = create(
  persist(
    (set, get) => ({
      items: [],
      add: (product, qty = 1) => {
        const existing = get().items.find((i) => i.id === product.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...product, quantity: qty }] });
        }
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      setQty: (id, quantity) =>
        set({
          items: get().items
            .map((i) => (i.id === id ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        }),
      clear: () => set({ items: [] }),
    }),
    { name: "zihamo-shop-cart" }
  )
);

export const cartCount = (items) => items.reduce((n, i) => n + i.quantity, 0);
export const cartTotal = (items) => items.reduce((n, i) => n + i.quantity * i.price, 0);
export const mrpOf = (price) => Math.round((price * 1.3) / 10) * 10;
export const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

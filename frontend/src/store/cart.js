import { create } from "zustand";

export const useCart = create((set, get) => ({
  items: [],
  open: false,
  setOpen: (open) => set({ open }),
  add: (product) => {
    const existing = get().items.find((i) => i.id === product.id);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...get().items, { ...product, quantity: 1 }] });
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
  count: () => get().items.reduce((n, i) => n + i.quantity, 0),
}));

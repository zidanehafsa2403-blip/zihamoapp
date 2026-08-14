import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useShopCart, cartTotal, inr, mrpOf } from "../store/shopCart";
import { ShopHeader } from "./ShopHeader";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, setQty, remove } = useShopCart();
  const total = cartTotal(items);
  const mrpTotal = items.reduce((n, i) => n + i.quantity * mrpOf(i.price), 0);

  return (
    <div data-testid="shop-cart-page" className="min-h-screen bg-[#F9F8F6] pb-36">
      <ShopHeader back="/" title="Cart" />

      <div className="mx-auto max-w-3xl px-4 md:px-8">
        {items.length === 0 ? (
          <div data-testid="cart-empty" className="py-28 text-center">
            <p className="font-serif-z text-3xl font-light text-[#153328]">Your cart is empty.</p>
            <Link
              to="/"
              data-testid="cart-empty-shop-link"
              className="mt-6 inline-block rounded-xl bg-[#153328] px-6 py-3.5 text-sm uppercase tracking-[0.12em] text-[#F9F8F6]"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-4 space-y-3">
              <AnimatePresence>
                {items.map((i) => (
                  <motion.div
                    key={i.id}
                    layout
                    exit={{ opacity: 0, x: -40 }}
                    data-testid={`cart-item-${i.id}`}
                    className="flex gap-3.5 rounded-2xl bg-white p-3 ring-1 ring-black/5"
                  >
                    <Link to={`/p/${i.id}`} className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F9F8F6]">
                      <img src={i.image} alt={i.name} className="h-full w-full object-contain p-1.5" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                      <div>
                        <p className="truncate text-sm font-medium text-[#1A1A1A]">{i.name}</p>
                        <p className="truncate text-xs text-[#4A4A4A]/70">{i.sku}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-full ring-1 ring-black/10">
                          <button
                            data-testid={`cart-minus-${i.id}`}
                            onClick={() => setQty(i.id, i.quantity - 1)}
                            aria-label="Decrease"
                            className="p-2 text-[#153328] active:scale-90"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </button>
                          <span data-testid={`cart-qty-${i.id}`} className="min-w-[2ch] text-center text-xs font-semibold">{i.quantity}</span>
                          <button
                            data-testid={`cart-plus-${i.id}`}
                            onClick={() => setQty(i.id, i.quantity + 1)}
                            aria-label="Increase"
                            className="p-2 text-[#153328] active:scale-90"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-[#153328]">{inr(i.price * i.quantity)}</p>
                      </div>
                    </div>
                    <button
                      data-testid={`cart-remove-${i.id}`}
                      onClick={() => remove(i.id)}
                      aria-label={`Remove ${i.name}`}
                      className="self-start p-1.5 text-[#4A4A4A]/50 hover:text-[#A34C37]"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div data-testid="price-details" className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-black/5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4A4A4A]/70">Price details</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between text-[#4A4A4A]">
                  <span>Total MRP</span><span>{inr(mrpTotal)}</span>
                </div>
                <div className="flex justify-between text-[#4A4A4A]">
                  <span>Discount</span><span className="text-[#2E7D5B]">− {inr(mrpTotal - total)}</span>
                </div>
                <div className="flex justify-between text-[#4A4A4A]">
                  <span>Delivery</span><span className="text-[#2E7D5B]">Free</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-black/5 pt-3 text-base font-semibold text-[#153328]">
                  <span>Total</span><span data-testid="cart-total">{inr(total)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/5 bg-[#F9F8F6]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div>
              <p className="text-xs text-[#4A4A4A]/70">Total</p>
              <p className="text-lg font-semibold text-[#153328]">{inr(total)}</p>
            </div>
            <motion.button
              data-testid="proceed-to-checkout"
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/checkout")}
              className="rounded-xl bg-[#153328] px-8 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#F9F8F6] hover:bg-[#0F1C18]"
            >
              Checkout
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

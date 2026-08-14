import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { useShopCart, inr, mrpOf } from "../store/shopCart";
import { ShopHeader } from "./ShopHeader";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const p = PRODUCTS.find((x) => x.id === id);
  const add = useShopCart((s) => s.add);
  const inCart = useShopCart((s) => s.items.some((i) => i.id === id));
  const [qty, setQty] = useState(1);

  if (!p) return null;
  const mrp = mrpOf(p.price);
  const off = Math.round((1 - p.price / mrp) * 100);
  const catName = CATEGORIES.find((c) => c.id === p.category)?.name;
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 6);

  const onAdd = () => {
    add(p, qty);
    toast.success(`${p.name} added to cart`);
  };

  return (
    <div data-testid="shop-product-page" className="min-h-screen bg-[#F9F8F6] pb-32">
      <ShopHeader back="/" title="" />

      <div className="mx-auto max-w-6xl px-4 md:grid md:grid-cols-2 md:gap-10 md:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 aspect-square overflow-hidden rounded-2xl bg-white ring-1 ring-black/5"
        >
          <img src={p.image} alt={p.name} className="h-full w-full object-contain p-8" />
        </motion.div>

        <div className="mt-5 md:mt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#A34C37]">{catName}</p>
          <h1 data-testid="product-title" className="mt-1.5 font-serif-z text-3xl font-light text-[#153328] md:text-4xl">
            {p.name}
          </h1>
          <p className="mt-1.5 text-sm text-[#4A4A4A]">{p.note}</p>

          <div className="mt-5 flex items-baseline gap-2.5">
            <span data-testid="product-price" className="text-2xl font-semibold text-[#153328]">{inr(p.price)}</span>
            <span className="text-base text-[#4A4A4A]/60 line-through">{inr(mrp)}</span>
            <span className="text-sm font-medium text-[#A34C37]">{off}% off</span>
          </div>
          <p className="mt-1 text-xs text-[#4A4A4A]/70">Inclusive of custom branding · Bulk pricing on request</p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full bg-white ring-1 ring-black/10">
              <button
                data-testid="qty-minus"
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
                className="p-3 text-[#153328] active:scale-90"
              >
                <Minus className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <span data-testid="qty-value" className="min-w-[2ch] text-center text-sm font-semibold text-[#153328]">{qty}</span>
              <button
                data-testid="qty-plus"
                onClick={() => setQty(qty + 1)}
                aria-label="Increase quantity"
                className="p-3 text-[#153328] active:scale-90"
              >
                <Plus className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <motion.button
              data-testid="product-add-to-cart"
              whileTap={{ scale: 0.96 }}
              onClick={onAdd}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#153328] py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#F9F8F6] hover:bg-[#0F1C18]"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.75} /> Add to cart
            </motion.button>
            {inCart && (
              <motion.button
                data-testid="product-go-to-cart"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate("/cart")}
                className="flex items-center gap-2 rounded-xl px-5 text-sm font-medium uppercase tracking-[0.12em] text-[#153328] ring-1 ring-[#153328]"
              >
                <Check className="h-4 w-4" strokeWidth={2} /> Go to cart
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-12 max-w-6xl px-4 md:px-8">
          <h2 className="font-serif-z text-2xl font-light text-[#153328]">You may also like</h2>
          <div className="scrollbar-none -mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/p/${r.id}`}
                data-testid={`related-${r.id}`}
                className="w-36 shrink-0"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-white ring-1 ring-black/5">
                  <img src={r.image} alt={r.name} loading="lazy" className="h-full w-full object-contain p-3" />
                </div>
                <p className="mt-1.5 truncate text-xs font-medium text-[#1A1A1A]">{r.name}</p>
                <p className="text-xs font-semibold text-[#153328]">{inr(r.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

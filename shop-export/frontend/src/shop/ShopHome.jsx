import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { useShopCart, inr, mrpOf } from "../store/shopCart";
import { ShopHeader } from "./ShopHeader";
import { CartBar } from "./CartBar";

const CHIPS = [{ id: "all", name: "All" }, ...CATEGORIES.map((c) => ({ id: c.id, name: c.name }))];

const Card = ({ p, i }) => {
  const add = useShopCart((s) => s.add);
  const mrp = mrpOf(p.price);
  const off = Math.round((1 - p.price / mrp) * 100);

  const onAdd = (e) => {
    e.preventDefault();
    add(p);
    toast.success(`${p.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(i, 8) * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/p/${p.id}`} data-testid={`shop-product-${p.id}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white ring-1 ring-black/5">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <motion.button
            data-testid={`shop-add-${p.id}`}
            onClick={onAdd}
            whileTap={{ scale: 0.8 }}
            aria-label={`Add ${p.name} to cart`}
            className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#153328] text-[#F9F8F6] shadow-lg transition-colors hover:bg-[#0F1C18]"
          >
            <Plus className="h-[18px] w-[18px]" strokeWidth={2} />
          </motion.button>
        </div>
        <div className="mt-2.5 px-0.5">
          <h3 className="truncate text-sm font-medium text-[#1A1A1A]">{p.name}</h3>
          <p className="truncate text-xs text-[#4A4A4A]/80">{p.note}</p>
          <p className="mt-1 flex items-baseline gap-1.5 text-sm">
            <span className="font-semibold text-[#153328]">{inr(p.price)}</span>
            <span className="text-xs text-[#4A4A4A]/60 line-through">{inr(mrp)}</span>
            <span className="text-xs font-medium text-[#A34C37]">{off}% off</span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default function ShopHome() {
  const [chip, setChip] = useState("all");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const list = PRODUCTS.filter(
    (p) =>
      (chip === "all" || p.category === chip) &&
      (!q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))
  );

  return (
    <div data-testid="shop-home" className="min-h-screen bg-[#F9F8F6] pb-28">
      <ShopHeader />

      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 ring-1 ring-black/5">
          <Search className="h-4 w-4 shrink-0 text-[#153328]/40" strokeWidth={1.75} />
          <input
            data-testid="shop-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gifts, SKU…"
            className="w-full bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#4A4A4A]/40 focus:outline-none"
          />
        </div>

        <div className="scrollbar-none -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
          {CHIPS.map((c) => (
            <button
              key={c.id}
              data-testid={`shop-chip-${c.id}`}
              onClick={() => setChip(c.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-colors ${
                chip === c.id
                  ? "bg-[#153328] text-[#F9F8F6]"
                  : "bg-white text-[#153328] ring-1 ring-black/10"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div data-testid="shop-empty" className="py-24 text-center">
            <p className="font-serif-z text-2xl text-[#153328]">Nothing found.</p>
            <p className="mt-2 text-sm text-[#4A4A4A]">Try another name or SKU.</p>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
            {list.map((p, i) => (
              <Card key={p.id} p={p} i={i} />
            ))}
          </div>
        )}
      </div>

      <CartBar />
    </div>
  );
}

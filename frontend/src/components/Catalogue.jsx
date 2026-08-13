import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Search, X } from "lucide-react";
import { toast } from "sonner";
import { Reveal, Overline } from "./Motion";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { useCart } from "../store/cart";

const FILTERS = [{ id: "all", name: "All" }, ...CATEGORIES.map((c) => ({ id: c.id, name: c.name }))];

const ProductCard = ({ p, i }) => {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add({ id: p.id, name: p.name, category: p.category });
    setAdded(true);
    toast.success(`${p.name} added to enquiry`);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Reveal delay={(i % 4) * 0.06}>
      <div data-testid={`product-${p.id}`} className="group">
        <div className="relative aspect-[4/5] overflow-hidden bg-white">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-contain p-6 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <button
            data-testid={`add-${p.id}`}
            onClick={onAdd}
            aria-label={`Add ${p.name} to enquiry`}
            className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center gap-2 bg-[#153328] py-4 text-sm uppercase tracking-[0.15em] text-[#F9F8F6] transition-transform duration-300 ease-out group-hover:translate-y-0"
          >
            {added ? <Check className="h-4 w-4" strokeWidth={2} /> : <Plus className="h-4 w-4" strokeWidth={1.5} />}
            {added ? "Added" : "Add to enquiry"}
          </button>
        </div>
        <div className="mt-4 flex items-baseline justify-between">
          <div>
            <h3 className="font-serif-z text-xl font-light text-[#153328]">{p.name}</h3>
            <p className="mt-0.5 text-sm text-[#4A4A4A]">{p.note}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export const Catalogue = () => {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const list = PRODUCTS.filter(
    (p) =>
      (filter === "all" || p.category === filter) &&
      (!q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.note.toLowerCase().includes(q))
  );

  return (
    <section id="catalogue" data-testid="catalogue" className="bg-[#EAE7E1]/50 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="mb-12">
          <Overline>The Catalogue</Overline>
          <h2 className="mt-6 font-serif-z text-5xl font-light leading-[1.05] tracking-tight text-[#153328] md:text-7xl">
            Build your request.
          </h2>
        </Reveal>

        <div className="mb-8 flex items-center gap-3 border-b border-black/10 pb-5">
          <Search className="h-5 w-5 shrink-0 text-[#153328]/50" strokeWidth={1.5} />
          <input
            data-testid="catalogue-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or SKU — e.g. Parker, BOT101…"
            className="w-full bg-transparent font-serif-z text-xl font-light text-[#153328] placeholder:text-[#153328]/35 focus:outline-none md:text-2xl"
          />
          {query && (
            <button
              data-testid="catalogue-search-clear"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="shrink-0 p-1 text-[#153328]/50 transition-colors hover:text-[#153328]"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          )}
        </div>

        <div data-testid="filters" className="mb-14 flex flex-wrap items-center gap-3 border-b border-black/10 pb-5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              data-testid={`filter-${f.id}`}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 text-sm tracking-wide transition-colors duration-300 ${
                filter === f.id
                  ? "bg-[#153328] text-[#F9F8F6]"
                  : "text-[#153328] hover:bg-[#153328]/10"
              }`}
            >
              {f.name}
            </button>
          ))}
          <span data-testid="catalogue-count" className="ml-auto text-sm tracking-wide text-[#153328]/50">
            {list.length} {list.length === 1 ? "item" : "items"}
          </span>
        </div>

        {list.length === 0 && (
          <div data-testid="catalogue-empty" className="py-20 text-center">
            <p className="font-serif-z text-3xl font-light text-[#153328]">Nothing found for “{query}”.</p>
            <p className="mt-3 text-sm text-[#4A4A4A]">Try a product name or SKU code — or send us your brief directly.</p>
          </div>
        )}

        <motion.div layout className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProductCard key={p.id} p={p} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

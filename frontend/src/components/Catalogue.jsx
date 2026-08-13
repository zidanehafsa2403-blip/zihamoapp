import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check } from "lucide-react";
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
        <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE7E1]">
          <img
            src={p.image}
            alt={p.name}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
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
  const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <section id="catalogue" data-testid="catalogue" className="bg-[#EAE7E1]/50 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="mb-12">
          <Overline>The Catalogue</Overline>
          <h2 className="mt-6 font-serif-z text-5xl font-light leading-[1.05] tracking-tight text-[#153328] md:text-7xl">
            Build your request.
          </h2>
        </Reveal>

        <div data-testid="filters" className="mb-14 flex flex-wrap gap-3 border-y border-black/10 py-5">
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
        </div>

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

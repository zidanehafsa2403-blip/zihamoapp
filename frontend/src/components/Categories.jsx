import { Reveal, Overline } from "./Motion";
import { CATEGORIES } from "../data/products";
import { ArrowUpRight } from "lucide-react";

export const Categories = () => (
  <section id="categories" data-testid="categories" className="px-6 py-28 md:px-12 md:py-40">
    <div className="mx-auto max-w-[1600px]">
      <Reveal className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Overline>Six Houses</Overline>
          <h2 className="mt-6 max-w-2xl font-serif-z text-5xl font-light leading-[1.05] tracking-tight text-[#153328] md:text-7xl">
            Collections, considered.
          </h2>
        </div>
        <p className="max-w-sm text-base leading-relaxed text-[#4A4A4A]">
          Each house is edited for corporate healthcare programmes — premium, practical, and entirely non-medical.
        </p>
      </Reveal>

      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 0.08}>
            <a href="#catalogue" data-testid={`category-${c.id}`} className="group block">
              <div className={`relative overflow-hidden bg-[#EAE7E1] ${i % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/5] md:mt-12"}`}>
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F9F8F6] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4 text-[#153328]" strokeWidth={1.5} />
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-between border-t border-black/10 pt-4">
                <div>
                  <span className="font-serif-z text-2xl font-light text-[#153328]">{c.name}</span>
                  <p className="mt-1 text-sm text-[#4A4A4A]">{c.tagline}</p>
                </div>
                <span className="font-serif-z text-xl text-[#A34C37]">{c.index}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

import { Reveal, Overline } from "./Motion";

const CHAPTERS = [
  {
    n: "01",
    title: "A gift is a message",
    body: "Every parcel that reaches a physician, nurse or medical partner speaks on your behalf. We treat that responsibility as a craft — nothing generic, nothing forgettable.",
  },
  {
    n: "02",
    title: "Strictly non-medical",
    body: "We deliberately sit outside the clinical. Our catalogue is objects of daily life — the pen, the flask, the candle — chosen to feel personal, compliant and genuinely useful.",
  },
  {
    n: "03",
    title: "Curated, not catalogued",
    body: "Thousands of products exist. We show a tight, edited house of pieces that survive our test for material, provenance and quiet good taste.",
  },
  {
    n: "04",
    title: "Built for scale",
    body: "From ten hampers to ten thousand, requests are handled with the same precision. You enquire; we quote, personalise and deliver across your programme.",
  },
];

export const Manifesto = () => (
  <section id="manifesto" data-testid="manifesto" className="relative bg-[#0F1C18] px-6 py-28 text-[#F9F8F6] md:px-12 md:py-40">
    <div className="mx-auto max-w-[1400px]">
      <Reveal>
        <Overline className="text-[#D5CDBF]">The Ethos</Overline>
        <h2 className="mt-6 max-w-3xl font-serif-z text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
          Four principles behind every ZIHAMO gift.
        </h2>
      </Reveal>

      <div className="mt-20 grid gap-px md:grid-cols-2">
        {CHAPTERS.map((c, i) => (
          <Reveal key={c.n} delay={(i % 2) * 0.1}>
            <div className="border-t border-[#F9F8F6]/20 py-10 pr-4 md:pr-16">
              <span className="font-serif-z text-6xl font-light text-[#D5CDBF]">{c.n}</span>
              <h3 className="mt-6 font-serif-z text-3xl font-light md:text-4xl">{c.title}</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[#A3A3A3]">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

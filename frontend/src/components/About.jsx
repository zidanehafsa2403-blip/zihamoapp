import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, Overline } from "./Motion";

const STATS = [
  { k: "6", v: "Curated houses" },
  { k: "500+", v: "Vetted pieces" },
  { k: "48h", v: "Quote turnaround" },
  { k: "PAN", v: "India fulfilment" },
];

export const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" data-testid="about" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1600px] items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <Overline>The Studio</Overline>
          <h2 className="mt-6 font-serif-z text-5xl font-light leading-[1.08] tracking-tight text-[#153328] md:text-6xl">
            A gifting partner for the pharmaceutical world.
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#4A4A4A]">
            ZIHAMO exists to help pharmaceutical brands express gratitude to the healthcare professionals
            who matter most — without ever crossing into the clinical. We source, curate and deliver
            non-medical gifts that feel personal at any scale.
          </p>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-[#4A4A4A]">
            Corporate clients browse the catalogue, assemble a request, and receive a tailored quote with
            personalisation, branding and logistics handled end to end.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-px border-t border-black/10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.v} className="border-r border-black/10 py-6 pr-4 last:border-r-0">
                <div className="font-serif-z text-4xl font-light text-[#153328]">{s.k}</div>
                <div className="mt-1 text-sm text-[#4A4A4A]">{s.v}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="relative h-[520px] overflow-hidden bg-[#EAE7E1] lg:h-[640px]">
          <motion.img
            style={{ y }}
            src="https://images.unsplash.com/photo-1637412816281-f80ec9948fea?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
            alt="ZIHAMO studio"
            className="absolute inset-0 h-[120%] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

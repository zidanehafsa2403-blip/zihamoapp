import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { MaskLine, Overline } from "./Motion";
import { HERO_IMAGE } from "../data/products";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} id="top" data-testid="hero" className="relative min-h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 z-0">
        <img src={HERO_IMAGE} alt="ZIHAMO premium corporate gifting" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1C18]/92 via-[#0F1C18]/45 to-[#0F1C18]/55" />
        <div className="absolute inset-0 bg-[#0F1C18]/20" />
      </motion.div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-6 pb-14 pt-36 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="flex items-center justify-between"
        >
          <Overline className="text-[#D5CDBF]">Corporate Gifting · Est. Healthcare</Overline>
          <Overline className="hidden text-[#D5CDBF] md:block">Non-Medical · Curated</Overline>
        </motion.div>

        <div className="max-w-[1400px]">
          <div className="mb-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Overline className="text-[#D5CDBF]">Gifts worthy of the people who care</Overline>
            </motion.div>
          </div>

          <h1 className="font-serif-z font-light text-[#F9F8F6] tracking-tight text-[15vw] leading-[0.92] md:text-[11vw] lg:text-[9.5rem]">
            <MaskLine delay={0.5}>Considered</MaskLine>
            <MaskLine delay={0.62} className="italic pl-[0.15em] text-[#D5CDBF]">gifting</MaskLine>
            <MaskLine delay={0.74}>for pharma.</MaskLine>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-base leading-relaxed text-[#EAE7E1]/90">
              A curated house of non-medical gifts for healthcare professionals — stationery, wellness,
              nourishment and refined desk companions. Browse, build a request, and we handle the rest.
            </p>
            <a
              href="#catalogue"
              data-testid="hero-cta"
              className="group inline-flex items-center gap-4 self-start border border-[#F9F8F6]/40 px-7 py-4 text-[#F9F8F6] transition-colors duration-300 hover:border-[#F9F8F6] hover:bg-[#F9F8F6] hover:text-[#153328]"
            >
              <span className="text-sm uppercase tracking-[0.15em]">Explore the catalogue</span>
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" strokeWidth={1.5} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

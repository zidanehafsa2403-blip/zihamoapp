import { useEffect } from "react";
import { motion } from "framer-motion";
import { COMPANY } from "../data/products";

const LETTERS = "ZIHAMO".split("");

export const Splash = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
  <motion.div
    data-testid="shop-splash"
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#153328]"
    exit={{ y: "-100%" }}
    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
  >
    <motion.img
      src={COMPANY.logo}
      alt="ZIHAMO"
      className="h-20 w-20 rounded-full ring-2 ring-[#F9F8F6]/20"
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
    />
    <div className="mt-6 flex overflow-hidden">
      {LETTERS.map((l, i) => (
        <motion.span
          key={i}
          className="font-serif-z text-4xl font-light tracking-[0.2em] text-[#F9F8F6]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {l}
        </motion.span>
      ))}
    </div>
    <motion.p
      className="mt-3 text-xs uppercase tracking-[0.3em] text-[#F9F8F6]/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      The Gifting Studio
    </motion.p>
  </motion.div>
  );
};

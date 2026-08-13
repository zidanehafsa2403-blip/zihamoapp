import { motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

export const MaskLine = ({ children, delay = 0, className = "" }) => (
  <span className="line-mask">
    <motion.span
      className={`block ${className}`}
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.span>
  </span>
);

export const Reveal = ({ children, delay = 0, y = 24, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

export const Overline = ({ children, className = "" }) => (
  <span className={`text-xs uppercase tracking-[0.25em] text-[#4A4A4A] ${className}`}>
    {children}
  </span>
);

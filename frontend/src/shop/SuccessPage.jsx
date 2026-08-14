import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import confetti from "canvas-confetti";
import { inr } from "../store/shopCart";

export default function SuccessPage() {
  const { state } = useLocation();
  const orderNo = state?.orderNo || "ZH——";

  useEffect(() => {
    const colors = ["#153328", "#A34C37", "#D5CDBF", "#F9F8F6"];
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.35 }, colors });
    const t = setTimeout(
      () => confetti({ particleCount: 60, spread: 100, origin: { y: 0.5 }, colors }),
      450
    );
    return () => clearTimeout(t);
  }, []);

  return (
    <div data-testid="shop-success-page" className="flex min-h-screen flex-col items-center justify-center bg-[#F9F8F6] px-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-[#153328]"
      >
        <Check className="h-9 w-9 text-[#F9F8F6]" strokeWidth={2.5} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 font-serif-z text-4xl font-light text-[#153328]"
      >
        Order placed{state?.name ? `, ${state.name.split(" ")[0]}` : ""}.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-3 text-sm text-[#4A4A4A]"
      >
        Order <span data-testid="success-order-no" className="font-semibold text-[#153328]">{orderNo}</span>
        {state?.total ? <> · {inr(state.total)}</> : null}
        <br />Our team will call to confirm branding, pricing & delivery.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <Link
          to="/shop"
          data-testid="continue-shopping"
          className="mt-8 inline-block rounded-xl bg-[#153328] px-8 py-4 text-sm uppercase tracking-[0.12em] text-[#F9F8F6]"
        >
          Continue shopping
        </Link>
      </motion.div>
    </div>
  );
}

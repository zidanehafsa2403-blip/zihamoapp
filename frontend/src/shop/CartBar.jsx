import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useShopCart, cartCount, cartTotal, inr } from "../store/shopCart";

export const CartBar = () => {
  const items = useShopCart((s) => s.items);
  const count = cartCount(items);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-xl"
        >
          <Link
            to="/shop/cart"
            data-testid="floating-cart-bar"
            className="flex items-center justify-between rounded-2xl bg-[#153328] px-5 py-4 text-[#F9F8F6] shadow-[0_12px_40px_rgba(21,51,40,0.4)]"
          >
            <span className="text-sm">
              <span className="font-semibold">{count} {count === 1 ? "item" : "items"}</span>
              <span className="mx-2 opacity-40">·</span>
              <span className="font-semibold">{inr(cartTotal(items))}</span>
            </span>
            <span className="flex items-center gap-1.5 text-sm uppercase tracking-[0.12em]">
              View Cart <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

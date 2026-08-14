import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { COMPANY } from "../data/products";
import { useShopCart, cartCount } from "../store/shopCart";

export const ShopHeader = ({ back, title }) => {
  const navigate = useNavigate();
  const count = useShopCart((s) => cartCount(s.items));

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#F9F8F6]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          {back ? (
            <button
              data-testid="shop-back-button"
              onClick={() => navigate(back)}
              aria-label="Go back"
              className="-ml-1 p-1.5 text-[#153328] transition-transform active:scale-90"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={1.75} />
            </button>
          ) : (
            <Link to="/" data-testid="shop-to-site" className="flex items-center gap-2.5">
              <img src={COMPANY.logo} alt="ZIHAMO" className="h-8 w-8 rounded-full ring-1 ring-black/5" />
            </Link>
          )}
          {title ? (
            <span className="font-serif-z text-2xl font-light text-[#153328]">{title}</span>
          ) : (
            <Link to="/shop" className="font-serif-z text-2xl tracking-tight text-[#153328]">
              ZIHAMO<span className="text-[#A34C37]"> Shop</span>
            </Link>
          )}
        </div>
        <Link
          to="/shop/cart"
          data-testid="shop-cart-link"
          aria-label="Open cart"
          className="relative p-2 text-[#153328]"
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 1.6 }}
              animate={{ scale: 1 }}
              data-testid="shop-cart-count"
              className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[#A34C37] px-1 text-[10px] font-semibold leading-[18px] text-white"
            >
              {count}
            </motion.span>
          )}
        </Link>
      </div>
    </header>
  );
};

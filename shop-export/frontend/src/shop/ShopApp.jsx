import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { Splash } from "./Splash";
import ShopHome from "./ShopHome";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import SuccessPage from "./SuccessPage";

export default function ShopApp() {
  const location = useLocation();
  const [splash, setSplash] = useState(() => !sessionStorage.getItem("zihamo-splash"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const dismiss = () => {
    sessionStorage.setItem("zihamo-splash", "1");
    setSplash(false);
  };

  return (
    <>
      <AnimatePresence>{splash && <Splash key="splash" onDone={dismiss} />}</AnimatePresence>
      <Routes>
        <Route index element={<ShopHome />} />
        <Route path="p/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="success" element={<SuccessPage />} />
      </Routes>
      <Toaster position="top-center" theme="dark" />
    </>
  );
}

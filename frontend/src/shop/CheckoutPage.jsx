import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useShopCart, cartTotal, inr } from "../store/shopCart";
import { ShopHeader } from "./ShopHeader";

const API = process.env.REACT_APP_BACKEND_URL;

const Field = ({ label, testid, optional, ...props }) => (
  <label className="block">
    <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#4A4A4A]/80">
      {label} {optional && <em className="normal-case opacity-60">(optional)</em>}
    </span>
    <input
      data-testid={testid}
      required={!optional}
      {...props}
      className="mt-1.5 w-full rounded-xl bg-white px-4 py-3.5 text-sm text-[#1A1A1A] ring-1 ring-black/10 placeholder:text-[#4A4A4A]/35 focus:outline-none focus:ring-2 focus:ring-[#153328]"
    />
  </label>
);

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clear } = useShopCart();
  const total = cartTotal(items);
  const [sending, setSending] = useState(false);
  const [f, setF] = useState({
    name: "", phone: "", email: "", company: "", gstin: "", address: "", city: "", pincode: "",
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSending(true);
    try {
      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...f,
          items: items.map((i) => ({
            id: i.id, sku: i.sku, name: i.name, category: i.category, quantity: i.quantity, price: i.price,
          })),
          subtotal: total,
          total,
        }),
      });
      if (!res.ok) throw new Error("failed");
      const order = await res.json();
      clear();
      navigate("/shop/success", { state: { orderNo: order.order_no, name: f.name, total } });
    } catch {
      toast.error("Could not place the order. Please try again.");
      setSending(false);
    }
  };

  return (
    <div data-testid="shop-checkout-page" className="min-h-screen bg-[#F9F8F6] pb-16">
      <ShopHeader back="/shop/cart" title="Checkout" />

      <form onSubmit={submit} className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="mt-5 rounded-2xl bg-white p-5 ring-1 ring-black/5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4A4A4A]/70">Contact</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" testid="checkout-name" value={f.name} onChange={set("name")} placeholder="Aarav Shah" />
            <Field label="Phone" testid="checkout-phone" type="tel" value={f.phone} onChange={set("phone")} placeholder="+91 98…" />
            <Field label="Email" testid="checkout-email" type="email" value={f.email} onChange={set("email")} placeholder="you@company.com" />
            <Field label="Company" testid="checkout-company" value={f.company} onChange={set("company")} placeholder="Company Pvt Ltd" />
            <Field label="GST number" testid="checkout-gstin" optional value={f.gstin} onChange={set("gstin")} placeholder="24XXXXX0000X1Z5" />
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-5 ring-1 ring-black/5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4A4A4A]/70">Delivery address</p>
          <div className="mt-4 grid gap-4">
            <Field label="Address" testid="checkout-address" value={f.address} onChange={set("address")} placeholder="Flat / building, street, area" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="City" testid="checkout-city" value={f.city} onChange={set("city")} placeholder="Ahmedabad" />
              <Field label="Pincode" testid="checkout-pincode" value={f.pincode} onChange={set("pincode")} placeholder="380015" inputMode="numeric" pattern="[0-9]{6}" title="6-digit pincode" />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-5 ring-1 ring-black/5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4A4A4A]/70">
            Order summary · {items.reduce((n, i) => n + i.quantity, 0)} items
          </p>
          <div className="mt-3 space-y-1.5 text-sm text-[#4A4A4A]">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between gap-4">
                <span className="truncate">{i.name} × {i.quantity}</span>
                <span className="shrink-0">{inr(i.price * i.quantity)}</span>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t border-black/5 pt-3 text-base font-semibold text-[#153328]">
              <span>Total</span><span>{inr(total)}</span>
            </div>
          </div>
        </div>

        <motion.button
          data-testid="place-order-button"
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={sending || items.length === 0}
          className="mt-6 w-full rounded-xl bg-[#153328] py-[18px] text-sm font-medium uppercase tracking-[0.15em] text-[#F9F8F6] hover:bg-[#0F1C18] disabled:opacity-50"
        >
          {sending ? "Placing order…" : `Place order · ${inr(total)}`}
        </motion.button>
        <p className="mt-3 pb-4 text-center text-xs text-[#4A4A4A]/60">
          No payment now — our team confirms pricing & delivery on call.
        </p>
      </form>
    </div>
  );
}

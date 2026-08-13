import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useCart } from "../store/cart";
import { COMPANY } from "../data/products";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Field = ({ label, testid, ...props }) => (
  <label className="block">
    <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#4A4A4A]">{label}</span>
    <input
      data-testid={testid}
      {...props}
      className="w-full border border-black/15 bg-[#F9F8F6] px-4 py-3 text-sm text-[#1A1A1A] outline-none transition-colors duration-200 placeholder:text-[#A3A3A3] focus:border-[#153328]"
    />
  </label>
);

export const CartSheet = () => {
  const { items, open, setOpen, remove, setQty, clear } = useCart();
  const [step, setStep] = useState("cart");
  const [form, setForm] = useState({ company: "", contact_name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.company || !form.contact_name || !form.email) {
      toast.error("Please complete company, name and email.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/enquiries`, {
        ...form,
        items: items.map((i) => ({ id: i.id, name: i.name, category: i.category, quantity: i.quantity })),
      });
      toast.success("Enquiry submitted — our team will be in touch shortly.");
      clear();
      setForm({ company: "", contact_name: "", email: "", phone: "", message: "" });
      setStep("cart");
      setOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            data-testid="cart-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-[#0F1C18]/40 backdrop-blur-sm"
          />
          <motion.aside
            data-testid="cart-sheet"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[#F9F8F6]"
          >
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <span className="font-serif-z text-2xl font-light text-[#153328]">
                {step === "cart" ? "Your Enquiry" : "Company Details"}
              </span>
              <button data-testid="close-cart-button" onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-5 w-5 text-[#153328]" strokeWidth={1.5} />
              </button>
            </div>

            {step === "cart" ? (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.length === 0 ? (
                    <p data-testid="cart-empty" className="mt-16 text-center text-[#4A4A4A]">
                      Your enquiry list is empty. Add pieces from the catalogue.
                    </p>
                  ) : (
                    <ul className="divide-y divide-black/10">
                      {items.map((i) => (
                        <li key={i.id} data-testid={`cart-item-${i.id}`} className="flex items-center justify-between py-4">
                          <div>
                            <p className="font-serif-z text-lg font-light text-[#153328]">{i.name}</p>
                            <p className="text-xs uppercase tracking-wide text-[#4A4A4A]">{i.category.replace("-", " ")}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-black/15">
                              <button data-testid={`dec-${i.id}`} onClick={() => setQty(i.id, i.quantity - 1)} className="px-2 py-1.5">
                                <Minus className="h-3 w-3" strokeWidth={1.5} />
                              </button>
                              <span className="w-8 text-center text-sm">{i.quantity}</span>
                              <button data-testid={`inc-${i.id}`} onClick={() => setQty(i.id, i.quantity + 1)} className="px-2 py-1.5">
                                <Plus className="h-3 w-3" strokeWidth={1.5} />
                              </button>
                            </div>
                            <button data-testid={`remove-${i.id}`} onClick={() => remove(i.id)} aria-label="Remove">
                              <Trash2 className="h-4 w-4 text-[#A34C37]" strokeWidth={1.5} />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="border-t border-black/10 p-6">
                  <button
                    data-testid="proceed-button"
                    disabled={items.length === 0}
                    onClick={() => setStep("form")}
                    className="group flex w-full items-center justify-center gap-3 bg-[#153328] py-4 text-sm uppercase tracking-[0.15em] text-[#F9F8F6] transition-opacity duration-300 disabled:opacity-40"
                  >
                    Continue to details
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={submit} className="flex flex-1 flex-col">
                <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
                  <Field label="Company / Organisation *" testid="input-company" value={form.company} onChange={upd("company")} placeholder="Acme Pharmaceuticals" />
                  <Field label="Contact name *" testid="input-name" value={form.contact_name} onChange={upd("contact_name")} placeholder="Full name" />
                  <Field label="Work email *" testid="input-email" type="email" value={form.email} onChange={upd("email")} placeholder="you@company.com" />
                  <Field label="Phone" testid="input-phone" value={form.phone} onChange={upd("phone")} placeholder="Optional" />
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#4A4A4A]">Message</span>
                    <textarea
                      data-testid="input-message" value={form.message} onChange={upd("message")} rows={3}
                      placeholder="Quantities, personalisation, timelines…"
                      className="w-full resize-none border border-black/15 bg-[#F9F8F6] px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder:text-[#A3A3A3] focus:border-[#153328]"
                    />
                  </label>
                  <p className="text-sm text-[#4A4A4A]">{items.length} item{items.length !== 1 ? "s" : ""} in this enquiry.</p>
                  <p className="text-xs text-[#4A4A4A]">Prefer to talk? Call <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="text-[#153328] underline">{COMPANY.phone}</a> or email {COMPANY.email}.</p>
                </div>
                <div className="grid grid-cols-3 gap-3 border-t border-black/10 p-6">
                  <button type="button" data-testid="back-button" onClick={() => setStep("cart")} className="border border-[#153328] py-4 text-sm uppercase tracking-wide text-[#153328]">
                    Back
                  </button>
                  <button
                    type="submit" data-testid="submit-enquiry-button" disabled={submitting}
                    className="col-span-2 bg-[#153328] py-4 text-sm uppercase tracking-[0.15em] text-[#F9F8F6] transition-opacity disabled:opacity-50"
                  >
                    {submitting ? "Submitting…" : "Submit enquiry"}
                  </button>
                </div>
              </form>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

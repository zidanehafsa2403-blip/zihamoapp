import { Reveal } from "./Motion";
import { useCart } from "../store/cart";
import { COMPANY, CATEGORIES } from "../data/products";

export const Footer = () => {
  const setOpen = useCart((s) => s.setOpen);
  return (
    <footer id="contact" data-testid="footer" className="bg-[#0F1C18] px-6 pt-24 pb-10 text-[#F9F8F6] md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="flex flex-col justify-between gap-10 border-b border-[#F9F8F6]/15 pb-16 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-serif-z text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
              Let's build your next gifting programme.
            </h2>
            <button
              data-testid="footer-cta"
              onClick={() => setOpen(true)}
              className="self-start border border-[#F9F8F6]/40 px-8 py-4 text-sm uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-[#F9F8F6] hover:text-[#153328]"
            >
              Start an enquiry
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={COMPANY.logo} alt="ZIHAMO" className="h-11 w-11 rounded-full object-cover" />
              <span className="font-serif-z text-3xl">ZIHAMO<span className="text-[#A34C37]">.</span></span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-[#A3A3A3]">{COMPANY.tagline}. {COMPANY.about}.</p>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.15em] text-[#D5CDBF]">Collections</p>
            <ul className="space-y-2 text-sm text-[#A3A3A3]">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <a href="#catalogue" className="transition-colors duration-200 hover:text-[#F9F8F6]">{c.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.15em] text-[#D5CDBF]">Contact</p>
            <ul className="space-y-2 text-sm text-[#A3A3A3]">
              <li><a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} data-testid="footer-phone" className="hover:text-[#F9F8F6]">{COMPANY.phone}</a></li>
              <li><a href={`mailto:${COMPANY.email}`} data-testid="footer-email" className="hover:text-[#F9F8F6]">{COMPANY.email}</a></li>
              <li>{COMPANY.website}</li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.15em] text-[#D5CDBF]">Studio</p>
            <p className="text-sm leading-relaxed text-[#A3A3A3]">{COMPANY.address}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-[#F9F8F6]/15 pt-8 text-xs text-[#A3A3A3] md:flex-row">
          <span>© {new Date().getFullYear()} ZIHAMO. All rights reserved.</span>
          <span>Custom-branded merchandise · Delivered across India</span>
        </div>
      </div>
    </footer>
  );
};

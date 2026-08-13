import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../store/cart";

const LINKS = [
  { label: "Collections", href: "#categories" },
  { label: "Ethos", href: "#manifesto" },
  { label: "Catalogue", href: "#catalogue" },
  { label: "Studio", href: "#about" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const setOpen = useCart((s) => s.setOpen);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,padding] duration-500 ${
        scrolled
          ? "bg-[#F9F8F6]/80 backdrop-blur-xl border-b border-black/10 py-4"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 flex items-center justify-between">
        <a href="#top" data-testid="logo" className={`font-serif-z text-2xl tracking-tight ${scrolled ? "text-[#153328]" : "text-[#F9F8F6]"}`}>
          ZIHAMO<span className="text-[#A34C37]">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className={`group relative text-sm tracking-wide ${scrolled ? "text-[#1A1A1A]" : "text-[#F9F8F6]"}`}
            >
              {l.label}
              <span className={`absolute -bottom-1 left-0 h-px w-0 transition-[width] duration-300 group-hover:w-full ${scrolled ? "bg-[#153328]" : "bg-[#F9F8F6]"}`} />
            </a>
          ))}
        </nav>

        <button
          data-testid="open-cart-button"
          onClick={() => setOpen(true)}
          className={`group flex items-center gap-3 border px-5 py-2.5 text-sm transition-colors duration-300 ${
            scrolled
              ? "border-[#153328] text-[#153328] hover:bg-[#153328] hover:text-[#F9F8F6]"
              : "border-[#F9F8F6]/50 text-[#F9F8F6] hover:bg-[#F9F8F6] hover:text-[#153328]"
          }`}
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
          <span className="tracking-wide">Enquiry</span>
          <span
            data-testid="cart-count"
            className="min-w-5 rounded-full bg-[#A34C37] px-1.5 text-center text-xs leading-5 text-white"
          >
            {count}
          </span>
        </button>
      </div>
    </header>
  );
};

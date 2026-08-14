import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Ribbon } from "@/components/Ribbon";
import { Manifesto } from "@/components/Manifesto";
import { Categories } from "@/components/Categories";
import { Catalogue } from "@/components/Catalogue";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { CartSheet } from "@/components/CartSheet";
import { WhatsAppButton } from "@/components/WhatsAppButton";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -80 });
        }
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F9F8F6]">
      <div className="grain" />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Ribbon />
          <Categories />
          <Manifesto />
          <Catalogue />
          <About />
        </main>
        <Footer />
      </div>
      <CartSheet />
      <WhatsAppButton />
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;

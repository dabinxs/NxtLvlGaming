import React, { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks } from "../mock";
import LogoMark from "./LogoMark";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060a15]/85 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" aria-label="Next Level Gaming Events">
          <LogoMark />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-display text-[13px] font-medium tracking-[0.12em] text-white/75 transition-colors hover:text-white"
              style={{ fontWeight: 500 }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#footer"
            className="group hidden items-center gap-2 rounded-full blue-gradient-bg px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_6px_20px_rgba(0,102,253,0.35)] transition-transform hover:scale-[1.03] sm:flex"
          >
            GET A QUOTE
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            className="text-white lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-[#060a15]/95 px-6 py-5 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-sm tracking-[0.1em] text-white/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#footer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full blue-gradient-bg px-5 py-2.5 text-[13px] font-semibold text-white"
            >
              GET A QUOTE <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

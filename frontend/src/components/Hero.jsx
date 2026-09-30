import React, { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      el.style.setProperty("--glow", inside ? "1" : "0");
      if (inside) {
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#05070f]"
    >
      {/* white grid lines across the hero */}
      <div className="hero-grid pointer-events-none absolute inset-0 z-0" />

      {/* cursor-follow grid glow trail */}
      <div className="hero-grid-glow pointer-events-none absolute inset-0 z-0" />

      {/* subtle blue ambient glow (no purple) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FD]/12 blur-[140px]" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-5 text-center">
        <h1
          className="font-display text-[clamp(2.1rem,5vw,4.2rem)] font-extrabold uppercase leading-[1.06] tracking-tight text-white animate-rise"
          style={{ fontWeight: 800 }}
        >
          Transform Your Event
          <br />
          Into Reality
        </h1>

        <p
          className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/60 animate-rise"
          style={{ animationDelay: "0.1s" }}
        >
          Gaming, entertainment, and interactive experiences for unforgettable
          events.
        </p>

        <div
          className="mt-10 flex flex-col items-center gap-3 animate-rise sm:flex-row"
          style={{ animationDelay: "0.2s" }}
        >
          <a
            href="#footer"
            data-testid="hero-plan-cta"
            className="group inline-flex items-center gap-3 rounded-xl bg-[#0090FF] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_10px_34px_rgba(0,144,255,0.45)] transition-all duration-300 hover:bg-[#0aa0ff] hover:shadow-[0_14px_40px_rgba(0,144,255,0.6)]"
          >
            Plan Your Event
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#experience"
            data-testid="hero-explore-cta"
            className="group inline-flex items-center rounded-xl border-2 border-white px-8 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-all duration-300 hover:bg-white hover:text-[#05070f]"
          >
            Explore Explanation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React, { useEffect, useRef } from "react";
import { Play, ArrowRight } from "lucide-react";

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
            className="group inline-flex items-center gap-2.5 rounded-full blue-gradient-bg px-8 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-white shadow-[0_10px_30px_rgba(0,102,253,0.4)] transition-transform hover:scale-[1.04]"
          >
            <Play className="h-4 w-4 fill-white" />
            Plan Your Event
          </a>
          <a
            href="#experience"
            data-testid="hero-explore-cta"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:border-[#7DDDFF]/60 hover:bg-white/[0.06]"
          >
            Explore
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

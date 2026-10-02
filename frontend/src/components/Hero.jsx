import React from "react";
import { ChevronRight } from "lucide-react";
import TextScatter from "./TextScatter";

const Hero = () => {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#05070f]"
    >
      {/* Background Image from user */}
      <img
        src="/hero-bg.png"
        alt="Next Level Gaming Event background"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark overlay for contrast and seamless transition */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/50 to-[#05070f]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070f]/80 via-transparent to-[#05070f]/80" />

      {/* Subtle ambient blue glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FD]/15 blur-[140px]" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-5 text-center">
        <h1
          className="font-display text-[clamp(2.1rem,5vw,4.2rem)] font-extrabold uppercase leading-[1.06] tracking-tight text-white animate-rise drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
          style={{ fontWeight: 800 }}
        >
          <TextScatter text={"Transform Your Event\nInto Reality"} />
        </h1>

        <p
          className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/80 animate-rise drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
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
            className="group inline-flex h-[54px] items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-[#0066CC] px-8 text-[13px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_10px_34px_rgba(0,102,204,0.35)] transition-all duration-300 hover:bg-[#0077DD] hover:shadow-[0_14px_40px_rgba(0,102,204,0.5)]"
          >
            Plan Your Event
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#experience"
            data-testid="hero-explore-cta"
            className="group inline-flex h-[54px] items-center justify-center rounded-xl border-2 border-white/80 bg-black/20 backdrop-blur-sm px-8 text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-all duration-300 hover:bg-white hover:text-[#05070f]"
          >
            Explore Explanation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

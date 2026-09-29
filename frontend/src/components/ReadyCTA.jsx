import React from "react";
import { ArrowRight } from "lucide-react";

const ReadyCTA = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative flex min-h-[520px] items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1581502446078-63d6464ba4fc?auto=format&fit=crop&w=1600&q=80"
          alt="Dark event venue"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#05070f]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070f] via-transparent to-[#05070f]" />

        <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center">
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.4rem)] font-extrabold uppercase leading-[0.95] text-white" style={{ fontWeight: 800 }}>
            Ready To <span className="blue-gradient-text">Level Up</span>
            <br />
            Your Event?
          </h2>

          <a
            href="#footer"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full blue-gradient-bg px-8 py-4 text-[13px] font-semibold uppercase tracking-wide text-white shadow-[0_12px_40px_rgba(0,102,253,0.45)] transition-transform hover:scale-[1.04]"
          >
            Build Your Event
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReadyCTA;

import React from "react";
import { ArrowRight } from "lucide-react";

const LevelUp = () => {
  return (
    <section id="gaming-division" className="relative bg-[#05070f] py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-[#0066FD]/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1558008258-7ff8888b42b0?auto=format&fit=crop&w=1200&q=80"
              alt="Gaming division setup"
              className="h-[380px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FD]/25 to-transparent" />
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-white/30" />
            <span className="font-display text-[11px] font-medium uppercase tracking-[0.35em] text-white/50">
              The Gaming Division
            </span>
          </div>

          <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold uppercase leading-[0.95] text-white" style={{ fontWeight: 800 }}>
            Level Up The
            <br />
            <span className="blue-gradient-text">Experience</span>
          </h2>

          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/60">
            Next Level Gaming designs and produces gaming and interactive
            entertainment for every kind of event — university takeovers,
            corporate activations, esports tournaments and private parties.
            Giant screens, a game library and a full production crew, delivered
            turnkey.
          </p>

          <a
            href="/gaming-events"
            className="group mt-8 inline-flex items-center gap-2 font-display text-[13px] font-semibold uppercase tracking-[0.15em] text-white"
          >
            <span className="blue-gradient-text">Explore The Gaming Events</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0066FD]/50 transition-all group-hover:bg-[#0066FD]/20">
              <ArrowRight className="h-4 w-4 text-[#7DDDFF] transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LevelUp;

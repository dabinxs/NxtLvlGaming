import React from "react";
import { ArrowRight } from "lucide-react";

const WhoWeAre = () => {
  return (
    <section id="who-we-are" className="relative bg-[#05070f] py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-white/30" />
            <span className="font-display text-[11px] font-medium uppercase tracking-[0.35em] text-white/50">
              Who Are We
            </span>
          </div>

          <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold uppercase leading-[0.95] text-white" style={{ fontWeight: 800 }}>
            More Than Gaming. It's
            <br />
            An <span className="blue-gradient-text">Experience</span>
          </h2>

          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/60">
            For over a decade we've produced interactive entertainment that
            turns gatherings into stories — from 32-foot outdoor cinemas to full
            esports tournament stages. Every event is delivered, staffed and run
            by our own crew.
          </p>

          <a
            href="#footer"
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[13px] font-semibold uppercase tracking-wide text-white transition-colors hover:border-[#0066FD] hover:bg-[#0066FD]/10"
          >
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-[#7DDDFF]/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80"
              alt="Crowd celebrating with confetti"
              className="h-[380px] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040814]/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;

import React from "react";
import { collaborations } from "../mock";

const LogoPill = ({ label }) => (
  <div className="mx-6 flex h-12 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] px-7 grayscale transition-all duration-300 hover:grayscale-0 hover:border-[#0066FD]/40">
    <span className="font-display text-sm font-bold uppercase tracking-wide text-white/55" style={{ fontWeight: 700 }}>
      {label}
    </span>
  </div>
);

const TrustedCollaborations = () => {
  const doubled = [...collaborations, ...collaborations];
  return (
    <section className="relative border-y border-white/5 bg-[#070b16] py-8">
      <p className="mb-6 text-center font-display text-[11px] font-medium uppercase tracking-[0.4em] text-white/40">
        Trusted Collaborations
      </p>
      <div className="marquee-pause relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#070b16] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#070b16] to-transparent" />
        <div className="marquee-track animate-marquee-left">
          {doubled.map((c, i) => (
            <LogoPill key={i} label={c} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCollaborations;

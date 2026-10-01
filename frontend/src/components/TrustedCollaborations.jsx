import React from "react";
import { collaborationLogos } from "../mock";

const LogoItem = ({ name, logo }) => (
  <div className="mx-8 shrink-0 flex items-center justify-center" title={name}>
    <img
      src={logo}
      alt={name}
      className="h-12 max-w-[170px] w-auto object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110"
      loading="lazy"
    />
  </div>
);

const TrustedCollaborations = () => {
  const doubled = [...collaborationLogos, ...collaborationLogos];
  return (
    <section className="relative border-y border-white/5 bg-[#070b16] py-8">
      <p className="mb-7 text-center font-display text-[11px] font-semibold uppercase tracking-[0.4em] text-white/40">
        Trusted Collaborations
      </p>
      <div className="marquee-pause relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#070b16] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#070b16] to-transparent" />
        <div className="marquee-track animate-marquee-left items-center">
          {doubled.map((c, i) => (
            <LogoItem key={i} name={c.name} logo={c.logo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCollaborations;

import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import TextScatter from "./TextScatter";
import ExploreDestinationsCTA from "./ExploreDestinationsCTA";

const Hero = ({ seo = null }) => {
  const heroTitleText = seo?.heroDisplayTitle || "Transform Your Event\nInto Reality";
  const heroSubtitleText =
    seo?.heroSubtitleOverride ||
    "Turnkey event & party rentals across NH, MA & NC — outdoor movie screens, 360 & mirror photo booths, live gaming events, VR, silent disco, glow park & custom novelties.";

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#05070f]"
    >
      {/* Background Image from user */}
      <img
        src="/hero-bg.png"
        alt={seo?.heading || "Next Level Gaming and Novelties Event Rentals Setup"}
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark overlay for contrast and seamless transition */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/50 to-[#05070f]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070f]/80 via-transparent to-[#05070f]/80" />

      {/* Subtle ambient blue glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FD]/15 blur-[140px]" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-5 pt-16 text-center sm:pt-20">
        {seo?.heroEyebrow && (
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0066FD]/45 bg-[#050a16]/75 px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[#7DDDFF] backdrop-blur-md animate-rise">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7DDDFF]" aria-hidden="true" />
            <span>{seo.heroEyebrow}</span>
          </p>
        )}

        <h1
          className="w-full font-display text-[clamp(1.75rem,5vw,4.2rem)] font-extrabold uppercase leading-[1.06] tracking-tight text-white animate-rise drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
          style={{ fontWeight: 800 }}
        >
          <TextScatter text={heroTitleText} />
        </h1>

        <p
          className="mt-7 max-w-2xl text-[16px] leading-relaxed text-white/85 animate-rise drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          style={{ animationDelay: "0.1s" }}
        >
          {heroSubtitleText}
        </p>

        <div
          className="mt-10 flex flex-col items-center gap-3 animate-rise sm:flex-row"
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            to="/explore-experiences"
            data-testid="hero-explore-cta"
            className="cta-fill group inline-flex h-[54px] w-full max-w-[320px] items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-[#0066CC] px-5 text-[13px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_10px_34px_rgba(0,102,204,0.35)] hover:shadow-[0_14px_40px_rgba(0,102,204,0.5)] sm:w-auto sm:px-8"
          >
            Explore Experiences
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <ExploreDestinationsCTA
            label="Browse Events & Experiences"
            testId="homepage-explore-destinations-cta"
            compactOnMobile
            className="cta-fill inline-flex min-h-[54px] w-full max-w-[320px] items-center justify-center gap-2 rounded-xl border border-white/60 bg-black/20 px-5 text-center text-[12px] font-bold uppercase tracking-[0.04em] text-white backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 sm:w-auto sm:px-6 sm:text-[13px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

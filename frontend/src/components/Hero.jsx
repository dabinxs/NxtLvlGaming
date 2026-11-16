import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import TextScatter from "./TextScatter";
import ExploreDestinationsCTA from "./ExploreDestinationsCTA";
import "./Hero.css";

const Hero = ({ seo = null, primaryCta = null, homepage = false }) => {
  const heroTitleText = seo?.heroDisplayTitle || "Transform Your Event\nInto Reality";
  const heroSubtitleText =
    seo?.heroSubtitleOverride ||
    "Gaming, entertainment, and interactive experiences for unforgettable events.";
  const heroBgImage = seo?.heroImageLocal || "/hero-bg.jpg";
  const ctaLabel = primaryCta?.label || "Explore Experiences";
  const ctaTo = primaryCta?.to || "/explore-experiences";

  if (homepage) {
    return (
      <section
        id="top"
        className="homepage-hero relative isolate w-full bg-[#100e3b]"
      >
        <img
          src="/indigo-starfield.png"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#171544]/10 via-transparent to-[#08071f]/25" />

        <div className="homepage-hero__content relative z-10 flex w-full flex-col items-center px-5 text-center">
          <h1
            className="homepage-hero__title w-full max-w-[1180px] font-display font-extrabold uppercase leading-[1.42] tracking-[0.005em] text-white drop-shadow-[0_6px_24px_rgba(6,5,32,0.4)]"
            style={{ fontWeight: 800 }}
          >
            <TextScatter text={heroTitleText} />
          </h1>

          <p className="homepage-hero__description max-w-4xl text-[clamp(0.95rem,1.45vw,1.25rem)] leading-relaxed tracking-[0.035em] text-[#e1e4ff]">
            {heroSubtitleText}
          </p>

          <div className="homepage-hero__actions flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              to={ctaTo}
              data-testid="hero-explore-cta"
              className="cta-fill group inline-flex h-[62px] w-full max-w-[330px] items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-[#0873df] px-7 text-[13px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_10px_34px_rgba(0,102,204,0.3)] transition-all hover:bg-[#1485f4] hover:shadow-[0_14px_40px_rgba(0,102,204,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 sm:w-auto sm:px-9"
            >
              {ctaLabel}
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <ExploreDestinationsCTA
              label="Browse Events & Experiences"
              testId="homepage-explore-destinations-cta"
              compactOnMobile
              className="cta-fill inline-flex min-h-[62px] w-full max-w-[380px] items-center justify-center gap-2 rounded-xl border border-white/65 bg-[#080b25]/45 px-6 text-center text-[12px] font-bold uppercase tracking-[0.04em] text-white backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 sm:w-auto sm:px-7 sm:text-[13px]"
            />
          </div>
        </div>

        <div className="homepage-hero__artwork relative z-[1]">
          <img
            src="/gaming-stage.png"
            alt="Gaming consoles, trivia stage, movie lounge, racing simulator, photo booth, and mini golf setup"
            width="2172"
            height="724"
            fetchPriority="high"
            decoding="async"
            className="homepage-hero__stage pointer-events-none"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#05070f]"
    >
      {/* Background Image */}
      <img
        src={heroBgImage}
        alt={seo?.heading || "Next Level Gaming and Novelties Event Rentals Setup"}
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark overlay for contrast and seamless transition */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/55 to-[#05070f]/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070f]/80 via-transparent to-[#05070f]/80" />

      {/* Subtle ambient blue glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FD]/15 blur-[140px]" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-5 pt-16 text-center sm:pt-20">
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
            to={ctaTo}
            data-testid="hero-explore-cta"
            className="cta-fill group inline-flex h-[54px] w-full max-w-[320px] items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-[#0066CC] px-5 text-[13px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_10px_34px_rgba(0,102,204,0.35)] hover:shadow-[0_14px_40px_rgba(0,102,204,0.5)] sm:w-auto sm:px-8"
          >
            {ctaLabel}
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

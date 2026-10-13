import React, { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCmsContent } from "../lib/cmsContent";
import { noveltyContentFromRow } from "../lib/noveltyContent";

const Novelties = () => {
  const { pages } = useCmsContent();
  const content = noveltyContentFromRow(pages.novelties);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#041222] text-foreground font-sans selection:bg-[#0099FF] selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* ================= SECTION 1: HERO ================= */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 flex items-center bg-[#041222]">
          {/* Background image uploaded by user (unzoomed positioning) */}
          <img
            src={content.heroImage}
            alt="Novelties background"
            className="absolute inset-0 h-full w-full object-cover object-right pointer-events-none select-none z-0"
          />

          {/* Vertical scroll text on right edge */}
          <div className="hidden lg:flex pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 z-20 items-center gap-3 rotate-90 origin-right text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            <span>SCROLL TO EXPLORE</span>
            <span className="h-[2px] w-6 bg-white/30" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 w-full">
            {/* Tag */}
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0099FF]">
              <span className="h-[2px] w-7 bg-[#0099FF]" />
              <span>01 / NOVELTIES</span>
              <span className="text-white/40 font-normal">· CURATED FOR THE UNEXPECTED</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-serif text-[clamp(3.2rem,7.5vw,6.5rem)] font-normal leading-[1.04] tracking-tight text-white">
              {content.heroTitle} <br />
              <span className="italic font-serif text-[#0099FF] drop-shadow-[0_0_30px_rgba(0,153,255,0.45)]">
                {content.heroHighlight}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/70 md:text-[18px]">
              {content.heroSubtitle}
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="/build-novelty"
                className="group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#0099FF] px-8 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_24px_rgba(0,153,255,0.4)] transition-all duration-300 hover:bg-[#0088EE] hover:shadow-[0_0_36px_rgba(0,153,255,0.6)]"
              >
                CUSTOMIZE YOUR NOVELTIES
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: THE ART OF THE UNEXPECTED ================= */}
        <section className="relative border-t border-white/10 bg-[#030c18] py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              {/* Left Column */}
              <div className="lg:col-span-6 lg:border-r lg:border-white/10 lg:pr-12">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0099FF]">
                  <span className="h-[2px] w-7 bg-[#0099FF]" />
                  <span>02 / THE ART OF THE UNEXPECTED</span>
                </div>
                <h2 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white">
                  {content.introHeading}
                </h2>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-6 flex flex-col gap-8">
                <p className="font-serif text-[18px] leading-relaxed text-white/80 md:text-[20px]">
                  {content.introBody}
                </p>

                <div className="pt-4 border-t border-white/10">
                  <div className="font-serif italic text-[17px] text-white/90 space-y-1">
                    <p>Create</p>
                    <p>Personalize</p>
                    <p>Take Home</p>
                  </div>
                  <div className="mt-3 h-[2px] w-12 bg-[#0099FF]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: SHAPE THE OCCASION (3 STEPS) ================= */}
        <section className="relative overflow-hidden border-t border-white/10 bg-[#020917] py-20 md:py-28">
          {/* Subtle CSS Lighting Effects */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-[#0099FF]/15 blur-[140px]" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-[400px] w-[400px] rounded-full bg-[#0066FF]/10 blur-[130px]" />

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8">
            {/* Header */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 items-end mb-12 md:mb-16">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0099FF]">
                  <span>03 / SHAPE THE OCCASION</span>
                  <span className="h-[1px] flex-1 bg-[#0099FF]/40" />
                </div>
                <h2 className="mt-4 font-serif text-[clamp(2.6rem,5.5vw,4.8rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white">
                  {content.stepsHeading}
                </h2>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-end pb-2">
                <span className="h-[2px] w-6 bg-[#0099FF] mb-4 inline-block" />
                <p className="text-[14px] md:text-[15.5px] leading-relaxed text-white/75">
                  {content.stepsIntro}
                </p>
              </div>
            </div>

            {/* 3 Step Cards with Native Glowing Corner Arcs */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-2">
              {content.steps.map((step) => (
                <div
                  key={step.id}
                  className="group relative overflow-hidden rounded-[20px] border border-[#0099FF]/40 bg-gradient-to-b from-[#061833] via-[#041226] to-[#020b1a] p-7 md:p-9 shadow-[0_10px_30px_rgba(0,102,255,0.12)] transition-all duration-300 hover:border-[#0099FF] hover:shadow-[0_14px_45px_rgba(0,153,255,0.25)] hover:-translate-y-1"
                >
                  {/* Top-Right Glowing Corner Arc SVG */}
                  <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 overflow-hidden rounded-tr-[20px]">
                    <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#0099FF]/25 blur-2xl" />
                    <svg
                      viewBox="0 0 160 160"
                      className="absolute right-0 top-0 h-full w-full"
                      fill="none"
                    >
                      <path
                        d="M 60 0 C 60 75, 160 75, 160 120"
                        stroke="#0099FF"
                        strokeWidth="1.5"
                        strokeOpacity="0.85"
                      />
                      <circle cx="120" cy="78" r="2.5" fill="#7DDDFF" />
                      <circle cx="120" cy="78" r="6" fill="#0099FF" opacity="0.6" className="blur-[2px]" />
                      <circle cx="120" cy="78" r="12" fill="#0099FF" opacity="0.25" className="blur-[4px]" />
                    </svg>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#0099FF]">
                      {step.id}
                    </div>
                    <h3 className="mt-6 font-serif text-[32px] md:text-[38px] font-extrabold uppercase tracking-wide text-white transition-colors group-hover:text-[#7DDDFF]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-white/70 font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: CREATIVE WORKSHOPS (GRID OF 10 PRINTED PHOTO CARDS) ================= */}
        <section id="workshops" className="relative py-24 md:py-32 bg-[#041222] border-t border-[#0099FF]/30">
          {/* Subtle dotted grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10 mx-auto max-w-[1380px] px-5 md:px-8">
            {/* Header bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-16 pb-6 border-b border-white/10">
              <div className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#0099FF]">
                04 / {content.workshopsHeading}
              </div>
              <a
                href="/build-novelty"
                className="group flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-white hover:text-[#0099FF] transition-colors"
              >
                CHOOSE AN EXPERIENCE
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* 10 Card Editorial Photo Grid (5 per row on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
              {content.workshops.map((item, index) => (
                <a
                  key={item.id}
                  href={`/build-novelty?product=${item.productId || "trucker-hats"}`}
                  className={`group relative flex flex-col transition-all duration-500 hover:z-30 hover:scale-[1.03] ${item.rotation}`}
                >
                  {/* Physical Printed Photo Frame */}
                  <div className="relative rounded-[4px] bg-[#f4f4f6] p-2 shadow-[0_16px_38px_rgba(0,0,0,0.7)] transition-all duration-400 group-hover:shadow-[0_20px_45px_rgba(0,153,255,0.35)]">
                    {/* Electric Blue Translucent Tape at top (sharp corners, translucent) */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 h-4.5 w-14 bg-[#0052cc]/55 border border-white/20 shadow-[0_2px_8px_rgba(0,82,204,0.3)] transform -rotate-2 rounded-none backdrop-blur-[0.5px]" />

                    {/* Inside Photo Image Container */}
                    <div className="relative aspect-[1/1] w-full overflow-hidden bg-black rounded-[2px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                        loading="lazy"
                      />
                      {/* Dark gradient overlay over photo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                      {/* Top Badges over photo */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                        {/* Number */}
                        <span className="font-serif text-white font-medium text-sm drop-shadow">
                          {item.number || String(index + 1).padStart(2, "0")}
                        </span>
                        {/* Outlined Category Pill */}
                        <span className="border border-white/50 bg-black/30 rounded-full px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                          {item.tag}
                        </span>
                      </div>

                      {/* Bottom Left Title Overlaid on Photo */}
                      <div className="absolute bottom-3 left-3 right-12 z-10">
                        <h3 className="font-serif text-white text-[17px] font-normal leading-tight drop-shadow-md group-hover:text-[#7DDDFF] transition-colors">
                          {item.title}
                        </h3>
                      </div>

                      {/* Bottom Right Arrow Button over photo */}
                      <div className="absolute bottom-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/50 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0099FF] group-hover:border-[#0099FF]">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Description Outside & Underneath the Photo Card */}
                  <div className="mt-3.5 px-1">
                    <p className="text-white/70 text-[13px] leading-snug font-sans">
                      {item.desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 5: YOUR IDEA MADE TANGIBLE BANNER ================= */}
        <section className="relative overflow-hidden w-full">
          {/* Background image */}
          <img
            src="/tangible-bg.png"
            alt="Your Idea Made Tangible background"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-[#020917]/40" />

          {/* Centered content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 md:py-32 px-6">
            <h2 className="font-serif text-[clamp(3rem,7.5vw,6.5rem)] font-extrabold uppercase leading-[1.0] tracking-tight">
              <span className="text-white">YOUR IDEA</span><br />
              <span className="italic text-[#00C8FF] drop-shadow-[0_0_40px_rgba(0,200,255,0.6)]">MADE TANGIBLE.</span>
            </h2>
            <div className="mt-10">
              <a
                href="/build-novelty"
                className="inline-flex h-[54px] items-center justify-center gap-3 rounded-full bg-[#0099FF] px-10 text-[13px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_30px_rgba(0,153,255,0.5)] transition-all duration-300 hover:bg-[#0088EE] hover:shadow-[0_0_50px_rgba(0,153,255,0.7)]"
              >
                START BUILD →
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default Novelties;

import React, { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RouteLocalSeoSection from "./RouteLocalSeoSection";
import { useCmsContent } from "../lib/cmsContent";
import { noveltyContentFromRow } from "../lib/noveltyContent";
import { ROUTE_SEO } from "../lib/routeSeoData";

const NOVELTY_CATEGORY_LINKS = [
  { label: "All 11 Novelties", href: "/novelties" },
  { label: "Trucker Hat Bar & Beanies", href: "/custom-trucker-hat-bar-rental" },
  { label: "Pillow Dolls & Sequin Pillows", href: "/custom-pillow-dolls-rental" },
  { label: "Laser Keychains, Rings & Plates", href: "/custom-keychains-rings-novelty" },
  { label: "Custom Socks, Bracelets & Plush", href: "/custom-event-socks-bracelets" },
];

const Novelties = () => {
  const { pathname } = useLocation();
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const routeSeo = ROUTE_SEO[normalizedPath] || ROUTE_SEO["/novelties"];
  const isAliasRoute = normalizedPath !== "/novelties";

  const { pages } = useCmsContent();
  const content = noveltyContentFromRow(pages.novelties);

  const heroTitle = isAliasRoute
    ? routeSeo.heroDisplayTitle || content.heroTitle
    : content.heroTitle;
  const heroHighlight = isAliasRoute
    ? routeSeo.heroDisplayHighlight || content.heroHighlight
    : content.heroHighlight;
  const heroSubtitle = isAliasRoute
    ? routeSeo.heroSubtitleOverride || content.heroSubtitle
    : content.heroSubtitle;

  const featuredSet = useMemo(
    () => new Set(routeSeo.featuredWorkshopIds || []),
    [routeSeo.featuredWorkshopIds]
  );

  const orderedWorkshops = useMemo(() => {
    if (!featuredSet.size) return content.workshops;
    const featured = content.workshops.filter((w) => featuredSet.has(w.id));
    const rest = content.workshops.filter((w) => !featuredSet.has(w.id));
    return [...featured, ...rest];
  }, [content.workshops, featuredSet]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [normalizedPath]);

  return (
    <div className="min-h-screen bg-[#041222] text-foreground font-sans selection:bg-[#0099FF] selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* ================= SECTION 1: HERO ================= */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 flex items-center bg-[#041222]">
          <img
            src={content.heroImage}
            alt={routeSeo.heading || "Custom Event Novelties & Interactive Maker Workshops"}
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 h-full w-full object-cover object-right pointer-events-none select-none z-0"
          />

          {/* Vertical scroll text on right edge */}
          <div className="hidden lg:flex pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 z-20 items-center gap-3 rotate-90 origin-right text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            <span>SCROLL TO EXPLORE</span>
            <span className="h-[2px] w-6 bg-white/30" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 w-full">
            {/* Tag */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0099FF]">
              <span className="h-[2px] w-7 bg-[#0099FF]" />
              <span>{routeSeo.heroEyebrow || "01 / NOVELTIES"}</span>
              {!isAliasRoute && (
                <span className="text-white/40 font-normal">· CURATED FOR THE UNEXPECTED</span>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-serif text-[clamp(3.0rem,7.2vw,6.2rem)] font-normal leading-[1.04] tracking-tight text-white">
              {heroTitle} <br />
              <span className="italic font-serif text-[#0099FF] drop-shadow-[0_0_30px_rgba(0,153,255,0.45)]">
                {heroHighlight}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75 md:text-[18px]">
              {heroSubtitle}
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/build-novelty"
                className="group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#0099FF] px-8 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_24px_rgba(0,153,255,0.4)] transition-all duration-300 hover:bg-[#0088EE] hover:shadow-[0_0_36px_rgba(0,153,255,0.6)]"
              >
                CUSTOMIZE YOUR NOVELTIES
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/novelty-order"
                className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-[12px] font-bold uppercase tracking-[0.1em] text-white/90 transition-colors hover:border-[#0099FF] hover:text-white"
              >
                ORDER NOVELTY STATION
              </Link>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: THE ART OF THE UNEXPECTED ================= */}
        <section className="relative border-t border-white/10 bg-[#030c18] py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 lg:border-r lg:border-white/10 lg:pr-12">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0099FF]">
                  <span className="h-[2px] w-7 bg-[#0099FF]" />
                  <span>02 / THE ART OF THE UNEXPECTED</span>
                </div>
                <h2 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white">
                  {content.introHeading}
                </h2>
              </div>

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
          <div className="pointer-events-none absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-[#0099FF]/15 blur-[140px]" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-[400px] w-[400px] rounded-full bg-[#0066FF]/10 blur-[130px]" />

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8">
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-2">
              {content.steps.map((step) => (
                <div
                  key={step.id}
                  className="group relative overflow-hidden rounded-[20px] border border-[#0099FF]/40 bg-gradient-to-b from-[#061833] via-[#041226] to-[#020b1a] p-7 md:p-9 shadow-[0_10px_30px_rgba(0,102,255,0.12)] transition-all duration-300 hover:border-[#0099FF] hover:shadow-[0_14px_45px_rgba(0,153,255,0.25)] hover:-translate-y-1"
                >
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

        {/* ================= SECTION 4: CREATIVE WORKSHOPS (GRID OF 11 PRINTED PHOTO CARDS) ================= */}
        <section id="workshops" className="relative py-24 md:py-32 bg-[#041222] border-t border-[#0099FF]/30">
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
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <div className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#0099FF]">
                04 / {content.workshopsHeading}
              </div>
              <Link
                to="/build-novelty"
                className="group flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-white hover:text-[#0099FF] transition-colors"
              >
                CHOOSE AN EXPERIENCE
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Specialty Workshop Category Links */}
            <div className="mb-12 flex flex-wrap gap-2.5">
              {NOVELTY_CATEGORY_LINKS.map((cat) => {
                const isActive = normalizedPath === cat.href;
                return (
                  <Link
                    key={cat.href}
                    to={cat.href}
                    className={`rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? "border-[#0099FF] bg-[#0099FF]/20 text-[#7DDDFF] shadow-[0_0_20px_rgba(0,153,255,0.25)]"
                        : "border-white/15 bg-white/5 text-white/75 hover:border-[#0099FF]/60 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>

            {/* Editorial Photo Grid (5 per row on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
              {orderedWorkshops.map((item, index) => {
                const isFeatured = featuredSet.has(item.id);
                return (
                  <Link
                    key={item.id}
                    to={`/build-novelty?product=${item.productId || "trucker-hats"}`}
                    className={`group relative flex flex-col transition-all duration-500 hover:z-30 hover:scale-[1.03] ${item.rotation}`}
                  >
                    {/* Physical Printed Photo Frame */}
                    <div
                      className={`relative rounded-[4px] bg-[#f4f4f6] p-2 transition-all duration-400 ${
                        isFeatured
                          ? "ring-2 ring-[#0099FF] shadow-[0_20px_50px_rgba(0,153,255,0.45)]"
                          : "shadow-[0_16px_38px_rgba(0,0,0,0.7)] group-hover:shadow-[0_20px_45px_rgba(0,153,255,0.35)]"
                      }`}
                    >
                      {/* Electric Blue Translucent Tape at top */}
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 h-4.5 w-14 bg-[#0052cc]/55 border border-white/20 shadow-[0_2px_8px_rgba(0,82,204,0.3)] transform -rotate-2 rounded-none backdrop-blur-[0.5px]" />

                      {/* Inside Photo Image Container */}
                      <div className="relative aspect-[1/1] w-full overflow-hidden bg-black rounded-[2px]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                          loading={isFeatured || index < 3 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                        {/* Top Badges over photo */}
                        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
                          <span className="font-serif text-white font-medium text-sm drop-shadow">
                            {item.number || String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`rounded-full px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm border ${
                              isFeatured
                                ? "border-[#7DDDFF] bg-[#0066FD]/85"
                                : "border-white/50 bg-black/30"
                            }`}
                          >
                            {isFeatured ? "FEATURED" : item.tag}
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
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= SECTION 5: YOUR IDEA MADE TANGIBLE BANNER ================= */}
        <section className="relative overflow-hidden w-full">
          <img
            src="/tangible-bg.png"
            alt="Your Idea Made Tangible background"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#020917]/40" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 md:py-32 px-6">
            <h2 className="font-serif text-[clamp(3rem,7.5vw,6.5rem)] font-extrabold uppercase leading-[1.0] tracking-tight">
              <span className="text-white">YOUR IDEA</span><br />
              <span className="italic text-[#00C8FF] drop-shadow-[0_0_40px_rgba(0,200,255,0.6)]">MADE TANGIBLE.</span>
            </h2>
            <div className="mt-10">
              <Link
                to="/build-novelty"
                className="inline-flex h-[54px] items-center justify-center gap-3 rounded-full bg-[#0099FF] px-10 text-[13px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_0_30px_rgba(0,153,255,0.5)] transition-all duration-300 hover:bg-[#0088EE] hover:shadow-[0_0_50px_rgba(0,153,255,0.7)]"
              >
                START BUILD →
              </Link>
            </div>
          </div>
        </section>

        <RouteLocalSeoSection path={normalizedPath} variant="novelties" />
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default Novelties;

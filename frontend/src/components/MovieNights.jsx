import React, { useEffect } from "react";
import {
  Monitor,
  Projector,
  Volume2,
  MapPin,
  Check,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReadyCTA from "./ReadyCTA";
import { useCmsPage } from "../lib/cmsContent";
import { CMS_PAGES } from "../lib/cmsPages";

const OVERVIEW_POINTS = [
  "Ultra-bright LED & Inflatable screens",
  "Audio built for crowds and open spaces",
  "All-weather indoor & outdoor capability",
  "Video and licensing assistance always",
];

const INCLUDED_FEATURES = [
  {
    icon: Monitor,
    title: "LED & Inflatable Screens",
    desc: "Choose between ultra-bright daylight LED screens and giant inflatable screens sized for your crowd and venue.",
  },
  {
    icon: Projector,
    title: "Full Event Setup",
    desc: "Projection, cabling, staging and teardown — handled entirely by our crew.",
  },
  {
    icon: Volume2,
    title: "Cinema Audio",
    desc: "Concert-grade sound systems tuned for dialogue, score and impact.",
  },
  {
    icon: MapPin,
    title: "Any Venue",
    desc: "Outdoor lawns, ballrooms, poolsides — if there's space, there's a cinema.",
  },
];

const AVAILABLE_SCREENS = [
  {
    category: "LED Video Wall Screens",
    size: "14 FT LED SCREEN",
    desc: "A flexible LED video wall size for smaller venues and more intimate movie nights.",
    highlights: ["Mobile LED trailer setup", "Bright digital picture", "Movie and video playback"],
  },
  {
    category: "LED Video Wall Screens",
    size: "16 FT LED SCREEN",
    desc: "A larger LED video wall option for gatherings that need a more prominent display.",
    highlights: ["Mobile LED trailer setup", "Bright digital picture", "Movie and video playback"],
  },
  {
    category: "LED Video Wall Screens",
    size: "20 FT LED SCREEN",
    desc: "A large-format LED video wall for bigger crowds and high-impact viewing.",
    highlights: ["Mobile LED trailer setup", "Bright digital picture", "Movie and video playback"],
  },
  {
    category: "Inflatable Screens",
    size: "16 FT INFLATABLE SCREEN",
    desc: "Great for backyards, private birthday parties, and intimate family gatherings.",
    highlights: [
      "Optimal viewing distance up to 75 ft",
      "Compact footprint & quick setup",
      "HD projection & crystal clear sound",
    ],
  },
  {
    category: "Inflatable Screens",
    size: "21 FT INFLATABLE SCREEN",
    desc: "Great for school fields, HOA community nights, and parking lot screenings.",
    highlights: [
      "Optimal viewing distance up to 125 ft",
      "High-impact outdoor sound system",
      "Perfect for neighborhood cinema nights",
    ],
  },
  {
    category: "Inflatable Screens",
    size: "26 FT INFLATABLE SCREEN",
    desc: "Great for events out in the park, college campus quads, and public festivals.",
    highlights: [
      "Optimal viewing distance up to 200 ft",
      "Concert-grade dual audio towers",
      "Built for large open-air audiences",
    ],
  },
  {
    category: "Inflatable Screens",
    size: "40 FT INFLATABLE SCREEN",
    desc: "Perfect for Drive-Ins, City-wide events, and massive festival crowds.",
    highlights: [
      "FM radio broadcast for drive-in movies",
      "Colossal stadium-scale visual display",
      "Multi-crew turnkey event production",
    ],
  },
];

const MovieNights = () => {
  const cmsPage = useCmsPage("movie-nights", CMS_PAGES.find((page) => page.slug === "movie-nights"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070f] text-foreground">
      <Navbar />

      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
          {/* Background image from movie nights carousel */}
          <img
            src={cmsPage.heroImage}
            alt="Movie Night under the stars"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Directional gradient overlay for high visibility & contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070f]/90 via-[#05070f]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-[#05070f]/60" />
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-15" />
          <div className="pointer-events-none absolute left-1/3 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FD]/15 blur-[150px]" />

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8">
            <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold uppercase italic leading-[1.04] tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.9)]">{cmsPage.heroTitle}</h1>

            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/90 drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] sm:text-[19px]">
              {cmsPage.heroSubtitle}
            </p>
          </div>
        </section>

        {/* ================= OVERVIEW SECTION ================= */}
        <section className="relative border-t border-white/5 bg-[#070b16] py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left Column */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-[#7DDDFF]">
                  <span className="h-0.5 w-7 bg-[#0066FD]" />
                  <span>OVERVIEW</span>
                </div>
                <h2 className="mt-4 font-display text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold uppercase leading-[1.12] tracking-tight text-white">
                  A REAL CINEMA, ANYWHERE
                </h2>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-8 lg:col-span-7">
                <p className="text-[17px] leading-relaxed text-white/70 sm:text-[18px]">
                  We transform your venue into a full cinema experience with both high-definition LED screens and giant inflatable screens, DJ-quality audio, and complete event production.
                </p>

                {/* 2x2 Grid of Points */}
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {OVERVIEW_POINTS.map((point) => (
                    <div
                      key={point}
                      className="flex h-[58px] items-center gap-3.5 rounded-xl border border-white/10 bg-[#0c1830]/80 px-5 backdrop-blur-sm transition-all duration-300 hover:border-[#0066FD]/50 hover:bg-[#0c1830]"
                    >
                      <Check className="h-4 w-4 shrink-0 text-[#7DDDFF]" strokeWidth={2.6} />
                      <span className="text-[13px] font-medium leading-tight text-white/90 sm:text-[13.5px]">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHAT IS INCLUDED SECTION ================= */}
        <section id="what-is-included" className="relative py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-[#7DDDFF]">
                <span className="h-0.5 w-7 bg-[#0066FD]" />
                <span>WHAT IS INCLUDED</span>
              </div>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold uppercase leading-[1.12] tracking-tight text-white">
                Everything Needed For The Ultimate Cinema Setup
              </h2>
            </div>

            {/* 4 Feature Cards (2x2) */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {INCLUDED_FEATURES.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1830] to-[#070e1e] p-8 transition-all duration-300 hover:border-[#0066FD]/50 hover:shadow-[0_12px_36px_rgba(0,102,253,0.18)]"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#0066FD]/35 bg-[#0066FD]/15 text-[#7DDDFF] shadow-[0_0_20px_rgba(0,102,253,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:border-[#0066FD]/60 group-hover:bg-[#0066FD]/25">
                      <IconComponent className="h-7 w-7" strokeWidth={2} />
                    </div>

                    <h3 className="mt-6 font-display text-[20px] font-extrabold uppercase tracking-wide text-white transition-colors group-hover:text-[#7DDDFF]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= SEE IT IN ACTION / THE EXPERIENCE ================= */}
        <section className="relative border-t border-white/5 bg-[#070b16] py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-[#7DDDFF]">
                <span className="h-0.5 w-7 bg-[#0066FD]" />
                <span>SEE IT IN ACTION</span>
              </div>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold uppercase italic leading-none tracking-tight text-white">
                THE <span className="blue-gradient-text not-italic">EXPERIENCE</span>
              </h2>
            </div>

            {/* 2 Showcase Image Cards: LED & INFLATABLE */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {cmsPage.gallery.slice(0, 2).map((img, i) => (
                <div
                  key={img.id || i}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c1830] transition-all duration-500 hover:border-[#0066FD]/60 hover:shadow-[0_16px_40px_rgba(0,102,253,0.22)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="p-7">
                    <h3 className="font-display text-[22px] font-extrabold uppercase tracking-wide text-white group-hover:text-[#7DDDFF] transition-colors">
                      {img.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-white/70">
                      {img.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= AVAILABLE SCREEN SECTION ================= */}
        <section id="available-screens" className="relative border-t border-white/5 bg-[#05070f] py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-[#7DDDFF]">
                <span className="h-0.5 w-7 bg-[#0066FD]" />
                <span>SCREEN SIZES & SPECIFICATIONS</span>
              </div>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold uppercase italic leading-none tracking-tight text-white">
                AVAILABLE <span className="blue-gradient-text not-italic">SCREENS</span>
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/70">
                Choose the screen size that fits your crowd and venue. From private backyard screenings to massive community drive-ins.
              </p>
            </div>

            <div className="space-y-12">
              {[...new Set(AVAILABLE_SCREENS.map((screen) => screen.category))].map((category) => {
                const categoryScreens = AVAILABLE_SCREENS.filter((screen) => screen.category === category);
                const gridColsClass = categoryScreens.length === 3
                  ? "grid grid-cols-1 gap-6 md:grid-cols-3"
                  : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4";
                return (
                  <div key={category}>
                    <h3 className="mb-5 flex items-center gap-3 font-display text-[17px] font-extrabold uppercase tracking-[0.14em] text-white"><span className="h-0.5 w-6 bg-[#0066FD]" />{category}</h3>
                    <div className={gridColsClass}>
                      {categoryScreens.map((screen) => (
                        <div key={screen.size} className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-[#0c1830] to-[#070e1e] p-6 transition-all duration-300 hover:border-[#0066FD]/50 hover:shadow-[0_12px_32px_rgba(0,102,253,0.18)]">
                          <div>
                            <div className="flex items-center gap-2 text-[#7DDDFF]"><Monitor className="h-4 w-4" /><span className="text-[11px] font-bold uppercase tracking-wider text-white/60">{category}</span></div>
                            <h4 className="mt-4 font-display text-[20px] font-extrabold uppercase tracking-wide text-white transition-colors group-hover:text-[#7DDDFF]">{screen.size}</h4>
                            <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">{screen.desc}</p>
                            <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">{screen.highlights.map((item, idx) => <li key={idx} className="flex items-start gap-2 text-[12.5px] text-white/80"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7DDDFF]" strokeWidth={2.6} /><span>{item}</span></li>)}</ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= READY TO LEVEL UP CTA SECTION ================= */}
        <ReadyCTA />
      </main>

      <Footer />
    </div>
  );
};

export default MovieNights;

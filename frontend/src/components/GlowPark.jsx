import React, { useEffect } from "react";
import {
  Sparkles,
  Gamepad2,
  Lightbulb,
  CircleDot,
  Check,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReadyCTA from "./ReadyCTA";
import { useCmsPage } from "../lib/cmsContent";
import { CMS_PAGES } from "../lib/cmsPages";

const OVERVIEW_POINTS = [
  "Eight illuminated glow swings",
  "Four social glow seesaws",
  "Colorful room & venue uplighting",
  "Interactive glowing mini-golf course",
];

const INCLUDED_FEATURES = [
  {
    icon: Sparkles,
    title: "8 Glow Swings",
    desc: "Eight illuminated swings create an inviting, high-energy centerpiece for guests to enjoy.",
  },
  {
    icon: Gamepad2,
    title: "4 Glow Seesaws",
    desc: "Four glowing seesaws bring a playful, social activity guests can share together.",
  },
  {
    icon: Lightbulb,
    title: "Colorful Uplighting",
    desc: "Uplights add vibrant color around the event space and complete the Glow Park atmosphere.",
  },
  {
    icon: CircleDot,
    title: "Glowing Mini Golf",
    desc: "A glowing mini-golf setup adds a friendly challenge for guests of all ages.",
  },
];

const DEFAULT_GALLERY = [
  {
    id: "glow-swings",
    title: "Glow Swings",
    subtitle: "Eight illuminated swings bring a bright, playful centerpiece to your event.",
    src: "/glow-park-experience-1.jpg",
  },
  {
    id: "glow-seesaws",
    title: "Glow Seesaws",
    subtitle: "Four glowing seesaws add an easy-to-share group activity.",
    src: "/glow-park-experience-2.jpg",
  },
  {
    id: "glow-mini-golf",
    title: "Colorful Uplighting & Glow",
    subtitle: "Vibrant uplighting and glowing attractions transform any indoor or outdoor space.",
    src: "/glow-park-experience-3.jpg",
  },
];

const GlowPark = () => {
  const cmsPage = useCmsPage("glow-park", CMS_PAGES.find((page) => page.slug === "glow-park"));
  const galleryItems = (cmsPage.gallery && cmsPage.gallery.some((item) => item.src))
    ? cmsPage.gallery.map((item, idx) => ({
        ...item,
        src: item.src || DEFAULT_GALLERY[idx]?.src || "",
      }))
    : DEFAULT_GALLERY;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070f] text-foreground">
      <Navbar />

      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
          {/* Background image from Glow Park carousel */}
          <img
            src={cmsPage.heroImage || "/experience-glow-park.jpg"}
            alt="Glow Park Experience event setup"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Directional gradient overlay for visibility & text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070f]/90 via-[#05070f]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-[#05070f]/60" />
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-15" />
          <div className="pointer-events-none absolute left-1/3 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FD]/15 blur-[150px]" />

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8">
            <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold uppercase italic leading-[1.04] tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.9)]">
              {cmsPage.heroTitle}
            </h1>

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
                  A BRIGHT, HANDS-ON EXPERIENCE FOR THE WHOLE EVENT
                </h2>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-8 lg:col-span-7">
                <p className="text-[17px] leading-relaxed text-white/70 sm:text-[18px]">
                  Bring the Glow Park full package to your venue with illuminated attractions,
                  colorful uplighting, and a glowing mini-golf experience. Guests can move
                  between activities and make the space their own.
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
                Everything Needed For A Glow Park Experience
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

            {/* 3 Showcase Image Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {galleryItems.map((img, i) => (
                <div
                  key={img.id || i}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c1830] transition-all duration-500 hover:border-[#0066FD]/60 hover:shadow-[0_16px_40px_rgba(0,102,253,0.22)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-[18px] font-extrabold uppercase tracking-wide text-white transition-colors group-hover:text-[#7DDDFF]">
                      {img.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">
                      {img.subtitle}
                    </p>
                  </div>
                </div>
              ))}
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

export default GlowPark;

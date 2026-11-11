import React, { useEffect } from "react";
import {
  Monitor,
  Volume2,
  Smartphone,
  Sparkles,
  Check,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReadyCTA from "./ReadyCTA";
import RouteLocalSeoSection from "./RouteLocalSeoSection";
import { useCmsPage } from "../lib/cmsContent";
import { CMS_PAGES } from "../lib/cmsPages";
import { ROUTE_SEO } from "../lib/routeSeoData";

const OVERVIEW_POINTS = [
  "Head-to-head multiplayer dance battles on giant screens",
  "Huge track & routine catalog for all crowd ages",
  "Concert PA speakers, subwoofers & party lighting",
  "Delivered turnkey across NH, MA, CT & North Carolina",
];

const INCLUDED_FEATURES = [
  {
    icon: Monitor,
    title: "Giant 12–32 ft Screens",
    desc: "Watch the on-screen coach and match every move across massive high-definition displays.",
  },
  {
    icon: Volume2,
    title: "Concert Sound & Lighting",
    desc: "High-output concert PA speakers, deep subwoofers, and dynamic dance-floor lighting.",
  },
  {
    icon: Smartphone,
    title: "Easy Drop-In Play",
    desc: "Guests grab a motion controller or smartphone sensor, pick a song, and jump right into the choreography.",
  },
  {
    icon: Sparkles,
    title: "Multiplayer Battles",
    desc: "Take turns, run dance-offs, or compete head-to-head while the entire gym or quad cheers the score.",
  },
];

const JustDance = () => {
  const routeSeo = ROUTE_SEO["/just-dance"];
  const cmsPage = useCmsPage("just-dance", CMS_PAGES.find((page) => page.slug === "just-dance"));

  const rawHeroTitle = (cmsPage.heroTitle || "").trim();
  const isDefaultCmsTitle = !rawHeroTitle || rawHeroTitle.toUpperCase() === "JUST DANCE";
  const heroTitle = !isDefaultCmsTitle
    ? rawHeroTitle
    : routeSeo.heroDisplayTitle || "JUST DANCE GIANT-SCREEN PARTY RENTALS";

  const rawHeroSubtitle = (cmsPage.heroSubtitle || "").trim();
  const isDefaultCmsSubtitle =
    !rawHeroSubtitle ||
    rawHeroSubtitle === "High-energy dance parties on giant screens that get everyone moving.";
  const heroSubtitle = isDefaultCmsSubtitle
    ? "Choose a Just Dance song on our giant 12–32 ft HD screens, follow the on-screen choreography with concert sound, and battle friends head-to-head across NH, MA, CT & NC."
    : cmsPage.heroSubtitle;

  const heroImage = ["/experience-just-dance.jpg", "/just-dance-gameplay.jpg", "/experience-just-dance.png", "/just-dance-gameplay.png"].includes(cmsPage.heroImage)
    ? "/experience-just-dance.jpg"
    : cmsPage.heroImage;
  const multiplayerBattle = cmsPage.gallery.find((item) => item.title === "Multiplayer Dance Battles") || cmsPage.gallery[0];
  const experienceCards = [
    {
      id: "dance-battles",
      title: "Multiplayer Dance Battles",
      subtitle: multiplayerBattle?.subtitle || "Head-to-head choreography on giant displays.",
      src: "/experience-just-dance.jpg",
    },
    {
      id: "follow-the-coach",
      title: "Follow the On-Screen Coach",
      subtitle: "Watch the dancer, match each move as it appears, and build your score through the song.",
      src: "/just-dance-gameplay.jpg",
    },
    {
      id: "beat-your-best",
      title: "Choose a Song, Beat Your Best",
      subtitle: "Pick a track, try its routine, and come back for another round to top your score.",
      src: "/just-dance-gameplay.jpg",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070f] text-foreground">
      <Navbar />

      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
          <img
            src={heroImage}
            alt={routeSeo.heading || "Guests playing Just Dance together on a giant screen"}
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070f]/92 via-[#05070f]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-[#05070f]/60" />
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-15" />
          <div className="pointer-events-none absolute left-1/3 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FD]/15 blur-[150px]" />

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8">
            {routeSeo.heroEyebrow && (
              <div className="mb-5 flex items-center gap-3 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-[#7DDDFF]">
                <span className="h-0.5 w-7 bg-[#0066FD]" />
                <span>{routeSeo.heroEyebrow}</span>
              </div>
            )}

            <h1 className="max-w-4xl font-display text-[clamp(2.35rem,6vw,4.75rem)] font-extrabold uppercase italic leading-[1.04] tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.9)]">
              {heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/90 drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] sm:text-[19px]">
              {heroSubtitle}
            </p>
          </div>
        </section>

        {/* ================= OVERVIEW SECTION ================= */}
        <section className="relative border-t border-white/5 bg-[#070b16] py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-[#7DDDFF]">
                  <span className="h-0.5 w-7 bg-[#0066FD]" />
                  <span>OVERVIEW</span>
                </div>
                <h2 className="mt-4 font-display text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold uppercase leading-[1.12] tracking-tight text-white">
                  A GIANT-SCREEN DANCE GAME FOR EVERYONE
                </h2>
              </div>

              <div className="flex flex-col gap-8 lg:col-span-7">
                <p className="text-[17px] leading-relaxed text-white/75 sm:text-[18px]">
                  Pick a routine and follow the on-screen choreography on 12 ft to 32 ft HD displays. Players earn points for matching every move, compete head-to-head, and energize the whole crowd.
                </p>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {OVERVIEW_POINTS.map((point) => (
                    <div
                      key={point}
                      className="flex min-h-[58px] items-center gap-3.5 rounded-xl border border-white/10 bg-[#0c1830]/80 px-5 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-[#0066FD]/50 hover:bg-[#0c1830]"
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
                Just Dance, Ready To Play
              </h2>
            </div>

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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {experienceCards.map((img) => (
                <div
                  key={img.id}
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

        <RouteLocalSeoSection path="/just-dance" />

        {/* ================= READY TO LEVEL UP CTA SECTION ================= */}
        <ReadyCTA />
      </main>

      <Footer />
    </div>
  );
};

export default JustDance;

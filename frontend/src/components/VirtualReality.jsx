import React, { useEffect } from "react";
import {
  Glasses,
  Gamepad2,
  Monitor,
  Users,
  Check,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReadyCTA from "./ReadyCTA";
import { useCmsPage } from "../lib/cmsContent";
import { CMS_PAGES, POPULAR_VR_GAMES } from "../lib/cmsPages";

const OVERVIEW_POINTS = [
  "Immersive, motion-tracked gameplay",
  "A growing library of games to explore",
  "Spectator screens share the action",
  "Friendly staff guide every player",
];

const INCLUDED_FEATURES = [
  {
    icon: Glasses,
    title: "VR Headsets",
    desc: "Comfortable headsets bring players into vivid virtual worlds.",
  },
  {
    icon: Gamepad2,
    title: "Immersive Play",
    desc: "Room-scale tracking lets players move naturally through each game.",
  },
  {
    icon: Monitor,
    title: "Spectator Screen",
    desc: "Live gameplay gives friends and crowds a view into the action.",
  },
  {
    icon: Users,
    title: "Guided Play",
    desc: "Staff help guests get set up and choose a game that suits them.",
  },
];

const VirtualReality = () => {
  const cmsPage = useCmsPage("virtual-reality", CMS_PAGES.find((page) => page.slug === "virtual-reality"));
  const visibleCmsGames = cmsPage.gallery.filter((game) => game.id !== "vr-i-expect-you-to-die" && game.title.trim().toLowerCase() !== "i expect you to die");
  const existingGames = new Set(visibleCmsGames.map((game) => game.title.trim().toLowerCase()));
  const gameLibrary = [...visibleCmsGames, ...POPULAR_VR_GAMES.filter((game) => !existingGames.has(game.title.toLowerCase()))];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070f] text-foreground">
      <Navbar />

      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-36">
          {/* Visible VR Hero Background Image */}
          <img
            src={cmsPage.heroImage}
            alt="Virtual Reality background"
            className="absolute inset-0 h-full w-full object-cover object-center scale-105"
          />
          {/* Dark gradient overlay tuned for readability while keeping the photo visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070f]/90 via-[#05070f]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-[#05070f]/50" />
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-20" />
          <div className="pointer-events-none absolute left-1/4 top-1/2 h-[450px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FD]/20 blur-[140px]" />

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8">
            <h1 className="max-w-4xl font-display text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold uppercase italic leading-[1.02] tracking-tight text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)]">{cmsPage.heroTitle}</h1>

            <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-white/90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] sm:text-[20px]">
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
                  STEP INTO A NEW WORLD
                </h2>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-8 lg:col-span-7">
                <p className="text-[17px] leading-relaxed text-white/70 sm:text-[18px]">
                  Gear up, choose your adventure, and explore a growing library of VR games. Our team
                  helps every player get started while spectators follow the action on screen.
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
                Everything Needed For An Immersive VR Experience
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
                <span>VR GAME LIBRARY</span>
              </div>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold uppercase italic leading-none tracking-tight text-white">
                A GROWING LIBRARY. <span className="blue-gradient-text not-italic">ONE HEADSET.</span>
              </h2>
            </div>

            {/* Four VR game logo cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {gameLibrary.map((game) => (
                <div
                  key={game.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c1830] transition-all duration-500 hover:border-[#0066FD]/60 hover:shadow-[0_16px_40px_rgba(0,102,253,0.22)]"
                >
                  <div className={`relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden ${game.cover ? "bg-[#0c1830]" : "bg-[#e9f0f4] p-4"}`}>
                    <img
                      src={game.src}
                      alt={`${game.title} VR game artwork`}
                      className={`h-full w-full transition-transform duration-700 group-hover:scale-105 ${game.cover ? "object-cover" : "max-h-full max-w-full object-contain"}`}
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-[18px] font-extrabold uppercase tracking-wide text-white group-hover:text-[#7DDDFF] transition-colors">
                      {game.title}
                    </h3>
                    {game.subtitle && <p className="mt-2 text-[13px] leading-relaxed text-white/60">{game.subtitle}</p>}
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

export default VirtualReality;

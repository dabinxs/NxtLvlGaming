import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { ROUTE_SEO } from "../lib/routeSeoData";

const OVERVIEW_POINTS = [
  "Mobile VR arcade & 4-player cooperative VR escape rooms",
  "Top VR event games: SUPERHOT VR, Beat Saber & Walkabout Golf",
  "Live HD spectator monitors share every moment with crowds",
  "Sanitary covers & friendly VR attendants guide every turn",
];

const INCLUDED_FEATURES = [
  {
    icon: Glasses,
    title: "VR Headsets & Hygiene",
    desc: "Commercial wireless & room-scale VR headsets fitted with disposable sanitary covers and cleaned between every session.",
  },
  {
    icon: Gamepad2,
    title: "VR Arcade & Escape Rooms",
    desc: "Action favorites like SUPERHOT VR, Beat Saber, and Pistol Whip alongside 4-player cooperative VR escape rooms.",
  },
  {
    icon: Monitor,
    title: "Live Spectator Screen",
    desc: "External HD spectator TV displays show friends, teams, and waiting guests everything inside the headset in real time.",
  },
  {
    icon: Users,
    title: "Attendant-Guided Play",
    desc: "Trained VR crew help beginners gear up in seconds, coach first-time players, and keep queues moving smoothly.",
  },
];

const ESCAPE_ROOM_TITLES = new Set([
  "dragon tower",
  "time travel paradox",
  "depths of osiris",
  "manor escape",
]);

const VirtualReality = () => {
  const { pathname } = useLocation();
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const routeSeo = ROUTE_SEO[normalizedPath] || ROUTE_SEO["/virtual-reality"];
  const isBaseRoute = normalizedPath === "/virtual-reality";

  const cmsPage = useCmsPage("virtual-reality", CMS_PAGES.find((page) => page.slug === "virtual-reality"));
  const visibleCmsGames = cmsPage.gallery.filter(
    (game) => game.id !== "vr-i-expect-you-to-die" && game.title.trim().toLowerCase() !== "i expect you to die"
  );
  const existingGames = new Set(visibleCmsGames.map((game) => game.title.trim().toLowerCase()));
  const gameLibrary = [...visibleCmsGames, ...POPULAR_VR_GAMES.filter((game) => !existingGames.has(game.title.toLowerCase()))];

  const rawHeroTitle = (cmsPage.heroTitle || "").trim();
  const isDefaultCmsTitle = !rawHeroTitle || rawHeroTitle.toUpperCase() === "VIRTUAL REALITY";
  const heroTitle =
    isBaseRoute && !isDefaultCmsTitle
      ? rawHeroTitle
      : routeSeo.heroDisplayTitle || "VIRTUAL REALITY RENTALS & VR ESCAPE ROOMS";

  const rawHeroSubtitle = (cmsPage.heroSubtitle || "").trim();
  const isDefaultCmsSubtitle =
    !rawHeroSubtitle || rawHeroSubtitle === "Immersive VR stations that pull crowds and drop jaws.";
  const heroSubtitle = !isBaseRoute
    ? routeSeo.heroSubtitleOverride || cmsPage.heroSubtitle
    : isDefaultCmsSubtitle
      ? "Bring a turnkey mobile VR arcade, multiplayer VR arena, VR event games (SUPERHOT VR, Beat Saber), and 4-player cooperative VR escape rooms to your venue in NH, Boston MA, CT & North Carolina."
      : cmsPage.heroSubtitle;

  const heroImage = normalizedPath === "/vr-escape-room-rental"
    ? "/about-vr-event.jpeg"
    : cmsPage.heroImage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [normalizedPath]);

  return (
    <div className="min-h-screen bg-[#05070f] text-foreground">
      <Navbar />

      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-36">
          <img
            src={heroImage}
            alt={routeSeo.heading || "Virtual Reality Event Rental Stations and Mobile VR Arcade"}
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 h-full w-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070f]/92 via-[#05070f]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-[#05070f]/55" />
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-20" />
          <div className="pointer-events-none absolute left-1/4 top-1/2 h-[450px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FD]/20 blur-[140px]" />

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8">
            <h1 className="max-w-4xl font-display text-[clamp(2.35rem,6vw,4.75rem)] font-extrabold uppercase italic leading-[1.03] tracking-tight text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
              {heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] sm:text-[19px]">
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
                  MOBILE VR ARCADE &amp; ARENA AT YOUR VENUE
                </h2>
              </div>

              <div className="flex flex-col gap-8 lg:col-span-7">
                <p className="text-[17px] leading-relaxed text-white/75 sm:text-[18px]">
                  Step into room-scale Virtual Reality stations featuring top VR event games—including{" "}
                  <strong className="text-white">SUPERHOT VR</strong>, <strong className="text-white">Beat Saber</strong>, Pistol Whip, Job Simulator, and 4-player cooperative VR escape rooms—while friends watch live on external HD spectator TVs across Hudson NH, Portsmouth, Manchester, Boston MA, and North Carolina.
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
                Everything Needed For An Immersive VR Experience
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

        {/* ================= VR GAME LIBRARY ================= */}
        <section className="relative border-t border-white/5 bg-[#070b16] py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-[#7DDDFF]">
                <span className="h-0.5 w-7 bg-[#0066FD]" />
                <span>VR EVENT GAMES &amp; ESCAPE ROOMS</span>
              </div>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold uppercase italic leading-none tracking-tight text-white">
                A GROWING LIBRARY. <span className="blue-gradient-text not-italic">ONE HEADSET.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {gameLibrary.map((game) => {
                const isEscape = ESCAPE_ROOM_TITLES.has(game.title.trim().toLowerCase());
                return (
                  <div
                    key={game.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c1830] transition-all duration-500 hover:border-[#0066FD]/60 hover:shadow-[0_16px_40px_rgba(0,102,253,0.22)]"
                  >
                    <div className={`relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden ${game.cover ? "bg-[#0c1830]" : "bg-[#e9f0f4] p-4"}`}>
                      <img
                        src={game.src}
                        alt={`${game.title} VR event game rental`}
                        className={`h-full w-full transition-transform duration-700 group-hover:scale-105 ${game.cover ? "object-cover" : "max-h-full max-w-full object-contain"}`}
                        loading="lazy"
                      />
                    </div>

                    <div className="p-6">
                      <span className="inline-block rounded-full border border-[#0066FD]/40 bg-[#0066FD]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#7DDDFF]">
                        {isEscape ? "4-Player VR Escape Room" : "VR Event Game"}
                      </span>
                      <h3 className="mt-2.5 font-display text-[18px] font-extrabold uppercase tracking-wide text-white group-hover:text-[#7DDDFF] transition-colors">
                        {game.title}
                      </h3>
                      {game.subtitle && <p className="mt-2 text-[13px] leading-relaxed text-white/60">{game.subtitle}</p>}
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

export default VirtualReality;

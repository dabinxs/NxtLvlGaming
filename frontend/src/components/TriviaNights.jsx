import React, { useEffect } from "react";
import {
  Brain,
  Monitor,
  Users,
  Layers,
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
  "Charismatic live game show hosts run the night",
  "Wireless buzzers & custom content for your audience",
  "Real-time scoring and leaderboards on giant screens",
  "Built for college, corporate & NH/MA/NC venues",
];

const INCLUDED_FEATURES = [
  {
    icon: Brain,
    title: "Interactive Trivia & Buzzers",
    desc: "Professionally hosted multimedia rounds with wireless digital team buzzers or smartphone scoring.",
  },
  {
    icon: Monitor,
    title: "Large Display Leaderboards",
    desc: "Questions, countdown timers, and live team standings projected on HD screens up to 32 ft.",
  },
  {
    icon: Users,
    title: "Any Size Group",
    desc: "Team-based game show energy that scales from a cozy 20-person corporate mixer to a 500-student auditorium.",
  },
  {
    icon: Layers,
    title: "Custom Categories",
    desc: "Themed rounds built around your campus traditions, company milestones, pop culture, or celebration.",
  },
];

const TriviaNights = () => {
  const routeSeo = ROUTE_SEO["/trivia-nights"];
  const cmsPage = useCmsPage("trivia-nights", CMS_PAGES.find((page) => page.slug === "trivia-nights"));

  const rawHeroTitle = (cmsPage.heroTitle || "").trim();
  const isDefaultCmsTitle = !rawHeroTitle || rawHeroTitle.toUpperCase() === "TRIVIA NIGHTS";
  const heroTitle = !isDefaultCmsTitle
    ? rawHeroTitle
    : routeSeo.heroDisplayTitle || "INTERACTIVE TRIVIA NIGHT & GAME SHOW RENTALS";

  const rawHeroSubtitle = (cmsPage.heroSubtitle || "").trim();
  const isDefaultCmsSubtitle =
    !rawHeroSubtitle ||
    rawHeroSubtitle === "Interactive trivia for groups and crowds, led by lively hosts and live scoring.";
  const heroSubtitle = isDefaultCmsSubtitle
    ? "Live-hosted interactive trivia nights and wireless digital buzzer game shows with giant-screen leaderboards & custom rounds for colleges, schools, and corporate teams across NH, MA, CT & North Carolina."
    : cmsPage.heroSubtitle;

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
            src={cmsPage.heroImage}
            alt={routeSeo.heading || "Interactive Trivia Night and Wireless Buzzer Game Show Rental"}
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
                  GAME-SHOW ENERGY, FULLY PRODUCED
                </h2>
              </div>

              <div className="flex flex-col gap-8 lg:col-span-7">
                <p className="text-[17px] leading-relaxed text-white/75 sm:text-[18px]">
                  Our hosts bring wireless digital buzzers, concert sound, giant-screen questions, live leaderboards, and custom trivia categories to universities, corporate offsites, and venues across NH, MA, CT &amp; North Carolina.
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
                Everything Needed For The Ultimate Trivia Show
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
              {cmsPage.gallery.map((img, i) => (
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

        <RouteLocalSeoSection path="/trivia-nights" />

        {/* ================= READY TO LEVEL UP CTA SECTION ================= */}
        <ReadyCTA />
      </main>

      <Footer />
    </div>
  );
};

export default TriviaNights;

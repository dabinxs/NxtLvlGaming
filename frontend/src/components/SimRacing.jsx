import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Gauge,
  Trophy,
  Monitor,
  Flag,
  Check,
  ArrowRight,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReadyCTA from "./ReadyCTA";
import RouteLocalSeoSection from "./RouteLocalSeoSection";
import { useCmsPage } from "../lib/cmsContent";
import { CMS_PAGES } from "../lib/cmsPages";
import { ROUTE_SEO } from "../lib/routeSeoData";

const OVERVIEW_POINTS = [
  "Force-feedback pro wheels and responsive pedals",
  "Authentic bucket racing seats & cockpit rigs",
  "Live fastest-lap leaderboard on giant screens",
  "Time trials & tournaments managed by our crew",
];

const INCLUDED_FEATURES = [
  {
    icon: Gauge,
    title: "Pro Simulators",
    desc: "Force-feedback wheels, pedals and racing seats for a true cockpit feel across Formula 1, GT3, stock car, and rally tracks.",
  },
  {
    icon: Trophy,
    title: "Live Leaderboards",
    desc: "Fastest-lap boards on the big screen drive friendly rivalries at corporate trade shows, campuses, and parties.",
  },
  {
    icon: Monitor,
    title: "Giant Screen",
    desc: "Spectators and competitors watch every turn and overtake live on massive external HD displays.",
  },
  {
    icon: Flag,
    title: "Tournament Formats",
    desc: "Time trials, heats and grand finals — delivered, assembled, and fully managed by our racing crew.",
  },
];

const SimRacing = () => {
  const routeSeo = ROUTE_SEO["/sim-racing"];
  const cmsPage = useCmsPage("sim-racing", CMS_PAGES.find((page) => page.slug === "sim-racing"));

  const rawHeroTitle = (cmsPage.heroTitle || "").trim();
  const isDefaultCmsTitle = !rawHeroTitle || rawHeroTitle.toUpperCase() === "SIM RACING";
  const heroTitle = !isDefaultCmsTitle
    ? rawHeroTitle
    : routeSeo.heroDisplayTitle || "SIM RACING COCKPIT & SIMULATOR RENTALS";

  const rawHeroSubtitle = (cmsPage.heroSubtitle || "").trim();
  const isDefaultCmsSubtitle =
    !rawHeroSubtitle ||
    rawHeroSubtitle === "Pro simulators and competitive racing, brought right to your event.";
  const heroSubtitle = isDefaultCmsSubtitle
    ? "Rent a force-feedback racing simulator near you: full cockpit rigs with bucket seats, giant spectator screens & fastest-lap leaderboards delivered across NH, Boston MA, CT & North Carolina."
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
            alt={routeSeo.heading || "Sim Racing Cockpit and Force-Feedback Racing Simulator Rental"}
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
                  RACE-DAY ADRENALINE, ZERO TRACK REQUIRED
                </h2>
              </div>

              <div className="flex flex-col gap-8 lg:col-span-7">
                <p className="text-[17px] leading-relaxed text-white/75 sm:text-[18px]">
                  Force-feedback steering wheels, bucket racing seats, and giant telemetry screens put guests in the driver&apos;s seat—built for corporate trade shows, campus tournaments, dealership activations, and private parties across NH, MA, CT &amp; North Carolina.
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
                Everything Needed For An Authentic Track Experience
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

        {/* ================= COCKPIT SPECS & TOURNAMENTS SECTION ================= */}
        <section className="relative border-t border-white/5 bg-[#05070f] py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mb-12 max-w-3xl">
              <div className="flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-[#7DDDFF]">
                <span className="h-0.5 w-7 bg-[#0066FD]" />
                <span>COCKPIT FOOTPRINT &amp; RACE OPERATIONS</span>
              </div>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold uppercase leading-[1.12] tracking-tight text-white">
                Cockpit Footprint, Telemetry &amp; Tournament Formats
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-white/75">
                Instead of traveling to fixed sim racing places, bring commercial force-feedback cockpit simulators directly to your trade show floor, dealership launch, university quad, or private celebration across NH, Boston MA, CT &amp; North Carolina.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1830] to-[#070e1e] p-7 transition-all duration-300 hover:border-[#0066FD]/50">
                <span className="inline-block rounded-full border border-[#0066FD]/40 bg-[#0066FD]/15 px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-[#7DDDFF]">
                  Booth &amp; Ballroom Ready
                </span>
                <h3 className="mt-4 font-display text-[21px] font-extrabold uppercase tracking-wide text-white">
                  6x8 ft Per Cockpit · Standard 120V
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">
                  Compact commercial chassis clears standard double doors and freight elevators smoothly—requiring only a 6x8 ft floor bay and a standard 120V circuit per racing rig.
                </p>
              </div>

              <div className="rounded-2xl border border-[#0066FD]/45 bg-gradient-to-br from-[#0e1d3b] to-[#070e1e] p-7 shadow-[0_12px_36px_rgba(0,102,253,0.16)] transition-all duration-300 hover:border-[#7DDDFF]/60">
                <span className="inline-block rounded-full border border-[#7DDDFF]/50 bg-[#0066FD]/25 px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-white">
                  Crowd-Stopping Telemetry
                </span>
                <h3 className="mt-4 font-display text-[21px] font-extrabold uppercase tracking-wide text-white">
                  Live Telemetry &amp; Fastest-Lap Boards
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/75">
                  External HD monitors mirror cockpit perspective and real-time sector splits, turning spectators into active racers trying to beat the top lap of the day on your leaderboard.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1830] to-[#070e1e] p-7 transition-all duration-300 hover:border-[#0066FD]/50">
                <span className="inline-block rounded-full border border-[#0066FD]/40 bg-[#0066FD]/15 px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-[#7DDDFF]">
                  Scalable Racing Grid
                </span>
                <h3 className="mt-4 font-display text-[21px] font-extrabold uppercase tracking-wide text-white">
                  Single, Dual &amp; Multi-Rig Heats
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">
                  Deploy one flagship rig for hot-lap sponsor contests or link multiple side-by-side simulators for Formula 1, GT3, NASCAR, and rally elimination heats supervised by our race staff.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/quote?package=Sim%20Racing"
                className="cta-fill inline-flex items-center gap-2 rounded-full blue-gradient-bg px-7 py-3.5 text-[12.5px] font-bold uppercase tracking-wider text-white shadow-[0_8px_28px_rgba(0,102,253,0.4)]"
              >
                <span>Reserve Sim Racing Cockpits</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <RouteLocalSeoSection path="/sim-racing" />

        {/* ================= READY TO LEVEL UP CTA SECTION ================= */}
        <ReadyCTA />
      </main>

      <Footer />
    </div>
  );
};

export default SimRacing;

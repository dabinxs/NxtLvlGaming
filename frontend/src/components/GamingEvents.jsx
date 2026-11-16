import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Monitor,
  Trophy,
  Gamepad2,
  Users,
  Check,
  ArrowRight,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReadyCTA from "./ReadyCTA";
import { useCmsPage } from "../lib/cmsContent";
import { CMS_PAGES } from "../lib/cmsPages";
import { ROUTE_SEO } from "../lib/routeSeoData";

const OVERVIEW_POINTS = [
  "Event & party planning equipment for gamers",
  "Bulk esports rental & tournament bracket production",
  "Giant 12 ft to 40 ft HD screens + modern & retro consoles",
  "Turnkey video game event management in NH, MA, CT & NC",
];

const INCLUDED_FEATURES = [
  {
    icon: Monitor,
    title: "Screens Up To 40 FT",
    desc: "Massive inflatable and frame screens sized to transform student unions, gyms, or ballrooms into live esports arenas.",
  },
  {
    icon: Trophy,
    title: "Tournament Event Production",
    desc: "End-to-end video gaming competition production with bracket management, live audio commentary, and championship finals.",
  },
  {
    icon: Gamepad2,
    title: "PS5, Xbox Series X, Switch & Retro",
    desc: "Equipped with PlayStation 5, Xbox Series X, PS4, Xbox One, Nintendo Switch, and classic NES consoles ready for every player.",
  },
  {
    icon: Users,
    title: "Real-Life Gaming Experience",
    desc: "Spacious open-room multiplayer lounges built for 16 to 64+ simultaneous players—far beyond cramped game trucks.",
  },
];

const GAMING_PACKAGES = [
  {
    id: "deluxe-package",
    name: "Deluxe Package",
    tagline: "(Yes, the screens are really that thin!)",
    badge: "Deluxe Setup",
    image: "/gaming-events-experience-1.jpg",
    quoteParam: "Deluxe gaming",
    paragraphs: [
      "Includes four 12' screens and our giant 21' to 32' high definition screen.",
      "Popular games on PlayStation 5, Xbox Series X, PS4, Xbox One, Nintendo Switch, and classic retro NES titles!",
    ],
    features: [
      "Four 12' screens & giant 21' to 32' HD screen",
      "PlayStation, Xbox, Nintendo Switch & retro library",
      "Popular esports, sports, racing & fighting games",
      "Full turnkey delivery, setup & on-site staff",
    ],
  },
  {
    id: "ultimate-package",
    name: "Ultimate Package",
    tagline: "(Yeah...we know, it's awesome!)",
    badge: "Most Popular",
    popular: true,
    image: "/about-gaming-event.jpg",
    quoteParam: "Ultimate gaming",
    paragraphs: [
      "Includes eight of our 12 ft high definition screens, as well as the giant 26ft HD screen.",
      "Consoles including PlayStation 5, Xbox Series X, Nintendo Switch, PS4, Xbox One, and retro NES systems!",
      "On our Premiere Jumbo Screen: Our virtual dance party, which includes YOU as the DJ via smartphone during the event.",
      "In tournament settings, the finals will be played in front of the entire crowd!",
    ],
    features: [
      "Eight 12 ft HD screens + giant 26 ft HD screen",
      "Full console lineup + classic retro NES games",
      "Virtual dance party with smartphone crowd DJ",
      "Grand tournament finals in front of the entire crowd",
    ],
  },
  {
    id: "tournament-package",
    name: "Bulk Esports & Tournament Package",
    tagline: "Champions are made from this package!",
    badge: "Esports Production",
    image: "/gaming-tournament-package.jpg",
    quoteParam: "Tournament production",
    paragraphs: [
      "Full video game tournament event production for companies, high schools, and entire college campuses. Battle across high definition 12 ft stations.",
      "Live championship streaming is displayed on our HD jumbo 32ft spectator screen for hundreds of cheering fans.",
    ],
    features: [
      "High definition 12 ft player battle stations",
      "HD jumbo 32 ft screen for spectator streaming",
      "Complete video gaming tournament event management",
      "Any competitive esports title & custom brackets",
    ],
  },
];

const GamingEvents = () => {
  const routeSeo = ROUTE_SEO["/gaming-events"];
  const cmsPage = useCmsPage("gaming-events", CMS_PAGES.find((page) => page.slug === "gaming-events"));

  const rawHeroTitle = (cmsPage.heroTitle || "").trim();
  const isDefaultCmsTitle = !rawHeroTitle || rawHeroTitle.toUpperCase() === "VIDEO GAMING EVENTS";
  const heroTitle = !isDefaultCmsTitle
    ? rawHeroTitle
    : routeSeo.heroDisplayTitle || "LIVE VIDEO GAMING EVENTS & ESPORTS RENTALS";

  const rawHeroSubtitle = (cmsPage.heroSubtitle || "").trim();
  const isDefaultCmsSubtitle =
    !rawHeroSubtitle ||
    rawHeroSubtitle === "Turn your next gathering into an unforgettable multiplayer experience.";
  const heroSubtitle = isDefaultCmsSubtitle
    ? "Next Level FEC attractions, live gaming events, esports screening & complete event planning equipment for gamers—featuring video gaming tournament event production across NH, MA, CT & NC."
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
            alt="Live Gaming Events and Esports Tournament Production Setup"
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070f]/92 via-[#05070f]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-[#05070f]/60" />
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-15" />
          <div className="pointer-events-none absolute left-1/3 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FD]/15 blur-[150px]" />

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8">
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
                  ESPORTS RENTAL &amp; REAL-LIFE GAMING PRODUCTION
                </h2>
              </div>

              <div className="flex flex-col gap-8 lg:col-span-7">
                <p className="text-[17px] leading-relaxed text-white/75 sm:text-[18px]">
                  Built as a turnkey Next Level FEC attraction and esports screening setup, we supply full event &amp; party planning equipment for gamers—powering live gaming events, video gaming tournament event management, and competition production with consoles, giant 12–40 ft screens, concert sound, and live bracket crew.
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
                Everything Needed For The Ultimate Setup
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
                THE <span className="blue-gradient-text not-italic">GAMING EVENT EXPERIENCE</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {cmsPage.gallery.slice(0, 3).map((img, i) => (
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
                    <h3 className="font-display text-[18px] font-extrabold uppercase tracking-wide text-white group-hover:text-[#7DDDFF] transition-colors">
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

        {/* ================= PACKAGES SECTION ================= */}
        <section id="packages" className="relative border-t border-white/5 bg-[#05070f] py-24 md:py-32">
          <div className="pointer-events-none absolute right-1/4 top-1/2 h-[400px] w-[600px] -translate-y-1/2 rounded-full bg-[#0066FD]/10 blur-[160px]" />

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-[#7DDDFF]">
                  <span className="h-0.5 w-7 bg-[#0066FD]" />
                  <span>CHOOSE YOUR SETUP</span>
                </div>
                <h2 className="mt-4 font-display text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold uppercase italic leading-none tracking-tight text-white">
                  GAMING EVENT PACKAGES
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-relaxed text-white/70">
                Turnkey packages designed to fit your crowd size, space, and venue. Fully staffed, insured, and built to impress.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {GAMING_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-1 ${
                    pkg.popular
                      ? "border-[#0066FD]/70 bg-gradient-to-b from-[#0e1d3b] to-[#070e1e] shadow-[0_16px_50px_rgba(0,102,253,0.25)] hover:border-[#7DDDFF]"
                      : "border-white/10 bg-gradient-to-b from-[#0c1830] to-[#070b16] hover:border-[#0066FD]/50 hover:shadow-[0_16px_40px_rgba(0,102,253,0.18)]"
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-[#070b16]/40 to-transparent" />

                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg ${
                          pkg.popular
                            ? "border border-[#7DDDFF]/60 bg-[#0066FD]/85 text-white"
                            : "border border-[#0066FD]/50 bg-[#05070f]/85 text-[#7DDDFF]"
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-7">
                    <div>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-display text-[23px] font-extrabold uppercase tracking-wide text-white transition-colors group-hover:text-[#7DDDFF]">
                          {pkg.name}
                        </h3>
                        <p className="text-[14px] italic font-medium text-[#7DDDFF]/90">
                          {pkg.tagline}
                        </p>
                      </div>

                      <div className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-white/75">
                        {pkg.paragraphs.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>

                      <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-[13px] text-white/80">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7DDDFF]" strokeWidth={2.6} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-4">
                      <Link
                        to={`/quote?package=${encodeURIComponent(pkg.quoteParam)}`}
                        className={`cta-fill group/btn flex w-full items-center justify-center gap-2 rounded-full py-3.5 px-6 text-[13px] font-bold uppercase tracking-wider ${
                          pkg.popular
                            ? "blue-gradient-bg text-white shadow-[0_8px_25px_rgba(0,102,253,0.4)] hover:shadow-[0_12px_32px_rgba(0,102,253,0.6)]"
                            : "cta-fill--blue border border-[#0066FD]/60 bg-[#0066FD]/15 text-[#7DDDFF]"
                        }`}
                      >
                        <span>Get A Quote</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
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

export default GamingEvents;

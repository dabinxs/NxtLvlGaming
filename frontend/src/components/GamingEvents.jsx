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

const OVERVIEW_POINTS = [
  "Years of event production experience",
  "Game library across all major consoles",
  "Screens from 12 ft to a massive 32 ft",
  "Fully staffed, insured and turnkey",
];

const INCLUDED_FEATURES = [
  {
    icon: Monitor,
    title: "Screens Up To 32 FT",
    desc: "Massive inflatable and frame screens sized to your crowd and venue.",
  },
  {
    icon: Trophy,
    title: "Gaming Tournaments",
    desc: "Bracketed competition with live scoring, commentary and grand finals on the big screen.",
  },
  {
    icon: Gamepad2,
    title: "Gaming Parties",
    desc: "Consoles like the XBOX One, PlayStation 4, Nintendo Switch, and even retro games like the NES!",
  },
  {
    icon: Users,
    title: "Social Gaming",
    desc: "Lounge-style setups built for crowds — drop in, pick up a controller, play.",
  },
];

const GALLERY_IMAGES = [
  {
    title: "Multiplayer Gaming Stations",
    subtitle: "A range of games set up for guests to play together.",
    src: "/gaming-events-experience-1.png",
  },
  {
    title: "Giant Screen Gaming",
    subtitle: "Bright, large-scale displays bring every match to life.",
    src: "/gaming-events-experience-2.png",
  },
  {
    title: "Campus Gaming Events",
    subtitle: "A full gym transformed into a gaming event space.",
    src: "/gaming-events-experience-3.png",
  },
];

const GAMING_PACKAGES = [
  {
    id: "deluxe-package",
    name: "Deluxe Package",
    tagline: "(Yes, the screens are really that thin!)",
    badge: "Deluxe Setup",
    image: "/experience-gaming-events.avif",
    quoteParam: "Deluxe gaming",
    paragraphs: [
      "Includes four 12' screens and our giant 21' to 32' high definition screen.",
      "Popular games on consoles like the XBOX One, PlayStation 4, Nintendo Switch, and retro games!",
    ],
    features: [
      "Four 12' screens & giant 21' to 32' HD screen",
      "XBOX One, PlayStation 4 & Nintendo Switch",
      "Library of popular games & classic retro titles",
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
      "Consoles like the XBOX One, PlayStation 4, Nintendo Switch, and even retro games like the NES!",
      "On our Premiere Jumbo Screen: Our virtual dance party, which includes YOU as the DJ via smartphone during the event.",
      "In tournament settings, the finals will be played in front of the entire crowd!",
    ],
    features: [
      "Eight 12 ft HD screens + giant 26 ft HD screen",
      "XBOX One, PS4, Nintendo Switch & NES retro games",
      "Virtual dance party with smartphone crowd DJ",
      "Grand tournament finals in front of the entire crowd",
    ],
  },
  {
    id: "tournament-package",
    name: "Tournament Package",
    tagline: "Champions are made from this package!",
    badge: "Esports Edition",
    image: "/gaming-tournament-package.jpg",
    quoteParam: "Tournament production",
    paragraphs: [
      "Compete with colleagues or across an entire campus with our tournament package. Choose from any console game and battle in amazement through our high definition 12 ft screen.",
      "Streaming is included on our HD jumbo 32ft screen for spectators' entertainment.",
    ],
    features: [
      "High definition 12 ft player battle screen",
      "HD jumbo 32 ft screen for spectator streaming",
      "Colleague & campus-wide tournament competition",
      "Choose from any modern console game",
    ],
  },
];

const GamingEvents = () => {
  const cmsPage = useCmsPage("gaming-events", CMS_PAGES.find((page) => page.slug === "gaming-events"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070f] text-foreground">
      <Navbar />

      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
          {/* Background image from gaming events carousel */}
          <img
            src={cmsPage.heroImage}
            alt="Gaming event background"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Subtle directional gradient overlay so the photo is vibrant and visible */}
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
                  A FULL GAMING PRODUCTION, DELIVERED
                </h2>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-8 lg:col-span-7">
                <p className="text-[17px] leading-relaxed text-white/70 sm:text-[18px]">
                  From casual gaming parties to bracketed esports tournaments, we bring the
                  consoles, the giant screens, sound and the staff.
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
                Everything Needed For The Ultimate Setup
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
          {/* Subtle directional glow */}
          <div className="pointer-events-none absolute right-1/4 top-1/2 h-[400px] w-[600px] -translate-y-1/2 rounded-full bg-[#0066FD]/10 blur-[160px]" />

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-[#7DDDFF]">
                  <span className="h-0.5 w-7 bg-[#0066FD]" />
                  <span>CHOOSE YOUR SETUP</span>
                </div>
                <h2 className="mt-4 font-display text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold uppercase italic leading-none tracking-tight text-white">
                  EVENT <span className="blue-gradient-text not-italic">PACKAGES</span>
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-relaxed text-white/70">
                Turnkey packages designed to fit your crowd size, space, and venue. Fully staffed, insured, and built to impress.
              </p>
            </div>

            {/* 3 Package Cards */}
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
                  {/* Package Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-[#070b16]/40 to-transparent" />

                    {/* Badge */}
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

                  {/* Package Details */}
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

                      {/* Info Paragraphs from reference */}
                      <div className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-white/75">
                        {pkg.paragraphs.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>

                      {/* Highlights */}
                      <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-[13px] text-white/80">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7DDDFF]" strokeWidth={2.6} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button linking to quote section */}
                    <div className="mt-8 pt-4">
                      <Link
                        to={`/quote?package=${encodeURIComponent(pkg.quoteParam)}`}
                        className={`group/btn flex w-full items-center justify-center gap-2 rounded-full py-3.5 px-6 text-[13px] font-bold uppercase tracking-wider transition-all duration-300 ${
                          pkg.popular
                            ? "blue-gradient-bg text-white shadow-[0_8px_25px_rgba(0,102,253,0.4)] hover:shadow-[0_12px_32px_rgba(0,102,253,0.6)] hover:scale-[1.02]"
                            : "border border-[#0066FD]/60 bg-[#0066FD]/15 text-[#7DDDFF] hover:bg-[#0066FD] hover:text-white hover:border-[#0066FD]"
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

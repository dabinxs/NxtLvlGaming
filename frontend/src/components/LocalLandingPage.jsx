import React, { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, MapPin, PackageCheck, Truck } from "lucide-react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import TrustedCollaborations from "./TrustedCollaborations";
import ChooseExperience from "./ChooseExperience";
import Testimonials from "./Testimonials";
import ReadyCTA from "./ReadyCTA";
import Footer from "./Footer";
import { ROUTE_SEO } from "../lib/routeSeoData";
import { LOCAL_PAGE_CONFIG } from "../lib/localLandingConfig";
import { useCmsHomeMedia } from "../lib/cmsContent";
import { experiences as defaultExperiences } from "../mock";

const EXPERIENCE_SLUGS = [
  "gaming-events",
  "movie-nights",
  "trivia-nights",
  "virtual-reality",
  "just-dance",
  "silent-disco",
  "sim-racing",
  "photo-booth",
  "glow-park",
];

const LocalLandingPage = () => {
  const { pathname } = useLocation();
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const routeSeo = ROUTE_SEO[normalizedPath] || ROUTE_SEO["/"];
  const localConfig =
    LOCAL_PAGE_CONFIG[normalizedPath] ||
    LOCAL_PAGE_CONFIG["/hudson-nh-party-rentals"];
  const homeMedia = useCmsHomeMedia();

  const mergedHeroSeo = useMemo(
    () => ({
      ...routeSeo,
      heroImageLocal: localConfig.heroImage || routeSeo.heroImageLocal || "/hero-bg.jpg",
    }),
    [routeSeo, localConfig.heroImage]
  );

  const orderedExperiences = useMemo(() => {
    const bySlug = new Map(
      defaultExperiences.map((exp, idx) => {
        const slug = exp.slug || EXPERIENCE_SLUGS[idx];
        return [
          slug,
          {
            ...exp,
            slug,
            image: homeMedia[slug] || exp.image,
          },
        ];
      })
    );

    const ordered = [];
    const seen = new Set();

    (localConfig.experienceOrder || EXPERIENCE_SLUGS).forEach((slug) => {
      const item = bySlug.get(slug);
      if (item && !seen.has(slug)) {
        ordered.push(item);
        seen.add(slug);
      }
    });

    EXPERIENCE_SLUGS.forEach((slug) => {
      const item = bySlug.get(slug);
      if (item && !seen.has(slug)) {
        ordered.push(item);
        seen.add(slug);
      }
    });

    return ordered;
  }, [homeMedia, localConfig.experienceOrder]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [normalizedPath]);

  return (
    <div className="App min-h-screen bg-[#05070f] text-foreground">
      <Navbar />

      <main>
        <Hero
          seo={mergedHeroSeo}
          primaryCta={{
            label: "Request Local Quote",
            to: `/quote?location=${encodeURIComponent(normalizedPath.replace(/^\//, ""))}`,
          }}
        />

        {/* ================= LOCAL DISPATCH, PACKAGES & VENUES ================= */}
        <section className="relative border-t border-white/10 bg-[#070b16] py-20 md:py-28">
          <div className="pointer-events-none absolute right-1/4 top-20 h-[360px] w-[520px] rounded-full bg-[#0066FD]/10 blur-[140px]" />

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8">
            {/* Dispatch Header */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-[#0066FD]/45 bg-[#050a16]/90 px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[#7DDDFF]">
                  <Truck className="h-3.5 w-3.5" />
                  <span>{localConfig.dispatchBadge}</span>
                </div>

                <h2 className="mt-5 font-display text-[clamp(1.85rem,3.9vw,2.95rem)] font-extrabold uppercase leading-[1.08] tracking-tight text-white">
                  {localConfig.sectionTitle}
                </h2>
              </div>

              <div className="lg:col-span-5">
                <p className="text-[15.5px] leading-relaxed text-white/75">
                  {localConfig.dispatchNote}
                </p>
              </div>
            </div>

            {/* 3 Bespoke Regional Packages */}
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {localConfig.featuredPackages.map((pkg, idx) => (
                <div
                  key={pkg.title}
                  className={`flex flex-col justify-between rounded-2xl border p-7 transition-all duration-300 ${
                    idx === 0
                      ? "border-[#0066FD]/60 bg-gradient-to-br from-[#0e1d3b] to-[#070e1e] shadow-[0_12px_36px_rgba(0,102,253,0.18)]"
                      : "border-white/10 bg-gradient-to-br from-[#0c1830] to-[#070e1e] hover:border-[#0066FD]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0066FD]/40 bg-[#0066FD]/15 px-3 py-1 font-display text-[10.5px] font-bold uppercase tracking-wider text-[#7DDDFF]">
                        <PackageCheck className="h-3.5 w-3.5" />
                        <span>{pkg.badge}</span>
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-[21px] font-extrabold uppercase tracking-wide text-white">
                      {pkg.title}
                    </h3>
                    <p className="mt-2 font-display text-[12px] font-bold uppercase tracking-wider text-[#7DDDFF]/90">
                      {pkg.specs}
                    </p>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">
                      {pkg.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                    <Link
                      to={`/quote?package=${encodeURIComponent(pkg.quoteParam)}`}
                      className="inline-flex items-center gap-1.5 rounded-full blue-gradient-bg px-4 py-2 text-[11.5px] font-bold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(0,102,253,0.35)] transition-transform hover:scale-[1.02]"
                    >
                      <span>Quote This</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      to={pkg.href}
                      className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wider text-white/80 hover:text-[#7DDDFF] transition-colors"
                    >
                      <span>View Specs</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Real Local Venues / Campuses / Neighborhoods Grid */}
            <div className="mt-16 border-t border-white/10 pt-14">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-[#7DDDFF]">
                  <span className="h-0.5 w-7 bg-[#0066FD]" />
                  <span>{localConfig.sectionEyebrow}</span>
                </div>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold uppercase tracking-tight text-white">
                  {localConfig.localContextHeading}
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-white/70">
                  {localConfig.localContextCopy}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {localConfig.localVenues.map((venue) => (
                  <div
                    key={venue.name}
                    className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-[#0c1830]/70 p-5 transition-colors hover:border-[#0066FD]/50"
                  >
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#7DDDFF]" />
                    <div>
                      <h4 className="font-display text-[15px] font-extrabold uppercase tracking-wide text-white">
                        {venue.name}
                      </h4>
                      <p className="mt-1 text-[13px] leading-snug text-white/65">
                        {venue.setting}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Localized Experience Carousel starting on city's #1 experience */}
        <ChooseExperience
          experiences={orderedExperiences}
          initialActive={0}
          sectionTitle={localConfig.carouselTitle}
        />

        <TrustedCollaborations />
        <Testimonials />
        <ReadyCTA />
      </main>

      <Footer showQuoteCTA={false} />
    </div>
  );
};

export default LocalLandingPage;

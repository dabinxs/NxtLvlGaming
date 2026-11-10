import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Camera,
  ScanFace,
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
  "360 video photo booth or interactive mirror photo booth",
  "Instant QR & SMS digital sharing + glossy prints",
  "VIP red carpet, stanchions, LED lighting & fun props",
  "Attendant-staffed across NH, Portsmouth, Boston & NC",
];

const INCLUDED_FEATURES = [
  {
    icon: Camera,
    title: "360 Video Booth",
    desc: "Guests step onto our motorized 360 platform as a smooth HD camera circles them for custom-branded slow-motion videos shared via QR or SMS.",
  },
  {
    icon: ScanFace,
    title: "Mirror Photo Booth",
    desc: "An interactive full-length touch-screen Magic Mirror lets guests strike poses, sign the glass, and take home printed keepsake photos.",
  },
];

const normalizePhotoBoothTerm = (value = "") =>
  value.replace(/photobooth/gi, "Photo Booth");

const VideoBooth360 = () => {
  const { pathname } = useLocation();
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const routeSeo = ROUTE_SEO[normalizedPath] || ROUTE_SEO["/photo-booth"];
  const isBaseRoute = normalizedPath === "/photo-booth";

  const cmsPage = useCmsPage("photo-booth", CMS_PAGES.find((page) => page.slug === "photo-booth"));
  const rawHeroTitle = (cmsPage.heroTitle || "").trim();
  const isDefaultCmsTitle =
    !rawHeroTitle ||
    rawHeroTitle.toUpperCase() === "PHOTOBOOTH" ||
    rawHeroTitle.toUpperCase() === "PHOTO BOOTH";

  const heroTitle =
    isBaseRoute && !isDefaultCmsTitle
      ? normalizePhotoBoothTerm(rawHeroTitle)
      : routeSeo.heroDisplayTitle || "PHOTO BOOTH RENTALS — 360 VIDEO & MIRROR BOOTHS";

  const rawHeroSubtitle = (cmsPage.heroSubtitle || "").trim();
  const isDefaultCmsSubtitle =
    !rawHeroSubtitle ||
    rawHeroSubtitle === "Capture, create, and share amazing moments instantly.";

  const heroSubtitle = !isBaseRoute
    ? routeSeo.heroSubtitleOverride || cmsPage.heroSubtitle
    : isDefaultCmsSubtitle
      ? "Turnkey 360 slow-motion video booths and full-length Magic Mirror photo booth rentals with red carpet, props, custom overlays & instant sharing across Portsmouth, Manchester, Nashua, Hudson NH, Boston & NC."
      : normalizePhotoBoothTerm(cmsPage.heroSubtitle);

  const heroTagline =
    routeSeo.heroTagline || "360 Video Photo Booth  /  Interactive Mirror Photo Booth";

  const heroImage = !isBaseRoute && normalizedPath === "/360-video-booth"
    ? "/photo-booth-experience-2.png"
    : !isBaseRoute && normalizedPath === "/mirror-photo-booth-rental"
      ? "/photo-booth-experience-1.png"
      : cmsPage.heroImage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [normalizedPath]);

  return (
    <div className="min-h-screen bg-[#05070f] text-foreground">
      <Navbar />

      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
          <img
            src={heroImage}
            alt={routeSeo.heading || "360 Video Booth and Mirror Photo Booth Rental Setup"}
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

            <h1 className="max-w-4xl font-display text-[clamp(2.25rem,5.8vw,4.5rem)] font-extrabold uppercase italic leading-[1.04] tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.9)]">
              {heroTitle}
            </h1>

            <p className="mt-5 font-display text-[14px] font-bold uppercase tracking-[0.16em] text-white/90 sm:text-[17px]">
              {heroTagline}
            </p>
            <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-white/90 drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] sm:text-[18px]">
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
                  STEP INSIDE THE PHOTO BOOTH EXPERIENCE
                </h2>
              </div>

              <div className="flex flex-col gap-8 lg:col-span-7">
                <p className="text-[17px] leading-relaxed text-white/75 sm:text-[18px]">
                  Choose the 360 video photo booth for cinematic slow-motion clips or the interactive mirror photo booth for full-length poses and glossy keepsake prints. Delivered turnkey across Portsmouth, Dover, Exeter, Hudson, Nashua, Manchester, and Concord NH, Greater Boston MA, and North Carolina.
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
                Choose Your Photo Booth Experience
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {INCLUDED_FEATURES.map((item) => {
                const IconComponent = item.icon;
                const isFeatured =
                  routeSeo.featuredCard &&
                  item.title.toLowerCase() === routeSeo.featuredCard.toLowerCase();
                return (
                  <div
                    key={item.title}
                    className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-[#0c1830] to-[#070e1e] p-8 transition-all duration-300 ${
                      isFeatured
                        ? "border-[#0099FF]/75 shadow-[0_14px_40px_rgba(0,102,253,0.28)]"
                        : "border-white/10 hover:border-[#0066FD]/50 hover:shadow-[0_12px_36px_rgba(0,102,253,0.18)]"
                    }`}
                  >
                    {isFeatured && (
                      <span className="absolute right-6 top-6 rounded-full border border-[#7DDDFF]/50 bg-[#0066FD]/25 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-[#7DDDFF]">
                        Featured Setup
                      </span>
                    )}
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
                      alt={normalizePhotoBoothTerm(img.title)}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-[18px] font-extrabold uppercase tracking-wide text-white group-hover:text-[#7DDDFF] transition-colors">
                      {normalizePhotoBoothTerm(img.title)}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">
                      {normalizePhotoBoothTerm(img.subtitle)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RouteLocalSeoSection path={normalizedPath} />

        {/* ================= READY TO LEVEL UP CTA SECTION ================= */}
        <ReadyCTA />
      </main>

      <Footer />
    </div>
  );
};

export default VideoBooth360;

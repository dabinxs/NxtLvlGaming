import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, MapPin, Phone } from "lucide-react";
import { NH_CITY_LINKS, ROUTE_SEO } from "../lib/routeSeoData";

const RouteLocalSeoSection = ({ path = "/", variant = "default" }) => {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  const seo = ROUTE_SEO[normalizedPath] || ROUTE_SEO["/"];
  if (!seo || seo.noindex || (!seo.summary && !seo.faqs?.length)) {
    return null;
  }

  const isNovelties = variant === "novelties";
  const bgSection = isNovelties ? "bg-[#030c18]" : "bg-[#070b16]";
  const accentText = isNovelties ? "text-[#0099FF]" : "text-[#7DDDFF]";
  const accentBar = isNovelties ? "bg-[#0099FF]" : "bg-[#0066FD]";
  const cardSurface = isNovelties
    ? "border-[#0099FF]/20 bg-[#05152b]/85 hover:border-[#0099FF]/50"
    : "border-white/10 bg-[#0c1830]/75 hover:border-[#0066FD]/50";
  const linkPillClass = isNovelties
    ? "border-[#0099FF]/25 bg-[#061833]/80 text-white/85 hover:border-[#0099FF] hover:text-[#7DDDFF]"
    : "border-white/15 bg-[#0c1830]/80 text-white/85 hover:border-[#0066FD]/60 hover:text-[#7DDDFF]";

  const relatedLinks =
    Array.isArray(seo.relatedLinks) && seo.relatedLinks.length > 0
      ? seo.relatedLinks
      : NH_CITY_LINKS;

  return (
    <section
      id="service-area-details"
      aria-label={seo.subhead || seo.heading || "Service Area & Frequently Asked Questions"}
      className={`relative border-t border-white/10 ${bgSection} py-20 md:py-28`}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        {/* Top Local Context & Highlights Grid */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className={`flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] ${accentText}`}>
              <span className={`h-0.5 w-7 ${accentBar}`} />
              <span>SERVICE AREAS &amp; SPECS</span>
            </div>

            <h2 className="mt-4 font-display text-[clamp(1.65rem,3.3vw,2.45rem)] font-extrabold uppercase leading-[1.12] tracking-tight text-white">
              {seo.subhead || seo.heading}
            </h2>

            <div className="mt-6 rounded-2xl border border-white/10 bg-[#050a16]/80 p-5 text-[13px] leading-relaxed text-white/75">
              <div className="flex items-start gap-2.5 text-white/90 font-semibold">
                <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${accentText}`} />
                <span>HQ: Hudson, NH 03051 &amp; North Carolina Branch</span>
              </div>
              <div className="mt-2.5 flex items-center gap-2.5 text-white/80">
                <Phone className={`h-4 w-4 shrink-0 ${accentText}`} />
                <a href="tel:9786015473" className="font-semibold hover:text-[#7DDDFF] transition-colors">
                  978-601-5473
                </a>
                <span className="text-white/35">·</span>
                <span className="text-white/65">NH · MA · CT · RI · NC</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={isNovelties ? "/novelty-order" : "/quote"}
                className="cta-fill inline-flex items-center gap-2 rounded-full blue-gradient-bg px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(0,102,253,0.35)]"
              >
                <span>{isNovelties ? "Order Custom Novelties" : "Check Date & Quote"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              {isNovelties && (
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[12px] font-bold uppercase tracking-wider text-white/90 transition-colors hover:border-[#0099FF]/60 hover:text-white"
                >
                  <span>Full Event Quote</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7">
            {seo.summary && (
              <p className="text-[16px] leading-relaxed text-white/80 sm:text-[17px]">
                {seo.summary}
              </p>
            )}
            {seo.details && (
              <p className="text-[15px] leading-relaxed text-white/65">
                {seo.details}
              </p>
            )}

            {Array.isArray(seo.highlights) && seo.highlights.length > 0 && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
                {seo.highlights.map((item) => (
                  <div
                    key={item}
                    className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 backdrop-blur-sm transition-colors duration-300 ${cardSurface}`}
                  >
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${accentText}`} strokeWidth={2.5} />
                    <span className="text-[13px] font-medium leading-snug text-white/90">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Turnkey Package Summary Cards (when defined on route) */}
        {Array.isArray(seo.offers) && seo.offers.length > 0 && (
          <div className="mt-14 border-t border-white/10 pt-12">
            <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.2em] text-[#7DDDFF]">
              Available Rental Packages &amp; Setups
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {seo.offers.slice(0, 6).map((offer) => (
                <div
                  key={offer.name}
                  className={`rounded-2xl border p-5 transition-colors duration-300 ${cardSurface}`}
                >
                  <h4 className="font-display text-[15px] font-extrabold uppercase tracking-wide text-white">
                    {offer.name}
                  </h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/65">
                    {offer.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visible Frequently Asked Questions */}
        {Array.isArray(seo.faqs) && seo.faqs.length > 0 && (
          <div className="mt-14 border-t border-white/10 pt-12">
            <div className={`flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] ${accentText}`}>
              <span className={`h-0.5 w-7 ${accentBar}`} />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <dl className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {seo.faqs.map((faq) => (
                <div
                  key={faq.q}
                  className={`rounded-2xl border p-5 transition-colors duration-300 ${cardSurface}`}
                >
                  <dt className="font-display text-[15px] font-bold leading-snug text-white">
                    {faq.q}
                  </dt>
                  <dd className="mt-2 text-[13.5px] leading-relaxed text-white/70">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Visible Related Internal Links */}
        {relatedLinks.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-10">
            <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.2em] text-white/60">
              Explore Related Services &amp; Service Areas
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {relatedLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-all duration-200 ${linkPillClass}`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-75" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RouteLocalSeoSection;

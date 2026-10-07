import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { footerColumns } from "../mock";
import InteractiveWordmark from "./InteractiveWordmark";

const Footer = () => {

  return (
    <footer
      id="footer"
      className="footer-shell relative mx-3 mt-10 overflow-hidden rounded-t-[42px] pt-20 md:mx-6"
      style={{ background: "linear-gradient(180deg, #202F49 0%, #010E26 100%)" }}
    >
      {/* soft blue wash across the top edge */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-52 w-[70%] -translate-x-1/2 rounded-full bg-[#0066FD]/20 blur-[90px]" />

      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-[55%_1fr] lg:pr-12">
          {/* Left: CTA */}
          <div className="min-w-0">
            <p className="mt-0 font-display text-sm font-medium uppercase tracking-[0.2em] text-[#6ea8ff]">
              Ready To Level Up Your Event?
            </p>
            <a
              href="mailto:sales@nextlevelgamingevents.com"
              data-testid="footer-email"
              className="group mt-3 flex w-full items-center gap-3 font-display text-[clamp(1rem,1.8vw,1.65rem)] font-bold text-white transition-colors hover:text-[#7DDDFF]"
              style={{ fontWeight: 700 }}
            >
              <span className="whitespace-nowrap">sales@nextlevelgamingevents.com</span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#7DDDFF] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <a
              href="tel:9786015473"
              data-testid="footer-phone"
              className="mt-3 inline-flex items-center gap-2 font-display text-[17px] md:text-[19px] font-bold tracking-wide text-white/90 transition-colors hover:text-[#7DDDFF]"
            >
              <span>978-601-5473</span>
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-full blue-gradient-bg px-6 py-3 text-[12px] font-semibold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(0,102,253,0.35)] transition-transform hover:scale-[1.04]"
              >
                Get A Quote
              </Link>
              <span
                data-testid="footer-tagline"
                className="flex items-center gap-2.5 text-[15px] font-medium text-white/85"
              >
                <span className="h-2 w-2 rounded-full bg-[#7DDDFF] shadow-[0_0_10px_rgba(125,221,255,0.8)]" />
                Let's create an unforgettable experience
              </span>
            </div>
          </div>

          {/* Right: link columns */}
          <div className="grid shrink-0 grid-cols-3 gap-x-16 gap-y-6 self-start pt-2">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4d9bff]">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      {link === "Contact" ? (
                        <Link to="/contact" className="whitespace-nowrap text-[12.5px] text-white/65 transition-colors hover:text-[#7DDDFF]">
                          {link}
                        </Link>
                      ) : (
                        <a href="#top" className="whitespace-nowrap text-[12.5px] text-white/65 transition-colors hover:text-[#7DDDFF]">
                          {link}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="relative mt-16 select-none">
          <InteractiveWordmark
            className="flex items-baseline justify-center gap-[0.06em] whitespace-nowrap font-display text-[clamp(2.6rem,13.5vw,12rem)] font-black italic leading-[0.9] tracking-[-0.03em]"
            segments={[
              { text: "NEXT", className: "text-white" },
              { text: "LEVEL", gradient: true },
            ]}
          />
        </div>
      </div>

      {/* copyright bar */}
      <div className="mt-8 py-6">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 px-5 md:flex-row md:gap-6 md:px-8">
          <div className="flex shrink-0 items-center gap-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="footer-slash" />
              <span className="footer-slash" />
              <span className="footer-slash" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">
              Next Level Gaming Events
            </span>
          </div>
          <span className="hidden h-px flex-1 bg-white/20 md:block" />
          <span className="shrink-0 text-[11px] uppercase tracking-[0.15em] text-white/40">
            © 2023 Next Level Gaming. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

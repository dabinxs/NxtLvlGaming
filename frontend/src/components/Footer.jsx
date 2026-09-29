import React from "react";
import { ArrowUpRight } from "lucide-react";
import { footerColumns } from "../mock";
import LogoMark from "./LogoMark";

const Footer = () => {
  return (
    <footer id="footer" className="relative overflow-hidden bg-[#070b16] pt-20">
      {/* top rounded glow border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0066FD]/50 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: CTA */}
          <div>
            <LogoMark />
            <p className="mt-8 font-display text-sm font-medium uppercase tracking-[0.2em] text-[#6ea8ff]">
              Ready To Level Up Your Event?
            </p>
            <a
              href="mailto:sales@nextlevelgamingevents.com"
              className="group mt-3 inline-flex items-center gap-2 font-display text-[clamp(1.4rem,3.5vw,2.2rem)] font-bold text-white transition-colors hover:text-[#7DDDFF]"
              style={{ fontWeight: 700 }}
            >
              sales@nextlevelgamingevents.com
              <ArrowUpRight className="h-6 w-6 text-[#7DDDFF] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#top"
                className="inline-flex items-center gap-2 rounded-full blue-gradient-bg px-6 py-3 text-[12px] font-semibold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(0,102,253,0.35)] transition-transform hover:scale-[1.04]"
              >
                Get A Quote
              </a>
              <span className="flex items-center gap-2 text-sm text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7DDDFF]" />
                Let's create an unforgettable experience
              </span>
            </div>
          </div>

          {/* Right: link columns */}
          <div className="grid grid-cols-3 gap-6">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-[13px] text-white/70 transition-colors hover:text-[#7DDDFF]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="relative mt-16 select-none">
          <div className="flex justify-between font-display text-[clamp(3rem,15vw,13rem)] font-black italic leading-none tracking-tight" style={{ fontWeight: 900 }}>
            <span className="text-white">NEXT</span>
            <span className="blue-gradient-text">LEVEL</span>
          </div>
        </div>
      </div>

      {/* copyright bar */}
      <div className="mt-6 border-t border-white/5 py-5">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-2 px-5 text-[11px] uppercase tracking-[0.15em] text-white/40 md:flex-row md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <span className="h-2.5 w-6 blue-gradient-bg" />
              <span className="h-2.5 w-2.5 bg-white/20" />
              <span className="h-2.5 w-2.5 bg-white/20" />
            </div>
            <span>Next Level Gaming Events</span>
          </div>
          <span>© 2023 Next Level Gaming. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

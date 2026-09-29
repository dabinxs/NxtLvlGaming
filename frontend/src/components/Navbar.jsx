import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Gamepad2,
  Trophy,
  Users,
  Clapperboard,
  Projector,
  Film,
  Brain,
  Lightbulb,
  ListChecks,
  Glasses,
  Music,
  Headphones,
  Car,
  Camera,
} from "lucide-react";
import { navLinks, megaMenus } from "../mock";
import LogoMark from "./LogoMark";

const ICONS = {
  Gamepad2,
  Trophy,
  Users,
  Clapperboard,
  Projector,
  Film,
  Brain,
  Lightbulb,
  ListChecks,
  Glasses,
  Music,
  Headphones,
  Car,
  Camera,
};

const Icon = ({ name, className }) => {
  const Cmp = ICONS[name] || Gamepad2;
  return <Cmp className={className} />;
};

const MegaPanel = ({ menuKey }) => {
  const menu = megaMenus[menuKey];
  return (
    <div key={menuKey} className="mega-fade grid gap-10 lg:grid-cols-[1fr_300px]">
      <div
        className={`grid gap-x-10 gap-y-9 ${
          menu.groups.length > 3 ? "md:grid-cols-3" : "md:grid-cols-3"
        }`}
      >
        {menu.groups.map((g, gi) => (
          <div
            key={g.title}
            className="mega-stagger"
            style={{ animationDelay: `${60 + gi * 55}ms` }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Icon name={g.icon} className="h-4 w-4 text-[#7DDDFF]" />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/45">
                {g.title}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {g.items.map((it) => (
                <a
                  key={it.title}
                  href="#footer"
                  data-testid={`mega-item-${it.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group flex gap-3 rounded-xl p-2 -m-2 transition-colors hover:bg-white/[0.05]"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-[#0066FD]/60 group-hover:bg-[#0066FD]/15">
                    <Icon name={it.icon} className="h-4 w-4 text-white/80 group-hover:text-[#7DDDFF]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-bold text-white transition-colors group-hover:text-[#7DDDFF]">
                      {it.title}
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-[1.5] text-white/50">
                      {it.desc}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mega-stagger relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0066FD]/20 via-[#0b1226] to-[#060a15] p-6"
        style={{ animationDelay: "240ms" }}
        data-testid="mega-spotlight"
      >
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#0066FD]/40 blur-3xl" />
        <span className="relative text-[10px] font-black uppercase tracking-[0.22em] text-[#7DDDFF]">
          {menu.spotlight.tag}
        </span>
        <h4 className="relative mt-3 text-xl font-extrabold leading-tight text-white">
          {menu.spotlight.title}
        </h4>
        <p className="relative mt-2 text-[13px] leading-relaxed text-white/55">
          {menu.spotlight.desc}
        </p>
        <a
          href="#footer"
          className="relative mt-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:text-[#7DDDFF]"
        >
          {menu.spotlight.cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = (key) => {
    clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 140);
  };

  return (
    <header
      data-testid="site-navbar"
      onMouseLeave={scheduleClose}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || activeMenu
          ? "bg-[#060a15]/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" aria-label="Next Level Gaming Events">
          <LogoMark />
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((l) =>
            l.menu ? (
              <button
                key={l.label}
                data-testid={`nav-trigger-${l.menu}`}
                onMouseEnter={() => openMenu(l.menu)}
                onClick={() => setActiveMenu(activeMenu === l.menu ? null : l.menu)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-[13px] font-medium tracking-[0.12em] transition-all duration-300 ${
                  activeMenu === l.menu
                    ? "bg-white/[0.08] text-white"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {l.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    activeMenu === l.menu ? "rotate-180 text-[#7DDDFF]" : ""
                  }`}
                />
              </button>
            ) : (
              <a
                key={l.label}
                href={l.href}
                onMouseEnter={scheduleClose}
                className="rounded-full px-4 py-2 font-display text-[13px] font-medium tracking-[0.12em] text-white/75 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#footer"
            className="group hidden items-center gap-2 rounded-full blue-gradient-bg px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_6px_20px_rgba(0,102,253,0.35)] transition-transform hover:scale-[1.03] sm:flex"
          >
            GET A QUOTE
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            className="text-white lg:hidden"
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Full-width mega panel */}
      <div
        className={`hidden overflow-hidden border-white/5 bg-[#060a15]/95 backdrop-blur-2xl transition-[max-height,opacity] duration-400 lg:block ${
          activeMenu
            ? "max-h-[640px] border-t opacity-100"
            : "max-h-0 border-t-0 opacity-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
        data-testid="mega-panel"
        onMouseEnter={() => clearTimeout(closeTimer.current)}
      >
        <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-8">
          {activeMenu && <MegaPanel menuKey={activeMenu} />}
        </div>
      </div>

      {/* Mobile accordion menu */}
      {open && (
        <div
          className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-white/5 bg-[#060a15]/97 px-6 py-5 backdrop-blur-xl lg:hidden"
          data-testid="mobile-menu"
        >
          <div className="flex flex-col divide-y divide-white/5">
            {navLinks.map((l) =>
              l.menu ? (
                <div key={l.label} className="py-3">
                  <button
                    data-testid={`mobile-accordion-${l.menu}`}
                    onClick={() =>
                      setMobileAccordion(mobileAccordion === l.menu ? null : l.menu)
                    }
                    className="flex w-full items-center justify-between font-display text-sm font-bold tracking-[0.1em] text-white"
                  >
                    {l.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        mobileAccordion === l.menu ? "rotate-180 text-[#7DDDFF]" : "text-white/50"
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-400 ${
                      mobileAccordion === l.menu
                        ? "mt-4 max-h-[1400px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                  >
                    <div className="flex flex-col gap-5 pb-2">
                      {megaMenus[l.menu].groups.map((g) => (
                        <div key={g.title}>
                          <div className="mb-3 flex items-center gap-2">
                            <Icon name={g.icon} className="h-3.5 w-3.5 text-[#7DDDFF]" />
                            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/40">
                              {g.title}
                            </span>
                          </div>
                          <div className="flex flex-col gap-3">
                            {g.items.map((it) => (
                              <a
                                key={it.title}
                                href="#footer"
                                onClick={() => setOpen(false)}
                                className="flex gap-3"
                                data-testid={`mobile-mega-item-${it.title
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                              >
                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                                  <Icon name={it.icon} className="h-3.5 w-3.5 text-[#7DDDFF]" />
                                </span>
                                <span>
                                  <span className="block text-[13.5px] font-bold text-white">
                                    {it.title}
                                  </span>
                                  <span className="mt-0.5 block text-[12px] leading-[1.5] text-white/50">
                                    {it.desc}
                                  </span>
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 font-display text-sm font-bold tracking-[0.1em] text-white/80"
                >
                  {l.label}
                </a>
              )
            )}
          </div>
          <a
            href="#footer"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-full blue-gradient-bg px-5 py-2.5 text-[13px] font-semibold text-white"
          >
            GET A QUOTE <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;

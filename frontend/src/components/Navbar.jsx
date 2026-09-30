import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowDownRight,
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
    <div
      key={menuKey}
      className="mega-fade grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {menu.items.map((it, i) => (
        <a
          key={it.title}
          href="#footer"
          data-testid={`mega-item-${it.title.toLowerCase().replace(/\s+/g, "-")}`}
          className="mega-stagger group flex gap-4 rounded-2xl p-4 -m-1 transition-colors hover:bg-white/[0.05]"
          style={{ animationDelay: `${60 + i * 55}ms` }}
        >
          <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-[#0066FD]/60 group-hover:bg-[#0066FD]/15">
            <Icon
              name={it.icon}
              className="h-5 w-5 text-white/80 transition-colors group-hover:text-[#7DDDFF]"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-[16px] font-bold text-white transition-colors group-hover:text-[#7DDDFF]">
              {it.title}
            </span>
            <span className="mt-1.5 block text-[13px] leading-[1.55] text-white/50">
              {it.desc}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
};

const STRIP = 14; // full-width top strip height
const FILLET = 24; // concave curve joining strip + island
const RADIUS = 26; // island bottom corners

// One continuous SVG silhouette: top strip -> concave fillets -> rounded island
const NavShape = ({ w, h, x0, x1 }) => {
  if (!w || !h) return null;
  const fill = `M0 0 H${w} V${STRIP} H${x1 + FILLET} A${FILLET} ${FILLET} 0 0 0 ${x1} ${
    STRIP + FILLET
  } V${h - RADIUS} A${RADIUS} ${RADIUS} 0 0 1 ${x1 - RADIUS} ${h} H${
    x0 + RADIUS
  } A${RADIUS} ${RADIUS} 0 0 1 ${x0} ${h - RADIUS} V${
    STRIP + FILLET
  } A${FILLET} ${FILLET} 0 0 0 ${x0 - FILLET} ${STRIP} H0 Z`;

  const outline = `M0 ${STRIP} H${x0 - FILLET} A${FILLET} ${FILLET} 0 0 1 ${x0} ${
    STRIP + FILLET
  } V${h - RADIUS} A${RADIUS} ${RADIUS} 0 0 0 ${x0 + RADIUS} ${h} H${
    x1 - RADIUS
  } A${RADIUS} ${RADIUS} 0 0 0 ${x1} ${h - RADIUS} V${
    STRIP + FILLET
  } A${FILLET} ${FILLET} 0 0 1 ${x1 + FILLET} ${STRIP} H${w}`;

  return (
    <svg
      aria-hidden="true"
      data-testid="nav-shape"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="pointer-events-none absolute left-0 top-0"
      style={{ filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.5))" }}
    >
      <path d={fill} fill="#141b2e" />
      <path
        d={outline}
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1"
      />
    </svg>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [shape, setShape] = useState({ w: 0, h: 0, x0: 0, x1: 0 });
  const closeTimer = useRef(null);
  const islandRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      const el = islandRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setShape({
        w: window.innerWidth,
        h: Math.round(r.height),
        x0: Math.round(r.left),
        x1: Math.round(r.right),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (islandRef.current) ro.observe(islandRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

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
      className="fixed inset-x-0 top-0 z-50"
    >
      <NavShape {...shape} />

      <div
        ref={islandRef}
        className="relative mx-auto w-full max-w-[1180px]"
      >
      <div className="flex items-center justify-between px-5 py-3 md:px-7">
        <a href="#top" aria-label="Next Level Gaming Events">
          <LogoMark />
        </a>

        <nav
          data-testid="nav-links-pill"
          className="hidden items-center gap-1 rounded-2xl border border-white/[0.06] px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] lg:flex"
          style={{ background: "linear-gradient(180deg, #2C2C2C 0%, #121212 100%)" }}
        >
          {navLinks.map((l) =>
            l.menu ? (
              <button
                key={l.label}
                data-testid={`nav-trigger-${l.menu}`}
                onMouseEnter={() => openMenu(l.menu)}
                onClick={() => setActiveMenu(activeMenu === l.menu ? null : l.menu)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-display text-[15px] font-bold capitalize transition-all duration-300 ${
                  activeMenu === l.menu
                    ? "bg-white/[0.08] text-white"
                    : "text-white hover:bg-white/[0.06]"
                }`}
              >
                {l.label.toLowerCase()}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    activeMenu === l.menu ? "rotate-180 text-[#7DDDFF]" : ""
                  }`}
                />
              </button>
            ) : (
              <a
                key={l.label}
                href={l.href}
                onMouseEnter={scheduleClose}
                className="rounded-xl px-4 py-2 font-display text-[15px] font-bold capitalize text-white transition-colors hover:bg-white/[0.06]"
              >
                {l.label.toLowerCase()}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#footer"
            data-testid="nav-quote-cta"
            className="group hidden items-stretch overflow-hidden rounded-xl border border-white/10 transition-all duration-300 hover:border-[#0066FD]/50 sm:flex"
          >
            <span className="flex items-center bg-white/[0.06] px-5 py-2.5 text-[12.5px] font-bold tracking-[0.06em] text-white transition-colors group-hover:bg-white/[0.1]">
              GET A QUOTE
            </span>
            <span className="blue-gradient-bg flex items-center px-3 text-white">
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </span>
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

      {/* Mega panel inside the nav island */}
      <div
        className={`hidden overflow-hidden border-white/[0.07] transition-[max-height,opacity] duration-400 lg:block ${
          activeMenu
            ? "max-h-[640px] border-t opacity-100"
            : "max-h-0 border-t-0 opacity-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
        data-testid="mega-panel"
        onMouseEnter={() => clearTimeout(closeTimer.current)}
      >
        <div className="px-6 py-9 md:px-8">
          {activeMenu && <MegaPanel menuKey={activeMenu} />}
        </div>
      </div>

      {/* Mobile accordion menu */}
      {open && (
        <div
          className="max-h-[calc(100vh-96px)] overflow-y-auto border-t border-white/[0.07] px-6 py-5 lg:hidden"
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
                    <div className="flex flex-col gap-4 pb-2">
                      {megaMenus[l.menu].items.map((it) => (
                        <a
                          key={it.title}
                          href="#footer"
                          onClick={() => setOpen(false)}
                          className="flex gap-3"
                          data-testid={`mobile-mega-item-${it.title
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                            <Icon name={it.icon} className="h-4 w-4 text-[#7DDDFF]" />
                          </span>
                          <span>
                            <span className="block text-[14px] font-bold text-white">
                              {it.title}
                            </span>
                            <span className="mt-0.5 block text-[12.5px] leading-[1.5] text-white/50">
                              {it.desc}
                            </span>
                          </span>
                        </a>
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
      </div>
    </header>
  );
};

export default Navbar;

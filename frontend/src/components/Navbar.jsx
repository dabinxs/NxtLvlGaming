import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ArrowUpRight,
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
  Sparkles,
} from "lucide-react";
import { navLinks, megaMenus } from "../mock";
import MobileBottomNav from "./MobileBottomNav";

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
  Sparkles,
};

const Icon = ({ name, className }) => {
  const Cmp = ICONS[name] || Gamepad2;
  return <Cmp className={className} />;
};

const NavDropdown = ({ menuKey }) => {
  const menu = megaMenus[menuKey];
  if (!menu) return null;
  return (
    <div className="flex flex-col gap-3">
      {menu.items.map((it) => (
        <Link
          key={it.title}
          to={it.href || "#footer"}
          data-testid={`menu-item-${it.title.toLowerCase().replace(/\s+/g, "-")}`}
          className="group flex items-center gap-3.5 rounded-[16px] p-2.5 transition-colors hover:bg-white/[0.08]"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-[#293d6b]/45 transition-all duration-200 group-hover:border-[#0066FD]/60 group-hover:bg-[#0066FD]/20">
            <Icon
              name={it.icon}
              className="h-5 w-5 text-white/85 transition-colors group-hover:text-[#7DDDFF]"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-[14px] font-bold text-white transition-colors group-hover:text-[#7DDDFF]">
              {it.title}
            </span>
            <span className="mt-1 block text-[12px] leading-snug text-white/55">
              {it.desc}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
};

const Navbar = ({ topOnly = false }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const closeTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        setShowNavbar(true);
      } else if (topOnly) {
        // On focused tools, keep the workspace clear while scrolling back up.
        // The nav returns only when the page itself reaches the top.
        setShowNavbar(false);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling down -> hide navbar
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling up -> show navbar
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [topOnly]);

  const openMenu = (key) => {
    clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <>
      <header
        data-testid="site-navbar"
        onMouseLeave={scheduleClose}
        className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-5 transition-transform duration-500 ease-in-out ${
          showNavbar ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img
              src="/logo-3d.png"
              alt="Next Level Gaming and Novelties"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <nav
            data-testid="nav-links-pill"
            className="hidden items-center gap-2 rounded-[26px] border-2 border-white/[0.09] px-6 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] lg:flex"
            style={{ background: "linear-gradient(180deg, #031138 0%, #223566 100%)" }}
          >
            {navLinks.map((l) =>
              l.menu ? (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => openMenu(l.menu)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    data-testid={`nav-trigger-${l.menu}`}
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

                  {/* Floating Popover Dropdown directly under the nav item */}
                  {activeMenu === l.menu && (
                    <div
                      data-testid={`dropdown-${l.menu}`}
                      className="absolute left-0 top-full mt-6 w-[340px] rounded-[22px] border-2 border-white/[0.09] p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl z-50 before:absolute before:-top-6 before:inset-x-0 before:h-6"
                      style={{
                        background: "linear-gradient(180deg, #031138 0%, #1e2e58 100%)",
                      }}
                      onMouseEnter={() => clearTimeout(closeTimer.current)}
                      onMouseLeave={scheduleClose}
                    >
                      <NavDropdown menuKey={l.menu} />
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.label}
                  to={l.href.startsWith("#") ? `/${l.href}` : l.href}
                  onMouseEnter={scheduleClose}
                  className="rounded-xl px-4 py-2 font-display text-[15px] font-bold capitalize text-white transition-colors hover:bg-white/[0.06]"
                >
                  {l.label.toLowerCase()}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Top Quote CTA */}
          <Link
            to="/quote"
            data-testid="mobile-top-quote"
            className="cta-fill inline-flex lg:hidden items-center gap-1.5 rounded-full bg-[#0066CC] px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(0,102,204,0.35)] active:scale-95 transition-all"
          >
            <span>Get Quote</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          {/* Desktop Top Quote CTA */}
          <Link
            to="/quote"
            data-testid="nav-get-quote"
            className="cta-fill group hidden items-center gap-2 rounded-full bg-[#0066CC] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.04em] text-white shadow-[0_6px_20px_rgba(0,102,204,0.3)] hover:shadow-[0_8px_28px_rgba(0,102,204,0.45)] lg:inline-flex"
          >
            Get A Quote
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </div>
      </header>

      {/* Mobile Floating Bottom Nav Capsule Dock */}
      <MobileBottomNav />
    </>
  );
};

export default Navbar;

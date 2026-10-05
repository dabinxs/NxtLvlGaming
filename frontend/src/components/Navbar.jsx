import React, { useRef, useState, useEffect } from "react";
import {
  Menu,
  X,
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
} from "lucide-react";
import { navLinks, megaMenus } from "../mock";

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

const NavDropdown = ({ menuKey }) => {
  const menu = megaMenus[menuKey];
  if (!menu) return null;
  return (
    <div className="flex flex-col gap-3">
      {menu.items.map((it) => (
        <a
          key={it.title}
          href={it.href || "#footer"}
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
        </a>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const closeTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        setShowNavbar(true);
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
  }, []);

  const openMenu = (key) => {
    clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <header
      data-testid="site-navbar"
      onMouseLeave={scheduleClose}
      className={`fixed inset-x-0 top-0 z-50 px-4 pt-5 transition-transform duration-500 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full pointer-events-none"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <a href="/" className="flex items-center group">
          <img
            src="/logo-3d.png"
            alt="Next Level Gaming and Novelties"
            className="h-20 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>
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
              <a
                key={l.label}
                href={l.href.startsWith("#") ? `/${l.href}` : l.href}
                onMouseEnter={scheduleClose}
                className="rounded-xl px-4 py-2 font-display text-[15px] font-bold capitalize text-white transition-colors hover:bg-white/[0.06]"
              >
                {l.label.toLowerCase()}
              </a>
            )
          )}
        </nav>

        <button
          className="flex h-14 w-14 items-center justify-center rounded-[22px] border-2 border-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] lg:hidden"
          style={{ background: "linear-gradient(180deg, #031138 0%, #223566 100%)" }}
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <a
          href="#footer"
          data-testid="nav-get-quote"
          className="group hidden items-center gap-2 rounded-full bg-[#0066CC] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.04em] text-white shadow-[0_6px_20px_rgba(0,102,204,0.3)] transition-all duration-300 hover:bg-[#0077DD] hover:shadow-[0_8px_28px_rgba(0,102,204,0.45)] lg:inline-flex"
        >
          Get A Quote
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </a>
      </div>

      {/* Mobile accordion menu */}
      {open && (
        <div
          className="mx-auto mt-3 max-h-[calc(100vh-120px)] w-full max-w-[1180px] overflow-y-auto rounded-[26px] border-2 border-white/[0.09] px-6 py-6 lg:hidden"
          style={{ background: "linear-gradient(180deg, #031138 0%, #223566 100%)" }}
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
                          href={it.href || "#footer"}
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
                  href={l.href.startsWith("#") ? `/${l.href}` : l.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 font-display text-sm font-bold tracking-[0.1em] text-white/80"
                >
                  {l.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

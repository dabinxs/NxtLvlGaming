import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { navLinks, megaMenus } from "../mock";
import MobileBottomNav from "./MobileBottomNav";
import "./Navbar.css";

const NavDropdown = ({ menuKey, onNavigate }) => {
  const menu = megaMenus[menuKey];
  if (!menu) return null;
  const graphic = menuKey === "events" ? "/events-menu-graphic.png" : "/experience-menu-graphic.png";
  return (
    <div className="nav-dropdown__content">
      <p className="nav-dropdown__category">
        {menuKey === "events" ? "Occasion" : "Feels"}
      </p>
      <div className="nav-dropdown__links">
        {menu.items.map((it) => (
          <Link
            key={it.title}
            to={it.href || "#footer"}
            onClick={onNavigate}
            data-testid={`menu-item-${it.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="nav-dropdown__link"
          >
            {menuKey === "events" && it.title === "Gaming Events"
              ? "Video Gaming Events"
              : menuKey === "experience" && it.title === "Photo Booth"
              ? "Photobooth"
              : it.title}
          </Link>
        ))}
      </div>
      <img
        src={graphic}
        alt=""
        className="nav-dropdown__graphic"
        decoding="async"
      />
    </div>
  );
};

const Navbar = ({ topOnly = false }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showLinks, setShowLinks] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const closeTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY <= 20) {
        setShowLinks(true);
      } else if (topOnly) {
        // On focused tools, keep the page links out of the workspace until the top.
        setShowLinks(false);
      } else if (currentScrollY > lastScrollY.current + 8) {
        setShowLinks(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        setShowLinks(true);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [topOnly]);

  useEffect(() => {
    if (!showLinks) setActiveMenu(null);
  }, [showLinks]);

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
      {activeMenu && (
        <div
          className="nav-menu-scrim fixed inset-0 z-40"
          aria-hidden="true"
          onClick={() => setActiveMenu(null)}
        />
      )}
      <header
        data-testid="site-navbar"
        onMouseLeave={scheduleClose}
        className={`site-navbar fixed inset-x-0 top-0 z-50 px-4 pt-4 pb-3 sm:pt-5 sm:pb-4 ${
          isScrolled && showLinks ? "site-navbar--scrolled" : ""
        }`}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img
              src="/logo-3d.png"
              alt="Next Level Gaming and Novelties"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <nav
            data-testid="nav-links-pill"
            aria-hidden={!showLinks}
            inert={!showLinks}
            className={`hidden items-center gap-6 transition-[opacity,transform] duration-500 ease-in-out lg:flex ${
              showLinks ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
            }`}
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
                    onClick={() => openMenu(l.menu)}
                    aria-expanded={activeMenu === l.menu}
                    aria-controls={`nav-dropdown-${l.menu}`}
                    className={`nav-menu-trigger flex min-h-14 items-center gap-1.5 rounded-2xl px-5 font-display text-[15px] font-bold capitalize transition-colors duration-300 ${
                      activeMenu === l.menu
                        ? "nav-menu-trigger--active text-white"
                        : "text-white hover:text-[#7DDDFF]"
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
                      id={`nav-dropdown-${l.menu}`}
                      data-testid={`dropdown-${l.menu}`}
                      className={`nav-dropdown nav-dropdown--${l.menu}`}
                      onMouseEnter={() => clearTimeout(closeTimer.current)}
                      onMouseLeave={scheduleClose}
                    >
                      <NavDropdown menuKey={l.menu} onNavigate={() => setActiveMenu(null)} />
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.label}
                  to={l.href.startsWith("#") ? `/${l.href}` : l.href}
                  onMouseEnter={scheduleClose}
                  className="rounded-xl px-4 py-2 font-display text-[15px] font-bold capitalize text-white transition-colors hover:text-[#7DDDFF]"
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
            className="cta-fill nav-quote-button group hidden items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold uppercase tracking-[0.04em] text-white shadow-[0_6px_20px_rgba(0,102,204,0.3)] hover:shadow-[0_8px_28px_rgba(0,102,204,0.45)] lg:inline-flex"
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

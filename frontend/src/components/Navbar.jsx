import React, { useRef, useState } from "react";
import {
  Menu,
  X,
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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const closeTimer = useRef(null);

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
      className="fixed inset-x-0 top-0 z-50 px-4 pt-5"
    >
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-center">
        <nav
          data-testid="nav-links-pill"
          className="hidden items-center gap-2 rounded-[26px] border-2 border-white/[0.09] px-6 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] lg:flex"
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

        <button
          className="flex h-14 w-14 items-center justify-center rounded-[22px] border-2 border-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] lg:hidden"
          style={{ background: "linear-gradient(180deg, #2C2C2C 0%, #121212 100%)" }}
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mega panel dropdown */}
      <div
        className={`mx-auto hidden w-full max-w-[1180px] overflow-hidden rounded-[26px] border-2 border-white/[0.09] transition-[max-height,opacity,margin] duration-400 lg:block ${
          activeMenu ? "mt-3 max-h-[640px] opacity-100" : "mt-0 max-h-0 opacity-0"
        }`}
        style={{
          background: "linear-gradient(180deg, #2C2C2C 0%, #121212 100%)",
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
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
          className="mx-auto mt-3 max-h-[calc(100vh-120px)] w-full max-w-[1180px] overflow-y-auto rounded-[26px] border-2 border-white/[0.09] px-6 py-6 lg:hidden"
          style={{ background: "linear-gradient(180deg, #2C2C2C 0%, #121212 100%)" }}
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
        </div>
      )}
    </header>
  );
};

export default Navbar;

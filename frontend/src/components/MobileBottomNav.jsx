import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Users, Clapperboard, Brain, X, ArrowUpRight } from "lucide-react";

// SVGs matching the exact icons in the user's provided design
const HomeIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 10.5 12 3l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 22v-6a3 3 0 0 1 6 0v6" />
  </svg>
);

const EventsIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="3.5" />
    <line x1="8" x2="8" y1="2" y2="5" />
    <line x1="16" x2="16" y1="2" y2="5" />
    <polygon
      points="12 9.8 12.9 11.8 15.1 12.1 13.5 13.6 13.9 15.8 12 14.7 10.1 15.8 10.5 13.6 8.9 12.1 11.1 11.8 12 9.8"
      strokeWidth="1.4"
      fill="none"
    />
  </svg>
);

const NoveltiesIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8h12l1.2 13H4.8L6 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    <polygon
      points="12 11.8 12.7 13.4 14.4 13.6 13.2 14.8 13.5 16.5 12 15.6 10.5 16.5 10.8 14.8 9.6 13.6 11.3 13.4 12 11.8"
      strokeWidth="1.4"
      fill="none"
    />
  </svg>
);

const ContactIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <circle cx="8.5" cy="12" r="0.8" fill="currentColor" />
    <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    <circle cx="15.5" cy="12" r="0.8" fill="currentColor" />
  </svg>
);

const MobileBottomNav = () => {
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(null);

  const pathname = location.pathname;

  // Determine active item based on current path
  const isHome = pathname === "/" || pathname === "";
  const isEvents =
    pathname === "/gaming-events" ||
    pathname === "/movie-nights" ||
    pathname === "/trivia-nights";
  const isExperience =
    pathname === "/virtual-reality" ||
    pathname === "/just-dance" ||
    pathname === "/silent-disco" ||
    pathname === "/sim-racing" ||
    pathname === "/photo-booth" ||
    pathname === "/glow-park" ||
    pathname === "/explore-experiences";
  const isNovelties =
    pathname.startsWith("/novelties") ||
    pathname.startsWith("/build-novelty") ||
    pathname.startsWith("/build") ||
    pathname.startsWith("/novelty-order");
  const isAbout = pathname === "/about";
  const isContact = pathname === "/contact";

  const toggleDrawer = (name) => {
    setOpenDrawer((prev) => (prev === name ? null : name));
  };

  const closeDrawer = () => setOpenDrawer(null);

  return (
    <>
      {/* Floating Popover Sheet for Events */}
      {openDrawer === "events" && (
        <div
          className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/60 backdrop-blur-sm p-3 pb-24 lg:hidden animate-fade-in"
          onClick={closeDrawer}
        >
          <div
            className="mx-auto w-full max-w-[390px] rounded-[26px] border border-white/15 bg-gradient-to-b from-[#0c1a38] to-[#050b18] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <EventsIcon className="w-5 h-5 text-[#0099FF]" />
                <span className="font-display text-sm font-extrabold uppercase tracking-wider text-white">
                  Events
                </span>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close menu"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white"
              >
                <X size={15} />
              </button>
            </div>

            <div className="grid gap-2">
              <Link
                to="/gaming-events"
                onClick={closeDrawer}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0066FF]/20 text-[#7DDDFF]">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white">Video Gaming Events</div>
                  <div className="text-[11px] text-white/50">Competitive & social console setups</div>
                </div>
              </Link>
              <Link
                to="/movie-nights"
                onClick={closeDrawer}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0066FF]/20 text-[#7DDDFF]">
                  <Clapperboard className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white">Movie Nights</div>
                  <div className="text-[11px] text-white/50">Inflatable cinema screens & LED walls</div>
                </div>
              </Link>
              <Link
                to="/trivia-nights"
                onClick={closeDrawer}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0066FF]/20 text-[#7DDDFF]">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white">Trivia Nights</div>
                  <div className="text-[11px] text-white/50">Interactive live trivia host & buzzer sets</div>
                </div>
              </Link>
            </div>

            <Link
              to="/explore-experiences"
              onClick={closeDrawer}
              className="mt-3 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 text-xs font-bold text-[#7DDDFF] uppercase tracking-wider"
            >
              <span>Explore All Events</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* Floating Popover Sheet for Experience */}
      {openDrawer === "experience" && (
        <div
          className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/60 backdrop-blur-sm p-3 pb-24 lg:hidden animate-fade-in"
          onClick={closeDrawer}
        >
          <div
            className="mx-auto w-full max-w-[390px] rounded-[26px] border border-white/15 bg-gradient-to-b from-[#0c1a38] to-[#050b18] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)] max-h-[75vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 sticky top-0 bg-[#0c1a38] z-10">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-[#0099FF]" />
                <span className="font-display text-sm font-extrabold uppercase tracking-wider text-white">
                  Experience
                </span>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close menu"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white"
              >
                <X size={15} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/virtual-reality"
                onClick={closeDrawer}
                className="flex flex-col p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              >
                <div className="text-[12.5px] font-bold text-white">Virtual Reality</div>
                <div className="text-[10px] text-white/50 mt-0.5">Room-scale VR stations</div>
              </Link>
              <Link
                to="/just-dance"
                onClick={closeDrawer}
                className="flex flex-col p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              >
                <div className="text-[12.5px] font-bold text-white">Just Dance</div>
                <div className="text-[10px] text-white/50 mt-0.5">Giant-screen dance battles</div>
              </Link>
              <Link
                to="/silent-disco"
                onClick={closeDrawer}
                className="flex flex-col p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              >
                <div className="text-[12.5px] font-bold text-white">Silent Disco</div>
                <div className="text-[10px] text-white/50 mt-0.5">3-channel LED headphones</div>
              </Link>
              <Link
                to="/sim-racing"
                onClick={closeDrawer}
                className="flex flex-col p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              >
                <div className="text-[12.5px] font-bold text-white">Sim Racing</div>
                <div className="text-[10px] text-white/50 mt-0.5">Force-feedback cockpits</div>
              </Link>
              <Link
                to="/photo-booth"
                onClick={closeDrawer}
                className="flex flex-col p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              >
                <div className="text-[12.5px] font-bold text-white">Photo Booth</div>
                <div className="text-[10px] text-white/50 mt-0.5">360 video & mirror booth</div>
              </Link>
              <Link
                to="/glow-park"
                onClick={closeDrawer}
                className="flex flex-col p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              >
                <div className="text-[12.5px] font-bold text-white">Glow Park</div>
                <div className="text-[10px] text-white/50 mt-0.5">Swings, seesaws & mini golf</div>
              </Link>
            </div>

            <Link
              to="/explore-experiences"
              onClick={closeDrawer}
              className="mt-3 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 text-xs font-bold text-[#7DDDFF] uppercase tracking-wider"
            >
              <span>Explore All Experiences</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* Floating Bottom Nav Capsule Dock */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed z-50 left-1/2 -translate-x-1/2 lg:hidden flex items-center justify-between w-[calc(100%-16px)] max-w-[430px] rounded-full border border-[#0070F3]/35 bg-[#050b18]/92 backdrop-blur-xl p-1 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(0,102,253,0.18)]"
        style={{
          bottom: "max(12px, env(safe-area-inset-bottom))",
        }}
      >
        <div className="grid grid-cols-6 w-full items-center gap-0.5">
          {/* 1. Home */}
          <Link
            to="/"
            onClick={closeDrawer}
            className={`flex flex-col items-center justify-center py-1.5 transition-all duration-300 ${
              isHome
                ? "rounded-full border border-[#0099FF]/40 bg-gradient-to-b from-[#0e2752] to-[#071735] text-white"
                : "text-white/65 hover:text-white"
            }`}
          >
            <HomeIcon className="w-5 h-5 shrink-0" />
            <span className="mt-0.5 text-[9px] xs:text-[10px] font-medium leading-none">
              Home
            </span>
            {isHome && (
              <span className="mt-1 h-[2px] w-3.5 rounded-full bg-[#0099FF] shadow-[0_0_8px_#0099FF]" />
            )}
          </Link>

          {/* 2. Events */}
          <button
            type="button"
            onClick={() => toggleDrawer("events")}
            className={`flex flex-col items-center justify-center py-1.5 transition-all duration-300 ${
              isEvents || openDrawer === "events"
                ? "rounded-full border border-[#0099FF]/40 bg-gradient-to-b from-[#0e2752] to-[#071735] text-white"
                : "text-white/65 hover:text-white"
            }`}
          >
            <EventsIcon className="w-5 h-5 shrink-0" />
            <span className="mt-0.5 text-[9px] xs:text-[10px] font-medium leading-none">
              Events
            </span>
            {(isEvents || openDrawer === "events") && (
              <span className="mt-1 h-[2px] w-3.5 rounded-full bg-[#0099FF] shadow-[0_0_8px_#0099FF]" />
            )}
          </button>

          {/* 3. Experience */}
          <button
            type="button"
            onClick={() => toggleDrawer("experience")}
            className={`flex flex-col items-center justify-center py-1.5 transition-all duration-300 ${
              isExperience || openDrawer === "experience"
                ? "rounded-full border border-[#0099FF]/40 bg-gradient-to-b from-[#0e2752] to-[#071735] text-white"
                : "text-white/65 hover:text-white"
            }`}
          >
            <Gamepad2 className="w-5 h-5 shrink-0" strokeWidth={1.8} />
            <span className="mt-0.5 text-[8.5px] xs:text-[9.5px] font-medium leading-none tracking-tight">
              Experience
            </span>
            {(isExperience || openDrawer === "experience") && (
              <span className="mt-1 h-[2px] w-3.5 rounded-full bg-[#0099FF] shadow-[0_0_8px_#0099FF]" />
            )}
          </button>

          {/* 4. Novelties */}
          <Link
            to="/novelties"
            onClick={closeDrawer}
            className={`flex flex-col items-center justify-center py-1.5 transition-all duration-300 ${
              isNovelties
                ? "rounded-full border border-[#0099FF]/40 bg-gradient-to-b from-[#0e2752] to-[#071735] text-white"
                : "text-white/65 hover:text-white"
            }`}
          >
            <NoveltiesIcon className="w-5 h-5 shrink-0" />
            <span className="mt-0.5 text-[9px] xs:text-[10px] font-medium leading-none">
              Novelties
            </span>
            {isNovelties && (
              <span className="mt-1 h-[2px] w-3.5 rounded-full bg-[#0099FF] shadow-[0_0_8px_#0099FF]" />
            )}
          </Link>

          {/* 5. About */}
          <Link
            to="/about"
            onClick={closeDrawer}
            className={`flex flex-col items-center justify-center py-1.5 transition-all duration-300 ${
              isAbout
                ? "rounded-full border border-[#0099FF]/40 bg-gradient-to-b from-[#0e2752] to-[#071735] text-white"
                : "text-white/65 hover:text-white"
            }`}
          >
            <Users className="w-5 h-5 shrink-0" strokeWidth={1.8} />
            <span className="mt-0.5 text-[9px] xs:text-[10px] font-medium leading-none">
              About
            </span>
            {isAbout && (
              <span className="mt-1 h-[2px] w-3.5 rounded-full bg-[#0099FF] shadow-[0_0_8px_#0099FF]" />
            )}
          </Link>

          {/* 6. Contact */}
          <Link
            to="/contact"
            onClick={closeDrawer}
            className={`flex flex-col items-center justify-center py-1.5 transition-all duration-300 ${
              isContact
                ? "rounded-full border border-[#0099FF]/40 bg-gradient-to-b from-[#0e2752] to-[#071735] text-white"
                : "text-white/65 hover:text-white"
            }`}
          >
            <ContactIcon className="w-5 h-5 shrink-0" />
            <span className="mt-0.5 text-[9px] xs:text-[10px] font-medium leading-none">
              Contact
            </span>
            {isContact && (
              <span className="mt-1 h-[2px] w-3.5 rounded-full bg-[#0099FF] shadow-[0_0_8px_#0099FF]" />
            )}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MobileBottomNav;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCmsHomeMedia } from "../lib/cmsContent";

const EXPLORE_ITEMS = [
  {
    id: "gaming-events",
    slug: "gaming-events",
    category: "Events",
    title: "Video Gaming Events",
    desc: "Competitive and social gaming experiences.",
    href: "/gaming-events",
    defaultImage: "/experience-gaming-events.avif",
  },
  {
    id: "movie-nights",
    slug: "movie-nights",
    category: "Events",
    title: "Movie Night",
    desc: "Cinema-style entertainment for any event.",
    href: "/movie-nights",
    defaultImage: "/experience-movie-nights.png",
  },
  {
    id: "trivia-nights",
    slug: "trivia-nights",
    category: "Events",
    title: "Trivia Nights",
    desc: "Interactive trivia for groups and crowds.",
    href: "/trivia-nights",
    defaultImage: "/experience-trivia-nights.png",
  },
  {
    id: "virtual-reality",
    slug: "virtual-reality",
    category: "Experience",
    title: "Virtual Reality",
    desc: "Competitive and social gaming experiences.",
    href: "/virtual-reality",
    defaultImage: "/experience-virtual-reality.png",
  },
  {
    id: "just-dance",
    slug: "just-dance",
    category: "Experience",
    title: "Just dance",
    desc: "Follow the on-screen choreography, earn points, and challenge friends.",
    href: "/just-dance",
    defaultImage: "/experience-just-dance.png",
  },
  {
    id: "silent-disco",
    slug: "silent-disco",
    category: "Experience",
    title: "Silent Disco",
    desc: "LCD headphones with multiple music channels.",
    href: "/silent-disco",
    defaultImage: "/experience-silent-disco.png",
  },
  {
    id: "sim-racing",
    slug: "sim-racing",
    category: "Experience",
    title: "Sim Racing",
    desc: "Pro simulators with competitive racing.",
    href: "/sim-racing",
    defaultImage: "/experience-sim-racing.png",
  },
  {
    id: "photo-booth",
    slug: "photo-booth",
    category: "Experience",
    title: "Photo Booth",
    desc: "360 video and mirror booth experiences guests can enjoy and share.",
    href: "/photo-booth",
    defaultImage: "/experience-360-video-booth.png",
  },
  {
    id: "glow-park",
    slug: "glow-park",
    category: "Experience",
    title: "Glow Park Experience",
    desc: "Glow swings, seesaws, uplighting, and glowing mini golf.",
    href: "/glow-park",
    defaultImage: "/experience-glow-park.jpg",
  },
];

const ExploreExperiences = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const homeMedia = useCmsHomeMedia();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredItems = EXPLORE_ITEMS.filter((item) => {
    if (activeFilter === "events") return item.category === "Events";
    if (activeFilter === "experience") return item.category === "Experience";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#05070f] text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24 md:pt-44 md:pb-32">
        {/* Subtle ambient lighting */}
        <div className="pointer-events-none absolute left-1/4 top-32 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#0066FD]/10 blur-[160px]" />
        <div className="pointer-events-none absolute right-10 top-1/2 h-[400px] w-[400px] rounded-full bg-[#0066FD]/5 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          {/* Main Title */}
          <h1
            className="font-display text-[clamp(2.1rem,7.5vw,4.5rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
            style={{ fontWeight: 800 }}
          >
            EXPLORE WHAT'S{" "}
            <span className="text-[#0099FF] drop-shadow-[0_0_35px_rgba(0,153,255,0.45)]">
              NEXT
            </span>
          </h1>

          {/* Filter Tabs - perfectly balanced and even across all screen widths */}
          <div className="mt-6 sm:mt-10 mb-8 sm:mb-12 grid grid-cols-3 gap-2 w-full max-w-[360px] sm:flex sm:w-auto sm:items-center sm:gap-3">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`flex items-center justify-center rounded-full px-2 sm:px-6 py-2.5 sm:py-2 text-xs sm:text-[13px] font-semibold tracking-wide transition-all duration-300 text-center ${
                activeFilter === "all"
                  ? "bg-[#0066CC] text-white shadow-[0_4px_20px_rgba(0,102,204,0.4)]"
                  : "border border-white/20 bg-transparent text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("events")}
              className={`flex items-center justify-center rounded-full px-2 sm:px-6 py-2.5 sm:py-2 text-xs sm:text-[13px] font-semibold tracking-wide transition-all duration-300 text-center ${
                activeFilter === "events"
                  ? "bg-[#0066CC] text-white shadow-[0_4px_20px_rgba(0,102,204,0.4)]"
                  : "border border-white/20 bg-transparent text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              Events
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("experience")}
              className={`flex items-center justify-center rounded-full px-2 sm:px-6 py-2.5 sm:py-2 text-xs sm:text-[13px] font-semibold tracking-wide transition-all duration-300 text-center ${
                activeFilter === "experience"
                  ? "bg-[#0066CC] text-white shadow-[0_4px_20px_rgba(0,102,204,0.4)]"
                  : "border border-white/20 bg-transparent text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              Experience
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredItems.map((item) => {
              const imageSrc = homeMedia[item.slug] || item.defaultImage;

              return (
                <Link
                  key={item.id}
                  to={item.href}
                  className="group relative flex flex-col overflow-hidden rounded-[22px] sm:rounded-[26px] border border-white/10 bg-gradient-to-b from-[#0a1224] to-[#040814] p-3 sm:p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0099FF]/50 hover:shadow-[0_14px_40px_rgba(0,102,253,0.22)]"
                >
                  {/* Card Image */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[18px] sm:rounded-[20px] bg-black/40">
                    <img
                      src={imageSrc}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040814]/80 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col pt-3.5 sm:pt-4 px-1.5 sm:px-2 pb-1 sm:pb-1.5">
                    {/* Category Tag */}
                    <div className="mb-2 sm:mb-2.5">
                      <span className="inline-flex items-center rounded-full border border-[#0099FF]/35 bg-[#0099FF]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#7DDDFF]">
                        {item.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-[16px] sm:text-[18px] font-extrabold uppercase tracking-tight text-white transition-colors group-hover:text-[#7DDDFF]">
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-1 sm:mt-1.5 text-[12px] sm:text-[12.5px] leading-relaxed text-white/60 line-clamp-2 pr-4 sm:pr-6">
                      {item.desc}
                    </p>

                    {/* Bottom Arrow Indicator */}
                    <div className="mt-auto pt-2.5 sm:pt-3 flex justify-end items-center">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full text-white/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExploreExperiences;

import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TileReveal } from "./ui/tile-reveal";

const NOVELTY_TILES = [
  // 1. Top Left - Patched City
  {
    id: "patch-city",
    label: "PATCH CITY",
    title: "Patched City Trucker Hats & Beanies",
    image: "/novelty-cards/patch-city.jpg",
    className: "left-[2%] sm:left-[3%] top-[3%] sm:top-[4%] w-[105px] sm:w-[140px] md:w-[165px] lg:w-[180px]",
    from: { x: -380, y: -280, rotation: -26, scale: 0.4, opacity: 0 },
    toRotation: -7,
  },
  // 2. Top Center-Left - Custom Trucker Hats
  {
    id: "trucker-hats",
    label: "CUSTOM HATS",
    title: "Custom Trucker Hats",
    image: "/novelty-cards/trucker-hats.jpg",
    className: "left-[24%] md:left-[27%] top-[1.5%] sm:top-[2%] w-[95px] sm:w-[125px] md:w-[145px] lg:w-[160px]",
    hideOnMobile: true,
    from: { x: -120, y: -360, rotation: -18, scale: 0.4, opacity: 0 },
    toRotation: 5,
  },
  // 3. Top Center-Right - Stamped Rings
  {
    id: "stamped-rings",
    label: "STAMPED RINGS",
    title: "Stamped Custom Rings",
    image: "/novelty-cards/stamped-rings.jpg",
    className: "right-[24%] md:right-[27%] top-[1.5%] sm:top-[2%] w-[95px] sm:w-[125px] md:w-[145px] lg:w-[160px]",
    hideOnMobile: true,
    from: { x: 120, y: -360, rotation: 18, scale: 0.4, opacity: 0 },
    toRotation: -5,
  },
  // 4. Top Right - Custom Sequin Pillows
  {
    id: "sequin-pillows",
    label: "SEQUIN PILLOWS",
    title: "Custom Sequin Pillows",
    image: "/novelty-cards/sequin-pillows.jpg",
    className: "right-[2%] sm:right-[3%] top-[3%] sm:top-[4%] w-[105px] sm:w-[140px] md:w-[165px] lg:w-[180px]",
    from: { x: 380, y: -280, rotation: 26, scale: 0.4, opacity: 0 },
    toRotation: 7,
  },
  // 5. Mid Far-Left - Custom Socks
  {
    id: "custom-socks",
    label: "CUSTOM SOCKS",
    title: "Custom Socks",
    image: "/novelty-cards/custom-socks.jpg",
    className: "left-[1.5%] sm:left-[2.5%] top-[41%] w-[95px] sm:w-[125px] md:w-[150px] lg:w-[165px]",
    from: { x: -420, y: 20, rotation: -22, scale: 0.4, opacity: 0 },
    toRotation: 6,
  },
  // 6. Mid Far-Right - Wood & Metal Keychains
  {
    id: "wood-metal-keychains",
    label: "KEYCHAINS",
    title: "Wood & Metal Keychains",
    image: "/novelty-cards/wood-metal-keychains.jpg",
    className: "right-[1.5%] sm:right-[2.5%] top-[41%] w-[95px] sm:w-[125px] md:w-[150px] lg:w-[165px]",
    from: { x: 420, y: 20, rotation: 22, scale: 0.4, opacity: 0 },
    toRotation: -6,
  },
  // 7. Bottom Left - Custom Pillow Dolls
  {
    id: "pillow-dolls",
    label: "PILLOW DOLLS",
    title: "Custom Pillow Dolls",
    image: "/novelty-cards/pillow-dolls.jpg",
    className: "left-[2%] sm:left-[3%] bottom-[3%] sm:bottom-[4%] w-[105px] sm:w-[140px] md:w-[165px] lg:w-[180px]",
    from: { x: -380, y: 320, rotation: -24, scale: 0.4, opacity: 0 },
    toRotation: 6,
  },
  // 8. Bottom Center-Left - Bead Bracelets
  {
    id: "bead-bracelets",
    label: "BEAD-TASTICS",
    title: "Bead-tastics Custom Bracelets",
    image: "/novelty-cards/bead-tastics.jpg",
    className: "left-[24%] md:left-[27%] bottom-[1.5%] sm:bottom-[2%] w-[95px] sm:w-[125px] md:w-[145px] lg:w-[160px]",
    hideOnMobile: true,
    from: { x: -120, y: 360, rotation: 18, scale: 0.4, opacity: 0 },
    toRotation: -5,
  },
  // 9. Bottom Center-Right - Intention Bracelet
  {
    id: "intention-bracelet",
    label: "INTENTION BRACELET",
    title: "Intention Bracelet",
    image: "/novelty-cards/intention-bracelet.jpg",
    className: "right-[24%] md:right-[27%] bottom-[1.5%] sm:bottom-[2%] w-[95px] sm:w-[125px] md:w-[145px] lg:w-[160px]",
    hideOnMobile: true,
    from: { x: 120, y: 360, rotation: -18, scale: 0.4, opacity: 0 },
    toRotation: 5,
  },
  // 10. Bottom Right - Silly Sacks Plush Bags
  {
    id: "plush-bags",
    label: "SILLY SACKS",
    title: "Silly Sacks Plush Bags",
    image: "/novelty-cards/silly-sacks.jpg",
    className: "right-[2%] sm:right-[3%] bottom-[3%] sm:bottom-[4%] w-[105px] sm:w-[140px] md:w-[165px] lg:w-[180px]",
    from: { x: 380, y: 320, rotation: 24, scale: 0.4, opacity: 0 },
    toRotation: -7,
  },
];

const LevelUp = () => {
  return (
    <section id="gaming-division" className="relative overflow-hidden bg-[#05070f]">
      <TileReveal tiles={NOVELTY_TILES}>
        {/* Eyebrow badge */}
        <div className="mb-3 inline-flex items-center gap-3">
          <span className="h-px w-8 bg-[#0099FF] sm:w-12" />
          <span className="font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-[#7DDDFF]">
            Next Level Novelties
          </span>
          <span className="h-px w-8 bg-[#0099FF] sm:w-12" />
        </div>

        {/* Big Headline */}
        <h2
          className="font-display text-[clamp(2.1rem,4.8vw,4.2rem)] font-extrabold uppercase leading-[0.94] tracking-tight text-white"
          style={{ fontWeight: 800 }}
        >
          Customize Your
          <br />
          <span className="blue-gradient-text drop-shadow-[0_0_30px_rgba(0,102,253,0.35)]">
            Experience
          </span>
        </h2>

        {/* Shorter, concise description */}
        <p className="mx-auto mt-3 max-w-lg text-[13px] leading-relaxed text-white/70 sm:text-[15px]">
          Create memorable, custom keepsakes your guests will love taking home.
        </p>

        {/* CTA Button styled identical to "Plan Your Event" */}
        <div className="mt-5 flex items-center justify-center">
          <Link
            to="/novelties"
            className="cta-fill group inline-flex h-[50px] sm:h-[54px] items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-[#0066CC] px-8 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_10px_34px_rgba(0,102,204,0.35)] hover:shadow-[0_14px_40px_rgba(0,102,204,0.5)] transition-all duration-300"
          >
            Explore Custom Novelties
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </TileReveal>
    </section>
  );
};

export default LevelUp;

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { TileReveal } from "./ui/tile-reveal";

const NOVELTY_TILES = [
  // 1. Top Left - Patched City
  {
    id: "patch-city",
    label: "PATCH CITY",
    title: "Patched City Trucker Hats & Beanies",
    image: "/novelty-cards/patch-city.jpg",
    className: "left-[2%] sm:left-[3%] top-[4%] sm:top-[6%] w-[130px] sm:w-[180px] md:w-[220px]",
    from: { x: -380, y: -280, rotation: -25, scale: 0.4, opacity: 0 },
  },
  // 2. Top Center-Left - Custom Trucker Hats
  {
    id: "trucker-hats",
    label: "CUSTOM HATS",
    title: "Custom Trucker Hats",
    image: "/novelty-cards/trucker-hats.jpg",
    className: "left-[28%] top-[1.5%] sm:top-[2%] w-[115px] sm:w-[160px] md:w-[190px]",
    hideOnMobile: true,
    from: { x: -120, y: -360, rotation: -12, scale: 0.4, opacity: 0 },
  },
  // 3. Top Center-Right - Stamped Rings
  {
    id: "stamped-rings",
    label: "STAMPED RINGS",
    title: "Stamped Custom Rings",
    image: "/novelty-cards/stamped-rings.jpg",
    className: "right-[28%] top-[1.5%] sm:top-[2%] w-[115px] sm:w-[160px] md:w-[190px]",
    hideOnMobile: true,
    from: { x: 120, y: -360, rotation: 15, scale: 0.4, opacity: 0 },
  },
  // 4. Top Right - Custom Sequin Pillows
  {
    id: "sequin-pillows",
    label: "SEQUIN PILLOWS",
    title: "Custom Sequin Pillows",
    image: "/novelty-cards/sequin-pillows.jpg",
    className: "right-[2%] sm:right-[3%] top-[4%] sm:top-[6%] w-[130px] sm:w-[180px] md:w-[220px]",
    from: { x: 380, y: -280, rotation: 26, scale: 0.4, opacity: 0 },
  },
  // 5. Mid Far-Left - Custom Socks
  {
    id: "custom-socks",
    label: "CUSTOM SOCKS",
    title: "Custom Socks",
    image: "/novelty-cards/custom-socks.jpg",
    className: "left-[1%] sm:left-[2%] top-[40%] w-[120px] sm:w-[170px] md:w-[205px]",
    from: { x: -420, y: 20, rotation: -18, scale: 0.4, opacity: 0 },
  },
  // 6. Mid Far-Right - Engraved Bracelets
  {
    id: "engraved-bracelets",
    label: "ENGRAVED BRACELETS",
    title: "Engraved Bracelets",
    image: "/novelty-cards/engraved-bracelets.jpg",
    className: "right-[1%] sm:right-[2%] top-[40%] w-[120px] sm:w-[170px] md:w-[205px]",
    from: { x: 420, y: 20, rotation: 18, scale: 0.4, opacity: 0 },
  },
  // 7. Bottom Left - Custom Pillow Dolls
  {
    id: "pillow-dolls",
    label: "PILLOW DOLLS",
    title: "Custom Pillow Dolls",
    image: "/novelty-cards/pillow-dolls.jpg",
    className: "left-[2%] sm:left-[3%] bottom-[4%] sm:bottom-[6%] w-[130px] sm:w-[180px] md:w-[220px]",
    from: { x: -380, y: 320, rotation: -22, scale: 0.4, opacity: 0 },
  },
  // 8. Bottom Center-Left - Bead Bracelets
  {
    id: "bead-bracelets",
    label: "BEAD-TASTICS",
    title: "Bead-tastics Custom Bracelets",
    image: "/novelty-templates/bead-bracelet.jpg",
    className: "left-[28%] bottom-[1.5%] sm:bottom-[2%] w-[115px] sm:w-[160px] md:w-[190px]",
    hideOnMobile: true,
    from: { x: -120, y: 360, rotation: 14, scale: 0.4, opacity: 0 },
  },
  // 9. Bottom Center-Right - Engraved Rings
  {
    id: "engraved-rings",
    label: "ENGRAVED RINGS",
    title: "Engraved Rings",
    image: "/novelty-cards/engraved-rings.jpg",
    className: "right-[28%] bottom-[1.5%] sm:bottom-[2%] w-[115px] sm:w-[160px] md:w-[190px]",
    hideOnMobile: true,
    from: { x: 120, y: 360, rotation: -16, scale: 0.4, opacity: 0 },
  },
  // 10. Bottom Right - Silly Sacks Plush Bags
  {
    id: "plush-bags",
    label: "SILLY SACKS",
    title: "Silly Sacks Plush Bags",
    image: "/novelty-templates/plush-bag.jpg",
    className: "right-[2%] sm:right-[3%] bottom-[4%] sm:bottom-[6%] w-[130px] sm:w-[180px] md:w-[220px]",
    from: { x: 380, y: 320, rotation: 25, scale: 0.4, opacity: 0 },
  },
];

const LevelUp = () => {
  return (
    <section id="gaming-division" className="relative overflow-hidden bg-[#05070f]">
      <TileReveal tiles={NOVELTY_TILES}>
        {/* Eyebrow badge */}
        <div className="mb-4 inline-flex items-center gap-3">
          <span className="h-px w-8 bg-[#0099FF] sm:w-12" />
          <span className="font-display text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.35em] text-[#7DDDFF]">
            Next Level Novelties
          </span>
          <span className="h-px w-8 bg-[#0099FF] sm:w-12" />
        </div>

        {/* Big Headline */}
        <h2
          className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-white"
          style={{ fontWeight: 800 }}
        >
          Customize Your
          <br />
          <span className="blue-gradient-text drop-shadow-[0_0_35px_rgba(0,102,253,0.4)]">
            Experience
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-xl text-[14px] leading-relaxed text-white/70 sm:text-[16px]">
          Make your event unmistakably yours with custom novelties from Next Level Gaming. Create keepsakes your guests will want to take home — from personalized trucker hats and apparel to playful accessories, plush pieces, and engraved keepsakes.
        </p>

        {/* CTA Button with Center-Fill Hover Animation */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/novelties"
            className="cta-anim group inline-flex items-center gap-3 rounded-full border border-[#0099FF]/50 bg-[#071425]/90 px-8 py-3.5 font-display text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_25px_rgba(0,102,253,0.35)] transition-all duration-300 hover:border-[#7DDDFF] hover:shadow-[0_0_35px_rgba(0,153,255,0.55)]"
          >
            <span>Explore Custom Novelties</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0099FF]/30 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-3.5 w-3.5 text-[#7DDDFF]" />
            </span>
          </a>
        </div>

        {/* Sub-tag */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[.25em] text-white/40">
          <Sparkles className="h-3.5 w-3.5 text-[#55baff]" />
          <span>Pick a favorite. Make it yours.</span>
        </div>
      </TileReveal>
    </section>
  );
};

export default LevelUp;

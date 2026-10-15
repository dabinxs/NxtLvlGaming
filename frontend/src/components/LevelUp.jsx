import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const noveltyPatches = [
  { name: "CUSTOM HATS", image: "/novelty-templates/hat-front.jpg", className: "left-[7%] top-[9%] w-[39%] -rotate-[8deg]" },
  { name: "YOUR COLORS", image: "/novelty-templates/bead-bracelet.jpg", className: "right-[6%] top-[4%] w-[34%] rotate-[7deg]" },
  { name: "MADE TO KEEP", image: "/novelty-templates/plush-bag.jpg", className: "left-[2%] bottom-[5%] w-[35%] rotate-[6deg]" },
  { name: "EVENT MERCH", image: "/novelty-templates/socks.jpg", className: "right-[9%] bottom-[6%] w-[40%] -rotate-[6deg]" },
];

const LevelUp = () => (
  <section id="gaming-division" className="relative overflow-hidden bg-[#05070f] py-24">
    <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
      <div className="relative mx-auto aspect-[1.16/1] w-full max-w-[560px]">
        <div className="absolute inset-[9%] rounded-full bg-[#0066FD]/20 blur-3xl" />
        <div className="absolute inset-[5%] rounded-[2rem] border border-dashed border-white/10" />
        {noveltyPatches.map((patch, index) => (
          <article
            key={patch.name}
            className={`absolute ${patch.className} overflow-hidden rounded-md border border-white/20 bg-[#0b1425] p-2 shadow-[0_18px_50px_rgba(0,0,0,.55)] sm:p-2.5`}
            style={{ zIndex: index + 1 }}
          >
            <div className="relative aspect-[1.05/1] overflow-hidden bg-white">
              <img src={patch.image} alt={patch.name.toLowerCase().replaceAll(" ", " ")} className="h-full w-full object-cover" />
              <span className="absolute left-1.5 top-1.5 rounded-sm border border-[#07101f]/20 bg-white/90 px-1.5 py-1 font-display text-[7px] font-bold tracking-[.14em] text-[#101d32] sm:text-[8px]">
                NLG / CUSTOM
              </span>
            </div>
            <div className="flex items-center justify-between gap-1 px-0.5 pt-2">
              <span className="font-display text-[8px] font-bold tracking-[.16em] text-white sm:text-[9px]">{patch.name}</span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#39a9ff]" />
            </div>
          </article>
        ))}
        <div className="absolute left-[43%] top-[43%] z-10 flex h-16 w-16 -rotate-12 items-center justify-center rounded-full border border-[#63c7ff]/60 bg-[#071425]/90 text-center shadow-[0_0_35px_rgba(0,102,253,.25)] sm:h-20 sm:w-20">
          <span className="font-display text-[8px] font-extrabold leading-tight tracking-[.13em] text-[#8bd7ff] sm:text-[9px]">MADE<br />YOURS</span>
        </div>
      </div>

      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-10 bg-white/30" />
          <span className="font-display text-[11px] font-medium uppercase tracking-[0.35em] text-white/50">
            Next Level Novelties
          </span>
        </div>

        <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold uppercase leading-[0.95] text-white" style={{ fontWeight: 800 }}>
          Customize Your
          <br />
          <span className="blue-gradient-text">Experience</span>
        </h2>

        <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/60">
          Make your event unmistakably yours with custom novelties from Next Level Gaming. Create keepsakes your guests will want to take home, from personalized hats and apparel to playful accessories, plush pieces, and more.
        </p>

        <a
          href="/novelties"
          className="group mt-8 inline-flex items-center gap-2 font-display text-[13px] font-semibold uppercase tracking-[0.15em] text-white"
        >
          <span className="blue-gradient-text">Explore Custom Novelties</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0066FD]/50 transition-all group-hover:bg-[#0066FD]/20">
            <ArrowRight className="h-4 w-4 text-[#7DDDFF] transition-transform group-hover:translate-x-0.5" />
          </span>
        </a>
        <div className="mt-8 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.22em] text-white/35">
          <Sparkles className="h-3.5 w-3.5 text-[#55baff]" />
          Pick a favorite. Make it yours.
        </div>
      </div>
    </div>
  </section>
);

export default LevelUp;

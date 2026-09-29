import React from "react";
import { Play, ChevronRight } from "lucide-react";

const HeroWaves = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* deep radial glow */}
    <div className="absolute -right-[10%] top-[-15%] h-[80%] w-[70%] rounded-full bg-[#0066FD]/20 blur-[120px]" />
    <div className="absolute right-[5%] top-[30%] h-[50%] w-[45%] rounded-full bg-[#7DDDFF]/10 blur-[110px]" />

    <svg
      className="absolute right-0 top-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0066FD" />
          <stop offset="100%" stopColor="#7DDDFF" />
        </linearGradient>
      </defs>
      <g className="wave-anim" opacity="0.9">
        <path
          d="M420 60 C 760 120, 980 260, 1180 300 C 1340 332, 1460 360, 1520 420"
          stroke="url(#waveGrad)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M480 30 C 820 90, 1020 230, 1240 280 C 1400 316, 1500 350, 1560 410"
          stroke="url(#waveGrad)"
          strokeWidth="3.5"
          fill="none"
          opacity="0.8"
        />
      </g>
      <g className="wave-anim-2" opacity="0.85">
        <path
          d="M520 140 C 860 200, 1080 300, 1260 380 C 1380 434, 1480 470, 1540 520"
          stroke="url(#waveGrad)"
          strokeWidth="6"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M560 200 C 900 250, 1120 340, 1300 430 C 1400 480, 1500 520, 1560 580"
          stroke="url(#waveGrad)"
          strokeWidth="10"
          fill="none"
          opacity="0.7"
        />
      </g>
      <g className="wave-anim-3" opacity="0.7">
        <path
          d="M620 300 C 940 340, 1160 420, 1320 520 C 1420 582, 1500 620, 1560 680"
          stroke="url(#waveGrad)"
          strokeWidth="16"
          fill="none"
          opacity="0.55"
        />
      </g>
    </svg>
    {/* fade bottom into page */}
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05070f] to-transparent" />
  </div>
);

const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-[#05070f]">
      <HeroWaves />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1280px] flex-col justify-center px-5 pt-28 md:px-8">
        <div className="max-w-3xl">
          <h1 className="font-display text-[clamp(2.6rem,8vw,5.6rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white animate-rise" style={{ fontWeight: 800 }}>
            Take Your Event
            <br />
            To The <span className="blue-gradient-text">Next Level</span>
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60 animate-rise" style={{ animationDelay: "0.1s" }}>
            Gaming, entertainment, and interactive experiences for
            unforgettable events.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4 animate-rise" style={{ animationDelay: "0.2s" }}>
            <a
              href="#experience"
              className="group inline-flex items-center gap-2.5 rounded-full blue-gradient-bg px-7 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-white shadow-[0_10px_30px_rgba(0,102,253,0.4)] transition-transform hover:scale-[1.04]"
            >
              <Play className="h-4 w-4 fill-white" />
              Play Your Event
            </a>
            <a
              href="#gaming-division"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-white/90 transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Explore Explanation
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

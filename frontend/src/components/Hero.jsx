import React, { useEffect, useRef } from "react";
import { Play } from "lucide-react";

// Empty rectangle cards arranged on a rotating 3D cylinder
const CARD_COUNT = 14;
const RADIUS = 620; // px

const Carousel3D = () => {
  const angleStep = 360 / CARD_COUNT;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46vh] min-h-[300px]">
      {/* side + bottom fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-40 bg-gradient-to-r from-[#05070f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-40 bg-gradient-to-l from-[#05070f] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#05070f] to-transparent" />

      <div className="carousel-3d-scene relative h-full w-full">
        <div className="carousel-3d-ring">
          {Array.from({ length: CARD_COUNT }).map((_, i) => (
            <div
              key={i}
              className="carousel-3d-card"
              style={{
                width: "clamp(150px, 15vw, 230px)",
                height: "clamp(110px, 11vw, 165px)",
                transform: `translate(-50%, -50%) rotateY(${
                  i * angleStep
                }deg) translateZ(${RADIUS}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      el.style.setProperty("--glow", inside ? "1" : "0");
      if (inside) {
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#05070f]"
    >
      {/* white grid lines, fading out towards the carousel */}
      <div className="hero-grid pointer-events-none absolute inset-0 z-0" />

      {/* cursor-follow grid glow trail */}
      <div className="hero-grid-glow pointer-events-none absolute inset-0 z-0" />

      {/* subtle blue ambient glow (no purple) */}
      <div className="pointer-events-none absolute left-1/2 top-[8%] h-[45%] w-[70%] -translate-x-1/2 rounded-full bg-[#0066FD]/12 blur-[130px]" />

      {/* Centered heading block */}
      <div className="relative z-10 flex w-full max-w-5xl flex-1 flex-col items-center justify-start px-5 pt-36 text-center md:pt-40">
        <h1
          className="font-display text-[clamp(2rem,4.4vw,3.7rem)] font-extrabold uppercase leading-[1.08] tracking-tight text-white animate-rise"
          style={{ fontWeight: 800 }}
        >
          Transform Your Event
          <br />
          Into Reality
        </h1>

        <p
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/60 animate-rise"
          style={{ animationDelay: "0.1s" }}
        >
          Gaming, entertainment, and interactive experiences for unforgettable
          events.
        </p>

        <div
          className="mt-8 animate-rise"
          style={{ animationDelay: "0.2s" }}
        >
          <a
            href="#footer"
            className="group inline-flex items-center gap-2.5 rounded-full blue-gradient-bg px-8 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-white shadow-[0_10px_30px_rgba(0,102,253,0.4)] transition-transform hover:scale-[1.04]"
          >
            <Play className="h-4 w-4 fill-white" />
            Plan Your Event
          </a>
        </div>
      </div>

      {/* 3D rotating rectangle carousel */}
      <Carousel3D />
    </section>
  );
};

export default Hero;

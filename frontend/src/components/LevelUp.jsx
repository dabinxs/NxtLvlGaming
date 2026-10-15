import React, { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";

const NOVELTY_CARDS = [
  {
    id: "patch-city",
    title: "Patched City Trucker Hats & Beanies",
    label: "PATCH CITY",
    image: "/novelty-cards/patch-city.jpg",
  },
  {
    id: "trucker-hats",
    title: "Custom Trucker Hats",
    label: "CUSTOM HATS",
    image: "/novelty-cards/trucker-hats.jpg",
  },
  {
    id: "custom-socks",
    title: "Custom Socks",
    label: "EVENT MERCH",
    image: "/novelty-cards/custom-socks.jpg",
  },
  {
    id: "bead-bracelets",
    title: "Bead-tastics Custom Bracelets",
    label: "YOUR COLORS",
    image: "/novelty-templates/bead-bracelet.jpg",
  },
  {
    id: "pillow-dolls",
    title: "Custom Pillow Dolls",
    label: "MADE TO KEEP",
    image: "/novelty-cards/pillow-dolls.jpg",
  },
  {
    id: "sequin-pillows",
    title: "Custom Sequin Pillows",
    label: "MAGIC PILLOW",
    image: "/novelty-templates/sequin-pillow.jpg",
  },
  {
    id: "intention-bracelets",
    title: "Intention Bracelets",
    label: "INTENTION",
    image: "/novelty-templates/intention-bracelet.jpg",
  },
  {
    id: "laser-keychains",
    title: "Laser-Engraved Keychains",
    label: "KEYCHAINS",
    image: "/novelty-templates/keychain.jpg",
  },
  {
    id: "stamped-rings",
    title: "Stamped Custom Rings",
    label: "RING PRESS",
    image: "/novelty-templates/ring.jpg",
  },
  {
    id: "plush-bags",
    title: "Silly Sacks Plush Bags",
    label: "SILLY SACKS",
    image: "/novelty-templates/plush-bag.jpg",
  },
];

const LevelUp = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const count = cards.length;
    const mid = (count - 1) / 2;

    const ctx = gsap.context(() => {
      const getParams = () => {
        const isMobile = window.innerWidth < 640;
        const spreadX = isMobile ? 85 : 142;
        const spreadY = isMobile ? 18 : 26;
        const maxRot = isMobile ? 22 : 30;

        return {
          stacked: (i) => ({
            x: (i - mid) * 0.4,
            y: (mid - i) * 0.7,
            rotation: (i - mid) * 0.5,
            scale: 1,
            boxShadow: `0 ${10 + i * 2}px ${24 + i * 3}px rgba(0, 0, 0, ${0.4 + i * 0.03})`,
          }),
          fanned: (i) => {
            const t = (i - mid) / mid; // -1 to 1
            return {
              x: t * spreadX,
              y: t * t * spreadY - (isMobile ? 10 : 14),
              rotation: t * maxRot,
              scale: 1,
              boxShadow: "0 22px 48px rgba(0, 0, 0, 0.7)",
            };
          },
        };
      };

      let params = getParams();

      // Set initial stacked deck placement
      cards.forEach((card, i) => {
        gsap.set(card, {
          ...params.stacked(i),
          transformOrigin: "50% 90%",
        });
      });

      // Master 3-second cycle timeline:
      // Fan out (0.75s) -> Hold open (0.85s) -> Stack back (0.75s) -> Hold stacked (0.65s) = 3.0s total cycle
      const tl = gsap.timeline({
        repeat: -1,
      });

      const buildTimeline = () => {
        tl.clear();
        params = getParams();

        // 1. Fan / Open outward like dealing playing cards
        tl.to(cards, {
          x: (i) => params.fanned(i).x,
          y: (i) => params.fanned(i).y,
          rotation: (i) => params.fanned(i).rotation,
          boxShadow: (i) => params.fanned(i).boxShadow,
          duration: 0.65,
          ease: "power2.out",
          stagger: {
            each: 0.02,
            from: "center",
          },
        })
        // 2. Hold in open fan position so user can admire cards
        .to({}, { duration: 0.85 })
        // 3. Smoothly return and stack back into a single deck
        .to(cards, {
          x: (i) => params.stacked(i).x,
          y: (i) => params.stacked(i).y,
          rotation: (i) => params.stacked(i).rotation,
          boxShadow: (i) => params.stacked(i).boxShadow,
          duration: 0.65,
          ease: "power2.inOut",
          stagger: {
            each: 0.018,
            from: "edges",
          },
        })
        // 4. Brief hold in the neat stacked deck before next cycle
        .to({}, { duration: 0.65 });
      };

      buildTimeline();

      const handleResize = () => {
        buildTimeline();
      };

      window.addEventListener("resize", handleResize);

      // Pause when hovered so the user can inspect the cards
      const handleMouseEnter = () => tl.pause();
      const handleMouseLeave = () => tl.resume();

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        window.removeEventListener("resize", handleResize);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gaming-division" className="relative overflow-hidden bg-[#05070f] py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        {/* Left: Interactive Playing Cards Deck */}
        <div
          ref={containerRef}
          className="relative mx-auto flex h-[460px] w-full max-w-[560px] items-center justify-center overflow-visible sm:h-[490px] md:h-[510px]"
        >
          {/* Ambient glow backdrop */}
          <div className="pointer-events-none absolute inset-[6%] rounded-full bg-[#0066FD]/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-[4%] rounded-[2rem] border border-dashed border-white/10" />

          {/* Playing Cards Container */}
          <div className="relative flex h-[270px] w-[190px] items-center justify-center sm:h-[305px] sm:w-[220px] md:h-[320px] md:w-[230px]">
            {NOVELTY_CARDS.map((card, index) => (
              <a
                key={card.id}
                href="/novelties"
                ref={(el) => (cardsRef.current[index] = el)}
                className="group absolute inset-0 select-none overflow-hidden rounded-2xl border border-white/20 bg-[#0a1324] p-2.5 shadow-[0_18px_50px_rgba(0,0,0,.65)] transition-colors duration-200 hover:border-[#7DDDFF]/70 sm:p-3"
                style={{
                  zIndex: index + 1,
                  willChange: "transform",
                }}
                title={card.title}
              >
                {/* Playing Card Top Bar */}
                <div className="mb-2 flex items-center justify-between px-0.5">
                  <span className="rounded border border-black/30 bg-white/95 px-1.5 py-0.5 font-display text-[7px] font-bold tracking-[.14em] text-[#07101f] sm:text-[8px]">
                    NLG / CUSTOM
                  </span>
                  <span className="font-mono text-[9px] font-bold tracking-wider text-[#7DDDFF]/90 sm:text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Card Artwork Window */}
                <div className="relative aspect-[1.08/1] overflow-hidden rounded-xl border border-white/10 bg-[#050c18]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Glossy card sheen */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10" />
                </div>

                {/* Playing Card Bottom Bar */}
                <div className="flex items-center justify-between gap-1 px-0.5 pt-2 sm:pt-2.5">
                  <span className="truncate font-display text-[8px] font-bold tracking-[.16em] text-white sm:text-[9px]">
                    {card.label}
                  </span>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0099FF] shadow-[0_0_8px_#0099FF]" />
                </div>
              </a>
            ))}
          </div>

          {/* Corner Dealer Chip badge "MADE YOURS" */}
          <div className="pointer-events-none absolute right-3 top-3 z-30 flex h-14 w-14 -rotate-12 items-center justify-center rounded-full border border-[#63c7ff]/60 bg-[#071425]/90 text-center shadow-[0_0_30px_rgba(0,102,253,.3)] sm:right-6 sm:top-6 sm:h-16 sm:w-16">
            <span className="font-display text-[7px] font-extrabold leading-tight tracking-[.13em] text-[#8bd7ff] sm:text-[8px]">
              MADE<br />YOURS
            </span>
          </div>
        </div>

        {/* Right: Section Content */}
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
};

export default LevelUp;

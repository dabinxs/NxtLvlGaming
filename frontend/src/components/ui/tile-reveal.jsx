import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TileReveal({
  tiles = [],
  children,
  className,
  pinSpacing = true,
  scrub = 1.2,
}) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const tileRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const center = centerRef.current;
    if (!section) return;

    const validTiles = tileRefs.current.filter(Boolean);
    if (!validTiles.length) return;

    const ctx = gsap.context(() => {
      // Set initial off-screen / flying state for all tiles
      validTiles.forEach((tileEl, i) => {
        const config = tiles[i] || {};
        const from = config.from || {
          x: (i % 2 === 0 ? -1 : 1) * (200 + (i * 35)),
          y: (i < 5 ? -1 : 1) * (180 + ((i % 5) * 30)),
          rotation: (i % 2 === 0 ? -1 : 1) * (15 + (i * 2)),
          scale: 0.6,
          opacity: 0,
        };

        gsap.set(tileEl, {
          x: from.x,
          y: from.y,
          rotation: from.rotation,
          scale: from.scale,
          opacity: from.opacity !== undefined ? from.opacity : 0.15,
        });
      });

      // Set initial state for center content
      if (center) {
        gsap.set(center, {
          scale: 0.88,
          opacity: 0.25,
          y: 35,
        });
      }

      // Create scroll-driven scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=130%",
          pin: true,
          pinSpacing: pinSpacing,
          scrub: scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate center content to full reveal
      if (center) {
        tl.to(
          center,
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          0
        );
      }

      // Animate tiles flying into their final framing positions
      validTiles.forEach((tileEl, i) => {
        tl.to(
          tileEl,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          0
        );
      });
    }, section);

    return () => ctx.revert();
  }, [tiles, pinSpacing, scrub]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "relative w-full h-screen min-h-[720px] md:min-h-[760px] max-h-[1080px] overflow-hidden bg-[#05070f] flex items-center justify-center select-none",
        className
      )}
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-[#0066fd]/15 via-transparent to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#05070f] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05070f] to-transparent z-10" />

      {/* Main Canvas */}
      <div
        ref={containerRef}
        className="relative w-full h-full max-w-[1440px] mx-auto px-4 flex items-center justify-center"
      >
        {/* Center Content (Revealed Headline & Text) */}
        <div
          ref={centerRef}
          className="relative z-20 mx-auto max-w-xl px-4 text-center will-change-transform"
        >
          {children}
        </div>

        {/* Flying Image Tiles */}
        {tiles.map((tile, index) => {
          const isMobileHidden = tile.hideOnMobile;
          return (
            <div
              key={tile.id || index}
              ref={(el) => (tileRefs.current[index] = el)}
              style={tile.style}
              className={cn(
                "absolute z-10 will-change-transform",
                isMobileHidden ? "hidden md:block" : "block",
                tile.className
              )}
            >
              <a
                href={tile.href || "/novelties"}
                className="group relative block overflow-hidden rounded-2xl border border-white/20 bg-[#091322]/85 p-1.5 sm:p-2 shadow-[0_16px_40px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-300 hover:border-[#7DDDFF]/80 hover:shadow-[0_0_25px_rgba(0,102,253,0.35)]"
              >
                {/* Image */}
                <div className="relative aspect-[1.12/1] w-full overflow-hidden rounded-xl border border-white/10 bg-[#060c18]">
                  <img
                    src={tile.image}
                    alt={tile.title || tile.label || "Novelty"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10" />
                </div>

                {/* Bottom Label Tag */}
                {tile.label && (
                  <div className="mt-1.5 flex items-center justify-between px-1">
                    <span className="truncate font-display text-[8px] font-bold tracking-[.14em] text-white/90 sm:text-[9px]">
                      {tile.label}
                    </span>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0099FF] shadow-[0_0_6px_#0099FF]" />
                  </div>
                )}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TileReveal;

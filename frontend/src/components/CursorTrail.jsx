import React, { useEffect, useRef, useState } from "react";

const TRAIL = 16;

// Subtle blue particle that lags behind the cursor and drags a soft bending trail.
const CursorTrail = ({ containerRef }) => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const target = { x: 0, y: 0, has: false };
    const pos = { x: 0, y: 0 };
    const points = Array.from({ length: TRAIL }, () => ({ x: 0, y: 0 }));
    let inside = false;

    const onMove = (e) => {
      const el = containerRef.current;
      if (!el) return;
      const b = el.getBoundingClientRect();
      inside =
        e.clientX >= b.left &&
        e.clientX <= b.right &&
        e.clientY >= b.top &&
        e.clientY <= b.bottom;
      if (inside) {
        target.x = e.clientX - b.left;
        target.y = e.clientY - b.top;
        if (!target.has) {
          pos.x = target.x;
          pos.y = target.y;
          points.forEach((p) => {
            p.x = target.x;
            p.y = target.y;
          });
          target.has = true;
        }
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;

      let prev = pos;
      points.forEach((p) => {
        p.x += (prev.x - p.x) * 0.32;
        p.y += (prev.y - p.y) * 0.32;
        prev = p;
      });

      if (dotRef.current) {
        dotRef.current.setAttribute("cx", pos.x.toFixed(1));
        dotRef.current.setAttribute("cy", pos.y.toFixed(1));
      }
      if (pathRef.current) {
        const d = points.reduce(
          (acc, p, i) =>
            i === 0
              ? `M${pos.x.toFixed(1)} ${pos.y.toFixed(1)} L${p.x.toFixed(
                  1
                )} ${p.y.toFixed(1)}`
              : `${acc} L${p.x.toFixed(1)} ${p.y.toFixed(1)}`,
          ""
        );
        pathRef.current.setAttribute("d", d);
      }
      if (svgRef.current) {
        svgRef.current.style.opacity = inside && target.has ? "1" : "0";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [containerRef]);

  if (!enabled) return null;

  return (
    <svg
      ref={svgRef}
      data-testid="footer-cursor-trail"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-500"
      style={{ opacity: 0 }}
    >
      <path
        ref={pathRef}
        fill="none"
        stroke="#0099FF"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle ref={dotRef} r="5" fill="#00B7FF" fillOpacity="0.45" />
    </svg>
  );
};

export default CursorTrail;

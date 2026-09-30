import React, { useEffect, useRef } from "react";

// Interactive letter scatter: glyphs are pushed away from the cursor and spring back
const TextScatter = ({
  text,
  className = "",
  radius = 150,
  strength = 44,
  stiffness = 0.14,
}) => {
  const wrapRef = useRef(null);
  const letters = useRef([]);
  const state = useRef([]);
  const pointer = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const onMove = (e) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", () => {
      pointer.current = { x: -9999, y: -9999 };
    });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    let raf;
    const nodes = letters.current.filter(Boolean);
    state.current = nodes.map(() => ({ x: 0, y: 0, r: 0 }));

    const tick = () => {
      const p = pointer.current;
      nodes.forEach((node, i) => {
        const b = node.getBoundingClientRect();
        const cx = b.left + b.width / 2;
        const cy = b.top + b.height / 2;
        const s = state.current[i];

        const dx = cx - s.x - p.x;
        const dy = cy - s.y - p.y;
        const dist = Math.hypot(dx, dy);

        let tx = 0;
        let ty = 0;
        let tr = 0;
        if (dist < radius) {
          const force = (1 - dist / radius) ** 2;
          const angle = Math.atan2(dy, dx);
          tx = Math.cos(angle) * force * strength;
          ty = Math.sin(angle) * force * strength;
          tr = (dx > 0 ? 1 : -1) * force * 16;
        }

        s.x += (tx - s.x) * stiffness;
        s.y += (ty - s.y) * stiffness;
        s.r += (tr - s.r) * stiffness;

        node.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(
          2
        )}px, 0) rotate(${s.r.toFixed(2)}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [radius, strength, stiffness, text]);

  let index = -1;
  return (
    <span ref={wrapRef} className={className} data-testid="text-scatter">
      {text.split("\n").map((line, li) => (
        <span key={li} className="block">
          {line.split("").map((ch, ci) => {
            index += 1;
            const i = index;
            return (
              <span
                key={`${li}-${ci}`}
                ref={(el) => (letters.current[i] = el)}
                className="inline-block will-change-transform"
                style={{ transformOrigin: "50% 60%" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

export default TextScatter;

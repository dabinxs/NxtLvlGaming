import React, { useEffect, useRef } from "react";

const DEFAULTS = {
  radius: 260,
  maxY: 38,
  maxX: 12,
  maxRot: 5,
  maxScale: 0.05,
  maxSkew: 3,
  stiffness: 0.12,
  damping: 0.78,
};

// Magnetic, spring-based per-letter deformation driven by cursor distance.
// Desktop only; static when the pointer is away or reduced motion is requested.
const InteractiveWordmark = ({ segments, className = "", config = {} }) => {
  const { radius, maxY, maxX, maxRot, maxScale, maxSkew, stiffness, damping } = {
    ...DEFAULTS,
    ...config,
  };
  const wrapRef = useRef(null);
  const nodes = useRef([]);
  const sim = useRef([]);
  const centers = useRef([]);
  const segRefs = useRef([]);
  const owner = useRef([]);
  const pointer = useRef({ x: null, y: null });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const list = nodes.current.filter(Boolean);
    sim.current = list.map(() => ({ y: 0, vy: 0, x: 0, vx: 0, s: 0, vs: 0 }));

    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const wb = wrap.getBoundingClientRect();
      centers.current = list.map((n) => {
        const b = n.getBoundingClientRect();
        return {
          cx: b.left + b.width / 2 - wb.left,
          cy: b.top + b.height / 2 - wb.top,
        };
      });
      paintGradients();
    };
    // measure once letters are laid out at rest
    measure();
    window.addEventListener("resize", measure);

    const onMove = (e) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf;
    const tick = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const wb = wrap.getBoundingClientRect();
      const p = pointer.current;
      const px = p.x == null ? null : p.x - wb.left;
      const py = p.y == null ? null : p.y - wb.top;
      const active =
        px != null &&
        px > -radius &&
        px < wb.width + radius &&
        py > -radius &&
        py < wb.height + radius;

      list.forEach((node, i) => {
        const c = centers.current[i];
        const st = sim.current[i];
        let force = 0;
        let dirX = 0;
        if (active && c) {
          const dx = px - c.cx;
          const dy = py - c.cy;
          const dist = Math.hypot(dx, dy);
          if (dist < radius) {
            const t = 1 - dist / radius;
            force = t * t * (3 - 2 * t); // smoothstep falloff
            dirX = dx === 0 ? 0 : -Math.sign(dx);
          }
        }

        const targetY = -force * maxY;
        const targetX = dirX * force * maxX;
        const targetS = force;

        // soft spring integration
        st.vy += (targetY - st.y) * stiffness;
        st.vy *= damping;
        st.y += st.vy;

        st.vx += (targetX - st.x) * stiffness;
        st.vx *= damping;
        st.x += st.vx;

        st.vs += (targetS - st.s) * stiffness;
        st.vs *= damping;
        st.s += st.vs;

        const rot = st.x * (maxRot / maxX);
        const skew = -st.x * (maxSkew / maxX);
        const scale = 1 + st.s * maxScale;

        node.style.transform = `translate3d(${st.x.toFixed(2)}px, ${st.y.toFixed(
          2
        )}px, 0) rotate(${rot.toFixed(2)}deg) skewX(${skew.toFixed(
          2
        )}deg) scale(${scale.toFixed(3)})`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", measure);
    };
  }, [radius, maxY, maxX, maxRot, maxScale, maxSkew, stiffness, damping, segments]);

  // Each gradient letter clips its own slice of the word-wide gradient so the
  // colours stay continuous even while letters are transformed.
  const paintGradients = () => {
    segments.forEach((seg, si) => {
      if (!seg.gradient) return;
      const segEl = segRefs.current[si];
      if (!segEl) return;
      const sb = segEl.getBoundingClientRect();
      nodes.current.forEach((node, i) => {
        if (!node || owner.current[i] !== si) return;
        const b = node.getBoundingClientRect();
        node.style.backgroundSize = `${sb.width}px 100%`;
        node.style.backgroundPosition = `${-(b.left - sb.left)}px 0`;
      });
    });
  };

  useEffect(() => {
    paintGradients();
    const t = setTimeout(paintGradients, 300);
    window.addEventListener("resize", paintGradients);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", paintGradients);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segments]);

  let index = -1;
  return (
    <span ref={wrapRef} className={className} data-testid="interactive-wordmark">
      {segments.map((seg, si) => (
        <span
          key={si}
          ref={(el) => (segRefs.current[si] = el)}
          className={seg.gradient ? undefined : seg.className}
        >
          {seg.text.split("").map((ch, ci) => {
            index += 1;
            const i = index;
            owner.current[i] = si;
            return (
              <span
                key={`${si}-${ci}`}
                ref={(el) => (nodes.current[i] = el)}
                className={`inline-block will-change-transform ${
                  seg.gradient ? "letter-gradient" : ""
                }`}
                style={{ transformOrigin: "50% 70%" }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

export default InteractiveWordmark;

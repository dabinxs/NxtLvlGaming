import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { experiences } from "../mock";

const ChooseExperience = () => {
  const [active, setActive] = useState(2); // center card (Gaming Event)
  const total = experiences.length;

  const go = (dir) => {
    setActive((prev) => (prev + dir + total) % total);
  };

  return (
    <section id="experience" className="relative overflow-hidden bg-[#05070f] py-24">
      <h2 className="mb-14 text-center font-display text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold uppercase tracking-tight text-white" style={{ fontWeight: 800 }}>
        Choose Your Experience
      </h2>

      <div className="relative mx-auto flex h-[420px] max-w-[1280px] items-center justify-center px-4">
        {experiences.map((exp, i) => {
          let offset = i - active;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isCenter = offset === 0;
          const abs = Math.abs(offset);
          if (abs > 2) return null;

          const translateX = offset * 300;
          const scale = isCenter ? 1 : abs === 1 ? 0.82 : 0.66;
          const zIndex = 20 - abs;
          const opacity = abs > 1 ? 0.35 : 1;
          const blur = isCenter ? 0 : abs === 1 ? 1.5 : 3;

          return (
            <div
              key={exp.id}
              onClick={() => !isCenter && setActive(i)}
              className="absolute top-1/2 left-1/2 w-[500px] max-w-[85vw] cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-500 ease-out"
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                zIndex,
                opacity,
                filter: `blur(${blur}px)`,
                height: "380px",
              }}
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/30 to-transparent" />
              {isCenter && (
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="font-display text-4xl font-extrabold uppercase leading-none text-white" style={{ fontWeight: 800 }}>
                    {exp.title} <span className="blue-gradient-text">{exp.highlight}</span>
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-white/70">{exp.desc}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:border-[#0066FD] hover:bg-[#0066FD]/15"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {experiences.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-7 blue-gradient-bg" : "w-1.5 bg-white/25"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:border-[#0066FD] hover:bg-[#0066FD]/15"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default ChooseExperience;

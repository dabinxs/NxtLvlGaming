import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { experiences } from "../mock";

const ChooseExperience = () => {
  const [active, setActive] = useState(2); // center card (Gaming Event)
  const total = experiences.length;
  const timer = useRef(null);

  const startAuto = () => {
    stopAuto();
    timer.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 4000);
  };
  const stopAuto = () => {
    if (timer.current) clearInterval(timer.current);
  };

  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goManual = (updater) => {
    stopAuto();
    setActive(updater);
    startAuto();
  };

  const go = (dir) => goManual((prev) => (prev + dir + total) % total);

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#05070f] py-24"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      <h2 className="mb-14 text-center font-display text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold uppercase tracking-tight text-white" style={{ fontWeight: 800 }}>
        Choose Your Experience
      </h2>

      <div className="relative mx-auto flex h-[420px] max-w-[1280px] items-center justify-center px-4">
        {experiences.map((exp, i) => {
          let offset = i - active;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const abs = Math.abs(offset);
          // only render 3 cards: center + immediate neighbours
          if (abs > 1) return null;

          const isCenter = offset === 0;
          const translateX = offset * 560;
          const scale = isCenter ? 1 : 0.86;
          const zIndex = 20 - abs;
          const opacity = isCenter ? 1 : 0.5;
          const blur = isCenter ? 0 : 2;

          return (
            <div
              key={exp.id}
              onClick={() => !isCenter && goManual(i)}
              className={`absolute left-1/2 top-1/2 w-[560px] max-w-[88vw] overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-700 ease-out ${
                isCenter ? "cursor-default" : "cursor-pointer"
              }`}
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                zIndex,
                opacity,
                filter: `blur(${blur}px)`,
                height: "400px",
              }}
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/25 to-transparent" />
              {isCenter && (
                <div className="absolute inset-x-0 bottom-0 px-8 pb-9 text-center">
                  <h3 className="font-display text-4xl font-extrabold uppercase leading-none text-white" style={{ fontWeight: 800 }}>
                    {exp.title} <span className="blue-gradient-text">{exp.highlight}</span>
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm text-white/70">{exp.desc}</p>
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
              onClick={() => goManual(i)}
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

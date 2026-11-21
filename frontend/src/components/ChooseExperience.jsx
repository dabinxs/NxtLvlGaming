import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { experiences as defaultExperiences } from "../mock";

const ChooseExperience = ({
  experiences = defaultExperiences,
  initialActive = 2,
  sectionTitle = "Choose Your Experience",
}) => {
  const [active, setActive] = useState(initialActive);
  const total = experiences.length;
  const timer = useRef(null);

  useEffect(() => {
    setActive(initialActive);
  }, [initialActive, total]);

  const startAuto = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(
      () => setActive((prev) => (prev + 1) % total),
      4500
    );
  }, [total]);

  const stopAuto = useCallback(() => clearInterval(timer.current), []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const goTo = (next) => {
    stopAuto();
    setActive(next);
    startAuto();
  };
  const go = (dir) => goTo((active + dir + total) % total);

  return (
    <section
      id="experience"
      data-testid="choose-experience"
      className="relative overflow-hidden bg-[#05070f] py-24"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      <h2
        className="mb-12 px-4 text-center font-display text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold uppercase tracking-tight text-white"
        style={{ fontWeight: 800 }}
      >
        {sectionTitle}
      </h2>

      <div className="relative w-full">
        <div className="lenticular-scene relative h-[clamp(300px,38vw,460px)] w-full">
          {experiences.map((exp, i) => {
            let offset = i - active;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;
            const abs = Math.abs(offset);
            if (abs > 2) return null;

            const dir = Math.sign(offset);
            const isCenter = offset === 0;

            return (
              <article
                key={exp.id}
                data-testid={`experience-card-${i}`}
                onClick={() => !isCenter && goTo(i)}
                className="lenticular-card"
                style={{
                  transform: `translate(-50%, -50%) translateX(${
                    offset * 58
                  }%) rotateY(${-dir * 20}deg) scale(${isCenter ? 1 : 0.9})`,
                  zIndex: 20 - abs,
                  opacity: abs > 1 ? 0 : 1,
                  filter: isCenter ? "none" : "brightness(0.4) saturate(0.85)",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                <div className="lenticular-face relative">
                  <picture className="contents">
                    {exp.image && exp.image.startsWith("/experience-") && exp.image.endsWith(".jpg") && (
                      <source srcSet={exp.image.replace(/\.jpg$/, ".webp")} type="image/webp" />
                    )}
                    <img
                      src={exp.image}
                      alt={`${exp.title} ${exp.highlight} rental by Next Level Gaming`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/60 to-[#040814]/25" />
                  <span className="lenticular-sheen" />
                  <div
                    className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 text-center transition-opacity duration-300 sm:px-8 sm:pb-10"
                    style={{ opacity: isCenter ? 1 : 0, pointerEvents: isCenter ? "auto" : "none" }}
                  >
                    <h3
                      className="font-display text-[clamp(1.6rem,3vw,2.75rem)] font-extrabold leading-none text-white drop-shadow-lg"
                      style={{ fontWeight: 800 }}
                    >
                      {exp.title}{" "}
                      <span className="text-[#1E90FF]">{exp.highlight}</span>
                    </h3>
                    <p className="mx-auto mt-3 max-w-md text-[14.5px] text-white/80 drop-shadow sm:text-[15px]">
                      {exp.desc}
                    </p>
                    {exp.slug && (
                      <div className="mt-4">
                        <Link
                          to={`/${exp.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#7DDDFF]/40 bg-[#0066FD]/20 px-4 py-1.5 text-[11.5px] font-bold uppercase tracking-wider text-[#7DDDFF] backdrop-blur-md transition-colors hover:border-[#7DDDFF] hover:bg-[#0066FD]/40 hover:text-white"
                        >
                          <span>View {exp.title} {exp.highlight}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-0 z-50">
          <button
            onClick={() => go(-1)}
            data-testid="experience-prev"
            aria-label="Previous experience"
            className="pointer-events-auto absolute left-[8%] top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#05070f] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white md:left-[10%]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            data-testid="experience-next"
            aria-label="Next experience"
            className="pointer-events-auto absolute right-[8%] top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#05070f] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white md:right-[10%]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-9 flex items-center justify-center gap-2">
        {experiences.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            data-testid={`experience-dot-${i}`}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-8 bg-[#1E90FF]" : "w-4 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ChooseExperience;

import React, { useState } from "react";
import { Play, X } from "lucide-react";
import { testimonials } from "../mock";

const Card = ({ testimonial, onPlay, wide }) => (
  <div
    className={`testimonials-card group relative mx-3 flex h-[236px] w-[calc(100vw-24px)] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-[#0c1526] to-[#080d18] p-5 transition-all duration-300 hover:border-[#0066FD]/40 sm:p-6 ${
      wide ? "min-[640px]:w-[400px]" : "min-[640px]:w-[330px]"
    }`}
  >
    <p
      className="overflow-hidden text-[14px] leading-relaxed text-white/75"
      style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 5 }}
    >
      “{testimonial.quote}”
    </p>

    <div className="mt-auto flex h-11 shrink-0 items-center gap-3">
      <div
        className="flex h-11 min-w-0 flex-1 items-center font-display text-sm font-semibold leading-tight text-white"
      >
        <span
          className="overflow-hidden"
          style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}
        >
          {testimonial.name}
        </span>
      </div>
      <button
        onClick={() => onPlay(testimonial)}
        className="play-pulse flex h-11 w-11 items-center justify-center rounded-full blue-gradient-bg text-white transition-transform hover:scale-110"
        aria-label={`Play ${testimonial.name} testimonial`}
      >
        <Play className="h-4 w-4 fill-white" />
      </button>
    </div>
  </div>
);

const Row = ({ items, direction, onPlay, wide }) => {
  const doubled = [...items, ...items];
  return (
    <div className="testimonials-row marquee-pause relative overflow-hidden py-2">
      <div
        className={`testimonials-track marquee-track ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map((testimonial, i) => (
          <Card
            key={`${testimonial.id}-${direction}-${i}`}
            testimonial={testimonial}
            onPlay={onPlay}
            wide={wide}
          />
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [modal, setModal] = useState(null);
  // Repeat approved testimonials to keep both animated marquee rows full.
  const makeRowItems = (offset) =>
    Array.from({ length: 6 }, (_, index) => {
      const testimonial = testimonials[(index + offset) % testimonials.length];
      return { ...testimonial, id: `${testimonial.id}-${offset}-${index}` };
    });
  const rowA = makeRowItems(0);
  const rowB = makeRowItems(1);

  return (
    <section className="testimonials-section relative overflow-hidden bg-[#070b16] py-14 sm:py-24">
      <h2
        className="mb-7 px-4 text-center font-display text-[clamp(1.5rem,8vw,3rem)] font-extrabold uppercase tracking-tight text-white sm:mb-14 sm:px-0 sm:text-[clamp(1.8rem,4.5vw,3rem)]"
        style={{ fontWeight: 800 }}
      >
        What Our Clients Say
      </h2>
      <p className="mb-3 text-center text-[11px] font-semibold tracking-wide text-sky-200/70 sm:hidden">Swipe to read more client reviews</p>

      <div className="flex flex-col gap-1 sm:gap-2">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 bg-gradient-to-r from-[#070b16] to-transparent sm:block md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-gradient-to-l from-[#070b16] to-transparent sm:block md:w-28" />
          <Row items={rowA} direction="left" onPlay={setModal} wide />
          <Row items={rowB} direction="right" onPlay={setModal} />
        </div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1c] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-[#0066FD]"
              aria-label="Close testimonial video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full bg-black">
              <video
                className="h-full w-full"
                src={modal.video}
                controls
                autoPlay
                playsInline
                aria-label={`${modal.name} testimonial video`}
              />
            </div>
            <div className="p-5 font-display text-lg font-semibold text-white">{modal.name}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;

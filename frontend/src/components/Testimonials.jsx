import React, { useState } from "react";
import { Star, Play, X } from "lucide-react";
import { testimonials } from "../mock";

const Stars = ({ n }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < n ? "fill-[#7DDDFF] text-[#7DDDFF]" : "fill-white/10 text-white/10"
        }`}
      />
    ))}
  </div>
);

const Card = ({ t, onPlay, wide }) => (
  <div
    className={`group relative mx-3 shrink-0 overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-[#0c1526] to-[#080d18] p-6 transition-all duration-300 hover:border-[#0066FD]/40 ${
      wide ? "w-[400px]" : "w-[330px]"
    }`}
  >
    <Stars n={t.stars} />
    <p className="mt-4 text-[14px] leading-relaxed text-white/75">"{t.quote}"</p>

    <div className="mt-5 flex items-center justify-between">
      <div>
        <div className="font-display text-sm font-semibold text-white">{t.name}</div>
        <div className="text-[11px] text-white/45">{t.role}</div>
      </div>
      <button
        onClick={() => onPlay(t)}
        className="play-pulse flex h-11 w-11 items-center justify-center rounded-full blue-gradient-bg text-white transition-transform hover:scale-110"
        aria-label={`Play ${t.name} testimonial`}
      >
        <Play className="h-4 w-4 fill-white" />
      </button>
    </div>
  </div>
);

const Row = ({ items, direction, onPlay, wide }) => {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-pause relative overflow-hidden py-2">
      <div
        className={`marquee-track ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map((t, i) => (
          <Card key={`${t.id}-${i}`} t={t} onPlay={onPlay} wide={wide} />
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [modal, setModal] = useState(null);
  const rowA = testimonials.slice(0, 4);
  const rowB = testimonials.slice(4, 8);

  return (
    <section className="relative overflow-hidden bg-[#070b16] py-24">
      <h2 className="mb-14 text-center font-display text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold uppercase tracking-tight text-white" style={{ fontWeight: 800 }}>
        What Our Clients Say
      </h2>

      <div className="flex flex-col gap-2">
        {/* edge fades */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#070b16] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#070b16] to-transparent" />
          <Row items={rowA} direction="left" onPlay={setModal} wide />
          <Row items={rowB} direction="right" onPlay={setModal} />
        </div>
      </div>

      {/* Video modal */}
      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1c] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-[#0066FD]"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={modal.video}
                title={`${modal.name} testimonial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex items-center justify-between p-5">
              <div>
                <div className="font-display text-lg font-semibold text-white">{modal.name}</div>
                <div className="text-sm text-white/50">{modal.role}</div>
              </div>
              <Stars n={modal.stars} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;

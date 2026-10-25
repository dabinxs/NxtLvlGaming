import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";

const DESTINATION_GROUPS = [
  {
    title: "Events",
    items: [
      { label: "Gaming Events", to: "/gaming-events" },
      { label: "Movie Nights", to: "/movie-nights" },
      { label: "Trivia Nights", to: "/trivia-nights" },
    ],
  },
  {
    title: "Experiences",
    items: [
      { label: "Virtual Reality", to: "/virtual-reality" },
      { label: "360 Video Booth", to: "/photo-booth" },
      { label: "Just Dance", to: "/just-dance" },
      { label: "Silent Disco", to: "/silent-disco" },
      { label: "Sim Racing", to: "/sim-racing" },
      { label: "Glow Park", to: "/glow-park" },
    ],
  },
];

const ExploreDestinationsCTA = ({
  label = "Check Out Other Events",
  className = "",
  testId = "explore-destinations-cta",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="explore-destinations-dialog"
        data-testid={testId}
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {label}
        <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#02050c]/85 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            ref={dialogRef}
            id="explore-destinations-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="explore-destinations-title"
            className="w-full max-w-2xl overflow-y-auto overscroll-contain rounded-t-3xl border border-white/15 bg-[#0b1221] p-4 pb-[calc(env(safe-area-inset-bottom)+16px)] shadow-2xl sm:max-h-[min(85dvh,720px)] sm:rounded-3xl sm:p-7"
            style={{ maxHeight: "calc(100dvh - env(safe-area-inset-top) - 12px)" }}
          >
            <div className="mb-5 flex items-start justify-between gap-4 sm:mb-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300 sm:text-xs">
                  Find your next experience
                </p>
                <h2
                  id="explore-destinations-title"
                  className="mt-1 font-display text-2xl font-extrabold uppercase text-white sm:text-3xl"
                >
                  Explore Events
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close event and experience choices"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/[0.12]"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              {DESTINATION_GROUPS.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-2 border-b border-white/10 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-200 sm:mb-3">
                    {group.title}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                        className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-sky-300/40 hover:bg-sky-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-sky-200" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ExploreDestinationsCTA;

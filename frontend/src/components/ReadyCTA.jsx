import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ExploreDestinationsCTA from "./ExploreDestinationsCTA";

const ReadyCTA = ({ productsFirst = false }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative flex min-h-[520px] items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1581502446078-63d6464ba4fc?auto=format&fit=crop&w=1600&q=80"
          alt="Dark event venue"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#05070f]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070f] via-transparent to-[#05070f]" />

        <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center">
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.4rem)] font-extrabold uppercase leading-[0.95] text-white" style={{ fontWeight: 800 }}>
            Ready To <span className="blue-gradient-text">Level Up</span>
            <br />
            Your Event?
          </h2>

          {productsFirst ? (
            <Link
              to="/explore-experiences"
              className="cta-fill group mt-9 inline-flex min-h-[52px] w-full max-w-[320px] items-center justify-center gap-2.5 rounded-full blue-gradient-bg px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-wide text-white shadow-[0_12px_40px_rgba(0,102,253,0.45)] sm:w-auto sm:px-8"
            >
              Browse Experiences
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/quote"
                className="cta-fill group inline-flex min-h-[52px] w-full max-w-[320px] items-center justify-center gap-2.5 rounded-full blue-gradient-bg px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-wide text-white shadow-[0_12px_40px_rgba(0,102,253,0.45)] sm:w-auto sm:px-8"
              >
                Build Your Event
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <ExploreDestinationsCTA
                label="Check Out Other Events"
                testId="check-out-other-events-cta"
                className="cta-fill inline-flex min-h-[52px] w-full max-w-[320px] items-center justify-center gap-2 rounded-full border border-white/60 bg-black/20 px-6 py-4 text-center text-[12px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 sm:w-auto sm:px-8 sm:text-[13px]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReadyCTA;

import React, { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const WORKSHOPS = [
  {
    id: "01",
    tag: "HATS & BEANIES",
    title: "(PATCHED CITY) Trucker Hats & Beanies",
    desc: "Customize your own trucker hat or beanie with unique patches and designs.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
    rotation: "sm:-rotate-1",
  },
  {
    id: "02",
    tag: "HAT CUSTOMIZATION",
    title: "Custom Trucker Hats",
    desc: "Design and personalize your own trucker hat to match your style.",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80",
    rotation: "sm:rotate-2",
  },
  {
    id: "03",
    tag: "SOCKS",
    title: "Custom Socks",
    desc: "Create your own custom socks with patterns, logos or text.",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=600&q=80",
    rotation: "sm:-rotate-2",
  },
  {
    id: "04",
    tag: "BRACELETS",
    title: "Bead-tastics Custom Bracelets",
    desc: "Fun, hand-crafted bracelets designed by you, for you.",
    image: "https://images.unsplash.com/photo-1611591475879-c5ec2b810d7a?auto=format&fit=crop&w=600&q=80",
    rotation: "sm:rotate-1",
  },
  {
    id: "05",
    tag: "PILLOW DOLLS",
    title: "Custom Pillow Dolls",
    desc: "Turn your favorite photos, characters or ideas into custom pillow dolls.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    rotation: "sm:-rotate-1",
  },
  {
    id: "06",
    tag: "SEQUENCE PILLOWS",
    title: "Custom Sequence Pillows",
    desc: "Create your own sequin pillow with colors, text or images that change.",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    rotation: "sm:rotate-2",
  },
  {
    id: "07",
    tag: "BRACELETS",
    title: "Intention Bracelet",
    desc: "Design a meaningful bracelet with intention, style and purpose.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    rotation: "sm:-rotate-1",
  },
  {
    id: "08",
    tag: "KEYCHAINS",
    title: "Laser-Engraved Wood & Metal Keychains",
    desc: "Personalize high-quality wooden or metal keychains with your own design.",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=600&q=80",
    rotation: "sm:rotate-1",
  },
  {
    id: "09",
    tag: "CUSTOM RINGS",
    title: "Stamped Custom Rings / Hammerless Ring Press",
    desc: "Create your own custom stamped ring with our easy hammerless ring press.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    rotation: "sm:-rotate-2",
  },
  {
    id: "10",
    tag: "PLUSH BAGS",
    title: "Silly Sacks (Custom Character Plush Bags)",
    desc: "Bring your imagination to life with custom character plush bags.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80",
    rotation: "sm:rotate-1",
  },
];

const STEPS = [
  {
    id: "01",
    title: "ASK",
    desc: "Our team specializes in the design of our events to ensure that it is optimal for your guests and your budget.",
  },
  {
    id: "02",
    title: "DESIGN",
    desc: "Tell us what you're imagining, your audience, your location and the kind of experience you want.",
  },
  {
    id: "03",
    title: "PLAY",
    desc: "Our expert team will be with you every step of the way. All you have to do is ASK!",
  },
];

const Novelties = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#041222] text-foreground font-sans selection:bg-[#0099FF] selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* ================= SECTION 1: HERO ================= */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 flex items-center bg-[#041222]">
          {/* Background image uploaded by user (unzoomed positioning) */}
          <img
            src="/novelties-bg.png"
            alt="Novelties background"
            className="absolute inset-0 h-full w-full object-cover object-right pointer-events-none select-none z-0"
          />

          {/* Vertical scroll text on right edge */}
          <div className="hidden lg:flex pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 z-20 items-center gap-3 rotate-90 origin-right text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            <span>SCROLL TO EXPLORE</span>
            <span className="h-[2px] w-6 bg-white/30" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 w-full">
            {/* Tag */}
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0099FF]">
              <span className="h-[2px] w-7 bg-[#0099FF]" />
              <span>03 / NOVELTIES</span>
              <span className="text-white/40 font-normal">· CURATED FOR THE UNEXPECTED</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-serif text-[clamp(3.2rem,7.5vw,6.5rem)] font-normal leading-[1.04] tracking-tight text-white">
              Make Room <br />
              For{" "}
              <span className="italic font-serif text-[#0099FF] drop-shadow-[0_0_30px_rgba(0,153,255,0.45)]">
                Wonder.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/70 md:text-[18px]">
              Not every great event needs a screen. Discover tactile, social and surprising
              experiences designed to give your guests something to talk about long after the night
              is over.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#workshops"
                className="group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#0099FF] px-8 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_24px_rgba(0,153,255,0.4)] transition-all duration-300 hover:bg-[#0088EE] hover:shadow-[0_0_36px_rgba(0,153,255,0.6)]"
              >
                CUSTOMIZE YOUR NOVELTIES
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: THE ART OF THE UNEXPECTED ================= */}
        <section className="relative border-t border-white/10 bg-[#030c18] py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              {/* Left Column */}
              <div className="lg:col-span-6 lg:border-r lg:border-white/10 lg:pr-12">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0099FF]">
                  <span className="h-[2px] w-7 bg-[#0099FF]" />
                  <span>03 / NOVELTIES</span>
                </div>
                <h2 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white">
                  THE ART OF <br />
                  THE <br />
                  <span className="italic font-serif text-[#0099FF]">UNEXPECTED.</span>
                </h2>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-6 flex flex-col gap-8">
                <p className="font-serif text-[18px] leading-relaxed text-white/80 md:text-[20px]">
                  Our Novelties collection brings hands-on creativity to your event. These unique,
                  interactive experiences give guests the chance to make, personalize, and take
                  home something special — turning moments into lasting memories.
                </p>

                <div className="pt-4 border-t border-white/10">
                  <div className="font-serif italic text-[17px] text-white/90 space-y-1">
                    <p>Create</p>
                    <p>Personalize</p>
                    <p>Take Home</p>
                  </div>
                  <div className="mt-3 h-[2px] w-12 bg-[#0099FF]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: CREATIVE WORKSHOPS (GRID OF 10 PRINTED PHOTO CARDS) ================= */}
        <section id="workshops" className="relative py-24 md:py-32 bg-[#041222] border-t border-[#0099FF]/30">
          {/* Subtle dotted grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10 mx-auto max-w-[1380px] px-5 md:px-8">
            {/* Header bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-16 pb-6 border-b border-white/10">
              <div className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#0099FF]">
                NOVELTIES / 06 CREATIVE WORKSHOPS
              </div>
              <a
                href="#footer"
                className="group flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-white hover:text-[#0099FF] transition-colors"
              >
                CHOOSE AN EXPERIENCE
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* 10 Card Editorial Photo Grid (5 per row on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
              {WORKSHOPS.map((item) => (
                <div
                  key={item.id}
                  className={`group relative flex flex-col transition-all duration-500 hover:z-30 hover:scale-[1.03] ${item.rotation}`}
                >
                  {/* Physical Printed Photo Frame */}
                  <div className="relative rounded-[4px] bg-[#f4f4f6] p-2 shadow-[0_16px_38px_rgba(0,0,0,0.7)] transition-all duration-400 group-hover:shadow-[0_20px_45px_rgba(0,153,255,0.35)]">
                    {/* Electric Blue Translucent Tape at top (sharp corners, translucent) */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 h-4.5 w-14 bg-[#0052cc]/55 border border-white/20 shadow-[0_2px_8px_rgba(0,82,204,0.3)] transform -rotate-2 rounded-none backdrop-blur-[0.5px]" />

                    {/* Inside Photo Image Container */}
                    <div className="relative aspect-[1/1] w-full overflow-hidden bg-black rounded-[2px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                        loading="lazy"
                      />
                      {/* Dark gradient overlay over photo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                      {/* Top Badges over photo */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                        {/* Number */}
                        <span className="font-serif text-white font-medium text-sm drop-shadow">
                          {item.id}
                        </span>
                        {/* Outlined Category Pill */}
                        <span className="border border-white/50 bg-black/30 rounded-full px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                          {item.tag}
                        </span>
                      </div>

                      {/* Bottom Left Title Overlaid on Photo */}
                      <div className="absolute bottom-3 left-3 right-12 z-10">
                        <h3 className="font-serif text-white text-[17px] font-normal leading-tight drop-shadow-md group-hover:text-[#7DDDFF] transition-colors">
                          {item.title}
                        </h3>
                      </div>

                      {/* Bottom Right Arrow Button over photo */}
                      <div className="absolute bottom-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/50 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0099FF] group-hover:border-[#0099FF]">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Description Outside & Underneath the Photo Card */}
                  <div className="mt-3.5 px-1">
                    <p className="text-white/70 text-[13px] leading-snug font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: SHAPE THE OCCASION (3 STEPS) ================= */}
        <section className="relative overflow-hidden border-t border-white/10 bg-[#020917] py-20 md:py-28">
          {/* Subtle CSS Lighting Effects */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-[#0099FF]/15 blur-[140px]" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-[400px] w-[400px] rounded-full bg-[#0066FF]/10 blur-[130px]" />

          <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8">
            {/* Header */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 items-end mb-12 md:mb-16">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0099FF]">
                  <span>04 / SHAPE THE OCCASION</span>
                  <span className="h-[1px] flex-1 bg-[#0099FF]/40" />
                </div>
                <h2 className="mt-4 font-serif text-[clamp(2.6rem,5.5vw,4.8rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white">
                  START WITH A <br />
                  <span className="italic font-serif text-[#0099FF]">FEELING.</span>
                </h2>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-end pb-2">
                <span className="h-[2px] w-6 bg-[#0099FF] mb-4 inline-block" />
                <p className="text-[14px] md:text-[15.5px] leading-relaxed text-white/75">
                  Choose a mood, a memory or simply something your guests have never tried.
                  We will shape the details around it.
                </p>
              </div>
            </div>

            {/* 3 Step Cards with Native Glowing Corner Arcs */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-2">
              {STEPS.map((step) => (
                <div
                  key={step.id}
                  className="group relative overflow-hidden rounded-[20px] border border-[#0099FF]/40 bg-gradient-to-b from-[#061833] via-[#041226] to-[#020b1a] p-7 md:p-9 shadow-[0_10px_30px_rgba(0,102,255,0.12)] transition-all duration-300 hover:border-[#0099FF] hover:shadow-[0_14px_45px_rgba(0,153,255,0.25)] hover:-translate-y-1"
                >
                  {/* Top-Right Glowing Corner Arc SVG */}
                  <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 overflow-hidden rounded-tr-[20px]">
                    <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#0099FF]/25 blur-2xl" />
                    <svg
                      viewBox="0 0 160 160"
                      className="absolute right-0 top-0 h-full w-full"
                      fill="none"
                    >
                      <path
                        d="M 60 0 C 60 75, 160 75, 160 120"
                        stroke="#0099FF"
                        strokeWidth="1.5"
                        strokeOpacity="0.85"
                      />
                      <circle cx="120" cy="78" r="2.5" fill="#7DDDFF" />
                      <circle cx="120" cy="78" r="6" fill="#0099FF" opacity="0.6" className="blur-[2px]" />
                      <circle cx="120" cy="78" r="12" fill="#0099FF" opacity="0.25" className="blur-[4px]" />
                    </svg>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#0099FF]">
                      {step.id}
                    </div>
                    <h3 className="mt-6 font-serif text-[32px] md:text-[38px] font-extrabold uppercase tracking-wide text-white transition-colors group-hover:text-[#7DDDFF]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-white/70 font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 5: CREATE YOUR OWN EXPERIENCE ================= */}
        <section className="relative overflow-hidden py-24 md:py-36 bg-[#041222]">
          {/* Subtle background glows */}
          <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#0099FF]/15 blur-[150px]" />

          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              {/* Left Text */}
              <div className="lg:col-span-6">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0099FF]">
                  <span className="h-[2px] w-7 bg-[#0099FF]" />
                  <span>05 / CREATE YOUR OWN EXPERIENCE</span>
                </div>
                <h2 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white">
                  YOUR IDEA <br />
                  <span className="italic font-serif text-[#0099FF]">MADE </span> <br />
                  <span className="italic font-serif text-[#0099FF]">TANGIBLE.</span>
                </h2>
                <p className="mt-6 text-[16px] leading-relaxed text-white/70 md:text-[17px]">
                  Mix novelties, entertainment and event details into a custom experience that
                  feels collected rather than assembled.
                </p>
                <div className="mt-10">
                  <a
                    href="#footer"
                    className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#0099FF] px-8 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_24px_rgba(0,153,255,0.4)] transition-all duration-300 hover:bg-[#0088EE] hover:shadow-[0_0_36px_rgba(0,153,255,0.6)]"
                  >
                    START BUILDING ↗
                  </a>
                </div>
              </div>

              {/* Right Cards Stack */}
              <div className="lg:col-span-6 relative flex items-center justify-center pt-8">
                {/* Annotations */}
                <div className="hidden sm:block absolute -top-2 left-6 text-[11px] font-mono uppercase tracking-widest text-[#7DDDFF]">
                  CUSTOM NOVELTIES ⤵
                </div>
                <div className="hidden sm:block absolute -top-2 right-6 text-[11px] font-mono uppercase tracking-widest text-[#7DDDFF]">
                  HANDS-ON EXPERIENCES ⤵
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  {/* Card 1 */}
                  <div className="transform sm:-rotate-6 rounded-2xl border border-white/10 bg-[#071428] p-4 shadow-xl">
                    <div className="text-[10px] font-bold text-[#0099FF]">01</div>
                    <img
                      src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80"
                      alt="Trucker Hats"
                      className="mt-2 aspect-[4/3] w-full rounded-lg object-cover"
                    />
                    <h4 className="mt-3 font-serif text-sm font-bold text-white leading-snug">
                      (PATCHED CITY) Trucker Hats & Beanies
                    </h4>
                  </div>

                  {/* Card 2 (Highlighted Center) */}
                  <div className="transform sm:scale-105 z-10 rounded-2xl border-2 border-[#0099FF] bg-[#091a38] p-4 shadow-[0_0_30px_rgba(0,153,255,0.4)]">
                    <div className="text-[10px] font-bold text-[#0099FF]">02</div>
                    <img
                      src="https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=400&q=80"
                      alt="Laser Engraved Keychains"
                      className="mt-2 aspect-[4/3] w-full rounded-lg object-cover"
                    />
                    <h4 className="mt-3 font-serif text-sm font-bold text-white leading-snug">
                      Laser-Engraved Wood & Metal Keychains
                    </h4>
                  </div>

                  {/* Card 3 */}
                  <div className="transform sm:rotate-6 rounded-2xl border border-white/10 bg-[#071428] p-4 shadow-xl">
                    <div className="text-[10px] font-bold text-[#0099FF]">03</div>
                    <img
                      src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80"
                      alt="Custom Pillow Dolls"
                      className="mt-2 aspect-[4/3] w-full rounded-lg object-cover"
                    />
                    <h4 className="mt-3 font-serif text-sm font-bold text-white leading-snug">
                      Custom Pillow Dolls
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default Novelties;

import React, { useEffect } from "react";
import { ArrowRight, CircleDot, Gamepad2, Lightbulb, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReadyCTA from "./ReadyCTA";
import { useCmsPage } from "../lib/cmsContent";
import { CMS_PAGES } from "../lib/cmsPages";

const INCLUDED = [
  { title: "8 Glow Swings", description: "Eight illuminated swings create an inviting, high-energy centerpiece for guests to enjoy.", icon: Sparkles },
  { title: "4 Glow Seesaws", description: "Four glowing seesaws bring a playful, social activity guests can share together.", icon: Gamepad2 },
  { title: "Colorful Uplighting", description: "Uplights add color around the event space and complete the Glow Park atmosphere.", icon: Lightbulb },
  { title: "Glowing Mini Golf", description: "A glowing mini-golf setup adds a friendly challenge for guests of different ages.", icon: CircleDot },
];

const GlowPark = () => {
  const cmsPage = useCmsPage("glow-park", CMS_PAGES.find((page) => page.slug === "glow-park"));

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return <div className="min-h-screen bg-[#05070f] text-foreground">
    <Navbar />
    <main>
      <section className="relative isolate overflow-hidden border-b border-white/5 px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
        {cmsPage.heroImage && <img src={cmsPage.heroImage} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35" />}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_30%,rgba(106,37,255,.28),transparent_35%),linear-gradient(100deg,#05070f_8%,rgba(5,7,15,.86)_62%,rgba(5,7,15,.56))]" />
        <div className="mx-auto max-w-[1180px]">
          <p className="flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[.22em] text-[#c39cff]"><span className="h-0.5 w-7 bg-[#a855f7]" />THE FULL PACKAGE</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold uppercase italic leading-[1.04] tracking-tight text-white">{cmsPage.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/75 sm:text-[19px]">{cmsPage.heroSubtitle}</p>
          <Link to="/quote" className="mt-9 inline-flex items-center gap-3 rounded-full border border-[#b56cff]/55 bg-[#8c38e8]/20 px-6 py-3 text-xs font-extrabold uppercase tracking-[.14em] text-white transition hover:bg-[#8c38e8]/35">Plan a Glow Park event <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="border-b border-white/5 bg-[#070b16] py-20 md:py-28">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <p className="font-display text-[11px] font-bold uppercase tracking-[.2em] text-[#c39cff]">GLOW PARK · FULL PACKAGE</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold uppercase leading-tight text-white">A bright, hands-on experience for the whole event</h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-white/65">Bring the Glow Park full package to your venue with illuminated attractions, colorful uplighting, and a glowing mini-golf experience. Guests can move between activities and make the space their own.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {INCLUDED.map(({ title, description, icon: Icon }) => <article key={title} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#10152b] to-[#090d19] p-6 transition hover:border-[#a855f7]/45">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-[#a855f7]/30 bg-[#8b39eb]/15 text-[#d2aaff]"><Icon size={22} /></span>
              <h3 className="mt-5 font-display text-lg font-extrabold uppercase text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
            </article>)}
          </div>
        </div>
      </section>

      {cmsPage.gallery?.some((item) => item.src) && <section className="bg-[#05070f] py-20 md:py-28">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <p className="font-display text-[11px] font-bold uppercase tracking-[.2em] text-[#c39cff]">SEE IT IN ACTION</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold uppercase text-white">The Glow Park Experience</h2>
          <div className="mt-9 grid gap-6 md:grid-cols-3">{cmsPage.gallery.filter((item) => item.src).map((item) => <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1121]"><img src={item.src} alt={item.title} className="aspect-[4/3] w-full object-cover" loading="lazy" /><div className="p-5"><h3 className="font-display font-extrabold uppercase text-white">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-white/60">{item.subtitle}</p></div></article>)}</div>
        </div>
      </section>}
      <ReadyCTA />
    </main>
    <Footer />
  </div>;
};

export default GlowPark;

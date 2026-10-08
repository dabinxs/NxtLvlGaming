import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./AboutPage.css";

gsap.registerPlugin(ScrollTrigger);

const storyPhotos = [
  { className: "about-photo about-photo--one", label: "Story image placeholder", speed: -0.27 },
  { className: "about-photo about-photo--two", label: "Event image placeholder", speed: 0.16 },
  { className: "about-photo about-photo--three", label: "Story image placeholder", speed: 0.32 },
  { className: "about-photo about-photo--four", label: "Event image placeholder", speed: -0.12 },
  { className: "about-photo about-photo--five", label: "Event image placeholder", speed: 0.22 },
  { className: "about-photo about-photo--six", label: "Story image placeholder", speed: -0.34 },
];

const offerings = [
  {
    title: "Gaming & esports",
    copy: "Multiplayer gaming, tournaments and head-to-head competition, with large screens and the sound to bring everyone into the game.",
    label: "Gaming event image placeholder",
  },
  {
    title: "Immersive experiences",
    copy: "Virtual reality, 360 video, sim racing and dance experiences give guests new ways to step in and take part.",
    label: "Experience image placeholder",
  },
  {
    title: "Big-screen entertainment",
    copy: "Movie nights and shared-screen entertainment, supported by event-ready projection, DJ-quality sound and lighting.",
    label: "Screen event image placeholder",
  },
];

const values = [
  { name: "Quality", copy: "Large-format screens, professional equipment and DJ-quality sound and lighting, brought together for a polished event." },
  { name: "Reliability", copy: "Our team handles setup and breakdown and stays on hand, so hosts can focus on the people in the room." },
  { name: "Innovation", copy: "From multiplayer gaming and VR to new interactive formats, we keep finding fresh ways to bring guests in." },
  { name: "Experience", copy: "More than ten years in event production has taught us how to plan thoughtfully and adapt to the room." },
  { name: "Connection", copy: "Games give people a reason to talk, compete and laugh together. That shared moment is what we build for." },
];

function AboutPage() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = "About | Next Level Gaming Events";
    const page = pageRef.current;
    if (!page) return undefined;

    let lenis;
    let lenisTick;
    let ctx;
    let mounted = true;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const desktopQuery = window.matchMedia("(min-width: 900px)");

    const setupAnimations = () => {
      ctx?.revert();
      if (lenisTick) gsap.ticker.remove(lenisTick);
      lenis?.destroy();
      lenis = undefined;
      lenisTick = undefined;

      if (motionQuery.matches && desktopQuery.matches) {
        lenis = new Lenis({
          duration: 1.05,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 0.92,
          touchMultiplier: 1,
        });
        lenis.on("scroll", ScrollTrigger.update);
        lenisTick = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(lenisTick);
      }

      ctx = gsap.context(() => {
      if (!motionQuery.matches) return;

      gsap.utils.toArray(".about-photo").forEach((photo) => {
        const speed = Number(photo.dataset.speed || 0);
        gsap.fromTo(
          photo,
          { yPercent: () => speed * 100 },
          {
            yPercent: () => speed * -100,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-story",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.25,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      if (desktopQuery.matches) {
        const pin = page.querySelector(".about-work__pin");
        const track = page.querySelector(".about-work__track");
        const cards = gsap.utils.toArray(".about-work__card");
        const progress = page.querySelector(".about-work__progress i");
        const counter = page.querySelector(".about-work__counter");
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        let travelDistance = 0;
        let centers = [];
        const measureCenters = () => {
          travelDistance = distance();
          centers = cards.map((card) => card.offsetLeft + card.offsetWidth / 2 - window.innerWidth / 2);
        };

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: measureCenters,
            onUpdate: (self) => {
              if (progress) progress.style.transform = `scaleX(${self.progress})`;
              if (counter && centers.length) {
              const traveled = self.progress * travelDistance;
                let nearest = 0;
                centers.forEach((center, index) => {
                  if (Math.abs(center - traveled) < Math.abs(centers[nearest] - traveled)) nearest = index;
                });
                counter.textContent = `0${nearest + 1} / 0${cards.length}`;
              }
            },
          },
        });
      }

      const labels = gsap.utils.toArray(".about-values__name");
      const descriptions = gsap.utils.toArray(".about-values__copy");
      const ticks = desktopQuery.matches ? gsap.utils.toArray(".about-values__ticks i") : [];
      const setValue = (progress) => {
        const active = Math.min(values.length - 1, Math.floor(progress * values.length));
        labels.forEach((label, index) => label.classList.toggle("is-active", index === active));
        descriptions.forEach((description, index) => description.classList.toggle("is-active", index === active));
        const point = progress * (ticks.length - 1);
        ticks.forEach((tick, index) => {
          const strength = Math.max(0, 1 - Math.abs(index - point) / 8);
          tick.style.width = `${6 + strength * 22}px`;
          tick.style.opacity = `${0.25 + strength * 0.65}`;
        });
      };

      if (desktopQuery.matches) {
        ScrollTrigger.create({
          trigger: ".about-values",
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => setValue(self.progress),
        });
      } else {
        ScrollTrigger.create({
          trigger: ".about-values",
          start: "top center",
          end: "bottom center",
          onUpdate: (self) => setValue(self.progress),
        });
      }
      setValue(0);
      }, page);
      ScrollTrigger.refresh();
    };

    setupAnimations();
    motionQuery.addEventListener("change", setupAnimations);
    desktopQuery.addEventListener("change", setupAnimations);

    document.fonts?.ready?.then(() => { if (mounted) ScrollTrigger.refresh(); });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });

    return () => {
      mounted = false;
      document.title = previousTitle;
      motionQuery.removeEventListener("change", setupAnimations);
      desktopQuery.removeEventListener("change", setupAnimations);
      window.removeEventListener("load", refresh);
      ctx?.revert();
      if (lenisTick) gsap.ticker.remove(lenisTick);
      lenis?.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={pageRef} className="about-page" id="top">
      <Navbar />
      <main>
        <section className="about-hero" aria-labelledby="about-title" style={{ backgroundImage: "url('/hero-bg.png')" }}>
          <div className="about-hero__glow" aria-hidden="true" />
          <p className="about-eyebrow">Next Level Gaming Events</p>
          <h1 id="about-title"><span>The idea</span><span>behind the games</span></h1>
          <div className="about-hero__meta"><span>About Next Level Gaming Events</span><span>Scroll to explore <span aria-hidden="true">↓</span></span></div>
        </section>

        <section className="about-story" aria-labelledby="about-story-title">
          {storyPhotos.map((photo) => (
            <div key={photo.className} className={photo.className} data-speed={photo.speed} aria-label={photo.label} role="img">
              <span>{photo.label}</span>
            </div>
          ))}
          <div className="about-story__content">
            <p className="about-eyebrow">Our story</p>
            <h2 id="about-story-title">It began with two friends, a football game, and a noise complaint.</h2>
            <p className="about-story__body">In 2007, police arrived at founder Calvin Reid’s home after neighbors reported a loud game of Madden. About ten years later, Next Level Gaming was born from a simple idea: games are a great way to get to know people.</p>
          </div>
        </section>

        <section className="about-work" aria-labelledby="about-work-title">
          <div className="about-work__pin">
              <div className="about-work__track" tabIndex={0} role="group" aria-label="What we do cards. Use the arrow keys to browse.">
              <div className="about-work__intro">
                <p className="about-eyebrow">What we do</p>
                <h2 id="about-work-title">We make it easy to play together.</h2>
                <p className="about-work__hint">Three ways to bring people into the moment.</p>
              </div>
              {offerings.map((offering, index) => (
                <article className="about-work__card" key={offering.title}>
                  <div className="about-work__image" role="img" aria-label={offering.label}><span>{offering.label}</span></div>
                  <div className="about-work__text">
                    <span className="about-work__number">0{index + 1} <i>/ 03</i></span>
                    <div><h3>{offering.title}</h3><p>{offering.copy}</p></div>
                  </div>
                </article>
              ))}
            </div>
            <div className="about-work__hud" aria-hidden="true"><span className="about-work__counter">01 / 03</span><span className="about-work__progress"><i /></span><span>Keep scrolling</span></div>
          </div>
        </section>

        <section className="about-values" aria-labelledby="about-values-title">
          <div className="about-values__sticky">
            <h2 className="about-values__eyebrow" id="about-values-title">Why us</h2>
            <div className="about-values__ticks about-values__ticks--left" aria-hidden="true">{Array.from({ length: 48 }, (_, index) => <i key={index} />)}</div>
            <div className="about-values__ticks about-values__ticks--right" aria-hidden="true">{Array.from({ length: 48 }, (_, index) => <i key={index} />)}</div>
            <div className="about-values__layout">
              <ol className="about-values__list">
                {values.map(({ name }) => <li className="about-values__name" key={name}>{name}</li>)}
              </ol>
              <div className="about-values__details" aria-live="polite">
                {values.map(({ name, copy }) => <p className="about-values__copy" key={name}>{copy}</p>)}
              </div>
            </div>
            <span className="about-values__aside">Good events bring people together.</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;

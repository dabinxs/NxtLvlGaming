import React from "react";
import "./GamingSetup.css";

const gamingEquipment = [
  {
    title: "Giant Screens",
    description: "Up to 40 ft (inflatable & frame)",
    image: "/gaming-setup-screen.png",
    alt: "Large inflatable projection screen",
  },
  {
    title: "Gaming Consoles",
    description: "PlayStation, Xbox & Nintendo Switch",
    image: "/gaming-setup-consoles.png",
    alt: "PlayStation, Xbox and Nintendo Switch consoles",
  },
  {
    title: "Controllers",
    description: "Multiplayer ready (4–8+ per setup)",
    image: "/gaming-setup-controller.png",
    alt: "Blue-lit gaming controller",
  },
  {
    title: "Sound System",
    description: "Immersive, event-grade audio",
    image: "/gaming-setup-speaker.png",
    alt: "Event speaker with blue and purple lighting",
  },
  {
    title: "Event Setup",
    description: "Lighting, seating & full production",
    image: "/gaming-setup-lighting.png",
    alt: "Event stage lighting rig with blue and purple lights",
  },
];

const movieEquipment = [
  {
    title: "Inflatable Screens",
    description: "16 ft, 21 ft, 26 ft & 40 ft sizes",
    image: "/gaming-setup-screen.png",
    alt: "Large inflatable projection screen",
  },
  {
    title: "LED Screens",
    description: "14 ft, 16 ft & 20 ft options",
    image: "/movie-setup-led-screen.png",
    alt: "LED video wall on stage supports",
  },
  {
    title: "HD Projectors",
    description: "Bright, cinematic visuals",
    image: "/movie-setup-projector.png",
    alt: "Blue-glow cinema projector",
  },
  {
    title: "Cinema Audio",
    description: "Clear immersive sound",
    image: "/gaming-setup-speaker.png",
    alt: "Event speaker with blue and purple lighting",
  },
  {
    title: "Full Event Setup",
    description: "Projection, audio & crew support",
    image: "/movie-setup-flight-case.png",
    alt: "Professional event equipment flight case",
  },
];

const setups = {
  gaming: {
    heading: "Gaming Equipment",
    description: "High-quality, event-ready gear that delivers a seamless and immersive gaming experience.",
    background: "/gaming-setup-background.png",
    equipment: gamingEquipment,
  },
  movie: {
    heading: "Movie Setup",
    description: "A complete cinema setup with professional equipment, designed to deliver a big-screen, cinema-like experience anywhere.",
    background: "/movie-setup-background.png",
    equipment: movieEquipment,
  },
};

const GamingSetup = ({ variant = "gaming" }) => {
  const setup = setups[variant];

  return (
    <section id="what-is-included" className={`gaming-setup gaming-setup--${variant}`}>
      <img
        className="gaming-setup__background"
        src={setup.background}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="gaming-setup__inner">
        <div className="gaming-setup__intro">
          <div className="gaming-setup__eyebrow">
            <span className="gaming-setup__rule" aria-hidden="true" />
            <span>Our Setup</span>
          </div>
          <h2 className="gaming-setup__title">
            <span>Professional</span>
            <span className="gaming-setup__title-accent">{setup.heading}</span>
          </h2>
          <p className="gaming-setup__description">
            {setup.description}
          </p>
        </div>

        <div className="gaming-setup__cards">
          {setup.equipment.map((item) => (
            <article className="gaming-setup__card" key={item.title}>
              <div className="gaming-setup__card-media">
                <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              </div>
              <div className="gaming-setup__card-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamingSetup;

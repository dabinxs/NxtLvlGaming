import React from "react";
import "./GamingSetup.css";

const equipment = [
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

const GamingSetup = () => (
  <section id="what-is-included" className="gaming-setup">
    <img
      className="gaming-setup__background"
      src="/gaming-setup-background.png"
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
          <span className="gaming-setup__title-accent">Gaming Equipment</span>
        </h2>
        <p className="gaming-setup__description">
          High-quality, event-ready gear that delivers a seamless and immersive gaming experience.
        </p>
      </div>

      <div className="gaming-setup__cards">
        {equipment.map((item) => (
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

export default GamingSetup;

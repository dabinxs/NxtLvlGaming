import React from "react";
import { Trophy } from "lucide-react";
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

const triviaEquipment = [
  {
    title: "Interactive Trivia",
    description: "Multimedia questions and live scoring.",
    image: "/trivia-setup-screen.png",
    alt: "Inflatable screen showing a trivia night question",
  },
  {
    title: "Large Display",
    description: "Questions and leaderboards up to 32 ft.",
    image: "/trivia-setup-leaderboard.png",
    alt: "Large screen showing live trivia rankings",
  },
  {
    title: "Any Size Group",
    description: "From small teams to full venues.",
    image: "/trivia-setup-group.png",
    alt: "Neon group icon",
  },
  {
    title: "Custom Categories",
    description: "Themed rounds for any crowd.",
    image: "/trivia-setup-categories.png",
    alt: "Trivia category cards for pop culture, science, history and geography",
  },
  {
    title: "Event Setup",
    description: "Lighting, seating & full production.",
    image: "/trivia-setup-truss.png",
    alt: "Lit trivia night stage truss",
  },
];

const vrEquipment = [
  {
    title: "VR Headsets",
    description: "Headsets and motion controllers for immersive play.",
    image: "/vr-setup-headset.png",
    alt: "Neon VR headset and motion controllers",
  },
  {
    title: "Game Library",
    description: "A range of games for every kind of player.",
    image: "/vr-setup-games.png",
    alt: "Neon dashboard showing a selection of VR games",
  },
  {
    title: "Spectator Display",
    description: "Share the action on a large screen.",
    image: "/vr-setup-display.png",
    alt: "Large event display beneath a neon-lit stage truss",
  },
  {
    title: "Game Categories",
    description: "Action, adventure, racing and puzzles.",
    image: "/vr-setup-categories.png",
    alt: "Neon cards for action, adventure, racing and puzzle games",
  },
  {
    title: "Event Setup",
    description: "Lighting, displays and full production.",
    image: "/vr-setup-stage.png",
    alt: "Neon-lit VR event stage installation",
  },
];

const danceEquipment = [
  {
    title: "Follow the Coach",
    description: "Match the moves on screen.",
    image: "/dance-setup-screen.png",
    alt: "Neon inflatable screen showing an on-screen dancer",
  },
  {
    title: "Pick a Song",
    description: "Choose a track and jump in.",
    image: "/dance-setup-playlist.png",
    alt: "Neon music playlist display",
  },
  {
    title: "Track Your Score",
    description: "Earn points with every move.",
    type: "score",
  },
  {
    title: "Multiplayer Battles",
    description: "Take turns or go head-to-head.",
    image: "/dance-setup-battle.png",
    alt: "Two neon dancers facing off in a versus battle",
  },
  {
    title: "Event Setup",
    description: "Lighting, seating & full production.",
    image: "/dance-setup-stage.png",
    alt: "Neon-lit dance stage with an LED screen",
  },
];

const discoEquipment = [
  {
    title: "LED Headphones",
    description: "Wireless headphones with LED glow.",
    image: "/disco-setup-headphones.png",
    alt: "Wireless LED headphones with channel-color glow",
  },
  {
    title: "Any Vibe",
    description: "Top 40, throwbacks, EDM or your DJ.",
    image: "/disco-setup-vibe.png",
    alt: "Crowd dancing with wireless headphones under party lighting",
    fit: "cover",
  },
  {
    title: "Music Channels",
    description: "Switch channels and choose your vibe.",
    image: "/disco-setup-channels.png",
    alt: "Three neon music channel indicators",
  },
  {
    title: "Party Lighting",
    description: "Lighting that energizes the floor.",
    image: "/disco-setup-lighting.png",
    alt: "Truss lighting rig with colorful spotlights",
  },
  {
    title: "Event Setup",
    description: "Headphones, channels and full production.",
    image: "/disco-setup-stage.png",
    alt: "Silent disco event audio setup with headphones, console and speaker",
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
  trivia: {
    heading: "Trivia Nights",
    description: "Event-ready gear for a seamless and immersive trivia experience.",
    background: "/trivia-setup-background.png",
    equipment: triviaEquipment,
    webp: false,
  },
  vr: {
    heading: "Virtual Reality",
    description: "Event-ready gear for a seamless and immersive VR experience.",
    background: "/vr-setup-background.png",
    equipment: vrEquipment,
    webp: false,
  },
  dance: {
    heading: "Just Dance",
    description: "Event-ready gear for a high-energy dance experience.",
    background: "/dance-setup-background.png",
    equipment: danceEquipment,
    webp: false,
  },
  disco: {
    heading: "Silent Disco",
    description: "LED headphones and multiple music channels for an unforgettable dance experience.",
    background: "/disco-setup-background.png",
    equipment: discoEquipment,
    webp: false,
  },
};

const GamingSetup = ({ variant = "gaming" }) => {
  const setup = setups[variant];

  return (
    <section id="what-is-included" className={`gaming-setup gaming-setup--${variant}`}>
      <picture className="contents">
        {setup.webp !== false && <source srcSet={setup.background.replace(".png", ".webp")} type="image/webp" />}
        <img
          className="gaming-setup__background"
          src={setup.background}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </picture>
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
                {item.type === "score" ? (
                  <div className="gaming-setup__scoreboard" role="img" aria-label="Neon dance leaderboard with scores 12,480, 11,920 and 10,840">
                    <div className="gaming-setup__score-row gaming-setup__score-row--first">
                      <Trophy aria-hidden="true" />
                      <span className="gaming-setup__score-rank">1</span>
                      <strong>12,480</strong>
                    </div>
                    <div className="gaming-setup__score-row gaming-setup__score-row--second">
                      <span className="gaming-setup__score-rank">2</span>
                      <strong>11,920</strong>
                    </div>
                    <div className="gaming-setup__score-row gaming-setup__score-row--third">
                      <span className="gaming-setup__score-rank">3</span>
                      <strong>10,840</strong>
                    </div>
                  </div>
                ) : (
                  <picture className="contents">
                    {setup.webp !== false && <source srcSet={item.image.replace(".png", ".webp")} type="image/webp" />}
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className={item.fit === "cover" ? "gaming-setup__card-img--cover" : undefined}
                    />
                  </picture>
                )}
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

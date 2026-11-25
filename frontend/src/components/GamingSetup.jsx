import React from "react";
import { Trophy } from "lucide-react";
import "./GamingSetup.css";

const gamingEquipment = [
  {
    title: "Giant Screens",
    description: "Up to 40 ft (inflatable & frame)",
    image: "/gaming-setup-screen.png",
    alt: "12 ft to 40 ft giant projection screen for video game event production and live gaming events in NH, MA and NC",
  },
  {
    title: "Gaming Consoles",
    description: "PlayStation, Xbox & Nintendo Switch",
    image: "/gaming-setup-consoles.png",
    alt: "PlayStation 5, Xbox Series X and Nintendo Switch event planning equipment for gamers and esports rental",
  },
  {
    title: "Controllers",
    description: "Multiplayer ready (4–8+ per setup)",
    image: "/gaming-setup-controller.png",
    alt: "Multiplayer wireless controllers for video gaming tournament event production and party planning equipment for gamers",
  },
  {
    title: "Sound System",
    description: "Immersive, event-grade audio",
    image: "/gaming-setup-speaker.png",
    alt: "Concert audio speaker array for video gaming convention production and Next Level FEC attraction rentals",
  },
  {
    title: "Event Setup",
    description: "Lighting, seating & full production",
    image: "/gaming-setup-lighting.png",
    alt: "Turnkey video game event management and stage lighting production in Hudson NH, Boston MA and North Carolina",
  },
];

const movieEquipment = [
  {
    title: "Inflatable Screens",
    description: "16 ft, 21 ft, 26 ft & 40 ft sizes",
    image: "/gaming-setup-screen.png",
    alt: "16 ft to 40 ft giant outdoor inflatable movie screen rental in Hudson NH, Manchester, Portsmouth, Boston and NC",
  },
  {
    title: "LED Screens",
    description: "14 ft, 16 ft & 20 ft options",
    image: "/movie-setup-led-screen.png",
    alt: "14 ft, 16 ft and 20 ft daylight mobile LED video wall trailer rental for outdoor movies and tailgates",
  },
  {
    title: "HD Projectors",
    description: "Bright, cinematic visuals",
    image: "/movie-setup-projector.png",
    alt: "High-lumen commercial HD cinema projector for NH movie screen rentals and backyard movie nights",
  },
  {
    title: "Cinema Audio",
    description: "Clear immersive sound",
    image: "/gaming-setup-speaker.png",
    alt: "Outdoor concert sound system and FM drive-in radio transmitter for movie night rentals",
  },
  {
    title: "Full Event Setup",
    description: "Projection, audio & crew support",
    image: "/movie-setup-flight-case.png",
    alt: "Turnkey outdoor movie night production equipment delivered and staffed across NH, MA, CT and NC",
  },
];

const triviaEquipment = [
  {
    title: "Interactive Trivia",
    description: "Multimedia questions and live scoring.",
    image: "/trivia-setup-screen.png",
    alt: "Interactive live trivia night and wireless buzzer game show rental screen in NH, MA and NC",
  },
  {
    title: "Large Display",
    description: "Questions and leaderboards up to 32 ft.",
    image: "/trivia-setup-leaderboard.png",
    alt: "Up to 32 ft giant screen showing live trivia night rankings and corporate game show scores",
  },
  {
    title: "Any Size Group",
    description: "From small teams to full venues.",
    image: "/trivia-setup-group.png",
    alt: "Team trivia night entertainment for corporate holiday parties, college orientations and campus events",
  },
  {
    title: "Custom Categories",
    description: "Themed rounds for any crowd.",
    image: "/trivia-setup-categories.png",
    alt: "Custom branded trivia categories for college events, company team building and holiday parties",
  },
  {
    title: "Event Setup",
    description: "Lighting, seating & full production.",
    image: "/trivia-setup-truss.png",
    alt: "Turnkey hosted trivia night stage truss, audio and lighting rental in Hudson NH, Boston and NC",
  },
];

const vrEquipment = [
  {
    title: "VR Headsets",
    description: "Headsets and motion controllers for immersive play.",
    image: "/vr-setup-headset.png",
    alt: "Motion-tracked virtual reality headsets and controllers for mobile VR arcade rentals in NH, MA and Durham NC",
  },
  {
    title: "Game Library",
    description: "A range of games for every kind of player.",
    image: "/vr-setup-games.png",
    alt: "Virtual reality games for events and VR event games library including Beat Saber, SUPERHOT VR and VR escape rooms",
  },
  {
    title: "Spectator Display",
    description: "Share the action on a large screen.",
    image: "/vr-setup-display.png",
    alt: "Live HD spectator screen for mobile virtual reality event rentals and VR games for adults",
  },
  {
    title: "Game Categories",
    description: "Action, adventure, racing and puzzles.",
    image: "/vr-setup-categories.png",
    alt: "Action, adventure, racing and 4-player cooperative VR escape room game categories for events",
  },
  {
    title: "Event Setup",
    description: "Lighting, displays and full production.",
    image: "/vr-setup-stage.png",
    alt: "Turnkey mobile VR arena and Next Level FEC attraction stage setup in NH, Boston MA, Durham, Raleigh and Charlotte NC",
  },
];

const danceEquipment = [
  {
    title: "Follow the Coach",
    description: "Match the moves on screen.",
    image: "/dance-setup-screen.png",
    alt: "12 ft to 32 ft giant inflatable screen for Just Dance event party rentals in NH, MA and NC",
  },
  {
    title: "Pick a Song",
    description: "Choose a track and jump in.",
    image: "/dance-setup-playlist.png",
    alt: "Interactive Just Dance song catalog for college campus parties, post-proms and corporate events",
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
    alt: "Head-to-head multiplayer Just Dance battle rental for universities and schools",
  },
  {
    title: "Event Setup",
    description: "Lighting, seating & full production.",
    image: "/dance-setup-stage.png",
    alt: "Turnkey Just Dance giant-screen stage production with concert subwoofers and lighting",
  },
];

const discoEquipment = [
  {
    title: "LED Headphones",
    description: "Wireless headphones with LED glow.",
    image: "/disco-setup-headphones.png",
    alt: "Tri-color LED wireless Silent Disco headphone rental for 50 to 5000 guests in NH, MA and NC",
  },
  {
    title: "Any Vibe",
    description: "Top 40, throwbacks, EDM or your DJ.",
    image: "/disco-setup-vibe.png",
    alt: "Crowd dancing at a Silent Disco wireless headphone party in Portsmouth, Manchester, Hudson NH and NC",
    fit: "cover",
  },
  {
    title: "Music Channels",
    description: "Switch channels and choose your vibe.",
    image: "/disco-setup-channels.png",
    alt: "3-channel Silent Disco transmitters supporting three simultaneous DJs or playlists",
  },
  {
    title: "Party Lighting",
    description: "Lighting that energizes the floor.",
    image: "/disco-setup-lighting.png",
    alt: "Truss party lighting rig for Silent Disco and college campus dance events",
  },
  {
    title: "Event Setup",
    description: "Headphones, channels and full production.",
    image: "/disco-setup-stage.png",
    alt: "Turnkey Silent Disco party equipment rental with sanitized rechargeable headphones and transmitters",
  },
];

const racingEquipment = [
  {
    title: "Pro Simulators",
    description: "Force-feedback wheels, pedals & racing seats.",
    image: "/racing-setup-rig.png",
    alt: "Professional sim racing seat with force-feedback wheel and pedals",
  },
  {
    title: "Live Leaderboards",
    description: "Fastest-lap boards on the big screen.",
    image: "/racing-setup-leaderboard.png",
    alt: "Neon live leaderboard showing drivers and lap times",
  },
  {
    title: "Giant Screen",
    description: "Every turn and overtake on massive displays.",
    image: "/racing-setup-screen.png",
    alt: "Giant inflatable screen showing a racing simulator track",
  },
  {
    title: "Tournament Formats",
    description: "Time trials, heats & grand finals.",
    image: "/racing-setup-tournament.png",
    alt: "Neon racing tournament bracket with trophy and checkered flags",
  },
  {
    title: "Event Setup",
    description: "Racing seats, screens & full production.",
    image: "/racing-setup-stage.png",
    alt: "Three racing simulators beneath a lit event stage truss",
  },
];

const photoboothEquipment = [
  {
    title: "360 Video Photobooth",
    description: "Capture dynamic slow-motion videos.",
    image: "/photobooth-setup-360-video.png",
    alt: "Neon 360 video booth platform with revolving camera and ring light",
  },
  {
    title: "Mirror Photobooth",
    description: "Take interactive full-length photos.",
    image: "/photobooth-setup-mirror.png",
    alt: "Interactive touchscreen mirror photobooth with camera and ring light",
  },
  {
    title: "Props & Overlays",
    description: "Fun props and custom event overlays.",
    image: "/photobooth-setup-props.png",
    alt: "Gold party props, sunglasses and feather boa for photobooth photos",
  },
  {
    title: "Event-Ready Setup",
    description: "Professional setup and on-site staff.",
    image: "/photobooth-setup-stage.png",
    alt: "Photobooth event stage with truss lighting and camera backdrop",
  },
  {
    title: "Share Instantly",
    description: "Easily save and share your photos.",
    image: "/photobooth-setup-sharing.png",
    alt: "Neon group photo cards with a sharing arrow",
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
  },
  vr: {
    heading: "Virtual Reality",
    description: "Event-ready gear for a seamless and immersive VR experience.",
    background: "/vr-setup-background.png",
    equipment: vrEquipment,
  },
  dance: {
    heading: "Just Dance",
    description: "Event-ready gear for a high-energy dance experience.",
    background: "/dance-setup-background.png",
    equipment: danceEquipment,
  },
  disco: {
    heading: "Silent Disco",
    description: "LED headphones and multiple music channels for an unforgettable dance experience.",
    background: "/disco-setup-background.png",
    equipment: discoEquipment,
  },
  racing: {
    heading: "Sim Racing",
    description: "Pro simulators and competitive racing, brought right to your event.",
    background: "/racing-setup-background.png",
    equipment: racingEquipment,
    webp: false,
  },
  photobooth: {
    heading: "Photobooth",
    description: "360 video photobooth and mirror photobooth for fun, shareable moments.",
    background: "/photobooth-setup-background.png",
    equipment: photoboothEquipment,
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

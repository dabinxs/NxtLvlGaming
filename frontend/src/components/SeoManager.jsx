import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://nextlevelgamingevents.com";
const DEFAULT_IMAGE = `${SITE_URL}/hero-bg.png`;

export const ROUTE_SEO = {
  "/": {
    title: "Event & Party Rentals NH, MA & NC | Next Level Gaming & Novelties",
    description:
      "Turnkey event & party rentals in NH, Boston MA & NC: giant outdoor movie screens, 360 photo booths, live gaming events, VR, silent disco, glow park & novelties.",
    keywords:
      "event rentals, party rentals, party equipment rentals, event rentals NH, nh party rentals, nh photo booth rental, portsmouth nh photo booth rental, nh movie screen rental, party rentals Manchester NH, party rentals Nashua NH, party rentals Hudson NH, Boston event rentals, event rentals North Carolina, party rentals Charlotte NC, Raleigh event rentals, esports rental, bulk esports rental, event planning equipment for gamers, video game tournament event production, video game event management, outdoor movie screen rental, inflatable movie screen rental, mobile LED video wall rental, 360 photo booth rental, mirror photo booth rental, photo booth rental NH MA NC, silent disco rental, virtual reality event rental, VR escape room rental, sim racing simulator rental, glow swings rental, glow park rental, live gaming events, video game event planner, video game tournaments, gaming competitions near me, mobile video game party, college event entertainment, corporate event entertainment, novelties, Next Level Gaming, Nxt Level Gaming",
    image: `${SITE_URL}/hero-bg.png`,
    canonicalPath: "/",
    heading: "Event & Party Rentals, Interactive Entertainment & Gaming Events in NH, MA & NC",
    summary:
      "Next Level Gaming & Novelties is a full-service party equipment rental service and event planner delivering turnkey event rentals, giant outdoor inflatable movie screens, mobile LED video wall trailers, 360 photo booths, mirror photobooths, live multiplayer video gaming events, esports tournaments, room-scale Virtual Reality stations, Silent Disco wireless headphones, Sim Racing cockpits, Glow Park LED swings, interactive Trivia Nights, FEC-grade interactive attractions, and custom novelty workshops across Hudson, Nashua, Manchester, Portsmouth, and Concord NH, Greater Boston, Lowell, and Worcester MA, Connecticut, New England, and our North Carolina branch serving Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, Winston-Salem, Cary, Wilmington, and Asheville NC.",
  },
  "/gaming-events": {
    title: "Live Gaming Events, Esports Rental & Video Game Event Planner | NH, MA & NC",
    description:
      "Turnkey live gaming events, bulk esports rentals & video game tournament event production with 12–40ft screens, PS5, Xbox & Switch in NH, Boston MA, CT & NC.",
    keywords:
      "gaming events, live gaming events, gaming event, video game event, video game events, video gaming events, video game events near me, esports tournaments near me, video game event planner, video game event management, video game tournament event production, bulk esports rental, event planning equipment for gamers, esports rental, next level gaming ct, new england gaming, gaming events this weekend, next level gaming, nxt level gaming, next level fec attraction, video game tournaments, gaming event rental, gaming event planning, boston gaming events, gaming events Boston MA, college gaming events Boston, video game party rental Manchester NH, gaming events Hudson NH, gaming events Portsmouth NH, video gaming event rental New Hampshire, Connecticut gaming events, gaming event rentals Charlotte NC, mobile video game party Raleigh NC, esports tournament production NH MA CT NC, Super Smash Bros tournament rental, Mario Kart event rental Boston MA Charlotte NC, eventos videojuegos, eventos gaming, eventos gamer",
    image: `${SITE_URL}/gaming-events-experience-1.png`,
    canonicalPath: "/gaming-events",
    serviceName: "Live Video Gaming Event Rentals, Bulk Esports Rental & Video Game Tournament Event Production",
    heading: "Live Gaming Events, Esports Rentals & Video Game Tournament Event Production in NH, MA, CT & NC",
    summary:
      "Next Level Gaming & Novelties (Nxt Level Gaming) is the premier New England and North Carolina video game event planner and video game event management company delivering turnkey live gaming events, bulk esports rentals, event planning equipment for gamers, and bracketed video game tournament event production across Hudson, Nashua, Manchester, Portsmouth, and Concord NH, Greater Boston and Massachusetts, Connecticut (Hartford, New Haven, Hamden, Danbury, Stamford, New London CT), and our North Carolina branch in Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC. Choose from our Deluxe Package (four 12 ft HD screens plus a giant 21 to 32 ft HD screen), Ultimate Package (eight 12 ft HD screens plus a 26 ft jumbo screen and virtual smartphone DJ dance party), or Bulk Esports Tournament Package with PlayStation 5, Xbox Series X, Nintendo Switch, and classic retro NES consoles.",
  },
  "/movie-nights": {
    title: "Outdoor Movie Screen & Mobile LED Wall Rentals | NH, MA & NC",
    description:
      "Rent giant outdoor inflatable movie screens (16–40 ft) & daylight mobile LED video wall trailers in Hudson NH, Manchester, Portsmouth, Boston MA & NC.",
    keywords:
      "nh movie screen rental, outdoor movie screen rental, inflatable movie screen rental, mobile LED video wall trailer rental, movie screen rental NH, hudson nh movie screen rental, manchester nh movie screen rental, portsmouth nh movie screen rental, outdoor movie rental Boston MA, inflatable movie screen rental Charlotte NC, movie screen rental Raleigh NC, drive-in movie screen rental, backyard movie night rental, event rentals NH",
    image: `${SITE_URL}/experience-movie-nights.png`,
    canonicalPath: "/movie-nights",
    serviceName: "Outdoor Inflatable Movie Screen & Mobile LED Video Wall Rentals",
    heading: "Outdoor Movie Screen & Mobile LED Video Wall Rentals in NH, MA & NC",
    summary:
      "Rent giant outdoor inflatable movie screens (16 ft, 21 ft, 26 ft, and 40 ft) and daylight-visible mobile LED video wall trailers (14 ft, 16 ft, and 20 ft) from Next Level Gaming & Novelties across Hudson NH, Nashua, Manchester, Portsmouth, Greater Boston, Massachusetts, New England, and our North Carolina branch in Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC. Every cinema package includes HD projection or LED processing, concert-grade audio towers, FM drive-in radio transmitters, and professional crew setup.",
  },
  "/trivia-nights": {
    title: "Interactive Trivia Night & Game Show Rentals | NH, MA & NC",
    description:
      "Book live-hosted interactive trivia nights & wireless buzzer game show rentals for colleges, schools & corporate events in Hudson NH, Boston MA & NC.",
    keywords:
      "nh trivia night rental, interactive trivia night rental NH, game show rental NH MA NC, corporate trivia host Charlotte NC, college trivia night Raleigh Durham NC, live trivia host New Hampshire Massachusetts, corporate game show rental New England North Carolina, wireless buzzer game show rental",
    image: `${SITE_URL}/experience-trivia-nights.png`,
    canonicalPath: "/trivia-nights",
    serviceName: "Interactive Trivia Night & Game Show Event Rentals",
    heading: "Interactive Trivia Night & Live Game Show Rentals in NH, MA & NC",
    summary:
      "Book live-hosted interactive trivia night and game show rentals for college campus events, corporate team building, high schools, and community gatherings across Hudson NH, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC). Includes charismatic live hosts, wireless digital team buzzers, custom trivia categories, concert sound, and real-time leaderboards on giant screens up to 32 feet.",
  },
  "/virtual-reality": {
    title: "Virtual Reality & VR Escape Room Rentals | NH, MA & NC",
    description:
      "Rent room-scale Virtual Reality stations & 4-player cooperative VR escape rooms with spectator screens & staff in Hudson NH, Boston MA & North Carolina.",
    keywords:
      "nh vr rental, virtual reality rental, VR event rental, VR party rental, virtual reality rental NH, virtual reality rental Boston MA, VR party rental Charlotte NC, mobile VR escape room rental, college VR entertainment, Beat Saber party rental",
    image: `${SITE_URL}/experience-virtual-reality.png`,
    canonicalPath: "/virtual-reality",
    serviceName: "Virtual Reality (VR) Event Stations & Mobile VR Escape Rooms",
    heading: "Virtual Reality & Mobile VR Escape Room Rentals in NH, MA & NC",
    summary:
      "Bring immersive room-scale Virtual Reality stations and 4-player cooperative VR escape rooms to your event in Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, New England, and across North Carolina (Charlotte, Raleigh, Durham, Greensboro, and Winston-Salem NC). Includes motion-tracked VR headsets, live HD spectator monitors, sanitary face covers, on-site VR attendants, and top titles like Beat Saber, SUPERHOT VR, Job Simulator, Walkabout Mini Golf, Pistol Whip, Dragon Tower, Manor Escape, and Depths of Osiris.",
  },
  "/photo-booth": {
    title: "NH Photo Booth Rental | 360 Video & Mirror Booths Portsmouth, Manchester, MA & NC",
    description:
      "Turnkey NH photo booth rentals, 360 video booths & mirror photobooths in Portsmouth NH, Manchester, Nashua, Hudson, Boston MA & NC. Custom overlays & staff!",
    keywords:
      "nh photo booth rental, portsmouth nh photo booth rental, 360 photo booth rental, photo booth rental, mirror photobooth rental, photo booth rental NH, manchester nh photo booth rental, nashua nh photo booth rental, hudson nh photo booth rental, concord nh photo booth rental, dover nh photo booth rental, salem nh photo booth rental, 360 video booth rental NH, photo booth rental Boston MA, 360 photo booth rental Charlotte NC, photo booth rental Raleigh NC, interactive photo booth, wedding photo booth rental, corporate photo booth rental",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "Interactive Photo Booth, 360 Video Booth & Mirror Photobooth Rentals",
    heading: "NH Photo Booth Rentals — 360 Video Booths & Mirror Photobooths in Portsmouth, Manchester, Hudson, Boston & NC",
    summary:
      "Capture viral slow-motion videos and instant keepsake photos with turnkey NH photo booth rentals, 360 video booths, and interactive full-length mirror photobooth rentals from Next Level Gaming & Novelties in Portsmouth NH, Dover, Exeter, Hampton, Hudson NH, Nashua, Manchester, Concord, Salem, Derry, Greater Boston MA, Connecticut, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC). Includes VIP stanchions, studio LED lighting, fun party props, custom event graphics, instant SMS/QR digital sharing, and a dedicated booth attendant.",
  },
  "/360-video-booth": {
    title: "360 Photo Booth & 360 Video Booth Rental | Hudson NH, Portsmouth, Boston & NC",
    description:
      "Rent a 360 slow-motion video booth platform with VIP red carpet, LED studio ring lighting, custom video overlays & instant QR sharing in NH, MA, CT & NC.",
    keywords:
      "360 photo booth rental, 360 video booth rental, 360 camera booth rental, slow motion 360 photo booth rental, 360 photo booth rental NH, portsmouth nh 360 photo booth rental, manchester nh 360 photo booth rental, hudson nh 360 photo booth rental, 360 photo booth rental Boston MA, 360 photo booth rental Charlotte NC, 360 video booth rental Raleigh NC",
    image: `${SITE_URL}/photo-booth-experience-2.png`,
    canonicalPath: "/360-video-booth",
    serviceName: "360 Slow-Motion Video Booth & 360 Camera Platform Rentals",
    heading: "360 Photo Booth & Slow-Motion 360 Video Booth Rentals in NH, MA, CT & NC",
    summary:
      "Rent a commercial 360 slow-motion video booth platform from Next Level Gaming Events & Novelties across Hudson NH (03051), Portsmouth, Manchester, Nashua, Concord, Greater Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
  },
  "/360-booth": {
    title: "360 Photo Booth & 360 Video Booth Rental | Hudson NH, Portsmouth, Boston & NC",
    description:
      "Rent a 360 slow-motion video booth platform with VIP red carpet, LED studio ring lighting, custom video overlays & instant QR sharing in NH, MA, CT & NC.",
    keywords:
      "360 photo booth rental, 360 video booth rental, 360 camera booth rental, slow motion 360 photo booth rental, 360 photo booth rental NH, 360 photo booth rental Boston MA, 360 photo booth rental Charlotte NC",
    image: `${SITE_URL}/photo-booth-experience-2.png`,
    canonicalPath: "/360-video-booth",
    serviceName: "360 Slow-Motion Video Booth & 360 Camera Platform Rentals",
  },
  "/mirror-photo-booth-rental": {
    title: "Interactive Mirror Photo Booth Rental | Hudson NH, Portsmouth, Boston & NC",
    description:
      "Rent a full-length interactive magic mirror photobooth with touch-screen animations, custom prints, red carpet & attendant in NH, Boston MA, CT & NC.",
    keywords:
      "mirror photo booth rental, magic mirror photobooth rental, interactive mirror photo booth rental, mirror photo booth rental NH, portsmouth nh mirror photo booth rental, manchester nh photo booth rental, mirror photo booth rental Boston MA, mirror photo booth rental Charlotte NC",
    image: `${SITE_URL}/photo-booth-experience-1.png`,
    canonicalPath: "/mirror-photo-booth-rental",
    serviceName: "Interactive Full-Length Mirror Photobooth Rentals",
    heading: "Interactive Full-Length Mirror Photo Booth Rentals in NH, MA, CT & NC",
    summary:
      "Book a full-length interactive mirror photo booth rental from Next Level Gaming Events & Novelties in Hudson NH, Portsmouth, Manchester, Nashua, Greater Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
  },
  "/led-video-wall-rental": {
    title: "Mobile LED Video Wall & Daylight LED Screen Trailer Rental | NH, MA & NC",
    description:
      "Rent 14ft, 16ft & 20ft daylight-visible mobile LED video wall trailers with concert sound for daytime festivals, tailgates & watch parties in NH, MA & NC.",
    keywords:
      "mobile LED video wall rental, LED screen trailer rental, outdoor LED wall rental, daylight LED screen rental, mobile LED wall trailer NH, LED video wall rental Boston MA, mobile LED screen rental Charlotte NC, LED video wall rental Raleigh NC",
    image: `${SITE_URL}/movie-nights-led.jpg`,
    canonicalPath: "/led-video-wall-rental",
    serviceName: "Mobile LED Video Wall Trailer & Daylight Jumbotron Screen Rentals",
    heading: "Mobile LED Video Wall & Daylight LED Screen Trailer Rentals in NH, MA, CT & NC",
    summary:
      "Rent ultra-bright 14 ft, 16 ft, and 20 ft daylight-visible mobile LED video wall trailers from Next Level Gaming Events & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, Connecticut, New England, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
  },
  "/inflatable-movie-screen-rental": {
    title: "Inflatable Movie Screen Rental (16ft–40ft Outdoor Cinema) | NH, MA & NC",
    description:
      "Rent giant 16ft, 21ft, 26ft & 40ft outdoor inflatable movie screens with HD projection, concert audio & FM drive-in transmitters in NH, Boston MA & NC.",
    keywords:
      "inflatable movie screen rental, outdoor movie screen rental, giant movie screen rental, drive-in movie screen rental, backyard movie screen rental, nh movie screen rental, inflatable movie screen rental NH, outdoor movie screen rental Boston MA, inflatable movie screen rental Charlotte NC",
    image: `${SITE_URL}/movie-nights-experience-1.png`,
    canonicalPath: "/inflatable-movie-screen-rental",
    serviceName: "Giant Outdoor Inflatable Movie Screen & Drive-In Cinema Rentals",
    heading: "Giant 16 ft to 40 ft Outdoor Inflatable Movie Screen Rentals in NH, MA, CT & NC",
    summary:
      "Turn any campus quad, town park, school field, or backyard into an open-air cinema with 16 ft, 21 ft, 26 ft, and 40 ft inflatable movie screen rentals from Next Level Gaming Events & Novelties across Hudson NH, Boston MA, Connecticut, and North Carolina.",
  },
  "/vr-escape-room-rental": {
    title: "Mobile VR Escape Room & Beat Saber VR Station Rental | NH, MA & NC",
    description:
      "Rent 4-player cooperative mobile VR escape rooms & Beat Saber Virtual Reality gaming stations with HD spectator screens & attendants in NH, MA & NC.",
    keywords:
      "mobile VR escape room rental, VR escape room rental, Beat Saber party rental, virtual reality station rental, nh vr rental, VR party rental NH MA NC, college VR escape room event",
    image: `${SITE_URL}/vr-games/dragon-tower.png`,
    canonicalPath: "/vr-escape-room-rental",
    serviceName: "Mobile VR Escape Room & Beat Saber Virtual Reality Event Rentals",
    heading: "Mobile VR Escape Room & Beat Saber Virtual Reality Rentals in NH, MA, CT & NC",
    summary:
      "Challenge your guests with 4-player cooperative mobile VR escape rooms and room-scale Beat Saber VR gaming stations from Next Level Gaming Events & Novelties across Hudson NH, Boston MA, Connecticut, and North Carolina.",
  },
  "/led-glow-swings-rental": {
    title: "LED Glow Swings, Glow Seesaws & Glow Mini Golf Rental | NH, MA & NC",
    description:
      "Rent 8 commercial LED illuminated glow swings on truss frames, 4 glowing seesaws & portable glow mini golf for events in Hudson NH, Boston MA & NC.",
    keywords:
      "LED glow swings rental, glow swings rental, illuminated seesaws rental, glow mini golf rental, LED furniture rental NH MA NC, glow party equipment rental",
    image: `${SITE_URL}/glow-park-experience-1.jpg`,
    canonicalPath: "/led-glow-swings-rental",
    serviceName: "LED Illuminated Glow Swings, Glow Seesaws & Glowing Mini Golf Rentals",
    heading: "LED Illuminated Glow Swings, Seesaws & Glow Mini Golf Rentals in NH, MA, CT & NC",
    summary:
      "Rent 8 commercial LED illuminated glow swings suspended on truss frames, 4 multi-rider glowing seesaws, full-color venue uplighting, and an interactive glowing mini-golf course from Next Level Gaming Events & Novelties across Hudson NH, Boston MA, Connecticut, and North Carolina.",
  },
  "/custom-trucker-hat-bar-rental": {
    title: "Custom Trucker Hat Bar Rental & Patched City Beanies | NH, MA & NC",
    description:
      "Book an on-site Custom Trucker Hat Bar & Patched City heat-press patch hat and beanie workshop for colleges, parties & corporate events in NH, MA & NC.",
    keywords:
      "custom trucker hat bar rental, trucker hat bar party rental, Patched City trucker hats and beanies, custom patch hat bar event, DIY trucker hat station college event, custom hat press bar rental NH Boston Charlotte Raleigh",
    image: `${SITE_URL}/novelty-cards/patch-city.jpg`,
    canonicalPath: "/custom-trucker-hat-bar-rental",
    serviceName: "Custom Trucker Hat Bar & Patched City Hat and Beanie Maker Workshops",
    heading: "Custom Trucker Hat Bar & Patched City Hat & Beanie Workshop Rentals in NH, MA, CT & NC",
    summary:
      "Bring the viral Custom Trucker Hat Bar and Patched City custom patch hat & knit beanie maker workshop to your college campus, orientation, high school post-prom, corporate activation, or private party with Next Level Gaming Events & Novelties across Hudson NH, Boston MA, Connecticut, and North Carolina.",
  },
  "/custom-pillow-dolls-rental": {
    title: "Custom Photo Pillow Dolls & Reversible Sequin Pillows | NH, MA & NC",
    description:
      "Rent on-site Custom Photo Pillow Doll & Magic Reversible Sequin Pillow maker stations for college events, orientations & parties in NH, Boston MA & NC.",
    keywords:
      "custom photo pillow dolls, custom pillow dolls college event, reversible sequin pillows novelty rental, custom sequence pillows event station, make your own photo pillow event NH MA NC",
    image: `${SITE_URL}/novelty-cards/pillow-dolls.jpg`,
    canonicalPath: "/custom-pillow-dolls-rental",
    serviceName: "Custom Photo Pillow Dolls & Reversible Sequin Pillow Event Stations",
    heading: "Custom Photo Pillow Dolls & Magic Reversible Sequin Pillow Stations in NH, MA, CT & NC",
    summary:
      "Delight students and event guests with on-site Custom Photo Pillow Dolls and Custom Reversible Sequin (Sequence) Pillow maker stations from Next Level Gaming Events & Novelties across Hudson NH, Boston MA, Connecticut, and North Carolina.",
  },
  "/custom-keychains-rings-novelty": {
    title: "Laser-Engraved Keychains, Stamped Rings & License Plates | NH, MA & NC",
    description:
      "Book on-site Laser-Engraved Wood & Metal Keychains, Hammerless Stamped Custom Rings & Custom Novelty License Plate stations in NH, Boston MA & NC.",
    keywords:
      "laser engraved wood and metal keychains, stamped custom rings event novelty, hammerless ring press rental, custom novelty license plates event station, personalized keychain station college event",
    image: `${SITE_URL}/novelty-cards/wood-metal-keychains.jpg`,
    canonicalPath: "/custom-keychains-rings-novelty",
    serviceName: "Laser-Engraved Keychains, Stamped Custom Rings & Custom License Plate Stations",
    heading: "Laser-Engraved Keychains, Stamped Custom Rings & License Plate Novelties in NH, MA, CT & NC",
    summary:
      "Offer permanent personalized keepsakes with on-site Laser-Engraved Wood & Metal Keychains, Stamped Custom Rings using our quiet Hammerless Ring Press, and Custom Novelty License Plates from Next Level Gaming Events & Novelties across Hudson NH, Boston MA, Connecticut, and North Carolina.",
  },
  "/custom-event-socks-bracelets": {
    title: "Custom Printed Event Socks, Bead-tastics & Silly Sacks | NH, MA & NC",
    description:
      "Rent on-site Custom Printed Event Socks, Bead-tastics Custom Bracelets, Intention Bracelets & Silly Sacks Plush Bag stations in NH, Boston MA & NC.",
    keywords:
      "custom printed event socks, custom socks novelty station, Bead-tastics custom bracelets, custom intention bracelets event, Silly Sacks custom plush bags, DIY plush backpack college event",
    image: `${SITE_URL}/novelty-cards/custom-socks.jpg`,
    canonicalPath: "/custom-event-socks-bracelets",
    serviceName: "Custom Printed Socks, Bead-tastics Bracelets, Intention Bracelets & Silly Sacks Stations",
    heading: "Custom Event Socks, Bead-tastics & Intention Bracelets & Silly Sacks Plush Bags in NH, MA & NC",
    summary:
      "Energize college welcome weeks, orientations, summer camps, and school events with on-site Custom Printed Crew Socks, Bead-tastics Custom Bracelets, Custom Intention Bracelets, and Silly Sacks Character Plush Bags from Next Level Gaming Events & Novelties across Hudson NH, Boston MA, Connecticut, and North Carolina.",
  },
  "/just-dance": {
    title: "Just Dance Party Rentals & Giant Screen Events | Next Level",
    description:
      "Bring multiplayer Just Dance battles on giant HD screens with concert sound and lighting to your college, school, or event in NH, MA & North Carolina.",
    keywords:
      "just dance, just dance party rental, Just Dance event rental NH MA NC, giant screen dance party rental, college Just Dance party New England North Carolina, interactive dance game rental Boston MA Charlotte NC",
    image: `${SITE_URL}/experience-just-dance.png`,
    canonicalPath: "/just-dance",
    serviceName: "Just Dance Giant-Screen Event Rentals",
    heading: "Just Dance Giant Screen Event Party Rentals in NH, MA & NC",
    summary:
      "Turn any campus student union, school gymnasium, or festival stage into an interactive dance floor with Just Dance giant-screen event party rentals in Hudson NH, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, and Greensboro NC). Features massive 12 ft to 32 ft HD screens, concert-grade sound systems, stage lighting, and multiplayer dance battles.",
  },
  "/silent-disco": {
    title: "Silent Disco Wireless Headphone Party Rentals | NH, MA & NC",
    description:
      "Rent tri-color LED wireless Silent Disco headphones with 3 channels for 50 to 5,000+ guests in NH, Boston MA & North Carolina. Free quote!",
    keywords:
      "silent disco rental, silent disco headphone rental, silent disco party rental, silent disco rental NH, silent disco rental Boston MA, silent disco rental Charlotte NC, silent disco rental Raleigh Durham NC, LED headphone party rental",
    image: `${SITE_URL}/experience-silent-disco.png`,
    canonicalPath: "/silent-disco",
    serviceName: "Silent Disco Wireless Headphone Party Rentals",
    heading: "Silent Disco LED Headphone Party Rentals in NH, MA & NC",
    summary:
      "Host an unforgettable late-night campus or outdoor dance party with zero noise complaints using Silent Disco LED wireless headphone rentals from Next Level Gaming & Novelties. Supports up to 3 simultaneous DJ or playlist channels with red, green, and blue glowing earcups for 50 to 5,000+ guests across New Hampshire, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC).",
  },
  "/sim-racing": {
    title: "Sim Racing Cockpit & Racing Simulator Rentals | NH, MA & NC",
    description:
      "Rent force-feedback Sim Racing simulator cockpits with bucket seats, giant-screen telemetry & fastest-lap leaderboards in NH, Boston MA, CT & North Carolina.",
    keywords:
      "sim racing rental, racing simulator rental, sim racing simulator rental, racing simulator event rental, sim racing rental NH MA, racing simulator rental Boston MA, sim racing simulator rental Charlotte NC, racing simulator event rental Raleigh NC, racing simulator rental Connecticut CT, force feedback racing cockpit rental, F1 racing simulator rental",
    image: `${SITE_URL}/experience-sim-racing.png`,
    canonicalPath: "/sim-racing",
    serviceName: "Sim Racing Cockpit Simulator Event Rentals",
    heading: "Sim Racing Cockpit & Racing Simulator Rentals in NH, MA, CT & NC",
    summary:
      "Bring high-speed motorsport competition to your corporate activation, trade show, college campus, or private party with Sim Racing cockpit simulator rentals in Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, Connecticut, New England, and across North Carolina including Charlotte, Concord, Raleigh, Durham, and Greensboro NC. Features force-feedback steering wheels, responsive pedal sets, racing bucket seats, giant HD displays, and live fastest-lap tournament leaderboards.",
  },
  "/glow-park": {
    title: "Glow Park LED Swings & Mini Golf Rentals | NH, MA & NC",
    description:
      "Rent the Glow Park Experience with illuminated LED glow swings, glowing seesaws, uplighting & glowing mini golf in NH, Boston MA & North Carolina.",
    keywords:
      "glow park rental, LED glow swings rental, illuminated seesaws rental, glow mini golf rental, glow party rental NH MA, glow swings rental Charlotte Raleigh NC",
    image: `${SITE_URL}/experience-glow-park.jpg`,
    canonicalPath: "/glow-park",
    serviceName: "Glow Park Experience — Illuminated Swings, Seesaws & Mini Golf Rentals",
    heading: "Glow Park Swings, Seesaws & Mini Golf Rental in NH, MA & NC",
    summary:
      "Transform any indoor gym, ballroom, or outdoor campus quad into a radiant nighttime wonderland with the Glow Park Experience rental from Next Level Gaming & Novelties. Includes 8 illuminated LED glow swings, 4 glowing seesaws, full-color venue uplighting, and a glowing mini-golf course delivered and staffed across NH, MA, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC).",
  },
  "/novelties": {
    title: "Custom Event Novelties & Maker Workshops NH, MA & NC | Next Level",
    description:
      "Rent custom event novelty stations in Hudson NH, Boston MA & NC: Patched City trucker hats, beanies, socks, pillow dolls, sequin pillows, keychains, rings & plush bags.",
    keywords:
      "custom event novelties rental, party novelty rentals Hudson NH, college novelty event ideas NH MA NC, custom trucker hat bar rental, Patched City trucker hats and beanies, custom event socks, Bead-tastics custom bracelets, custom photo pillow dolls, reversible sequin pillows, intention bracelets, laser engraved wood and metal keychains, stamped custom rings, hammerless ring press, Silly Sacks custom plush bags, custom novelty license plates",
    image: `${SITE_URL}/novelties-bg.png`,
    canonicalPath: "/novelties",
    serviceName: "Custom Event Novelties & On-Site Maker Workshops",
    heading: "Custom Event Novelties & On-Site DIY Maker Workshops in Hudson NH, MA & NC",
    summary:
      "Book 11 hands-on custom event novelty products and interactive maker workshops for college student activities, orientations, school events, and corporate parties across Hudson NH (03051), New Hampshire, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, and Winston-Salem NC). Guests create and take home Patched City custom trucker hats and beanies, custom trucker hats, custom printed socks, Bead-tastics bracelets, intention bracelets, custom photo pillow dolls, reversible sequin pillows, laser-engraved wood and metal keychains, hammerless stamped custom rings, Silly Sacks plush character bags, and custom novelty license plates.",
  },
  "/about": {
    title: "About Next Level Gaming & Novelties | NH, MA & NC Team",
    description:
      "Founded by Calvin Reid and Yaw Boateng in Hudson NH with a branch in North Carolina, Next Level Gaming brings 10+ years of event production.",
    keywords:
      "About Next Level Gaming, Calvin Reid, Yaw Boateng, Hudson NH event rental company, North Carolina event rental branch, New England college entertainment company",
    image: `${SITE_URL}/about-gaming-event.jpg`,
    canonicalPath: "/about",
    heading: "About Next Level Gaming & Novelties — NH, MA & North Carolina Team",
    summary:
      "Founded by Calvin Reid and Yaw Boateng in Hudson, New Hampshire and expanding with a new regional branch in North Carolina, Next Level Gaming & Novelties brings over 10 years of turnkey event production experience serving colleges, universities, K-12 schools, corporations, and municipalities across NH, MA, CT, RI, ME, VT, NC, NY, NJ, PA, and FL.",
  },
  "/contact": {
    title: "Contact Next Level Gaming & Novelties | NH, MA & NC Office",
    description:
      "Contact Next Level Gaming & Novelties in Hudson NH & North Carolina to book gaming events, movie screens, VR, photo booths, or novelties. Call 978-601-5473.",
    keywords:
      "contact Next Level Gaming, Hudson NH event rentals phone number, North Carolina event rentals contact, 978-601-5473, sales@nextlevelgamingevents.com",
    image: DEFAULT_IMAGE,
    canonicalPath: "/contact",
    heading: "Contact Next Level Gaming & Novelties — NH, MA & NC (978-601-5473)",
    summary:
      "Contact Next Level Gaming & Novelties in Hudson, New Hampshire and North Carolina at 978-601-5473 or sales@nextlevelgamingevents.com to check availability and book gaming events, outdoor movie screens, LED video walls, VR stations, 360 photo booths, silent disco, glow parks, or custom novelties.",
  },
  "/quote": {
    title: "Request an Event Rental Quote | Next Level Gaming NH & NC",
    description:
      "Build your custom event package and get a fast quote in NH, MA & North Carolina for gaming events, movie screens, VR, 360 booths, glow parks, or novelties.",
    keywords:
      "gaming event rental quote NH NC, outdoor movie screen rental pricing NH MA NC, book college event entertainment Charlotte Raleigh Boston",
    image: DEFAULT_IMAGE,
    canonicalPath: "/quote",
    heading: "Request an Event Rental Quote — Next Level Gaming NH, MA & NC",
    summary:
      "Request a fast, custom event rental quote from Next Level Gaming & Novelties across New Hampshire, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, and Greensboro NC) for multiplayer video gaming events, outdoor inflatable and LED movie screens, virtual reality, 360 photo booths, silent disco, sim racing, glow parks, trivia nights, Just Dance parties, and custom novelty workshops.",
  },
  "/novelty-order": {
    title: "Order Custom Event Novelties | Next Level Gaming NH & NC",
    description:
      "Request pricing and book custom event novelty stations in NH, MA & NC—trucker hats, beanies, socks, bracelets, pillow dolls, sequin pillows & keychains.",
    keywords:
      "order custom event novelties NH NC, college novelty workshop booking North Carolina New England, Patched City hat bar order, custom college orientation giveaways",
    image: `${SITE_URL}/novelties-bg.png`,
    canonicalPath: "/novelty-order",
    heading: "Order Custom Event Novelties & Maker Workshops — NH, MA & NC",
    summary:
      "Order custom event novelty packages and interactive maker stations for your campus, school, or corporate event across NH, MA, New England, and North Carolina, including Patched City custom trucker hats and beanies, custom socks, Bead-tastics and intention bracelets, pillow dolls, sequin pillows, laser-engraved keychains, stamped rings, Silly Sacks plush bags, and custom license plates.",
  },
  "/north-carolina-event-rentals": {
    title: "North Carolina Event & Party Rentals | Charlotte, Raleigh & Eastern NC",
    description:
      "Turnkey event & party rentals across North Carolina: outdoor movie screens, 360 photo booths, gamer birthday parties, gaming events & novelties in Charlotte, Raleigh & NC.",
    keywords:
      "North Carolina event rentals, party rentals Charlotte NC, Raleigh NC event rentals, party rentals Greensboro NC, Durham NC party rentals, gamer birthday party NC, Eastern NC party rentals, New Bern NC party rentals, 360 photo booth rental Charlotte NC, outdoor movie screen rental Raleigh NC, video game truck alternative NC",
    image: DEFAULT_IMAGE,
    canonicalPath: "/north-carolina-event-rentals",
    serviceName: "North Carolina Interactive Event Rentals & Entertainment",
    heading: "North Carolina Event Rentals & Party Entertainment — Charlotte, Raleigh & Greensboro NC",
    summary:
      "Next Level Gaming & Novelties delivers turnkey event rentals, party rentals, gamer birthday parties, video gaming events, esports tournaments, giant inflatable outdoor movie screens, mobile LED video wall trailers, VR escape rooms, 360 video booths, mirror photobooths, Silent Disco wireless headphones, Sim Racing cockpits, Glow Park swings, live Trivia Nights, and custom novelty workshops across Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, Winston-Salem, Cary, Concord, Wilmington, Fayetteville, Greenville, New Bern, Northeast NC, and Asheville, North Carolina.",
  },
  "/new-hampshire-massachusetts-event-rentals": {
    title: "NH, MA & New England Event Rentals | Hudson, Portsmouth & Boston",
    description:
      "Full-service event & party rentals across NH, MA & CT: Portsmouth, Manchester, Nashua, Hudson & Boston photo booths, outdoor movie screens, gaming & VR.",
    keywords:
      "NH event rentals, Massachusetts event rentals, party rentals Manchester NH, party rentals Nashua NH, party rentals Hudson NH, Portsmouth NH photo booth rental, Portsmouth NH event rentals, Seacoast NH party rentals, Boston MA event rentals, Connecticut event rentals, next level gaming ct, new england gaming, corporate event rentals Boston, college event rentals New England, outdoor movie screen rental NH, 360 photo booth rental Boston",
    image: DEFAULT_IMAGE,
    canonicalPath: "/new-hampshire-massachusetts-event-rentals",
    serviceName: "New Hampshire, Massachusetts & New England Interactive Event Rentals",
    heading: "NH, MA & New England Event Rentals — Hudson, Manchester, Portsmouth, Boston & CT",
    summary:
      "Headquartered in Hudson, New Hampshire (03051), Next Level Gaming & Novelties delivers turnkey party rentals, event entertainment, giant inflatable and mobile LED movie screens, 360 photo booths, mirror photobooths, video gaming tournaments, Virtual Reality stations, Silent Disco headphones, Sim Racing simulators, Glow Park LED swings, Trivia Nights, and custom novelty workshops across Hudson, Nashua, Manchester, Portsmouth, Dover, Exeter, Hampton, Salem, Derry, Londonderry, Concord NH, Boston, Cambridge, Lowell, Worcester, Springfield MA, and Connecticut (Hartford, New Haven, Hamden, Danbury, Stamford, New London CT).",
  },
  "/college-school-corporate-events": {
    title: "College, School & Corporate Event Rentals | Next Level",
    description:
      "Turnkey college welcome week, high school post-prom, grad night, and corporate event rentals in NH, MA, New England & North Carolina.",
    keywords:
      "college campus event rentals, university welcome week entertainment, spring weekend rentals, high school post prom entertainment NH MA NC, project graduation party rentals, corporate event entertainment Boston Charlotte Raleigh",
    image: DEFAULT_IMAGE,
    canonicalPath: "/college-school-corporate-events",
    serviceName: "College Campus, High School Post-Prom & Corporate Event Rentals",
    heading: "College, High School Post-Prom & Corporate Event Rentals in NH, MA & NC",
    summary:
      "Next Level Gaming & Novelties specializes in turnkey large-crowd entertainment for college student activities boards (welcome week, orientation, homecoming, spring weekend), high school post-prom and project graduation lock-ins, corporate family fun days, trade shows, summer camps, and municipal festivals across New Hampshire, Massachusetts, New England, and North Carolina.",
  },
  "/build-novelty": {
    title: "Novelty Customization Studio | Next Level Gaming",
    description: "Design and customize novelty items with Next Level Gaming & Novelties.",
    canonicalPath: "/build-novelty",
    noindex: true,
  },
  "/build": {
    title: "Novelty Customization Studio | Next Level Gaming",
    description: "Design and customize novelty items with Next Level Gaming & Novelties.",
    canonicalPath: "/build-novelty",
    noindex: true,
  },
  "/explore-experiences": {
    title: "Explore Experiences & Events | Next Level Gaming NH & NC",
    description:
      "Explore all interactive event experiences from Next Level Gaming: video gaming events, outdoor movie screens, trivia nights, VR, silent disco, sim racing, and glow parks in NH, MA & NC.",
    keywords:
      "explore events, event rentals, interactive experiences, video gaming events, outdoor movies, silent disco, virtual reality, photo booth, sim racing, glow park",
    image: DEFAULT_IMAGE,
    canonicalPath: "/explore-experiences",
    heading: "Explore What's Next — Interactive Experiences & Events in NH, MA & NC",
    summary:
      "Explore our complete lineup of interactive event experiences and party rentals across New Hampshire, Massachusetts, and North Carolina. From multiplayer video gaming tournaments and outdoor movie screens to immersive VR, silent discos, sim racing cockpits, and glow park attractions.",
  },
  "/explore": {
    title: "Explore Experiences & Events | Next Level Gaming NH & NC",
    description:
      "Explore all interactive event experiences from Next Level Gaming: video gaming events, outdoor movie screens, trivia nights, VR, silent disco, sim racing, and glow parks in NH, MA & NC.",
    canonicalPath: "/explore-experiences",
  },
  "/experiences": {
    title: "Explore Experiences & Events | Next Level Gaming NH & NC",
    description:
      "Explore all interactive event experiences from Next Level Gaming: video gaming events, outdoor movie screens, trivia nights, VR, silent disco, sim racing, and glow parks in NH, MA & NC.",
    canonicalPath: "/explore-experiences",
  },
  "/cms": {
    title: "Website CMS | Next Level Gaming & Novelties",
    description: "Admin content management dashboard for Next Level Gaming & Novelties.",
    canonicalPath: "/cms",
    noindex: true,
  },
};

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function upsertRouteJsonLd(seo, canonicalUrl) {
  const existing = document.getElementById("seo-route-schema");
  if (seo.noindex) {
    if (existing) existing.remove();
    return;
  }

  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        ...(seo.canonicalPath !== "/"
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: seo.serviceName || seo.title.split("|")[0].trim(),
                item: canonicalUrl,
              },
            ]
          : []),
      ],
    },
  ];

  if (seo.serviceName) {
    graph.push({
      "@type": "Service",
      name: seo.serviceName,
      serviceType: seo.serviceName,
      description: seo.description,
      url: canonicalUrl,
      image: seo.image || DEFAULT_IMAGE,
      provider: {
        "@id": `${SITE_URL}/#organization`,
      },
      areaServed: [
        { "@type": "City", name: "Hudson, NH" },
        { "@type": "City", name: "Nashua, NH" },
        { "@type": "City", name: "Manchester, NH" },
        { "@type": "City", name: "Salem, NH" },
        { "@type": "City", name: "Derry, NH" },
        { "@type": "City", name: "Londonderry, NH" },
        { "@type": "City", name: "Concord, NH" },
        { "@type": "City", name: "Portsmouth, NH" },
        { "@type": "City", name: "Boston, MA" },
        { "@type": "City", name: "Cambridge, MA" },
        { "@type": "City", name: "Lowell, MA" },
        { "@type": "City", name: "Worcester, MA" },
        { "@type": "City", name: "Springfield, MA" },
        { "@type": "City", name: "Charlotte, NC" },
        { "@type": "City", name: "Raleigh, NC" },
        { "@type": "City", name: "Durham, NC" },
        { "@type": "City", name: "Chapel Hill, NC" },
        { "@type": "City", name: "Greensboro, NC" },
        { "@type": "City", name: "Winston-Salem, NC" },
        { "@type": "City", name: "Cary, NC" },
        { "@type": "City", name: "Wilmington, NC" },
        { "@type": "City", name: "Asheville, NC" },
        { "@type": "City", name: "Providence, RI" },
        { "@type": "City", name: "Hartford, CT" },
        { "@type": "State", name: "New Hampshire" },
        { "@type": "State", name: "Massachusetts" },
        { "@type": "State", name: "North Carolina" },
        { "@type": "State", name: "Connecticut" },
        { "@type": "State", name: "Rhode Island" },
        { "@type": "State", name: "Maine" },
        { "@type": "State", name: "Vermont" },
      ],
    });
  }

  let script = existing;
  if (!script) {
    script = document.createElement("script");
    script.id = "seo-route-schema";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  });
}

const SeoManager = () => {
  const { pathname } = useLocation();
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const seo = ROUTE_SEO[normalizedPath] || ROUTE_SEO["/"];

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${seo.canonicalPath === "/" ? "/" : seo.canonicalPath}`;
    const imageUrl = seo.image || DEFAULT_IMAGE;

    document.title = seo.title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: seo.description,
    });

    if (seo.keywords) {
      upsertMeta('meta[name="keywords"]', {
        name: "keywords",
        content: seo.keywords,
      });
    }

    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: seo.noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    });

    upsertCanonical(canonicalUrl);

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: seo.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: seo.description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });

    upsertMeta('meta[name="twitter:title"]', {
      property: "twitter:title",
      name: "twitter:title",
      content: seo.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: seo.description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });

    upsertRouteJsonLd(seo, canonicalUrl);
  }, [pathname, seo]);

  if (seo.noindex) {
    return null;
  }

  return (
    <aside className="sr-only" aria-label="Event Rental Service Area and Keyword Summary">
      <h2>{seo.heading || seo.title}</h2>
      <p>{seo.summary || seo.description}</p>
      <p>
        Next Level Gaming &amp; Novelties is a full-service party equipment rental service, event planner, and interactive entertainment provider offering turnkey event rentals, party rentals, giant outdoor movie screen rentals, 360 photo booth rentals, live gaming events, VR stations, silent disco headphones, glow park attractions, and novelty maker workshops across New Hampshire, Massachusetts, New England, and our North Carolina (NC) branch:
        Hudson NH (03051), Nashua NH, Manchester NH, Salem NH, Derry NH, Londonderry NH,
        Merrimack NH, Bedford NH, Concord NH, Portsmouth NH, Dover NH, Durham NH, Keene NH, Hanover NH,
        Boston MA, Cambridge MA, Lowell MA, Chelmsford MA, Andover MA, Lawrence MA, Waltham MA,
        Worcester MA, Springfield MA, Amherst MA, Charlotte NC, Raleigh NC, Durham NC, Chapel Hill NC,
        Greensboro NC, Winston-Salem NC, High Point NC, Cary NC, Apex NC, Wake Forest NC, Huntersville NC,
        Matthews NC, Gastonia NC, Kannapolis NC, Mooresville NC, Concord NC, Wilmington NC,
        Fayetteville NC, Greenville NC, New Bern NC, Boone NC, Asheville NC, Providence RI, Warwick RI, Hartford CT,
        New Haven CT, Stamford CT, Albany NY, White Plains NY, Portland ME, and Burlington VT for
        college campus events, university orientations, welcome week, spring weekend, high school
        post-prom and project graduation parties, corporate events, company picnics, holiday parties,
        Super Bowl and March Madness LED screen watch parties, tailgates, summer camps, municipal
        festivals, bar and bat mitzvahs, sweet 16s, graduation parties, and large-screen video game
        truck rental alternatives (eventos videojuegos y eventos gamer). Trusted by 23+ universities and colleges including Harvard, Boston University, Penn State, Babson College, Quinnipiac University, Holy Cross, Springfield College, Emmanuel College, Bridgewater State University, Fisher College, Dean College, New England College, Framingham State, Connecticut College, Salve Regina, and Seton Hall. Call 978-601-5473 or email sales@nextlevelgamingevents.com.
      </p>
      <nav aria-label="All Event Rental Services and Locations">
        <ul>
          <li><a href="/novelties">Custom Event Novelties: All 11 DIY Maker Workshop Products</a></li>
          <li><a href="/custom-trucker-hat-bar-rental">Custom Trucker Hat Bar &amp; Patched City Hat &amp; Beanie Workshop Rental</a></li>
          <li><a href="/custom-pillow-dolls-rental">Custom Photo Pillow Dolls &amp; Reversible Sequin Pillows Station</a></li>
          <li><a href="/custom-keychains-rings-novelty">Laser-Engraved Wood &amp; Metal Keychains, Stamped Custom Rings &amp; License Plates</a></li>
          <li><a href="/custom-event-socks-bracelets">Custom Printed Event Socks, Bead-tastics, Intention Bracelets &amp; Silly Sacks</a></li>
          <li><a href="/movie-nights">Outdoor Inflatable Movie Screens &amp; Mobile LED Video Wall Rentals</a></li>
          <li><a href="/inflatable-movie-screen-rental">16–40 ft Giant Outdoor Inflatable Movie Screen Rentals</a></li>
          <li><a href="/led-video-wall-rental">14–20 ft Daylight Mobile LED Video Wall Trailer Rentals</a></li>
          <li><a href="/photo-booth">Interactive Photo Booth, 360 Video Booth &amp; Mirror Photobooth Rentals</a></li>
          <li><a href="/360-video-booth">360 Slow-Motion Video Booth Platform Rentals</a></li>
          <li><a href="/mirror-photo-booth-rental">Interactive Full-Length Mirror Photobooth Rentals</a></li>
          <li><a href="/glow-park">Glow Park Illuminated LED Swings, Seesaws &amp; Mini Golf Rentals</a></li>
          <li><a href="/led-glow-swings-rental">LED Illuminated Glow Swings, Glow Seesaws &amp; Glowing Mini Golf Rentals</a></li>
          <li><a href="/silent-disco">Three-Channel Silent Disco Wireless LED Headphone Rentals</a></li>
          <li><a href="/virtual-reality">Virtual Reality Stations &amp; Mobile VR Escape Room Rentals</a></li>
          <li><a href="/vr-escape-room-rental">4-Player Cooperative Mobile VR Escape Room &amp; Beat Saber Rentals</a></li>
          <li><a href="/sim-racing">Force-Feedback Sim Racing Cockpit Simulator Rentals</a></li>
          <li><a href="/trivia-nights">Interactive Live-Hosted Trivia Night &amp; Game Show Rentals</a></li>
          <li><a href="/just-dance">Just Dance Giant-Screen Event Party Rentals</a></li>
          <li><a href="/gaming-events">Live Gaming Events, Esports Rentals &amp; Video Game Event Planner</a></li>
          <li><a href="/explore-experiences">Explore All Interactive Event Experiences</a></li>
          <li><a href="/new-hampshire-massachusetts-event-rentals">Hudson NH, New Hampshire &amp; Massachusetts Event Rentals (Hudson, Manchester, Boston)</a></li>
          <li><a href="/north-carolina-event-rentals">North Carolina Event Rentals (Charlotte, Raleigh, Durham, Greensboro)</a></li>
          <li><a href="/college-school-corporate-events">College Campus, High School Post-Prom &amp; Corporate Event Rentals</a></li>
          <li><a href="/quote">Request a Custom Event Rental Quote</a></li>
          <li><a href="/novelty-order">Order Custom Event Novelties</a></li>
          <li><a href="/about">About Next Level Gaming &amp; Novelties</a></li>
          <li><a href="/contact">Contact Next Level Gaming (978-601-5473)</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default SeoManager;

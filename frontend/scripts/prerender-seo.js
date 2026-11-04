const fs = require("fs");
const path = require("path");

const SITE_URL = "https://nextlevelgamingevents.com";
const DEFAULT_IMAGE = `${SITE_URL}/hero-bg.png`;

const ROUTES = {
  "/gaming-events": {
    title: "Live Gaming Events, Esports Rental & Video Game Event Planner | NH, MA & NC",
    description:
      "Turnkey live gaming events, esports rental company & video gaming competition production with 12–40ft screens, PS5, Xbox & Switch in NH, Boston MA, CT & NC.",
    keywords:
      "gaming events, live gaming events, gaming event, video game event, video game events, video gaming events, video game events near me, esports tournaments near me, video game event planner, video game event management, video gaming tournament event management, video gaming competition production, video game tournament event production, esports rental company, bulk esports rental, event planning equipment for gamers, esports rental, next level gaming ct, new england gaming, gaming events this weekend, next level gaming, nxt level gaming, next level fec attraction, video game tournaments, gaming event rental, gaming event planning, boston gaming events, gaming events Boston MA, college gaming events Boston, video game party rental Manchester NH, gaming events Hudson NH, gaming events Portsmouth NH, video gaming event rental New Hampshire, Connecticut gaming events, gaming event rentals Charlotte NC, mobile video game party Raleigh NC, esports tournament production NH MA CT NC, Super Smash Bros tournament rental, Mario Kart event rental Boston MA Charlotte NC",
    image: `${SITE_URL}/gaming-events-experience-1.png`,
    canonicalPath: "/gaming-events",
    serviceName: "Live Video Gaming Event Rentals, Esports Rental Company & Video Gaming Competition Production",
    heading: "Live Gaming Events, Esports Rental Company & Video Gaming Competition Production in NH, MA, CT & NC",
    summary:
      "Next Level Gaming & Novelties (Nxt Level Gaming) is the premier New England and North Carolina esports rental company, video game event planner, and video gaming tournament event management provider delivering turnkey live gaming events, bulk esports rentals, event planning equipment for gamers, and bracketed video gaming competition production across Hudson, Nashua, Manchester, Portsmouth, Salem, Derry, and Concord NH, Greater Boston and Massachusetts, Connecticut (Hartford, New Haven, Hamden, Danbury, Stamford, New London CT), Rhode Island, and our North Carolina branch in Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, and Winston-Salem NC.",
    subhead: "Deluxe, Ultimate & Bulk Esports Tournament Event Production Packages",
    details:
      "Choose from our Deluxe Package (four 12 ft HD gaming stations plus a giant 21 to 32 ft HD spectator screen), Ultimate Package (eight 12 ft HD screens plus a 26 ft jumbo screen and virtual smartphone DJ dance party), or full Bulk Esports Tournament Event Production with PlayStation 5, Xbox Series X, Nintendo Switch, and classic retro NES consoles. Popular games include Super Smash Bros. Ultimate, Mario Kart 8 Deluxe, EA Sports FC, Madden NFL, NBA 2K, Rocket League, Street Fighter 6, and Tekken 8.",
    offers: [
      {
        name: "Deluxe Live Gaming Event Rental Package",
        description: "Four 12 ft HD multiplayer gaming stations plus a giant 21 ft to 32 ft HD spectator screen, modern consoles (PS5, Xbox Series X, Switch), concert sound, and on-site event crew.",
      },
      {
        name: "Ultimate Live Gaming Event & Virtual DJ Package",
        description: "Eight 12 ft HD gaming screens plus a colossal 26 ft jumbo championship screen, virtual smartphone DJ dance party integration, and full technician staffing.",
      },
      {
        name: "Bulk Esports Rental & Video Game Tournament Event Production",
        description: "High-capacity event planning equipment for gamers, custom bracket management, main-stage championship projection, and turnkey video game event management for colleges, schools, and arenas.",
      },
    ],
    faqs: [
      {
        q: "How many players can participate at once in a Next Level gaming event?",
        a: "Our setups accommodate from 16 to over 64 simultaneous players, with hundreds of spectators watching the live action on giant 21 ft to 40 ft jumbo projection or LED screens. We tailor station counts to your expected attendance.",
      },
      {
        q: "What gaming consoles and game titles are provided?",
        a: "We provide PlayStation 5, Xbox Series X, Nintendo Switch, and classic retro NES consoles. Hit titles include Super Smash Bros. Ultimate, Mario Kart 8 Deluxe, EA Sports FC, Madden NFL, NBA 2K, Rocket League, Street Fighter 6, and Tekken 8.",
      },
      {
        q: "Can video gaming events be set up indoors or outdoors in NH, MA, CT, and NC?",
        a: "Yes! Our giant screen gaming stations can be deployed indoors inside college student unions, gymnasiums, and hotel ballrooms, or outdoors under event tents or during evening festivals across New Hampshire, Massachusetts, Connecticut, New England, and North Carolina.",
      },
      {
        q: "What is included in a bulk esports rental or video game tournament event production package?",
        a: "Our bulk esports rental and video game tournament event production package includes four to eight 12 ft HD player stations, a 21 ft to 40 ft giant spectator championship screen, complete event planning equipment for gamers, tournament bracket management, concert audio, all consoles and controllers, and full on-site video game event management—providing a spacious, high-capacity alternative to a cramped video game truck rental.",
      },
      {
        q: "Do you host video game events and esports tournaments in Connecticut (CT) and across New England?",
        a: "Yes! Next Level Gaming travels throughout Connecticut (Hartford, New Haven, Hamden, Danbury, Stamford, and New London CT—including campus events at Quinnipiac University, Connecticut College, Albertus Magnus, and Western Connecticut State), as well as New Hampshire, Massachusetts, Rhode Island, Maine, Vermont, and North Carolina.",
      },
    ],
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
      "Next Level Gaming & Novelties provides turnkey NH movie screen rentals, outdoor inflatable movie screen rentals, and daylight mobile LED video wall trailers across Hudson NH, Nashua, Manchester, Portsmouth, Concord, Greater Boston, Massachusetts, Connecticut, New England, and across North Carolina including Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, and Cary NC.",
    subhead: "16–40 ft Inflatable Cinema Screens & 14–20 ft Mobile LED Video Walls",
    details:
      "Select from 14 ft, 16 ft, and 20 ft daylight-visible mobile LED video wall trailers for daytime festivals, tailgates, and sports watch parties, or 16 ft, 21 ft, 26 ft, and 40 ft giant inflatable outdoor movie screens for campus quads, town parks, summer camps, and drive-in movie nights. Every rental includes HD projection or LED processing, concert-grade audio towers, FM radio broadcast transmitters, and on-site technicians.",
    offers: [
      {
        name: "16 ft, 21 ft, 26 ft & 40 ft Outdoor Inflatable Movie Screen Rentals",
        description: "Giant commercial air-inflated cinema screens with high-lumen HD projection, concert-grade audio towers, and on-site projectionist crew for 75 ft to 200 ft viewing distances.",
      },
      {
        name: "14 ft, 16 ft & 20 ft Daylight Mobile LED Video Wall Trailer Rentals",
        description: "Ultra-bright daylight-visible mobile LED video wall trailers engineered for midday outdoor festivals, college tailgates, graduation ceremonies, and sports watch parties.",
      },
      {
        name: "Drive-In Movie FM Radio Transmitter & Concert Sound Package",
        description: "Commercial FM radio broadcast transmitters and high-output speaker arrays allowing guests to listen from car stereos or lawn seating.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between an inflatable movie screen and a mobile LED video wall trailer?",
        a: "Inflatable movie screens (16 ft to 40 ft) use high-lumen digital projectors and are engineered for evening screenings, twilight movies, or indoor gym auditoriums. Mobile LED video wall trailers (14 ft to 20 ft) feature ultra-bright daylight-visible LED panels that deliver vivid picture quality in direct midday sunlight.",
      },
      {
        q: "Which outdoor movie screen size should I rent for my crowd and viewing distance?",
        a: "Our 16 ft inflatable screen offers a 75 ft viewing distance for medium gatherings; the 21 ft screen supports a 100 ft viewing distance; the 26 ft screen reaches 125 ft for large campus quads and parks; and our colossal 40 ft cinema screen provides a 200 ft viewing distance for drive-ins and major festivals.",
      },
      {
        q: "Can we broadcast movie sound through FM car radios for drive-in movies?",
        a: "Yes! Alongside our concert-grade audio towers, we provide commercial FM radio transmitters so attendees can listen comfortably through their own car sound systems.",
      },
      {
        q: "Where do you deliver outdoor movie screens and LED video walls?",
        a: "We deliver turnkey NH movie screen rentals and LED trailer rentals across New Hampshire (Hudson, Manchester, Nashua, Portsmouth, Concord), Massachusetts (Boston, Lowell, Worcester), Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro, Winston-Salem).",
      },
    ],
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
    heading: "Interactive Trivia Night & Game Show Rentals in NH, MA & NC",
    summary:
      "Bring live-hosted interactive trivia night and wireless buzzer game show rentals to your college campus, corporate team-building event, school, or venue with Next Level Gaming & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC).",
    subhead: "Live Hosts, Digital Wireless Buzzers & Custom Big-Screen Question Categories",
    details:
      "Our turnkey trivia shows feature charismatic live hosts, professional sound systems, wireless handheld team buzzers or smartphone-based scoring, and giant projector or TV leaderboards with customized question sets tailored to your company, university, or theme.",
    offers: [
      {
        name: "Live-Hosted Interactive Trivia Night Package",
        description: "Professional live game show host, concert sound system, giant-screen leaderboards, and multi-round multimedia trivia competition.",
      },
      {
        name: "Wireless Digital Team Buzzer Game Show Rental",
        description: "Fast-finger wireless tabletop buzzers and smartphone scoring systems for college orientations, corporate team building, and school assemblies.",
      },
    ],
    faqs: [
      {
        q: "How does the interactive trivia night setup work?",
        a: "We provide an energetic live host, sound equipment, giant-screen leaderboards, and wireless buzzers or smartphone response systems. Teams compete in real time with automated scoring.",
      },
      {
        q: "Can trivia questions be customized for our company or university?",
        a: "Yes! We can build custom trivia rounds highlighting your company culture, campus history, industry topics, or pop culture themes.",
      },
    ],
  },
  "/virtual-reality": {
    title: "Virtual Reality & VR Escape Room Rentals | NH, MA & NC",
    description:
      "Rent room-scale Virtual Reality stations, VR event games (SUPERHOT VR, Beat Saber) & 4-player VR escape rooms in Hudson NH, Boston MA & North Carolina.",
    keywords:
      "vr event games, superhot virtual reality, nh vr rental, virtual reality rental, VR event rental, VR party rental, virtual reality rental NH, virtual reality rental Boston MA, VR party rental Charlotte NC, mobile VR escape room rental, college VR entertainment, Beat Saber party rental",
    image: `${SITE_URL}/experience-virtual-reality.png`,
    canonicalPath: "/virtual-reality",
    serviceName: "Virtual Reality (VR) Event Stations, VR Event Games & Mobile VR Escape Rooms",
    heading: "Virtual Reality, VR Event Games & Mobile VR Escape Room Rentals in NH, MA & NC",
    summary:
      "Immerse attendees in cutting-edge room-scale Virtual Reality stations, interactive VR event games, and 4-player cooperative VR escape rooms with Next Level Gaming & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Greater Boston, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, Greensboro NC).",
    subhead: "Room-Scale VR Headsets, Spectator Displays & Co-op VR Escape Adventures",
    details:
      "Our VR event rentals feature motion-tracked headsets, live HD spectator monitors so crowds can watch the action, sanitary disposable masks, dedicated attendants, and fan-favorite VR event games including SUPERHOT Virtual Reality (SUPERHOT VR), Beat Saber, Job Simulator, Walkabout Mini Golf, Pistol Whip, Dragon Tower, Depths of Osiris, Manor Escape, and Time Travel Paradox.",
    offers: [
      {
        name: "Room-Scale Virtual Reality Action Gaming Stations",
        description: "Motion-tracked VR headsets with HD spectator monitors, sanitary face covers, and attendants featuring Beat Saber, SUPERHOT VR, Job Simulator, Walkabout Mini Golf, and Pistol Whip.",
      },
      {
        name: "4-Player Cooperative Mobile VR Escape Room Rental",
        description: "Team-based multiplayer VR escape room adventures including Dragon Tower, Depths of Osiris, Manor Escape, and Time Travel Paradox.",
      },
    ],
    faqs: [
      {
        q: "What games and experiences are available with the VR rental?",
        a: "We feature top room-scale titles like Beat Saber, SUPERHOT VR, Job Simulator, Walkabout Mini Golf, Pistol Whip, and multi-player VR escape rooms including Dragon Tower, Manor Escape, and Depths of Osiris.",
      },
      {
        q: "Can spectators watch what the player sees in VR?",
        a: "Yes! Every station includes an external HD spectator monitor so attendees waiting in line or cheering from the crowd can see every move in real time.",
      },
      {
        q: "Are VR attendants and sanitary headset covers included with the rental?",
        a: "Yes! Every Virtual Reality rental includes disposable sanitary face covers, alcohol-free lens cleaning between turns, and trained on-site VR attendants to guide players through each game or VR escape room.",
      },
    ],
  },
  "/photo-booth": {
    title: "Photo Booth NH | Portsmouth, Manchester & Hudson 360 & Mirror Rentals",
    description:
      "Turnkey Photo Booth NH rentals, Portsmouth photo booth rentals, 360 video booths & mirror photobooths in Portsmouth, Manchester, Nashua, Hudson, Boston & NC.",
    keywords:
      "photo booth nh, nh photo booth rental, portsmouth photo booth rental, portsmouth nh photo booth rental, 360 photo booth rental, photo booth rental, mirror photobooth rental, photo booth rental NH, manchester nh photo booth rental, nashua nh photo booth rental, hudson nh photo booth rental, concord nh photo booth rental, dover nh photo booth rental, salem nh photo booth rental, 360 video booth rental NH, photo booth rental Boston MA, 360 photo booth rental Charlotte NC, photo booth rental Raleigh NC, interactive photo booth, wedding photo booth rental, corporate photo booth rental",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "Interactive Photo Booth, 360 Video Booth & Mirror Photobooth Rentals",
    heading: "Photo Booth NH Rentals — Portsmouth, Manchester, Hudson, Boston & NC 360 & Mirror Booths",
    summary:
      "Capture and share unforgettable memories with turnkey Photo Booth NH rentals, Portsmouth photo booth rentals, 360 slow-motion video booths, and interactive full-length mirror photobooth rentals from Next Level Gaming & Novelties across Portsmouth NH, Dover, Exeter, Hampton, Hudson NH, Nashua, Manchester, Concord, Salem, Derry, Greater Boston MA, Connecticut, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC).",
    subhead: "Interactive Mirror Photo Booths & Slow-Motion 360 Video Platforms",
    details:
      "Every interactive photo booth, 360 video booth, and mirror photobooth package includes red carpet and VIP stanchions, professional LED studio ring lighting, custom event logos and overlays, party props, instant QR and SMS digital sharing, and a friendly on-site attendant for college formals, proms, weddings, Seacoast NH & Portsmouth events, corporate galas, and private celebrations.",
    offers: [
      {
        name: "360 Slow-Motion Video Booth Platform Rental",
        description: "Motorized 360-degree rotating camera platform with studio LED ring lighting, custom slow-motion video overlays, music tracks, and instant QR/SMS sharing.",
      },
      {
        name: "Interactive Full-Length Mirror Photobooth Rental",
        description: "Touch-screen full-length mirror photo booth with animated voice prompts, interactive glass signature drawing, party props, and instant keepsake prints.",
      },
      {
        name: "VIP Red Carpet, Stanchions & On-Site Booth Attendant Package",
        description: "Included with every NH, MA, CT & NC photo booth rental: red carpet entrance, velvet ropes, custom event graphics, and full setup and attendant service.",
      },
    ],
    faqs: [
      {
        q: "Where do you deliver photo booth and 360 video booth rentals in New Hampshire, Massachusetts, and North Carolina?",
        a: "We deliver, set up, and staff NH photo booth rentals—including 360 video booths and interactive mirror photo booths—across Portsmouth NH, the NH Seacoast (Dover, Exeter, Hampton, Durham), Manchester NH, Nashua NH, Hudson NH, Concord NH, Salem NH, Derry NH, Londonderry NH, Greater Boston, Lowell, and Worcester MA, Connecticut, and across North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC).",
      },
      {
        q: "How does the 360 photo booth and slow-motion video booth work?",
        a: "Guests step onto an elevated platform while a motorized camera arm rotates 360 degrees around them, capturing high-resolution slow-motion video. Videos are rendered with custom event graphics and music, and guests download them immediately to their phones via QR code or SMS.",
      },
      {
        q: "What is an interactive mirror photo booth?",
        a: "The mirror photo booth is a full-length touch-screen mirror that displays vibrant animations, countdowns, and voice prompts. Guests pose, sign the interactive glass, and take home glossy printed photo keepsakes.",
      },
      {
        q: "How much space and power is needed for the photo booth rental?",
        a: "The 360 video booth requires a 10x10 ft open area for safe rotation and guest queueing. The mirror photobooth requires an 8x8 ft space. Both operate on a standard 120V household outlet.",
      },
      {
        q: "Is an attendant included with the rental?",
        a: "Yes. Every rental includes a dedicated on-site attendant to guide guests, manage lines, and ensure flawless operation throughout your event.",
      },
    ],
  },
  "/just-dance": {
    title: "Just Dance Party Rentals & Giant Screen Events | NH, MA & NC",
    description:
      "Bring multiplayer Just Dance battles on giant HD screens with concert sound and lighting to your college, school, or event in Hudson NH, MA & North Carolina.",
    keywords:
      "just dance, just dance party rental, nh just dance rental, Just Dance event rental NH MA NC, giant screen dance party rental, college Just Dance party New England North Carolina, interactive dance game rental Boston MA Charlotte NC",
    image: `${SITE_URL}/experience-just-dance.png`,
    canonicalPath: "/just-dance",
    serviceName: "Just Dance Giant-Screen Event Rentals",
    heading: "Just Dance Giant Screen Event Party Rentals in NH, MA & NC",
    summary:
      "Turn any campus center, school gymnasium, or event venue into an interactive dance floor with Just Dance giant screen event party rentals from Next Level Gaming & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, and Greensboro NC).",
    subhead: "Massive HD Projection Screens, Concert Audio & Multiplayer Dance Battles",
    details:
      "Guests step onto the dance floor, follow the choreography on 12 ft to 32 ft HD screens, and compete or dance together to chart-topping hits backed by concert-grade speakers, subwoofers, and dynamic party lighting.",
    offers: [
      {
        name: "Just Dance Giant-Screen Stage Party Package",
        description: "Multiplayer Just Dance stage setup with 12 ft to 32 ft HD projection screens, high-output concert speakers and subwoofers, dance lighting, and on-site host crew.",
      },
    ],
    faqs: [
      {
        q: "How many guests can participate in a Just Dance stage party?",
        a: "Dozens of guests can dance together simultaneously on the dance floor while hundreds watch, sing along, and cheer on the massive HD screen.",
      },
      {
        q: "What equipment is included with the Just Dance party rental?",
        a: "We provide 12 ft to 32 ft HD screens, high-output sound systems and subwoofers, dynamic dance lighting, modern game consoles, and staff to run dance-offs.",
      },
    ],
  },
  "/silent-disco": {
    title: "Silent Disco Wireless Headphone Party Rentals | NH, MA & NC",
    description:
      "Rent tri-color LED wireless Silent Disco headphones with 3 channels for 50 to 5,000+ guests in Hudson NH, Manchester, Boston MA & North Carolina.",
    keywords:
      "nh silent disco rental, silent disco rental, silent disco headphone rental, silent disco party rental, silent disco rental NH, silent disco rental Boston MA, silent disco rental Charlotte NC, silent disco rental Raleigh Durham NC, LED headphone party rental",
    image: `${SITE_URL}/experience-silent-disco.png`,
    canonicalPath: "/silent-disco",
    serviceName: "Silent Disco Wireless Headphone Party Rentals",
    heading: "Silent Disco Wireless Headphone Party Rentals in NH, MA & NC",
    summary:
      "Throw the loudest quiet party on campus or outdoors with Silent Disco LED wireless headphone party rentals from Next Level Gaming & Novelties in Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, New England, and across North Carolina including Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC.",
    subhead: "Three-Channel Tri-Color LED Wireless Headphones for 50 to 5,000+ Guests",
    details:
      "Guests switch between up to three live DJ or playlist channels right on their earcup, lighting up the room in red, green, or blue LED glow so everyone can see which song channel their friends are dancing to—all with zero noise complaints for late-night campus unions, outdoor quads, and high school post-proms.",
    offers: [
      {
        name: "3-Channel Tri-Color LED Wireless Silent Disco Headphone Rental",
        description: "50 to 5,000+ rechargeable LED wireless headphones with red, green, and blue channel indicators and three long-range audio transmitters.",
      },
    ],
    faqs: [
      {
        q: "How does a Silent Disco work?",
        a: "Guests wear wireless LED headphones that pick up audio from up to three separate transmitters. Each listener can toggle between music genres or DJs, with LED lights indicating their channel.",
      },
      {
        q: "Can Silent Disco be hosted in venues with noise curfews?",
        a: "Yes! Silent Discos produce zero amplified loudspeaker noise, making them ideal for outdoor quads, residential halls, and public spaces after hours.",
      },
      {
        q: "Can we connect our own playlists, laptops, or live DJs to the 3 Silent Disco channels?",
        a: "Yes! Our 3-channel transmitters accept standard audio inputs from smartphones, laptops, Spotify playlists, or live DJ mixers so you can run three music genres simultaneously.",
      },
    ],
  },
  "/sim-racing": {
    title: "Sim Racing Cockpit & Racing Simulator Rentals | NH, MA & NC",
    description:
      "Rent force-feedback Sim Racing simulator cockpits with bucket seats, giant-screen telemetry & fastest-lap leaderboards in NH, Boston MA, CT & North Carolina.",
    keywords:
      "nh sim racing rental, sim racing rental, racing simulator rental, sim racing simulator rental, racing simulator event rental, sim racing rental NH MA, racing simulator rental Boston MA, sim racing simulator rental Charlotte NC, racing simulator event rental Raleigh NC, racing simulator rental Connecticut CT, force feedback racing cockpit rental, F1 racing simulator rental",
    image: `${SITE_URL}/experience-sim-racing.png`,
    canonicalPath: "/sim-racing",
    serviceName: "Sim Racing Cockpit Simulator Event Rentals",
    heading: "Sim Racing Cockpit & Racing Simulator Rentals in NH, MA, CT & NC",
    summary:
      "Bring motorsport excitement to your corporate activation, trade show, college event, or party with Sim Racing cockpit simulator rentals from Next Level Gaming & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, Connecticut, New England, and our North Carolina branch in Charlotte, Concord, Raleigh, Durham, and Greensboro NC.",
    subhead: "Force-Feedback Racing Cockpits, Bucket Seats & Fastest-Lap Tournaments",
    details:
      "Our Sim Racing simulator cockpits pair force-feedback racing wheels and pedal sets with authentic racing bucket seats, high-definition displays, surround sound, and live fastest-lap leaderboards managed by our event crew.",
    offers: [
      {
        name: "Force-Feedback Sim Racing Cockpit Simulator Rental",
        description: "Full-size racing simulator cockpit with bucket seat, force-feedback wheel and pedals, HD telemetry monitor, and on-site racing attendant.",
      },
      {
        name: "Multi-Cockpit Head-to-Head Racing Tournament & Fastest-Lap Leaderboard",
        description: "Side-by-side Sim Racing simulator cockpits linked for head-to-head racing competitions and fastest-lap leaderboard challenges at trade shows, colleges, and corporate events.",
      },
    ],
    faqs: [
      {
        q: "What equipment comes with the Sim Racing simulator cockpit?",
        a: "Each cockpit features an authentic racing bucket seat, precision force-feedback steering wheel and pedals, high-definition displays, and live leaderboard tracking.",
      },
      {
        q: "What types of cars and tracks can participants race?",
        a: "Racers can drive Formula 1, GT3, rally, and supercars on laser-scanned international circuits with true-to-life physics.",
      },
      {
        q: "Can multiple Sim Racing cockpits be rented for head-to-head competitions?",
        a: "Yes! We can deploy multiple racing simulator cockpits side by side with a live fastest-lap tournament leaderboard for trade shows, college events, and corporate parties.",
      },
    ],
  },
  "/glow-park": {
    title: "Glow Park LED Swings & Mini Golf Rentals | NH, MA & NC",
    description:
      "Rent the Glow Park Experience with illuminated LED glow swings, glowing seesaws, uplighting & glowing mini golf in Hudson NH, Boston MA & North Carolina.",
    keywords:
      "nh glow party rental, glow park rental, LED glow swings rental, illuminated seesaws rental, glow mini golf rental, glow party rental NH MA, glow swings rental Charlotte Raleigh NC",
    image: `${SITE_URL}/experience-glow-park.jpg`,
    canonicalPath: "/glow-park",
    serviceName: "Glow Park Experience — Illuminated Swings, Seesaws & Mini Golf Rentals",
    heading: "Glow Park Swings, Seesaws & Mini Golf Rental in NH, MA & NC",
    summary:
      "Transform indoor gyms, ballrooms, or outdoor campus quads with the full Glow Park Experience rental from Next Level Gaming & Novelties in Hudson NH, Manchester, Nashua, Portsmouth, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC).",
    subhead: "Eight Illuminated LED Swings, Four Glow Seesaws & Glowing Mini Golf",
    details:
      "Our signature Glow Park package includes 8 commercial LED illuminated swings on truss frames, 4 glowing multi-rider seesaws, full-color venue uplighting, and an interactive glowing mini-golf course that turns any day or night event into a viral photo destination.",
    offers: [
      {
        name: "8 Commercial LED Illuminated Glow Swings on Truss Frames",
        description: "Eight color-changing LED glow swings suspended on heavy-duty commercial truss structures for indoor gymnasiums or outdoor quads.",
      },
      {
        name: "4 Illuminated Multi-Rider Glow Seesaws & Full-Color Venue Uplighting",
        description: "Four glowing LED seesaws paired with ambient full-color room or lawn uplighting.",
      },
      {
        name: "Interactive Glowing LED Mini-Golf Course Rental",
        description: "Portable illuminated mini-golf holes, glowing putters, and LED golf balls included with the Glow Park Experience.",
      },
    ],
    faqs: [
      {
        q: "What items are included in the Glow Park Experience?",
        a: "The full Glow Park package features 8 illuminated LED glow swings on truss frames, 4 glowing seesaws, dynamic venue uplighting, and a glowing mini-golf course.",
      },
      {
        q: "Can the Glow Park be installed indoors?",
        a: "Yes! It creates a breathtaking glow lounge indoors in darkened gymnasiums, field houses, and ballrooms, as well as on outdoor lawns.",
      },
      {
        q: "Does the Glow Park rental include delivery, truss assembly, and on-site staff?",
        a: "Yes! Our crew handles full delivery, commercial truss assembly, LED programming, on-site attendant supervision, and post-event teardown.",
      },
    ],
  },
  "/novelties": {
    title: "Custom Event Novelties & Maker Workshops NH, MA & NC | Next Level",
    description:
      "Rent custom event novelty stations in Hudson NH, Boston MA & NC: Patched City trucker hats, beanies, socks, pillow dolls, sequin pillows, keychains, rings & plush bags.",
    keywords:
      "custom event novelties rental, nh custom hat bar rental, party novelty rentals Hudson NH, college novelty event ideas NH MA NC, custom trucker hat bar rental, Patched City trucker hats and beanies, custom event socks, Bead-tastics custom bracelets, custom photo pillow dolls, reversible sequin pillows, intention bracelets, laser engraved wood and metal keychains, stamped custom rings, hammerless ring press, Silly Sacks custom plush bags, custom novelty license plates",
    image: `${SITE_URL}/novelties-bg.png`,
    canonicalPath: "/novelties",
    serviceName: "Custom Event Novelties & On-Site Maker Workshops",
    heading: "Custom Event Novelties & On-Site DIY Maker Workshops in Hudson NH, MA & NC",
    summary:
      "Next Level Gaming Events & Novelties brings 11 hands-on custom event novelty products and interactive maker workshops to colleges, universities, high schools, summer camps, corporate events, and private parties across Hudson NH (03051), Nashua, Manchester, Portsmouth, Boston MA, Connecticut, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC).",
    subhead: "11 Make-and-Take Custom Novelty Products: Patched City Hats, Socks, Pillow Dolls, Keychains, Rings & Plush Bags",
    details:
      "Attendees customize and take home 11 signature personalized novelty products right on the spot: (1) Patched City Custom Trucker Hats & Beanies with heat-pressed patches, (2) Custom Trucker Hat Bars, (3) Custom Printed Crew Socks, (4) Bead-tastics Custom Bracelets, (5) Custom Photo Pillow Dolls, (6) Custom Sequin / Sequence Pillows, (7) Intention Bracelets, (8) Laser-Engraved Wood & Metal Keychains, (9) Stamped Custom Rings using our Hammerless Ring Press, (10) Silly Sacks Custom Character Plush Bags, and (11) Custom Novelty License Plates.",
    offers: [
      {
        name: "(Patched City) Custom Trucker Hats & Beanies Workshop",
        description: "Heat-pressed custom patch trucker hats and knit beanies with hundreds of trendy iron-on patches applied on-site.",
      },
      {
        name: "Custom Trucker Hat Bar Rental",
        description: "Personalized foam and mesh trucker hats customized on-site for college orientations, corporate activations, and parties.",
      },
      {
        name: "Custom Printed Event Crew Socks Station",
        description: "On-site custom sublimated and printed crew socks featuring event graphics, school logos, or custom designs.",
      },
      {
        name: "Bead-tastics Custom Bracelets Workshop",
        description: "Interactive DIY beaded bracelet and charm keepsake station for campuses, camps, and festivals.",
      },
      {
        name: "Custom Photo Pillow Dolls Station",
        description: "Turn guest photos, pets, or campus mascots into stuffed 3D custom pillow dolls made right at your event.",
      },
      {
        name: "Custom Reversible Sequin (Sequence) Pillows",
        description: "Brushable magic sequin pillows customized on-site to reveal guest photos or event logos.",
      },
      {
        name: "Custom Intention Bracelets Station",
        description: "Meaningful stamped and woven bracelets personalized with custom words of intention.",
      },
      {
        name: "Laser-Engraved Wood & Metal Keychains",
        description: "Precision on-site laser engraving on natural wood and anodized metal keychains.",
      },
      {
        name: "Stamped Custom Rings (Hammerless Ring Press)",
        description: "Custom metal-stamped rings created safely and quietly on-site using our specialized Hammerless Ring Press.",
      },
      {
        name: "Silly Sacks Custom Character Plush Bags",
        description: "Make-your-own stuffed plush character drawstring bags and backpacks.",
      },
      {
        name: "Custom Novelty License Plates Station",
        description: "Personalized aluminum novelty license plates printed on-site with names, states, and custom themes.",
      },
    ],
    faqs: [
      {
        q: "What are all 11 custom event novelty products you offer?",
        a: "We offer 11 turnkey make-and-take novelty stations: (1) Patched City Custom Trucker Hats & Beanies, (2) Custom Trucker Hats, (3) Custom Printed Socks, (4) Bead-tastics Custom Bracelets, (5) Custom Photo Pillow Dolls, (6) Custom Sequin (Sequence) Pillows, (7) Intention Bracelets, (8) Laser-Engraved Wood & Metal Keychains, (9) Stamped Custom Rings with our Hammerless Ring Press, (10) Silly Sacks Custom Character Plush Bags, and (11) Custom Novelty License Plates.",
      },
      {
        q: "Do guests get to take home their novelty creations immediately?",
        a: "Yes! All novelties—including heat-pressed Patched City hats, laser-engraved keychains, custom pillow dolls, and custom printed socks—are created and completed on-site during your event.",
      },
      {
        q: "How many items can your novelty workshop produce per hour?",
        a: "Depending on the station and staffing, our crew can produce 50 to over 200 custom souvenir items per hour for college welcome weeks, orientations, post-proms, and corporate events.",
      },
      {
        q: "Where can we rent custom novelty stations in New Hampshire, Massachusetts, and North Carolina?",
        a: "From our Rebel Rd headquarters in Hudson, NH (03051) and our North Carolina branch, we deliver staffed novelty workshops across Hudson, Nashua, Manchester, Portsmouth, Boston, Worcester, Hartford, New Haven, Charlotte, Raleigh, Durham, and Greensboro.",
      },
    ],
  },
  "/about": {
    title: "About Next Level Gaming & Novelties | NH, MA & NC Team",
    description:
      "Founded by Calvin Reid and Yaw Boateng in Hudson NH with a branch in North Carolina, Next Level Gaming brings 10+ years of event production.",
    keywords:
      "About Next Level Gaming, Calvin Reid, Yaw Boateng, Hudson NH event rental company, North Carolina event rental branch, New England college entertainment company",
    image: `${SITE_URL}/about-gaming-event.jpg`,
    canonicalPath: "/about",
    heading: "About Next Level Gaming & Novelties — NH, MA & NC Team",
    summary:
      "Founded by Calvin Reid and Yaw Boateng, Next Level Gaming & Novelties is headquartered in Hudson, New Hampshire with an expanding regional branch in North Carolina, bringing more than ten years of turnkey event production experience across multiplayer gaming, esports tournaments, outdoor inflatable and mobile LED movie screens, virtual reality, and interactive novelty workshops.",
    subhead: "10+ Years of Turnkey Campus, School, Corporate & Community Events",
    details:
      "From a neighborhood game of Madden in 2007 to producing large-scale interactive events across New Hampshire, Massachusetts, Connecticut, Rhode Island, Maine, Vermont, North Carolina, New York, New Jersey, Pennsylvania, and Florida, our crew handles every detail of delivery, setup, live hosting, and teardown.",
    faqs: [
      {
        q: "Who founded Next Level Gaming & Novelties?",
        a: "Next Level Gaming & Novelties was founded by Calvin Reid and Yaw Boateng, who expanded the company from local New England gaming setups into a premier event rental production company serving both New England and North Carolina.",
      },
      {
        q: "Is Next Level Gaming & Novelties insured for campus and municipal venues?",
        a: "Yes. We maintain comprehensive commercial liability insurance satisfying requirements for major universities, colleges, public schools, and convention centers.",
      },
    ],
  },
  "/contact": {
    title: "Contact Next Level Gaming & Novelties | NH, MA & NC Office",
    description:
      "Contact Next Level Gaming & Novelties in Hudson NH & North Carolina to book gaming events, movie screens, VR, photo booths, or novelties. Call 978-601-5473.",
    keywords:
      "contact Next Level Gaming, Hudson NH event rentals phone number, North Carolina event rentals contact, 978-601-5473, sales@nextlevelgamingevents.com",
    image: DEFAULT_IMAGE,
    canonicalPath: "/contact",
    heading: "Contact Next Level Gaming & Novelties — NH, MA & NC Office",
    summary:
      "Get in touch with Next Level Gaming & Novelties in Hudson, New Hampshire and our North Carolina branch to plan your next college, school, corporate, or community event across NH, MA, New England, and NC. Call 978-601-5473 or email sales@nextlevelgamingevents.com.",
    subhead: "Check Event Availability & Request Pricing for NH, MA & North Carolina",
    details:
      "Our event coordinators respond quickly with package recommendations, space requirements, power specifications, and turnkey pricing for venues in Hudson, Nashua, Manchester, Boston, Charlotte, Raleigh, Durham, Greensboro, and beyond.",
    faqs: [
      {
        q: "What is the fastest way to check availability for an event date?",
        a: "The fastest way is to submit our online quote request form at https://nextlevelgamingevents.com/quote or call our booking office at 978-601-5473.",
      },
      {
        q: "What regions do you travel to?",
        a: "We travel throughout New Hampshire, Massachusetts, Maine, Vermont, Rhode Island, Connecticut, and across North Carolina, South Carolina, and the East Coast.",
      },
    ],
  },
  "/quote": {
    title: "Request an Event Rental Quote | Next Level Gaming NH & NC",
    description:
      "Build your custom event package and get a fast quote in NH, MA & North Carolina for gaming events, movie screens, VR, 360 booths, glow parks, or novelties.",
    keywords:
      "gaming event rental quote NH NC, outdoor movie screen rental pricing NH MA NC, book college event entertainment Charlotte Raleigh Boston",
    image: DEFAULT_IMAGE,
    canonicalPath: "/quote",
    heading: "Request an Event Rental Quote — Next Level Gaming NH & NC",
    summary:
      "Use our interactive event planner to request a custom rental quote for video gaming events, outdoor movie nights, virtual reality, 360 photo booths, silent disco, sim racing, glow parks, trivia nights, or custom novelties in Hudson NH, Massachusetts, New England, and North Carolina.",
    subhead: "Custom Multi-Attraction Event Packages for Colleges, Schools & Corporations",
    details:
      "Bundle multiple experiences—such as a 26 ft outdoor movie screen, multiplayer gaming tournament, 360 video booth, and Patched City hat workshop—for multi-hour campus orientations, post-prom lock-ins, or community festivals in NH, MA, and NC.",
  },
  "/novelty-order": {
    title: "Order Custom Event Novelties | Next Level Gaming NH & NC",
    description:
      "Request pricing and book custom event novelty stations in NH, MA & NC—trucker hats, beanies, socks, bracelets, pillow dolls, sequin pillows & keychains.",
    keywords:
      "order custom event novelties NH NC, college novelty workshop booking North Carolina New England, Patched City hat bar order, custom college orientation giveaways",
    image: `${SITE_URL}/novelties-bg.png`,
    canonicalPath: "/novelty-order",
    heading: "Order Custom Event Novelties — Next Level Gaming NH & NC",
    summary:
      "Request pricing and order custom event novelty workshops including Patched City trucker hats and beanies, custom socks, Bead-tastics bracelets, intention bracelets, pillow dolls, sequin pillows, laser-engraved keychains, stamped rings, Silly Sacks, and custom license plates across New Hampshire, Massachusetts, New England, and North Carolina.",
    subhead: "On-Site Interactive Maker Stations & Bulk Custom Event Souvenirs",
    details:
      "Select your novelty items, estimated guest counts, and event date in NH, MA, or NC, and our team will prepare a turnkey novelty workshop proposal complete with equipment, supplies, and on-site staff.",
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
    subhead: "Serving Colleges, Schools, Corporate Events, Birthday Parties & Festivals Across North Carolina",
    details:
      "Our North Carolina branch provides full delivery, setup, and on-site event staff for university campuses, high school proms and grad nights, gamer birthday parties, corporate activations, and community festivals in the Charlotte Metro, Research Triangle (Raleigh-Durham-Chapel Hill), Piedmont Triad (Greensboro-Winston-Salem-High Point), Coastal NC, New Bern, and Western NC.",
    faqs: [
      {
        q: "Which cities in North Carolina do you deliver event rentals to?",
        a: "Our North Carolina crew serves Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, Winston-Salem, Cary, Apex, Concord, High Point, Wilmington, New Bern, Greenville, and Asheville, NC.",
      },
      {
        q: "What types of events do you produce in North Carolina?",
        a: "We produce college campus events (orientation, homecoming, spring weekend), gamer birthday parties, high school proms and post-proms, corporate family picnics, trade show attractions, and municipal festivals across NC.",
      },
    ],
  },
  "/new-hampshire-massachusetts-event-rentals": {
    title: "NH, MA & New England Event Rentals | Hudson, Portsmouth & Boston",
    description:
      "Full-service event & party rentals across NH, MA & CT: Portsmouth, Manchester, Nashua, Hudson & Boston photo booths, outdoor movie screens, gaming & VR.",
    keywords:
      "NH event rentals, nh party rentals, nh photo booth rental, nh movie screen rental, Massachusetts event rentals, party rentals Manchester NH, party rentals Nashua NH, party rentals Hudson NH, Portsmouth NH photo booth rental, Portsmouth NH event rentals, Seacoast NH party rentals, Boston MA event rentals, Connecticut event rentals, next level gaming ct, new england gaming, corporate event rentals Boston, college event rentals New England, outdoor movie screen rental NH, 360 photo booth rental Boston",
    image: DEFAULT_IMAGE,
    canonicalPath: "/new-hampshire-massachusetts-event-rentals",
    serviceName: "New Hampshire, Massachusetts & New England Interactive Event Rentals",
    heading: "NH, MA & New England Event Rentals — Hudson, Manchester, Portsmouth, Boston & CT",
    summary:
      "Headquartered in Hudson, New Hampshire (03051), Next Level Gaming & Novelties delivers turnkey party rentals, event entertainment, giant inflatable and mobile LED movie screens, 360 photo booths, mirror photobooths, video gaming tournaments, Virtual Reality stations, Silent Disco headphones, Sim Racing simulators, Glow Park LED swings, Trivia Nights, and custom novelty workshops across Hudson, Nashua, Manchester, Portsmouth, Dover, Exeter, Hampton, Salem, Derry, Londonderry, Concord NH, Boston, Cambridge, Lowell, Worcester, Springfield MA, and Connecticut (Hartford, New Haven, Hamden, Danbury, Stamford, New London CT).",
    subhead: "Turnkey Event Entertainment Across New Hampshire, Massachusetts, Connecticut & New England",
    details:
      "For over ten years, our Hudson NH team has produced interactive campus, school, municipal, and corporate events across Southern, Central, and Seacoast New Hampshire (including Portsmouth NH), Greater Boston, the Merrimack Valley, Central and Western Massachusetts, Rhode Island, Connecticut, Maine, and Vermont.",
    faqs: [
      {
        q: "Where is Next Level Gaming located in New Hampshire?",
        a: "We are headquartered in Hudson, NH (03051) and deliver interactive entertainment across Southern, Central, and Seacoast New Hampshire (Manchester, Nashua, Portsmouth, Concord, Dover, Exeter, Salem, Derry), Greater Boston, Connecticut, and throughout New England.",
      },
      {
        q: "Do you deliver photo booth rentals and event entertainment to Portsmouth NH and Connecticut (CT)?",
        a: "Yes! Our crew regularly delivers 360 photo booths, mirror photobooths, outdoor movie screens, sim racing cockpits, and live gaming events to Portsmouth NH and the NH Seacoast, as well as across Connecticut (Hartford, New Haven, Hamden, Danbury, Stamford, and New London CT).",
      },
      {
        q: "How far in advance should we reserve event rentals in NH, MA, or CT?",
        a: "We recommend booking 4 to 12 weeks in advance to secure prime dates for college spring weekends, high school post-prom lock-ins, and summer festivals.",
      },
    ],
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
    heading: "College, School & Corporate Event Rentals in NH, MA & NC",
    summary:
      "Next Level Gaming & Novelties specializes in turnkey large-crowd entertainment for college student activities boards (welcome week, orientation, homecoming, spring weekend), high school post-prom and project graduation lock-ins, corporate family fun days, trade shows, summer camps, and municipal festivals across New Hampshire, Massachusetts, New England, and North Carolina.",
    subhead: "Insured, Fully Staffed Interactive Attractions for High-Attendance Events",
    details:
      "Whether you are entertaining 100 students in a campus center or 5,000 attendees at a spring weekend festival or company picnic, our crew delivers commercial-grade equipment, giant HD screens, concert sound, and hands-on novelty stations tailored to your schedule and venue. Trusted by Harvard University, Boston University, Penn State, Babson College, Quinnipiac University, Holy Cross, Springfield College, Emmanuel College, Bridgewater State University, Fisher College, Dean College, New England College, Framingham State University, Connecticut College, Salve Regina University, Seton Hall University, Fairleigh Dickinson, SUNY Polytechnic, and more.",
    faqs: [
      {
        q: "Are Next Level Gaming & Novelties events fully insured?",
        a: "Yes. We carry comprehensive commercial general liability insurance that satisfies university risk management and municipal requirements.",
      },
      {
        q: "Which colleges and universities has Next Level Gaming & Novelties partnered with?",
        a: "Our crew has produced campus events for 23+ universities and colleges including Harvard, Boston University, Penn State, Babson College, Quinnipiac University, College of the Holy Cross, Springfield College, Emmanuel College, Bridgewater State University, Fisher College, Dean College, New England College, Framingham State, Connecticut College, Albertus Magnus, Western Connecticut State, Salve Regina, Seton Hall, Fairleigh Dickinson, SUNY Polytechnic, College of Staten Island, John Jay, Brookdale, Florida Tech, and Mercyhurst.",
      },
      {
        q: "Can we bundle multiple attractions for a single campus or corporate date?",
        a: "Yes! Many clients bundle attractions—such as a 26 ft outdoor movie screen, 360 photo booth, multiplayer gaming tournament, and custom hat workshop—for seamless, multi-hour entertainment.",
      },
    ],
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
      "Rent a commercial 360 slow-motion video booth platform from Next Level Gaming Events & Novelties across Hudson NH (03051), Portsmouth, Manchester, Nashua, Concord, Greater Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC). Guests step onto our elevated platform while a motorized HD camera arm captures viral 360-degree slow-motion videos rendered instantly with custom event graphics and music.",
    subhead: "Motorized 360 Camera Arm, VIP Red Carpet, Studio Lighting & Instant QR/SMS Video Sharing",
    details:
      "Every 360 video booth rental includes an elevated multi-guest platform, motorized rotating camera arm, LED studio ring lighting, VIP red carpet and stanchions, party props, custom event overlay design, instant QR code and SMS phone downloads, and a dedicated on-site booth attendant.",
    offers: [
      {
        name: "360 Slow-Motion Video Booth Platform Rental",
        description: "Turnkey 360 rotating camera booth with LED studio lighting, VIP stanchions, red carpet, custom event video overlays, instant QR/SMS sharing, and attendant.",
      },
    ],
    faqs: [
      {
        q: "How many guests can stand on the 360 video booth platform at once?",
        a: "Our commercial 360 video booth platform comfortably accommodates 3 to 5 guests at a time for group slow-motion videos.",
      },
      {
        q: "How do guests receive their 360 slow-motion videos?",
        a: "Videos are processed automatically within seconds with your custom event overlay and soundtrack, and guests download them immediately to their smartphones via QR code, SMS text, or email.",
      },
    ],
  },
  "/mirror-photo-booth-rental": {
    title: "Interactive Mirror Photo Booth Rental | Hudson NH, Portsmouth, Boston & NC",
    description:
      "Rent a full-length interactive magic mirror photobooth with touch-screen animations, custom prints, red carpet & attendant in NH, Boston MA, CT & NC.",
    keywords:
      "mirror photo booth rental, magic mirror photobooth rental, interactive mirror photo booth rental, mirror photo booth rental NH, portsmouth nh mirror photo booth rental, manchester nh photo booth rental, mirror photo booth rental Boston MA, mirror photo booth rental Charlotte NC, wedding mirror photo booth rental",
    image: `${SITE_URL}/photo-booth-experience-1.png`,
    canonicalPath: "/mirror-photo-booth-rental",
    serviceName: "Interactive Full-Length Mirror Photobooth Rentals",
    heading: "Interactive Full-Length Mirror Photo Booth Rentals in NH, MA, CT & NC",
    summary:
      "Book a full-length interactive mirror photo booth rental from Next Level Gaming Events & Novelties in Hudson NH, Portsmouth, Manchester, Nashua, Greater Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC). Guests pose in front of a giant touch-screen mirror featuring animated voice prompts, neon signature drawing on the glass, instant keepsake photo prints, and digital sharing.",
    subhead: "Full-Length Touch-Screen Magic Mirror, Custom Print Overlays, Red Carpet & Attendant",
    details:
      "Ideal for weddings, college formals, high school proms, and corporate galas, our mirror photobooth package includes an 8x8 ft red carpet setup, VIP stanchions, studio flash lighting, fun props, custom print templates, instant SMS/QR digital sharing, and a professional on-site attendant.",
    offers: [
      {
        name: "Full-Length Interactive Mirror Photobooth Rental Package",
        description: "Touch-screen magic mirror photobooth with custom photo strips, neon glass signing, props, red carpet, and on-site attendant.",
      },
    ],
    faqs: [
      {
        q: "What makes a mirror photo booth different from a traditional photo booth?",
        a: "Unlike enclosed box booths, the interactive mirror photobooth is a sleek, open-air full-length touch-screen mirror that lets large groups pose together, see full-body reflections, interact with animations, and sign their names directly on the mirror glass.",
      },
    ],
  },
  "/led-video-wall-rental": {
    title: "Mobile LED Video Wall & Daylight LED Screen Trailer Rental | NH, MA & NC",
    description:
      "Rent 14ft, 16ft & 20ft daylight-visible mobile LED video wall trailers with concert sound for daytime festivals, tailgates & watch parties in NH, MA & NC.",
    keywords:
      "mobile LED video wall rental, LED screen trailer rental, outdoor LED wall rental, daylight LED screen rental, mobile LED wall trailer NH, LED video wall rental Boston MA, mobile LED screen rental Charlotte NC, LED video wall rental Raleigh NC, tailgate LED screen trailer rental, jumbotron rental NH MA NC",
    image: `${SITE_URL}/movie-nights-led.jpg`,
    canonicalPath: "/led-video-wall-rental",
    serviceName: "Mobile LED Video Wall Trailer & Daylight Jumbotron Screen Rentals",
    heading: "Mobile LED Video Wall & Daylight LED Screen Trailer Rentals in NH, MA, CT & NC",
    summary:
      "Rent ultra-bright 14 ft, 16 ft, and 20 ft daylight-visible mobile LED video wall trailers from Next Level Gaming Events & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, Connecticut, New England, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC). Engineered for direct midday sunlight at campus tailgates, graduation ceremonies, municipal festivals, corporate outdoor events, and live sports watch parties.",
    subhead: "14 ft, 16 ft & 20 ft Daylight-Visible Mobile LED Video Wall Trailers with Concert Audio",
    details:
      "Our trailer-mounted mobile LED video walls deploy rapidly without requiring dark skies, delivering crystal-clear high-nit HD video in full afternoon sunshine. Includes live HDMI/SDI video switching, streaming & Blu-ray playback, concert-grade speaker arrays, FM radio transmitters, and an on-site LED engineer.",
    offers: [
      {
        name: "14 ft, 16 ft & 20 ft Mobile LED Video Wall Trailer Rental",
        description: "Daylight-visible outdoor mobile LED screen trailer with concert audio system and on-site video technician for daytime and evening events.",
      },
    ],
    faqs: [
      {
        q: "Can a mobile LED video wall be seen clearly in direct daytime sunlight?",
        a: "Yes! Our 14 ft, 16 ft, and 20 ft mobile LED video wall trailers use high-brightness outdoor LED panels specifically designed for vivid visibility in full daylight as well as at night.",
      },
    ],
  },
  "/inflatable-movie-screen-rental": {
    title: "Inflatable Movie Screen Rental (16ft–40ft Outdoor Cinema) | NH, MA & NC",
    description:
      "Rent giant 16ft, 21ft, 26ft & 40ft outdoor inflatable movie screens with HD projection, concert audio & FM drive-in transmitters in NH, Boston MA & NC.",
    keywords:
      "inflatable movie screen rental, outdoor movie screen rental, giant movie screen rental, drive-in movie screen rental, backyard movie screen rental, nh movie screen rental, inflatable movie screen rental NH, outdoor movie screen rental Boston MA, inflatable movie screen rental Charlotte NC, movie screen rental Raleigh NC",
    image: `${SITE_URL}/movie-nights-experience-1.png`,
    canonicalPath: "/inflatable-movie-screen-rental",
    serviceName: "Giant Outdoor Inflatable Movie Screen & Drive-In Cinema Rentals",
    heading: "Giant 16 ft to 40 ft Outdoor Inflatable Movie Screen Rentals in NH, MA, CT & NC",
    summary:
      "Turn any campus quad, town park, school field, or backyard into an open-air cinema with 16 ft, 21 ft, 26 ft, and 40 ft inflatable movie screen rentals from Next Level Gaming Events & Novelties across Hudson NH (03051), Manchester, Nashua, Portsmouth, Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "16 ft, 21 ft, 26 ft & Colossal 40 ft Air-Inflated Cinema Screens with Concert Sound",
    details:
      "Every inflatable movie night rental is 100% turnkey and includes commercial air-sealed or blower-inflated movie screens, high-lumen HD digital projection, concert-grade audio towers, optional FM radio transmitters for drive-in movies, and full setup and operation by our film crew.",
    offers: [
      {
        name: "16 ft & 21 ft Outdoor Inflatable Movie Screen Package",
        description: "Ideal for 75 ft to 100 ft viewing distances at schools, camps, and community parks, complete with HD projector, concert audio, and technician.",
      },
      {
        name: "26 ft & 40 ft Giant Drive-In & Campus Quad Inflatable Cinema Screen",
        description: "Massive 125 ft to 200 ft viewing distance outdoor movie screens with concert line-array audio and FM drive-in radio transmitter.",
      },
    ],
    faqs: [
      {
        q: "What sizes of inflatable movie screens do you rent?",
        a: "We rent 16 ft (75 ft viewing distance), 21 ft (100 ft viewing distance), 26 ft (125 ft viewing distance), and colossal 40 ft (200 ft viewing distance) outdoor inflatable movie screens.",
      },
    ],
  },
  "/vr-escape-room-rental": {
    title: "Mobile VR Escape Room & Beat Saber VR Station Rental | NH, MA & NC",
    description:
      "Rent 4-player cooperative mobile VR escape rooms & Beat Saber Virtual Reality gaming stations with HD spectator screens & attendants in NH, MA & NC.",
    keywords:
      "mobile VR escape room rental, VR escape room rental, Beat Saber party rental, virtual reality station rental, nh vr rental, VR party rental NH MA NC, college VR escape room event, corporate team building VR escape room Boston Charlotte Raleigh",
    image: `${SITE_URL}/vr-games/dragon-tower.png`,
    canonicalPath: "/vr-escape-room-rental",
    serviceName: "Mobile VR Escape Room & Beat Saber Virtual Reality Event Rentals",
    heading: "Mobile VR Escape Room & Beat Saber Virtual Reality Rentals in NH, MA, CT & NC",
    summary:
      "Challenge your guests with 4-player cooperative mobile VR escape rooms and room-scale Beat Saber VR gaming stations from Next Level Gaming Events & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "4-Player Cooperative VR Escape Adventures & Room-Scale VR Headsets with Spectator TVs",
    details:
      "Teams of up to 4 players enter the same virtual world together to solve puzzles and escape in Dragon Tower, Depths of Osiris, Manor Escape, and Time Travel Paradox—or compete individually in Beat Saber, SUPERHOT VR, Walkabout Mini Golf, Job Simulator, and Pistol Whip while crowds watch live on HD spectator monitors.",
    offers: [
      {
        name: "4-Player Cooperative Mobile VR Escape Room Package",
        description: "Multiplayer VR escape room setup with 4 synchronized headsets, HD spectator TVs, sanitary masks, and VR game master attendants.",
      },
    ],
    faqs: [
      {
        q: "How many people can play the mobile VR escape room together?",
        a: "Up to 4 players can join the same cooperative VR escape room simultaneously, seeing and talking to each other as avatars inside the virtual puzzle environment.",
      },
    ],
  },
  "/led-glow-swings-rental": {
    title: "LED Glow Swings, Glow Seesaws & Glow Mini Golf Rental | NH, MA & NC",
    description:
      "Rent 8 commercial LED illuminated glow swings on truss frames, 4 glowing seesaws & portable glow mini golf for events in Hudson NH, Boston MA & NC.",
    keywords:
      "LED glow swings rental, glow swings rental, illuminated seesaws rental, glow mini golf rental, LED furniture rental NH MA NC, glow party equipment rental, college glow night rentals Boston Charlotte Raleigh",
    image: `${SITE_URL}/glow-park-experience-1.jpg`,
    canonicalPath: "/led-glow-swings-rental",
    serviceName: "LED Illuminated Glow Swings, Glow Seesaws & Glowing Mini Golf Rentals",
    heading: "LED Illuminated Glow Swings, Seesaws & Glow Mini Golf Rentals in NH, MA, CT & NC",
    summary:
      "Rent 8 commercial LED illuminated glow swings suspended on truss frames, 4 multi-rider glowing seesaws, full-color venue uplighting, and an interactive glowing mini-golf course from Next Level Gaming Events & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "Commercial Truss-Mounted LED Glow Swings, Glowing Seesaws & Portable Glow Mini Golf",
    details:
      "Installed indoors inside darkened gymnasiums and student union ballrooms or outdoors on campus quads and festival lawns, our LED glow swings and glowing seesaws create an unforgettable neon playground and viral social photo attraction.",
    offers: [
      {
        name: "8 Commercial LED Glow Swings & 4 Illuminated Seesaws Rental",
        description: "Full truss-mounted LED swing set, 4 glowing seesaws, glowing mini golf course, and venue uplighting delivered and assembled by our crew.",
      },
    ],
    faqs: [
      {
        q: "How much space is needed for the 8 LED glow swings and 4 glow seesaws?",
        a: "Our commercial truss-mounted LED glow swings and seesaws can be configured flexibly for indoor gyms, ballrooms, or outdoor lawns, with full delivery and structural assembly handled by our crew.",
      },
    ],
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
      "Bring the viral Custom Trucker Hat Bar and Patched City custom patch hat & knit beanie maker workshop to your college campus, orientation, high school post-prom, corporate activation, or private party with Next Level Gaming Events & Novelties across Hudson NH (03051), Boston MA, Connecticut, New England, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "Hundreds of Trendy Iron-On Patches, Foam & Mesh Trucker Hats, Knit Beanies & On-Site Heat Presses",
    details:
      "Guests pick their favorite two-tone or solid trucker hat or winter knit beanie, browse hundreds of curated embroidered and chenille patches (letters, campus themes, retro icons, pop culture, and custom logos), and watch our crew heat-press their custom creation on the spot in seconds.",
    offers: [
      {
        name: "(Patched City) Custom Patch Trucker Hats & Knit Beanies Station",
        description: "Turnkey on-site hat bar with commercial hat heat presses, hundreds of iron-on patches, trucker hats, knit beanies, and event staff.",
      },
      {
        name: "Custom Graphic & Logo Trucker Hat Bar",
        description: "Personalized foam and mesh trucker hats printed and pressed on-site for up to 200+ guests per hour.",
      },
    ],
    faqs: [
      {
        q: "What is included in a Custom Trucker Hat Bar or Patched City rental?",
        a: "We supply all foam and mesh trucker hats, knit beanies, hundreds of iron-on embroidered patches, commercial hat heat presses, display racks, and on-site staff so every guest walks away with a custom hat.",
      },
    ],
  },
  "/custom-pillow-dolls-rental": {
    title: "Custom Photo Pillow Dolls & Reversible Sequin Pillows | NH, MA & NC",
    description:
      "Rent on-site Custom Photo Pillow Doll & Magic Reversible Sequin Pillow maker stations for college events, orientations & parties in NH, Boston MA & NC.",
    keywords:
      "custom photo pillow dolls, custom pillow dolls college event, reversible sequin pillows novelty rental, custom sequence pillows event station, make your own photo pillow event NH MA NC, college orientation novelty stations",
    image: `${SITE_URL}/novelty-cards/pillow-dolls.jpg`,
    canonicalPath: "/custom-pillow-dolls-rental",
    serviceName: "Custom Photo Pillow Dolls & Reversible Sequin Pillow Event Stations",
    heading: "Custom Photo Pillow Dolls & Magic Reversible Sequin Pillow Stations in NH, MA, CT & NC",
    summary:
      "Delight students and event guests with on-site Custom Photo Pillow Dolls and Custom Reversible Sequin (Sequence) Pillow maker stations from Next Level Gaming Events & Novelties across Hudson NH, Boston MA, Connecticut, New England, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "On-Site 3D Stuffed Photo Pillow Dolls & Brushable Magic Sequin Pillows",
    details:
      "Guests text or snap a photo of themselves, their friends, their pet, or a school mascot, and our on-site sublimation and stuffing crew transforms it into a hilarious 3D shaped Custom Photo Pillow Doll or a brushable Reversible Magic Sequin Pillow that reveals their photo with a swipe of the hand.",
    offers: [
      {
        name: "Custom Photo Pillow Dolls On-Site Maker Station",
        description: "Guests turn any photo of a person, pet, or mascot into a stuffed 3D custom pillow doll printed and stuffed on-site.",
      },
      {
        name: "Custom Reversible Sequin (Sequence) Pillows Station",
        description: "Brushable two-tone sequin throw pillows custom-printed on-site with guest photos or campus logos.",
      },
    ],
    faqs: [
      {
        q: "How fast are Custom Photo Pillow Dolls and Sequin Pillows made at an event?",
        a: "Guests simply submit their photo at the station, and our crew prints, heat-transfers, and stuffs their custom pillow doll or reversible sequin pillow on-site within minutes.",
      },
    ],
  },
  "/custom-keychains-rings-novelty": {
    title: "Laser-Engraved Keychains, Stamped Rings & License Plates | NH, MA & NC",
    description:
      "Book on-site Laser-Engraved Wood & Metal Keychains, Hammerless Stamped Custom Rings & Custom Novelty License Plate stations in NH, Boston MA & NC.",
    keywords:
      "laser engraved wood and metal keychains, stamped custom rings event novelty, hammerless ring press rental, custom novelty license plates event station, personalized keychain station college event, custom metal stamped rings NH MA NC",
    image: `${SITE_URL}/novelty-cards/wood-metal-keychains.jpg`,
    canonicalPath: "/custom-keychains-rings-novelty",
    serviceName: "Laser-Engraved Keychains, Stamped Custom Rings & Custom License Plate Stations",
    heading: "Laser-Engraved Keychains, Stamped Custom Rings & License Plate Novelties in NH, MA, CT & NC",
    summary:
      "Offer permanent personalized keepsakes with on-site Laser-Engraved Wood & Metal Keychains, Stamped Custom Rings using our quiet Hammerless Ring Press, and Custom Novelty License Plates from Next Level Gaming Events & Novelties across Hudson NH, Boston MA, Connecticut, New England, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "Precision Laser Engraving, Quiet Hammerless Ring Stamping & Aluminum Novelty License Plates",
    details:
      "Perfect for college student unions, welcome weeks, corporate trade shows, and proms: guests watch live precision laser engraving on natural wood and anodized metal keychains, stamp custom words or dates into wearable rings using our safe Hammerless Ring Press, or design full-color aluminum Custom Novelty License Plates.",
    offers: [
      {
        name: "Laser-Engraved Wood & Metal Keychains Station",
        description: "Live on-site laser engraving of names, logos, and messages onto wood and anodized metal keychains.",
      },
      {
        name: "Stamped Custom Rings (Hammerless Ring Press) Workshop",
        description: "Quiet, safe hammerless metal ring stamping station where guests personalize adjustable metal band rings.",
      },
      {
        name: "Custom Novelty Aluminum License Plates Station",
        description: "Full-color custom mini and standard aluminum novelty license plates printed on-site.",
      },
    ],
    faqs: [
      {
        q: "Is the Stamped Custom Rings station noisy for indoor venues?",
        a: "Not at all! We use a specialized Hammerless Ring Press that stamps letters cleanly into metal ring bands without loud hammering, making it ideal for indoor student centers, libraries, and corporate receptions.",
      },
    ],
  },
  "/custom-event-socks-bracelets": {
    title: "Custom Printed Event Socks, Bead-tastics & Silly Sacks | NH, MA & NC",
    description:
      "Rent on-site Custom Printed Event Socks, Bead-tastics Custom Bracelets, Intention Bracelets & Silly Sacks Plush Bag stations in NH, Boston MA & NC.",
    keywords:
      "custom printed event socks, custom socks novelty station, Bead-tastics custom bracelets, custom intention bracelets event, Silly Sacks custom plush bags, DIY plush backpack college event, college welcome week novelty rentals NH MA NC",
    image: `${SITE_URL}/novelty-cards/custom-socks.jpg`,
    canonicalPath: "/custom-event-socks-bracelets",
    serviceName: "Custom Printed Socks, Bead-tastics Bracelets, Intention Bracelets & Silly Sacks Stations",
    heading: "Custom Event Socks, Bead-tastics & Intention Bracelets & Silly Sacks Plush Bags in NH, MA & NC",
    summary:
      "Energize college welcome weeks, orientations, summer camps, and school events with on-site Custom Printed Crew Socks, Bead-tastics Custom Bracelets, Custom Intention Bracelets, and Silly Sacks Character Plush Bags from Next Level Gaming Events & Novelties across Hudson NH (03051), Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "On-Site Sublimated Crew Socks, Beaded & Intention Bracelets & Stuffed Character Plush Drawstring Bags",
    details:
      "Guests design and take home wearable custom crew socks printed on the spot, string colorful Bead-tastics charm bracelets and meaningful Intention Bracelets, or stuff their own adorable Silly Sacks plush character drawstring backpack.",
    offers: [
      {
        name: "Custom Printed Crew Socks On-Site Station",
        description: "Custom sublimated crew socks printed on-site with school colors, mascots, photos, or event graphics.",
      },
      {
        name: "Bead-tastics & Custom Intention Bracelets Workshop",
        description: "Hands-on beaded charm bracelet and stamped word-of-intention bracelet maker stations.",
      },
      {
        name: "Silly Sacks Custom Character Plush Bags Station",
        description: "Make-and-take stuffed plush character drawstring bags and backpacks for campuses, schools, and camps.",
      },
    ],
    faqs: [
      {
        q: "Can we combine Custom Socks, Bracelets, and Silly Sacks in a multi-station novelty event?",
        a: "Yes! Many colleges and schools bundle 2 to 4 novelty stations together for orientations, spring weekends, and post-prom lock-ins.",
      },
    ],
  },
  "/cms": {
    title: "Website CMS | Next Level Gaming & Novelties",
    description: "Admin content management dashboard for Next Level Gaming & Novelties.",
    canonicalPath: "/cms",
    noindex: true,
  },
};

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildRouteHtml(baseHtml, routeKey, seo) {
  const canonicalUrl = `${SITE_URL}${seo.canonicalPath}`;
  const imageUrl = seo.image || DEFAULT_IMAGE;
  const robots = seo.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  let html = baseHtml;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(seo.description)}"/>`
  );
  if (seo.keywords) {
    html = html.replace(
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="keywords" content="${escapeHtml(seo.keywords)}"/>`
    );
  }
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${robots}"/>`
  );
  html = html.replace(
    /<meta\s+name="thumbnail"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="thumbnail" content="${imageUrl}"/>`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}"/>`
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="en-us"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="en-us" href="${canonicalUrl}"/>`
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}"/>`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(seo.title)}"/>`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(seo.description)}"/>`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}"/>`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${imageUrl}"/>`
  );
  html = html.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:alt" content="${escapeHtml(seo.title)}"/>`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}"/>`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}"/>`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${imageUrl}"/>`
  );

  if (!seo.noindex) {
    const routeGraph = [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: seo.serviceName || seo.heading || seo.title.split("|")[0].trim(),
            item: canonicalUrl,
          },
        ],
      },
    ];
    if (seo.serviceName) {
      const serviceNode = {
        "@type": "Service",
        name: seo.serviceName,
        serviceType: seo.serviceName,
        description: seo.description,
        url: canonicalUrl,
        image: imageUrl,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "City", name: "Hudson, NH" },
          { "@type": "City", name: "Nashua, NH" },
          { "@type": "City", name: "Manchester, NH" },
          { "@type": "City", name: "Portsmouth, NH" },
          { "@type": "City", name: "Concord, NH" },
          { "@type": "City", name: "Salem, NH" },
          { "@type": "City", name: "Dover, NH" },
          { "@type": "City", name: "Boston, MA" },
          { "@type": "City", name: "Lowell, MA" },
          { "@type": "City", name: "Worcester, MA" },
          { "@type": "City", name: "Hartford, CT" },
          { "@type": "City", name: "New Haven, CT" },
          { "@type": "City", name: "Hamden, CT" },
          { "@type": "City", name: "Danbury, CT" },
          { "@type": "City", name: "Stamford, CT" },
          { "@type": "City", name: "Charlotte, NC" },
          { "@type": "City", name: "Raleigh, NC" },
          { "@type": "City", name: "Durham, NC" },
          { "@type": "City", name: "Chapel Hill, NC" },
          { "@type": "City", name: "Greensboro, NC" },
          { "@type": "City", name: "Winston-Salem, NC" },
          { "@type": "City", name: "New Bern, NC" },
          { "@type": "City", name: "Greenville, NC" },
          { "@type": "State", name: "New Hampshire" },
          { "@type": "State", name: "Massachusetts" },
          { "@type": "State", name: "North Carolina" },
          { "@type": "State", name: "Connecticut" },
          { "@type": "State", name: "Rhode Island" },
          { "@type": "State", name: "Maine" },
          { "@type": "State", name: "Vermont" },
        ],
      };

      if (seo.offers && seo.offers.length > 0) {
        serviceNode.hasOfferCatalog = {
          "@type": "OfferCatalog",
          name: `${seo.serviceName} — Packages & Products`,
          itemListElement: seo.offers.map((offer) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: offer.name,
              description: offer.description,
              url: canonicalUrl,
            },
          })),
        };
      }

      routeGraph.push(serviceNode);
    }

    if (seo.faqs && seo.faqs.length > 0) {
      // Remove homepage generic FAQ from baseHtml on subpages so the subpage has its own clean, relevant FAQ schema
      html = html.replace(/\{\s*"@type"\s*:\s*"FAQPage"[\s\S]*?\}\s*,\s*(?=\{\s*"@type"\s*:\s*"WebSite")/i, "");

      routeGraph.push({
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: seo.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      });
    }

    const routeSchemaTag = `<script id="seo-route-schema" type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@graph": routeGraph,
    })}</script>`;
    html = html.replace("</head>", `${routeSchemaTag}</head>`);
  }

  if (seo.heading && seo.summary) {
    const subheadBlock =
      seo.subhead && seo.details
        ? `<h2>${escapeHtml(seo.subhead)}</h2><p>${escapeHtml(seo.details)}</p>`
        : "";

    let offersHtml = "";
    if (seo.offers && seo.offers.length > 0) {
      offersHtml = `
      <section>
        <h2>Available Rental Packages &amp; Custom Event Products</h2>
        <ul>
          ${seo.offers
            .map(
              (o) =>
                `<li><strong>${escapeHtml(o.name)}:</strong> ${escapeHtml(o.description)}</li>`
            )
            .join("\n          ")}
        </ul>
      </section>`;
    }

    let faqHtml = "";
    if (seo.faqs && seo.faqs.length > 0) {
      faqHtml = `
      <section>
        <h2>Frequently Asked Questions</h2>
        <dl>
          ${seo.faqs
            .map(
              (f) =>
                `<dt style="font-weight:bold;margin-top:12px;">${escapeHtml(f.q)}</dt><dd style="margin-left:0;margin-top:4px;"><p>${escapeHtml(f.a)}</p></dd>`
            )
            .join("\n          ")}
        </dl>
      </section>`;
    }

    const relatedLinksHtml = `
      <section>
        <h2>Explore Party Equipment Rentals, Custom Novelties &amp; Regional Hubs</h2>
        <p>Next Level Gaming Events &amp; Novelties (Rebel Rd, Hudson, NH 03051 &amp; North Carolina) provides insured, full-service party equipment rentals and custom novelty workshops:</p>
        <ul>
          <li><a href="/novelties">Custom Event Novelties: All 11 DIY Maker Workshop Products</a></li>
          <li><a href="/custom-trucker-hat-bar-rental">Custom Trucker Hat Bar &amp; Patched City Hat &amp; Beanie Workshop Rental</a></li>
          <li><a href="/custom-pillow-dolls-rental">Custom Photo Pillow Dolls &amp; Reversible Sequin Pillows Station</a></li>
          <li><a href="/custom-keychains-rings-novelty">Laser-Engraved Wood &amp; Metal Keychains, Stamped Custom Rings &amp; License Plates</a></li>
          <li><a href="/custom-event-socks-bracelets">Custom Printed Event Socks, Bead-tastics, Intention Bracelets &amp; Silly Sacks</a></li>
          <li><a href="/movie-nights">Outdoor Movie Nights &amp; Mobile Cinema Rentals</a></li>
          <li><a href="/inflatable-movie-screen-rental">16–40 ft Giant Outdoor Inflatable Movie Screen Rentals</a></li>
          <li><a href="/led-video-wall-rental">14–20 ft Daylight Mobile LED Video Wall Trailer Rentals</a></li>
          <li><a href="/photo-booth">NH, MA &amp; NC Photo Booth Rentals</a></li>
          <li><a href="/360-video-booth">360 Slow-Motion Video Booth Platform Rentals</a></li>
          <li><a href="/mirror-photo-booth-rental">Interactive Full-Length Mirror Photobooth Rentals</a></li>
          <li><a href="/glow-park">Glow Park Experience Rentals</a></li>
          <li><a href="/led-glow-swings-rental">LED Illuminated Glow Swings, Glow Seesaws &amp; Glowing Mini Golf Rentals</a></li>
          <li><a href="/silent-disco">Three-Channel Silent Disco Wireless LED Headphone Rentals</a></li>
          <li><a href="/virtual-reality">Room-Scale Virtual Reality Event Stations</a></li>
          <li><a href="/vr-escape-room-rental">4-Player Cooperative Mobile VR Escape Room &amp; Beat Saber Rentals</a></li>
          <li><a href="/sim-racing">Force-Feedback Sim Racing Cockpit Simulator Rentals</a></li>
          <li><a href="/trivia-nights">Interactive Live-Hosted Trivia Nights &amp; Wireless Buzzer Game Show Rentals</a></li>
          <li><a href="/just-dance">Just Dance Giant-Screen Stage Party Rentals</a></li>
          <li><a href="/gaming-events">Live Gaming Events, Esports Tournaments &amp; Video Game Event Planning</a></li>
        </ul>
        <p>Regional branches: <a href="/new-hampshire-massachusetts-event-rentals">Hudson NH, New Hampshire, Massachusetts &amp; New England Event Rentals</a> (Hudson, Manchester, Nashua, Portsmouth, Boston, CT) and <a href="/north-carolina-event-rentals">North Carolina Event Rentals &amp; Birthday Parties</a> (Charlotte, Raleigh, Durham, Greensboro, New Bern) for <a href="/college-school-corporate-events">Colleges, Schools &amp; Corporate Events</a>.</p>
        <p>Trusted by 23+ universities and colleges including Harvard, Boston University, Penn State, Babson College, Quinnipiac University, Holy Cross, Springfield College, Emmanuel College, Bridgewater State University, Fisher College, Dean College, New England College, Framingham State, Connecticut College, Salve Regina, and Seton Hall.</p>
        <p>Ready to plan your event? <a href="/quote">Request a free custom quote online</a>, submit a <a href="/novelty-order">custom novelty order</a>, or call our booking office at <a href="tel:9786015473">978-601-5473</a>.</p>
      </section>`;

    const customMainHtml = `<main style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">
      <header>
        <img src="/logo.png" alt="Next Level Gaming and Novelties Event Rentals Logo" width="160" height="160" />
      </header>
      <section>
        <h1>${escapeHtml(seo.heading)}</h1>
        <img src="${imageUrl}" alt="${escapeHtml(seo.heading || seo.title)}" width="1200" height="630" loading="lazy" />
        <p><strong>${escapeHtml(seo.heading)}</strong> — ${escapeHtml(seo.summary)}</p>
        ${subheadBlock}
      </section>
      ${offersHtml}
      ${faqHtml}
      ${relatedLinksHtml}
    </main>`;

    html = html.replace(
      /<main\b[^>]*>[\s\S]*?<\/main>/i,
      customMainHtml
    );
  }

  return html;
}

function run() {
  const buildDir = path.resolve(__dirname, "..", "build");
  const indexHtmlPath = path.join(buildDir, "index.html");
  if (!fs.existsSync(indexHtmlPath)) {
    console.error("build/index.html not found. Run craco build first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, "utf8");
  let count = 0;

  for (const [routeKey, seo] of Object.entries(ROUTES)) {
    const cleanRoute = routeKey.replace(/^\/+/, "");
    const outHtml = buildRouteHtml(baseHtml, routeKey, seo);
    fs.writeFileSync(path.join(buildDir, `${cleanRoute}.html`), outHtml, "utf8");
    count++;
  }

  console.log(`Pre-rendered SEO HTML for ${count} routes in build/`);
}

run();

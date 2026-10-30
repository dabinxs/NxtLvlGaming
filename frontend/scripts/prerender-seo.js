const fs = require("fs");
const path = require("path");

const SITE_URL = "https://nextlevelgamingevents.com";
const DEFAULT_IMAGE = `${SITE_URL}/hero-bg.png`;

const ROUTES = {
  "/gaming-events": {
    title: "Live Gaming Events, Esports Rental & Video Game Event Planner | NH, MA & NC",
    description:
      "Turnkey live gaming events, esports rentals, and video game event planner with giant 12–40ft screens, PS5, Xbox, Switch & staff in NH, Boston MA & NC.",
    keywords:
      "gaming events, live gaming events, gaming event, video game event, video game events, video gaming events, video game events near me, video game event planner, esports rental, gaming events this weekend, next level gaming, next level fec attraction, video game tournaments, gaming event rental, gaming event planning, boston gaming events, gaming events Boston MA, college gaming events Boston, video game party rental Manchester NH, gaming events Hudson NH, video gaming event rental New Hampshire, gaming event rentals Charlotte NC, mobile video game party Raleigh NC, esports tournament production NH MA NC, Super Smash Bros tournament rental, Mario Kart event rental Boston MA Charlotte NC, eventos videojuegos, eventos gaming, eventos gamer",
    image: `${SITE_URL}/gaming-events-experience-1.png`,
    canonicalPath: "/gaming-events",
    serviceName: "Live Video Gaming Event Rentals & Esports Tournament Planning",
    heading: "Live Gaming Events & Video Game Tournament Rentals in NH, MA & NC",
    summary:
      "Next Level Gaming & Novelties is the premier video game event planner delivering turnkey live gaming events and bracketed esports tournament productions across Greater Boston and Massachusetts, Hudson, Nashua, Manchester, Salem, Derry, and Concord NH, New England, and our North Carolina branch in Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, and Winston-Salem NC.",
    subhead: "Deluxe, Ultimate & Esports Tournament Gaming Packages",
    details:
      "Choose from our Deluxe Package (four 12 ft HD gaming stations plus a giant 21 to 32 ft HD spectator screen), Ultimate Package (eight 12 ft HD screens plus a 26 ft jumbo screen and virtual smartphone DJ dance party), or full Esports Tournament Production with PlayStation 5, Xbox Series X, Nintendo Switch, and classic retro NES consoles. Popular games include Super Smash Bros. Ultimate, Mario Kart 8 Deluxe, EA Sports FC, Madden NFL, NBA 2K, Rocket League, Street Fighter, and Tekken.",
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
        q: "Can video gaming events be set up indoors or outdoors in NH, MA, and NC?",
        a: "Yes! Our giant screen gaming stations can be deployed indoors inside college student unions, gymnasiums, and hotel ballrooms, or outdoors under event tents or during evening festivals.",
      },
      {
        q: "What is included in an esports rental or video game tournament package?",
        a: "Our esports rental and tournament package includes four to eight 12 ft HD player stations, a 21 ft to 40 ft giant spectator championship screen, tournament bracket management, concert audio, all consoles and controllers, and full on-site crew staffing—providing a spacious, high-capacity alternative to a cramped video game truck rental.",
      },
    ],
  },
  "/movie-nights": {
    title: "Outdoor Movie Screen & Mobile LED Wall Rentals | NH, MA & NC",
    description:
      "Rent giant outdoor inflatable movie screens (16–40 ft) & daylight mobile LED video wall trailers with concert audio in NH, Boston MA & North Carolina.",
    keywords:
      "outdoor movie screen rental, inflatable movie screen rental, mobile LED video wall trailer rental, movie screen rental NH, outdoor movie rental Boston MA, inflatable movie screen rental Charlotte NC, movie screen rental Raleigh NC, drive-in movie screen rental, backyard movie night rental, event rentals NH",
    image: `${SITE_URL}/experience-movie-nights.png`,
    canonicalPath: "/movie-nights",
    serviceName: "Outdoor Inflatable Movie Screen & Mobile LED Video Wall Rentals",
    heading: "Outdoor Movie Screen & Mobile LED Video Wall Rentals in NH, MA & NC",
    summary:
      "Next Level Gaming & Novelties provides turnkey outdoor movie screen rentals and daylight mobile LED video wall trailers across Hudson NH, Nashua, Manchester, Greater Boston, Massachusetts, New England, and across North Carolina including Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, and Cary NC.",
    subhead: "16–40 ft Inflatable Cinema Screens & 14–20 ft Mobile LED Video Walls",
    details:
      "Select from 14 ft, 16 ft, and 20 ft daylight-visible mobile LED video wall trailers for daytime festivals, tailgates, and sports watch parties, or 16 ft, 21 ft, 26 ft, and 40 ft giant inflatable outdoor movie screens for campus quads, town parks, summer camps, and drive-in movie nights. Every rental includes HD projection or LED processing, concert-grade audio towers, FM radio broadcast transmitters, and on-site technicians.",
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
        a: "We deliver turnkey movie screen and LED trailer rentals across New Hampshire (Hudson, Manchester, Nashua, Concord), Massachusetts (Boston, Lowell, Worcester), and North Carolina (Charlotte, Raleigh, Durham, Greensboro, Winston-Salem).",
      },
    ],
  },
  "/trivia-nights": {
    title: "Interactive Trivia Night & Game Show Rentals | Next Level",
    description:
      "Book live-hosted interactive trivia nights for colleges, schools, and corporate events in NH, MA & North Carolina with digital buzzers and big screens.",
    keywords:
      "interactive trivia night rental NH, corporate trivia host Charlotte NC, college trivia night Raleigh Durham NC, live trivia host New Hampshire Massachusetts, corporate game show rental New England North Carolina, wireless buzzer game show rental",
    image: `${SITE_URL}/experience-trivia-nights.png`,
    canonicalPath: "/trivia-nights",
    serviceName: "Interactive Trivia Night & Game Show Event Rentals",
    heading: "Interactive Trivia Night & Game Show Rentals in NH, MA & NC",
    summary:
      "Bring live-hosted interactive trivia night and game show rentals to your college campus, corporate team-building event, school, or venue with Next Level Gaming & Novelties across Hudson NH, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC).",
    subhead: "Live Hosts, Digital Wireless Buzzers & Custom Big-Screen Question Categories",
    details:
      "Our turnkey trivia shows feature charismatic live hosts, professional sound systems, wireless handheld team buzzers or smartphone-based scoring, and giant projector or TV leaderboards with customized question sets tailored to your company, university, or theme.",
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
      "Rent room-scale Virtual Reality stations & 4-player cooperative VR escape rooms with spectator screens & staff in NH, Boston MA & North Carolina.",
    keywords:
      "virtual reality rental, VR event rental, VR party rental, virtual reality rental NH, virtual reality rental Boston MA, VR party rental Charlotte NC, mobile VR escape room rental, college VR entertainment, Beat Saber party rental",
    image: `${SITE_URL}/experience-virtual-reality.png`,
    canonicalPath: "/virtual-reality",
    serviceName: "Virtual Reality (VR) Event Stations & Mobile VR Escape Rooms",
    heading: "Virtual Reality & Mobile VR Escape Room Rentals in NH, MA & NC",
    summary:
      "Immerse attendees in cutting-edge room-scale Virtual Reality stations and 4-player cooperative VR escape rooms with Next Level Gaming & Novelties across Hudson NH, Greater Boston, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, Greensboro NC).",
    subhead: "Room-Scale VR Headsets, Spectator Displays & Co-op VR Escape Adventures",
    details:
      "Our VR event rentals feature motion-tracked headsets, live HD spectator monitors so crowds can watch the action, sanitary disposable masks, dedicated attendants, and fan-favorite VR games including Beat Saber, SUPERHOT VR, Job Simulator, Walkabout Mini Golf, Pistol Whip, Dragon Tower, Depths of Osiris, Manor Escape, and Time Travel Paradox.",
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
    title: "360 Photo Booth & Mirror Photobooth Rentals | NH, MA & NC",
    description:
      "Rent interactive mirror photo booths & 360 video booths with custom overlays, props & attendant in NH, Boston MA & North Carolina. Get a free quote!",
    keywords:
      "360 photo booth rental, photo booth rental, mirror photobooth rental, 360 video booth rental NH, photo booth rental Boston MA, 360 photo booth rental Charlotte NC, photo booth rental Raleigh NC, interactive photo booth, wedding photo booth rental, corporate photo booth rental",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "Interactive Photo Booth, 360 Video Booth & Mirror Photobooth Rentals",
    heading: "360 Photo Booth & Mirror Photobooth Rentals in NH, MA & NC",
    summary:
      "Capture and share unforgettable memories with interactive photo booth, 360 slow-motion video booth, and interactive full-length mirror photobooth rentals from Next Level Gaming & Novelties in Hudson NH, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC).",
    subhead: "Interactive Mirror Photo Booths & Slow-Motion 360 Video Platforms",
    details:
      "Every interactive photo booth, 360 video booth, and mirror photobooth package includes red carpet and VIP stanchions, professional LED studio ring lighting, custom event logos and overlays, party props, instant QR and SMS digital sharing, and a friendly on-site attendant for college formals, proms, corporate galas, and private celebrations.",
    faqs: [
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
      "Turn any campus center, school gymnasium, or event venue into an interactive dance floor with Just Dance giant screen event party rentals from Next Level Gaming & Novelties across Hudson NH, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, and Greensboro NC).",
    subhead: "Massive HD Projection Screens, Concert Audio & Multiplayer Dance Battles",
    details:
      "Guests step onto the dance floor, follow the choreography on 12 ft to 32 ft HD screens, and compete or dance together to chart-topping hits backed by concert-grade speakers, subwoofers, and dynamic party lighting.",
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
      "Rent tri-color LED wireless Silent Disco headphones with 3 channels for 50 to 5,000+ guests in NH, Boston MA & North Carolina. Free quote!",
    keywords:
      "silent disco rental, silent disco headphone rental, silent disco party rental, silent disco rental NH, silent disco rental Boston MA, silent disco rental Charlotte NC, silent disco rental Raleigh Durham NC, LED headphone party rental",
    image: `${SITE_URL}/experience-silent-disco.png`,
    canonicalPath: "/silent-disco",
    serviceName: "Silent Disco Wireless Headphone Party Rentals",
    heading: "Silent Disco Wireless Headphone Party Rentals in NH, MA & NC",
    summary:
      "Throw the loudest quiet party on campus or outdoors with Silent Disco LED wireless headphone party rentals from Next Level Gaming & Novelties in Hudson NH, Boston MA, New England, and across North Carolina including Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC.",
    subhead: "Three-Channel Tri-Color LED Wireless Headphones for 50 to 5,000+ Guests",
    details:
      "Guests switch between up to three live DJ or playlist channels right on their earcup, lighting up the room in red, green, or blue LED glow so everyone can see which song channel their friends are dancing to—all with zero noise complaints for late-night campus unions, outdoor quads, and high school post-proms.",
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
    title: "Sim Racing Cockpit Simulator Event Rentals | Next Level",
    description:
      "Rent force-feedback Sim Racing simulator cockpits with bucket seats, giant-screen telemetry, and lap leaderboards for events in NH, MA & North Carolina.",
    keywords:
      "sim racing rental NH MA, sim racing simulator rental Charlotte NC, racing simulator event rental Raleigh NC, racing simulator event rental New England North Carolina, force feedback racing cockpit rental",
    image: `${SITE_URL}/experience-sim-racing.png`,
    canonicalPath: "/sim-racing",
    serviceName: "Sim Racing Cockpit Simulator Event Rentals",
    heading: "Sim Racing Cockpit Simulator Event Rentals in NH, MA & NC",
    summary:
      "Bring motorsport excitement to your corporate activation, trade show, college event, or party with Sim Racing cockpit simulator rentals from Next Level Gaming & Novelties across Hudson NH, Massachusetts, New England, and our North Carolina branch in Charlotte, Concord, Raleigh, Durham, and Greensboro NC.",
    subhead: "Force-Feedback Racing Cockpits, Bucket Seats & Fastest-Lap Tournaments",
    details:
      "Our Sim Racing simulator cockpits pair force-feedback racing wheels and pedal sets with authentic racing bucket seats, high-definition displays, surround sound, and live fastest-lap leaderboards managed by our event crew.",
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
      "Rent the Glow Park Experience with illuminated LED glow swings, glowing seesaws, uplighting & glowing mini golf in NH, Boston MA & North Carolina.",
    keywords:
      "glow park rental, LED glow swings rental, illuminated seesaws rental, glow mini golf rental, glow party rental NH MA, glow swings rental Charlotte Raleigh NC",
    image: `${SITE_URL}/experience-glow-park.jpg`,
    canonicalPath: "/glow-park",
    serviceName: "Glow Park Experience — Illuminated Swings, Seesaws & Mini Golf Rentals",
    heading: "Glow Park Swings, Seesaws & Mini Golf Rental in NH, MA & NC",
    summary:
      "Transform indoor gyms, ballrooms, or outdoor campus quads with the full Glow Park Experience rental from Next Level Gaming & Novelties in Hudson NH, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC).",
    subhead: "Eight Illuminated LED Swings, Four Glow Seesaws & Glowing Mini Golf",
    details:
      "Our signature Glow Park package includes 8 commercial LED illuminated swings on truss frames, 4 glowing multi-rider seesaws, full-color venue uplighting, and an interactive glowing mini-golf course that turns any day or night event into a viral photo destination.",
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
    title: "Custom Event Novelties & Maker Workshops NH & NC | Next Level",
    description:
      "Book interactive custom novelty workshops in NH, MA & NC: Patched City trucker hats, beanies, socks, sequin pillows, pillow dolls, bracelets & keychains.",
    keywords:
      "custom event novelties rental, college novelty event ideas NH MA NC, custom trucker hat bar rental Charlotte Raleigh NC, Patched City hats, laser engraved keychains event, make your own stuffed animal college event, custom photo pillow dolls, reversible sequin pillows",
    image: `${SITE_URL}/novelties-bg.png`,
    canonicalPath: "/novelties",
    serviceName: "Custom Event Novelties & On-Site Maker Workshops",
    heading: "Custom Event Novelties & Maker Workshops in NH, MA & NC",
    summary:
      "Next Level Gaming & Novelties brings hands-on custom event novelties and interactive maker workshops to colleges, schools, summer camps, and corporate events across Hudson NH, New Hampshire, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC).",
    subhead: "Patched City Hats, Custom Socks, Pillow Dolls, Keychains & Plush Bags",
    details:
      "Attendees customize and take home personalized souvenirs on the spot: Patched City custom trucker hats and beanies with heat-pressed patches, custom printed crew socks, Bead-tastics and intention bracelets, custom photo pillow dolls, reversible sequin pillows, laser-engraved wood and metal keychains, hammerless stamped custom rings, Silly Sacks plush character bags, and custom novelty license plates.",
    faqs: [
      {
        q: "Do guests get to take home their novelty creations immediately?",
        a: "Yes! All novelties—including heat-pressed Patched City hats, laser-engraved keychains, and custom printed socks—are created and completed on-site during your event.",
      },
      {
        q: "How many items can your novelty workshop produce per hour?",
        a: "Depending on the station and staffing, our crew can produce 50 to over 200 custom souvenir items per hour.",
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
    title: "NH & MA Event Rentals & Party Entertainment | Hudson, Boston & Manchester",
    description:
      "Full-service event & party rentals across New Hampshire & Massachusetts: outdoor movie screens, 360 photo booths, video gaming, VR, silent disco & novelties.",
    keywords:
      "NH event rentals, Massachusetts event rentals, party rentals Manchester NH, party rentals Nashua NH, party rentals Hudson NH, Boston MA event rentals, corporate event rentals Boston, college event rentals New England, outdoor movie screen rental NH, 360 photo booth rental Boston",
    image: DEFAULT_IMAGE,
    canonicalPath: "/new-hampshire-massachusetts-event-rentals",
    serviceName: "New Hampshire & Massachusetts Interactive Event Rentals",
    heading: "NH & MA Event Rentals & Party Entertainment — Hudson, Manchester, Nashua & Boston",
    summary:
      "Headquartered in Hudson, New Hampshire (03051), Next Level Gaming & Novelties delivers turnkey party rentals, event entertainment, giant inflatable and mobile LED movie screens, 360 photo booths, video gaming tournaments, Virtual Reality stations, Silent Disco headphones, Sim Racing simulators, Glow Park LED swings, Trivia Nights, and custom novelty workshops across Hudson, Nashua, Manchester, Salem, Derry, Londonderry, Concord, Portsmouth NH, and Boston, Cambridge, Lowell, Worcester, and Springfield MA.",
    subhead: "Turnkey Event Entertainment Across New Hampshire, Massachusetts & New England",
    details:
      "For over ten years, our Hudson NH team has produced interactive campus, school, municipal, and corporate events across Southern and Central New Hampshire, Greater Boston, the Merrimack Valley, Central and Western Massachusetts, Rhode Island, Connecticut, Maine, and Vermont.",
    faqs: [
      {
        q: "Where is Next Level Gaming located in New Hampshire?",
        a: "We are headquartered in Hudson, NH (03051) and deliver interactive entertainment across Southern and Central New Hampshire, Greater Boston, and throughout New England.",
      },
      {
        q: "How far in advance should we reserve event rentals in NH or MA?",
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
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}"/>`
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
      routeGraph.push({
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
          { "@type": "City", name: "Boston, MA" },
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
      });
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
        <h2>Explore Turnkey Event Rentals &amp; Regional Hubs</h2>
        <p>Next Level Gaming &amp; Novelties provides insured, full-service interactive event entertainment across New England and North Carolina:</p>
        <ul>
          <li><a href="/gaming-events">Live Gaming Events, Esports Tournaments &amp; Video Game Event Planning</a></li>
          <li><a href="/movie-nights">Outdoor Inflatable Movie Screens &amp; Mobile LED Video Walls</a></li>
          <li><a href="/photo-booth">Interactive Photo Booths &amp; 360 Video Booths</a></li>
          <li><a href="/virtual-reality">Virtual Reality Stations &amp; Mobile VR Escape Rooms</a></li>
          <li><a href="/glow-park">Glow Park Illuminated Swings, Seesaws &amp; Mini Golf</a></li>
          <li><a href="/sim-racing">Force-Feedback Sim Racing Cockpit Simulators</a></li>
          <li><a href="/silent-disco">Three-Channel Silent Disco Wireless LED Headphones</a></li>
          <li><a href="/just-dance">Just Dance Giant-Screen Stage Parties</a></li>
          <li><a href="/trivia-nights">Interactive Live-Hosted Trivia Nights &amp; Game Shows</a></li>
          <li><a href="/novelties">Custom Event Novelties, Patched City Hats &amp; DIY Workshops</a></li>
        </ul>
        <p>Regional branches: <a href="/new-hampshire-massachusetts-event-rentals">New Hampshire &amp; Massachusetts Event Rentals</a> (Hudson, Manchester, Nashua, Boston) and <a href="/north-carolina-event-rentals">North Carolina Event Rentals &amp; Birthday Parties</a> (Charlotte, Raleigh, Durham, Greensboro, New Bern) for <a href="/college-school-corporate-events">Colleges, Schools &amp; Corporate Events</a>.</p>
        <p>Trusted by 23+ universities and colleges including Harvard, Boston University, Penn State, Babson College, Quinnipiac University, Holy Cross, Springfield College, Emmanuel College, Bridgewater State University, Fisher College, Dean College, New England College, Framingham State, Connecticut College, Salve Regina, and Seton Hall.</p>
        <p>Ready to plan your event? <a href="/quote">Request a free custom quote online</a>, submit a <a href="/novelty-order">custom novelty order</a>, or call our booking office at <a href="tel:9786015473">978-601-5473</a>.</p>
      </section>`;

    const customMainHtml = `<main style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">
      <header>
        <img src="/logo.png" alt="Next Level Gaming and Novelties Event Rentals Logo" width="160" height="160" />
      </header>
      <section>
        <h1>${escapeHtml(seo.heading)}</h1>
        <p><strong>${escapeHtml(seo.heading)}</strong> — ${escapeHtml(seo.summary)}</p>
        ${subheadBlock}
      </section>
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

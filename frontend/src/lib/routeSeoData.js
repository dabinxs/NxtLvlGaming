const SITE_URL = "https://nextlevelgamingevents.com";
const DEFAULT_IMAGE = `${SITE_URL}/hero-bg.jpg`;

const NH_CITY_LINKS = [
  { label: "Hudson NH Party Rentals (03051 HQ)", href: "/hudson-nh-party-rentals", tag: "Local HQ" },
  { label: "Manchester NH Event Rentals", href: "/manchester-nh-event-rentals", tag: "NH Hub" },
  { label: "Nashua NH Party Rentals", href: "/nashua-nh-event-rentals", tag: "NH Hub" },
  { label: "Portsmouth NH Photo Booth & Party Rentals", href: "/portsmouth-nh-photo-booth-party-rentals", tag: "Seacoast NH" },
  { label: "Concord, Salem & Derry NH Party Rentals", href: "/concord-salem-derry-nh-party-rentals", tag: "Statewide NH" },
];

const REGIONAL_LINKS = [
  { label: "NH, MA, CT & New England Event Rentals", href: "/new-hampshire-massachusetts-event-rentals", tag: "New England" },
  { label: "North Carolina Branch (Charlotte, Raleigh & Eastern NC)", href: "/north-carolina-event-rentals", tag: "NC Branch" },
  { label: "College, High School Post-Prom & Corporate Events", href: "/college-school-corporate-events", tag: "Campus & Corp" },
];

const SPECIALTY_LINKS = [
  { label: "Live Gaming Events & Esports Rentals", href: "/gaming-events" },
  { label: "Outdoor Movie Nights", href: "/movie-nights" },
  { label: "16–40 ft Inflatable Movie Screens", href: "/inflatable-movie-screen-rental" },
  { label: "14–20 ft Mobile LED Video Walls", href: "/led-video-wall-rental" },
  { label: "NH & Seacoast Photo Booth Rentals", href: "/photo-booth" },
  { label: "360 Slow-Motion Video Booth", href: "/360-video-booth" },
  { label: "Interactive Mirror Photo Booth", href: "/mirror-photo-booth-rental" },
  { label: "Virtual Reality & VR Event Games", href: "/virtual-reality" },
  { label: "4-Player Mobile VR Escape Rooms", href: "/vr-escape-room-rental" },
  { label: "Sim Racing Cockpit Simulators", href: "/sim-racing" },
  { label: "Glow Park Experience", href: "/glow-park" },
  { label: "LED Glow Swings & Seesaws", href: "/led-glow-swings-rental" },
  { label: "3-Channel Silent Disco Headphones", href: "/silent-disco" },
  { label: "Interactive Live Trivia Nights", href: "/trivia-nights" },
  { label: "Just Dance Giant-Screen Parties", href: "/just-dance" },
  { label: "All 11 Custom Event Novelties", href: "/novelties" },
  { label: "Custom Trucker Hat Bar & Patched City", href: "/custom-trucker-hat-bar-rental" },
  { label: "Custom Photo Pillow Dolls & Sequin Pillows", href: "/custom-pillow-dolls-rental" },
  { label: "Laser Keychains, Stamped Rings & Plates", href: "/custom-keychains-rings-novelty" },
  { label: "Custom Event Socks, Bracelets & Silly Sacks", href: "/custom-event-socks-bracelets" },
];

const ALL_NH_LINKS_EXCEPT = (currentPath) =>
  [...NH_CITY_LINKS, ...REGIONAL_LINKS].filter((item) => item.href !== currentPath);

const ROUTE_SEO = {
  "/": {
    title: "Event & Party Rentals NH, MA & NC | Next Level Gaming",
    description:
      "Turnkey event & party rentals in NH, Boston MA & NC: giant outdoor movie screens, 360 photo booths, live gaming events, VR, silent disco, glow park & novelties.",
    keywords:
      "event rentals, party rentals, party equipment rentals, event rentals NH, nh party rentals, photo booth rental new hampshire, photo booth nh, nh photo booth rental, portsmouth photo booth rental, portsmouth nh photo booth rental, nh movie screen rental, party rentals Manchester NH, party rentals Nashua NH, party rentals Hudson NH, Boston event rentals, event rentals North Carolina, party rentals Charlotte NC, Raleigh event rentals, esports rental, esports rental company, bulk esports rental, event planning equipment for gamers, party planning equipment for gamers, real life gaming experience, video gaming competition production, video gaming tournament event management, video game tournament event production, video game event management, outdoor movie screen rental, inflatable movie screen rental, mobile LED video wall rental, 360 photo booth rental, mirror photo booth rental, photo booth rental NH MA NC, silent disco rental, virtual reality event rental, virtual reality near me, vr arcade near me, vr arena near me, vr gaming near me, vr event games, VR escape room rental, rent racing simulator near me, sim racing simulator rental, glow swings rental, glow park rental, live gaming events, video game event planner, video game tournaments, gaming competitions near me, college event entertainment, corporate event entertainment, novelties, Next Level Gaming, Nxt Level Gaming",
    image: `${SITE_URL}/hero-bg.jpg`,
    preloadImage: "/hero-starfield-bg.webp",
    canonicalPath: "/",
    heroEyebrow: "HUDSON, NH (03051) · NEW ENGLAND · NORTH CAROLINA",
    serviceName: "Turnkey Event & Party Equipment Rentals, Photo Booths, Gaming & Custom Novelties",
    heading: "Event & Party Rentals, Interactive Entertainment & Gaming Events in NH, MA & NC",
    summary:
      "Next Level Gaming & Novelties is a full-service party equipment rental company headquartered on Rebel Rd in Hudson, New Hampshire (03051) with a regional branch serving North Carolina. Our insured crew delivers, sets up, and staffs giant outdoor inflatable movie screens, daylight mobile LED video walls, 360 video and interactive mirror photo booths, live gaming events and esports tournament production, room-scale Virtual Reality stations, Silent Disco wireless headphones, Sim Racing simulators, Glow Park LED swings, live Trivia Nights, and 11 custom novelty workshops.",
    subhead: "Serving Hudson, Manchester, Nashua, Portsmouth NH, Greater Boston, CT & North Carolina",
    details:
      "Trusted by 23+ universities and colleges, high school post-proms, municipal festivals, corporate teams, and private celebrations across Hudson, Nashua, Manchester, Portsmouth, Salem, Derry, and Concord NH, Greater Boston and Massachusetts, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, and New Bern NC).",
    highlights: [
      "Headquartered on Rebel Rd, Hudson NH (03051) + North Carolina Regional Branch",
      "360 Slow-Motion Video Booths & Full-Length Magic Mirror Photo Booths",
      "16–40 ft Inflatable Movie Screens & 14–20 ft Daylight Mobile LED Video Walls",
      "Room-Scale VR Arcades, 4-Player VR Escape Rooms & Force-Feedback Sim Racing",
      "Turnkey Live Gaming Events, Bulk Esports Rentals & Tournament Production",
      "11 On-Site Make-and-Take Novelty Stations (Trucker Hats, Pillow Dolls, Socks & More)",
    ],
    relatedLinks: [
      ...NH_CITY_LINKS,
      { label: "Photo Booth NH & 360 Booths", href: "/photo-booth" },
      { label: "Outdoor Movie Screens & LED Walls", href: "/movie-nights" },
      { label: "Live Gaming Events & Esports", href: "/gaming-events" },
      { label: "Virtual Reality & VR Escape Rooms", href: "/virtual-reality" },
      { label: "Sim Racing Cockpit Simulators", href: "/sim-racing" },
      { label: "Custom Event Novelties (All 11)", href: "/novelties" },
    ],
    faqs: [
      {
        q: "Where can I rent video gaming events, photo booths, outdoor movie screens, and event entertainment in NH, MA, and North Carolina?",
        a: "Next Level Gaming & Novelties is headquartered on Rebel Rd in Hudson, New Hampshire (03051) with a regional branch serving North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, Winston-Salem, Cary, Wilmington, New Bern, and Asheville). We deliver turnkey gaming events, outdoor inflatable and mobile LED movie screens, VR stations, 360 and mirror photo booths, silent disco, sim racing, glow parks, trivia nights, and custom event novelties across NH, MA, CT, New England, and North Carolina.",
      },
      {
        q: "What is included in a Next Level Gaming & Novelties event rental package?",
        a: "Every rental is 100% turnkey, commercially insured, and staffed by our event crew. We handle transportation, heavy commercial setup, live technical operation or hosting, custom overlays/graphics where applicable, and complete teardown after your event.",
      },
      {
        q: "What sizes of outdoor movie screens and LED video walls can I rent?",
        a: "We rent both daylight-visible Mobile LED Video Wall Trailers (14 ft, 16 ft, and 20 ft screens) and giant Outdoor Inflatable Movie Screens (16 ft, 21 ft, 26 ft, and 40 ft drive-in screens), complete with HD projection or LED processing, concert-grade audio towers, and FM drive-in radio transmitters.",
      },
      {
        q: "Do you provide photo booth rentals in Portsmouth, Manchester, Nashua, and Hudson, NH?",
        a: "Yes! Our crew regularly delivers 360 slow-motion video booths and full-length interactive mirror photo booths with VIP red carpets, stanchions, studio LED lighting, props, custom overlays, and instant QR/SMS sharing across Portsmouth, Dover, Exeter, Hampton, Manchester, Nashua, Hudson, Concord, Salem, and Derry, NH.",
      },
      {
        q: "What custom event novelties and interactive maker workshops do you offer?",
        a: "Our 11 on-site DIY novelty stations include Patched City custom trucker hats and beanies, custom trucker hats, custom printed socks, Bead-tastics and intention bracelets, custom photo pillow dolls, reversible sequin pillows, laser-engraved wood and metal keychains, hammerless stamped custom rings, Silly Sacks character plush bags, and personalized novelty license plates.",
      },
    ],
  },
  "/gaming-events": {
    title: "Video Game Event Production & Gaming Rentals | Next Level",
    description:
      "Next Level FEC attraction & live gaming events: video game convention management, tournament production & event planning equipment for gamers. NH/MA/NC.",
    keywords:
      "gaming events, real life gaming experience, live gaming events, gaming event, video game event, video game events, video gaming events, video game events near me, esports tournaments near me, esports screening, video game event planner, video game event management, video game convention management, video gaming tournament event management, video gaming competition production, video game tournament event production, esports rental company, bulk esports rental, event planning equipment for gamers, party planning equipment for gamers, esports rental, next level gaming ct, new england gaming, gaming events this weekend, next level gaming, nxt level gaming, next level fec attraction, video game tournaments, gaming event rental, gaming event planning, boston gaming events, gaming events Boston MA, college gaming events Boston, video game party rental Manchester NH, gaming events Hudson NH, gaming events Portsmouth NH, video gaming event rental New Hampshire, Connecticut gaming events, gaming event rentals Charlotte NC, mobile video game party Raleigh NC, esports tournament production NH MA CT NC, Super Smash Bros tournament rental, Mario Kart event rental Boston MA Charlotte NC",
    image: `${SITE_URL}/gaming-events-experience-1.jpg`,
    preloadImage: "/gaming-events-experience-1.jpg",
    canonicalPath: "/gaming-events",
    heroEyebrow: "ESPORTS RENTAL COMPANY & TOURNAMENT PRODUCTION · NH, MA, CT & NC",
    heroDisplayTitle: "VIDEO GAME EVENT PRODUCTION & LIVE GAMING",
    serviceName: "Live Video Gaming Event Rentals, Esports Rental Company & Video Gaming Competition Production",
    heading: "Live Gaming Events, Esports Rental Company & Video Game Tournament Production in NH, MA, CT & NC",
    summary:
      "Next Level Gaming & Novelties (Nxt Level Gaming) is a leading New England and North Carolina esports rental company and video game event planner delivering turnkey live gaming events, bulk esports rentals, event & party planning equipment for gamers, and FEC-scale interactive attractions across Hudson, Nashua, Manchester, Portsmouth, and Concord NH, Greater Boston and Massachusetts, Connecticut (Hartford, New Haven, Hamden, Danbury, Stamford, New London CT), and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "Full-Scale Video Gaming Tournament Event Production, Consoles & 12–40 ft Jumbo Screens",
    details:
      "From Deluxe four-screen lounges to Ultimate eight-screen arenas and full Bulk Esports Tournament Event Production with PlayStation 5, Xbox Series X, Nintendo Switch, and classic retro NES consoles, our crew brings every controller, bracket, concert speaker, and 12 ft to 40 ft HD spectator screen needed for a real-life gaming experience.",
    highlights: [
      "Complete event & party planning equipment for gamers — 16 to 64+ simultaneous players",
      "Full video gaming tournament event production & bracket management",
      "Bulk esports rental packages for campuses, arenas & FEC-scale activations",
      "PlayStation 5, Xbox Series X, Nintendo Switch & classic retro NES library",
      "Serving Hudson NH, Manchester, Boston, Connecticut (CT) & North Carolina",
    ],
    relatedLinks: [
      { label: "Virtual Reality & VR Arena Stations", href: "/virtual-reality" },
      { label: "Force-Feedback Sim Racing Cockpits", href: "/sim-racing" },
      { label: "Just Dance Giant-Screen Parties", href: "/just-dance" },
      { label: "Interactive Trivia Game Shows", href: "/trivia-nights" },
      { label: "NH, MA & CT Event Rentals", href: "/new-hampshire-massachusetts-event-rentals" },
      { label: "North Carolina Event Rentals", href: "/north-carolina-event-rentals" },
    ],
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
      {
        name: "Video Game Convention Management & Esports Screening Production",
        description: "Full-scale video game convention management, multi-station console zones, live esports screening displays, and party planning equipment for gamers across NH, MA, CT, and NC.",
      },
    ],
    faqs: [
      {
        q: "How many players can participate at once in a Next Level live gaming event?",
        a: "Our setups accommodate from 16 to over 64 simultaneous players, with hundreds of spectators watching live matches on giant 21 ft to 40 ft jumbo projection or LED screens. We tailor station counts to your crowd size and venue.",
      },
      {
        q: "What is included in your bulk esports rental and video game tournament event production?",
        a: "Every video game tournament event production package includes four to eight 12 ft HD player stations, a 21 ft to 40 ft giant spectator championship screen, PlayStation 5, Xbox Series X, Nintendo Switch, and retro NES consoles, controllers, tournament bracket management, concert audio, and full on-site video game event management crew.",
      },
      {
        q: "Do you provide party planning equipment for gamers and real-life gaming experiences for private parties and campuses?",
        a: "Yes! Our crew supplies complete party planning equipment for gamers—creating a spacious, high-capacity real-life gaming experience inside college student unions, high school gyms, corporate venues, and private events without squeezing guests into a cramped game truck.",
      },
      {
        q: "Do you host gaming events in Connecticut (CT), Massachusetts, New Hampshire, and North Carolina?",
        a: "Yes! From our Hudson, NH (03051) base and our North Carolina branch, we produce live gaming events and esports tournaments across NH, Boston MA, Connecticut (Hartford, New Haven, Hamden, Danbury, Stamford, New London), Rhode Island, and NC (Charlotte, Raleigh, Durham, Greensboro).",
      },
    ],
  },
  "/movie-nights": {
    title: "Outdoor Movie Screen & LED Video Wall Rentals | NH & NC",
    description:
      "Rent giant outdoor inflatable movie screens (16–40 ft) & daylight mobile LED video wall trailers in Hudson NH, Manchester, Portsmouth, Boston MA & NC.",
    keywords:
      "nh movie screen rental, outdoor movie screen rental, inflatable movie screen rental, mobile LED video wall trailer rental, movie screen rental NH, hudson nh movie screen rental, manchester nh movie screen rental, portsmouth nh movie screen rental, outdoor movie rental Boston MA, inflatable movie screen rental Charlotte NC, movie screen rental Raleigh NC, drive-in movie screen rental, backyard movie night rental, event rentals NH",
    image: `${SITE_URL}/experience-movie-nights.jpg`,
    canonicalPath: "/movie-nights",
    heroEyebrow: "NH MOVIE SCREEN RENTALS & MOBILE LED TRAILERS · NH, MA, CT & NC",
    heroDisplayTitle: "OUTDOOR MOVIE SCREEN & LED WALL RENTALS",
    serviceName: "Outdoor Inflatable Movie Screen & Mobile LED Video Wall Rentals",
    heading: "Outdoor Movie Screen & Mobile LED Video Wall Rentals in NH, MA & NC",
    summary:
      "Rent giant outdoor inflatable movie screens (16 ft, 21 ft, 26 ft, and 40 ft) and daylight-visible mobile LED video wall trailers (14 ft, 16 ft, and 20 ft) from Next Level Gaming & Novelties across Hudson NH, Nashua, Manchester, Portsmouth, Concord, Greater Boston, Massachusetts, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, Greensboro NC).",
    subhead: "16–40 ft Inflatable Cinema Screens & 14–20 ft Daylight Mobile LED Video Walls",
    details:
      "Whether you are planning a daytime tailgate or commencement screen rental with a high-nit Mobile LED Trailer or an under-the-stars campus or backyard movie night with a giant Inflatable Screen and FM drive-in radio transmitter, every rental includes concert-grade audio and full crew operation.",
    highlights: [
      "Daylight-visible 14 ft, 16 ft & 20 ft Mobile LED Video Wall Trailers",
      "Evening & Drive-In 16 ft, 21 ft, 26 ft & 40 ft Outdoor Inflatable Screens",
      "Concert-grade dual audio towers + FM radio car stereo broadcast transmitters",
      "Video playback & licensing guidance for schools, towns & colleges",
      "Local NH Movie Screen delivery in Hudson, Manchester, Nashua, Portsmouth & NC",
    ],
    relatedLinks: [
      { label: "14–20 ft Mobile LED Video Wall Trailers", href: "/led-video-wall-rental" },
      { label: "16–40 ft Inflatable Movie Screen Rentals", href: "/inflatable-movie-screen-rental" },
      { label: "Silent Disco Drive-In Headphone Option", href: "/silent-disco" },
      { label: "Live Video Gaming Big-Screen Setups", href: "/gaming-events" },
      { label: "Hudson NH Party Rentals (03051)", href: "/hudson-nh-party-rentals" },
      { label: "Portsmouth NH & Seacoast Rentals", href: "/portsmouth-nh-photo-booth-party-rentals" },
    ],
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
        a: "Our 16 ft inflatable screen offers a 75 ft viewing distance for medium gatherings; the 21 ft screen supports up to 125 ft; the 26 ft screen reaches 200 ft for large campus quads and parks; and our colossal 40 ft cinema screen is built for full drive-ins and city festivals.",
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
  "/led-video-wall-rental": {
    title: "Mobile LED Video Wall Trailer Rentals | NH, MA & NC",
    description:
      "Rent 14ft, 16ft & 20ft daylight-visible mobile LED video wall trailers with concert sound for daytime festivals, tailgates & watch parties in NH, MA & NC.",
    keywords:
      "mobile LED video wall rental, LED screen trailer rental, outdoor LED wall rental, daylight LED screen rental, mobile LED wall trailer NH, LED video wall rental Boston MA, mobile LED screen rental Charlotte NC, LED video wall rental Raleigh NC, tailgate LED screen trailer rental, jumbotron rental NH MA NC",
    image: `${SITE_URL}/movie-nights-led.jpg`,
    canonicalPath: "/movie-nights",
    heroEyebrow: "DAYLIGHT-VISIBLE 14 FT, 16 FT & 20 FT JUMBOTRON TRAILERS",
    heroDisplayTitle: "MOBILE LED VIDEO WALL TRAILER RENTALS",
    heroSubtitleOverride:
      "Ultra-bright 14 ft, 16 ft, and 20 ft daylight mobile LED screen trailers for midday outdoor festivals, college tailgates, graduation ceremonies, and live sports watch parties across NH, MA, CT & NC.",
    serviceName: "Mobile LED Video Wall Trailer & Daylight Jumbotron Screen Rentals",
    heading: "Mobile LED Video Wall & Daylight LED Screen Trailer Rentals in NH, MA, CT & NC",
    summary:
      "Rent ultra-bright 14 ft, 16 ft, and 20 ft daylight-visible mobile LED video wall trailers from Next Level Gaming Events & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, Connecticut, New England, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "Built for Direct Midday Sunlight — Zero Darkness Required",
    details:
      "Our hydraulic trailer-mounted mobile LED video walls deploy quickly at parks, stadiums, campuses, and street festivals—complete with live HDMI/SDI video switching, streaming playback, concert audio towers, and an on-site LED engineer.",
    highlights: [
      "Available in 14 ft, 16 ft, and 20 ft high-brightness daylight LED panels",
      "Visible in direct afternoon sunshine — no waiting until sunset",
      "Live HDMI/SDI camera feeds, sports streaming & sponsor looping graphics",
      "Includes concert-grade outdoor PA speakers & FM drive-in transmission",
    ],
    relatedLinks: [
      { label: "All Outdoor Movie & Cinema Options", href: "/movie-nights" },
      { label: "16–40 ft Inflatable Movie Screens", href: "/inflatable-movie-screen-rental" },
      { label: "Live Gaming Tournament Big Screens", href: "/gaming-events" },
      { label: "Hudson NH Party Rentals", href: "/hudson-nh-party-rentals" },
      { label: "Manchester NH Event Rentals", href: "/manchester-nh-event-rentals" },
      { label: "North Carolina Event Rentals", href: "/north-carolina-event-rentals" },
    ],
    offers: [
      {
        name: "14 ft, 16 ft & 20 ft Mobile LED Video Wall Trailer Rental",
        description: "Daylight-visible outdoor mobile LED screen trailer with concert audio system and on-site video technician for daytime and evening events.",
      },
    ],
    faqs: [
      {
        q: "Can a mobile LED video wall be seen clearly in direct daytime sunlight?",
        a: "Yes! Our 14 ft, 16 ft, and 20 ft mobile LED video wall trailers use high-nit outdoor LED panels specifically engineered for crisp, vivid visibility in full afternoon sunshine as well as at night.",
      },
      {
        q: "How fast does the mobile LED screen trailer set up on event day?",
        a: "Our hydraulic mobile LED trailers position and elevate cleanly without bulky truss rigging, making them ideal for tight festival schedules, tailgates, races, and graduation commencements.",
      },
    ],
  },
  "/inflatable-movie-screen-rental": {
    title: "Inflatable Movie Screen Rental (16–40 ft) | NH, MA & NC",
    description:
      "Rent giant 16ft, 21ft, 26ft & 40ft outdoor inflatable movie screens with HD projection, concert audio & FM drive-in transmitters in NH, Boston MA & NC.",
    keywords:
      "inflatable movie screen rental, outdoor movie screen rental, giant movie screen rental, drive-in movie screen rental, backyard movie screen rental, nh movie screen rental, inflatable movie screen rental NH, outdoor movie screen rental Boston MA, inflatable movie screen rental Charlotte NC, movie screen rental Raleigh NC",
    image: `${SITE_URL}/movie-nights-experience-1.jpg`,
    canonicalPath: "/movie-nights",
    heroEyebrow: "GIANT 16 FT, 21 FT, 26 FT & 40 FT DRIVE-IN CINEMA SCREENS",
    heroDisplayTitle: "GIANT INFLATABLE MOVIE SCREEN RENTALS",
    heroSubtitleOverride:
      "Turn any campus quad, town park, school field, or backyard into an open-air movie theater with 16 ft to 40 ft inflatable cinema screens, HD projection, concert sound, and FM drive-in transmitters.",
    serviceName: "Giant Outdoor Inflatable Movie Screen & Drive-In Cinema Rentals",
    heading: "Giant 16 ft to 40 ft Outdoor Inflatable Movie Screen Rentals in NH, MA, CT & NC",
    summary:
      "Turn any campus quad, town park, school field, or backyard into an open-air cinema with 16 ft, 21 ft, 26 ft, and 40 ft inflatable movie screen rentals from Next Level Gaming Events & Novelties across Hudson NH (03051), Manchester, Nashua, Portsmouth, Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "16 ft, 21 ft, 26 ft & Colossal 40 ft Air-Inflated Cinema Screens with Concert Sound",
    details:
      "Every inflatable movie night rental is 100% turnkey and includes commercial movie screens, high-lumen HD digital projection, concert-grade audio towers, optional FM radio transmitters for drive-in movies, and full setup and operation by our projection crew.",
    highlights: [
      "16 ft (75 ft view), 21 ft (125 ft view), 26 ft (200 ft view) & 40 ft Drive-In Screens",
      "High-lumen HD laser/digital projection with crisp nighttime contrast",
      "Concert sound towers + FM car radio transmitter for drive-in seating",
      "Full setup, anchoring, licensing guidance & teardown across NH, MA, CT & NC",
    ],
    relatedLinks: [
      { label: "All Outdoor Movie & Cinema Options", href: "/movie-nights" },
      { label: "Daylight Mobile LED Video Walls", href: "/led-video-wall-rental" },
      { label: "Silent Disco Quiet Movie Screening", href: "/silent-disco" },
      { label: "Nashua NH Event Rentals", href: "/nashua-nh-event-rentals" },
      { label: "Concord, Salem & Derry NH Rentals", href: "/concord-salem-derry-nh-party-rentals" },
    ],
    offers: [
      {
        name: "16 ft & 21 ft Outdoor Inflatable Movie Screen Package",
        description: "Ideal for backyards, HOAs, schools, camps, and community parks, complete with HD projector, concert audio, and technician.",
      },
      {
        name: "26 ft & 40 ft Giant Drive-In & Campus Quad Inflatable Cinema Screen",
        description: "Massive stadium-scale outdoor movie screens with concert line-array audio and FM drive-in radio transmitter.",
      },
    ],
    faqs: [
      {
        q: "What sizes of inflatable movie screens do you rent?",
        a: "We rent 16 ft (up to 75 ft viewing distance), 21 ft (up to 125 ft viewing distance), 26 ft (up to 200 ft viewing distance), and colossal 40 ft drive-in outdoor inflatable movie screens.",
      },
      {
        q: "Does the inflatable movie screen rental include a projector, sound system, and operator?",
        a: "Yes! Every rental is 100% turnkey with commercial blower/frame, HD projector, media playback deck, concert speakers, optional FM drive-in transmitter, and an on-site crew member from setup through breakdown.",
      },
    ],
  },
  "/trivia-nights": {
    title: "Interactive Trivia Night & Game Show Rentals | NH, MA & NC",
    description:
      "Book live-hosted interactive trivia nights & wireless buzzer game show rentals for colleges, schools & corporate events in Hudson NH, Boston MA & NC.",
    keywords:
      "nh trivia night rental, interactive trivia night rental NH, game show rental NH MA NC, corporate trivia host Charlotte NC, college trivia night Raleigh Durham NC, live trivia host New Hampshire Massachusetts, corporate game show rental New England North Carolina, wireless buzzer game show rental",
    image: `${SITE_URL}/experience-trivia-nights.jpg`,
    canonicalPath: "/trivia-nights",
    heroEyebrow: "LIVE GAME SHOW HOST · WIRELESS BUZZERS · BIG-SCREEN LEADERBOARDS",
    heroDisplayTitle: "INTERACTIVE TRIVIA NIGHT & GAME SHOW RENTALS",
    serviceName: "Interactive Trivia Night & Game Show Event Rentals",
    heading: "Interactive Trivia Night & Game Show Rentals in NH, MA & NC",
    summary:
      "Bring live-hosted interactive trivia night and wireless buzzer game show rentals to your college campus, corporate team-building event, school, or venue with Next Level Gaming & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, Greensboro NC).",
    subhead: "Charismatic Live Hosts, Digital Wireless Buzzers & Giant-Screen Scoring",
    details:
      "Our turnkey trivia shows transform cafeterias, student centers, hotel ballrooms, and corporate offices into high-energy television game shows—complete with custom question categories, live sound, timers, and automated team leaderboards on screens up to 32 feet.",
    highlights: [
      "Energetic live game show emcee/host & concert sound included",
      "Wireless handheld team buzzers or smartphone team response scoring",
      "Custom branded trivia categories for companies, campuses & themes",
      "Scalable from 20 corporate teammates to 500+ college orientation crowds",
    ],
    relatedLinks: [
      { label: "Live Gaming Events & Esports", href: "/gaming-events" },
      { label: "Just Dance Giant-Screen Party", href: "/just-dance" },
      { label: "Silent Disco Wireless Headphones", href: "/silent-disco" },
      { label: "College, School & Corporate Events", href: "/college-school-corporate-events" },
      { label: "Manchester NH Event Rentals", href: "/manchester-nh-event-rentals" },
    ],
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
    title: "VR Gaming Arcade & Mobile VR Event Rentals | NH, MA & NC",
    description:
      "Mobile VR gaming arcade & VR event games (Beat Saber, SUPERHOT VR) for adults, colleges & corporate events plus 4-player VR escape rooms in NH, MA & NC.",
    keywords:
      "vr event games, vr games near me for adults, vr room near me, virtual reality center near me, vr experience near me, virtual reality near me, vr arcade near me, vr arena near me, vr gaming near me, superhot virtual reality, nh vr rental, virtual reality rental, VR event rental, VR party rental, virtual reality rental NH, virtual reality rental Boston MA, VR party rental Charlotte NC, mobile VR escape room rental, college VR entertainment, Beat Saber party rental",
    image: `${SITE_URL}/experience-virtual-reality.jpg`,
    canonicalPath: "/virtual-reality",
    heroEyebrow: "MOBILE VR ARCADE, VR ARENA & 4-PLAYER VR ESCAPE ROOMS · NH, MA & NC",
    heroDisplayTitle: "VR GAMING ARCADE & VR ESCAPE ROOMS",
    serviceName: "Virtual Reality (VR) Event Stations, VR Event Games & Mobile VR Escape Rooms",
    heading: "Virtual Reality Rentals, VR Event Games & Mobile VR Escape Rooms in NH, MA & NC",
    summary:
      "Looking for mobile Virtual Reality, a VR arcade near you, or a multi-player VR arena for your event? Next Level Gaming & Novelties delivers motion-tracked VR gaming stations, crowd-pleasing VR event games (SUPERHOT VR, Beat Saber, Pistol Whip, Walkabout Mini Golf, Job Simulator), and 4-player cooperative VR escape rooms across Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "Room-Scale VR Headsets, Live Spectator Screens, VR Event Games & On-Site Attendants",
    details:
      "Every Virtual Reality event rental includes commercial motion-tracked headsets, external HD spectator displays so friends and event attendees can watch every swing and puzzle live, sanitary disposable masks, and trained attendants to guide first-time and experienced players alike.",
    highlights: [
      "Top VR event games: SUPERHOT VR, Beat Saber, Pistol Whip, Job Simulator & Walkabout Mini Golf",
      "4-Player Cooperative VR Escape Rooms: Dragon Tower, Depths of Osiris, Manor Escape & Time Travel Paradox",
      "Live external HD spectator TVs so crowds cheer along with every player",
      "Sanitary disposable headset covers, cleaning between turns & trained VR staff",
      "Mobile VR arcade delivered to Hudson NH, Manchester, Nashua, Portsmouth, Boston & NC",
    ],
    relatedLinks: [
      { label: "4-Player Mobile VR Escape Rooms", href: "/vr-escape-room-rental" },
      { label: "Force-Feedback Sim Racing Cockpits", href: "/sim-racing" },
      { label: "Live Gaming Events & Esports", href: "/gaming-events" },
      { label: "Glow Park LED Swings & Mini Golf", href: "/glow-park" },
      { label: "Hudson NH Party Rentals (03051)", href: "/hudson-nh-party-rentals" },
      { label: "Portsmouth NH & Seacoast Rentals", href: "/portsmouth-nh-photo-booth-party-rentals" },
    ],
    offers: [
      {
        name: "Mobile VR Arcade & Room-Scale Action Gaming Stations",
        description: "Motion-tracked VR headsets with HD spectator monitors, sanitary face covers, and attendants featuring Beat Saber, SUPERHOT VR, Job Simulator, Walkabout Mini Golf, and Pistol Whip.",
      },
      {
        name: "4-Player Cooperative Mobile VR Escape Room & VR Arena Rental",
        description: "Team-based multiplayer VR escape room adventures including Dragon Tower, Depths of Osiris, Manor Escape, and Time Travel Paradox.",
      },
    ],
    faqs: [
      {
        q: "What VR event games and experiences are available with your Virtual Reality rental?",
        a: "We bring top room-scale VR event games including SUPERHOT Virtual Reality (SUPERHOT VR), Beat Saber, Pistol Whip, Job Simulator, Walkabout Mini Golf, plus 4-player cooperative VR escape rooms like Dragon Tower, Depths of Osiris, Manor Escape, and Time Travel Paradox.",
      },
      {
        q: "Can spectators watch what the player sees inside the VR headset?",
        a: "Yes! Every station includes a live external HD spectator monitor so guests waiting their turn or cheering from the crowd can watch the gameplay in real time.",
      },
      {
        q: "How does a mobile VR arena or VR arcade rental handle hygiene and beginners?",
        a: "Every Virtual Reality station comes with disposable sanitary face covers, optical cleaning between sessions, and friendly on-site VR attendants who adjust the headset and teach controls in seconds.",
      },
    ],
  },
  "/vr-escape-room-rental": {
    title: "Mobile VR Escape Room & Arcade Rentals | NH, MA & NC",
    description:
      "Rent 4-player cooperative mobile VR escape rooms & Beat Saber Virtual Reality gaming stations with HD spectator screens & attendants in NH, MA & NC.",
    keywords:
      "mobile VR escape room rental, VR escape room rental, Beat Saber party rental, virtual reality station rental, nh vr rental, vr arena near me, vr arcade near me, vr event games, VR party rental NH MA NC, college VR escape room event, corporate team building VR escape room Boston Charlotte Raleigh",
    image: `${SITE_URL}/about-vr-event.jpeg`,
    canonicalPath: "/virtual-reality",
    heroEyebrow: "4-PLAYER TEAM ESCAPE ROOMS · DRAGON TOWER · MANOR ESCAPE · OSIRIS",
    heroDisplayTitle: "MOBILE VR ESCAPE ROOM & BEAT SABER RENTALS",
    heroSubtitleOverride:
      "Put teams inside shared virtual worlds to solve 4-player cooperative escape rooms (Dragon Tower, Depths of Osiris, Manor Escape) alongside crowd-favorite Beat Saber & SUPERHOT VR stations across NH, MA, CT & NC.",
    serviceName: "Mobile VR Escape Room & Beat Saber Virtual Reality Event Rentals",
    heading: "Mobile VR Escape Room & Beat Saber Virtual Reality Rentals in NH, MA, CT & NC",
    summary:
      "Challenge your guests with 4-player cooperative mobile VR escape rooms and room-scale Beat Saber VR gaming stations from Next Level Gaming Events & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "Team-Building Cooperative Puzzles + High-Energy Rhythm & Action VR Stations",
    details:
      "Ideal for college student orientations, corporate team building, and post-prom lock-ins: up to 4 players enter the same escape room avatar world together, collaborating in real time while spectators follow along on HD screens.",
    highlights: [
      "4 synchronized cooperative VR players in the same virtual puzzle room",
      "Featured rooms: Dragon Tower, Time Travel Paradox, Depths of Osiris & Manor Escape",
      "Plus fast-rotation crowd stations: Beat Saber, SUPERHOT VR & Walkabout Mini Golf",
      "Zero permanent installation needed — runs indoors at campuses, hotels & offices",
    ],
    relatedLinks: [
      { label: "Full Virtual Reality Rentals Lineup", href: "/virtual-reality" },
      { label: "Sim Racing Cockpit Rentals", href: "/sim-racing" },
      { label: "Interactive Trivia Game Shows", href: "/trivia-nights" },
      { label: "College, School & Corporate Events", href: "/college-school-corporate-events" },
      { label: "NH, MA & CT Event Rentals", href: "/new-hampshire-massachusetts-event-rentals" },
    ],
    offers: [
      {
        name: "4-Player Cooperative Mobile VR Escape Room Package",
        description: "Multiplayer VR escape room setup with 4 synchronized headsets, HD spectator TVs, sanitary masks, and VR game master attendants.",
      },
    ],
    faqs: [
      {
        q: "How many people can play the mobile VR escape room together?",
        a: "Up to 4 players can join the same cooperative VR escape room simultaneously, seeing and talking to each other as avatars inside Dragon Tower, Depths of Osiris, Manor Escape, or Time Travel Paradox.",
      },
      {
        q: "Is a mobile VR escape room good for corporate team building and college events?",
        a: "Yes! Because players must communicate and solve visual puzzles together in 3D space, our mobile VR escape room is one of our highest-rated bookings for college welcome weeks, corporate retreats, and high school project graduations.",
      },
    ],
  },
  "/photo-booth": {
    title: "Photo Booth NH — 360 Video & Mirror Photo Booth Rentals",
    description:
      "Turnkey photo booth rentals in Portsmouth, Manchester, Nashua & Hudson NH: 360 video booths & Magic Mirror booths with prints, props & QR sharing. Quote!",
    keywords:
      "photo booth rental new hampshire, photo booth nh, nh photo booth rental, portsmouth photo booth rental, portsmouth nh photo booth rental, 360 photo booth rental, photo booth rental, mirror photo booth rental, mirror photobooth rental, photo booth rental NH, manchester nh photo booth rental, nashua nh photo booth rental, hudson nh photo booth rental, concord nh photo booth rental, dover nh photo booth rental, salem nh photo booth rental, 360 video booth rental NH, photo booth rental Boston MA, 360 photo booth rental Charlotte NC, photo booth rental Raleigh NC, interactive photo booth, wedding photo booth rental, corporate photo booth rental",
    image: `${SITE_URL}/experience-360-video-booth.jpg`,
    canonicalPath: "/photo-booth",
    heroEyebrow: "PHOTO BOOTH RENTAL NEW HAMPSHIRE · PORTSMOUTH, MANCHESTER, HUDSON & NC",
    heroDisplayTitle: "PHOTO BOOTH NH — 360 & MIRROR BOOTHS",
    heroTagline: "360 Video Photo Booth  /  Interactive Mirror Photo Booth",
    serviceName: "Interactive Photo Booth, 360 Video Booth & Mirror Photo Booth Rentals",
    heading: "Photo Booth NH Rentals — Portsmouth, Manchester, Hudson, Boston & NC 360 & Mirror Booths",
    summary:
      "Capture viral slow-motion videos and instant printed photo keepsakes with turnkey Photo Booth NH rentals from Next Level Gaming & Novelties. Choose our 360 slow-motion Video Booth platform or full-length interactive Magic Mirror Photo Booth—delivered with red carpet, VIP stanchions, studio LED ring lighting, party props, custom event overlays, QR/SMS instant sharing, and an on-site attendant across Portsmouth, Dover, Exeter, Hampton, Hudson, Nashua, Manchester, Concord, Salem, and Derry NH, Greater Boston MA, Connecticut, and North Carolina.",
    subhead: "Portsmouth NH, Manchester & Hudson Photo Booth Rentals — 360 & Mirror Booths",
    details:
      "Whether you are booking a waterfront wedding or gala in Portsmouth NH, a corporate party in Manchester or Boston, a high school prom in Nashua or Hudson, or a campus formal in North Carolina, our commercial 360 video booth and touch-screen mirror photo booth packages arrive 100% turnkey and staffed.",
    highlights: [
      "360 Slow-Motion Video Photo Booth & Full-Length Interactive Magic Mirror Photo Booth",
      "Red carpet entrance, velvet VIP stanchions & commercial LED studio ring lighting",
      "Custom branded photo/video overlays, props & instant QR / SMS phone downloads",
      "Dedicated Seacoast NH & Portsmouth photo booth delivery (plus Manchester, Nashua, Hudson, Boston & NC)",
    ],
    relatedLinks: [
      { label: "360 Slow-Motion Video Booth Details", href: "/360-video-booth" },
      { label: "Interactive Mirror Photo Booth Details", href: "/mirror-photo-booth-rental" },
      { label: "Portsmouth NH Photo Booth & Seacoast Hub", href: "/portsmouth-nh-photo-booth-party-rentals" },
      { label: "Manchester NH Event & Photo Booth Rentals", href: "/manchester-nh-event-rentals" },
      { label: "Nashua NH Party & Photo Booth Rentals", href: "/nashua-nh-event-rentals" },
      { label: "Hudson NH Party Rentals (03051)", href: "/hudson-nh-party-rentals" },
      { label: "Glow Park LED Swings & Mini Golf", href: "/glow-park" },
    ],
    offers: [
      {
        name: "360 Slow-Motion Video Photo Booth Platform Rental",
        description: "Motorized 360-degree rotating camera platform with studio LED ring lighting, custom slow-motion video overlays, music tracks, and instant QR/SMS sharing.",
      },
      {
        name: "Interactive Full-Length Mirror Photo Booth Rental",
        description: "Touch-screen full-length mirror photo booth with animated voice prompts, interactive glass signature drawing, party props, and instant keepsake prints.",
      },
      {
        name: "VIP Red Carpet, Stanchions & On-Site Booth Attendant Package",
        description: "Included with every NH, MA, CT & NC photo booth rental: red carpet entrance, velvet ropes, custom event graphics, and full setup and attendant service.",
      },
    ],
    faqs: [
      {
        q: "Where do you deliver photo booth rentals in New Hampshire, Massachusetts, and North Carolina?",
        a: "We deliver, set up, and staff NH photo booth rentals—including 360 video booths and interactive mirror photo booths—across Portsmouth NH, the NH Seacoast (Dover, Exeter, Hampton, Durham), Manchester NH, Nashua NH, Hudson NH, Concord NH, Salem NH, Derry NH, Londonderry NH, Greater Boston, Lowell, and Worcester MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, Greensboro NC).",
      },
      {
        q: "How does the 360 video photo booth work?",
        a: "Guests step onto an elevated platform while a motorized camera arm rotates 360 degrees around them, capturing high-resolution slow-motion video rendered with custom event graphics and music for immediate QR code or SMS phone download.",
      },
      {
        q: "What is an interactive mirror photo booth?",
        a: "The interactive mirror photo booth is a full-length touch-screen mirror displaying playful animations, countdowns, and voice prompts. Guests pose, sign their names directly on the mirror glass, and take home glossy printed photos and digital copies.",
      },
      {
        q: "How much space, power, and staffing is needed for a photo booth rental?",
        a: "The 360 video booth needs a 10x10 ft open area and the mirror photo booth needs 8x8 ft, running on a standard 120V outlet. Every rental includes a dedicated on-site booth attendant from setup through teardown.",
      },
    ],
  },
  "/360-video-booth": {
    title: "360 Video Booth & 360 Photo Booth Rental | NH, MA & NC",
    description:
      "Rent a 360 slow-motion video booth platform with VIP red carpet, LED studio ring lighting, custom video overlays & instant QR sharing in NH, MA, CT & NC.",
    keywords:
      "360 photo booth rental, 360 video booth rental, 360 camera booth rental, slow motion 360 photo booth rental, 360 photo booth rental NH, portsmouth nh 360 photo booth rental, manchester nh 360 photo booth rental, hudson nh 360 photo booth rental, 360 photo booth rental Boston MA, 360 photo booth rental Charlotte NC, 360 video booth rental Raleigh NC",
    image: `${SITE_URL}/photo-booth-experience-2.jpg`,
    canonicalPath: "/photo-booth",
    heroEyebrow: "COMMERCIAL 360 CAMERA PLATFORM · INSTANT QR & SMS VIDEO SHARING",
    heroDisplayTitle: "360 VIDEO BOOTH & 360 PHOTO BOOTH RENTAL",
    heroTagline: "Slow-Motion 360 Camera Arm  /  VIP Red Carpet  /  Custom Overlays",
    heroSubtitleOverride:
      "Step onto our commercial 360 platform for viral slow-motion videos rendered with custom event branding, music tracks, studio ring lighting, red carpet stanchions, and instant smartphone sharing across NH, MA, CT & NC.",
    featuredCard: "360 Video Booth",
    serviceName: "360 Slow-Motion Video Booth & 360 Camera Platform Rentals",
    heading: "360 Photo Booth & Slow-Motion 360 Video Booth Rentals in NH, MA, CT & NC",
    summary:
      "Rent a commercial 360 slow-motion video booth platform from Next Level Gaming Events & Novelties across Hudson NH (03051), Portsmouth, Manchester, Nashua, Concord, Greater Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC). Guests step onto our elevated platform while a motorized HD camera arm captures viral 360-degree slow-motion videos rendered instantly with custom event graphics and music.",
    subhead: "Motorized 360 Camera Arm, VIP Red Carpet, Studio Lighting & Instant QR/SMS Video Sharing",
    details:
      "Every 360 video booth rental includes an elevated multi-guest platform (fitting 3–5 guests per spin), motorized overhead rotating arm, LED studio ring lighting, VIP red carpet and stanchions, party props, custom overlay graphics, instant QR/SMS downloads, and an attendant.",
    highlights: [
      "Spacious commercial 360 platform fits 3 to 5 guests per slow-motion take",
      "Instant automated rendering with custom event border overlays & music",
      "Instant contactless download to guest phones via QR code, AirDrop or SMS",
      "Includes VIP red carpet, stanchions, LED studio lights & dedicated attendant",
    ],
    relatedLinks: [
      { label: "Compare All NH & Seacoast Photo Booths", href: "/photo-booth" },
      { label: "Interactive Mirror Photo Booth Rental", href: "/mirror-photo-booth-rental" },
      { label: "Portsmouth NH Photo Booth Rentals", href: "/portsmouth-nh-photo-booth-party-rentals" },
      { label: "Manchester NH Event Rentals", href: "/manchester-nh-event-rentals" },
      { label: "Custom Trucker Hat Bar Workshop", href: "/custom-trucker-hat-bar-rental" },
    ],
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
  "/360-booth": {
    title: "360 Photo Booth & 360 Video Booth Rental | Hudson NH, Portsmouth, Boston & NC",
    description:
      "Rent a 360 slow-motion video booth platform with VIP red carpet, LED studio ring lighting, custom video overlays & instant QR sharing in NH, MA, CT & NC.",
    keywords:
      "360 photo booth rental, 360 video booth rental, 360 camera booth rental, slow motion 360 photo booth rental, 360 photo booth rental NH, 360 photo booth rental Boston MA, 360 photo booth rental Charlotte NC",
    image: `${SITE_URL}/photo-booth-experience-2.jpg`,
    canonicalPath: "/360-video-booth",
    noindex: true,
    serviceName: "360 Slow-Motion Video Booth & 360 Camera Platform Rentals",
  },
  "/mirror-photo-booth-rental": {
    title: "Interactive Mirror Photo Booth Rental | NH, MA & NC",
    description:
      "Rent a full-length interactive magic mirror photo booth with touch-screen animations, custom prints, red carpet & attendant in NH, Boston MA, CT & NC.",
    keywords:
      "mirror photo booth rental, magic mirror photobooth rental, magic mirror photo booth rental, interactive mirror photo booth rental, mirror photo booth rental NH, portsmouth nh mirror photo booth rental, manchester nh photo booth rental, mirror photo booth rental Boston MA, mirror photo booth rental Charlotte NC, wedding mirror photo booth rental",
    image: `${SITE_URL}/photo-booth-experience-1.jpg`,
    canonicalPath: "/photo-booth",
    heroEyebrow: "FULL-LENGTH TOUCH-SCREEN MAGIC MIRROR · PRINTS & DIGITAL SHARING",
    heroDisplayTitle: "INTERACTIVE MIRROR PHOTO BOOTH RENTAL",
    heroTagline: "Full-Length Magic Mirror  /  On-Glass Signatures  /  Keepsake Prints",
    heroSubtitleOverride:
      "Elevate weddings, proms, formals, and corporate galas with our full-length touch-screen Magic Mirror Photo Booth—featuring animated voice prompts, interactive glass signing, glossy photo keepsakes, and red carpet VIP setup.",
    featuredCard: "Mirror Photo Booth",
    serviceName: "Interactive Full-Length Mirror Photo Booth Rentals",
    heading: "Interactive Full-Length Mirror Photo Booth Rentals in NH, MA, CT & NC",
    summary:
      "Book a full-length interactive mirror photo booth rental from Next Level Gaming Events & Novelties in Hudson NH, Portsmouth, Manchester, Nashua, Greater Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC). Guests pose in front of a giant touch-screen mirror featuring animated voice prompts, neon signature drawing on the glass, instant keepsake photo prints, and digital sharing.",
    subhead: "Full-Length Touch-Screen Magic Mirror, Custom Print Overlays, Red Carpet & Attendant",
    details:
      "Ideal for weddings, college formals, high school proms, and corporate galas, our mirror photo booth package includes an 8x8 ft red carpet setup, VIP stanchions, studio flash lighting, fun props, custom print templates, instant SMS/QR digital sharing, and a professional on-site attendant.",
    highlights: [
      "Sleek open-air full-length reflective touch-screen mirror frame",
      "Guests draw custom neon signatures & emojis directly onto the mirror glass",
      "Instant glossy commemorative print strips + QR/SMS digital gallery downloads",
      "Compact 8x8 ft footprint ideal for Portsmouth weddings, galas & campus ballrooms",
    ],
    relatedLinks: [
      { label: "All NH & Seacoast Photo Booth Rentals", href: "/photo-booth" },
      { label: "360 Slow-Motion Video Booth Rental", href: "/360-video-booth" },
      { label: "Portsmouth NH Photo Booth & Party Hub", href: "/portsmouth-nh-photo-booth-party-rentals" },
      { label: "Hudson NH Party Rentals (03051)", href: "/hudson-nh-party-rentals" },
      { label: "Glow Park LED Swings Rental", href: "/led-glow-swings-rental" },
    ],
    offers: [
      {
        name: "Full-Length Interactive Mirror Photo Booth Rental Package",
        description: "Touch-screen magic mirror photo booth with custom photo strips, neon glass signing, props, red carpet, and on-site attendant.",
      },
    ],
    faqs: [
      {
        q: "What makes a mirror photo booth different from a traditional photo booth?",
        a: "Unlike cramped enclosed box booths, the interactive mirror photo booth is a sleek, open-air full-length touch-screen mirror that lets large groups pose together, see full-body reflections, interact with animations, and sign their names directly on the mirror glass.",
      },
      {
        q: "Are instant printed photos and digital downloads included?",
        a: "Yes! Guests receive physical glossy keepsake prints tailored with your event logo or wedding monogram, plus instant QR/SMS digital sharing.",
      },
    ],
  },
  "/just-dance": {
    title: "Just Dance Party Rentals & Giant Screen Events | NH, MA & NC",
    description:
      "Bring multiplayer Just Dance battles on giant HD screens with concert sound and lighting to your college, school, or event in Hudson NH, MA & North Carolina.",
    keywords:
      "just dance, just dance party rental, nh just dance rental, Just Dance event rental NH MA NC, giant screen dance party rental, college Just Dance party New England North Carolina, interactive dance game rental Boston MA Charlotte NC",
    image: `${SITE_URL}/experience-just-dance.jpg`,
    canonicalPath: "/just-dance",
    heroEyebrow: "MULTIPLAYER DANCE BATTLES · 12–32 FT HD SCREENS & CONCERT SOUND",
    heroDisplayTitle: "JUST DANCE GIANT-SCREEN PARTY RENTALS",
    serviceName: "Just Dance Giant-Screen Event Rentals",
    heading: "Just Dance Giant Screen Event Party Rentals in NH, MA & NC",
    summary:
      "Turn any campus center, school gymnasium, or event venue into an interactive dance floor with Just Dance giant screen event party rentals from Next Level Gaming & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Massachusetts, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "Massive HD Projection Screens, Concert Audio & Head-to-Head Dance Battles",
    details:
      "Trusted at Dean College, New England College, Bridgewater State, Springfield College, and Emmanuel College, our Just Dance stage production features 12 ft to 32 ft HD screens, subwoofers, party lighting, and an emcee crew that gets every guest moving.",
    highlights: [
      "Giant 12 ft to 32 ft HD projection screens visible across full gymnasiums",
      "High-output concert PA speakers, subwoofers & synchronized dance floor lighting",
      "Dozens of guests dance simultaneously while spectators cheer live scores",
      "Proven crowd-favorite across NH, MA, CT & NC university student activities",
    ],
    relatedLinks: [
      { label: "3-Channel Silent Disco Headphone Parties", href: "/silent-disco" },
      { label: "Live Gaming Events & Esports", href: "/gaming-events" },
      { label: "Trivia Night & Game Show Rentals", href: "/trivia-nights" },
      { label: "College, School & Corporate Events", href: "/college-school-corporate-events" },
    ],
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
    image: `${SITE_URL}/experience-silent-disco.jpg`,
    canonicalPath: "/silent-disco",
    heroEyebrow: "3 SIMULTANEOUS DJ CHANNELS · TRI-COLOR GLOWING LED HEADPHONES",
    heroDisplayTitle: "SILENT DISCO WIRELESS HEADPHONE RENTALS",
    serviceName: "Silent Disco Wireless Headphone Party Rentals",
    heading: "Silent Disco Wireless Headphone Party Rentals in NH, MA & NC",
    summary:
      "Throw the loudest quiet party on campus or outdoors with Silent Disco LED wireless headphone party rentals from Next Level Gaming & Novelties in Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, Greensboro NC).",
    subhead: "Three-Channel Tri-Color LED Wireless Headphones for 50 to 5,000+ Guests",
    details:
      "Guests switch between up to three live DJ or playlist channels right on their earcup, lighting up the room in red, green, or blue LED glow—eliminating loudspeaker noise ordinances for late-night quads, rooftops, residence halls, and post-proms.",
    highlights: [
      "Red, green & blue LED earcups illuminate which DJ channel each guest is dancing to",
      "Supports up to 3 independent live DJs, laptops, phones, or Spotify playlists",
      "Scalable inventory from 50 to 5,000+ sanitized rechargeable wireless headphones",
      "Zero noise-curfew violations for late-night campuses, rooftops & outdoor parks",
    ],
    relatedLinks: [
      { label: "Just Dance Giant-Screen Parties", href: "/just-dance" },
      { label: "Glow Park LED Swings & Mini Golf", href: "/glow-park" },
      { label: "Photo Booth & 360 Video Booth Rentals", href: "/photo-booth" },
      { label: "Portsmouth NH & Seacoast Party Rentals", href: "/portsmouth-nh-photo-booth-party-rentals" },
    ],
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
    title: "Rent Racing Simulators & Sim Racing Cockpits | NH, MA & NC",
    description:
      "Rent commercial racing simulators near you with force-feedback wheels, bucket seats, telemetry screens & fastest-lap leaderboards in NH, Boston MA & NC.",
    keywords:
      "rent racing simulator near me, racing simulator rental near me, sim racing places near me, nh sim racing rental, sim racing rental, racing simulator rental, sim racing simulator rental, racing simulator event rental, sim racing rental NH MA, racing simulator rental Boston MA, sim racing simulator rental Charlotte NC, racing simulator event rental Raleigh NC, racing simulator rental Connecticut CT, force feedback racing cockpit rental, F1 racing simulator rental",
    image: `${SITE_URL}/experience-sim-racing.jpg`,
    canonicalPath: "/sim-racing",
    heroEyebrow: "RENT A RACING SIMULATOR · FORCE-FEEDBACK COCKPITS · NH, MA, CT & NC",
    heroDisplayTitle: "RENT RACING SIMULATORS & SIM COCKPITS",
    serviceName: "Sim Racing Cockpit Simulator Event Rentals",
    heading: "Sim Racing Cockpit & Racing Simulator Rentals in NH, MA, CT & NC",
    summary:
      "Looking to rent a racing simulator near you? Bring authentic motorsport competition to your corporate trade show, dealership event, college campus, or private celebration with Sim Racing cockpit simulator rentals from Next Level Gaming & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, Connecticut, and North Carolina (Charlotte, Concord, Raleigh, Durham, Greensboro NC).",
    subhead: "Force-Feedback Steering Wheels, Bucket Seats & Live Fastest-Lap Leaderboards",
    details:
      "Each turnkey Sim Racing rig combines responsive force-feedback steering wheels, pedal sets, authentic bucket racing seats, external big-screen spectator telemetry, and live fastest-lap leaderboard challenges supervised by our race crew.",
    highlights: [
      "Pro force-feedback racing wheels, precision pedals & ergonomic bucket seats",
      "Drive Formula 1, GT3, NASCAR, rally & supercars on international circuits",
      "Side-by-side multi-rig setups with live fastest-lap tournament leaderboards",
      "Delivered for trade shows, corporate parties & colleges across NH, MA, CT & NC",
    ],
    relatedLinks: [
      { label: "Virtual Reality & VR Escape Rooms", href: "/virtual-reality" },
      { label: "Live Gaming Events & Esports", href: "/gaming-events" },
      { label: "360 Slow-Motion Video Booth", href: "/360-video-booth" },
      { label: "NH, MA & CT Event Rentals", href: "/new-hampshire-massachusetts-event-rentals" },
      { label: "North Carolina Event Rentals", href: "/north-carolina-event-rentals" },
    ],
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
        q: "What equipment comes with your racing simulator rental?",
        a: "Each Sim Racing cockpit features an authentic racing bucket seat, precision force-feedback steering wheel and pedal set, high-definition display, surround audio, and live fastest-lap leaderboard tracking managed by our crew.",
      },
      {
        q: "What types of cars and tracks can participants drive?",
        a: "Drivers can compete in Formula 1, GT3, stock car, rally, and exotic supercars across laser-scanned international circuits with realistic physics.",
      },
      {
        q: "Can we rent multiple racing simulators for a trade show or fastest-lap tournament?",
        a: "Yes! We deploy single showpiece rigs or multiple linked cockpits side by side with giant spectator screens and live time-trial leaderboards across NH, Boston MA, Connecticut, and North Carolina.",
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
    heroEyebrow: "8 LED GLOW SWINGS · 4 GLOW SEESAWS · UPLIGHTING & GLOW MINI GOLF",
    heroDisplayTitle: "GLOW PARK LED SWINGS & MINI GOLF RENTALS",
    serviceName: "Glow Park Experience — Illuminated Swings, Seesaws & Mini Golf Rentals",
    heading: "Glow Park Swings, Seesaws & Mini Golf Rental in NH, MA & NC",
    summary:
      "Transform indoor gymnasiums, hotel ballrooms, or outdoor campus quads with the full Glow Park Experience rental from Next Level Gaming & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Massachusetts, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, Greensboro NC).",
    subhead: "Eight Illuminated LED Swings, Four Glow Seesaws & Glowing Mini Golf",
    details:
      "Our complete Glow Park package pairs 8 commercial truss-mounted LED glow swings with 4 glowing multi-rider seesaws, programmable venue uplighting, and an interactive glowing mini-golf course—fully installed and staffed by our crew.",
    highlights: [
      "8 commercial color-changing LED glow swings suspended on heavy-duty truss frames",
      "4 illuminated multi-rider seesaws built for viral photos & social hangouts",
      "Portable LED glowing mini-golf course with glowing putters and balls",
      "Full venue uplighting + structural assembly & staffing across NH, MA, CT & NC",
    ],
    relatedLinks: [
      { label: "LED Glow Swings & Seesaws Specs", href: "/led-glow-swings-rental" },
      { label: "3-Channel Silent Disco Headphone Party", href: "/silent-disco" },
      { label: "360 Video Booth & Mirror Photo Booth", href: "/photo-booth" },
      { label: "Hudson NH Party Rentals (03051)", href: "/hudson-nh-party-rentals" },
    ],
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
  "/led-glow-swings-rental": {
    title: "LED Glow Swings & Seesaws Event Rental | NH, MA & NC",
    description:
      "Rent 8 commercial LED illuminated glow swings on truss frames, 4 glowing seesaws & portable glow mini golf for events in Hudson NH, Boston MA & NC.",
    keywords:
      "LED glow swings rental, glow swings rental, illuminated seesaws rental, glow mini golf rental, LED furniture rental NH MA NC, glow party equipment rental, college glow night rentals Boston Charlotte Raleigh",
    image: `${SITE_URL}/glow-park-experience-1.jpg`,
    canonicalPath: "/glow-park",
    heroEyebrow: "COMMERCIAL TRUSS-MOUNTED LED GLOW SWINGS & ILLUMINATED SEESAWS",
    heroDisplayTitle: "LED GLOW SWINGS, SEESAWS & MINI GOLF RENTAL",
    heroSubtitleOverride:
      "Commercial truss-mounted LED glow swings (8 swings), 4 glowing seesaws, vibrant room uplighting, and portable glowing mini golf delivered and assembled across NH, Boston MA, CT & North Carolina.",
    serviceName: "LED Illuminated Glow Swings, Glow Seesaws & Glowing Mini Golf Rentals",
    heading: "LED Illuminated Glow Swings, Seesaws & Glow Mini Golf Rentals in NH, MA, CT & NC",
    summary:
      "Rent 8 commercial LED illuminated glow swings suspended on truss frames, 4 multi-rider glowing seesaws, full-color venue uplighting, and an interactive glowing mini-golf course from Next Level Gaming Events & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "Commercial Truss-Mounted LED Glow Swings, Glowing Seesaws & Portable Glow Mini Golf",
    details:
      "Installed indoors inside darkened gymnasiums and student union ballrooms or outdoors on campus quads and festival lawns, our LED glow swings and glowing seesaws create an unforgettable neon playground and social photo magnet.",
    highlights: [
      "8 suspended LED swings with programmable neon RGB color modes",
      "4 glowing seesaws + 9-hole glowing mini-golf layout",
      "Freestanding commercial truss system — no ceiling rigging required",
      "Ideal for college glow nights, post-prom lock-ins & summer festivals",
    ],
    relatedLinks: [
      { label: "Full Glow Park Experience", href: "/glow-park" },
      { label: "Silent Disco Wireless Headphones", href: "/silent-disco" },
      { label: "360 Slow-Motion Video Booth", href: "/360-video-booth" },
      { label: "College, School & Corporate Events", href: "/college-school-corporate-events" },
    ],
    offers: [
      {
        name: "8 Commercial LED Glow Swings & 4 Illuminated Seesaws Rental",
        description: "Full truss-mounted LED swing set, 4 glowing seesaws, glowing mini golf course, and venue uplighting delivered and assembled by our crew.",
      },
    ],
    faqs: [
      {
        q: "How does setup work for the 8 LED glow swings and 4 glow seesaws?",
        a: "Our commercial LED glow swings hang from freestanding heavy-duty truss frames, so they install cleanly indoors inside gyms and ballrooms or outdoors on level lawns with zero ceiling attachment needed.",
      },
    ],
  },
  "/novelties": {
    title: "Custom Event Novelties & Maker Workshops | Next Level",
    description:
      "Custom novelty stations in NH, MA & NC: Patched City trucker hats, beanies, socks, photo pillow dolls, sequin pillows, keychains, stamped rings & plush bags.",
    keywords:
      "custom event novelties rental, nh custom hat bar rental, party novelty rentals Hudson NH, college novelty event ideas NH MA NC, custom trucker hat bar rental, Patched City trucker hats and beanies, custom event socks, Bead-tastics custom bracelets, custom photo pillow dolls, reversible sequin pillows, intention bracelets, laser engraved wood and metal keychains, stamped custom rings, hammerless ring press, Silly Sacks custom plush bags, custom novelty license plates",
    image: `${SITE_URL}/novelties-bg.jpg`,
    canonicalPath: "/novelties",
    heroEyebrow: "01 / CUSTOM EVENT NOVELTIES · HUDSON NH, BOSTON MA & NORTH CAROLINA",
    serviceName: "Custom Event Novelties & On-Site Maker Workshops",
    heading: "Custom Event Novelties & On-Site DIY Maker Workshops in Hudson NH, MA & NC",
    summary:
      "Next Level Gaming Events & Novelties brings 11 hands-on custom event novelty products and interactive maker workshops to colleges, universities, high schools, summer camps, corporate events, and private parties across Hudson NH (03051), Nashua, Manchester, Portsmouth, Boston MA, Connecticut, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, Greensboro NC).",
    subhead: "11 Make-and-Take Custom Novelty Products: Hats, Socks, Pillow Dolls, Keychains, Rings & Plush Bags",
    details:
      "Attendees customize and take home personalized novelty keepsakes made on-site: Patched City trucker hats and beanies, custom trucker hats, custom printed socks, Bead-tastics bracelets, intention bracelets, custom photo pillow dolls, reversible sequin pillows, laser-engraved wood and metal keychains, hammerless stamped custom rings, Silly Sacks plush character bags, and novelty license plates.",
    highlights: [
      "11 commercial DIY maker stations staffed & stocked with all materials",
      "Patched City Hat Bar, Custom Printed Socks & Photo Pillow Dolls",
      "Quiet Hammerless Ring Press, Laser Keychains & Stamped Intention Bracelets",
      "Produces 50–200+ take-home keepsakes per hour for campuses & corporate events",
    ],
    relatedLinks: [
      { label: "Custom Trucker Hat Bar & Patched City", href: "/custom-trucker-hat-bar-rental" },
      { label: "Custom Photo Pillow Dolls & Sequin Pillows", href: "/custom-pillow-dolls-rental" },
      { label: "Laser Keychains, Stamped Rings & Plates", href: "/custom-keychains-rings-novelty" },
      { label: "Custom Socks, Bracelets & Silly Sacks", href: "/custom-event-socks-bracelets" },
      { label: "Order Custom Novelties Now", href: "/novelty-order" },
      { label: "Hudson NH Party Rentals (03051)", href: "/hudson-nh-party-rentals" },
    ],
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
  "/custom-trucker-hat-bar-rental": {
    title: "Custom Trucker Hat Bar & Beanie Workshops | NH, MA & NC",
    description:
      "Book an on-site Custom Trucker Hat Bar & Patched City heat-press patch hat and beanie workshop for colleges, parties & corporate events in NH, MA & NC.",
    keywords:
      "custom trucker hat bar rental, trucker hat bar party rental, Patched City trucker hats and beanies, custom patch hat bar event, DIY trucker hat station college event, custom hat press bar rental NH Boston Charlotte Raleigh",
    image: `${SITE_URL}/novelty-cards/patch-city.jpg`,
    preloadImage: "/novelties-bg.jpg",
    canonicalPath: "/novelties",
    heroEyebrow: "01 / PATCHED CITY & CUSTOM TRUCKER HAT BAR · NH, MA & NC",
    heroDisplayTitle: "Custom Trucker Hat",
    heroDisplayHighlight: "Bar & Beanies.",
    heroSubtitleOverride:
      "On-site Patched City heat-press patch hat & knit beanie workshops and custom trucker hat bars with hundreds of curated patches—staffed and stocked for campuses, corporate events & parties.",
    featuredWorkshopIds: ["01", "02"],
    serviceName: "Custom Trucker Hat Bar & Patched City Hat and Beanie Maker Workshops",
    heading: "Custom Trucker Hat Bar & Patched City Hat & Beanie Workshop Rentals in NH, MA, CT & NC",
    summary:
      "Bring the viral Custom Trucker Hat Bar and Patched City custom patch hat & knit beanie maker workshop to your college campus, orientation, high school post-prom, corporate activation, or private party with Next Level Gaming Events & Novelties across Hudson NH (03051), Boston MA, Connecticut, New England, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "Hundreds of Iron-On Embroidered & Chenille Patches, Trucker Hats & Knit Beanies",
    details:
      "Guests pick their favorite foam or mesh trucker hat or cuffed knit beanie, arrange curated retro, campus, or custom-branded patches, and watch our event crew heat-press their wearable creation in seconds.",
    highlights: [
      "Foam & mesh trucker hats plus winter cuffed knit beanies in multiple colorways",
      "Hundreds of embroidered, chenille, mascot & custom branded patches",
      "Commercial dual-platen hat heat presses & staffed event bar setup",
      "Ideal for college welcome weeks, corporate activations & Seacoast/NH parties",
    ],
    relatedLinks: [
      { label: "Explore All 11 Custom Novelties", href: "/novelties" },
      { label: "Custom Photo Pillow Dolls Station", href: "/custom-pillow-dolls-rental" },
      { label: "Laser Keychains, Stamped Rings & Plates", href: "/custom-keychains-rings-novelty" },
      { label: "Custom Socks, Bracelets & Silly Sacks", href: "/custom-event-socks-bracelets" },
      { label: "Order Novelty Workshop", href: "/novelty-order" },
    ],
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
      {
        q: "Can we include custom school mascots or company logo patches?",
        a: "Yes! Alongside our massive trendy patch library, we can press custom school emblems, fraternity/sorority letters, or corporate event artwork.",
      },
    ],
  },
  "/custom-pillow-dolls-rental": {
    title: "Custom Photo Pillow Dolls & Sequin Pillows | NH & NC",
    description:
      "Rent on-site Custom Photo Pillow Doll & Magic Reversible Sequin Pillow maker stations for college events, orientations & parties in NH, Boston MA & NC.",
    keywords:
      "custom photo pillow dolls, custom pillow dolls college event, reversible sequin pillows novelty rental, custom sequence pillows event station, make your own photo pillow event NH MA NC, college orientation novelty stations",
    image: `${SITE_URL}/novelty-cards/pillow-dolls.jpg`,
    preloadImage: "/novelties-bg.jpg",
    canonicalPath: "/novelties",
    heroEyebrow: "01 / CUSTOM PHOTO PILLOW DOLLS & SEQUIN PILLOWS · NH, MA & NC",
    heroDisplayTitle: "Custom Pillow Dolls",
    heroDisplayHighlight: "& Sequin Pillows.",
    heroSubtitleOverride:
      "Turn guest photos, best friends, roommates, pets, or campus mascots into stuffed 3D Custom Photo Pillow Dolls and brushable Magic Reversible Sequin Pillows right at your event.",
    featuredWorkshopIds: ["05", "06"],
    serviceName: "Custom Photo Pillow Dolls & Reversible Sequin Pillow Event Stations",
    heading: "Custom Photo Pillow Dolls & Magic Reversible Sequin Pillow Stations in NH, MA, CT & NC",
    summary:
      "Delight students and event guests with on-site Custom Photo Pillow Dolls and Custom Reversible Sequin (Sequence) Pillow maker stations from Next Level Gaming Events & Novelties across Hudson NH, Boston MA, Connecticut, New England, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "On-Site 3D Stuffed Photo Pillow Dolls & Brushable Magic Sequin Pillows",
    details:
      "Guests text or snap a photo of themselves, their friends, their pet, or a school mascot, and our on-site sublimation and stuffing crew transforms it into a 3D shaped Custom Photo Pillow Doll or Reversible Magic Sequin Pillow in minutes.",
    highlights: [
      "3D die-cut plush Custom Photo Pillow Dolls stuffed & sealed live on-site",
      "Brushable Magic Reversible Sequin Pillows revealing photos or custom graphics",
      "Instant QR smartphone photo upload — no pre-event photo collection needed",
      "Top dorm-room keepsake hit across NH, MA, CT & North Carolina colleges",
    ],
    relatedLinks: [
      { label: "Explore All 11 Custom Novelties", href: "/novelties" },
      { label: "Custom Trucker Hat Bar Rental", href: "/custom-trucker-hat-bar-rental" },
      { label: "Laser Keychains & Stamped Rings", href: "/custom-keychains-rings-novelty" },
      { label: "Custom Socks & Silly Sacks Bags", href: "/custom-event-socks-bracelets" },
      { label: "Order Novelty Workshop", href: "/novelty-order" },
    ],
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
        a: "Guests simply submit their photo via smartphone at the station, and our crew prints, heat-transfers, and stuffs their custom pillow doll or reversible sequin pillow on-site within minutes.",
      },
    ],
  },
  "/custom-keychains-rings-novelty": {
    title: "Laser Keychains, Stamped Rings & Plates | NH, MA & NC",
    description:
      "Book on-site Laser-Engraved Wood & Metal Keychains, Hammerless Stamped Custom Rings & Custom Novelty License Plate stations in NH, Boston MA & NC.",
    keywords:
      "laser engraved wood and metal keychains, stamped custom rings event novelty, hammerless ring press rental, custom novelty license plates event station, personalized keychain station college event, custom metal stamped rings NH MA NC",
    image: `${SITE_URL}/novelty-cards/wood-metal-keychains.jpg`,
    preloadImage: "/novelties-bg.jpg",
    canonicalPath: "/novelties",
    heroEyebrow: "01 / LASER KEYCHAINS, STAMPED RINGS & LICENSE PLATES · NH, MA & NC",
    heroDisplayTitle: "Laser Keychains,",
    heroDisplayHighlight: "Rings & Plates.",
    heroSubtitleOverride:
      "Live precision laser-engraved wood and metal keychains, quiet Hammerless Ring Press metal-stamped keepsake rings, and custom full-color aluminum novelty license plates.",
    featuredWorkshopIds: ["08", "09", "11"],
    serviceName: "Laser-Engraved Keychains, Stamped Custom Rings & Custom License Plate Stations",
    heading: "Laser-Engraved Keychains, Stamped Custom Rings & License Plate Novelties in NH, MA, CT & NC",
    summary:
      "Offer permanent personalized keepsakes with on-site Laser-Engraved Wood & Metal Keychains, Stamped Custom Rings using our quiet Hammerless Ring Press, and Custom Novelty License Plates from Next Level Gaming Events & Novelties across Hudson NH, Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "Precision Laser Engraving, Quiet Hammerless Ring Stamping & Aluminum Plates",
    details:
      "Designed for student unions, indoor corporate receptions, proms, and orientation fairs: our Hammerless Ring Press stamps clean lettering quietly without hammers, while guests watch live laser engraving and dye-sub aluminum plate pressing.",
    highlights: [
      "Natural wood & anodized metal keychains laser-engraved live on-site",
      "Whisper-quiet Hammerless Ring Press for safe indoor metal ring stamping",
      "Full-color personalized aluminum dorm & novelty license plates",
      "Zero loud hammering — campus student-center & hotel ballroom friendly",
    ],
    relatedLinks: [
      { label: "Explore All 11 Custom Novelties", href: "/novelties" },
      { label: "Custom Trucker Hat Bar & Beanies", href: "/custom-trucker-hat-bar-rental" },
      { label: "Custom Photo Pillow Dolls Station", href: "/custom-pillow-dolls-rental" },
      { label: "Custom Socks & Intention Bracelets", href: "/custom-event-socks-bracelets" },
      { label: "Order Novelty Workshop", href: "/novelty-order" },
    ],
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
    title: "Custom Printed Socks, Bracelets & Plush | NH, MA & NC",
    description:
      "Rent on-site Custom Printed Event Socks, Bead-tastics Custom Bracelets, Intention Bracelets & Silly Sacks Plush Bag stations in NH, Boston MA & NC.",
    keywords:
      "custom printed event socks, custom socks novelty station, Bead-tastics custom bracelets, custom intention bracelets event, Silly Sacks custom plush bags, DIY plush backpack college event, college welcome week novelty rentals NH MA NC",
    image: `${SITE_URL}/novelty-cards/custom-socks.jpg`,
    preloadImage: "/novelties-bg.jpg",
    canonicalPath: "/novelties",
    heroEyebrow: "01 / CUSTOM PRINTED SOCKS, BRACELETS & SILLY SACKS · NH, MA & NC",
    heroDisplayTitle: "Custom Socks,",
    heroDisplayHighlight: "Bracelets & Plush.",
    heroSubtitleOverride:
      "High-throughput campus and party stations featuring on-site sublimated Custom Printed Crew Socks, Bead-tastics & Intention Bracelets, and stuff-your-own Silly Sacks Plush Character Bags.",
    featuredWorkshopIds: ["03", "04", "07", "10"],
    serviceName: "Custom Printed Socks, Bead-tastics Bracelets, Intention Bracelets & Silly Sacks Stations",
    heading: "Custom Event Socks, Bead-tastics & Intention Bracelets & Silly Sacks Plush Bags in NH, MA & NC",
    summary:
      "Energize college welcome weeks, orientations, summer camps, and school events with on-site Custom Printed Crew Socks, Bead-tastics Custom Bracelets, Custom Intention Bracelets, and Silly Sacks Character Plush Bags from Next Level Gaming Events & Novelties across Hudson NH (03051), Boston MA, Connecticut, and North Carolina (Charlotte, Raleigh, Durham, Greensboro NC).",
    subhead: "On-Site Sublimated Crew Socks, Beaded & Intention Bracelets & Plush Backpacks",
    details:
      "Bundle multiple fast-moving DIY tables so hundreds of students and guests create custom-printed crew socks, beaded/stamped bracelets, or stuffed character plush backpacks without long waits.",
    highlights: [
      "Custom sublimated crew socks printed live with graphics, photos & mascots",
      "Bead-tastics DIY charm bracelets + stamped wearable Intention Bracelets",
      "Silly Sacks make-your-own stuffed plush character bags & backpacks",
      "Fast guest throughput ideal for welcome weeks, orientations & family days",
    ],
    relatedLinks: [
      { label: "Explore All 11 Custom Novelties", href: "/novelties" },
      { label: "Custom Trucker Hat Bar & Beanies", href: "/custom-trucker-hat-bar-rental" },
      { label: "Custom Photo Pillow Dolls Station", href: "/custom-pillow-dolls-rental" },
      { label: "Laser Keychains, Stamped Rings & Plates", href: "/custom-keychains-rings-novelty" },
      { label: "Order Novelty Workshop", href: "/novelty-order" },
    ],
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
  "/about": {
    title: "About Next Level Gaming & Novelties | NH, MA & NC Team",
    description:
      "Founded by Calvin Reid and Yaw Boateng in Hudson NH with a branch in North Carolina, Next Level Gaming brings 10+ years of event production.",
    keywords:
      "About Next Level Gaming, Calvin Reid, Yaw Boateng, Hudson NH event rental company, North Carolina event rental branch, New England college entertainment company",
    image: `${SITE_URL}/about-gaming-event.jpg`,
    preloadImage: "/hero-bg.jpg",
    canonicalPath: "/about",
    serviceName: "About Next Level Gaming & Novelties — Insured Event Production Team",
    heading: "About Next Level Gaming & Novelties — Hudson NH & North Carolina Team",
    summary:
      "Founded by Calvin Reid and Yaw Boateng, Next Level Gaming & Novelties is headquartered on Rebel Rd in Hudson, New Hampshire (03051) with an expanding regional branch in North Carolina, bringing over 10 years of turnkey event production experience across multiplayer gaming, esports tournaments, outdoor inflatable and mobile LED movie screens, VR, 360 photo booths, and custom novelty workshops.",
    subhead: "10+ Years of Insured Turnkey Production Across 23+ Universities, Schools & Corporate Clients",
    details:
      "From a loud game of Madden in 2007 to producing large-scale interactive events for Harvard, Boston University, Penn State, Babson, Quinnipiac, Holy Cross, and hundreds of campuses, high schools, municipalities, and corporations across NH, MA, CT, RI, ME, VT, NC, NY, NJ, PA, and FL.",
    highlights: [
      "Founded by Calvin Reid & Yaw Boateng — 10+ years in interactive event production",
      "New England Headquarters: Rebel Rd, Hudson, NH 03051 (978-601-5473)",
      "Regional Branch Serving North Carolina (Charlotte, Raleigh, Durham, Greensboro)",
      "Full Commercial General Liability Insurance for Universities & Municipalities",
    ],
    relatedLinks: [
      ...NH_CITY_LINKS,
      ...REGIONAL_LINKS,
      { label: "Request Event Quote", href: "/quote" },
    ],
    faqs: [
      {
        q: "Who founded Next Level Gaming & Novelties?",
        a: "Next Level Gaming & Novelties was founded by Calvin Reid and Yaw Boateng, growing from local New England setups into a dual-region event production company headquartered in Hudson, NH with a regional branch in North Carolina.",
      },
      {
        q: "Is Next Level Gaming & Novelties insured for campus and municipal venues?",
        a: "Yes. We maintain comprehensive commercial liability insurance satisfying requirements for universities, colleges, public school districts, hotel ballrooms, and municipal parks.",
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
    preloadImage: "/hero-bg.jpg",
    canonicalPath: "/contact",
    serviceName: "Contact Next Level Gaming & Novelties Booking Office",
    heading: "Contact Next Level Gaming & Novelties — Hudson NH & North Carolina (978-601-5473)",
    summary:
      "Get in touch with Next Level Gaming & Novelties on Rebel Rd in Hudson, New Hampshire (03051) or our North Carolina branch to check availability and request pricing for gaming events, outdoor movie screens, mobile LED walls, VR escape rooms, 360 and mirror photo booths, silent disco, sim racing, glow park swings, or custom novelties.",
    subhead: "Fast Availability Checks & Venue Spec Guidance for NH, MA, CT & NC",
    details:
      "Call 978-601-5473, email sales@nextlevelgamingevents.com, or build a custom package online anytime for rapid recommendations on room layout, power, screen sizing, and bundled event pricing.",
    highlights: [
      "Hudson, NH Warehouse HQ: Rebel Rd, Hudson, NH 03051",
      "Direct Booking Line: 978-601-5473 · Email: sales@nextlevelgamingevents.com",
      "Regional Branch Coverage Across North Carolina (Charlotte, Raleigh, Durham, Greensboro)",
      "Open Daily for Quotes, Site Logistics & Multi-Attraction Bundles",
    ],
    relatedLinks: [
      { label: "Build a Custom Event Quote", href: "/quote" },
      { label: "Order Custom Event Novelties", href: "/novelty-order" },
      ...NH_CITY_LINKS,
      ...REGIONAL_LINKS,
    ],
    faqs: [
      {
        q: "What is the fastest way to check availability for an event date?",
        a: "Submit our interactive quote request at /quote or call our booking desk directly at 978-601-5473 or email sales@nextlevelgamingevents.com.",
      },
      {
        q: "What regions do you travel to from your NH and NC bases?",
        a: "We deliver throughout New Hampshire, Massachusetts, Maine, Vermont, Rhode Island, Connecticut, and across North Carolina, South Carolina, and the East Coast.",
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
    preloadImage: null,
    canonicalPath: "/quote",
    heading: "Request an Event Rental Quote — Next Level Gaming NH, MA & NC",
    summary:
      "Use our interactive event planner to request a custom rental quote for video gaming events, outdoor movie nights, virtual reality, 360 photo booths, silent disco, sim racing, glow parks, trivia nights, or custom novelties in Hudson NH, Massachusetts, New England, and North Carolina.",
  },
  "/novelty-order": {
    title: "Order Custom Event Novelties | Next Level Gaming NH & NC",
    description:
      "Request pricing and book custom event novelty stations in NH, MA & NC—trucker hats, beanies, socks, bracelets, pillow dolls, sequin pillows & keychains.",
    keywords:
      "order custom event novelties NH NC, college novelty workshop booking North Carolina New England, Patched City hat bar order, custom college orientation giveaways",
    image: `${SITE_URL}/novelties-bg.jpg`,
    preloadImage: null,
    canonicalPath: "/novelty-order",
    heading: "Order Custom Event Novelties — Next Level Gaming NH & NC",
    summary:
      "Request pricing and book custom event novelty workshops including Patched City trucker hats and beanies, custom socks, Bead-tastics bracelets, intention bracelets, pillow dolls, sequin pillows, laser-engraved keychains, stamped rings, Silly Sacks, and custom license plates across New Hampshire, Massachusetts, New England, and North Carolina.",
  },
  "/explore-experiences": {
    title: "All Event Rentals & Interactive Experiences | Next Level",
    description:
      "Explore 10+ turnkey event & party rentals in NH, MA & NC: live gaming, outdoor movie screens, 360 photo booths, VR arcades, silent disco, glow park & more.",
    keywords:
      "explore events, event rentals, party equipment rentals, interactive experiences, video gaming events, next level fec attraction, outdoor movies, silent disco, virtual reality, photo booth, sim racing, glow park",
    image: DEFAULT_IMAGE,
    preloadImage: "/experience-gaming-events.avif",
    canonicalPath: "/explore-experiences",
    serviceName: "Complete Catalog of Interactive Event & Party Equipment Rentals",
    heading: "Explore What's Next — Interactive Event Rentals in NH, MA, CT & NC",
    summary:
      "Browse every flagship turnkey experience offered by Next Level Gaming & Novelties across Hudson NH, Manchester, Nashua, Portsmouth, Greater Boston, Connecticut, and North Carolina—including multiplayer video gaming events, inflatable and LED outdoor movie screens, interactive trivia nights, room-scale VR & escape rooms, Just Dance, 3-channel Silent Disco, Sim Racing cockpits, 360 & Mirror photo booths, Glow Park LED swings, and 11 custom novelty stations.",
    subhead: "FEC-Grade Commercial Attractions Delivered & Staffed at Your Venue",
    details:
      "Combine single attractions or multi-station campus and corporate bundles with unified delivery, setup, staffing, and commercial liability insurance.",
    highlights: [
      "Complete lineup of indoor & outdoor turnkey experiences",
      "Delivered from Rebel Rd, Hudson NH (03051) & our North Carolina branch",
      "Commercial-grade equipment with trained on-site event crew",
      "Popular multi-attraction bundles for college welcome weeks, post-proms & corporate days",
    ],
    relatedLinks: [
      ...SPECIALTY_LINKS.slice(0, 12),
      ...NH_CITY_LINKS,
      ...REGIONAL_LINKS,
    ],
    faqs: [
      {
        q: "Can we bundle multiple experiences like Photo Booth, Gaming Events, and Glow Park for one event?",
        a: "Yes! Most campus, post-prom, and corporate bookings bundle multiple attractions—such as a 360 video booth, VR escape room, giant movie screen, and custom novelty bar—under one coordinated crew.",
      },
    ],
  },
  "/explore": {
    title: "All Event Rentals & Interactive Experiences | Next Level",
    description:
      "Explore 10+ turnkey event & party rentals in NH, MA & NC: live gaming, outdoor movie screens, 360 photo booths, VR arcades, silent disco, glow park & more.",
    canonicalPath: "/explore-experiences",
    noindex: true,
  },
  "/experiences": {
    title: "All Event Rentals & Interactive Experiences | Next Level",
    description:
      "Explore 10+ turnkey event & party rentals in NH, MA & NC: live gaming, outdoor movie screens, 360 photo booths, VR arcades, silent disco, glow park & more.",
    canonicalPath: "/explore-experiences",
    noindex: true,
  },
  "/north-carolina-event-rentals": {
    title: "North Carolina Event & Party Rentals | Charlotte & Raleigh",
    description:
      "Turnkey NC event & party rentals: outdoor movie screens, 360 photo booths, gamer parties, live gaming events, VR & novelties in Charlotte, Raleigh & Eastern NC.",
    keywords:
      "North Carolina event rentals, party rentals Charlotte NC, Raleigh NC event rentals, party rentals Greensboro NC, Durham NC party rentals, gamer birthday party NC, Eastern NC party rentals, New Bern NC party rentals, 360 photo booth rental Charlotte NC, outdoor movie screen rental Raleigh NC, video game truck alternative NC",
    image: `${SITE_URL}/experience-virtual-reality.jpg`,
    heroImageLocal: "/experience-virtual-reality.jpg",
    canonicalPath: "/north-carolina-event-rentals",
    heroEyebrow: "CHARLOTTE · RALEIGH · DURHAM · GREENSBORO · NEW BERN & EASTERN NC",
    heroDisplayTitle: "North Carolina\nEvent & Party Rentals",
    heroSubtitleOverride:
      "Turnkey event entertainment from our North Carolina regional crew: outdoor movie screens, LED video walls, 360 & mirror photo booths, live gaming events, VR escape rooms, glow park & custom novelties.",
    serviceName: "North Carolina Interactive Event Rentals & Entertainment",
    heading: "North Carolina Event Rentals & Party Entertainment — Charlotte, Raleigh & Greensboro NC",
    summary:
      "Next Level Gaming & Novelties delivers turnkey event rentals, party rentals, gamer birthday parties, video gaming events, esports tournaments, giant inflatable outdoor movie screens, mobile LED video wall trailers, VR escape rooms, 360 video booths, mirror photo booths, Silent Disco wireless headphones, Sim Racing cockpits, Glow Park swings, live Trivia Nights, and custom novelty workshops across Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, Winston-Salem, Cary, Concord, Wilmington, Fayetteville, Greenville, New Bern, Northeast NC, and Asheville, North Carolina.",
    subhead: "Serving Universities, High Schools, Corporate Teams & Celebrations Across NC",
    details:
      "Our North Carolina branch provides full delivery, setup, and on-site event staff in the Charlotte Metro, Research Triangle (Raleigh-Durham-Chapel Hill), Piedmont Triad (Greensboro-Winston-Salem-High Point), Coastal & Eastern NC (New Bern, Greenville, Wilmington), and Western NC.",
    highlights: [
      "Charlotte, Concord, Mooresville, Matthews & Gastonia Metro NC coverage",
      "Research Triangle coverage: Raleigh, Durham, Chapel Hill, Cary, Apex & Wake Forest",
      "Piedmont Triad & Eastern NC: Greensboro, Winston-Salem, New Bern & Greenville",
      "Full lineup: 360 Photo Booths, Movie Screens, Live Gaming, VR, Glow Park & Novelties",
    ],
    relatedLinks: [
      { label: "Live Gaming Events & Esports NC", href: "/gaming-events" },
      { label: "Outdoor Movie Screens & LED Walls NC", href: "/movie-nights" },
      { label: "360 & Mirror Photo Booth Rentals NC", href: "/photo-booth" },
      { label: "Virtual Reality & VR Escape Rooms NC", href: "/virtual-reality" },
      { label: "Sim Racing Cockpit Simulators NC", href: "/sim-racing" },
      { label: "All 11 Custom Novelties NC", href: "/novelties" },
      ...ALL_NH_LINKS_EXCEPT("/north-carolina-event-rentals"),
    ],
    faqs: [
      {
        q: "Which cities in North Carolina do you deliver event rentals to?",
        a: "Our North Carolina crew serves Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, Winston-Salem, Cary, Apex, Concord, High Point, Wilmington, New Bern, Greenville, Fayetteville, and Asheville, NC.",
      },
      {
        q: "What types of events do you produce in North Carolina?",
        a: "We produce college campus events (orientation, homecoming, spring weekend), gamer birthday parties, high school proms and post-proms, corporate family picnics, trade show activations, and municipal festivals across NC.",
      },
    ],
  },
  "/new-hampshire-massachusetts-event-rentals": {
    title: "NH, MA & New England Event Rentals | Next Level Gaming",
    description:
      "Full-service event & party rentals across NH, MA & CT: Portsmouth, Manchester, Nashua, Hudson & Boston photo booths, outdoor movie screens, gaming & VR.",
    keywords:
      "NH event rentals, nh party rentals, nh photo booth rental, nh movie screen rental, Massachusetts event rentals, party rentals Manchester NH, party rentals Nashua NH, party rentals Hudson NH, Portsmouth NH photo booth rental, Portsmouth NH event rentals, Seacoast NH party rentals, Boston MA event rentals, Connecticut event rentals, next level gaming ct, new england gaming, corporate event rentals Boston, college event rentals New England, outdoor movie screen rental NH, 360 photo booth rental Boston",
    image: `${SITE_URL}/movie-nights-led.jpg`,
    heroImageLocal: "/movie-nights-led.jpg",
    canonicalPath: "/new-hampshire-massachusetts-event-rentals",
    heroEyebrow: "HUDSON NH HQ (03051) · BOSTON MA · PORTSMOUTH NH · CONNECTICUT",
    heroDisplayTitle: "NH, Massachusetts &\nNew England Rentals",
    heroSubtitleOverride:
      "Headquartered on Rebel Rd in Hudson, NH: full-service photo booths, 16–40 ft movie screens, mobile LED walls, live gaming tournaments, VR escape rooms, glow park & custom novelties across NH, MA, CT & RI.",
    serviceName: "New Hampshire, Massachusetts & New England Interactive Event Rentals",
    heading: "NH, MA & New England Event Rentals — Hudson, Manchester, Portsmouth, Boston & CT",
    summary:
      "Headquartered in Hudson, New Hampshire (03051), Next Level Gaming & Novelties delivers turnkey party rentals, event entertainment, giant inflatable and mobile LED movie screens, 360 photo booths, mirror photo booths, video gaming tournaments, Virtual Reality stations, Silent Disco headphones, Sim Racing simulators, Glow Park LED swings, Trivia Nights, and custom novelty workshops across Hudson, Nashua, Manchester, Portsmouth, Dover, Exeter, Hampton, Salem, Derry, Londonderry, Concord NH, Boston, Cambridge, Lowell, Worcester, Springfield MA, and Connecticut (Hartford, New Haven, Hamden, Danbury, Stamford, New London CT).",
    subhead: "Direct Dispatch Across Southern NH, Seacoast NH, Greater Boston & Connecticut",
    details:
      "For over ten years, our Rebel Rd Hudson NH warehouse has served Southern, Central, and Seacoast New Hampshire, the Merrimack Valley, Greater Boston, Central and Western Massachusetts, Rhode Island, Connecticut, Maine, and Vermont.",
    highlights: [
      "Direct local NH coverage: Hudson, Manchester, Nashua, Portsmouth, Concord, Salem & Derry",
      "Greater Boston & Massachusetts: Boston, Cambridge, Lowell, Worcester & Springfield",
      "Connecticut & Southern New England: Hartford, New Haven, Hamden, Danbury & Providence RI",
      "Commercially insured for universities, K-12 post-proms, municipalities & corporate galas",
    ],
    relatedLinks: [
      ...NH_CITY_LINKS,
      { label: "Photo Booth NH & 360 Booths", href: "/photo-booth" },
      { label: "Outdoor Movie Screens & LED Walls", href: "/movie-nights" },
      { label: "Live Gaming Events & Esports CT/NH/MA", href: "/gaming-events" },
      { label: "College, School & Corporate Events", href: "/college-school-corporate-events" },
    ],
    faqs: [
      {
        q: "Where is Next Level Gaming located in New Hampshire?",
        a: "We are headquartered on Rebel Rd in Hudson, NH (03051) and deliver interactive entertainment across Southern, Central, and Seacoast New Hampshire (Manchester, Nashua, Portsmouth, Concord, Dover, Exeter, Salem, Derry), Greater Boston, Connecticut, and throughout New England.",
      },
      {
        q: "Do you deliver photo booth rentals and gaming events to Portsmouth NH, Boston MA, and Connecticut?",
        a: "Yes! Our crew regularly delivers 360 photo booths, mirror photo booths, outdoor movie screens, sim racing cockpits, and live gaming events to Portsmouth NH and Boston MA, plus campuses and venues across Connecticut (Hartford, New Haven, Hamden, Danbury, Stamford, and New London CT).",
      },
      {
        q: "How far in advance should we reserve event rentals in NH, MA, or CT?",
        a: "We recommend booking 4 to 12 weeks ahead for peak college spring weekends, high school post-prom lock-ins, and summer festivals, though last-minute dates can often be accommodated from our Hudson HQ.",
      },
    ],
  },
  "/college-school-corporate-events": {
    title: "College, School & Corporate Event Rentals | Next Level",
    description:
      "Turnkey college welcome week, high school post-prom, grad night, and corporate event rentals in NH, MA, New England & North Carolina.",
    keywords:
      "college campus event rentals, university welcome week entertainment, spring weekend rentals, high school post prom entertainment NH MA NC, project graduation party rentals, corporate event entertainment Boston Charlotte Raleigh",
    image: `${SITE_URL}/gaming-events-experience-3.jpg`,
    heroImageLocal: "/gaming-events-experience-3.jpg",
    canonicalPath: "/college-school-corporate-events",
    heroEyebrow: "TRUSTED BY 23+ UNIVERSITIES · HIGH SCHOOL POST-PROMS · CORPORATE",
    heroDisplayTitle: "College, School &\nCorporate Event Rentals",
    heroSubtitleOverride:
      "High-capacity, insured interactive entertainment for campus orientations, spring weekends, project graduation lock-ins, trade shows & company picnics across NH, MA, CT & North Carolina.",
    serviceName: "College Campus, High School Post-Prom & Corporate Event Rentals",
    heading: "College, School & Corporate Event Rentals in NH, MA & NC",
    summary:
      "Next Level Gaming & Novelties specializes in turnkey large-crowd entertainment for college student activities boards (welcome week, orientation, homecoming, spring weekend), high school post-prom and project graduation lock-ins, corporate family fun days, trade shows, summer camps, and municipal festivals across New Hampshire, Massachusetts, Connecticut, New England, and North Carolina.",
    subhead: "Commercial-Grade Multi-Attraction Production — Insured & Fully Staffed",
    details:
      "Trusted by Harvard University, Boston University, Penn State, Babson College, Quinnipiac University, Holy Cross, Springfield College, Emmanuel College, Bridgewater State, Fisher College, Dean College, New England College, Framingham State, Connecticut College, Salve Regina, Seton Hall, Fairleigh Dickinson, and SUNY Polytechnic.",
    highlights: [
      "High-throughput campus & post-prom attractions serving 100 to 5,000+ guests",
      "COI & comprehensive commercial liability insurance ready for risk management",
      "Popular campus mixes: Silent Disco, Custom Hat Bar, Pillow Dolls, VR Escape Rooms & Movie Nights",
      "Serving universities, schools & companies across NH, MA, CT & North Carolina",
    ],
    relatedLinks: [
      { label: "All 11 Custom Campus Novelties", href: "/novelties" },
      { label: "Live Gaming & Esports Production", href: "/gaming-events" },
      { label: "Glow Park LED Swings & Mini Golf", href: "/glow-park" },
      { label: "4-Player Mobile VR Escape Rooms", href: "/vr-escape-room-rental" },
      ...ALL_NH_LINKS_EXCEPT("/college-school-corporate-events"),
    ],
    faqs: [
      {
        q: "Are Next Level Gaming & Novelties events fully insured for university and school venues?",
        a: "Yes. We carry comprehensive commercial general liability insurance and supply certificates of insurance (COI) meeting university, school district, and municipal risk requirements.",
      },
      {
        q: "Which colleges and universities has Next Level Gaming & Novelties partnered with?",
        a: "Our crew has produced campus events for 23+ colleges and universities including Harvard, Boston University, Penn State, Babson College, Quinnipiac University, Holy Cross, Springfield College, Emmanuel College, Bridgewater State, Fisher College, Dean College, New England College, Framingham State, Connecticut College, Salve Regina, and Seton Hall.",
      },
      {
        q: "Can we bundle multiple attractions for a welcome week or post-prom lock-in?",
        a: "Yes! Most campus boards and post-prom committees bundle a 26 ft movie screen or Silent Disco with a 360 video booth, VR escape rooms, and custom novelty stations for seamless multi-hour entertainment.",
      },
    ],
  },
  "/hudson-nh-party-rentals": {
    title: "Hudson NH Party & Event Rentals | Next Level (03051 HQ)",
    description:
      "Local Hudson NH party & event equipment rentals on Rebel Rd (03051): 360 photo booths, inflatable movie screens, LED video walls, VR, glow swings & novelties.",
    areaServed: [
      { "@type": "City", name: "Hudson, NH" },
      { "@type": "City", name: "Litchfield, NH" },
      { "@type": "City", name: "Pelham, NH" },
      { "@type": "City", name: "Windham, NH" },
      { "@type": "City", name: "Londonderry, NH" },
      { "@type": "City", name: "Nashua, NH" },
      { "@type": "State", name: "New Hampshire" },
    ],
    keywords:
      "hudson nh party rentals, party rentals hudson nh, event rentals hudson nh, photo booth rental hudson nh, outdoor movie screen rental hudson nh, party equipment rentals hudson nh 03051, litchfield nh party rentals, pelham nh party rentals, windham nh party rentals, londonderry nh party rentals",
    image: `${SITE_URL}/about-big-screen.jpg`,
    heroImageLocal: "/about-big-screen.jpg",
    canonicalPath: "/hudson-nh-party-rentals",
    heroEyebrow: "REBEL RD, HUDSON, NH 03051 · HOME HEADQUARTERS",
    heroDisplayTitle: "Hudson, NH\nParty & Event Rentals",
    heroSubtitleOverride:
      "Dispatched directly from our Rebel Rd headquarters in Hudson, NH (03051): 360 photo booths, mirror photo booths, 16–40 ft movie screens, mobile LED walls, VR, glow swings, gaming events & custom novelties.",
    serviceName: "Hudson, NH Party Equipment Rentals & Custom Event Novelties",
    heading: "Hudson, NH Party Equipment Rentals & Event Entertainment (Rebel Rd, 03051)",
    summary:
      "Headquartered locally on Rebel Rd in Hudson, New Hampshire (03051), Next Level Gaming Events & Novelties is Hudson's home-grown party equipment rental service and custom event novelty provider serving Hudson, Litchfield, Pelham, Windham, Londonderry, Derry, Salem, Merrimack, and Nashua NH.",
    subhead: "Fastest Local NH Crew Dispatch for Schools, Parks, Backyards & Venues",
    details:
      "Whether planning an Alvirne High School post-prom, a Hudson NH backyard or Benson Park movie night, a corporate picnic, or a private milestone birthday, our Rebel Rd team handles delivery, commercial setup, live staffing, and teardown.",
    highlights: [
      "Headquartered locally at Rebel Rd, Hudson, NH 03051 — 978-601-5473",
      "Serving Hudson, Litchfield, Pelham, Windham, Londonderry & Greater Nashua",
      "Local Hudson Photo Booth NH, Outdoor Movie Screen & Glow Park rentals",
      "All 11 DIY Custom Novelties (Patched City Trucker Hats, Pillow Dolls & Socks)",
    ],
    relatedLinks: [
      { label: "Photo Booth & 360 Booth Rentals", href: "/photo-booth" },
      { label: "Outdoor Movie Screens & LED Walls", href: "/movie-nights" },
      { label: "Virtual Reality & VR Escape Rooms", href: "/virtual-reality" },
      { label: "Live Gaming Events & Esports", href: "/gaming-events" },
      ...ALL_NH_LINKS_EXCEPT("/hudson-nh-party-rentals"),
    ],
    offers: [
      {
        name: "Hudson NH Outdoor Movie Screen & Mobile LED Wall Rentals",
        description: "16–40 ft inflatable cinema screens and 14–20 ft daylight LED video wall trailers delivered from our Hudson NH 03051 headquarters.",
      },
      {
        name: "Hudson NH 360 Video Booth & Interactive Mirror Photo Booth Rentals",
        description: "Turnkey photo booth rentals with red carpet, studio lighting, custom overlays, and attendant in Hudson, Litchfield, Pelham, and Windham NH.",
      },
      {
        name: "Hudson NH Custom Event Novelties & Gaming Party Rentals",
        description: "Patched City trucker hats, pillow dolls, custom socks, VR escape rooms, glow swings, and multiplayer video gaming events.",
      },
    ],
    faqs: [
      {
        q: "Where is Next Level Gaming Events & Novelties located in Hudson, NH?",
        a: "Our main New England equipment warehouse and headquarters is located on Rebel Rd, Hudson, NH 03051, open daily for quotes and event bookings at 978-601-5473.",
      },
      {
        q: "Which neighboring towns around Hudson, NH (03051) do you serve fastest?",
        a: "Because our HQ is right on Rebel Rd in Hudson, NH, we provide rapid local delivery across Hudson, Litchfield, Pelham, Windham, Nashua, Londonderry, Derry, Salem, and Merrimack NH.",
      },
    ],
  },
  "/manchester-nh-event-rentals": {
    title: "Manchester NH Party Rentals, Photo Booths, Screens & VR",
    description:
      "Turnkey Manchester NH party & event rentals: 360 photo booths, mirror photo booths, giant outdoor movie screens, LED video walls, VR, glow park & novelties.",
    areaServed: [
      { "@type": "City", name: "Manchester, NH" },
      { "@type": "City", name: "Bedford, NH" },
      { "@type": "City", name: "Goffstown, NH" },
      { "@type": "City", name: "Hooksett, NH" },
      { "@type": "City", name: "Auburn, NH" },
      { "@type": "State", name: "New Hampshire" },
    ],
    keywords:
      "manchester nh party rentals, party rentals manchester nh, event rentals manchester nh, manchester nh photo booth rental, photo booth nh, outdoor movie screen rental manchester nh, bedford nh party rentals, goffstown nh party rentals, hooksett nh party rentals, SNHU campus event rentals, Saint Anselm college event rentals",
    image: `${SITE_URL}/gaming-events-experience-2.jpg`,
    heroImageLocal: "/gaming-events-experience-2.jpg",
    canonicalPath: "/manchester-nh-event-rentals",
    heroEyebrow: "MANCHESTER · BEDFORD · GOFFSTOWN · HOOKSETT · SNHU & ST. ANSELM",
    heroDisplayTitle: "Manchester, NH\nEvent & Party Rentals",
    heroSubtitleOverride:
      "Minutes north from our Hudson HQ: full-service Manchester NH photo booth rentals (360 & mirror booths), 16–40 ft movie screens, mobile LED walls, VR escape rooms, glow park & custom novelties.",
    serviceName: "Manchester, NH Party Equipment Rentals, Photo Booths & Event Production",
    heading: "Manchester, NH Event & Party Equipment Rentals — Photo Booths, Movie Screens & Novelties",
    summary:
      "Next Level Gaming Events & Novelties delivers turnkey party equipment rentals, 360 photo booths, mirror photo booths, outdoor inflatable movie screens, daylight mobile LED video wall trailers, Glow Park LED swings, Virtual Reality escape rooms, Silent Disco headphones, Sim Racing simulators, live gaming tournaments, and 11 custom novelty workshops across Manchester, Bedford, Goffstown, Hooksett, Auburn, and Candia, New Hampshire.",
    subhead: "Serving Manchester NH Campuses, Elm Street Venues, Ballrooms & Neighborhoods",
    details:
      "Only 20 minutes up the Everett Turnpike / I-93 from our Rebel Rd warehouse in Hudson NH, our insured event crew outfits Southern New Hampshire University (SNHU), Saint Anselm College, Manchester high schools, downtown Elm Street venues, and private celebrations.",
    highlights: [
      "20-minute crew dispatch from Hudson NH (03051) to Greater Manchester",
      "Manchester NH 360 Slow-Motion Video Booth & Magic Mirror Photo Booths",
      "SNHU, Saint Anselm College, Manchester high schools & Bedford weddings/galas",
      "Outdoor Movie Screens, Mobile LED Trailers, VR, Sim Racing & Novelties",
    ],
    relatedLinks: [
      { label: "Photo Booth NH & 360 Booths", href: "/photo-booth" },
      { label: "360 Slow-Motion Video Booth", href: "/360-video-booth" },
      { label: "Interactive Mirror Photo Booth", href: "/mirror-photo-booth-rental" },
      { label: "Outdoor Movie Screens & LED Walls", href: "/movie-nights" },
      ...ALL_NH_LINKS_EXCEPT("/manchester-nh-event-rentals"),
    ],
    offers: [
      {
        name: "Manchester NH 360 Photo Booth & Mirror Photo Booth Rentals",
        description: "Full-service 360 slow-motion video booths and touch-screen mirror photo booths for Manchester weddings, proms, and corporate galas.",
      },
      {
        name: "Manchester NH Giant Outdoor Movie Screen & LED Video Wall Rentals",
        description: "16–40 ft inflatable movie screens and 14–20 ft daylight mobile LED trailers with concert sound for Manchester parks, campuses, and tailgates.",
      },
    ],
    faqs: [
      {
        q: "How far is your warehouse from Manchester, NH?",
        a: "Our Rebel Rd headquarters in Hudson, NH (03051) is just 20 minutes south of Manchester, NH, allowing us to deliver and staff events across Manchester, Bedford, Goffstown, and Hooksett every day of the week.",
      },
      {
        q: "Do you provide photo booths and big screens for SNHU, Saint Anselm, and Manchester corporate venues?",
        a: "Yes! We supply commercially insured 360 and mirror photo booths, Silent Disco headphones, custom trucker hat bars, VR stations, and LED screens to colleges, schools, and Elm Street corporate events.",
      },
    ],
  },
  "/nashua-nh-event-rentals": {
    title: "Nashua NH Party Rentals — Photo Booths, Screens & Novelties",
    description:
      "Nashua NH party & event equipment rentals: 360 photo booths, mirror booths, outdoor movie screens, LED walls, VR, glow park & custom novelties.",
    areaServed: [
      { "@type": "City", name: "Nashua, NH" },
      { "@type": "City", name: "Hudson, NH" },
      { "@type": "City", name: "Merrimack, NH" },
      { "@type": "City", name: "Hollis, NH" },
      { "@type": "City", name: "Amherst, NH" },
      { "@type": "City", name: "Milford, NH" },
      { "@type": "State", name: "New Hampshire" },
    ],
    keywords:
      "nashua nh party rentals, party rentals nashua nh, event rentals nashua nh, nashua nh photo booth rental, outdoor movie screen rental nashua nh, merrimack nh party rentals, hollis nh party rentals, amherst nh party rentals, milford nh party rentals, Rivier University event rentals",
    image: `${SITE_URL}/photo-booth-experience-1.jpg`,
    heroImageLocal: "/photo-booth-experience-1.jpg",
    canonicalPath: "/nashua-nh-event-rentals",
    heroEyebrow: "NASHUA · MERRIMACK · HOLLIS · AMHERST · MILFORD · RIVIER UNIVERSITY",
    heroDisplayTitle: "Nashua, NH\nParty & Event Rentals",
    heroSubtitleOverride:
      "Right across the river from our Hudson NH HQ: Nashua party rentals, 360 photo booths, mirror booths, outdoor movie screens, mobile LED walls, VR escape rooms, glow park & DIY novelty bars.",
    serviceName: "Nashua, NH Party Equipment Rentals, Photo Booths & Custom Novelties",
    heading: "Nashua, NH Party & Event Equipment Rentals — Movie Screens, 360 Booths & Novelties",
    summary:
      "Just across the Taylor Falls Bridge from our Rebel Rd headquarters in Hudson, Next Level Gaming Events & Novelties provides turnkey Nashua NH party rentals, 360 photo booths, mirror photo booths, giant inflatable movie screens, mobile LED video wall trailers, VR escape rooms, Glow Park LED swings, Silent Disco headphones, Sim Racing cockpits, live gaming events, and custom novelty maker workshops across Nashua, Merrimack, Hollis, Brookline, Amherst, and Milford NH.",
    subhead: "Immediate Local Delivery Across Greater Nashua & Route 3 Corridor",
    details:
      "From Rivier University campus activities and Nashua North & South post-proms to Mine Falls Park concerts, country club weddings, corporate outings, and backyard celebrations, every rental includes delivery, setup, staffing, and teardown.",
    highlights: [
      "Immediate neighbor dispatch across the bridge from Rebel Rd, Hudson NH",
      "Serving all Nashua ZIPs (03060, 03062, 03063, 03064) plus Merrimack, Hollis & Amherst",
      "360 Video Booths, Mirror Photo Booths & 16–40 ft Outdoor Movie Screens",
      "Live Gaming Events, VR Escape Rooms, Sim Racing & 11 Custom Novelties",
    ],
    relatedLinks: [
      { label: "Photo Booth NH & 360 Booths", href: "/photo-booth" },
      { label: "Outdoor Movie Screens & LED Walls", href: "/movie-nights" },
      { label: "Sim Racing Cockpit Rentals", href: "/sim-racing" },
      { label: "Custom Event Novelties (All 11)", href: "/novelties" },
      ...ALL_NH_LINKS_EXCEPT("/nashua-nh-event-rentals"),
    ],
    offers: [
      {
        name: "Nashua NH Photo Booth, Movie Screen & Glow Park Rentals",
        description: "Turnkey 360 video booths, mirror photo booths, 16–40 ft inflatable movie screens, mobile LED walls, and LED glow swings in Nashua and Merrimack NH.",
      },
      {
        name: "Nashua NH Event AV Equipment, LED Video Walls & Concert Sound Rentals",
        description: "Commercial daylight mobile LED video walls, giant HD projection screens, concert-grade audio towers, and event AV production delivered to Nashua NH venues.",
      },
    ],
    faqs: [
      {
        q: "Do you serve Nashua, Merrimack, Hollis, and Amherst NH?",
        a: "Yes! Our Hudson NH headquarters borders Nashua directly across the Merrimack River, making Nashua, Merrimack, Hollis, Brookline, Amherst, and Milford our closest local service area.",
      },
    ],
  },
  "/portsmouth-nh-photo-booth-party-rentals": {
    title: "Portsmouth NH Photo Booth Rental | 360 & Mirror Booths",
    description:
      "Rent a 360 video booth or Magic Mirror photo booth in Portsmouth, NH. Red carpet, studio lighting, custom prints, props & crew. Fast quote!",
    areaServed: [
      { "@type": "City", name: "Portsmouth, NH" },
      { "@type": "City", name: "Rye, NH" },
      { "@type": "City", name: "New Castle, NH" },
      { "@type": "City", name: "Hampton, NH" },
      { "@type": "City", name: "Exeter, NH" },
      { "@type": "City", name: "Durham, NH" },
      { "@type": "City", name: "Dover, NH" },
      { "@type": "City", name: "Rochester, NH" },
      { "@type": "State", name: "New Hampshire" },
    ],
    keywords:
      "portsmouth nh photo booth rental, portsmouth photo booth rental, photo booth rental new hampshire, photo booth nh, nh photo booth rental, portsmouth nh party rentals, seacoast nh party rentals, dover nh party rentals, exeter nh party rentals, hampton nh party rentals, durham nh UNH event rentals, rochester nh party rentals, rye nh wedding photo booth rental",
    image: `${SITE_URL}/experience-360-video-booth.jpg`,
    heroImageLocal: "/experience-360-video-booth.jpg",
    canonicalPath: "/portsmouth-nh-photo-booth-party-rentals",
    heroEyebrow: "PORTSMOUTH · RYE · HAMPTON · EXETER · DOVER · UNH DURHAM",
    heroDisplayTitle: "Portsmouth, NH Photo\nBooth & Party Rentals",
    heroSubtitleOverride:
      "Premier Portsmouth NH photo booth rentals (360 slow-motion video booths & full-length mirror photo booths), giant outdoor movie screens, daylight LED walls, VR & custom novelties across Seacoast NH.",
    serviceName: "Portsmouth, NH & Seacoast Photo Booth Rentals & Party Equipment Services",
    heading: "Portsmouth, NH Photo Booth Rentals & Seacoast NH Event Equipment Rentals",
    summary:
      "Next Level Gaming Events & Novelties is the Seacoast's premier provider of Portsmouth photo booth rentals and Portsmouth NH photo booth rentals (360 slow-motion video booths and full-length interactive mirror photo booths), giant outdoor inflatable movie screens, daylight mobile LED video wall trailers, Glow Park LED swings, Silent Disco wireless headphones, Virtual Reality escape rooms, Sim Racing cockpits, live gaming events, and custom novelty stations across Portsmouth, Rye, New Castle, Hampton, Exeter, Stratham, Durham (UNH), Dover, Somersworth, and Rochester, New Hampshire.",
    subhead: "360 Video Booths, Interactive Mirror Photo Booths & Seacoast Event Production",
    details:
      "From waterfront weddings, private yacht club receptions, and corporate galas in downtown Portsmouth and Rye NH to University of New Hampshire (UNH) campus programs in Durham, boardwalk festivals in Hampton, and proms in Exeter and Dover—every photo booth and rental arrives 100% turnkey with VIP red carpet, lighting, props, custom overlays, and an attendant.",
    highlights: [
      "Portsmouth NH 360 Slow-Motion Video Booth & Magic Mirror Photo Booth Rentals",
      "Red carpet VIP entrance, studio ring lighting, props & instant QR/SMS downloads",
      "Dedicated Seacoast NH coverage: Portsmouth, Rye, Exeter, Hampton, Dover & UNH Durham",
      "Also delivering Outdoor Movie Screens, LED Walls, Silent Disco, VR & Custom Hat Bars",
    ],
    relatedLinks: [
      { label: "Full NH Photo Booth Packages", href: "/photo-booth" },
      { label: "360 Slow-Motion Video Booth Rental", href: "/360-video-booth" },
      { label: "Interactive Mirror Photo Booth Rental", href: "/mirror-photo-booth-rental" },
      { label: "Glow Park LED Swings & Mini Golf", href: "/glow-park" },
      { label: "Silent Disco Wireless Headphones", href: "/silent-disco" },
      ...ALL_NH_LINKS_EXCEPT("/portsmouth-nh-photo-booth-party-rentals"),
    ],
    offers: [
      {
        name: "Portsmouth NH 360 Slow-Motion Video Booth & Mirror Photo Booth Rental",
        description: "Red-carpet 360 video platform and full-length interactive mirror photo booth with custom Seacoast event overlays, props, and on-site attendant.",
      },
      {
        name: "Seacoast NH Outdoor Movie Screen, Glow Park & Silent Disco Rentals",
        description: "16–40 ft inflatable movie screens, 14–20 ft daylight mobile LED walls, LED glow swings, and 3-channel silent disco headphones across Portsmouth, Dover, Exeter, and Durham NH.",
      },
    ],
    faqs: [
      {
        q: "What is included in a Portsmouth NH photo booth rental?",
        a: "Every Portsmouth NH 360 video booth or interactive mirror photo booth rental includes delivery and setup at any Seacoast NH venue, red carpet and VIP stanchions, studio LED ring lighting, fun props, custom event overlay graphics, instant QR/SMS smartphone sharing, and a professional on-site booth attendant.",
      },
      {
        q: "Do you serve Rye, Hampton, Exeter, Dover, and Durham (UNH) around Portsmouth, NH?",
        a: "Yes! Our crew regularly serves Portsmouth, Rye, New Castle, Greenland, Stratham, Exeter, Hampton, Durham (UNH), Dover, Somersworth, and Rochester across Seacoast New Hampshire.",
      },
    ],
  },
  "/concord-salem-derry-nh-party-rentals": {
    title: "Concord, Salem & Derry NH Party Rentals | Next Level",
    description:
      "Turnkey party & event equipment rentals in Concord, Salem, Derry, Londonderry & Keene NH: 360 photo booths, movie screens, LED walls, VR, glow park & novelties.",
    keywords:
      "concord nh party rentals, salem nh party rentals, derry nh party rentals, londonderry nh party rentals, windham nh party rentals, keene nh event rentals, hanover nh event rentals, laconia nh party rentals, nh party rentals, nh event rentals",
    image: `${SITE_URL}/experience-glow-park.jpg`,
    heroImageLocal: "/experience-glow-park.jpg",
    canonicalPath: "/concord-salem-derry-nh-party-rentals",
    heroEyebrow: "SALEM · DERRY · LONDONDERRY · WINDHAM · CONCORD · LAKES & KEENE NH",
    heroDisplayTitle: "Concord, Salem &\nDerry NH Party Rentals",
    heroSubtitleOverride:
      "Full-service party & event equipment rentals along the I-93 & statewide NH corridors: 360 photo booths, mirror booths, 16–40 ft movie screens, LED video walls, VR, glow park & DIY novelty bars.",
    serviceName: "Concord, Salem, Derry & Londonderry NH Party & Event Equipment Rentals",
    heading: "Concord, Salem, Derry & Londonderry NH Party & Event Equipment Rentals",
    summary:
      "From Southern New Hampshire's I-93 corridor (Salem, Windham, Derry, and Londonderry NH) to the state capital in Concord, the Lakes Region (Laconia, Meredith), Keene, and Hanover/Lebanon NH, Next Level Gaming Events & Novelties delivers turnkey party rentals, 360 photo booths, mirror photo booths, giant outdoor movie screens, mobile LED video walls, VR escape rooms, Glow Park LED swings, Silent Disco headphones, Sim Racing cockpits, and custom novelty workshops.",
    subhead: "Statewide New Hampshire Event Production for Towns, Schools, Colleges & Parties",
    details:
      "Just minutes from our Rebel Rd Hudson NH warehouse, we outfit Salem/Windham/Derry/Londonderry events, Concord civic gatherings, New England College, Plymouth State, Keene State, Colby-Sawyer, Franklin Pierce, and Dartmouth campus celebrations.",
    highlights: [
      "Immediate proximity to Salem, Windham, Derry & Londonderry NH (Route 111 / I-93)",
      "Statewide NH travel to Concord, Henniker, Keene, Plymouth, Laconia & Hanover",
      "Full photo booth NH lineup, giant inflatable movie screens & LED video walls",
      "Commercial insurance & full crew handling delivery, setup and breakdown",
    ],
    relatedLinks: [
      { label: "Photo Booth NH & 360 Booths", href: "/photo-booth" },
      { label: "Outdoor Movie Screens & LED Walls", href: "/movie-nights" },
      { label: "Glow Park LED Swings & Mini Golf", href: "/glow-park" },
      { label: "All 11 Custom Event Novelties", href: "/novelties" },
      ...ALL_NH_LINKS_EXCEPT("/concord-salem-derry-nh-party-rentals"),
    ],
    offers: [
      {
        name: "Salem, Derry, Londonderry & Concord NH Event Rental Packages",
        description: "Full-service outdoor movie nights, 360 photo booths, mirror photo booths, glow swings, VR stations, esports tournaments, and custom novelty workshops across NH.",
      },
    ],
    faqs: [
      {
        q: "Do you deliver party and event rentals throughout all of New Hampshire?",
        a: "Yes! From our Hudson NH (03051) warehouse, we deliver, set up, and staff events in Salem, Derry, Londonderry, Windham, Concord, Henniker, Laconia, Keene, Hanover, Plymouth, and every town across New Hampshire.",
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
  "/cms": {
    title: "Website CMS | Next Level Gaming & Novelties",
    description: "Admin content management dashboard for Next Level Gaming & Novelties.",
    canonicalPath: "/cms",
    noindex: true,
  },
};

const BASE_HOME_FAQS = ROUTE_SEO["/"].faqs;

const AREA_SERVED = [
  { "@type": "City", name: "Hudson, NH" },
  { "@type": "City", name: "Nashua, NH" },
  { "@type": "City", name: "Manchester, NH" },
  { "@type": "City", name: "Portsmouth, NH" },
  { "@type": "City", name: "Concord, NH" },
  { "@type": "City", name: "Salem, NH" },
  { "@type": "City", name: "Derry, NH" },
  { "@type": "City", name: "Londonderry, NH" },
  { "@type": "City", name: "Dover, NH" },
  { "@type": "City", name: "Exeter, NH" },
  { "@type": "City", name: "Hampton, NH" },
  { "@type": "City", name: "Durham, NH" },
  { "@type": "City", name: "Boston, MA" },
  { "@type": "City", name: "Cambridge, MA" },
  { "@type": "City", name: "Lowell, MA" },
  { "@type": "City", name: "Worcester, MA" },
  { "@type": "City", name: "Springfield, MA" },
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
  { "@type": "City", name: "Cary, NC" },
  { "@type": "City", name: "Wilmington, NC" },
  { "@type": "City", name: "New Bern, NC" },
  { "@type": "City", name: "Greenville, NC" },
  { "@type": "City", name: "Providence, RI" },
  { "@type": "State", name: "New Hampshire" },
  { "@type": "State", name: "Massachusetts" },
  { "@type": "State", name: "North Carolina" },
  { "@type": "State", name: "Connecticut" },
  { "@type": "State", name: "Rhode Island" },
  { "@type": "State", name: "Maine" },
  { "@type": "State", name: "Vermont" },
];

const IMAGE_DIMENSIONS = {
  [`${SITE_URL}/hero-bg.jpg`]: { width: 1024, height: 436 },
  [`${SITE_URL}/gaming-events-experience-1.jpg`]: { width: 1280, height: 721 },
  [`${SITE_URL}/gaming-events-experience-2.jpg`]: { width: 1280, height: 624 },
  [`${SITE_URL}/gaming-events-experience-3.jpg`]: { width: 1280, height: 623 },
  [`${SITE_URL}/experience-movie-nights.jpg`]: { width: 1280, height: 720 },
  [`${SITE_URL}/movie-nights-led.jpg`]: { width: 1024, height: 576 },
  [`${SITE_URL}/movie-nights-experience-1.jpg`]: { width: 1280, height: 720 },
  [`${SITE_URL}/experience-trivia-nights.jpg`]: { width: 1280, height: 873 },
  [`${SITE_URL}/experience-virtual-reality.jpg`]: { width: 1440, height: 810 },
  [`${SITE_URL}/about-vr-event.jpeg`]: { width: 1200, height: 675 },
  [`${SITE_URL}/experience-360-video-booth.jpg`]: { width: 1280, height: 999 },
  [`${SITE_URL}/photo-booth-experience-1.jpg`]: { width: 1440, height: 703 },
  [`${SITE_URL}/photo-booth-experience-2.jpg`]: { width: 505, height: 446 },
  [`${SITE_URL}/experience-just-dance.jpg`]: { width: 1440, height: 810 },
  [`${SITE_URL}/experience-silent-disco.jpg`]: { width: 827, height: 467 },
  [`${SITE_URL}/experience-sim-racing.jpg`]: { width: 1280, height: 960 },
  [`${SITE_URL}/experience-glow-park.jpg`]: { width: 1024, height: 768 },
  [`${SITE_URL}/glow-park-experience-1.jpg`]: { width: 768, height: 1024 },
  [`${SITE_URL}/novelties-bg.jpg`]: { width: 1024, height: 420 },
  [`${SITE_URL}/novelty-cards/patch-city.jpg`]: { width: 900, height: 667 },
  [`${SITE_URL}/novelty-cards/pillow-dolls.jpg`]: { width: 900, height: 667 },
  [`${SITE_URL}/novelty-cards/wood-metal-keychains.jpg`]: { width: 900, height: 599 },
  [`${SITE_URL}/novelty-cards/custom-socks.jpg`]: { width: 900, height: 562 },
  [`${SITE_URL}/about-gaming-event.jpg`]: { width: 1440, height: 960 },
  [`${SITE_URL}/about-big-screen.jpg`]: { width: 1024, height: 682 },
};

module.exports = {
  SITE_URL,
  DEFAULT_IMAGE,
  IMAGE_DIMENSIONS,
  NH_CITY_LINKS,
  REGIONAL_LINKS,
  SPECIALTY_LINKS,
  ROUTE_SEO,
  BASE_HOME_FAQS,
  AREA_SERVED,
};

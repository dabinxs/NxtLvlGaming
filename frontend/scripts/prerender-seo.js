const fs = require("fs");
const path = require("path");

const SITE_URL = "https://nextlevelgamingevents.com";
const DEFAULT_IMAGE = `${SITE_URL}/hero-bg.png`;

const ROUTES = {
  "/gaming-events": {
    title: "Video Gaming Event Rentals & Esports Tournaments in NH, MA & New England | Next Level Gaming",
    description:
      "Rent full-scale multiplayer video gaming events and esports tournament setups in Hudson, Manchester & Nashua NH, Massachusetts, and New England. Includes 12 ft to 40 ft HD screens, PlayStation, Xbox, Nintendo Switch, retro consoles, and on-site staff.",
    keywords:
      "gaming events Hudson NH, video gaming event rental New Hampshire, esports tournament production NH MA, mobile video game party rental Manchester NH, Nashua NH gaming party, college gaming event rental New England, giant screen gaming rental, Next Level Gaming",
    image: `${SITE_URL}/gaming-events-experience-1.png`,
    canonicalPath: "/gaming-events",
    serviceName: "Video Gaming Event Rentals & Esports Tournament Production",
    heading: "Video Gaming Event Rentals & Esports Tournaments in Hudson, NH & New England",
    summary:
      "Turnkey multiplayer video gaming party rentals and bracketed esports tournaments featuring Deluxe (four 12 ft HD screens + giant 21–32 ft screen), Ultimate (eight 12 ft HD screens + giant 26 ft screen), and Tournament packages across Xbox, PlayStation, Nintendo Switch, and retro NES consoles.",
  },
  "/movie-nights": {
    title: "Outdoor Movie Screen Rentals & Mobile LED Video Wall Trailers in NH & MA | Next Level Gaming",
    description:
      "Rent giant inflatable outdoor movie screens (16 ft to 40 ft) and daylight mobile LED video wall trailers (14 ft to 20 ft) with concert-grade audio in Hudson NH, Manchester NH, Massachusetts, and across New England.",
    keywords:
      "outdoor movie screen rental NH, inflatable movie screen rental New Hampshire, mobile LED video wall trailer rental MA NH, backyard movie night rental Hudson NH, drive-in movie screen rental New England, campus outdoor cinema rental, Next Level Gaming",
    image: `${SITE_URL}/experience-movie-nights.png`,
    canonicalPath: "/movie-nights",
    serviceName: "Outdoor Inflatable Movie Screen & Mobile LED Video Wall Rentals",
    heading: "Outdoor Inflatable Movie Screen & Mobile LED Video Wall Trailer Rentals",
    summary:
      "Rent daylight-bright Mobile LED Video Wall Trailers (14 ft, 16 ft, 20 ft) and giant Inflatable Outdoor Movie Screens (16 ft, 21 ft, 26 ft, and 40 ft drive-in screens) with concert-grade audio and full setup crew in Hudson NH, Massachusetts, and New England.",
  },
  "/trivia-nights": {
    title: "Interactive Trivia Night Host & Live Game Show Event Rentals in NH & New England | Next Level Gaming",
    description:
      "Book high-energy interactive trivia nights and live game show entertainment for colleges, schools, corporate events, and parties in Hudson NH, Massachusetts, and New England with live hosts, wireless buzzers, and giant screen leaderboards.",
    keywords:
      "interactive trivia night rental NH, live trivia host New Hampshire Massachusetts, college trivia night entertainment, corporate game show rental New England, wireless buzzer trivia event, Next Level Gaming",
    image: `${SITE_URL}/experience-trivia-nights.png`,
    canonicalPath: "/trivia-nights",
    serviceName: "Interactive Trivia Night & Game Show Event Rentals",
    heading: "Interactive Trivia Nights & Live Game Show Event Rentals",
    summary:
      "Professionally hosted interactive trivia nights with wireless digital buzzers, custom themed rounds, and real-time leaderboards on giant screens up to 32 ft for colleges, corporate events, and venues.",
  },
  "/virtual-reality": {
    title: "Virtual Reality (VR) Event Rentals & Mobile VR Escape Rooms in NH & MA | Next Level Gaming",
    description:
      "Rent immersive room-scale Virtual Reality (VR) stations and 4-player cooperative VR escape rooms for events, parties, colleges, and corporate gatherings in Hudson NH, Manchester NH, Boston MA, and across New England.",
    keywords:
      "virtual reality event rental NH, VR party rental New Hampshire Massachusetts, mobile VR escape room rental, Beat Saber event rental, college VR entertainment New England, Next Level Gaming",
    image: `${SITE_URL}/experience-virtual-reality.png`,
    canonicalPath: "/virtual-reality",
    serviceName: "Virtual Reality (VR) Event Stations & Mobile VR Escape Rooms",
    heading: "Virtual Reality (VR) Event Stations & Multiplayer VR Escape Room Rentals",
    summary:
      "Room-scale VR stations with spectator screens, on-site attendants, popular VR games (Beat Saber, SUPERHOT VR, Job Simulator, Walkabout Mini Golf, Pistol Whip), and 4-player VR escape adventures (Dragon Tower, Depths of Osiris, Manor Escape, Time Travel Paradox).",
  },
  "/photo-booth": {
    title: "360 Video Booth & Mirror Photobooth Rentals in Hudson NH, MA & New England | Next Level Gaming",
    description:
      "Rent a 360 slow-motion video booth or interactive full-length mirror photobooth with props, custom overlays, and on-site staff for weddings, parties, colleges, and corporate events in New Hampshire, Massachusetts, and New England.",
    keywords:
      "360 photo booth rental NH, 360 video booth rental New Hampshire Massachusetts, mirror photobooth rental Hudson NH, Manchester NH photo booth rental, event photobooth rental New England, Next Level Gaming",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "360 Video Booth & Interactive Mirror Photobooth Rentals",
    heading: "360 Video Booth & Interactive Mirror Photobooth Rentals in NH & New England",
    summary:
      "Capture shareable event memories with our 360 slow-motion video booth and interactive full-length mirror photobooth, complete with party props, custom event overlays, and full staffing.",
  },
  "/360-video-booth": {
    title: "360 Video Booth & Mirror Photobooth Rentals in Hudson NH, MA & New England | Next Level Gaming",
    description:
      "Rent a 360 slow-motion video booth or interactive full-length mirror photobooth with props, custom overlays, and on-site staff for events in New Hampshire, Massachusetts, and New England.",
    keywords:
      "360 video booth rental NH, 360 photo booth rental New Hampshire, mirror photobooth rental MA, Next Level Gaming",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "360 Video Booth & Interactive Mirror Photobooth Rentals",
    heading: "360 Video Booth & Interactive Mirror Photobooth Rentals",
    summary:
      "Capture shareable event memories with our 360 slow-motion video booth and interactive full-length mirror photobooth.",
  },
  "/360-booth": {
    title: "360 Video Booth & Mirror Photobooth Rentals in Hudson NH, MA & New England | Next Level Gaming",
    description:
      "Rent a 360 slow-motion video booth or interactive full-length mirror photobooth with props, custom overlays, and on-site staff for events in New Hampshire, Massachusetts, and New England.",
    keywords:
      "360 booth rental NH, 360 video booth rental New England, mirror photobooth rental, Next Level Gaming",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "360 Video Booth & Interactive Mirror Photobooth Rentals",
    heading: "360 Video Booth & Interactive Mirror Photobooth Rentals",
    summary:
      "Capture shareable event memories with our 360 slow-motion video booth and interactive full-length mirror photobooth.",
  },
  "/just-dance": {
    title: "Just Dance Party Rentals & Giant Screen Dance Events in NH & New England | Next Level Gaming",
    description:
      "Bring multiplayer Just Dance battles on giant HD screens with concert sound and lighting to your college campus, school, or event in Hudson NH, Massachusetts, and across New England.",
    keywords:
      "Just Dance event rental, giant screen dance party rental NH MA, college Just Dance party New England, interactive dance game rental, Next Level Gaming",
    image: `${SITE_URL}/experience-just-dance.png`,
    canonicalPath: "/just-dance",
    serviceName: "Just Dance Giant-Screen Event Rentals",
    heading: "Just Dance Giant-Screen Event & Party Rentals",
    summary:
      "Multiplayer Just Dance battles on giant HD displays with concert sound, lighting, and live score tracking for colleges, schools, and community events.",
  },
  "/silent-disco": {
    title: "Silent Disco Headphone Rentals & LED Dance Parties in NH, MA & New England | Next Level Gaming",
    description:
      "Rent tri-color LED wireless Silent Disco headphones with up to 3 simultaneous DJ/music channels for 50 to 5,000+ guests in Hudson NH, Manchester NH, Boston MA, and across New England.",
    keywords:
      "silent disco rental NH, silent disco headphone rental New Hampshire Massachusetts, LED headphone party rental New England, college silent disco event, Next Level Gaming",
    image: `${SITE_URL}/experience-silent-disco.png`,
    canonicalPath: "/silent-disco",
    serviceName: "Silent Disco Wireless Headphone Party Rentals",
    heading: "Silent Disco LED Wireless Headphone Party Rentals in NH & New England",
    summary:
      "Tri-color LED wireless headphones with up to 3 simultaneous DJ or music channels, scaling from 50 to 5,000+ guests indoors or outdoors with zero noise complaints.",
  },
  "/sim-racing": {
    title: "Sim Racing Simulator Rentals & Motorsport Event Cockpits in NH & New England | Next Level Gaming",
    description:
      "Rent pro force-feedback Sim Racing simulator cockpits with bucket racing seats, giant-screen telemetry, and fastest-lap leaderboards for corporate events, colleges, and parties in NH, MA, and New England.",
    keywords:
      "sim racing rental NH MA, racing simulator event rental New England, force feedback racing cockpit rental, corporate motorsport simulator event, Next Level Gaming",
    image: `${SITE_URL}/experience-sim-racing.png`,
    canonicalPath: "/sim-racing",
    serviceName: "Sim Racing Cockpit Simulator Event Rentals",
    heading: "Sim Racing Cockpit Simulator Rentals for Events & Tournaments",
    summary:
      "Force-feedback racing simulator cockpits, bucket racing seats, giant-screen telemetry, and fastest-lap tournament leaderboards managed by our event crew.",
  },
  "/glow-park": {
    title: "Glow Park Experience Rentals — LED Glow Swings, Seesaws & Mini Golf in NH & New England | Next Level Gaming",
    description:
      "Rent the full Glow Park Experience featuring 8 illuminated LED glow swings, 4 glowing seesaws, colorful venue uplighting, and glowing mini golf for colleges, festivals, and events in NH, MA, and New England.",
    keywords:
      "glow park rental, LED glow swings rental NH MA, illuminated seesaws event rental, glow mini golf rental New England, college glow night party rental, Next Level Gaming",
    image: `${SITE_URL}/experience-glow-park.jpg`,
    canonicalPath: "/glow-park",
    serviceName: "Glow Park Experience — Illuminated Swings, Seesaws & Mini Golf Rentals",
    heading: "Glow Park Experience Rentals — 8 LED Glow Swings, 4 Glow Seesaws & Glowing Mini Golf",
    summary:
      "Light up any indoor or outdoor venue with 8 illuminated glow swings, 4 social glow seesaws, colorful venue uplighting, and an interactive glowing mini-golf course.",
  },
  "/novelties": {
    title: "Custom Event Novelties & Interactive Maker Workshops in NH & New England | Next Level Gaming & Novelties",
    description:
      "Book hands-on custom novelty stations for colleges, schools, and events: Patched City custom trucker hats & beanies, custom socks, sequin pillows, pillow dolls, bead & intention bracelets, stamped rings, custom license plates, and laser-engraved wood & metal keychains.",
    keywords:
      "custom event novelties rental, college novelty event ideas, custom trucker hat bar rental, Patched City hats, laser engraved keychains event, custom pillow dolls college event, sequin pillows novelty, Next Level Gaming and Novelties",
    image: `${SITE_URL}/novelties-bg.png`,
    canonicalPath: "/novelties",
    serviceName: "Custom Event Novelties & On-Site Maker Workshops",
    heading: "Custom Event Novelties & Interactive Maker Workshops",
    summary:
      "Interactive custom novelty stations where guests make and take home Patched City trucker hats & beanies, custom socks, Bead-tastics & intention bracelets, custom pillow dolls, sequin pillows, laser-engraved wood & metal keychains, stamped rings, Silly Sacks plush bags, and custom license plates.",
  },
  "/about": {
    title: "About Next Level Gaming & Novelties | Event Entertainment & Rental Company in Hudson, NH",
    description:
      "Founded by Calvin Reid and Yaw Boateng in New Hampshire, Next Level Gaming & Novelties brings 10+ years of turnkey gaming events, giant movie screens, VR, photo booths, and custom novelty production to New England and the East Coast.",
    keywords:
      "About Next Level Gaming, Calvin Reid, Yaw Boateng, Hudson NH event rental company, Manchester NH gaming events, New England college entertainment company",
    image: `${SITE_URL}/about-gaming-event.jpg`,
    canonicalPath: "/about",
    heading: "About Next Level Gaming & Novelties — Founded by Calvin Reid & Yaw Boateng",
    summary:
      "Based in Hudson, NH, Next Level Gaming & Novelties brings over 10 years of event production experience in multiplayer gaming, esports, big-screen outdoor and LED cinema, VR, and interactive novelty workshops.",
  },
  "/contact": {
    title: "Contact Next Level Gaming & Novelties | Event Rentals in Hudson, NH (978-601-5473)",
    description:
      "Contact Next Level Gaming & Novelties in Hudson, NH to book gaming events, outdoor movie screens, VR, 360 photo booths, silent disco, glow parks, or custom novelties. Email sales@nextlevelgamingevents.com or call 978-601-5473.",
    keywords:
      "contact Next Level Gaming, Hudson NH event rentals phone number, 978-601-5473, sales@nextlevelgamingevents.com, book gaming event NH MA",
    image: DEFAULT_IMAGE,
    canonicalPath: "/contact",
    heading: "Contact Next Level Gaming & Novelties — Hudson, NH",
    summary:
      "Plan your next gaming event, outdoor movie night, VR experience, photo booth, or custom novelty workshop. Email sales@nextlevelgamingevents.com or call 978-601-5473.",
  },
  "/quote": {
    title: "Get an Event Rental Quote | Next Level Gaming & Novelties (Hudson, NH & New England)",
    description:
      "Request a custom quote for video gaming events, outdoor & LED movie screen rentals, VR, 360 photo booths, silent disco, sim racing, glow parks, trivia nights, or custom novelties across NH, MA, and New England.",
    keywords:
      "gaming event rental quote, outdoor movie screen rental pricing NH MA, book college event entertainment, Next Level Gaming quote",
    image: DEFAULT_IMAGE,
    canonicalPath: "/quote",
    heading: "Request an Event Entertainment or Novelty Rental Quote",
    summary:
      "Build your custom event package and get a fast quote for gaming events, movie screens, VR, 360 photo booths, silent disco, sim racing, glow parks, or custom novelties.",
  },
  "/novelty-order": {
    title: "Order Custom Event Novelties & Maker Stations | Next Level Gaming & Novelties",
    description:
      "Request pricing and book custom event novelty stations—trucker hats, beanies, custom socks, bracelets, pillow dolls, sequin pillows, keychains, rings, and license plates—for your campus or corporate event.",
    keywords:
      "order custom event novelties, college novelty workshop booking, bulk custom event souvenirs, Next Level Gaming novelties",
    image: `${SITE_URL}/novelties-bg.png`,
    canonicalPath: "/novelty-order",
    heading: "Order Custom Event Novelties & Maker Workshops",
    summary:
      "Request pricing for Patched City hats & beanies, custom socks, bracelets, pillow dolls, sequin pillows, laser-engraved keychains, stamped rings, Silly Sacks, and custom license plates.",
  },
  "/build-novelty": {
    title: "Novelty Customization Studio | Next Level Gaming & Novelties",
    description: "Design and customize novelty items with Next Level Gaming & Novelties.",
    canonicalPath: "/build-novelty",
    noindex: true,
  },
  "/build": {
    title: "Novelty Customization Studio | Next Level Gaming & Novelties",
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
          { "@type": "State", name: "New Hampshire" },
          { "@type": "State", name: "Massachusetts" },
          { "@type": "State", name: "Connecticut" },
          { "@type": "State", name: "Rhode Island" },
          { "@type": "State", name: "Maine" },
          { "@type": "State", name: "Vermont" },
        ],
      });
    }
    const routeSchemaTag = `<script id="seo-route-schema" type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@graph": routeGraph,
    })}</script>`;
    html = html.replace("</head>", `${routeSchemaTag}</head>`);
  }

  if (seo.heading && seo.summary) {
    const noscriptHtml = `<noscript><h1>${escapeHtml(seo.heading)}</h1><p>${escapeHtml(
      seo.summary
    )}</p><p><a href="/">Next Level Gaming &amp; Novelties Home</a> | <a href="/quote">Get a Quote</a> | <a href="/contact">Contact Us (978-601-5473)</a></p></noscript>`;
    html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, noscriptHtml);
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
    const routeDir = path.join(buildDir, cleanRoute);
    fs.mkdirSync(routeDir, { recursive: true });
    const outHtml = buildRouteHtml(baseHtml, routeKey, seo);
    fs.writeFileSync(path.join(routeDir, "index.html"), outHtml, "utf8");
    count++;
  }

  console.log(`Pre-rendered SEO HTML for ${count} routes in build/`);
}

run();

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://nextlevelgamingevents.com";
const DEFAULT_IMAGE = `${SITE_URL}/hero-bg.png`;

const ROUTES = {
  "/gaming-events": {
    title: "Video Gaming Event Rentals & Esports in NH | Next Level",
    description:
      "Rent multiplayer video gaming events and esports tournaments in Hudson NH, MA & New England with 12–40 ft HD screens, consoles, and event staff.",
    keywords:
      "gaming events Hudson NH, video gaming event rental New Hampshire, esports tournament production NH MA, mobile video game party rental Manchester NH, Nashua NH gaming party, college gaming event rental New England, high school post prom video game party, Super Smash Bros tournament rental, Mario Kart event rental Boston MA",
    image: `${SITE_URL}/gaming-events-experience-1.png`,
    canonicalPath: "/gaming-events",
    serviceName: "Video Gaming Event Rentals & Esports Tournament Production",
    heading: "Video Gaming Event Rentals & Esports in NH, MA & New England",
    summary:
      "Next Level Gaming & Novelties delivers full-scale multiplayer video gaming event rentals and bracketed esports tournament productions across Hudson, Nashua, Manchester, Salem, Derry, and Concord, New Hampshire, Greater Boston and Massachusetts, and New England. Choose from our Deluxe Package (four 12 ft HD screens plus a giant 21 to 32 ft HD screen), Ultimate Package (eight 12 ft HD screens plus a 26 ft jumbo screen and virtual smartphone DJ dance party), or Esports Tournament Package with PlayStation 5, Xbox Series X, Nintendo Switch, and classic retro NES consoles for college campus events, high school post-proms, corporate events, and private parties.",
  },
  "/movie-nights": {
    title: "Outdoor Movie Screen & LED Wall Rentals NH | Next Level",
    description:
      "Rent giant inflatable outdoor movie screens (16–40 ft) and daylight mobile LED video wall trailers (14–20 ft) with concert audio in NH, MA & New England.",
    keywords:
      "outdoor movie screen rental NH, inflatable movie screen rental New Hampshire, mobile LED video wall trailer rental MA NH, backyard movie night rental Hudson NH, drive-in movie screen rental New England, college quad movie night rental Boston MA, daylight LED screen rental for festivals",
    image: `${SITE_URL}/experience-movie-nights.png`,
    canonicalPath: "/movie-nights",
    serviceName: "Outdoor Inflatable Movie Screen & Mobile LED Video Wall Rentals",
    heading: "Outdoor Movie Screen & Mobile LED Video Wall Rentals in NH & MA",
    summary:
      "Next Level Gaming & Novelties provides turnkey outdoor movie screen rentals and daylight mobile LED video wall trailers across Hudson NH, Nashua, Manchester, Greater Boston, Massachusetts, and New England. Choose from 14 ft, 16 ft, and 20 ft mobile LED video wall screens or 16 ft, 21 ft, 26 ft, and 40 ft giant inflatable cinema screens with concert-grade audio towers, FM drive-in radio broadcast capability, and full crew setup for college quads, town parks, schools, and backyard movie nights.",
  },
  "/trivia-nights": {
    title: "Interactive Trivia Night & Game Show Rentals | Next Level",
    description:
      "Book live-hosted interactive trivia nights for colleges, schools, and corporate events in Hudson NH, MA & New England with digital buzzers and big screens.",
    keywords:
      "interactive trivia night rental NH, live trivia host New Hampshire Massachusetts, college trivia night entertainment, corporate game show rental New England, team building trivia event Boston MA, wireless buzzer game show rental",
    image: `${SITE_URL}/experience-trivia-nights.png`,
    canonicalPath: "/trivia-nights",
    serviceName: "Interactive Trivia Night & Game Show Event Rentals",
    heading: "Interactive Trivia Night & Live Game Show Rentals in NH & New England",
    summary:
      "Bring live-hosted interactive trivia night and game show rentals to your college campus, corporate team-building event, school, or venue with Next Level Gaming & Novelties across Hudson NH, Massachusetts, and New England. Includes professional live hosts, wireless digital team buzzers, custom themed trivia categories, and real-time leaderboards projected on giant displays up to 32 feet.",
  },
  "/virtual-reality": {
    title: "Virtual Reality & VR Escape Room Rentals NH | Next Level",
    description:
      "Rent room-scale Virtual Reality stations and 4-player cooperative VR escape rooms with spectator screens and staff in Hudson NH, MA & New England.",
    keywords:
      "virtual reality event rental NH, VR party rental New Hampshire Massachusetts, mobile VR escape room rental, college VR entertainment New England, corporate VR activation Boston MA, Beat Saber event rental",
    image: `${SITE_URL}/experience-virtual-reality.png`,
    canonicalPath: "/virtual-reality",
    serviceName: "Virtual Reality (VR) Event Stations & Mobile VR Escape Rooms",
    heading: "Virtual Reality & Mobile VR Escape Room Rentals in NH & New England",
    summary:
      "Rent immersive room-scale Virtual Reality stations and 4-player cooperative VR escape room adventures from Next Level Gaming & Novelties in Hudson NH, Nashua, Manchester, Boston MA, and New England. Features motion-tracked VR headsets, live spectator monitors, friendly on-site staff, and hit titles including Beat Saber, SUPERHOT VR, Job Simulator, Walkabout Mini Golf, Pistol Whip, Dragon Tower, Depths of Osiris, Manor Escape, and Time Travel Paradox.",
  },
  "/photo-booth": {
    title: "360 Video Booth & Mirror Photobooth Rentals | Next Level",
    description:
      "Rent a 360 slow-motion video booth or interactive full-length mirror photobooth with props, custom overlays, and staff in Hudson NH, MA & New England.",
    keywords:
      "360 photo booth rental NH, 360 video booth rental New Hampshire Massachusetts, mirror photobooth rental Hudson NH, event photobooth rental New England, college formal photo booth Boston MA, corporate gala 360 booth rental",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "360 Video Booth & Interactive Mirror Photobooth Rentals",
    heading: "360 Video Booth & Mirror Photobooth Rentals in Hudson NH & New England",
    summary:
      "Capture and share unforgettable memories with 360 slow-motion video booth and interactive full-length mirror photobooth rentals from Next Level Gaming & Novelties in Hudson NH, Massachusetts, and New England. Every rental includes VIP stanchions, studio LED lighting, party props, custom event overlays, instant SMS and QR digital sharing, and a dedicated on-site attendant.",
  },
  "/360-video-booth": {
    title: "360 Video Booth & Mirror Photobooth Rentals | Next Level",
    description:
      "Rent a 360 slow-motion video booth or interactive full-length mirror photobooth with props, custom overlays, and staff in Hudson NH, MA & New England.",
    keywords:
      "360 video booth rental NH, 360 photo booth rental New Hampshire, mirror photobooth rental MA",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "360 Video Booth & Interactive Mirror Photobooth Rentals",
    heading: "360 Video Booth & Mirror Photobooth Rentals",
    summary:
      "Capture shareable event memories with our 360 slow-motion video booth and interactive full-length mirror photobooth rentals across New Hampshire, Massachusetts, and New England.",
  },
  "/360-booth": {
    title: "360 Video Booth & Mirror Photobooth Rentals | Next Level",
    description:
      "Rent a 360 slow-motion video booth or interactive full-length mirror photobooth with props, custom overlays, and staff in Hudson NH, MA & New England.",
    keywords:
      "360 booth rental NH, 360 video booth rental New England, mirror photobooth rental",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "360 Video Booth & Interactive Mirror Photobooth Rentals",
    heading: "360 Video Booth & Mirror Photobooth Rentals",
    summary:
      "Capture shareable event memories with our 360 slow-motion video booth and interactive full-length mirror photobooth rentals across New Hampshire, Massachusetts, and New England.",
  },
  "/just-dance": {
    title: "Just Dance Giant Screen Event Party Rentals | Next Level",
    description:
      "Bring multiplayer Just Dance battles on giant HD screens with concert sound and lighting to your college, school, or event in NH, MA & New England.",
    keywords:
      "Just Dance event rental, giant screen dance party rental NH MA, college Just Dance party New England, interactive dance game rental Boston MA, high school post prom dance party",
    image: `${SITE_URL}/experience-just-dance.png`,
    canonicalPath: "/just-dance",
    serviceName: "Just Dance Giant-Screen Event Rentals",
    heading: "Just Dance Giant Screen Event Party Rentals in NH & New England",
    summary:
      "Turn any campus center, school gymnasium, or event venue into an interactive dance floor with Just Dance giant screen event party rentals from Next Level Gaming & Novelties in Hudson NH, Massachusetts, and New England. Guests follow the on-screen coach, battle head-to-head on massive 12 ft to 32 ft displays, and track scores with concert-grade audio and stage lighting.",
  },
  "/silent-disco": {
    title: "Silent Disco LED Headphone Party Rentals NH | Next Level",
    description:
      "Rent tri-color LED wireless Silent Disco headphones with 3 simultaneous DJ channels for 50 to 5,000+ guests in Hudson NH, Boston MA & New England.",
    keywords:
      "silent disco rental NH, silent disco headphone rental New Hampshire Massachusetts, LED headphone party rental New England, college silent disco party Boston MA, 3 channel wireless headphone rental",
    image: `${SITE_URL}/experience-silent-disco.png`,
    canonicalPath: "/silent-disco",
    serviceName: "Silent Disco Wireless Headphone Party Rentals",
    heading: "Silent Disco LED Headphone Party Rentals in NH, MA & New England",
    summary:
      "Throw the loudest quiet party on campus or outdoors with Silent Disco LED wireless headphone party rentals from Next Level Gaming & Novelties in Hudson NH, Boston MA, and New England. Features up to three concurrent DJ or music channels, channel-synced red/green/blue LED earcup glow, and scalable packages from 50 to 5,000+ guests with zero noise complaints.",
  },
  "/sim-racing": {
    title: "Sim Racing Cockpit Simulator Event Rentals | Next Level",
    description:
      "Rent force-feedback Sim Racing simulator cockpits with bucket seats, giant-screen telemetry, and lap leaderboards for events in NH, MA & New England.",
    keywords:
      "sim racing rental NH MA, racing simulator event rental New England, force feedback racing cockpit rental, corporate trade show racing simulator Boston MA, college motorsport gaming rental",
    image: `${SITE_URL}/experience-sim-racing.png`,
    canonicalPath: "/sim-racing",
    serviceName: "Sim Racing Cockpit Simulator Event Rentals",
    heading: "Sim Racing Cockpit Simulator Event Rentals in NH & New England",
    summary:
      "Bring motorsport excitement to your corporate activation, trade show, college event, or party with Sim Racing cockpit simulator rentals from Next Level Gaming & Novelties across Hudson NH, Massachusetts, and New England. Includes force-feedback steering wheels, responsive pedals, authentic bucket racing seats, giant-screen telemetry displays, and fastest-lap tournament leaderboards managed by our staff.",
  },
  "/glow-park": {
    title: "Glow Park Swings, Seesaws & Mini Golf Rental | Next Level",
    description:
      "Rent the Glow Park Experience with 8 LED glow swings, 4 glowing seesaws, colorful venue uplighting, and glowing mini golf in NH, MA & New England.",
    keywords:
      "glow park rental, LED glow swings rental NH MA, illuminated seesaws event rental, glow mini golf rental New England, college glow night attraction Boston MA, LED furniture and swing rental",
    image: `${SITE_URL}/experience-glow-park.jpg`,
    canonicalPath: "/glow-park",
    serviceName: "Glow Park Experience — Illuminated Swings, Seesaws & Mini Golf Rentals",
    heading: "Glow Park Swings, Seesaws & Mini Golf Rental in NH & New England",
    summary:
      "Transform indoor gyms, ballrooms, or outdoor campus quads with the full Glow Park Experience rental from Next Level Gaming & Novelties in Hudson NH, Massachusetts, and New England. Includes eight illuminated LED glow swings, four social glowing seesaws, vibrant room and venue uplighting, and an interactive glowing mini-golf course.",
  },
  "/novelties": {
    title: "Custom Event Novelties & Maker Workshops NH | Next Level",
    description:
      "Book interactive custom novelty workshops: Patched City trucker hats, beanies, socks, sequin pillows, pillow dolls, bracelets, rings & laser keychains.",
    keywords:
      "custom event novelties rental, college novelty event ideas, custom trucker hat bar rental, Patched City hats, laser engraved keychains event, make your own stuffed animal college event, custom photo pillow dolls, reversible sequin pillows",
    image: `${SITE_URL}/novelties-bg.png`,
    canonicalPath: "/novelties",
    serviceName: "Custom Event Novelties & On-Site Maker Workshops",
    heading: "Custom Event Novelties & Maker Workshops in NH, MA & New England",
    summary:
      "Next Level Gaming & Novelties brings hands-on custom event novelties and interactive maker workshops to colleges, schools, summer camps, and corporate events across Hudson NH, New Hampshire, Massachusetts, and New England. Guests design and take home Patched City custom trucker hats and beanies, custom socks, Bead-tastics and intention bracelets, custom pillow dolls, reversible sequin pillows, laser-engraved wood and metal keychains, stamped custom rings, Silly Sacks plush bags, and custom license plates.",
  },
  "/about": {
    title: "About Next Level Gaming & Novelties | Hudson NH Team",
    description:
      "Founded by Calvin Reid and Yaw Boateng in Hudson NH, Next Level Gaming & Novelties brings 10+ years of gaming, cinema, VR, and novelty event production.",
    keywords:
      "About Next Level Gaming, Calvin Reid, Yaw Boateng, Hudson NH event rental company, New England college entertainment company, event production company NH MA",
    image: `${SITE_URL}/about-gaming-event.jpg`,
    canonicalPath: "/about",
    heading: "About Next Level Gaming & Novelties — Hudson NH Event Production Team",
    summary:
      "Founded by Calvin Reid and Yaw Boateng, Next Level Gaming & Novelties is based in Hudson, New Hampshire and brings more than ten years of turnkey event production experience across multiplayer gaming, esports tournaments, outdoor inflatable and mobile LED movie screens, virtual reality, and interactive novelty workshops across New England and the East Coast.",
  },
  "/contact": {
    title: "Contact Next Level Gaming & Novelties | Hudson NH Office",
    description:
      "Contact Next Level Gaming & Novelties in Hudson NH to book gaming events, movie screens, VR, photo booths, or novelties. Call 978-601-5473 today.",
    keywords:
      "contact Next Level Gaming, Hudson NH event rentals phone number, 978-601-5473, sales@nextlevelgamingevents.com, book event rentals New Hampshire Massachusetts",
    image: DEFAULT_IMAGE,
    canonicalPath: "/contact",
    heading: "Contact Next Level Gaming & Novelties — Hudson NH Office (978-601-5473)",
    summary:
      "Get in touch with Next Level Gaming & Novelties in Hudson, New Hampshire to plan your next college, school, corporate, or community event across NH, MA, and New England. Call 978-601-5473 or email sales@nextlevelgamingevents.com.",
  },
  "/quote": {
    title: "Request an Event Rental Quote | Next Level Gaming NH",
    description:
      "Build your custom event package and get a fast quote for gaming events, movie screens, VR, 360 photo booths, silent disco, glow parks, or novelties.",
    keywords:
      "gaming event rental quote, outdoor movie screen rental pricing NH MA, book college event entertainment, event rental pricing New Hampshire Massachusetts",
    image: DEFAULT_IMAGE,
    canonicalPath: "/quote",
    heading: "Request an Event Rental Quote — Next Level Gaming & Novelties NH",
    summary:
      "Use our interactive event planner to request a custom rental quote for video gaming events, outdoor movie nights, virtual reality, 360 photo booths, silent disco, sim racing, glow parks, trivia nights, or custom novelties in Hudson NH, Massachusetts, and New England.",
  },
  "/novelty-order": {
    title: "Order Custom Event Novelties | Next Level Gaming NH",
    description:
      "Request pricing and book custom event novelty stations—trucker hats, beanies, socks, bracelets, pillow dolls, sequin pillows, keychains, and rings.",
    keywords:
      "order custom event novelties, college novelty workshop booking, bulk custom event souvenirs, Patched City hat bar order, custom college orientation giveaways",
    image: `${SITE_URL}/novelties-bg.png`,
    canonicalPath: "/novelty-order",
    heading: "Order Custom Event Novelties & Maker Workshops — Next Level Gaming NH",
    summary:
      "Request pricing and order custom event novelty workshops including Patched City trucker hats and beanies, custom socks, Bead-tastics bracelets, intention bracelets, pillow dolls, sequin pillows, laser-engraved keychains, stamped rings, Silly Sacks, and custom license plates across New Hampshire, Massachusetts, and New England.",
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
    html = html.replace(/<h1>[\s\S]*?<\/h1>/i, `<h1>${escapeHtml(seo.heading)}</h1>`);
    html = html.replace(
      /<section>\s*<h1>[\s\S]*?<\/h1>\s*<p>[\s\S]*?<\/p>/i,
      `<section><h1>${escapeHtml(seo.heading)}</h1><p><strong>${escapeHtml(
        seo.heading
      )}</strong> — ${escapeHtml(seo.summary)}</p>`
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
    const routeDir = path.join(buildDir, cleanRoute);
    fs.mkdirSync(routeDir, { recursive: true });
    const outHtml = buildRouteHtml(baseHtml, routeKey, seo);
    fs.writeFileSync(path.join(routeDir, "index.html"), outHtml, "utf8");
    count++;
  }

  console.log(`Pre-rendered SEO HTML for ${count} routes in build/`);
}

run();

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://nextlevelgamingevents.com";
const DEFAULT_IMAGE = `${SITE_URL}/hero-bg.png`;

const ROUTES = {
  "/gaming-events": {
    title: "Video Gaming Event Rentals & Esports NH, MA, NC | Next Level",
    description:
      "Rent multiplayer video gaming events and esports tournaments in Hudson NH, MA & North Carolina with 12–40 ft HD screens, consoles, and event staff.",
    keywords:
      "gaming events Hudson NH, video gaming event rental New Hampshire, gaming event rentals Charlotte NC, mobile video game party Raleigh NC, esports tournament production NH MA NC, mobile video game party rental Manchester NH, Nashua NH gaming party, college gaming event rental New England North Carolina, high school post prom video game party, Super Smash Bros tournament rental, Mario Kart event rental Boston MA Charlotte NC",
    image: `${SITE_URL}/gaming-events-experience-1.png`,
    canonicalPath: "/gaming-events",
    serviceName: "Video Gaming Event Rentals & Esports Tournament Production",
    heading: "Video Gaming Event Rentals & Esports in NH, MA & NC",
    summary:
      "Next Level Gaming & Novelties delivers full-scale multiplayer video gaming event rentals and bracketed esports tournament productions across Hudson, Nashua, Manchester, Salem, Derry, and Concord NH, Greater Boston and Massachusetts, New England, and our North Carolina branch in Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, and Winston-Salem NC.",
    subhead: "Deluxe, Ultimate & Esports Tournament Gaming Packages",
    details:
      "Choose from our Deluxe Package (four 12 ft HD gaming stations plus a giant 21 to 32 ft HD spectator screen), Ultimate Package (eight 12 ft HD screens plus a 26 ft jumbo screen and virtual smartphone DJ dance party), or full Esports Tournament Production with PlayStation 5, Xbox Series X, Nintendo Switch, and classic retro NES consoles. Popular games include Super Smash Bros. Ultimate, Mario Kart 8 Deluxe, EA Sports FC, Madden NFL, NBA 2K, Rocket League, Street Fighter, and Tekken.",
  },
  "/movie-nights": {
    title: "Outdoor Movie Screen & LED Wall Rentals NH & NC | Next Level",
    description:
      "Rent giant inflatable outdoor movie screens (16–40 ft) and daylight mobile LED video wall trailers (14–20 ft) with concert audio in NH, MA & NC.",
    keywords:
      "outdoor movie screen rental NH, outdoor movie screen rental Charlotte NC, inflatable movie screen rental Raleigh Durham NC, inflatable movie screen rental New Hampshire Massachusetts, mobile LED video wall trailer rental NH MA NC, backyard movie night rental Hudson NH Charlotte NC, drive-in movie screen rental",
    image: `${SITE_URL}/experience-movie-nights.png`,
    canonicalPath: "/movie-nights",
    serviceName: "Outdoor Inflatable Movie Screen & Mobile LED Video Wall Rentals",
    heading: "Outdoor Movie Screen & LED Wall Rentals in NH, MA & NC",
    summary:
      "Next Level Gaming & Novelties provides turnkey outdoor movie screen rentals and daylight mobile LED video wall trailers across Hudson NH, Nashua, Manchester, Greater Boston, Massachusetts, New England, and across North Carolina including Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, and Cary NC.",
    subhead: "16–40 ft Inflatable Cinema Screens & 14–20 ft Mobile LED Video Walls",
    details:
      "Select from 14 ft, 16 ft, and 20 ft daylight-visible mobile LED video wall trailers for daytime festivals, tailgates, and sports watch parties, or 16 ft, 21 ft, 26 ft, and 40 ft giant inflatable outdoor movie screens for campus quads, town parks, summer camps, and drive-in movie nights. Every rental includes HD projection or LED processing, concert-grade audio towers, FM radio broadcast transmitters, and on-site technicians.",
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
    subhead: "Live Game Show Hosts, Wireless Buzzers & Giant Leaderboards",
    details:
      "Every interactive trivia night package includes a charismatic live host, wireless digital team buzzers, customized trivia rounds (pop culture, music, sports, campus history, or corporate trivia), concert sound, and live scoring projected onto giant HD screens up to 32 feet wide.",
  },
  "/virtual-reality": {
    title: "Virtual Reality & VR Escape Room Rentals NH & NC | Next Level",
    description:
      "Rent room-scale Virtual Reality stations and 4-player cooperative VR escape rooms with spectator screens and staff in NH, MA & North Carolina.",
    keywords:
      "virtual reality event rental NH, VR party rental Charlotte NC, virtual reality rental Raleigh Durham NC, VR party rental New Hampshire Massachusetts, mobile VR escape room rental, college VR entertainment New England North Carolina, Beat Saber event rental",
    image: `${SITE_URL}/experience-virtual-reality.png`,
    canonicalPath: "/virtual-reality",
    serviceName: "Virtual Reality (VR) Event Stations & Mobile VR Escape Rooms",
    heading: "Virtual Reality & VR Escape Room Rentals in NH, MA & NC",
    summary:
      "Rent immersive room-scale Virtual Reality stations and 4-player cooperative VR escape room adventures from Next Level Gaming & Novelties in Hudson NH, Nashua, Manchester, Boston MA, New England, and across North Carolina including Charlotte, Raleigh, Durham, and Greensboro NC.",
    subhead: "Room-Scale VR Gaming Stations & 4-Player Cooperative Escape Adventures",
    details:
      "Our VR event rentals feature motion-tracked headsets, live HD spectator monitors so crowds can watch the action, sanitary disposable masks, dedicated attendants, and fan-favorite VR games including Beat Saber, SUPERHOT VR, Job Simulator, Walkabout Mini Golf, Pistol Whip, Dragon Tower, Depths of Osiris, Manor Escape, and Time Travel Paradox.",
  },
  "/photo-booth": {
    title: "360 Video Booth & Mirror Photobooth Rentals | Next Level",
    description:
      "Rent a 360 slow-motion video booth or interactive full-length mirror photobooth with props, custom overlays, and staff in NH, MA & North Carolina.",
    keywords:
      "360 photo booth rental NH, 360 video booth rental Charlotte NC, mirror photobooth rental Raleigh Durham NC, 360 video booth rental New Hampshire Massachusetts, mirror photobooth rental Hudson NH, event photobooth rental New England North Carolina",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "360 Video Booth & Interactive Mirror Photobooth Rentals",
    heading: "360 Video Booth & Mirror Photobooth Rentals in NH, MA & NC",
    summary:
      "Capture and share unforgettable memories with 360 slow-motion video booth and interactive full-length mirror photobooth rentals from Next Level Gaming & Novelties in Hudson NH, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC).",
    subhead: "Slow-Motion 360 Video Platforms & Full-Length Interactive Mirror Booths",
    details:
      "Every 360 video booth and mirror photobooth package includes red carpet and VIP stanchions, professional LED studio ring lighting, custom event logos and overlays, party props, instant QR and SMS digital sharing, and a friendly on-site attendant for college formals, proms, corporate galas, and private celebrations.",
  },
  "/just-dance": {
    title: "Just Dance Giant Screen Event Party Rentals | Next Level",
    description:
      "Bring multiplayer Just Dance battles on giant HD screens with concert sound and lighting to your college, school, or event in NH, MA & North Carolina.",
    keywords:
      "Just Dance event rental, giant screen dance party rental NH MA NC, college Just Dance party New England North Carolina, interactive dance game rental Boston MA Charlotte NC",
    image: `${SITE_URL}/experience-just-dance.png`,
    canonicalPath: "/just-dance",
    serviceName: "Just Dance Giant-Screen Event Rentals",
    heading: "Just Dance Giant Screen Event Party Rentals in NH, MA & NC",
    summary:
      "Turn any campus center, school gymnasium, or event venue into an interactive dance floor with Just Dance giant screen event party rentals from Next Level Gaming & Novelties across Hudson NH, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, and Greensboro NC).",
    subhead: "Massive HD Projection Screens, Concert Audio & Multiplayer Dance Battles",
    details:
      "Guests step onto the dance floor, follow the choreography on 12 ft to 32 ft HD screens, and compete or dance together to chart-topping hits backed by concert-grade speakers, subwoofers, and dynamic party lighting.",
  },
  "/silent-disco": {
    title: "Silent Disco LED Headphone Party Rentals NH & NC | Next Level",
    description:
      "Rent tri-color LED wireless Silent Disco headphones with 3 simultaneous DJ channels for 50 to 5,000+ guests in NH, Boston MA & North Carolina.",
    keywords:
      "silent disco rental NH, silent disco headphone rental Charlotte NC, silent disco party rental Raleigh Durham NC, silent disco headphone rental New Hampshire Massachusetts, LED headphone party rental New England North Carolina",
    image: `${SITE_URL}/experience-silent-disco.png`,
    canonicalPath: "/silent-disco",
    serviceName: "Silent Disco Wireless Headphone Party Rentals",
    heading: "Silent Disco LED Headphone Party Rentals in NH, MA & NC",
    summary:
      "Throw the loudest quiet party on campus or outdoors with Silent Disco LED wireless headphone party rentals from Next Level Gaming & Novelties in Hudson NH, Boston MA, New England, and across North Carolina including Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC.",
    subhead: "Three-Channel Tri-Color LED Wireless Headphones for 50 to 5,000+ Guests",
    details:
      "Guests switch between up to three live DJ or playlist channels right on their earcup, lighting up the room in red, green, or blue LED glow so everyone can see which song channel their friends are dancing to—all with zero noise complaints for late-night campus unions, outdoor quads, and high school post-proms.",
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
  },
  "/glow-park": {
    title: "Glow Park Swings, Seesaws & Mini Golf Rental | Next Level",
    description:
      "Rent the Glow Park Experience with 8 LED glow swings, 4 glowing seesaws, colorful venue uplighting, and glowing mini golf in NH, MA & North Carolina.",
    keywords:
      "glow park rental, LED glow swings rental NH MA NC, glow swings rental Charlotte Raleigh NC, illuminated seesaws event rental, glow mini golf rental New England North Carolina, college glow night attraction",
    image: `${SITE_URL}/experience-glow-park.jpg`,
    canonicalPath: "/glow-park",
    serviceName: "Glow Park Experience — Illuminated Swings, Seesaws & Mini Golf Rentals",
    heading: "Glow Park Swings, Seesaws & Mini Golf Rental in NH, MA & NC",
    summary:
      "Transform indoor gyms, ballrooms, or outdoor campus quads with the full Glow Park Experience rental from Next Level Gaming & Novelties in Hudson NH, Massachusetts, New England, and North Carolina (Charlotte, Raleigh, Durham, Chapel Hill, and Greensboro NC).",
    subhead: "Eight Illuminated LED Swings, Four Glow Seesaws & Glowing Mini Golf",
    details:
      "Our signature Glow Park package includes 8 commercial LED illuminated swings on truss frames, 4 glowing multi-rider seesaws, full-color venue uplighting, and an interactive glowing mini-golf course that turns any day or night event into a viral photo destination.",
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
    title: "North Carolina Event Rentals | Charlotte & Raleigh NC",
    description:
      "Turnkey gaming event rentals, outdoor & LED movie screens, VR, 360 photo booths, silent disco, glow parks & novelties in Charlotte, Raleigh & Durham NC.",
    keywords:
      "North Carolina event rentals, gaming event rentals Charlotte NC, outdoor movie screen rental Raleigh NC, Durham NC college event rentals, Greensboro NC party rentals, Winston-Salem event entertainment, 360 photo booth rental Charlotte NC, VR party rental Raleigh NC, silent disco rental North Carolina, sim racing simulator rental Charlotte NC",
    image: DEFAULT_IMAGE,
    canonicalPath: "/north-carolina-event-rentals",
    serviceName: "North Carolina Interactive Event Rentals & Entertainment",
    heading: "North Carolina Event Rentals — Charlotte, Raleigh & Durham NC",
    summary:
      "Next Level Gaming & Novelties delivers turnkey video gaming events, esports tournaments, giant inflatable outdoor movie screens, mobile LED video wall trailers, VR escape rooms, 360 video booths, mirror photobooths, Silent Disco wireless headphones, Sim Racing cockpits, Glow Park swings, live Trivia Nights, and custom novelty workshops across Charlotte, Raleigh, Durham, Chapel Hill, Greensboro, Winston-Salem, Cary, Concord, Wilmington, Fayetteville, Greenville, and Asheville, North Carolina.",
    subhead: "Serving Colleges, Schools, Corporate Events & Festivals Across North Carolina",
    details:
      "Our North Carolina branch provides full delivery, setup, and on-site event staff for university campuses, high school proms and grad nights, corporate activations, and community festivals in the Charlotte Metro, Research Triangle (Raleigh-Durham-Chapel Hill), Piedmont Triad (Greensboro-Winston-Salem-High Point), Coastal NC, and Western NC.",
  },
  "/new-hampshire-massachusetts-event-rentals": {
    title: "NH & MA Event Rentals | Hudson, Manchester & Boston",
    description:
      "Rent video gaming events, outdoor & LED movie screens, VR, 360 photo booths, silent disco, glow parks & novelties in Hudson NH, Manchester & Boston MA.",
    keywords:
      "NH event rentals, Massachusetts event rentals, gaming events Hudson NH, event entertainment Manchester NH, Nashua NH party rentals, Boston MA corporate event rentals, Lowell MA outdoor movie screen rental, Worcester MA college event entertainment",
    image: DEFAULT_IMAGE,
    canonicalPath: "/new-hampshire-massachusetts-event-rentals",
    serviceName: "New Hampshire & Massachusetts Interactive Event Rentals",
    heading: "NH & MA Event Rentals — Hudson, Manchester & Boston",
    summary:
      "Headquartered in Hudson, New Hampshire (03051), Next Level Gaming & Novelties delivers turnkey video gaming tournaments, giant inflatable and mobile LED movie screens, Virtual Reality stations, 360 video booths, Silent Disco headphones, Sim Racing simulators, Glow Park LED swings, Trivia Nights, and custom novelty workshops across Hudson, Nashua, Manchester, Salem, Derry, Londonderry, Concord, Portsmouth NH, and Boston, Cambridge, Lowell, Worcester, and Springfield MA.",
    subhead: "Turnkey Event Entertainment Across New Hampshire, Massachusetts & New England",
    details:
      "For over ten years, our Hudson NH team has produced interactive campus, school, municipal, and corporate events across Southern and Central New Hampshire, Greater Boston, the Merrimack Valley, Central and Western Massachusetts, Rhode Island, Connecticut, Maine, and Vermont.",
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
      "Whether you are entertaining 100 students in a campus center or 5,000 attendees at a spring weekend festival or company picnic, our crew delivers commercial-grade equipment, giant HD screens, concert sound, and hands-on novelty stations tailored to your schedule and venue.",
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
          { "@type": "City", name: "Charlotte, NC" },
          { "@type": "City", name: "Raleigh, NC" },
          { "@type": "City", name: "Durham, NC" },
          { "@type": "City", name: "Chapel Hill, NC" },
          { "@type": "City", name: "Greensboro, NC" },
          { "@type": "City", name: "Winston-Salem, NC" },
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
    html = html.replace(/<h1>[\s\S]*?<\/h1>/i, `<h1>${escapeHtml(seo.heading)}</h1>`);
    html = html.replace(
      /<section>\s*<h1>[\s\S]*?<\/h1>\s*<p>[\s\S]*?<\/p>/i,
      `<section><h1>${escapeHtml(seo.heading)}</h1><p><strong>${escapeHtml(
        seo.heading
      )}</strong> — ${escapeHtml(seo.summary)}</p>${subheadBlock}`
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

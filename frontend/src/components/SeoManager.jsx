import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://nextlevelgamingevents.com";
const DEFAULT_IMAGE = `${SITE_URL}/hero-bg.png`;

export const ROUTE_SEO = {
  "/": {
    title: "Next Level Gaming & Novelties | Event Rentals in NH, MA",
    description:
      "Turnkey gaming event rentals, outdoor & LED movie screens, VR, 360 photo booths, silent disco, glow parks & custom novelties in Hudson NH & MA.",
    keywords:
      "gaming events Hudson NH, gaming event rental New Hampshire, video game party rental NH, mobile video game party Manchester NH, Nashua NH event rentals, college event entertainment New England, corporate event entertainment Boston MA, high school post prom entertainment NH MA, outdoor movie screen rental NH MA, inflatable movie screen rental, mobile LED video wall trailer rental, virtual reality event rental, mobile VR escape room, 360 photo booth rental NH, interactive mirror photobooth, silent disco headphone rental, sim racing simulator rental, glow park LED swings rental, interactive trivia night host, Just Dance party rental, custom event novelties, Patched City trucker hats, Next Level Gaming",
    image: `${SITE_URL}/hero-bg.png`,
    canonicalPath: "/",
    heading: "Next Level Gaming & Novelties — Interactive Event Rentals in Hudson NH, MA & New England",
    summary:
      "Next Level Gaming & Novelties provides turnkey interactive event rentals, multiplayer video gaming events, esports tournaments, giant inflatable outdoor movie screens, daylight mobile LED video wall trailers, room-scale Virtual Reality stations, 4-player VR escape rooms, 360 video booths, mirror photobooths, Silent Disco wireless headphone parties, Sim Racing simulator cockpits, Just Dance giant-screen parties, Glow Park LED swings and mini golf, live-hosted Trivia Nights, and hands-on custom novelty workshops across Hudson, Nashua, Manchester, Salem, Derry, Londonderry, and Concord NH, Greater Boston, Lowell, and Worcester MA, Connecticut, Rhode Island, Maine, and Vermont.",
  },
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
      "Next Level Gaming & Novelties delivers full-scale multiplayer video gaming event rentals and bracketed esports tournament productions across Hudson, Nashua, Manchester, and Concord NH, Greater Boston and Massachusetts, and all of New England. Choose from our Deluxe Package (four 12 ft HD screens plus a giant 21 to 32 ft HD screen), Ultimate Package (eight 12 ft HD screens plus a 26 ft jumbo screen and virtual smartphone DJ dance party), or Esports Tournament Package with PlayStation 5, Xbox Series X, Nintendo Switch, and classic retro NES consoles.",
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
      "Rent giant outdoor inflatable movie screens (16 ft, 21 ft, 26 ft, and 40 ft) and daylight-visible mobile LED video wall trailers (14 ft, 16 ft, and 20 ft) from Next Level Gaming & Novelties in Hudson NH, Nashua, Manchester, Greater Boston, Massachusetts, and New England. Every cinema package includes HD projection or LED processing, concert-grade audio towers, FM drive-in radio transmitters, and professional crew setup.",
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
    heading: "Interactive Trivia Night & Live Game Show Rentals in NH & MA",
    summary:
      "Book live-hosted interactive trivia night and game show rentals for college campus events, corporate team building, high schools, and community gatherings across Hudson NH, Massachusetts, and New England. Includes charismatic live hosts, wireless digital team buzzers, custom trivia categories, concert sound, and real-time leaderboards on giant screens up to 32 feet.",
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
    heading: "Virtual Reality & Mobile VR Escape Room Rentals in NH & MA",
    summary:
      "Bring immersive room-scale Virtual Reality stations and 4-player cooperative VR escape rooms to your event in Hudson NH, Manchester, Nashua, Boston MA, and across New England. Includes motion-tracked VR headsets, live HD spectator monitors, sanitary face covers, on-site VR attendants, and top titles like Beat Saber, SUPERHOT VR, Job Simulator, Walkabout Mini Golf, Pistol Whip, Dragon Tower, Manor Escape, and Depths of Osiris.",
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
    heading: "360 Video Booth & Mirror Photobooth Rentals in Hudson NH & MA",
    summary:
      "Capture viral slow-motion videos and instant keepsake photos with 360 video booth and interactive full-length mirror photobooth rentals from Next Level Gaming & Novelties in Hudson NH, Massachusetts, and New England. Includes VIP stanchions, studio LED lighting, fun party props, custom event graphics, instant SMS/QR digital sharing, and a dedicated booth attendant.",
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
      "Turn any campus student union, school gymnasium, or festival stage into an interactive dance floor with Just Dance giant-screen event party rentals in Hudson NH, Massachusetts, and New England. Features massive 12 ft to 32 ft HD screens, concert-grade sound systems, stage lighting, and multiplayer dance battles.",
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
      "Host an unforgettable late-night campus or outdoor dance party with zero noise complaints using Silent Disco LED wireless headphone rentals from Next Level Gaming & Novelties. Supports up to 3 simultaneous DJ or playlist channels with red, green, and blue glowing earcups for 50 to 5,000+ guests across New Hampshire, Massachusetts, and New England.",
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
      "Bring high-speed motorsport competition to your corporate activation, trade show, college campus, or private party with Sim Racing cockpit simulator rentals in Hudson NH, Boston MA, and New England. Features force-feedback steering wheels, responsive pedal sets, racing bucket seats, giant HD displays, and live fastest-lap tournament leaderboards.",
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
      "Transform any indoor gym, ballroom, or outdoor campus quad into a radiant nighttime wonderland with the Glow Park Experience rental from Next Level Gaming & Novelties. Includes 8 illuminated LED glow swings, 4 glowing seesaws, full-color venue uplighting, and a 9-hole glowing mini-golf course delivered and staffed across NH, MA, and New England.",
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
      "Book hands-on custom event novelties and interactive maker workshops for college student activities, orientations, school events, and corporate parties across New Hampshire, Massachusetts, and New England. Guests create and take home Patched City custom trucker hats and beanies, custom printed socks, Bead-tastics and intention bracelets, custom photo pillow dolls, reversible sequin pillows, laser-engraved wood and metal keychains, hammerless stamped custom rings, Silly Sacks plush character bags, and custom novelty license plates.",
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
      "Founded by Calvin Reid and Yaw Boateng in Hudson, New Hampshire, Next Level Gaming & Novelties brings over 10 years of turnkey event production experience serving colleges, universities, K-12 schools, corporations, and municipalities across NH, MA, CT, RI, ME, VT, NY, NJ, PA, and FL.",
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
      "Contact Next Level Gaming & Novelties in Hudson, New Hampshire at 978-601-5473 or sales@nextlevelgamingevents.com to check availability and book gaming events, outdoor movie screens, LED video walls, VR stations, 360 photo booths, silent disco, glow parks, or custom novelties.",
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
      "Request a fast, custom event rental quote from Next Level Gaming & Novelties in Hudson NH for multiplayer video gaming events, outdoor inflatable and LED movie screens, virtual reality, 360 photo booths, silent disco, sim racing, glow parks, trivia nights, Just Dance parties, and custom novelty workshops.",
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
      "Order custom event novelty packages and interactive maker stations for your campus, school, or corporate event, including Patched City custom trucker hats and beanies, custom socks, Bead-tastics and intention bracelets, pillow dolls, sequin pillows, laser-engraved keychains, stamped rings, Silly Sacks plush bags, and custom license plates.",
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
        { "@type": "City", name: "Providence, RI" },
        { "@type": "City", name: "Hartford, CT" },
        { "@type": "State", name: "New Hampshire" },
        { "@type": "State", name: "Massachusetts" },
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
        Serving Hudson NH (03051), Nashua NH, Manchester NH, Salem NH, Derry NH, Londonderry NH,
        Merrimack NH, Bedford NH, Concord NH, Portsmouth NH, Dover NH, Durham NH, Keene NH, Hanover NH,
        Boston MA, Cambridge MA, Lowell MA, Chelmsford MA, Andover MA, Lawrence MA, Waltham MA,
        Worcester MA, Springfield MA, Amherst MA, Providence RI, Hartford CT, New Haven CT,
        Portland ME, Burlington VT, and all of New England for college campus events, university
        orientations, welcome week, spring weekend, high school post-prom and project graduation
        parties, corporate events, company picnics, summer camps, municipal festivals, and private
        celebrations. Call 978-601-5473 or email sales@nextlevelgamingevents.com.
      </p>
    </aside>
  );
};

export default SeoManager;

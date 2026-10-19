import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://nextlevelgamingevents.com";
const DEFAULT_IMAGE = `${SITE_URL}/hero-bg.png`;

export const ROUTE_SEO = {
  "/": {
    title: "Next Level Gaming & Novelties | Gaming Event Rentals, Movie Screens, VR & Party Entertainment in Hudson NH & New England",
    description:
      "Turnkey gaming event rentals, esports tournaments, 14–40 ft outdoor movie screen & mobile LED video wall rentals, VR stations, 360 photo booths, silent disco, sim racing, glow parks, trivia nights, and custom event novelties in Hudson, Nashua & Manchester NH, Massachusetts, and across New England.",
    keywords:
      "gaming events Hudson NH, gaming event rental New Hampshire, video game party rental NH, event entertainment rentals Manchester NH, Nashua NH event rentals, college event entertainment New England, outdoor movie screen rental NH MA, LED video wall trailer rental, virtual reality event rental, 360 photo booth rental NH, silent disco rental, sim racing simulator rental, glow park rental, interactive trivia night host, custom event novelties, Next Level Gaming, Next Level Gaming Events",
    image: `${SITE_URL}/hero-bg.png`,
    canonicalPath: "/",
  },
  "/gaming-events": {
    title: "Video Gaming Event Rentals & Esports Tournaments in NH, MA & New England | Next Level Gaming",
    description:
      "Rent full-scale multiplayer video gaming events and esports tournament setups in Hudson, Manchester & Nashua NH, Massachusetts, and New England. Includes 12 ft to 40 ft HD screens, PlayStation, Xbox, Nintendo Switch, retro consoles, and on-site staff.",
    keywords:
      "gaming events Hudson NH, video gaming event rental New Hampshire, esports tournament production NH MA, mobile video game party rental Manchester NH, Nashua NH gaming party, college gaming event rental New England, giant screen gaming rental, Next Level Gaming",
    image: `${SITE_URL}/gaming-events-experience-1.png`,
    canonicalPath: "/gaming-events",
    serviceName: "Video Gaming Event Rentals & Esports Tournament Production",
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
  },
  "/about": {
    title: "About Next Level Gaming & Novelties | Event Entertainment & Rental Company in Hudson, NH",
    description:
      "Founded by Calvin Reid and Yaw Boateng in New Hampshire, Next Level Gaming & Novelties brings 10+ years of turnkey gaming events, giant movie screens, VR, photo booths, and custom novelty production to New England and the East Coast.",
    keywords:
      "About Next Level Gaming, Calvin Reid, Yaw Boateng, Hudson NH event rental company, Manchester NH gaming events, New England college entertainment company",
    image: `${SITE_URL}/about-gaming-event.jpg`,
    canonicalPath: "/about",
  },
  "/contact": {
    title: "Contact Next Level Gaming & Novelties | Event Rentals in Hudson, NH (978-601-5473)",
    description:
      "Contact Next Level Gaming & Novelties in Hudson, NH to book gaming events, outdoor movie screens, VR, 360 photo booths, silent disco, glow parks, or custom novelties. Email sales@nextlevelgamingevents.com or call 978-601-5473.",
    keywords:
      "contact Next Level Gaming, Hudson NH event rentals phone number, 978-601-5473, sales@nextlevelgamingevents.com, book gaming event NH MA",
    image: DEFAULT_IMAGE,
    canonicalPath: "/contact",
  },
  "/quote": {
    title: "Get an Event Rental Quote | Next Level Gaming & Novelties (Hudson, NH & New England)",
    description:
      "Request a custom quote for video gaming events, outdoor & LED movie screen rentals, VR, 360 photo booths, silent disco, sim racing, glow parks, trivia nights, or custom novelties across NH, MA, and New England.",
    keywords:
      "gaming event rental quote, outdoor movie screen rental pricing NH MA, book college event entertainment, Next Level Gaming quote",
    image: DEFAULT_IMAGE,
    canonicalPath: "/quote",
  },
  "/novelty-order": {
    title: "Order Custom Event Novelties & Maker Stations | Next Level Gaming & Novelties",
    description:
      "Request pricing and book custom event novelty stations—trucker hats, beanies, custom socks, bracelets, pillow dolls, sequin pillows, keychains, rings, and license plates—for your campus or corporate event.",
    keywords:
      "order custom event novelties, college novelty workshop booking, bulk custom event souvenirs, Next Level Gaming novelties",
    image: `${SITE_URL}/novelties-bg.png`,
    canonicalPath: "/novelty-order",
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
        { "@type": "City", name: "Concord, NH" },
        { "@type": "City", name: "Boston, MA" },
        { "@type": "City", name: "Lowell, MA" },
        { "@type": "City", name: "Worcester, MA" },
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

  useEffect(() => {
    const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const seo = ROUTE_SEO[normalizedPath] || ROUTE_SEO["/"];
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
  }, [pathname]);

  return null;
};

export default SeoManager;

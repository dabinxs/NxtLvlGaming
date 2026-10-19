import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://nextlevelgamingevents.com";
const DEFAULT_IMAGE = `${SITE_URL}/hero-bg.png`;

export const ROUTE_SEO = {
  "/": {
    title: "Next Level Gaming & Novelties | Event Rentals in NH, MA",
    description:
      "Turnkey gaming event rentals, outdoor & LED movie screens, VR, 360 photo booths, silent disco, glow parks & custom novelties in Hudson NH & MA.",
    keywords:
      "gaming events Hudson NH, gaming event rental New Hampshire, video game party rental NH, event entertainment rentals Manchester NH, Nashua NH event rentals, college event entertainment New England, outdoor movie screen rental NH MA, LED video wall trailer rental, virtual reality event rental, 360 photo booth rental NH, silent disco rental, sim racing simulator rental, glow park rental, interactive trivia night host, custom event novelties, Next Level Gaming",
    image: `${SITE_URL}/hero-bg.png`,
    canonicalPath: "/",
  },
  "/gaming-events": {
    title: "Video Gaming Event Rentals & Esports in NH | Next Level",
    description:
      "Rent multiplayer video gaming events and esports tournaments in Hudson NH, MA & New England with 12–40 ft HD screens, consoles, and event staff.",
    keywords:
      "gaming events Hudson NH, video gaming event rental New Hampshire, esports tournament production NH MA, mobile video game party rental Manchester NH, Nashua NH gaming party, college gaming event rental New England",
    image: `${SITE_URL}/gaming-events-experience-1.png`,
    canonicalPath: "/gaming-events",
    serviceName: "Video Gaming Event Rentals & Esports Tournament Production",
  },
  "/movie-nights": {
    title: "Outdoor Movie Screen & LED Wall Rentals NH | Next Level",
    description:
      "Rent giant inflatable outdoor movie screens (16–40 ft) and daylight mobile LED video wall trailers (14–20 ft) with concert audio in NH, MA & New England.",
    keywords:
      "outdoor movie screen rental NH, inflatable movie screen rental New Hampshire, mobile LED video wall trailer rental MA NH, backyard movie night rental Hudson NH",
    image: `${SITE_URL}/experience-movie-nights.png`,
    canonicalPath: "/movie-nights",
    serviceName: "Outdoor Inflatable Movie Screen & Mobile LED Video Wall Rentals",
  },
  "/trivia-nights": {
    title: "Interactive Trivia Night & Game Show Rentals | Next Level",
    description:
      "Book live-hosted interactive trivia nights for colleges, schools, and corporate events in Hudson NH, MA & New England with digital buzzers and big screens.",
    keywords:
      "interactive trivia night rental NH, live trivia host New Hampshire Massachusetts, college trivia night entertainment, corporate game show rental New England",
    image: `${SITE_URL}/experience-trivia-nights.png`,
    canonicalPath: "/trivia-nights",
    serviceName: "Interactive Trivia Night & Game Show Event Rentals",
  },
  "/virtual-reality": {
    title: "Virtual Reality & VR Escape Room Rentals NH | Next Level",
    description:
      "Rent room-scale Virtual Reality stations and 4-player cooperative VR escape rooms with spectator screens and staff in Hudson NH, MA & New England.",
    keywords:
      "virtual reality event rental NH, VR party rental New Hampshire Massachusetts, mobile VR escape room rental, college VR entertainment New England",
    image: `${SITE_URL}/experience-virtual-reality.png`,
    canonicalPath: "/virtual-reality",
    serviceName: "Virtual Reality (VR) Event Stations & Mobile VR Escape Rooms",
  },
  "/photo-booth": {
    title: "360 Video Booth & Mirror Photobooth Rentals | Next Level",
    description:
      "Rent a 360 slow-motion video booth or interactive full-length mirror photobooth with props, custom overlays, and staff in Hudson NH, MA & New England.",
    keywords:
      "360 photo booth rental NH, 360 video booth rental New Hampshire Massachusetts, mirror photobooth rental Hudson NH, event photobooth rental New England",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "360 Video Booth & Interactive Mirror Photobooth Rentals",
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
      "Just Dance event rental, giant screen dance party rental NH MA, college Just Dance party New England",
    image: `${SITE_URL}/experience-just-dance.png`,
    canonicalPath: "/just-dance",
    serviceName: "Just Dance Giant-Screen Event Rentals",
  },
  "/silent-disco": {
    title: "Silent Disco LED Headphone Party Rentals NH | Next Level",
    description:
      "Rent tri-color LED wireless Silent Disco headphones with 3 simultaneous DJ channels for 50 to 5,000+ guests in Hudson NH, Boston MA & New England.",
    keywords:
      "silent disco rental NH, silent disco headphone rental New Hampshire Massachusetts, LED headphone party rental New England",
    image: `${SITE_URL}/experience-silent-disco.png`,
    canonicalPath: "/silent-disco",
    serviceName: "Silent Disco Wireless Headphone Party Rentals",
  },
  "/sim-racing": {
    title: "Sim Racing Cockpit Simulator Event Rentals | Next Level",
    description:
      "Rent force-feedback Sim Racing simulator cockpits with bucket seats, giant-screen telemetry, and lap leaderboards for events in NH, MA & New England.",
    keywords:
      "sim racing rental NH MA, racing simulator event rental New England, force feedback racing cockpit rental",
    image: `${SITE_URL}/experience-sim-racing.png`,
    canonicalPath: "/sim-racing",
    serviceName: "Sim Racing Cockpit Simulator Event Rentals",
  },
  "/glow-park": {
    title: "Glow Park Swings, Seesaws & Mini Golf Rental | Next Level",
    description:
      "Rent the Glow Park Experience with 8 LED glow swings, 4 glowing seesaws, colorful venue uplighting, and glowing mini golf in NH, MA & New England.",
    keywords:
      "glow park rental, LED glow swings rental NH MA, illuminated seesaws event rental, glow mini golf rental New England",
    image: `${SITE_URL}/experience-glow-park.jpg`,
    canonicalPath: "/glow-park",
    serviceName: "Glow Park Experience — Illuminated Swings, Seesaws & Mini Golf Rentals",
  },
  "/novelties": {
    title: "Custom Event Novelties & Maker Workshops NH | Next Level",
    description:
      "Book interactive custom novelty workshops: Patched City trucker hats, beanies, socks, sequin pillows, pillow dolls, bracelets, rings & laser keychains.",
    keywords:
      "custom event novelties rental, college novelty event ideas, custom trucker hat bar rental, Patched City hats, laser engraved keychains event",
    image: `${SITE_URL}/novelties-bg.png`,
    canonicalPath: "/novelties",
    serviceName: "Custom Event Novelties & On-Site Maker Workshops",
  },
  "/about": {
    title: "About Next Level Gaming & Novelties | Hudson NH Team",
    description:
      "Founded by Calvin Reid and Yaw Boateng in Hudson NH, Next Level Gaming & Novelties brings 10+ years of gaming, cinema, VR, and novelty event production.",
    keywords:
      "About Next Level Gaming, Calvin Reid, Yaw Boateng, Hudson NH event rental company, New England college entertainment",
    image: `${SITE_URL}/about-gaming-event.jpg`,
    canonicalPath: "/about",
  },
  "/contact": {
    title: "Contact Next Level Gaming & Novelties | Hudson NH Office",
    description:
      "Contact Next Level Gaming & Novelties in Hudson NH to book gaming events, movie screens, VR, photo booths, or novelties. Call 978-601-5473 today.",
    keywords:
      "contact Next Level Gaming, Hudson NH event rentals phone number, 978-601-5473, sales@nextlevelgamingevents.com",
    image: DEFAULT_IMAGE,
    canonicalPath: "/contact",
  },
  "/quote": {
    title: "Request an Event Rental Quote | Next Level Gaming NH",
    description:
      "Build your custom event package and get a fast quote for gaming events, movie screens, VR, 360 photo booths, silent disco, glow parks, or novelties.",
    keywords:
      "gaming event rental quote, outdoor movie screen rental pricing NH MA, book college event entertainment",
    image: DEFAULT_IMAGE,
    canonicalPath: "/quote",
  },
  "/novelty-order": {
    title: "Order Custom Event Novelties | Next Level Gaming NH",
    description:
      "Request pricing and book custom event novelty stations—trucker hats, beanies, socks, bracelets, pillow dolls, sequin pillows, keychains, and rings.",
    keywords:
      "order custom event novelties, college novelty workshop booking, bulk custom event souvenirs",
    image: `${SITE_URL}/novelties-bg.png`,
    canonicalPath: "/novelty-order",
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
  }, [pathname]);

  return null;
};

export default SeoManager;

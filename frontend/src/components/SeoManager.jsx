import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://nextlevelgamingevents.com";
const DEFAULT_IMAGE = `${SITE_URL}/hero-bg.png`;

export const ROUTE_SEO = {
  "/": {
    title: "Next Level Gaming & Novelties | Gaming Events, VR, Movie Nights & Event Entertainment",
    description:
      "Next Level Gaming & Novelties delivers turnkey video gaming events, outdoor & LED movie screen rentals, virtual reality, 360 photo booths, silent disco, sim racing, glow parks, trivia nights, and custom novelties for colleges, schools, and events.",
    keywords:
      "Next Level Gaming, Next Level Gaming Events, gaming event rental, college event entertainment, outdoor movie screen rental, virtual reality event rental, 360 photo booth, silent disco, sim racing rental, glow park, custom event novelties",
    image: `${SITE_URL}/hero-bg.png`,
    canonicalPath: "/",
  },
  "/gaming-events": {
    title: "Video Gaming Events & Esports Tournaments | Next Level Gaming & Novelties",
    description:
      "Turnkey multiplayer video gaming events and esports tournament production with 12 ft to 40 ft HD screens, PlayStation, Xbox, Nintendo Switch, retro consoles, and full on-site event staff.",
    keywords:
      "video gaming events, esports tournament rental, college gaming event, mobile gaming party, giant screen gaming rental, Next Level Gaming",
    image: `${SITE_URL}/gaming-events-experience-1.png`,
    canonicalPath: "/gaming-events",
    serviceName: "Video Gaming Events & Esports Tournaments",
  },
  "/movie-nights": {
    title: "Outdoor Movie Screen & Mobile LED Video Wall Rentals | Next Level Gaming",
    description:
      "Rent giant inflatable outdoor movie screens (16 ft to 40 ft) and daylight mobile LED video wall trailers (14 ft to 28 ft) with concert-grade cinema audio and full setup crew.",
    keywords:
      "outdoor movie screen rental, inflatable movie screen rental, mobile LED video wall trailer, campus movie night rental, outdoor cinema setup, Next Level Gaming",
    image: `${SITE_URL}/experience-movie-nights.png`,
    canonicalPath: "/movie-nights",
    serviceName: "Outdoor & Mobile LED Movie Nights",
  },
  "/trivia-nights": {
    title: "Interactive Trivia Nights & Live Game Show Events | Next Level Gaming",
    description:
      "High-energy interactive trivia nights for colleges, corporate events, and groups featuring live hosts, digital buzzers, real-time leaderboards, and giant display screens.",
    keywords:
      "interactive trivia night, live trivia event host, college trivia night, corporate game show entertainment, Next Level Gaming",
    image: `${SITE_URL}/experience-trivia-nights.png`,
    canonicalPath: "/trivia-nights",
    serviceName: "Interactive Trivia Nights",
  },
  "/virtual-reality": {
    title: "Virtual Reality (VR) Event Rentals & Multiplayer VR Escape Rooms | Next Level Gaming",
    description:
      "Immersive room-scale VR stations and 4-player multiplayer VR escape rooms for campus events, parties, and corporate gatherings—fully staffed with popular VR games.",
    keywords:
      "virtual reality event rental, VR party rental, VR escape room rental, Beat Saber event rental, college VR event, Next Level Gaming",
    image: `${SITE_URL}/experience-virtual-reality.png`,
    canonicalPath: "/virtual-reality",
    serviceName: "Virtual Reality (VR) Event Experiences",
  },
  "/photo-booth": {
    title: "360 Video Booth & Interactive Mirror Photobooth Rentals | Next Level Gaming",
    description:
      "Capture shareable event memories with our 360 slow-motion video booth and interactive full-length mirror photobooth, complete with props, custom overlays, and on-site staff.",
    keywords:
      "360 video booth rental, mirror photobooth rental, event photo booth, slow motion 360 camera booth, college photo booth, Next Level Gaming",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "360 Video Booth & Mirror Photobooth",
  },
  "/360-video-booth": {
    title: "360 Video Booth & Interactive Mirror Photobooth Rentals | Next Level Gaming",
    description:
      "Capture shareable event memories with our 360 slow-motion video booth and interactive full-length mirror photobooth, complete with props, custom overlays, and on-site staff.",
    keywords:
      "360 video booth rental, mirror photobooth rental, event photo booth, slow motion 360 camera booth, Next Level Gaming",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "360 Video Booth & Mirror Photobooth",
  },
  "/360-booth": {
    title: "360 Video Booth & Interactive Mirror Photobooth Rentals | Next Level Gaming",
    description:
      "Capture shareable event memories with our 360 slow-motion video booth and interactive full-length mirror photobooth, complete with props, custom overlays, and on-site staff.",
    keywords:
      "360 video booth rental, mirror photobooth rental, event photo booth, Next Level Gaming",
    image: `${SITE_URL}/experience-360-video-booth.png`,
    canonicalPath: "/photo-booth",
    serviceName: "360 Video Booth & Mirror Photobooth",
  },
  "/just-dance": {
    title: "Just Dance Event Party & Giant Screen Dance Battles | Next Level Gaming",
    description:
      "Bring high-energy multiplayer Just Dance battles to your campus or venue with giant screens, concert sound, and interactive choreography for crowds of any size.",
    keywords:
      "Just Dance event rental, giant screen dance party, college Just Dance event, interactive dance battle rental, Next Level Gaming",
    image: `${SITE_URL}/experience-just-dance.png`,
    canonicalPath: "/just-dance",
    serviceName: "Just Dance Event Experience",
  },
  "/silent-disco": {
    title: "Silent Disco Headphone Rentals & Multi-Channel Dance Parties | Next Level Gaming",
    description:
      "Host an unforgettable indoor or outdoor Silent Disco with tri-color LED wireless headphones, multiple live DJ or music channels, and zero noise complaints.",
    keywords:
      "silent disco rental, LED silent disco headphones, college silent disco party, multi-channel headphone party, Next Level Gaming",
    image: `${SITE_URL}/experience-silent-disco.png`,
    canonicalPath: "/silent-disco",
    serviceName: "Silent Disco Party Rentals",
  },
  "/sim-racing": {
    title: "Sim Racing Simulator Rentals & Motorsport Event Experiences | Next Level Gaming",
    description:
      "Pro racing simulator cockpits with force-feedback wheels, pedals, giant screen telemetry, and fastest-lap tournament leaderboards brought directly to your event.",
    keywords:
      "sim racing rental, racing simulator event rental, motorsport simulator cockpit, esports racing tournament, Next Level Gaming",
    image: `${SITE_URL}/experience-sim-racing.png`,
    canonicalPath: "/sim-racing",
    serviceName: "Sim Racing Event Simulators",
  },
  "/glow-park": {
    title: "Glow Park Experience — Glow Swings, Seesaws & Mini Golf | Next Level Gaming",
    description:
      "Transform your venue with the Glow Park Experience featuring eight illuminated glow swings, four glowing seesaws, colorful venue uplighting, and interactive glowing mini golf.",
    keywords:
      "glow park rental, illuminated glow swings, glow seesaws, LED mini golf rental, college glow party, Next Level Gaming",
    image: `${SITE_URL}/experience-glow-park.jpg`,
    canonicalPath: "/glow-park",
    serviceName: "Glow Park Experience",
  },
  "/novelties": {
    title: "Custom Event Novelties & Interactive Maker Stations | Next Level Gaming & Novelties",
    description:
      "Interactive custom novelty stations for events: Patched City trucker hats & beanies, custom socks, sequin pillows, pillow dolls, bead & intention bracelets, custom rings, license plates, and laser-engraved wood & metal keychains.",
    keywords:
      "custom event novelties, college novelty event, custom trucker hat bar, Patched City hats, laser engraved keychains, custom sequin pillows, custom event souvenirs, Next Level Gaming and Novelties",
    image: `${SITE_URL}/novelties-bg.png`,
    canonicalPath: "/novelties",
    serviceName: "Custom Event Novelties & Maker Workshops",
  },
  "/about": {
    title: "About Us | Next Level Gaming & Novelties — Event Production Team",
    description:
      "Founded by Calvin Reid and Yaw Boateng, Next Level Gaming & Novelties brings over 10 years of turnkey gaming, big-screen entertainment, VR, and custom novelty production to colleges and events.",
    keywords:
      "About Next Level Gaming, Calvin Reid, Yaw Boateng, Next Level Gaming Events story, event entertainment company Hudson NH",
    image: `${SITE_URL}/about-gaming-event.jpg`,
    canonicalPath: "/about",
  },
  "/contact": {
    title: "Contact Us | Next Level Gaming & Novelties — Hudson, NH (978-601-5473)",
    description:
      "Get in touch with Next Level Gaming & Novelties to plan your next campus, school, corporate, or private event. Email sales@nextlevelgamingevents.com or call 978-601-5473.",
    keywords:
      "contact Next Level Gaming, Next Level Gaming phone number, sales@nextlevelgamingevents.com, book gaming event",
    image: DEFAULT_IMAGE,
    canonicalPath: "/contact",
  },
  "/quote": {
    title: "Request an Event Quote | Next Level Gaming & Novelties",
    description:
      "Build your custom event package and request a fast quote for gaming events, outdoor movie nights, VR, 360 photo booths, silent disco, sim racing, glow parks, or custom novelties.",
    keywords:
      "Next Level Gaming quote, book college gaming event, outdoor movie screen quote, event entertainment pricing",
    image: DEFAULT_IMAGE,
    canonicalPath: "/quote",
  },
  "/novelty-order": {
    title: "Order Custom Event Novelties | Next Level Gaming & Novelties",
    description:
      "Request pricing and place an inquiry for custom event novelties, personalized keepsakes, and on-site maker stations from Next Level Gaming & Novelties.",
    keywords:
      "order custom novelties, college novelty bulk order, Next Level Gaming novelties",
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
      description: seo.description,
      url: canonicalUrl,
      image: seo.image || DEFAULT_IMAGE,
      provider: {
        "@id": `${SITE_URL}/#organization`,
      },
      areaServed: "United States",
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

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  AREA_SERVED,
  DEFAULT_IMAGE,
  ROUTE_SEO,
  SITE_URL,
} from "../lib/routeSeoData";

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

function upsertLink(selector, attributes) {
  let link = document.head.querySelector(selector);
  if (!link) {
    link = document.createElement("link");
    document.head.appendChild(link);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    link.setAttribute(key, value);
  });
}

function upsertRouteJsonLd(seo, canonicalUrl) {
  const existing = document.getElementById("seo-route-schema");
  const isHome = seo.canonicalPath === "/";

  if (seo.noindex) {
    if (existing) existing.remove();
    return;
  }

  const imageUrl = seo.image || DEFAULT_IMAGE;
  const graph = [
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
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        ...(!isHome
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: seo.serviceName || seo.heading || seo.title.split("|")[0].trim(),
                item: canonicalUrl,
              },
            ]
          : []),
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
      provider: {
        "@id": `${SITE_URL}/#organization`,
      },
      areaServed: AREA_SERVED,
    };

    if (Array.isArray(seo.offers) && seo.offers.length > 0) {
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

    graph.push(serviceNode);
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
    const imageAlt = seo.heading || seo.title;

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

    upsertMeta('meta[name="thumbnail"]', {
      name: "thumbnail",
      content: imageUrl,
    });

    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: seo.noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    });

    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });
    upsertLink('link[rel="alternate"][hreflang="en-us"]', {
      rel: "alternate",
      hreflang: "en-us",
      href: canonicalUrl,
    });
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: "alternate",
      hreflang: "x-default",
      href: canonicalUrl,
    });

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
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: imageAlt,
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

  return null;
};

export default SeoManager;

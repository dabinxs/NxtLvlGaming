import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AREA_SERVED,
  DEFAULT_IMAGE,
  IMAGE_DIMENSIONS,
  NH_CITY_LINKS,
  REGIONAL_LINKS,
  ROUTE_SEO,
  SITE_URL,
  SPECIALTY_LINKS,
} from "../lib/routeSeoData";
import { LOCAL_PAGE_CONFIG } from "../lib/localLandingConfig";

function toCanonicalPath(href) {
  if (!href) return null;
  const targetSeo = ROUTE_SEO[href];
  return targetSeo?.canonicalPath || href;
}

function toCanonicalHref(href) {
  const canonicalPath = toCanonicalPath(href);
  if (!canonicalPath) return null;
  return `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;
}

const CANONICAL_DIRECTORY_LINKS = [...NH_CITY_LINKS, ...REGIONAL_LINKS, ...SPECIALTY_LINKS]
  .map((item) => ({
    label: item.label,
    href: toCanonicalPath(item.href),
  }))
  .filter((item, idx, arr) => item.href && arr.findIndex((x) => x.href === item.href) === idx);

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

function upsertRouteJsonLd(seo, canonicalUrl, routeKey) {
  const existing = document.getElementById("seo-route-schema");
  const isHome = seo.canonicalPath === "/";
  const localCfg = LOCAL_PAGE_CONFIG[routeKey] || null;

  if (seo.noindex) {
    if (existing) existing.remove();
    return;
  }

  const imageUrl = seo.image || DEFAULT_IMAGE;
  const imageDims = IMAGE_DIMENSIONS[imageUrl] || { width: 1024, height: 682 };
  const imageAlt = seo.heading || seo.title;
  const imageObj = {
    "@type": "ImageObject",
    url: imageUrl,
    contentUrl: imageUrl,
    width: imageDims.width,
    height: imageDims.height,
    representativeOfPage: true,
    caption: imageAlt,
  };
  const fullBodyText = [
    seo.summary,
    seo.details,
    localCfg?.dispatchNote,
    localCfg?.localContextCopy,
    ...(Array.isArray(seo.highlights) ? seo.highlights : []),
  ]
    .filter(Boolean)
    .join(" ");

  const webPageNode = {
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: seo.title,
    headline: seo.heading || seo.title,
    description: seo.description,
    ...(seo.summary ? { abstract: seo.summary } : {}),
    ...(fullBodyText ? { text: fullBodyText } : {}),
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    image: imageObj,
    primaryImageOfPage: imageObj,
  };
  if (seo.serviceName) {
    webPageNode.mainEntity = { "@id": `${canonicalUrl}#service` };
  }

  const rawLinks = [
    ...(Array.isArray(seo.relatedLinks) ? seo.relatedLinks : []),
    ...NH_CITY_LINKS,
    ...REGIONAL_LINKS,
  ];
  const canonicalLinks = Array.from(
    new Set(
      rawLinks
        .map((item) => toCanonicalHref(item?.href))
        .filter((url) => url && url !== canonicalUrl)
    )
  );
  if (canonicalLinks.length > 0) {
    if (isHome) {
      webPageNode.significantLink = canonicalLinks;
    } else {
      webPageNode.relatedLink = canonicalLinks;
    }
  }

  const graph = [
    webPageNode,
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
    const richServiceDesc = [
      seo.summary,
      seo.details,
      localCfg?.dispatchNote,
      localCfg?.localContextCopy,
    ]
      .filter(Boolean)
      .join(" ") || seo.description;

    const serviceNode = {
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      name: seo.serviceName,
      serviceType: seo.serviceName,
      ...(seo.subhead || seo.heroEyebrow ? { slogan: seo.subhead || seo.heroEyebrow } : {}),
      description: richServiceDesc,
      url: canonicalUrl,
      image: imageObj,
      provider: {
        "@id": `${SITE_URL}/#organization`,
      },
      areaServed: seo.areaServed || AREA_SERVED,
    };

    const combinedOffers = [
      ...(Array.isArray(seo.offers) ? seo.offers : []),
      ...(Array.isArray(localCfg?.featuredPackages)
        ? localCfg.featuredPackages.map((pkg) => ({
            name: pkg.title,
            description: `${pkg.specs} — ${pkg.desc}`,
            url: toCanonicalHref(pkg.href) || canonicalUrl,
          }))
        : []),
    ];

    if (combinedOffers.length > 0) {
      serviceNode.hasOfferCatalog = {
        "@type": "OfferCatalog",
        name: `${seo.serviceName} — Packages & Products`,
        itemListElement: combinedOffers.map((offer) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: offer.name,
            description: offer.description,
            url: offer.url || canonicalUrl,
          },
        })),
      };
    }

    const additionalProps = [
      ...(Array.isArray(seo.highlights)
        ? seo.highlights.map((h, idx) => ({
            "@type": "PropertyValue",
            name: `Highlight ${idx + 1}`,
            value: h,
          }))
        : []),
      ...(Array.isArray(localCfg?.localVenues)
        ? localCfg.localVenues.map((v) => ({
            "@type": "PropertyValue",
            name: v.name,
            value: v.setting,
          }))
        : []),
      ...(Array.isArray(seo.faqs)
        ? seo.faqs.map((f) => ({
            "@type": "PropertyValue",
            name: f.q,
            value: f.a,
          }))
        : []),
    ];

    if (additionalProps.length > 0) {
      serviceNode.additionalProperty = additionalProps;
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
    const imageDims = IMAGE_DIMENSIONS[imageUrl] || { width: 1024, height: 682 };
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
    upsertMeta('meta[property="og:image:width"]', {
      property: "og:image:width",
      content: String(imageDims.width),
    });
    upsertMeta('meta[property="og:image:height"]', {
      property: "og:image:height",
      content: String(imageDims.height),
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
    upsertMeta('meta[name="twitter:image:alt"]', {
      name: "twitter:image:alt",
      content: imageAlt,
    });

    upsertRouteJsonLd(seo, canonicalUrl, normalizedPath);
  }, [pathname, normalizedPath, seo]);

  if (seo.noindex) {
    return null;
  }

  const localCfg = LOCAL_PAGE_CONFIG[normalizedPath] || null;

  return (
    <aside
      id="seo-route-context"
      hidden
      aria-hidden="true"
      style={{ display: "none" }}
    >
      {seo.heading && <h2>{seo.heading}</h2>}
      {seo.summary && <p>{seo.summary}</p>}
      {seo.subhead && <h3>{seo.subhead}</h3>}
      {seo.details && <p>{seo.details}</p>}
      {Array.isArray(seo.highlights) && seo.highlights.length > 0 && (
        <ul>
          {seo.highlights.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
      {localCfg && (
        <section>
          {localCfg.sectionTitle && <h3>{localCfg.sectionTitle}</h3>}
          {localCfg.dispatchNote && <p>{localCfg.dispatchNote}</p>}
          {Array.isArray(localCfg.featuredPackages) &&
            localCfg.featuredPackages.map((pkg) => (
              <article key={pkg.title}>
                <h4>{pkg.title}</h4>
                <p>
                  {pkg.specs} — {pkg.desc}{" "}
                  <Link to={toCanonicalPath(pkg.href) || pkg.href}>View Specs</Link>
                </p>
              </article>
            ))}
          {localCfg.localContextHeading && <h4>{localCfg.localContextHeading}</h4>}
          {localCfg.localContextCopy && <p>{localCfg.localContextCopy}</p>}
        </section>
      )}
      {Array.isArray(seo.offers) && seo.offers.length > 0 && (
        <section>
          <h3>Available Rental Packages</h3>
          {seo.offers.map((offer) => (
            <article key={offer.name}>
              <h4>{offer.name}</h4>
              <p>{offer.description}</p>
            </article>
          ))}
        </section>
      )}
      {Array.isArray(seo.faqs) && seo.faqs.length > 0 && (
        <section>
          <h3>Frequently Asked Questions</h3>
          <dl>
            {seo.faqs.map((faq) => (
              <React.Fragment key={faq.q}>
                <dt>{faq.q}</dt>
                <dd>{faq.a}</dd>
              </React.Fragment>
            ))}
          </dl>
        </section>
      )}
      <nav aria-label="Service Area and Experience Directory">
        {CANONICAL_DIRECTORY_LINKS.map((item) => (
          <Link key={item.href} to={item.href}>
            {item.label}
          </Link>
        ))}
        <Link to="/explore-experiences">All Event Experiences</Link>
        <Link to="/about">About Next Level Gaming &amp; Novelties</Link>
        <Link to="/contact">Contact Hudson NH 03051 &amp; North Carolina Crew</Link>
        <Link to="/quote">Request Event Rental Quote</Link>
        <Link to="/novelty-order">Order Custom Event Novelties</Link>
      </nav>
    </aside>
  );
};

export default SeoManager;

const fs = require("fs");
const path = require("path");
const {
  AREA_SERVED,
  DEFAULT_IMAGE,
  IMAGE_DIMENSIONS,
  NH_CITY_LINKS,
  REGIONAL_LINKS,
  ROUTE_SEO,
  SITE_URL,
  SPECIALTY_LINKS,
} = require("../src/lib/routeSeoData");
const { LOCAL_PAGE_CONFIG } = require("../src/lib/localLandingConfig");

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toRootRelative(url) {
  if (!url) return "/hero-bg.jpg";
  if (url.startsWith("/")) return url;
  return "/" + url.replace(/^https?:\/\/[^/]+\/?/i, "");
}

function toCanonicalPath(href) {
  if (!href) return null;
  const targetSeo = ROUTE_SEO[href];
  return targetSeo?.canonicalPath || href;
}

function toCanonicalUrl(href) {
  const canonicalPath = toCanonicalPath(href);
  if (!canonicalPath) return null;
  return `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;
}

function buildRouteHtml(baseHtml, routeKey, seo) {
  const canonicalPath = seo.canonicalPath === "/" ? "/" : seo.canonicalPath;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const imageUrl = seo.image || DEFAULT_IMAGE;
  const imageDims = IMAGE_DIMENSIONS[imageUrl] || { width: 1024, height: 682 };
  const imageAlt = seo.heading || seo.title;
  const buildDateIso = new Date().toISOString().slice(0, 10);
  const localCfg = LOCAL_PAGE_CONFIG[routeKey] || null;
  const preloadHref =
    seo.preloadImage === null
      ? null
      : seo.preloadImage || localCfg?.heroImage || seo.heroImageLocal || toRootRelative(imageUrl);
  const robots = seo.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  let html = baseHtml;

  // Update or remove hero preload link so every route only preloads the exact hero image React paints
  if (preloadHref === null || seo.noindex) {
    html = html.replace(/<link\s+id="seo-hero-preload"[^>]*>\s*/i, "");
  } else {
    html = html.replace(
      /<link\s+id="seo-hero-preload"[^>]*>/i,
      `<link id="seo-hero-preload" rel="preload" as="image" href="${escapeHtml(preloadHref)}" fetchpriority="high"/>`
    );
  }

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
    /<meta\s+name="thumbnail"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="thumbnail" content="${imageUrl}"/>`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}"/>`
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="en-us"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="en-us" href="${canonicalUrl}"/>`
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}"/>`
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
    /<meta\s+property="og:image:width"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:width" content="${imageDims.width}"/>`
  );
  html = html.replace(
    /<meta\s+property="og:image:height"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:height" content="${imageDims.height}"/>`
  );
  html = html.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}"/>`
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
  html = html.replace(
    /<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}"/>`
  );

  html = html.replace(/<script\s+id="seo-route-schema"[\s\S]*?<\/script>/i, "");

  if (!seo.noindex) {
    const isHome = canonicalPath === "/";
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
      dateModified: buildDateIso,
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
          .map((item) => toCanonicalUrl(item?.href))
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

    const routeGraph = [
      webPageNode,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
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
      const richServiceDesc =
        [
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
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: seo.areaServed || AREA_SERVED,
      };

      const combinedOffers = [
        ...(Array.isArray(seo.offers) ? seo.offers : []),
        ...(Array.isArray(localCfg?.featuredPackages)
          ? localCfg.featuredPackages.map((pkg) => ({
              name: pkg.title,
              description: `${pkg.specs} — ${pkg.desc}`,
              url: toCanonicalUrl(pkg.href) || canonicalUrl,
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

      routeGraph.push(serviceNode);
    }

    const routeSchemaTag = `<script id="seo-route-schema" type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@graph": routeGraph,
    })}</script>`;
    html = html.replace("</head>", `${routeSchemaTag}</head>`);
  }

  if (seo.noindex) {
    const noindexMainHtml = `<main style="min-height:100vh;background-color:#05070f;color:#ffffff;display:flex;align-items:center;justify-content:center;padding:40px 20px;text-align:center;">
      <div style="max-width:640px;">
        <h1 style="margin:0 0 12px;font-size:28px;font-weight:800;">${escapeHtml(seo.title)}</h1>
        <p style="margin:0;color:#cbd5e1;line-height:1.6;">${escapeHtml(seo.description)}</p>
      </div>
    </main>`;
    html = html.replace(/<main\b[^>]*>[\s\S]*?<\/main>/i, noindexMainHtml);
  } else if (seo.heading && seo.summary) {
    const heroImgHtml = preloadHref
      ? `<img src="${escapeHtml(preloadHref)}" alt="${escapeHtml(imageAlt)}" width="${imageDims.width}" height="${imageDims.height}" fetchpriority="high" decoding="sync" style="display:block;max-width:100%;height:auto;margin:0 auto 24px;border-radius:16px;" />`
      : "";

    const allFooterLinks = [...NH_CITY_LINKS, ...REGIONAL_LINKS, ...SPECIALTY_LINKS]
      .map((item) => ({
        label: item.label,
        href: toCanonicalPath(item.href),
      }))
      .filter((item, idx, arr) => item.href && arr.findIndex((x) => x.href === item.href) === idx)
      .map((item) => `<a href="${escapeHtml(item.href)}" style="color:#94a3b8;text-decoration:none;">${escapeHtml(item.label)}</a>`)
      .join(" · ");

    const detailsParts = [];
    if (seo.subhead || seo.details) {
      detailsParts.push(
        `<section style="max-width:1180px;margin:0 auto;padding:24px 20px;color:#cbd5e1;font-size:15px;line-height:1.7;">` +
          (seo.subhead ? `<h2 style="margin:0 0 10px;font-size:22px;color:#ffffff;">${escapeHtml(seo.subhead)}</h2>` : "") +
          (seo.details ? `<p style="margin:0 0 12px;">${escapeHtml(seo.details)}</p>` : "") +
          (Array.isArray(seo.highlights) && seo.highlights.length
            ? `<ul style="margin:0;padding-left:20px;">${seo.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>`
            : "") +
        `</section>`
      );
    }
    if (localCfg) {
      const pkgHtml = Array.isArray(localCfg.featuredPackages)
        ? localCfg.featuredPackages
            .map(
              (pkg) =>
                `<article style="margin:0 0 12px;"><h3 style="margin:0 0 4px;font-size:17px;color:#ffffff;">${escapeHtml(pkg.title)}</h3><p style="margin:0;">${escapeHtml(pkg.specs)} — ${escapeHtml(pkg.desc)} <a href="${escapeHtml(toCanonicalPath(pkg.href) || pkg.href)}" style="color:#7DDDFF;">View Specs</a></p></article>`
            )
            .join("")
        : "";
      const venueHtml = Array.isArray(localCfg.localVenues)
        ? `<ul style="margin:8px 0 0;padding-left:20px;">${localCfg.localVenues
            .map((v) => {
              const cHref = toCanonicalPath(v.href);
              const titleHtml = cHref
                ? `<a href="${escapeHtml(cHref)}" style="color:#7DDDFF;text-decoration:none;font-weight:700;">${escapeHtml(v.name)}</a>`
                : `<strong>${escapeHtml(v.name)}</strong>`;
              return `<li>${titleHtml}: ${escapeHtml(v.setting)}</li>`;
            })
            .join("")}</ul>`
        : "";
      detailsParts.push(
        `<section style="max-width:1180px;margin:0 auto;padding:16px 20px;color:#cbd5e1;font-size:15px;line-height:1.7;">` +
          `<h2 style="margin:0 0 10px;font-size:22px;color:#ffffff;">${escapeHtml(localCfg.sectionTitle || localCfg.localContextHeading || "")}</h2>` +
          (localCfg.dispatchNote ? `<p style="margin:0 0 12px;">${escapeHtml(localCfg.dispatchNote)}</p>` : "") +
          pkgHtml +
          (localCfg.localContextHeading ? `<h3 style="margin:16px 0 6px;font-size:18px;color:#ffffff;">${escapeHtml(localCfg.localContextHeading)}</h3>` : "") +
          (localCfg.localContextCopy ? `<p style="margin:0 0 8px;">${escapeHtml(localCfg.localContextCopy)}</p>` : "") +
          venueHtml +
        `</section>`
      );
    } else if (Array.isArray(seo.offers) && seo.offers.length) {
      detailsParts.push(
        `<section style="max-width:1180px;margin:0 auto;padding:16px 20px;color:#cbd5e1;font-size:15px;line-height:1.7;">` +
          `<h2 style="margin:0 0 10px;font-size:20px;color:#ffffff;">Available Rental Packages</h2>` +
          seo.offers
            .map((o) => `<article style="margin:0 0 10px;"><h3 style="margin:0 0 4px;font-size:16px;color:#ffffff;">${escapeHtml(o.name)}</h3><p style="margin:0;">${escapeHtml(o.description)}</p></article>`)
            .join("") +
        `</section>`
      );
    }
    if (Array.isArray(seo.faqs) && seo.faqs.length) {
      detailsParts.push(
        `<section style="max-width:1180px;margin:0 auto;padding:16px 20px;color:#cbd5e1;font-size:14px;line-height:1.7;">` +
          `<h2 style="margin:0 0 10px;font-size:20px;color:#ffffff;">Frequently Asked Questions</h2><dl style="margin:0;">` +
          seo.faqs.map((f) => `<dt style="font-weight:700;color:#ffffff;margin-top:10px;">${escapeHtml(f.q)}</dt><dd style="margin:4px 0 0;">${escapeHtml(f.a)}</dd>`).join("") +
        `</dl></section>`
      );
    }

    const customMainHtml = `<main style="min-height:100vh;background-color:#05070f;color:#ffffff;">
      <header style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;max-width:1240px;margin:0 auto;padding:18px 20px;border-bottom:1px solid rgba(255,255,255,0.08);">
        <a href="/" style="color:#ffffff;text-decoration:none;font-weight:800;font-size:15px;letter-spacing:0.08em;text-transform:uppercase;">Next Level Gaming &amp; Novelties</a>
        <nav aria-label="Primary links" style="display:flex;flex-wrap:wrap;gap:14px;font-size:13px;">
          <a href="/explore-experiences" style="color:#cbd5e1;text-decoration:none;">Experiences</a>
          <a href="/gaming-events" style="color:#cbd5e1;text-decoration:none;">Gaming Events</a>
          <a href="/movie-nights" style="color:#cbd5e1;text-decoration:none;">Movie Nights</a>
          <a href="/photo-booth" style="color:#cbd5e1;text-decoration:none;">Photo Booths</a>
          <a href="/novelties" style="color:#cbd5e1;text-decoration:none;">Novelties</a>
          <a href="/quote" style="color:#7DDDFF;text-decoration:none;font-weight:700;">Get Quote</a>
        </nav>
      </header>
      <section style="position:relative;overflow:hidden;min-height:86vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:52px 20px;background-color:#05070f;">
        <div style="position:relative;z-index:2;max-width:900px;margin:0 auto;">
          ${heroImgHtml}
          <h1 style="margin:0;font-size:clamp(1.75rem,4.3vw,3.4rem);font-weight:800;line-height:1.08;text-transform:uppercase;color:#ffffff;">${escapeHtml(seo.heroDisplayTitle || seo.heading)}</h1>
          <p style="margin:18px auto 0;max-width:740px;font-size:16px;line-height:1.65;color:#e2e8f0;">${escapeHtml(seo.summary)}</p>
          <div style="margin-top:24px;display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
            <a href="/explore-experiences" style="display:inline-block;padding:13px 22px;border-radius:999px;background:#0066FD;color:#ffffff;font-weight:700;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;">Explore Experiences</a>
            <a href="/quote" style="display:inline-block;padding:13px 22px;border-radius:999px;border:1px solid rgba(255,255,255,0.45);background:rgba(12,24,48,0.8);color:#ffffff;font-weight:700;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;">Request Quote</a>
          </div>
        </div>
      </section>
      ${detailsParts.join("\n")}
      <footer style="max-width:1180px;margin:24px auto 0;padding:24px 20px 48px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;line-height:1.8;color:#94a3b8;">
        <p style="margin:0 0 8px;">${allFooterLinks}</p>
        <p style="margin:0;"><a href="/about" style="color:#cbd5e1;">About</a> · <a href="/contact" style="color:#cbd5e1;">Contact</a> · <a href="/novelty-order" style="color:#cbd5e1;">Order Custom Novelties</a> · Hudson, NH 03051 · <a href="tel:9786015473" style="color:#7DDDFF;">978-601-5473</a></p>
      </footer>
    </main>`;

    html = html.replace(/<main\b[^>]*>[\s\S]*?<\/main>/i, customMainHtml);
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

  for (const [routeKey, seo] of Object.entries(ROUTE_SEO)) {
    if (routeKey === "/360-booth") continue;
    const outFileName = routeKey === "/" ? "index.html" : `${routeKey.replace(/^\/+/, "")}.html`;
    const outHtml = buildRouteHtml(baseHtml, routeKey, seo);
    fs.writeFileSync(path.join(buildDir, outFileName), outHtml, "utf8");
    count++;
  }

  console.log(`Pre-rendered SEO HTML for ${count} routes in build/`);
}

run();

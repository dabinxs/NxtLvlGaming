const fs = require("fs");
const path = require("path");
const {
  AREA_SERVED,
  DEFAULT_IMAGE,
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

function stripBaseFaqSchema(html) {
  return html.replace(
    /,\s*\{\s*"@type"\s*:\s*"FAQPage"[\s\S]*?"mainEntity"\s*:\s*\[[\s\S]*?\]\s*\}\s*(?=,\s*\{\s*"@type"\s*:\s*"WebSite")/i,
    ""
  );
}

function buildRouteHtml(baseHtml, routeKey, seo) {
  const canonicalPath = seo.canonicalPath === "/" ? "/" : seo.canonicalPath;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const imageUrl = seo.image || DEFAULT_IMAGE;
  const imageAlt = seo.heading || seo.title;
  const localCfg = LOCAL_PAGE_CONFIG[routeKey] || null;
  const preloadHref =
    seo.preloadImage === null
      ? null
      : seo.preloadImage || localCfg?.heroImage || seo.heroImageLocal || toRootRelative(imageUrl);
  const robots = seo.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  let html = baseHtml;

  // Remove generic homepage FAQPage on every non-home route so FAQPage schema matches visible page content
  if (routeKey !== "/") {
    html = stripBaseFaqSchema(html);
  }

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

  if (!seo.noindex) {
    const routeGraph = [
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
      const serviceNode = {
        "@type": "Service",
        name: seo.serviceName,
        serviceType: seo.serviceName,
        description: seo.description,
        url: canonicalUrl,
        image: imageUrl,
        provider: { "@id": `${SITE_URL}/#organization` },
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

      routeGraph.push(serviceNode);
    }

    if (Array.isArray(seo.faqs) && seo.faqs.length > 0) {
      routeGraph.push({
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: seo.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      });
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
      ? `<img src="${escapeHtml(preloadHref)}" alt="${escapeHtml(imageAlt)}" width="1200" height="630" fetchpriority="high" decoding="sync" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.4;" />`
      : "";

    const localDispatchHtml = localCfg
      ? `
      <section style="border:1px solid rgba(0,102,253,0.45);border-radius:16px;padding:24px;background:#070b16;">
        <p style="margin:0 0 8px;color:#7DDDFF;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">${escapeHtml(localCfg.dispatchBadge)}</p>
        <h2 style="margin:0 0 10px;font-size:22px;color:#ffffff;">${escapeHtml(localCfg.sectionTitle)}</h2>
        <p style="margin:0 0 18px;color:#cbd5e1;line-height:1.6;">${escapeHtml(localCfg.dispatchNote)}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;">
          ${localCfg.featuredPackages
            .map(
              (pkg) => `<article style="border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:16px;background:#0c1830;">
                <p style="margin:0 0 6px;color:#7DDDFF;font-size:11px;font-weight:700;text-transform:uppercase;">${escapeHtml(pkg.badge)}</p>
                <h3 style="margin:0 0 6px;font-size:17px;color:#ffffff;">${escapeHtml(pkg.title)}</h3>
                <p style="margin:0 0 8px;color:#7DDDFF;font-size:12px;font-weight:600;">${escapeHtml(pkg.specs)}</p>
                <p style="margin:0 0 10px;color:#cbd5e1;font-size:14px;line-height:1.5;">${escapeHtml(pkg.desc)}</p>
                <a href="${escapeHtml(pkg.href)}" style="color:#7DDDFF;font-size:13px;font-weight:700;">View ${escapeHtml(pkg.title)} →</a>
              </article>`
            )
            .join("\n          ")}
        </div>
        <h3 style="margin:22px 0 8px;font-size:18px;color:#ffffff;">${escapeHtml(localCfg.localContextHeading)}</h3>
        <p style="margin:0 0 14px;color:#cbd5e1;line-height:1.6;">${escapeHtml(localCfg.localContextCopy)}</p>
        <ul style="margin:0;padding-left:20px;color:#cbd5e1;line-height:1.7;">
          ${localCfg.localVenues
            .map(
              (v) => `<li><strong>${escapeHtml(v.name)}:</strong> ${escapeHtml(v.setting)}</li>`
            )
            .join("\n          ")}
        </ul>
      </section>`
      : "";

    const subheadBlock =
      seo.subhead && seo.details
        ? `<section style="border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px;background:#070b16;"><h2 style="margin:0 0 10px;font-size:21px;color:#ffffff;">${escapeHtml(seo.subhead)}</h2><p style="margin:0;color:#cbd5e1;line-height:1.6;">${escapeHtml(seo.details)}</p></section>`
        : "";

    let highlightsHtml = "";
    if (Array.isArray(seo.highlights) && seo.highlights.length > 0) {
      highlightsHtml = `
      <section style="border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px;background:#070b16;">
        <h2 style="margin:0 0 12px;font-size:21px;color:#ffffff;">Key Rental Highlights &amp; Specifications</h2>
        <ul style="margin:0;padding-left:20px;color:#cbd5e1;line-height:1.7;">
          ${seo.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("\n          ")}
        </ul>
      </section>`;
    }

    let offersHtml = "";
    if (Array.isArray(seo.offers) && seo.offers.length > 0) {
      offersHtml = `
      <section style="border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px;background:#070b16;">
        <h2 style="margin:0 0 12px;font-size:21px;color:#ffffff;">Available Rental Packages &amp; Custom Event Products</h2>
        <ul style="margin:0;padding-left:20px;color:#cbd5e1;line-height:1.7;">
          ${seo.offers
            .map(
              (o) =>
                `<li><strong>${escapeHtml(o.name)}:</strong> ${escapeHtml(o.description)}</li>`
            )
            .join("\n          ")}
        </ul>
      </section>`;
    }

    let faqHtml = "";
    if (Array.isArray(seo.faqs) && seo.faqs.length > 0) {
      faqHtml = `
      <section style="border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px;background:#070b16;">
        <h2 style="margin:0 0 12px;font-size:21px;color:#ffffff;">Frequently Asked Questions</h2>
        <dl style="margin:0;color:#cbd5e1;">
          ${seo.faqs
            .map(
              (f) =>
                `<dt style="font-weight:bold;margin-top:14px;color:#ffffff;">${escapeHtml(f.q)}</dt><dd style="margin-left:0;margin-top:6px;line-height:1.6;"><p style="margin:0;">${escapeHtml(f.a)}</p></dd>`
            )
            .join("\n          ")}
        </dl>
      </section>`;
    }

    const serviceLinksList = SPECIALTY_LINKS.map(
      (link) => `<li><a href="${escapeHtml(link.href)}" style="color:#7DDDFF;">${escapeHtml(link.label)}</a></li>`
    ).join("\n          ");

    const nhLinksList = NH_CITY_LINKS.map(
      (link) => `<a href="${escapeHtml(link.href)}" style="color:#7DDDFF;">${escapeHtml(link.label)}</a>`
    ).join(", ");

    const regionalLinksList = REGIONAL_LINKS.map(
      (link) => `<a href="${escapeHtml(link.href)}" style="color:#7DDDFF;">${escapeHtml(link.label)}</a>`
    ).join(", ");

    const relatedLinksHtml = `
      <section style="border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px;background:#070b16;">
        <h2 style="margin:0 0 12px;font-size:21px;color:#ffffff;">Explore Party Equipment Rentals, Custom Novelties &amp; Regional Hubs</h2>
        <p style="margin:0 0 12px;color:#cbd5e1;line-height:1.6;">Next Level Gaming Events &amp; Novelties (Rebel Rd, Hudson, NH 03051 &amp; North Carolina) provides insured, full-service party equipment rentals and custom novelty workshops:</p>
        <ul style="margin:0 0 14px;padding-left:20px;color:#cbd5e1;line-height:1.7;">
          ${serviceLinksList}
        </ul>
        <p style="margin:0 0 8px;color:#cbd5e1;line-height:1.6;">New Hampshire Local Hubs: ${nhLinksList}.</p>
        <p style="margin:0 0 8px;color:#cbd5e1;line-height:1.6;">Regional Coverage: ${regionalLinksList}.</p>
        <p style="margin:0;color:#cbd5e1;line-height:1.6;">Plan your event: <a href="/explore-experiences" style="color:#7DDDFF;">Explore All Experiences</a>, <a href="/quote" style="color:#7DDDFF;">Request a Custom Quote Online</a>, <a href="/novelty-order" style="color:#7DDDFF;">Order Custom Event Novelties</a>, <a href="/about" style="color:#7DDDFF;">About Our Team</a>, <a href="/contact" style="color:#7DDDFF;">Contact Us</a>, or call <a href="tel:9786015473" style="color:#7DDDFF;">978-601-5473</a>.</p>
      </section>`;

    const eyebrowHtml = seo.heroEyebrow
      ? `<p style="display:inline-block;margin:0 0 16px;padding:6px 14px;border-radius:999px;border:1px solid rgba(0,102,253,0.5);background:rgba(5,10,22,0.85);color:#7DDDFF;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">${escapeHtml(seo.heroEyebrow)}</p>`
      : "";

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
      <section style="position:relative;overflow:hidden;min-height:64vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:52px 20px;background-color:#05070f;">
        ${heroImgHtml}
        <div style="position:relative;z-index:2;max-width:900px;margin:0 auto;">
          ${eyebrowHtml}
          <h1 style="margin:0;font-size:clamp(1.75rem,4.3vw,3.4rem);font-weight:800;line-height:1.08;text-transform:uppercase;color:#ffffff;">${escapeHtml(seo.heading)}</h1>
          <p style="margin:18px auto 0;max-width:740px;font-size:16px;line-height:1.65;color:#e2e8f0;">${escapeHtml(seo.summary)}</p>
          <div style="margin-top:24px;display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
            <a href="/explore-experiences" style="display:inline-block;padding:13px 22px;border-radius:10px;background:#0066FD;color:#ffffff;font-weight:700;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;">Explore Experiences</a>
            <a href="/quote" style="display:inline-block;padding:13px 22px;border-radius:10px;border:1px solid rgba(255,255,255,0.45);background:rgba(12,24,48,0.8);color:#ffffff;font-weight:700;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;">Request Quote</a>
          </div>
        </div>
      </section>
      <div style="max-width:1180px;margin:0 auto;padding:36px 20px 64px;display:grid;gap:24px;">
        ${localDispatchHtml}
        ${subheadBlock}
        ${highlightsHtml}
        ${offersHtml}
        ${faqHtml}
        ${relatedLinksHtml}
      </div>
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
    if (routeKey === "/" || routeKey === "/360-booth") continue;
    const cleanRoute = routeKey.replace(/^\/+/, "");
    const outHtml = buildRouteHtml(baseHtml, routeKey, seo);
    fs.writeFileSync(path.join(buildDir, `${cleanRoute}.html`), outHtml, "utf8");
    count++;
  }

  console.log(`Pre-rendered SEO HTML for ${count} routes in build/`);
}

run();

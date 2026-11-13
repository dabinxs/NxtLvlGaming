const fs = require("fs");
const path = require("path");
const {
  AREA_SERVED,
  DEFAULT_IMAGE,
  ROUTE_SEO,
  SITE_URL,
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
      <section style="position:relative;overflow:hidden;min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:52px 20px;background-color:#05070f;">
        ${heroImgHtml}
        <div style="position:relative;z-index:2;max-width:900px;margin:0 auto;">
          <h1 style="margin:0;font-size:clamp(1.75rem,4.3vw,3.4rem);font-weight:800;line-height:1.08;text-transform:uppercase;color:#ffffff;">${escapeHtml(seo.heroDisplayTitle || seo.heading)}</h1>
          <p style="margin:18px auto 0;max-width:740px;font-size:16px;line-height:1.65;color:#e2e8f0;">${escapeHtml(seo.summary)}</p>
          <div style="margin-top:24px;display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
            <a href="/explore-experiences" style="display:inline-block;padding:13px 22px;border-radius:999px;background:#0066FD;color:#ffffff;font-weight:700;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;">Explore Experiences</a>
            <a href="/quote" style="display:inline-block;padding:13px 22px;border-radius:999px;border:1px solid rgba(255,255,255,0.45);background:rgba(12,24,48,0.8);color:#ffffff;font-weight:700;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;">Request Quote</a>
          </div>
        </div>
      </section>
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

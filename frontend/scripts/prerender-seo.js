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

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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
  const robots = seo.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  let html = baseHtml;

  // Remove generic homepage FAQPage on every non-home route so FAQPage schema matches visible page content
  if (routeKey !== "/") {
    html = stripBaseFaqSchema(html);
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
    const noindexMainHtml = `<main style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">
      <h1>${escapeHtml(seo.title)}</h1>
      <p>${escapeHtml(seo.description)}</p>
    </main>`;
    html = html.replace(/<main\b[^>]*>[\s\S]*?<\/main>/i, noindexMainHtml);
  } else if (seo.heading && seo.summary) {
    const subheadBlock =
      seo.subhead && seo.details
        ? `<h2>${escapeHtml(seo.subhead)}</h2><p>${escapeHtml(seo.details)}</p>`
        : "";

    let highlightsHtml = "";
    if (Array.isArray(seo.highlights) && seo.highlights.length > 0) {
      highlightsHtml = `
      <section>
        <h2>Key Rental Highlights &amp; Specifications</h2>
        <ul>
          ${seo.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("\n          ")}
        </ul>
      </section>`;
    }

    let offersHtml = "";
    if (Array.isArray(seo.offers) && seo.offers.length > 0) {
      offersHtml = `
      <section>
        <h2>Available Rental Packages &amp; Custom Event Products</h2>
        <ul>
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
      <section>
        <h2>Frequently Asked Questions</h2>
        <dl>
          ${seo.faqs
            .map(
              (f) =>
                `<dt style="font-weight:bold;margin-top:12px;">${escapeHtml(f.q)}</dt><dd style="margin-left:0;margin-top:4px;"><p>${escapeHtml(f.a)}</p></dd>`
            )
            .join("\n          ")}
        </dl>
      </section>`;
    }

    const serviceLinksList = SPECIALTY_LINKS.map(
      (link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`
    ).join("\n          ");

    const nhLinksList = NH_CITY_LINKS.map(
      (link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`
    ).join(", ");

    const regionalLinksList = REGIONAL_LINKS.map(
      (link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`
    ).join(", ");

    const relatedLinksHtml = `
      <section>
        <h2>Explore Party Equipment Rentals, Custom Novelties &amp; Regional Hubs</h2>
        <p>Next Level Gaming Events &amp; Novelties (Rebel Rd, Hudson, NH 03051 &amp; North Carolina) provides insured, full-service party equipment rentals and custom novelty workshops:</p>
        <ul>
          ${serviceLinksList}
        </ul>
        <p>New Hampshire Local Hubs: ${nhLinksList}.</p>
        <p>Regional Coverage: ${regionalLinksList}.</p>
        <p>Plan your event: <a href="/explore-experiences">Explore All Experiences</a>, <a href="/quote">Request a Custom Quote Online</a>, <a href="/novelty-order">Order Custom Event Novelties</a>, <a href="/about">About Our Team</a>, <a href="/contact">Contact Us</a>, or call <a href="tel:9786015473">978-601-5473</a>.</p>
      </section>`;

    const customMainHtml = `<main style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">
      <section>
        <h1>${escapeHtml(seo.heading)}</h1>
        <img src="${imageUrl}" alt="${escapeHtml(imageAlt)}" width="1200" height="630" fetchpriority="high" />
        <p><strong>${escapeHtml(seo.heading)}</strong> — ${escapeHtml(seo.summary)}</p>
        ${subheadBlock}
      </section>
      ${highlightsHtml}
      ${offersHtml}
      ${faqHtml}
      ${relatedLinksHtml}
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

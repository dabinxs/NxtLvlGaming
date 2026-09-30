# Next Level Gaming Events — Landing Page (frontend-only)

## Problem statement
Pixel-close React landing page for a "Next Level Gaming Events" brand: dark theme, blue
#0066FD → #7DDDFF accents, Inter typography everywhere, animated sections, mega-menu nav.
All content is static mock data (`/app/frontend/src/mock.js`). No backend usage.

## Standing design invariants
- Inter for ALL text (headings, body, CTAs, footer). No Kanit/other display fonts.
- Blue palette only — never purple/pink.
- Hero: no photos, no purple glow bar, content vertically centered, two CTAs
  ("PLAN YOUR EVENT", "EXPLORE"), animated white grid background with cursor glow.
- Nav: single continuous silhouette (full-width top strip + centered island with concave
  fillets and rounded bottom), subtle white hairline outline, mega dropdown expands inside it.
- EVENTS dropdown = 3 top-level items only. EXPERIENCE dropdown = 5 items. No spotlight card.
- React Bits Pro blocks CANNOT be installed (paid `REACTBITS_LICENSE_KEY` absent) — all
  React Bits patterns are recreated natively.

## Architecture
- React CRA frontend (`/app/frontend`), Tailwind + shadcn/ui, lucide-react icons.
- FastAPI + Mongo starter exists but is unused.
- Key files: `src/App.js`, `src/index.css`, `src/mock.js`,
  `src/components/{Navbar,Hero,ChooseExperience,TrustedCollaborations,LevelUp,Testimonials,WhoWeAre,ReadyCTA,Footer,LogoMark}.jsx`

## Implemented (as of 2026-06)
- Full landing page: nav, hero, trusted-logos marquee, Choose Your Experience carousel,
  level-up section, testimonials + video modal, who-we-are, CTA, footer.
- Mega-menu nav (Navigation-14 pattern): crossfading full-width panel, staggered reveal,
  hover intent, mobile accordion; links order EVENTS, EXPERIENCE, NOVELTIES, ABOUT, CONTACT;
  right side only the split "GET A QUOTE" CTA.
- Nav silhouette drawn as a measured inline SVG (`NavShape` in Navbar.jsx, ResizeObserver),
  STRIP=14 / FILLET=24 / RADIUS=26, fill #141b2e, stroke rgba(255,255,255,0.22).
- Lenticular-style "Choose Your Experience" carousel: 3D perspective, ±20° Y-turn, ridge
  texture + cyan sheen sweep, 1s cubic-bezier easing, auto-advance 4.5s, pause on hover,
  white circular arrows, blue active dot.
- Hero rebuilt: 3D rectangle carousel removed, content vertically centered, two CTAs,
  96px white grid (9% opacity, radial mask, slow drift) with a cursor-follow cyan glow pool.

- Footer interaction (2026-06): `InteractiveWordmark.jsx` — per-letter magnetic spring
  deformation of the giant NEXT LEVEL wordmark (smoothstep falloff, radius 260, maxY 38 /
  maxX 12 / rot 5 / scale 1.05 / skew 3, rAF + spring integration, desktop-only, honours
  prefers-reduced-motion); LEVEL keeps a continuous gradient via per-letter
  `.letter-gradient` background slices. `CursorTrail.jsx` — lagging blue dot + bending
  trail scoped to the footer. Footer layout/typography/colours untouched.

## Verification
- `iteration_1.json` — nav CONTACT placement, lighter island, curves: 100% pass
- `iteration_2.json` — continuous SVG silhouette, panel growth, resize, dropdown counts: 100% pass
- `iteration_3.json` — nav fixed-position stability across scroll, hero rebuild, grid glow,
  two CTAs, no overflow, dropdown + carousel regressions: 9/9 pass
  (the flagged "338px nav at 1280" was a stale open-menu artifact; re-checked = 65px)

- `iteration_4.json` / `iteration_5.json` — footer spacing, bottom bar, stroke, grid: 100% pass
- `iteration_6.json` — footer wordmark interaction + cursor trail, magnitudes within limits,
  reduced motion/mobile static, no other elements move, design regression clean: 100% pass

## Backlog
- P1: category pages for each dropdown entry (details, gallery, booking)
- P1: quote flow (select services from the menu → request)
- P2: drag/swipe to turn the lenticular cards
- P2: scroll-shrink nav island
- P2: real backend for quote submissions (currently no API at all)

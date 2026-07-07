# 05 — Technical / Build Spec

How the Muslimah Today page plugs into this repo. Principle: **the two brands look
different, but share the repo's plumbing** — reuse is welcome wherever a component or
style could genuinely serve both; the designs simply differ.

## Repo facts (verified)
- **Astro 5** + **Tailwind 4** via the `@tailwindcss/vite` plugin. Tailwind is configured
  in CSS (`@import "tailwindcss";`) — there is **no `tailwind.config.js`**.
- `src/styles/global.css` imports Tailwind **and** defines the **bursary** brand tokens
  (`--brand-primary:#009193`, `--brand-secondary:#f6931c`, `--brand-bg:#97c9c3`, Poppins)
  plus bursary component CSS. The MT page currently styles itself and doesn't need it,
  but importing it is not forbidden — only the MT *visuals* must stay on the MT palette
  (see `02-brand.md`).
- Bursary components: `src/components/Header.astro`, `Hero.astro`, `Footer.astro`,
  `WhoCanApply.astro`, `HowToApply.astro`, `Preloader.astro` (used by `src/pages/index.astro`).
- **Base-path aware:** `withBase()` in `src/utils/paths.ts` prefixes internal links/assets
  with Astro's `base` (driven by `PUBLIC_BASE_PATH`). External URLs pass through unchanged.
- Build/deploy: `npm run dev`, `npm run build`, `npm run check`, `npm run deploy` (gh-pages).
  Site/base via `PUBLIC_SITE` / `PUBLIC_BASE_PATH` env. Deploy target currently
  `bursaries.ilmsa.co.za`.

## Current MT structure
- **Route/page:** `src/pages/MT.astro` → public **`ilmsa.co.za/MT`** (short, flyer-friendly;
  D23). Book button → `ilmsa.co.za/MT2026` (Quicket, different page). Route/base configurable;
  the `ilmsa.co.za/MT` → this-page mapping is infra (Raeesah), like MT2026.
- The page is **self-contained in one file**: its own `<head>`, all section markup, styles
  and scripts live in `MT.astro`. The hero is assembled from the Canva-designed SVG sources
  in `src/assets/muslimah-today/hero/` (imported `?raw`, transformed in frontmatter — the
  SVG files themselves are never edited).
- **Shared components:** `src/components/muslimah-today/Footer.astro` + `SponsorChip.astro`
  (the footer expects the CSS variables bridged in the page's `:root`).
- **Data:** `src/data/muslimah-today/event.ts` (facts/links) + `sponsors.ts` (tiers) —
  transcribed **verbatim** from `01-content.md`.
- **Images:** section photos in `public/mt-events/*.webp`; logos + processed source photos
  in `src/assets/muslimah-today/`.
- **Motion:** GSAP (`gsap` dependency) drives the pinned About scrollytelling; everything
  else is CSS/inline JS, gated on `.js` + `prefers-reduced-motion`.

## Verification
- `npm run build` then `node Muslima_Today/scripts/shoot.mjs` — serves `dist/`, screenshots
  `/MT/` at 360 (mobile) + 1440 (desktop), runs axe (WCAG 2A/AA); artifacts land in
  `Muslima_Today/.verify/` (gitignored).

## Deployment / URL
- Public URL = **`ilmsa.co.za/MT`** (D23); route `src/pages/MT.astro`.
- `[OPEN]` (infra): whether it deploys under the same gh-pages base as the bursary site or its
  own base path (`PUBLIC_BASE_PATH`), since the main site (ilm.sa) links to it — Raeesah to map.

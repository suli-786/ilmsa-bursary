# 05 — Technical / Build Spec

How the Muslimah Today page plugs into this repo. Principle: **reuse the plumbing, never
the branding.**

## Repo facts (verified)
- **Astro 5** + **Tailwind 4** via the `@tailwindcss/vite` plugin. Tailwind is configured
  in CSS (`@import "tailwindcss";`) — there is **no `tailwind.config.js`**.
- `src/styles/global.css` imports Tailwind **and** defines the **bursary** brand tokens
  (`--brand-primary:#009193`, `--brand-secondary:#f6931c`, `--brand-bg:#97c9c3`, Poppins)
  plus bursary component CSS. → The MT page must **not** import this file.
- Bursary components (do not reuse): `src/components/Header.astro`, `Hero.astro`,
  `Footer.astro`, `WhoCanApply.astro`, `HowToApply.astro`, `Preloader.astro`.
- Single existing page: `src/pages/index.astro` (the bursary site).
- **Base-path aware:** `withBase()` in `src/utils/paths.ts` prefixes internal links/assets
  with Astro's `base` (driven by `PUBLIC_BASE_PATH`). External URLs pass through unchanged.
- Build/deploy: `npm run dev`, `npm run build`, `npm run deploy` (gh-pages). Site/base via
  `PUBLIC_SITE` / `PUBLIC_BASE_PATH` env. Deploy target currently `bursaries.ilmsa.co.za`.

## Self-contained structure `[OURS]` (proposed)
- **Route/page:** `src/pages/MT.astro` → public **`ilmsa.co.za/MT`** (short, flyer-friendly;
  D23). Book button → `ilmsa.co.za/MT2026` (Quicket, different page). Route/base configurable;
  the `ilmsa.co.za/MT` → this-page mapping is infra (Raeesah), like MT2026.
- **Styles:** a dedicated **`src/styles/muslimah-today.css`** that does its own
  `@import "tailwindcss";` + the MT tokens from `design/02-design-system.md` registered via
  `@theme { … }` (Tailwind 4, no config file). The MT page imports **only** this — never `global.css`.
- **Data:** repeated content lives in `src/data/muslimah-today/*.ts` (transcribed verbatim from
  `01-content.md`); each repeating block is one component looped over data (`design/03` §3).
- **Components:** namespaced under **`src/components/muslimah-today/`** so nothing collides
  with or pulls in bursary components.
- **Layout:** a minimal MT-specific layout (own `<head>`, title, meta) — not the bursary layout.

## Reuse (plumbing only) ✅
- `withBase()` from `src/utils/paths.ts` for internal links and asset URLs.
- Astro + Tailwind + Vite build pipeline.
- `PUBLIC_BASE_PATH` / `PUBLIC_SITE` env conventions; gh-pages deploy script.

## Do NOT reuse ⛔
- `src/styles/global.css` or any bursary brand token.
- Any bursary component listed above.
- Bursary colours/fonts (see `02-brand.md` hard rule).

## Deployment / URL
- Public URL = **`ilmsa.co.za/MT`** (D23); route `src/pages/MT.astro`.
- `[OPEN]` (infra): whether it deploys under the same gh-pages base as the bursary site or its
  own base path (`PUBLIC_BASE_PATH`), since the main site (ilm.sa) links to it — Raeesah to map.

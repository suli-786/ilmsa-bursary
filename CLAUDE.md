# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Change control — HARD RULE

Implement exactly what was asked, nothing else. If the requested change forces ANY side effect — layout, animation/motion, design, visible behaviour, dependencies — STOP before implementing, present the conflict and the options, and wait for the user's decision. Never disable, gate, or degrade an existing feature as collateral of another change. "I flagged it in the summary afterwards" does not count; the ask comes BEFORE the change.

## Commands

```bash
npm run dev       # dev server at http://localhost:4321
npm run build     # production build → ./dist/
npm run check     # astro check (TypeScript / template diagnostics)
npm run preview   # serve the built ./dist/ locally
npm run deploy    # build + publish ./dist/ to the gh-pages branch (manual)
npx knip          # unused files / dependencies / exports (config in knip.jsonc)
```

There is no separate lint or unit-test runner. Type safety comes from `astro/tsconfigs/strict` (`npm run check`); `astro build` fails on type/template errors.

### Muslimah Today visual verification

```bash
node Muslima_Today/scripts/shoot.mjs           # serves dist/, screenshots /MT/ at 360+1440, runs axe a11y
node Muslima_Today/scripts/shoot.mjs --smoke   # just prove Chromium launches
```

`shoot.mjs` requires a fresh `npm run build` first (it serves `dist/`). It emulates `prefers-reduced-motion: reduce` so scroll-driven reveals render fully visible in full-page captures; screenshots + report land in `Muslima_Today/.verify/` (gitignored). Exits non-zero on console errors or serious/critical axe violations.

## Architecture

This is an **Astro 5 + Tailwind CSS 4** static site (Tailwind via the `@tailwindcss/vite` plugin, no `tailwind.config` file). The repo hosts **two visually distinct brands**:

### 1. ILM-SA bursary site (the original)
- Route: `src/pages/index.astro` → `/`
- Components: `src/components/*.astro` (Header, Hero, WhoCanApply, HowToApply, Footer, Preloader)
- Styles: `src/styles/global.css` (Tailwind + bursary tokens: teal `#009193`, orange `#f6931c`, Poppins)
- This is what deploys to GitHub Pages as the public bursary marketing site.

### 2. Muslimah Today 2026 event landing page
- Route: `src/pages/MT.astro` → `/MT/` — **the whole page is this one self-contained file** (own `<head>`, all section markup, styles, and scripts). Sections: SVG hero → Tickets → About (GSAP-pinned scrollytelling with a Testimonials panel) → Speakers → Past-events marquee → Footer.
- The hero is assembled from Canva-designed SVG sources in `src/assets/muslimah-today/hero/` (imported with `?raw` and transformed in frontmatter — **never edit the SVG files themselves**).
- Shared components: `src/components/muslimah-today/Footer.astro` + `SponsorChip.astro`. The footer styles itself with CSS variables that `MT.astro` bridges in its `:root`.
- Data: `src/data/muslimah-today/event.ts` (facts/links) + `sponsors.ts` (sponsor tiers). Section photos: `public/mt-events/*.webp`; logos and processed photos: `src/assets/muslimah-today/`.
- Motion: GSAP ScrollTrigger for the pinned About section; everything else is CSS/inline JS. All motion is gated on a `.js` class + `prefers-reduced-motion` — the page must stay fully readable with no JS and no motion.

**Brand separation is visual, not a reuse ban.** Each brand has its own palette, fonts, and shapes — the MT page must *look* like Muslimah Today (magenta `#b92c73`, lilac `#c296d9`, off-white `#fefdfe`, Libre Caslon + Source Sans 3), not like the bursary site. But sharing code or components across the two is welcome wherever one could genuinely serve both.

### Copy is verbatim
MT copy is transcribed **verbatim** from `Muslima_Today/overview.md` (via `build-docs/01-content.md`) — do not paraphrase, "fix" spellings (e.g. "in sha Allah"), or invent facts (prices, dates, requirements). Unknowns are tagged `[OPEN]` and left out, never filled in. The Book link (Quicket event page) and the sponsored-seat Google Form are live — direct URLs in `src/data/muslimah-today/event.ts` (client-supplied 2026-07-07).

### Base-path-aware links
The site can be hosted under a sub-path. `astro.config.mjs` derives `base`/`site` from `PUBLIC_BASE_PATH` / `PUBLIC_SITE` env vars. Use `withBase()` from `src/utils/paths.ts` for any internal href so links stay correct under a non-root base; it passes absolute/external URLs and hash fragments through unchanged.

## The `Muslima_Today/` folder (not shipped)

Documentation + tooling for the MT page — not part of the deployed site:

- **`overview.md` is the client brief and source of truth — never edit it.**
- `build-docs/`: `00-README.md` (ground rules + provenance legend) · `01-content.md` (the literal copy) · `02-brand.md` (brand facts) · `04-assets.md` (asset manifest) · `05-build.md` (tech spec). Provenance tags gate what may be written as fact: `[BRIEF]` (verbatim), `[DECISION]` (client-confirmed), `[CLIENT LIST]`, `[OPEN]` (unknown — never invent), `[OURS]` (our call, provisional).
- `scripts/`: `shoot.mjs` (visual verification, above) + `process-{logos,speakers,pastevents}.py` (image intake pipelines; run via the gitignored `Muslima_Today/.venv`).
- `assets-raw/` (client originals) and `.venv/` are gitignored but kept on disk.

## Deployment

`main` deploys to GitHub Pages via `.github/workflows/deploy.yml` (also runnable manually from the Actions tab). Override `PUBLIC_SITE` / `PUBLIC_BASE_PATH` to retarget the domain or base path. MT work happens on its own branch and reaches production through the normal branch/merge flow.

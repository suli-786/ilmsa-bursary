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

### Visual verification

```bash
node scripts/shoot.mjs                    # serves dist/, screenshots / at 360+1440, runs axe a11y
PAGE_PATH=/give/ node scripts/shoot.mjs   # any other page
node scripts/shoot.mjs --smoke            # just prove Chromium launches
```

`shoot.mjs` requires a fresh `npm run build` first (it serves `dist/`). It emulates `prefers-reduced-motion: reduce` so scroll-driven reveals render fully visible in full-page captures; screenshots + report land in `.verify/` (gitignored). Exits non-zero on console errors or serious/critical axe violations.

## Architecture

This is an **Astro 5 + Tailwind CSS 4** static site (Tailwind via the `@tailwindcss/vite` plugin, no `tailwind.config` file) for the ILM-SA bursary programme.

- `src/pages/index.astro` → `/` — home page (Header, Hero, WhoCanApply, Footer, Preloader from `src/components/`).
- `src/pages/give.astro` → `/give/` — donations / banking-details page (single self-contained file).
- Styles: `src/styles/global.css` (Tailwind + bursary tokens: teal `#009193`, orange `#f6931c`, Poppins).

### Copy is verbatim
Client-supplied copy (e.g. `/give` banking details) is used **verbatim** — do not paraphrase, "fix" spellings, or invent facts (dates, amounts, requirements).

### Base-path-aware links
The site can be hosted under a sub-path. `astro.config.mjs` derives `base`/`site` from `PUBLIC_BASE_PATH` / `PUBLIC_SITE` env vars. Use `withBase()` from `src/utils/paths.ts` for any internal href so links stay correct under a non-root base; it passes absolute/external URLs and hash fragments through unchanged.

## Deployment

`main` deploys to GitHub Pages via `.github/workflows/deploy.yml` (also runnable manually from the Actions tab). Override `PUBLIC_SITE` / `PUBLIC_BASE_PATH` to retarget the domain or base path.

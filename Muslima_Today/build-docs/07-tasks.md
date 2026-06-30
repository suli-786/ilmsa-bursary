# 07 — Task Backlog (for execution chats)

The build + asset-processing backlog. **Execution chats do this work.** Build *mechanics*
(scaffold rules, build order, data-driven repeats, copy proofing, acceptance) are specified in
**`design/03-section-specs.md` §0 (how to build) + §9 (build sequence)** — follow those; this
backlog is the high-level tracker. Design = `design/02`+`design/03`; copy = `01-content.md`.

Status key: `TODO` · `BLOCKED (why)` · `DONE`.

## A. Asset processing
| ID | Task | Status |
|---|---|---|
| A1 | **Sort & convert logos** → SVG/PNG via `pymupdf`; tiers; rename to convention; → `src/assets/muslimah-today/logos/`. | TODO |
| A2 | **Process speakers** (all 7): `rembg` cut-out → crop head + upper body → composite on the **standard speaker bg** (`design/02` → Imagery; **D26** = magenta-100→lilac-100 gradient) → circular, off-white ring, uniform crop → `…/speakers/`. | TODO |
| A3 | **Check speaker resolution** (esp. `Ebrahim Rasool.jpg` ~91 KB; M6). | TODO |
| A4 | **Curate + optimise past-event photos** (6–10 of 15) → `…/past-events/`. Exclude `Digital flyer` images (D19); any past-event photo usable (D30). | TODO |
| A5 | **Image tooling** ✅ `rembg`+`pymupdf`+`pillow` in `Muslima_Today/.venv`. | DONE |
| A6 | **Sponsor-logo gaps:** the **2 pending** sponsor logos. | BLOCKED (client) |

## B. Page build  (follow `design/03` §0 + §9)
| ID | Task | Status |
|---|---|---|
| B1 | **Scaffold** per `05-build.md`: route `src/pages/MT.astro`; `src/styles/muslimah-today.css` (own `@import "tailwindcss"` + `design/02` tokens in `@theme`); namespaced `src/components/muslimah-today/`; minimal MT layout; reuse only `withBase()`; never `global.css`. | TODO |
| B1b | **Data modules** — transcribe `01-content.md` **verbatim** into `src/data/muslimah-today/{speakers,testimonials,sponsors,ticket-tiers,gallery}.ts`; each repeated block = one component looped over data (`design/03` §3). | TODO |
| B1c | **Global shell** — header/anchor-nav, sticky mobile Book bar, skip link (`design/03` §1). | TODO |
| B2 | **Sections in confirmed order** (`design/03`): Hero → About → Speakers (+ joint band; order D4/D24) → Testimonials → Past-events → **Tickets** → Footer. From data + named components; copy verbatim. | TODO |
| B3 | **Brand** per `design/02`: palette, bracket geometry, the arch; ILM-SA teal logo un-recoloured & out of palette; **no gold**. | TODO |
| B4 | **Type** per `design/02`: `--font-display` (Libre Caslon Display) · `--font-serif-text` (Libre Caslon Text, italics) · `--font-body` (Source Sans 3); the type scale. | TODO |
| B4m | **Motion ("Daybreak")** — `design/02` tokens + per-section triggers; **every** effect `prefers-reduced-motion`-guarded; transform/opacity only. | TODO |
| B5 | **A11y + mobile-perf pass** — contrast, focus, reduced-motion, lazy-load, sized images. | TODO |
| B6 | **Wire links:** Book → `MT2026` · Sponsored → `MTSP2026` · WhatsApp · socials · Maps; **disabled states** while M5 pending. | TODO |

## C. Deploy
| ID | Task | Status |
|---|---|---|
| C1 | Route `/MT` (D23); configure deploy base-path & confirm hosting/mapping with Raeesah. | TODO (infra) |

## Blocked-by (open items in `06-open-questions.md`)
- **Client** → 2 pending sponsor logos (A6).
- **Infra (Raeesah)** → `MT2026` / `MTSP2026` pages for live links (B6); deploy base-path (C1).
- *Design is complete (`design/02` + `design/03`); no design/decision blockers remain — the
  build can start now.*

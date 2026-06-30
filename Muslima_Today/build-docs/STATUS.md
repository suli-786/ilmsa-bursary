# STATUS — Muslimah Today build ledger

**The resume anchor.** Every build worker reads this after `08-build-protocol.md` to find the
next unblocked task, and **updates it after every task** (status, commit hash, next action,
notes). This file + the commits on `muslimah-today` ARE the recoverable state — a worker that
fires after a session-limit reset continues purely from here.

---

## Snapshot  *(update every fire)*
- **Branch:** `muslimah-today`  ·  **never** push / `main` / deploy.
- **Last commit:** `19c6fa6` — B4m motion layer. **S2 COMPLETE** (S1 + B1 + B1b + B1c + B3 + B4 + B4m done).
- **Current segment:** **S3 — Sections A** *(next; S2 just closed)*.
- **Next action:** S3 · **Hero `#top`** (`design/03` §2) — first section. Then About `#about`
  (§3) → Speakers `#speakers` + joint band, order D4/D24 (§4). Mount each in `MT.astro`'s
  `<main>`, top-to-bottom, from `src/data/muslimah-today/*` + the named components.
- **Loop state:** `RUNNING` — S2 system done (shell + brand + type + motion); starting S3 sections.
- **Build-ready?** Partial — page builds to `dist/MT/index.html` with the full system live (off-white
  ground, fonts, shell, brand primitives, motion utilities); **section content** (Hero…Footer) is
  S3/S4. *(verify-mt.sh §4 content checks report **pending** while Loop state RUNNING — enforced at
  handoff; see `[WORKER-CHANGE]`.)*

## Status key
`TODO` · `IN-PROGRESS` · `DONE` · `BLOCKED(why)` · `DEFERRED(why)`

## Segments & tasks  *(work top-to-bottom; one commit per task)*

### S1 — Assets → `src/assets/muslimah-today/**`
| ID | Task | Status | Commit | Notes |
|---|---|---|---|---|
| A1 | Sort & convert logos (PDF/TIF→SVG/PNG) into tiers | DONE | `c545926` | 20 PNGs via `scripts/process-logos.py`; ILM-for-Women split→stacked+horizontal; Luxe dark-bg kept (gold legible); Osmans has harmless white box (invisible in white chip) |
| A2 | Process 7 speakers → standard bg (D26), circular, ringed | DONE | `99bbb0e` | `scripts/process-speakers.py`; baked square JPEG tiles on D26 gradient; **circle/arch mask + ring applied at BUILD via CSS tokens** (one asset → grid circle + Ebrahim/Rosieda arch); Shubnum uses a manual face box (Haar unreliable on her tilted/foliage shot) |
| A3 | Check speaker resolution; flag low-res | DONE | `99bbb0e` | All usable. Ebrahim 562×789 but face fills frame (no upscale) → crisp at grid, slightly soft at arch (**M6**, not blocking). Aisha 1.67× upscale (small face in 1536² source) → mildly soft. Others crisp (downscaled). |
| A4 | Curate + optimise 6–10 past-event photos | DONE | `8d281fa` | `scripts/process-pastevents.py`; 8 gallery + Naledi portrait (testimonial companion); flyers excluded; 1600px JPEG q82 (~2.2MB) |
| A2b | **Re-cut speaker tiles — clean edges** (fixed Rosieda black box + Adam/Shubnum/Zohra dark halos) | DONE | `5c6a003` | `rembg alpha_matting=True` (fg-colour estimation kills dark spill) + gentle alpha erode/feather; `WORK_LONG` kept 3000 so high-res faces stay crisp. All 4 defects gone, Ebrahim/Fatima/Aisha unchanged, hair detail preserved (verified on regenerated `.verify/speakers-contact-sheet.png` + full-res tiles). Script now self-generates the faithful circle/arch+ring contact sheet. |
| A5 | Image tooling (`rembg`+`pymupdf`+`pillow`) | DONE | (pre-baseline) | in `Muslima_Today/.venv` |
| A6 | Collect 2 pending sponsor logos | BLOCKED(client) | — | footer uses extensible slot meanwhile |

### S2 — Scaffold + system
| ID | Task | Status | Commit | Notes |
|---|---|---|---|---|
| B1 | Scaffold route `MT.astro` + `muslimah-today.css` (`@theme` tokens) | DONE | `af50cfc` | route + `BaseLayout.astro` (under `components/muslimah-today/`, since `src/layouts/` is out of scope) + full design/02 tokens in `@theme`/`:root` + base layer; imports only the MT stylesheet; builds to `dist/MT/index.html` (off-white ground, 0 console/a11y) |
| B1b | Data modules `src/data/muslimah-today/*.ts` (verbatim from `01`) | DONE | `ecee853` | `event` + `speakers`(+jointSession) + `testimonials` + `sponsors`(3 tiers) + `ticket-tiers` + `gallery`; pure typed TS, `tsc --noEmit` clean; images as filenames (component glob-resolves); media-partner display names `[OPEN]` |
| B1c | Global shell (header/nav, sticky Book bar, skip link) | DONE | `7742780` | `Header` (fixed; transparent-over-hero → solid past `[data-mt-hero-sentinel]` via IO, wordmark reveal; SOLID default for pre-S3/no-JS), `BookBar` (sticky mobile-only, safe-area, hidden while hero/#tickets/footer in view), skip link (`#main`), shared `BookButton` (M5 disabled state). 0 console/axe; both viewports inspected. |
| B3 | Brand (palette, bracket geometry, arch) | DONE | `94ab12b` | `Bracket.astro` (I-beam SVG from measured geometry, `band` variant), `Eyebrow.astro` (lilac band + magenta label on middle bar), `Arch.astro` (rounded-top niche + optional ring). Palette already in B1 tokens. Shapes sanity-checked in isolation; mount in S3. ILM-SA teal stays image-only, out of CSS palette. |
| B4 | Type (`--font-display`/`--font-serif-text`/`--font-body` + scale) | DONE | `ab4fd27` | 3 families self-hosted via Fontsource (Latin subset, swap), imported from muslimah-today.css; 7 woff2 bundled into MT chunk (bursary unaffected); h1–h6/em/strong/link base defaults. Scale already in @theme (B1). Preload → B5. |
| B4m | Motion "Daybreak" utilities (RM-guarded, transform/opacity only) | DONE | `19c6fa6` | `@layer motion`: `.daybreak-reveal/-settle/-rule/-bloom/-dawn`; scroll-driven (`animation-timeline:view()`) + IO fallback; JS-gated arming (no-JS = visible); global RM rule pins final lit state. Proven: nothing stuck hidden under RM. Sections apply the classes in S3+. |

### S3 — Sections A
| ID | Task | Status | Commit | Notes |
|---|---|---|---|---|
| Hero | Hero `#top` | TODO | — | design/03 §2 |
| About | About `#about` | TODO | — | design/03 §3 |
| Speakers | Speakers `#speakers` + joint band (order D4/D24) | TODO | — | design/03 §4 |

### S4 — Sections B
| ID | Task | Status | Commit | Notes |
|---|---|---|---|---|
| Testimonials | Testimonials (5, verbatim) | TODO | — | design/03 §5 |
| PastEvents | Past-event gallery (no flyers/video) | TODO | — | design/03 §6 |
| Tickets | Tickets `#tickets` (scannable climax) | TODO | — | design/03 §7 |
| Footer | Footer (attribution + 3 sponsor tiers + socials + Maps) | TODO | — | design/03 §8 |

### S5 — Hardening
| ID | Task | Status | Commit | Notes |
|---|---|---|---|---|
| B5 | A11y + mobile-perf pass | TODO | — | global acceptance, design/03 §10 |
| B6 | Wire links (Book/Sponsored/WhatsApp/socials/Maps) | TODO | — | disabled states while M5 pending |

### Out of the loop's scope
| ID | Task | Status | Notes |
|---|---|---|---|
| C1 | Deploy `/MT` + base-path/hosting | DEFERRED(infra/human) | after final walkthrough; loop never deploys |

## Active blockers
- **M5** — Quicket `MT2026` + sponsored `MTSP2026` not created (Raeesah). → CTAs render
  **disabled "opens soon"**; URLs wired so they activate later. Not build-blocking.
- **A6 / +2 sponsor logos** — pending (client). → extensible `auto-fit` grid slot; no redesign.
- **M6** — Ebrahim photo borderline res. → process as specced; flag if a better file arrives.

## Provisional defaults in effect *(confirm at final walkthrough)*
Direction "Noor" + section order (Tickets late) · fonts incl. Caslon Text italic companion ·
route `/MT` · standard speaker bg (D26) · disabled Book/Sponsored CTAs until M5 · extensible
sponsor slots for the 2 pending logos.

## `[WORKER-CHANGE]` log *(any worker design improvement, within the system)*
- **Shared `BookButton.astro` (B1c, `7742780`)** — the primary "Book your seat" CTA is **one
  component** reused by the Header, the sticky Book bar, and (later) Hero + Tickets, rather than
  re-coding the button per place. Enforces identical look/states everywhere and makes B6 (flip M5
  `live`) a one-line change. Within the system (design/02 Buttons); the data-driven-repeats
  principle (design/03 §0.3) applied to the CTA.
- **verify-mt.sh §4 — content checks pending while building** (`ac6f4af`). Once `MT.astro` exists,
  the copy/anchor checks would hard-fail on sections not yet built (S3/S4), failing every
  incremental leg. Now they report **pending NOTES while STATUS `Loop state: RUNNING`**, and are
  enforced as hard gates at handoff (any non-RUNNING state) or if STATUS is unreadable (fail-safe =
  enforce). The final completion gate is preserved; wrong-value guards (Mponda/Spritual) stay hard.
  **Build/scope/forbidden-token gates remain hard at all times.**
- **B1 layout location** — the "minimal MT layout" lives at `src/components/muslimah-today/BaseLayout.astro`
  (a slotted component), because `src/layouts/` is **outside** the scope fence. Functionally identical.
- **Speaker tiles (A2) — shape/ring applied at build, not baked.** Tiles are square subject-on-
  D26-gradient JPEGs; the circular *and* arch masks + off-white ring/keyline are CSS at build
  (`--radius-circle`/`--radius-arch`, `--mt-ring`, `--mt-border`). Reason: one asset serves both
  the circular grid and the Ebrahim/Rosieda arch niche (design/02) — baking a circle+ring would
  block the arch. Within the system (those are all tokens). **S3 worker: apply the mask + ring.**
- **ILM-for-Women logo (A1)** delivered as two lockups on one page → split into the two official
  lockups design/02 already specifies: `org-ilm-for-women-stacked` + `-horizontal`.
- **Luxe logo (A1)** kept on its delivered dark background (gold-on-transparent would vanish in a
  white chip). The build may seat Luxe on a dark mini-panel if chip consistency needs it.

## `[OPEN]` flags raised during build
- **Mobile header Book + sticky Book bar can coexist mid-scroll (B1c)** — design/03 §1 lists a Book
  CTA in the **mobile header** *and* a sticky bottom Book bar; the header is fixed, so once scrolled
  past the hero both are visible at once on mobile. Implemented faithfully (both present). The
  "never two Book CTAs at once" rule in §1 is about the bar vs the Tickets/footer CTAs (the bar
  hides for those). *Confirm at walkthrough* whether the client wants the header's Book hidden on
  mobile while the bar is active. *Not blocking.*
- **M6 (Ebrahim res)** — confirmed: source 562×789, processed as specced (no upscale; face
  fills frame). Crisp at the circular grid size; **slightly soft at the larger headliner arch**.
  A higher-res Ebrahim file would improve the arch. *Not blocking.*
- **Aisha res** — source 1536² with a small in-frame face → ~1.67× upscale, mildly soft at
  grid size. Acceptable; a tighter/higher-res headshot would sharpen her tile.
- **Speaker cut-out artifacts (A2)** — ~~black box on Rosieda + dark halos on Adam/Shubnum/Zohra~~
  **RESOLVED in A2b** (`5c6a003`) via rembg alpha matting + alpha edge-clean; verified clean on the
  regenerated contact sheet + full-res tiles. Ebrahim/Fatima/Aisha stayed clean.

## Handoff log *(newest first)*
- `2026-06-30` — **S2 COMPLETE (B1c · B3 · B4 · B4m) → next segment = S3 (Sections A: Hero · About ·
  Speakers).** This fire built the whole S2 system on top of the B1/B1b foundation:
  - **B1c** (`7742780`) — global shell. `Header.astro` (fixed; transparent-over-hero → solid past a
    `[data-mt-hero-sentinel]` via IntersectionObserver, revealing the small MT wordmark; renders
    SOLID by default so it's correct & visible pre-S3 / no-JS), desktop anchor nav
    About·Speakers·Tickets (rule-draw underline), mobile = wordmark + Book only. `BookBar.astro`
    (sticky **mobile-only**, safe-area inset; visible by default, hidden while hero/`#tickets`/footer
    in view — no targets yet so it shows). Skip link (first focusable → `#main`). **`BookButton.astro`**
    = the one CTA reused everywhere; M5 disabled state. STATUS commit `7bf19db`.
  - **B3** (`94ab12b`) — brand primitives: `Bracket.astro` (the I-beam/notched-pill SVG from the
    measured geometry — end-caps 16% / notch 66% / depth 28% / middle bar 44% / inner r 0.13×H;
    `band` variant), `Eyebrow.astro` (lilac-100 band + magenta-600 label on the middle bar),
    `Arch.astro` (rounded-top niche + optional ring). Shapes sanity-checked in isolation. STATUS `bbf3755`.
  - **B4** (`ab4fd27`) — type: 3 families self-hosted via **Fontsource** (Latin subset, swap),
    `@import`ed inside `muslimah-today.css` (page still pulls only that file); 7 woff2 bundled into the
    MT CSS chunk, bursary index references none. h1–h6 → Caslon Display 400 / magenta-700, em/strong/
    link base defaults. **Preload of the 2 key faces deferred to B5** (Vite-hashed paths = perf-pass job).
  - **B4m** (`19c6fa6`) — motion `@layer motion`: `.daybreak-reveal/-settle/-rule/-bloom/-dawn`,
    transform/opacity only; pure-CSS scroll-driven (`animation-timeline: view()`) + IO fallback;
    **JS-gated arming** (inline `<head>` script adds `.js`; no-JS = content visible); global
    reduced-motion rule pins every armed utility to its final lit state. Proven via computed-opacity
    probe: normal → above-fold lit / below-fold awaits scroll; RM → nothing stuck hidden.
  - **S3 worker — Hero first** (`design/03` §2 + §0 build rules; copy **verbatim** from `01-content.md`
    §1, run the §5 proofing checklist). Build it in `MT.astro`'s `<main>`. Inputs/components ready:
    ILM-for-Women **stacked** logo + MT wordmark image (`src/assets/muslimah-today/logos/`), the
    `Arch.astro` (grand arch holding a `.daybreak-bloom`; wordmark seated on a CLEAR off-white inner
    zone, never over the glow), `Eyebrow`/`Bracket`, `BookButton` (already disabled-state), the type
    tokens, and `daybreak-dawn`/`-dawn-bloom` for the one-beat arch-dawn on load. **Place the
    `[data-mt-hero-sentinel]`** at the bottom of the hero so the Header flips to solid + the BookBar
    activates (both already wired to it). One `h1` = the conference identity; tagline = the 3-word
    version (Caslon Text italic); facts strip (date/time `in sha Allah`, `◐ NMJ Islamic Centre ›` →
    Maps, `Tickets from R250 ›` → `#tickets`). Then About (§3) and Speakers (+joint band, order
    D4/D24, §4) to close S3. Data is in `src/data/muslimah-today/*`; resolve images via
    `import.meta.glob` + `astro:assets` `<Image>` (see B1b note above).
  - **Verify workflow** (unchanged): `git add` new paths **before** `bash Muslima_Today/scripts/
    verify-mt.sh`; then `node Muslima_Today/scripts/shoot.mjs` and **open `.verify/{mobile,desktop}.png`
    and inspect CRITICALLY**. As sections land, the §4 content/anchor checks flip from pending → green.
- `2026-06-30` — **A2b + B1 + B1b done → next leg = B1c (global shell).** This fire closed out
  S1 and built the S2 foundation:
  - **A2b** (`5c6a003`) — re-cut all 7 speaker tiles with rembg `alpha_matting=True` + a gentle
    alpha erode/feather. Rosieda's black box and the Adam/Shubnum/Zohra dark halos are gone;
    Ebrahim/Fatima/Aisha unchanged; native crops preserved (`WORK_LONG` kept 3000). Verified on the
    regenerated `.verify/speakers-contact-sheet.png` (now self-generated by the script, circle/arch
    + ring) and full-res tiles.
  - **B1** (`af50cfc`) — scaffold: `src/pages/MT.astro` → `src/components/muslimah-today/BaseLayout.astro`
    (the "minimal layout"; `src/layouts/` is OUT of scope) → `src/styles/muslimah-today.css`
    (own `@import "tailwindcss"` + full design/02 tokens in `@theme` + `:root` semantic roles +
    base layer). Builds to `dist/MT/index.html`; off-white ground, 0 console/a11y.
  - **B1b** (`ecee853`) — data modules `src/data/muslimah-today/{event,speakers,testimonials,
    sponsors,ticket-tiers,gallery}.ts`, verbatim from `01-content.md`; `tsc --noEmit` clean.
    Images are stored as **filenames** — the section components resolve them via `import.meta.glob`
    (e.g. `import.meta.glob('../../assets/muslimah-today/speakers/*.jpg',{eager:true})`) and render
    with `astro:assets` `<Image>` (explicit width/height, lazy below the fold).
  - **Build-system** (`ac6f4af`, `11e634c`): verify-mt.sh §4 content/anchor checks now report
    **pending while `Loop state: RUNNING`** (enforced at handoff / when STATUS unreadable); §2 scope
    fence uses `-uall`. Build / scope / forbidden-token gates stay hard always.
  - **B1c needs** (design/03 §1 + design/02 Components): in `src/components/muslimah-today/` build a
    **Header** (transparent over hero → solid `--mt-bg`+`--shadow-sm` on scroll past a hero sentinel
    via IntersectionObserver, reveals small MT wordmark; desktop anchor links *About·Speakers·Tickets*;
    **Book** CTA right), a **sticky mobile Book bar** (appears after hero, hidden while Tickets in view
    & at footer, `env(safe-area-inset-bottom)`), and a **skip link** (`#main`, visible on focus).
    Anchor IDs `#top/#about/#speakers/#tickets`. Use the MT wordmark `logo-muslimah-today.png`
    (`alt="Muslimah Today"`). Book CTA = **disabled "Booking opens soon"** (M5; `event.links.book.live`
    is false). Internal links via `withBase()`; external (Maps/Quicket/WhatsApp/socials) pass through.
    Mount Header + skip link + BookBar in `MT.astro` (currently an empty `<main id="main">`).
    Motion (header reveal etc.) may stub now and formalise in **B4m**; every effect RM-guarded.
  - **Verify workflow:** `git add` new paths **before** `bash Muslima_Today/scripts/verify-mt.sh`
    (so the scope fence sees them); then `node Muslima_Today/scripts/shoot.mjs` and **open
    `.verify/{mobile,desktop}.png` and inspect CRITICALLY**. Content/anchor checks stay green-as-pending
    until their sections land (S3/S4).
- `2026-06-30` — **S1 (Assets) COMPLETE → next leg = S2 (scaffold + system).** All build-ready
  assets are in `src/assets/muslimah-today/**` (3 scripts in `Muslima_Today/scripts/process-*.py`
  regenerate them). Inventory for B1b/B2:
  - **logos/** (20 PNG): `logo-muslimah-today` · `org-ilm-for-women-stacked` · `org-ilm-for-women-horizontal`
    · `org-ilm-sa` (teal, un-recoloured) · `sponsor-polygon` (primary) · `sponsor-{osmans,impress,rvbd,
    sasol,arctic,nmj,pastry-shack,tlb,luxe,gq-tissue,willowton-group,cellular-citi}` · `media-{tabloid,
    weekly-gazette,radio-al-ansaar}`. (Arctic/TLB are full-bleed brand tiles; Luxe is gold-on-dark.)
  - **speakers/** (7 JPG square D26 tiles): `speaker-{ebrahim-rasool,rosieda-shabodien,fatima-asmal,
    adam-deane,aisha-kilumbilo,shubnum-khan,zohra-sooliman}`. **Apply circle/arch mask + ring in CSS**
    (see `[WORKER-CHANGE]`): grid = circle; Ebrahim & Rosieda = arch niche.
  - **past-events/** (9 JPG): `gallery-{audience,embrace,venue,welcome-arch,goodie-bag,group-elegant,
    speaker,group-vibrant}` + `past-event-naledi` (Naledi Pandor → her testimonial companion).
  - Verification artifacts (gitignored) in `Muslima_Today/.verify/`: `logos-contact-sheet.png`,
    `speakers-contact-sheet.png` (circular+ringed preview), `pastevents-output.png`.
  - Open flags carried forward: **M6** (Ebrahim soft at arch), **Aisha** (mild upscale), **A6** (+2
    sponsor logos pending — `auto-fit` slot). None block S2.
- `2026-06-30` — **Build phase START.** Build-system setup complete (`2c0fee4`). The first
  supervised S1 leg produced nothing — the headless worker mis-read the old `SETUP` state and
  asked the user (headless = no user to answer). Fixed: state → `RUNNING`; kickoff/protocol
  hardened (non-interactive, "you are the worker"). **Do S1 now.**

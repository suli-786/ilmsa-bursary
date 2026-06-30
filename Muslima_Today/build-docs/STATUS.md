# STATUS — Muslimah Today build ledger

**The resume anchor.** Every build worker reads this after `08-build-protocol.md` to find the
next unblocked task, and **updates it after every task** (status, commit hash, next action,
notes). This file + the commits on `muslimah-today` ARE the recoverable state — a worker that
fires after a session-limit reset continues purely from here.

---

## Snapshot  *(update every fire)*
- **Branch:** `muslimah-today`  ·  **never** push / `main` / deploy.
- **Last commit:** `455a26c` — S4 Footer (§8). **S2 COMPLETE · S3 COMPLETE · S4 COMPLETE**
  (Testimonials ✓ · Past-events ✓ · Tickets `#tickets` ✓ · Footer ✓). **All 7 sections built.**
- **Current segment:** **S5 — Hardening** *(next; S4 just closed at this segment boundary)*.
- **Next action:** S5 · **B5 — A11y + mobile-perf pass** (`design/03` §10 global acceptance): font
  preload of the 2 key faces (now that the Vite-hashed paths exist; deferred from B4), image
  size/lazy audit, focus/contrast/reduced-motion sweep across the whole page, ≤ one large
  bracket-band per viewport check. Then **B6 — wire links** (Book→MT2026 / Sponsored→MTSP2026 stay
  M5-disabled; WhatsApp + Maps + socials already live — confirm all correct). After B5+B6: write the
  **final-walkthrough handoff** and set `Loop state: AWAITING-HUMAN`.
- **Loop state:** `RUNNING` — S4 COMPLETE & verified (whole page builds clean, all content/anchor
  checks GREEN); S5 (B5 a11y/perf, B6 link-wiring) is the next leg.
- **Build-ready?** YES (pending S5 hardening) — the full page builds to `dist/MT/index.html`:
  Hero → About → Speakers (+joint) → Testimonials → Past-events → Tickets → Footer, all from
  `src/data/muslimah-today/*`, on the S2 system. `verify-mt.sh` PASS with **all §4 content/anchor
  checks now GREEN** (no longer pending) · `shoot.mjs` 0 console / 0 axe at mobile + desktop.

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
| Hero | Hero `#top` | DONE | `fae1800` | design/03 §2; ILM-stacked + arch-dawn bloom + h1 (wordmark image + title) + Caslon-italic tagline + facts strip (date/venue→Maps/Tickets→#tickets) + disabled Book CTA. Sentinel = whole section. ~1 viewport mobile; 0 console/axe. |
| About | About `#about` | DONE | `b831c28` | design/03 §3; verbatim para (about.ts) + SR-safe ::first-letter drop-cap (magenta-400 for AA) + warm companion photo (gallery-embrace). Shared `SectionHeader.astro` introduced. 0 console/axe. |
| Speakers | Speakers `#speakers` + joint band (order D4/D24) | DONE | `8872958` | design/03 §4; `SpeakerCard` (niche/circle, looped) + `JointSession` magenta band. Order EXACT; verbatim (Kilumbilo, doubled-quote joint title); uniform D26 portraits + ring; accessible bio disclosures. 0 console/axe; portraits clean (no halos). |

### S4 — Sections B
| ID | Task | Status | Commit | Notes |
|---|---|---|---|---|
| Testimonials | Testimonials (5, verbatim) | DONE | `d50b456` | design/03 §5; `TestimonialCard` looped (glyph + Caslon-italic quote + cite) in ONE track = mobile scroll-snap carousel (keyboard dots, IO-synced, no autoplay) → desktop 2-col grid, Naledi featured (portrait + tint) spans full width. Clare 2022/2023 kept; Fathima≠Fatima. 0 console/axe. |
| PastEvents | Past-event gallery (no flyers/video) | DONE | `56a6764` | design/03 §6; `gallery[]` in ONE grid → mobile scroll-snap film-strip (edge-bleed, keyboard) / desktop CSS-columns masonry (2→3-col, mixed aspect). astro:assets responsive+lazy; photos only, captions omitted (none in source). 0 console/axe. |
| Tickets | Tickets `#tickets` (scannable climax) | DONE | `085aacc` | design/03 §7; variant-driven `TicketTier` looped: featured magenta R250 card (Caslon --text-3xl, biggest number) + rows (R320/R220 right-aligned, dotted leaders) + sales-close pill (Wed 26th Aug verbatim) + M5-disabled Book/Sponsored (WhatsApp live) + verbatim caption. Both deadlines visible; the ONE closing magenta moment. 0 console/axe. |
| Footer | Footer (attribution + 3 sponsor tiers + socials + Maps) | DONE | `455a26c` | design/03 §8; restrained lilac sign-off (NO 2nd magenta CTA) — verbatim date + text Book link → lockups (ILM-for-Women stacked→horizontal + **ILM-SA teal untouched**) → 3 tiers via looped `SponsorChip` (Polygon primary · media · auto-fit sponsor grid for +2 pending) → socials (44px) → Maps → © credit. `data-mt-footer`. 0 console/axe. |

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
- **S4 section headings composed (S4, `d50b456`/`56a6764`/`085aacc`)** — `design/03` leaves the exact
  Caslon headline text open for some sections (it specifies the eyebrows + "a section title"). Following
  the S3 precedent (About "About Muslimah Today", Speakers "Speakers & Topics"), the S4 headings are
  descriptive section titles: Testimonials eyebrow **Voices** / heading **"What attendees say"**;
  Past-events eyebrow **Moments** / heading **"Moments from past years"**; Tickets eyebrow **Tickets** /
  heading **"Reserve your place"** (the last verbatim from the `design/03` §7 wireframe). All are plain
  structural labels (no invented slogans/taglines). *Confirm wording at walkthrough.*
- **Footer sponsor-tier labels = plain eyebrow-style caps, not the bracket motif (S4 Footer, `455a26c`)**
  — `design/02` says each sponsor tier is "headed by an eyebrow". Rendered as small magenta-600
  tracked-caps labels (the eyebrow's *label* styling) WITHOUT the `.mt-bracket` band, to keep the
  footer restrained (`design/03` §8) and avoid stacking three bracket motifs in one viewport. Within
  the system (same type/tracking/colour as the eyebrow label); the bracket eyebrow stays the
  section-opener device (SectionHeader).
- **Footer socials = magenta-600 icon buttons (S4 Footer, `455a26c`)** — `design/02` Footer specs
  socials as "magenta-600 icon buttons". These 44px circular icons are the footer's only magenta, and
  are NOT a CTA band, so they don't violate `design/03` §7/§8 "no second full-magenta closing CTA"
  (which targets the Tickets-vs-footer Book CTA). The closing magenta CTA remains Tickets-only; the
  footer Book is a plain text link → `#tickets`.
- **Shared `SectionHeader.astro` (S3 About, `b831c28`)** — one component renders every section
  opener (eyebrow `.mt-bracket` + rule-draw hairline + Caslon `h2`), reused by About + Speakers
  (S3) and Testimonials/Past-events/Tickets (S4). Same DRY/consistency rationale as `BookButton`
  (design/03 §0.3); within design/02 "Section header / eyebrow".
- **About drop-cap = magenta-400, not magenta-300 (S3 About, `b831c28`)** — design/02 specs the
  drop-cap at magenta-300, but as a `::first-letter` it IS real text (the "M" of "Muslimah"), and
  magenta-300 on off-white is ~2.4:1 — below even the large-text AA floor (3:1). magenta-400 (~3.6:1)
  is the minimal darkening that passes while keeping the soft look. design/02 AA baseline > exact tint.
- **`shoot.mjs` capture robustness (S3, `a3d1fd7` + `9d90520`)** — two harness fixes so fullPage
  captures actually show below-fold content for inspection. **(1)** Contexts emulate
  `reducedMotion: 'reduce'`, so the global RM rule pins every Daybreak reveal/bloom to its FINAL LIT
  state; without it a no-scroll fullPage shot renders below-fold `.daybreak-reveal` at opacity 0
  (scroll-driven start) = blank. Doubles as the RM acceptance check (design/03 §10). **(2)** Before
  each capture the runner scrolls top→bottom→top so `loading="lazy"` images past Chrome's lazy
  distance threshold load (else below-fold portraits/gallery shoot blank — worse on the taller mobile
  page). The console-error + axe gate is unchanged. Helps every remaining leg (esp. the S4 gallery).
- **Hero dawn-bloom glow (S3 Hero, `fae1800`)** — the hero arch's light-bloom uses a **local**
  radial glow built from **magenta-200 ↔ lilac-200** (still palette ramp tints, no new hue, magenta
  stays "light") instead of the shared `--mt-glow` (magenta-100↔lilac-100). At the bloom's 0.5
  opacity the 100-level tints wash out to invisible on off-white, so the signature "arch-dawn" was
  imperceptible. The 200-level local glow makes the dawn perceptible while staying within the
  system. Shared `--mt-glow` token unchanged (other sections keep it). Within design/02 balance
  rule 1 (magenta light, ≤35% coverage — this is a soft tint at the crown only).
- **Hero sentinel = the whole `<section id="top">` (S3 Hero, `fae1800`)** — the B1c handoff suggested
  placing `[data-mt-hero-sentinel]` "at the bottom of the hero". Instead it's on the **entire hero
  section**, because the Header/BookBar IntersectionObservers (B1c) key off it: a full-section
  sentinel keeps the Header transparent while **any** of the hero is in view (→ solid once fully
  scrolled past) and the sticky Book bar hidden over the whole hero — matching design/03 §1
  ("transparent over the hero … solid on scroll past the hero") and robust to hero height. A 1px
  bottom sentinel would flip the header solid at the top of a taller-than-viewport hero.
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
- `2026-06-30` — **S4 COMPLETE (Testimonials · Past-events · Tickets `#tickets` · Footer) → next
  segment = S5 (Hardening: B5 a11y/perf · B6 wire links).** This fire built all four S4 sections on
  the S2/S3 system; the whole page (Hero → Footer) now builds clean with **every `verify-mt.sh` §4
  content/anchor check GREEN** (R250/R320/R220/Fathima/Polygon + `id="tickets"`) and `shoot.mjs`
  0 console / 0 axe at mobile + desktop (each section cropped & inspected critically). One commit per
  section:
  - **Testimonials** (`d50b456`) — `TestimonialCard` looped over `testimonials[]`: oversized
    magenta-200 quote glyph (data stores quotes unwrapped) + Caslon-italic quote + author/note. ONE
    track = mobile scroll-snap carousel (keyboard-operable dots, IO-synced active, NO autoplay) →
    desktop 2-col grid with Naledi's featured card (companion portrait + magenta tint) spanning full
    width. Clare's 2022/2023 kept; testimonial **Fathima ≠ speaker Fatima**. (a11y fix mid-build: dots
    are real labelled buttons, not aria-hidden.)
  - **Past-events** (`56a6764`) — `gallery[]` (photos only, no flyers/video) in ONE grid: mobile
    horizontal scroll-snap film-strip (edge-bleed peek, keyboard-scrollable) → desktop CSS-columns
    masonry (2→3-col, mixed aspect). astro:assets responsive + lazy; captions omitted (none in source).
  - **Tickets `#tickets`** (`085aacc`) — the scannable climax + page's ONE closing magenta moment.
    Variant-driven `TicketTier` looped over `ticketTiers[]`: featured early-bird card (R250 in Caslon
    --text-3xl = the single biggest number; until 31 July · then R320 · inclusions with checks) + row
    list (R320 · R220 with **live** WhatsApp 083 271 4500 · Sponsored apply M5-disabled "opens soon"),
    dotted leaders + right-aligned/mutually-aligned numbers. Magenta sales-close pill (Wednesday 26th
    August, verbatim) → M5-disabled Book CTA → verbatim early-bird caption (incl. quota of 100). Both
    deadlines visible without interaction.
  - **Footer** (`455a26c`) — restrained lilac sign-off (**no second full-magenta CTA**): verbatim
    date + text Book link → "brought to you by" lockups (ILM-for-Women stacked→horizontal + **ILM-SA
    teal, untouched, out of palette**) → 3 sponsor tiers via looped `SponsorChip` (Polygon primary ·
    Media Partners · Sponsors in `auto-fit minmax(7rem)` so the **+2 pending logos (A6)** drop in with
    no redesign) → socials FB/IG/WhatsApp (44px icon buttons + handles) → venue → Maps → © credit.
    `<footer data-mt-footer>` (BookBar observer target). Media-partner display names flagged `[OPEN]`.
  - **S5 worker — start with B5** (a11y + mobile-perf, `design/03` §10): preload the 2 key Caslon
    faces (Vite-hashed paths now exist — deferred from B4), audit image sizes/lazy across the page,
    sweep focus/contrast/reduced-motion + the "≤ one large bracket-band per viewport" rule. Then **B6**
    (wire links): Book→MT2026 + Sponsored→MTSP2026 stay **M5-disabled** (flip `live` when Raeesah
    links them); WhatsApp/Maps/socials are already live — confirm correct. Verify workflow unchanged
    (`verify-mt.sh` + `shoot.mjs`, inspect `.verify/{mobile,desktop}.png`). When B5+B6 are done and the
    page is complete, write the **final-walkthrough handoff** and set `Loop state: AWAITING-HUMAN`
    (review targets: the provisional defaults, the `[WORKER-CHANGE]`s above, the `.verify/` screenshots).
- `2026-06-30` — **S3 COMPLETE (Hero · About · Speakers + joint band) → next segment = S4 (Sections
  B: Testimonials · Past-events · Tickets · Footer).** This fire built all three S3 sections on the
  S2 system, each verified (structural `verify-mt.sh` PASS + visual `shoot.mjs`, mobile + desktop
  inspected critically) and committed:
  - **Hero `#top`** (`fae1800`) — ILM-for-Women stacked logo → the one grand arch holding the
    "arch-dawn" light-bloom (local magenta-200↔lilac-200 glow so the dawn is visible; see
    `[WORKER-CHANGE]`), MT wordmark on clear off-white → `h1` (wordmark image + title) +
    Caslon-italic tagline → facts strip (date/time incl. "in sha Allah" · venue→Maps · Tickets→
    `#tickets`) → disabled Book CTA (M5) → scroll cue. `[data-mt-hero-sentinel]` on the whole
    section (Header transparent over the whole hero, BookBar hidden over it; see `[WORKER-CHANGE]`).
  - **About `#about`** (`b831c28`) — shared **`SectionHeader.astro`** (eyebrow + rule + Caslon h2,
    reused by Speakers + S4) → verbatim About paragraph (`about.ts`) with a SR-safe `::first-letter`
    drop-cap (magenta-400 for AA) → warm companion photo (`gallery-embrace`), 2-col on desktop.
  - **Speakers `#speakers` + joint band** (`8872958`) — `SpeakerCard.astro` looped over `speakers[]`
    (variant niche=arch / circle=grid; accessible bio disclosure) + `JointSession.astro` (the
    magenta feature band, doubled-quote Caslon-italic title). Order EXACT (D4/D24); portraits clean.
  - **Harness** (`a3d1fd7`, `9d90520`) — `shoot.mjs` now emulates reduced-motion AND scrolls to load
    lazy images, so fullPage captures reliably show below-fold sections (see `[WORKER-CHANGE]`).
  - **S4 worker — start with Testimonials** (`design/03` §5; copy verbatim from `testimonials.ts` ←
    `01-content.md` §5 — all 5, Clare's 2022/2023 kept, **Fathima** ≠ speaker **Fatima**). Then
    Past-events (§6, `gallery[]`, no flyers/video), **Tickets `#tickets`** (§7 — the scannable
    climax: `R250` the biggest glance target, both deadlines visible; M5-disabled Book/Sponsored),
    Footer (§8 — attribution + 3 sponsor tiers from `sponsors[]` + socials + Maps; ILM-SA stays
    teal, out of palette; **no second full-magenta CTA**). Reuse `SectionHeader`/`BookButton`/`Arch`/
    `Eyebrow`/`Bracket`. Data modules already exist (`testimonials`/`gallery`/`ticket-tiers`/
    `sponsors`). Mount after `<Speakers/>` in `MT.astro`. **Verify workflow unchanged:** `git add`
    new paths → `bash Muslima_Today/scripts/verify-mt.sh` → `node Muslima_Today/scripts/shoot.mjs`
    and **open `.verify/{mobile,desktop}.png` and inspect CRITICALLY** (the §4 content checks for
    R320/R220/Fathima/Polygon + `id="tickets"` flip pending→green as S4 lands). When S4+S5 are done
    and the page is complete, write the **final-walkthrough handoff** and set `Loop state: AWAITING-HUMAN`.
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

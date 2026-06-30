# STATUS — Muslimah Today build ledger

**The resume anchor.** Every build worker reads this after `08-build-protocol.md` to find the
next unblocked task, and **updates it after every task** (status, commit hash, next action,
notes). This file + the commits on `muslimah-today` ARE the recoverable state — a worker that
fires after a session-limit reset continues purely from here.

---

## Snapshot  *(update every fire)*
- **Branch:** `muslimah-today`  ·  **never** push / `main` / deploy.
- **Last commit:** `64cbc99` — baseline context pack + locked design (checkpoint #0).
- **Current segment:** S1 — Assets *(not started)*.
- **Next action:** S1 · **A1** (sort & convert logos).
- **Loop state:** `SETUP` — automation not yet enabled (system being set up step by step).
- **Build-ready?** No.

## Status key
`TODO` · `IN-PROGRESS` · `DONE` · `BLOCKED(why)` · `DEFERRED(why)`

## Segments & tasks  *(work top-to-bottom; one commit per task)*

### S1 — Assets → `src/assets/muslimah-today/**`
| ID | Task | Status | Commit | Notes |
|---|---|---|---|---|
| A1 | Sort & convert logos (PDF/TIF→SVG/PNG) into tiers | TODO | — | `pymupdf` in `.venv` |
| A2 | Process 7 speakers → standard bg (D26), circular, ringed | TODO | — | `rembg`; design/02 Imagery |
| A3 | Check speaker resolution; flag low-res | TODO | — | esp. Ebrahim ~91 KB (M6) |
| A4 | Curate + optimise 6–10 past-event photos | TODO | — | exclude flyers (D19); any photo usable (D30) |
| A5 | Image tooling (`rembg`+`pymupdf`+`pillow`) | DONE | (pre-baseline) | in `Muslima_Today/.venv` |
| A6 | Collect 2 pending sponsor logos | BLOCKED(client) | — | footer uses extensible slot meanwhile |

### S2 — Scaffold + system
| ID | Task | Status | Commit | Notes |
|---|---|---|---|---|
| B1 | Scaffold route `MT.astro` + `muslimah-today.css` (`@theme` tokens) | TODO | — | `05-build`; never `global.css` |
| B1b | Data modules `src/data/muslimah-today/*.ts` (verbatim from `01`) | TODO | — | design/03 §3 |
| B1c | Global shell (header/nav, sticky Book bar, skip link) | TODO | — | design/03 §1 |
| B3 | Brand (palette, bracket geometry, arch) | TODO | — | design/02 |
| B4 | Type (`--font-display`/`--font-serif-text`/`--font-body` + scale) | TODO | — | design/02 |
| B4m | Motion "Daybreak" utilities (RM-guarded, transform/opacity only) | TODO | — | design/02 |

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
- *(none yet)*

## `[OPEN]` flags raised during build
- *(none yet)*

## Handoff log *(newest first)*
- `2026-06-30` — System setup: baseline committed (`64cbc99`); `08-build-protocol.md` + this
  ledger created. Next: finish setup (verify harness, loop automation), then run S1.

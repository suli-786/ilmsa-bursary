# STATUS — Muslimah Today build ledger

**The resume anchor.** Every build worker reads this after `08-build-protocol.md` to find the
next unblocked task, and **updates it after every task** (status, commit hash, next action,
notes). This file + the commits on `muslimah-today` ARE the recoverable state — a worker that
fires after a session-limit reset continues purely from here.

---

## Snapshot  *(update every fire)*
- **Branch:** `muslimah-today`  ·  **never** push / `main` / deploy.
- **Last commit:** `8d281fa` — A4 past-events done. **S1 (Assets) COMPLETE.**
- **Current segment:** **S2 — Scaffold + system** *(not started)*. S1 done (A1–A5; A6 client-blocked).
- **Next action:** S1 · **A2b** — re-cut speaker tiles to remove cut-out artifacts (see `[OPEN]`),
  THEN S2 · **B1** (scaffold route `src/pages/MT.astro` + `src/styles/muslimah-today.css` with
  `design/02` tokens in `@theme`; never import `global.css`) → B1b → B1c → B3 → B4 → B4m.
- **Loop state:** `RUNNING` — assets complete; next fire builds S2 (scaffold + system).
- **Build-ready?** No (page not scaffolded yet).

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
| A2b | **Re-cut speaker tiles — clean edges** (fix Rosieda black box + Adam/Shubnum/Zohra dark halos) | TODO | — | re-run `scripts/process-speakers.py` with `rembg` **alpha matting** (`alpha_matting=True`) or a stronger model (`isnet-general-use`/`birefnet-general`); verify edges are clean on the D26 gradient via the contact sheet. If a subject won't clean automatically, flag `[OPEN]` + proceed (**non-blocking**). |
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
- **M6 (Ebrahim res)** — confirmed: source 562×789, processed as specced (no upscale; face
  fills frame). Crisp at the circular grid size; **slightly soft at the larger headliner arch**.
  A higher-res Ebrahim file would improve the arch. *Not blocking.*
- **Aisha res** — source 1536² with a small in-frame face → ~1.67× upscale, mildly soft at
  grid size. Acceptable; a tighter/higher-res headshot would sharpen her tile.
- **Speaker cut-out artifacts (A2)** — `rembg` left a hard **black box on Rosieda** (dark top/dark
  bg not removed) and **dark edge halos on Adam, Shubnum, Zohra**; Ebrahim/Fatima/Aisha are clean.
  Spotted on the contact sheet during supervision → fix queued as **A2b** (before the page is built
  on these tiles).

## Handoff log *(newest first)*
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

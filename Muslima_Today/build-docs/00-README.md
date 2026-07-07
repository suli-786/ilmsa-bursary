# Muslimah Today 2026 — Build Docs (Context Pack)

This folder is the **factual context** for building the MUSLIMAH TODAY 2026 landing
page. It exists so the build is driven by **facts**, not assumptions. Earlier attempts
failed by inventing details and writing them down as fact — these docs prevent that.

## Source of truth
- **`../overview.md` is the SOURCE OF TRUTH. Never edit it.**
- These build docs only *restructure and annotate* the brief. Where they differ from the
  brief, the brief wins — unless a `[DECISION]` (a confirmed client answer) overrides it.

## The docs
| File | Purpose |
|---|---|
| `00-README.md` | This file — ground rules + provenance legend |
| `01-content.md` | The literal copy, section by section, every line provenance-tagged |
| `02-brand.md` | Visual identity: colours, the mandatory shape, logos, fonts |
| `04-assets.md` | Asset manifest + the received-files catalogue + intake/processing |
| `05-build.md` | Technical/build spec — how the page plugs into this Astro repo |

The earlier design docs and autonomous-build tooling (design system, section specs,
task backlog, status ledger, build protocol) have been **removed** — the design was
redone from scratch. The current design lives in the code: `src/pages/MT.astro`.

## Provenance legend (used throughout)
Every content/decision item carries one tag:

- **`[BRIEF]`** — taken **verbatim** from `../overview.md`. Do not paraphrase or
  "correct" it. Client spellings are deliberate (the glossary = the brief).
- **`[DECISION]`** — a point the client has **explicitly confirmed**. Overrides the
  brief where noted.
- **`[CLIENT LIST]`** — from a client-supplied material (e.g. the sponsor list
  `assets-raw/logos/Updated logo list.docx`).
- **`[OPEN]`** — **unknown / awaiting** client answer or external material. **Left blank
  and flagged. NEVER invent a value for an `[OPEN]` item.**
- **`[OURS]`** — a design/build decision that is **ours to make later, together** — never
  silently. Until decided, treat as provisional.

## Non-negotiables
1. **Mobile-first.** Most visitors are on phones. Design for the phone first, scale up.
2. **Its own brand.** Muslimah Today has its own visual identity (palette, fonts, shapes —
   see `02-brand.md`) — the page must *look* like Muslimah Today, not the bursary site.
   Sharing code/components with the bursary site is fine wherever it genuinely fits.
3. **Do not invent.** If it is not in `01-content.md` as `[BRIEF]` / `[DECISION]` /
   `[CLIENT LIST]`, it is `[OPEN]` — leave it out and flag it.
4. **One step at a time.** Confirm with the client at the end of each step.

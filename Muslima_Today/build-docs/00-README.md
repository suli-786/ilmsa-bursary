# Muslimah Today 2026 — Build Docs (Context Pack)

This folder is the **execution context** for building the MUSLIMAH TODAY 2026 landing
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
| `02-brand.md` | Visual identity: colours, the mandatory shape, logos, fonts (`[OPEN]`) |
| `03-design.md` | Layout / IA / UX — mostly decided in Step 3, left provisional for now |
| `04-assets.md` | Asset manifest + the received-files catalogue + intake/processing |
| `05-build.md` | Technical/build spec — how the page plugs into this Astro repo |
| `06-open-questions.md` | Decisions log + living tracker of everything still unresolved |
| `07-tasks.md` | **Task backlog for execution chats** (the work to be done) |
| `08-build-protocol.md` | **Autonomous build loop** operating manual (read-path, loop, guardrails, kickoff) |
| `STATUS.md` | **Live build ledger** — segment/task status, blockers, last commit (the resume anchor) |
| `design/02-design-system.md` | **Design system** — tokens, components, motion, imagery (Direction "Noor") |
| `design/03-section-specs.md` | **Per-section build spec** — order, layout, motion, acceptance; **§0 = how to build** |
| `design/_archive/` | Historical design-phase artifacts (directions, brief, kickoff) — **not build inputs** |
| `03-design.md` | ⚠️ **Superseded** — a stub pointing to `design/02` + `design/03` |

## Build read-path (what the build AI should treat as truth)
- **Copy (verbatim):** `01-content.md`.
- **Design (layout / components / motion):** `design/02-design-system.md` +
  `design/03-section-specs.md` (Direction **"Noor"**). `design/03` **§0** = build rules,
  **§9** = build sequence.
- **Facts / constraints:** `02-brand.md` (brand) · `04-assets.md` (assets) · `05-build.md`
  (tech) · `06-open-questions.md` (decisions/open) · `07-tasks.md` (backlog).
- **Autonomous build orchestration:** `08-build-protocol.md` (the loop's manual) + `STATUS.md`
  (the live ledger / resume anchor).
- **Superseded / historical — do NOT build from:** `03-design.md` (stub) and
  `design/_archive/*` (rejected directions + the design brief/kickoff).

## Provenance legend (used throughout)
Every content/decision item carries one tag:

- **`[BRIEF]`** — taken **verbatim** from `../overview.md`. Do not paraphrase or
  "correct" it. Client spellings are deliberate (the glossary = the brief).
- **`[DECISION]`** — a point the client has **explicitly confirmed** (recorded in
  `06-open-questions.md`). Overrides the brief where noted.
- **`[CLIENT LIST]`** — from a client-supplied material (e.g. the sponsor list
  `assets-raw/logos/Updated logo list.docx`).
- **`[OPEN]`** — **unknown / awaiting** client answer or external material. **Left blank
  and flagged. NEVER invent a value for an `[OPEN]` item.**
- **`[OURS]`** — a design/build decision that is **ours to make later, together** — never
  silently. Until decided, treat as provisional.

## Non-negotiables
1. **Mobile-first.** Most visitors are on phones. Design for the phone first, scale up.
2. **Separate brand.** This is the **Muslimah Today** identity — NOT the ILM-SA bursary
   site. Do **not** reuse the bursary site's colours, fonts, header, footer, nav or
   components. (See `02-brand.md` and `05-build.md`.)
3. **Do not invent.** If it is not in `01-content.md` as `[BRIEF]` / `[DECISION]` /
   `[CLIENT LIST]`, it is `[OPEN]` — leave it out and flag it.
4. **One step at a time.** Confirm with the client at the end of each step.
5. **Spec vs. execution (sequencing — not a ban on work).** `07-tasks.md` holds the build
   + asset-processing backlog, and **execution chats are expected to carry it out.** The
   single session that authored this pack was asked to plan/organise only — that was a
   **per-session instruction for that one chat** and does **not** restrict any other chat.

## Where we are
**Step 3 (design) is DONE** — Direction **"Noor" (Light)** is fully specified in
`design/02-design-system.md` + `design/03-section-specs.md`. Client assets are in
`../assets-raw/`. **Next: the autonomous build** — asset processing (`07-tasks.md` A) then the
page build (`07-tasks.md` B), following `design/03` §0 + §9.

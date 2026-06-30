# 08 — Build Protocol (autonomous loop operating manual)

You are a **Muslimah Today build worker**. This document is your operating manual. Follow it
literally; when in doubt, prefer the rule over instinct. You run on **Opus 4.8, max effort,
auto-accept/headless**. All progress lives in the repo (`STATUS.md` + one commit per task) so
any fresh worker — including one that fires after a session-limit reset — can continue.

> **Three lines you never cross:** never touch the bursary site or `main`; never `git push`;
> never deploy. You work only on the `muslimah-today` branch, only in MT namespaces.

> **You are NON-INTERACTIVE (headless).** There is **no human to answer questions** — if you ask
> or present options, the run just ends and nothing is built. **Never ask, never present options,
> never deliberate about whether to start — DO the next task.** **You ARE the worker;** any
> running `claude` / `build-loop` process you might notice is **yourself** — ignore it, don't
> inspect processes, don't try to coordinate. Just build.

---

## 1. Read-path (the only sources of truth)
On every fire, read in this order:
1. **`08-build-protocol.md`** (this file) — how to operate.
2. **`STATUS.md`** — where we are; the next unblocked task; blockers; last commit.
3. For the task at hand:
   - **Copy (verbatim):** `01-content.md`.
   - **Design (build from this):** `design/03-section-specs.md` (its **§0** = build rules,
     **§9** = build sequence) + `design/02-design-system.md` (tokens/components/motion/imagery).
   - **Tech:** `05-build.md`. **Assets:** `04-assets.md`. **Decisions/open:** `06-open-questions.md`.

Ignore everything under `design/_archive/` and the superseded `03-design.md` — **not build inputs.**

## 2. The loop (one fire = one leg)
1. **Orient** — read the read-path; identify the current segment + the next unblocked task in `STATUS.md`.
2. **Plan the task** from `design/03` (+ `02`, `01-content`). If a real unknown/blocker applies
   (see §7), use the **provisional default** and flag in-source `{/* [OPEN] … */}`; **never invent**.
3. **Do the work** (auto-accept), **MT namespaces only** (§4). Build repeated items **from data**,
   copy **verbatim**. You **may improve a section's design** within the system (§4 Design latitude).
4. **Verify** (§5): structural (`verify-mt.sh`) **and** visual (Playwright screenshots → inspect
   them → axe a11y). Fix until both pass. **≤2 retries**; still failing → **stop** + record blocker.
5. **Commit** the task (§6) — one focused commit, branch only, **no push**.
6. **Update `STATUS.md`** — mark the task done, set the next action, note any `[WORKER-CHANGE]` /
   `[OPEN]`.
7. **Continue or hand off** — if the segment has more tasks and context is healthy, loop to (1);
   at a segment boundary (or when context is filling) write the handoff in `STATUS.md`, **schedule
   the next wake** (§8), and stop. When **all build legs are done**, write the
   **final-walkthrough handoff** and stop for the human.

## 3. Segments (the build legs) — see `07-tasks.md` + `design/03 §9`
- **S1 — Assets:** A1 logos · A2 speakers (on the D26 standard bg) · A3 res-check · A4 past-events
  → `src/assets/muslimah-today/**`. (Uses `Muslima_Today/.venv` tools.)
- **S2 — Scaffold + system:** B1 route + `src/styles/muslimah-today.css` (`@import "tailwindcss"` +
  `design/02` tokens in `@theme`) · B1b data modules (`src/data/muslimah-today/*.ts`) · B1c global
  shell (header/nav, sticky Book bar, skip link) · B3 brand · B4 type · B4m "Daybreak" motion.
- **S3 — Sections A:** Hero · About · Speakers (+ joint band).
- **S4 — Sections B:** Testimonials · Past-events · Tickets · Footer.
- **S5 — Hardening:** B5 a11y/perf · B6 wire links (disabled states where M5 pending).
- → **final-walkthrough gate** (human). No deploy.

## 4. Guardrails
- **Scope fence — only write inside:** `src/pages/MT.astro` · `src/components/muslimah-today/**` ·
  `src/styles/muslimah-today.css` · `src/assets/muslimah-today/**` · `src/data/muslimah-today/**` ·
  `Muslima_Today/**`. **Never** `src/styles/global.css`, the bursary components
  (`Header/Hero/Footer/WhoCanApply/HowToApply/Preloader`), `src/pages/index.astro`, or `main`.
- **Brand fence:** palette = the 5 hexes + neutrals only (`design/02`); **no** bursary teal
  `#009193`/orange `#f6931c`/`#97c9c3`, **no** `Poppins`, **no gold**. The ILM-SA logo stays teal,
  but teal **never** enters the page palette.
- **Design latitude:** the design **system** (`design/02` tokens/palette/fonts/motion/bracket) is
  fixed. You **may improve a section's layout/visual treatment** if it's clearly better — but it must
  stay within the system, on-brand, consistent, and accessible. **Log every deviation:** a
  `[WORKER-CHANGE]` note in the relevant `design/03` section **and** in `STATUS.md`.
- **Immutable:** **content** (`01-content.md`, verbatim — run the §5 proofing checklist) and
  **decisions** (`06`: order, names, dates, links). Do not change these.

## 5. Verification (both must pass before committing)
- **Structural —** run `bash Muslima_Today/scripts/verify-mt.sh`: `astro build` + `tsc --noEmit`
  clean; built HTML contains the required verbatim copy + anchors; the lint finds no bursary
  hexes/`Poppins`/`global.css` import/gold and **no changed paths outside the scope fence**.
- **Visual —** run the Playwright runner (`node Muslima_Today/scripts/shoot.mjs`) to screenshot the
  built page at **mobile (~390px) + desktop**; **open the screenshots and inspect them** — confirm
  the section renders correctly, on-brand, no overflow/clipping, no console errors — and run the
  **axe** a11y pass. Iterate until it looks right and passes. Screenshots go to `Muslima_Today/.verify/`.
- **S1 (assets) exception —** there is no page yet, so "visual" for the asset segment means **open
  the produced images and sanity-check them**: speakers cropped to head + upper body, background
  removed and composited on the standard bg, consistent ring/size; logos transparent & legible.
  Page screenshots (`shoot.mjs`) begin at **S2+**.

## 6. Commit + STATUS discipline
- **One commit per task**, on `muslimah-today`, **no push, never `main`.** Message:
  `MT build: <task id> — <what>` + the `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>` line.
- Commit only in-scope paths. After committing, **immediately update `STATUS.md`** (status, last
  commit hash, next action, `[WORKER-CHANGE]`/`[OPEN]` notes). STATUS + commits ARE the resumable state.

## 7. Stop conditions & blockers (don't push past these)
**Hard stop** (record in `STATUS.md`, then stop / let the loop halt):
- An out-of-scope edit seems necessary · a genuine unknown not covered by a provisional default ·
  verification still fails after ≤2 retries · a **client/infra blocker**.
**Known blockers → provisional defaults (proceed, flagged — never invented):**
- **M5** (Quicket `MT2026` / sponsored `MTSP2026` not live) → render the CTA in its **disabled
  "opens soon"** state; wire the URL so it activates later. Don't block the build.
- **+2 pending sponsor logos** → leave the extensible `auto-fit` grid slot; no redesign.
- **M6** (Ebrahim photo borderline res) → process as specced; flag if a better file is needed.

## 8. Loop automation — local headless cron
- **Mechanism:** an OS cron job runs `Muslima_Today/scripts/build-loop.sh` every ~20 min. Each fire
  is a **fresh headless `claude` process** (`claude --print --model opus --permission-mode
  bypassPermissions`) given the §9 kickoff; it does the next segment, verifies, commits, updates
  STATUS, and exits. Cron re-fires for the next segment. The script **locks** (no overlap), **guards
  the branch**, honours a **STOP** file, and **no-ops** once STATUS `Loop state:` is terminal.
- **You set `Loop state:`** in STATUS as you go: `RUNNING` while building · `AWAITING-HUMAN` at the
  final-walkthrough gate · `HALTED` on a hard stop · `DONE` when fully finished. The cron stops doing
  real work the moment it sees `DONE`/`HALTED`/`AWAITING-HUMAN`.
- **Session-limit / interruption:** state is in the repo, so the next cron fire (after any reset)
  re-reads STATUS + last commit and continues — no memory of a prior run needed.
- **Kill switch:** `touch Muslima_Today/.loop/STOP` halts immediately (delete to resume). Logs:
  `Muslima_Today/.loop/loop.log`.
- **Crontab** (installed at setup Step 7, after a supervised first leg):
  `*/20 * * * * /home/suleiman/code/ilmsa-bursary/Muslima_Today/scripts/build-loop.sh`

## 9. Kickoff prompt (idempotent — same text every fire)
```
You are a Muslimah Today build worker. Read and follow
Muslima_Today/build-docs/08-build-protocol.md exactly, then continue from
Muslima_Today/build-docs/STATUS.md: do the next unblocked task, verify (structural + visual),
commit it on the muslimah-today branch (no push), update STATUS, and schedule the next leg.
Stay in MT namespaces; never touch the bursary site or main; never deploy.
```

## 10. Definition of done
All S1–S5 tasks `DONE` in `STATUS.md`, every commit verified (structural + visual), `[OPEN]`/
`[WORKER-CHANGE]` items surfaced, the page builds clean. Then write the **final-walkthrough
handoff** in `STATUS.md` (what to review: provisional defaults, `[WORKER-CHANGE]`s, the
screenshots in `.verify/`) and **stop** — the human reviews; deploy (C1) is separate.

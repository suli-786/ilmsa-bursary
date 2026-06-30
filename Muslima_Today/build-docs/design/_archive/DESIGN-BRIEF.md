# DESIGN BRIEF — Muslimah Today 2026 landing page

You are the **design chat**. Your single job: produce the **design** for this page as
**markdown specs** that a later autonomous build chat will implement. You do **not** write
production code and you do **not** build the page. Engine: Opus 4.8, max effort, extended
thinking.

> Aim high. The client wants a **"wow" factor**, **scroll motion**, and a page that feels
> elegant, warm and dignified — not a generic template. Mediocre-but-safe is a failure here.

---

## 0) Your scope (read twice)
- You own **visual design + layout only**: the design system (tokens, components) and the
  per-section layout/motion specs.
- You do **NOT** change content or decisions. The copy in `../01-content.md` and the
  decisions in `../06-open-questions.md` are **immutable**. If something is missing, **flag
  it `[OPEN]` — never invent it.**
- Output is **markdown specs only** (no rendered preview, no production code). So your specs
  must be **vivid and concrete** enough to be judged and built from text alone.

## 1) Process (follow in order)
1. **Ingest** the whole context pack as locked truth: `../overview.md` (the brief — never
   edit) and `../00-README.md` … `../07-tasks.md`.
2. **Study the real assets** (open and actually look — see §4). Your design must be rooted
   in *this* brand, not generic instincts.
3. **Research references** (use web search if available) — best-in-class conference /
   editorial / scroll-"wow" landing pages — to inform, not copy.
4. Produce **2–3 distinct directions** in `01-directions.md`, then **STOP** and let the
   user pick one. (See §3 for what makes a direction judgeable from text.)
5. For the chosen direction, write `02-design-system.md` then `03-section-specs.md`.
6. **Self-critique** against §8 success criteria; revise until it passes.

## 2) Mission & emotional north star
- **Event:** MUSLIMAH TODAY 2026 — 13th Annual Women's Conference, hosted by ILM for Women
  (a division of ILM-SA), NMJ Islamic Centre, Durban — Saturday 29 August 2026, 9am–4.30pm.
- **Tagline:** Sisterhood • Inspiration • Spiritual Upliftment.
- **Audience & feel:** a broad spectrum of women; a non-elitist, inclusive day of sisterhood,
  inspiration, motivation, education and spiritual upliftment. The page should feel
  **elegant, warm, inspiring, dignified, and quietly luxurious** — and deliver a tasteful
  **"wow"** as you scroll. Define explicitly: *how should a woman feel scrolling this, top to bottom?*

## 3) Make the directions judgeable from text (no preview)
Each of the 2–3 directions in `01-directions.md` must include: a **name + one-line concept**,
the **mood/feel**, **how it uses the 5-colour palette**, **type treatment** (how Libre Caslon
Display + Source Sans 3 are used), the **motion/interaction language**, an **ASCII wireframe**
of the hero **and** one other section, **2–3 named real references** (URLs or well-known sites)
with what to borrow, and **trade-offs**. Make them genuinely **distinct**, not three flavours of
the same thing.

## 4) Assets to STUDY (open these)
- `../../assets-raw/past-events/Digital flyer 2025.jpg` — brand feel + the **correct font feel**.
- The save-the-date / flyer artwork (magenta identity, circular speaker crops).
- `../../assets-raw/logos/organisations/Muslimah Today logo.pdf` — the **mandatory bracket shape**.
- `../../assets-raw/logos/organisations/ILM for women logo.jpg` — **purple** ILM-for-Women.
- `../../assets-raw/logos/organisations/ILM Logo vertical png.png` — **teal** ILM-SA (parent).
- A sample of `../../assets-raw/speakers/*` (note inconsistent quality) and
  `../../assets-raw/past-events/*` (event mood, what's usable).

## 5) Locked brand facts (from `02-brand.md` / `06`)
- **Palette (only these 5 + neutrals):** primary magenta `#b92c73`, secondary `#be98c5`,
  lilac `#c296d9`, grey `#848484`, off-white `#fefdfe`. Derive tints/shades + semantic roles
  yourself — **introduce no new hues**. **Never** use the bursary brand (teal `#009193`,
  orange `#f6931c`, Poppins). The **ILM-SA logo is teal** — keep it as-is, but teal must
  **never** become a page colour.
- **Fonts (D22):** display/headings `Libre Caslon Display`; body/UI `Source Sans 3` (both
  Google). Expose as `--font-display` / `--font-body`. The "MUSLIMAH TODAY" wordmark is a
  **logo image**, not live text.
- **Bracket/banner shape** is a mandatory brand motif — design a **usage system** for it.

## 6) Locked content/IA (from `01`/`03`)
Sections, in order: **Hero** (logos, title "13th Annual Women's Conference", tagline,
date/time, venue + Maps, primary Book CTA) → **Tickets** → **About** → **Speakers** (order:
Ebrahim → Rosieda → **joint-session block** → Fatima → Adam → Aisha → Shubnum → Zohra) →
**Testimonials** (5) → **Past-event imagery** (selected photos; **no video, no flyers**) →
**Footer** (ILM-for-Women + ILM-SA "brought to you by", **3 sponsor tiers**, socials).
- **Tickets is the scannable centrepiece** — the brief says *"people can't read"*; make cost
  tiers (Early bird R250 / Standard R320 / Pensioner & student R220 / Sponsored) and the
  deadlines effortless to grasp at a glance.
- **Speaker photos:** head + upper body, background removed, composited on **one standard
  background you choose** (D26). Define the crop + treatment.

## 7) Hard guardrails
- Content/decisions immutable; flag `[OPEN]`, never invent.
- **Consistency is structural:** define a **spacing/grid scale** and a **type scale**; rule —
  *every* size/space/radius comes from the scale (the client demands equal spacing, equal
  sizes for like things, alignment). No arbitrary values.
- **Mobile-first:** specify the **mobile layout first** for every section, then desktop. Body
  text ≥16px; real touch targets; thumb-reachable primary actions.
- **"Wow" is bounded:** a **named motion language**, a specific mechanism per section, each
  with a `prefers-reduced-motion` fallback and a mobile-performance budget. Not motion for its
  own sake.
- **Buildable on the stack:** Astro 5 + Tailwind 4 (tokens as CSS variables via
  `@import "tailwindcss"`, **no `tailwind.config.js`**); `aos` is already available; CSS
  scroll-driven animations and Astro's image pipeline are available. Use utility-friendly
  token names. Self-contained namespace (`src/components/muslimah-today/`,
  `src/styles/muslimah-today.css`) — never touch the bursary site.

## 8) Success criteria (self-check before you finish)
- **On-brand:** magenta-led, Caslon display + Source Sans, bracket motif, clearly derived
  from the real assets.
- **Mobile-first & legible;** the tickets block is effortless to scan.
- **Consistent:** every value on the scale; like things look identical; components reused.
- **"Wow":** a named motion language + specific, tasteful devices — all perf/a11y-safe.
- **Complete:** every section in `01`/`03` has a spec; the standard speaker background and the
  motion language are decided.
- **Faithful:** no invented content; all locked facts respected; `[OPEN]`s flagged.
- **Buildable:** specs are precise (exact tokens, breakpoint behaviour, component states,
  motion timing/easing, asset treatments, per-section acceptance criteria).

## 9) Deliverables (fill the templates in this folder)
1. `01-directions.md` — 2–3 directions → **user picks** (gate).
2. `02-design-system.md` — tokens, components + states, imagery rules (incl. standard speaker
   background + bracket-shape usage), motion tokens.
3. `03-section-specs.md` — per-section mobile→desktop layout, hierarchy, components, motion,
   assets, acceptance.

**Definition of done:** the chosen direction is fully specified in `02`+`03`, passes §8, and a
build chat could implement it faithfully with no further design decisions (only `[OPEN]`s remain).

# 03 — Section Specs — Direction **“Noor” (Light)**

Per-section build spec for the Muslimah Today 2026 page. **Confirmed section order
(persuasion-first):** Hero → About → Speakers → Testimonials → Past-events → **Tickets** →
Footer. This supersedes the provisional order in `../03-design.md`.

---

## 0) HOW TO BUILD FROM THIS DOCUMENT  *(read first — these rules bind every section)*

> This doc is written to be **implemented by an autonomous build chat**. Follow it literally.
> When in doubt, prefer the rule over your instinct.

1. **Build order.** (a) Scaffold per `../05-build.md`: route `src/pages/MT.astro`; dedicated
   `src/styles/muslimah-today.css` that does its **own** `@import "tailwindcss";` + the MT tokens
   from `02-design-system.md` registered in `@theme`; namespaced `src/components/muslimah-today/`;
   a minimal MT layout; reuse **only** `withBase()` from `src/utils/paths.ts`; **never import
   `global.css`** or any bursary component. (b) Global shell (header/nav, sticky Book bar, skip
   link). (c) Sections **top-to-bottom in the order above**. (d) Motion layer. (e) A11y + perf
   pass. (Maps to `../07-tasks.md` B1–B6.)
2. **Two sources of truth, no others.** Copy = `../01-content.md`, **verbatim**. Design = tokens &
   components in `02-design-system.md`, **only**. Never paste-and-tweak copy; never use an
   off-scale number or a colour outside the 5 hexes + neutrals.
3. **Render every repeated item from data, not by hand.** Create data modules transcribed verbatim
   from `01-content.md`: `src/data/muslimah-today/{speakers,testimonials,sponsors,ticket-tiers,
   gallery}.ts`. Each repeating block (speaker card, testimonial, sponsor chip, ticket tier,
   gallery image) is **one component looped over its array**. This is the structural guarantee of
   the client's “equal sizes / equal spacing / alignment”. Hand-built duplicates are a defect.
4. **Flag, don't invent.** Anything not present in `01-content.md` is omitted and marked
   `{/* [OPEN] … */}` in the source. No agendas, FAQs, slogans, taglines, or filler. (E.g. do **not**
   add “Inspiring women since 2012”, an event schedule, or a made-up sign-off.)
5. **Verbatim-copy + spelling proofing checklist** — diff your output against `01-content.md` for:
   `in sha Allah` · tagline **`Sisterhood · Inspiration · Spiritual Upliftment`** (3 words — **not**
   the flyer's 4, no “Motivation”, “Spiritual” spelled correctly) · Aisha **`Kilumbilo`** (not
   “Mponda”) · `Qur'an` / `Qur'anic` · the joint-session title **with the brief's doubled quotes** ·
   testimonial **`Fathima`** ≠ speaker **`Fatima`** · Clare's `2022` / `2023` kept · `ILM-SA` ·
   `Na'ima B. Robert` · `Amina Kathree Jamal` · `(twice)`.
6. **Colour & brand guardrails.** Magenta is **light & ink, not wallpaper** — solid magenta only on
   the feature moments named below (hero CTA, joint-session band, Tickets); everything read sits on
   off-white. **No gold.** **No bursary teal/orange/Poppins.** The ILM-SA logo stays teal but teal
   **never** becomes a page colour. ≤ one large bracket-band per viewport.
7. **Motion = “Daybreak”** (see `02` motion tokens). Animate **transform/opacity only**; **every**
   effect needs a `prefers-reduced-motion: reduce` branch that renders the **final, fully-lit**
   state (no parallax, gradients static). Prefer CSS scroll-driven animation
   (`animation-timeline: view()`) behind `@supports`, falling back to the available **`aos`**.
8. **Assets.** Reference processed outputs at the `../04-assets.md` paths/naming
   (`src/assets/muslimah-today/{speakers,past-events,logos}/…`, kebab-case). If a file isn't
   processed yet, use a **placeholder of the correct dimensions/aspect** + `{/* [OPEN] asset */}`,
   so layout is right and the real file drops in later. Use `astro:assets` `<Image>/<Picture>` with
   explicit `width`/`height` (avoid CLS), `loading="lazy"` below the fold, responsive `srcset`.
9. **Acceptance criteria** at the end of each section are a **self-check** — verify each before
   moving to the next section.

**Per-section block shape (used below):** Intent · Inputs · Mobile layout (+wireframe) · Desktop ·
Components · Motion · States & edge cases · A11y · Acceptance.

---

## 1) GLOBAL / CROSS-SECTION

### Header + anchor nav
- **Behaviour:** transparent over the hero; on scroll past the hero it becomes solid
  `--mt-bg` + `--shadow-sm` and reveals a **small MT wordmark** (IntersectionObserver on a hero
  sentinel; toggle a class — no scroll-jank libraries).
- **Contents:** MT wordmark (left) · **desktop** anchor links *About · Speakers · Tickets*
  (Source Sans 600, `--track-caps`, ink → magenta-700 on hover, rule-draw underline) · **Book**
  CTA (right, primary). **Mobile:** wordmark + Book only (no hamburger; the page is short and
  anchored by the sticky bar).
- Anchor IDs: `#about`, `#speakers`, `#tickets`, `#top`. Smooth scroll; `prefers-reduced-motion` →
  `scroll-behavior: auto`. `z-index: var(--z-sticky)`.

### Sticky mobile Book bar
- Appears once the hero leaves the viewport; **hidden while the Tickets section is in view and at
  the footer** (so the page never shows two Book CTAs at once). `--shadow-md`, off-white, full-width
  primary CTA, `padding-bottom: env(safe-area-inset-bottom)`. RM → no slide, just present/absent.

### Skip link
- First focusable element: “Skip to content” → `#main`, visually hidden until focused.

### Scroll-journey map (rhythm the build should produce)
Luminous **off-white** is the resting state; **magenta saturation peaks** at three points only —
the **hero CTA**, the **joint-session band**, and the **Tickets** block — so warmth pulses rather
than floods. Between sections, a soft `--mt-glow` **light-bloom** marks the seam; each section
**opens with a bracket eyebrow**; the **arch** appears only twice (hero + headliner niche).

### Shared mechanisms (define once, reuse)
- **Reveal-on-enter** utility (`.daybreak-reveal`): opacity 0→1 + `translateY(var(--motion-rise)→0)`,
  `--dur-slow`/`--ease-out`, trigger ~15% in view, children stagger 60–80ms.
- **Light-bloom** layer (`.daybreak-bloom`): a `--mt-glow` element, opacity 0→.5 + `scale(.98→1)`,
  `--dur-bloom`, `aria-hidden`, behind content only.
- **Rule-draw** (`.daybreak-rule`): hairline `scaleX(0→1)` from left, `--dur-base`.
- All three collapse to their final state under `prefers-reduced-motion`.

---

## 2) HERO  `#top`
- **Intent:** welcome + identity + the essential facts + the primary action; the “arch-dawn” wow.
  Aim for ~one mobile viewport.
- **Inputs:** ILM-for-Women **stacked** logo; MT wordmark image; title/tagline/date-time/venue
  (`01-content.md §1`, verbatim); Maps URL `https://maps.app.goo.gl/GhgJAQSFquFEftqX9` (D7);
  Book → `www.ilmsa.co.za/MT2026`.
- **Mobile layout:** off-white ground; ILM-for-Women logo top-centre (`--space-6` from top) →
  **grand arch** (`--radius-arch` or clip-path) holding a `.daybreak-bloom`; **MT wordmark** seated
  on a **clear off-white inner zone** (never directly over the lilac glow); under it, inside the
  arch: **title** `13TH ANNUAL WOMEN'S CONFERENCE` (Source Sans 600 caps, `--track-eyebrow`,
  magenta-700, `--text-lg`) and **tagline** `Sisterhood · Inspiration · Spiritual Upliftment`
  (Caslon Text italic, magenta-600, `--text-md`). Below the arch, the **facts strip**: date/time
  (Source Sans, ink, `--text-base`), `◐ NMJ Islamic Centre, Durban ›` (pin icon, magenta-700 link →
  Maps), `Tickets from R250 ›` (link → `#tickets`). Then the **primary Book CTA**, full-width — the
  one saturated magenta moment. Subtle scroll cue.
```
┌─────────────────────────┐
│      [ILM for Women]     │
│       ╭───────────╮      │  grand arch + light bloom
│      ╱ ░ MUSLIMAH ░ ╲    │  wordmark (image) on off-white
│     │   ░ TODAY ░    │   │
│     │ 13TH ANNUAL    │   │  title — Source Sans caps
│     │ WOMEN'S CONF.  │   │
│     │ Sisterhood ·…  │   │  tagline — Caslon italic
│      ╲_____________╱     │
│  Sat 29 Aug · 9–4.30pm   │  facts strip (ink)
│  in sha Allah            │
│  ◐ NMJ Islamic Centre ›  │  → Maps pin
│  Tickets from R250 ›     │  → #tickets
│  ┌────────────────────┐  │
│  │  Book your seat →  │  │  primary CTA (magenta)
│  └────────────────────┘  │
└─────────────────────────┘
```
- **Desktop (≥md/lg):** arch scales up, centred, ≤`--niche`; facts strip becomes one inline row;
  CTA inline-width; optional tone-on-tone texture ≤4% behind; header is a transparent overlay.
- **Components:** arch frame · MT wordmark lockup · ILM-for-Women lockup · primary CTA · text-link ›.
- **Motion:** **arch-dawn** once on load (bloom 0→.5 + wordmark `translateY` rise, `--dur-bloom`);
  facts + CTA stagger in after. RM → everything static, fully lit.
- **States:** if `MT2026` is not live (M5) → Book CTA **disabled**, label still “Book your seat”,
  helper text “Booking opens soon”.
- **A11y:** exactly one **`h1`** = the conference identity; MT wordmark `alt="Muslimah Today"`;
  arch + bloom `aria-hidden`; tagline is real text; Maps link text is descriptive; CTA ≥48px,
  thumb-reachable.
- **Acceptance:**
  - [ ] Tagline is the 3-word version, correctly spelled; date/time/venue verbatim incl. `in sha Allah`.
  - [ ] Venue link opens the exact Maps pin; “Tickets from R250” scrolls to `#tickets`.
  - [ ] “MUSLIMAH TODAY” is the **logo image**, not live text; wordmark legible (on off-white, not glow); ≥200px wide on mobile.
  - [ ] Reduced-motion shows no animation, fully-lit; AA contrast throughout.

---

## 3) ABOUT  `#about`
- **Intent:** orient a newcomer and establish credibility; warm, dignified, short.
- **Inputs:** the About paragraph (`01-content.md §3`, verbatim — includes the past-speakers
  sentence: Naledi Pandor (twice), Dr Imtiaz Sooliman, Na'ima B. Robert, Amina Kathree Jamal).
- **Mobile layout:** eyebrow `[ ABOUT ]` (`.mt-bracket`) → Caslon headline (a section title, e.g.
  “About Muslimah Today”) → body (Source Sans, `--text-base` 18px, measure ≤`--measure`) opening
  with a **Caslon Text italic drop-cap** → one **warm full-colour** past-event companion photo
  (`--radius-lg`, 1px `--mt-border`).
```
mobile                          desktop (2-col)
┌───────────────────┐           ┌──────────────┬───────────┐
│ [ ABOUT ]         │           │ [ ABOUT ]    │           │
│ Caslon headline   │           │ headline     │  [ warm   │
│ Ⓜ drop-cap body…  │           │ Ⓜ body ≤64ch │    photo ] │
│ …non-elitist…     │           │ …past spkrs  │           │
│ ┌───────────────┐ │           └──────────────┴───────────┘
│ │   warm photo  │ │
│ └───────────────┘ │
└───────────────────┘
```
- **Desktop:** 2-col — text left (≤64ch) + photo right.
- **Components:** section header/eyebrow · drop-cap · body · bordered image.
- **Motion:** `.daybreak-reveal`; image gentle `scale(1.04→1)`+clip; `.daybreak-rule` under the
  eyebrow. RM static.
- **Assets:** 1 warm photo (`past-events/` — e.g. the delegates embrace or audience), full-colour
  grade, descriptive `alt`.
- **A11y:** drop-cap is the real first character (not a decorative duplicate) so screen readers read
  the word intact; image has `alt`.
- **Acceptance:**
  - [ ] Paragraph verbatim incl. `ILM-SA`, `(twice)`, `Na'ima B. Robert`, `Amina Kathree Jamal`.
  - [ ] Body measure ≤64ch; AA contrast; photo has alt; drop-cap SR-safe.

---

## 4) SPEAKERS  `#speakers`
- **Intent:** the draw — headliner emphasis + breadth; absolute clarity of name & topic; bios
  available but not overwhelming.
- **Inputs:** `speakers[]` (`01-content.md §4`, verbatim), **order D4/D24**:
  Ebrahim Rasool → Rosieda Shabodien → **[joint-session block]** → Fatima Asmal → Adam Deane →
  Aisha Kilumbilo → Shubnum Khan → Zohra Sooliman. Portraits processed on the **standard speaker
  background** (D26, see `02 → Imagery`).
- **Mobile layout:** eyebrow `[ SPEAKERS ]` + Caslon headline → **headliner** Ebrahim then Rosieda,
  each in an **arch niche** (`--radius-arch`, larger portrait; name Caslon `--text-lg`; topic
  Source Sans 600; **bio disclosure** “Read bio ▸”) → **joint-session band** → remaining five as
  **circular speaker cards**, 1-col (or 2-col compact).
```
┌───────────────────────┐
│ [ SPEAKERS ]          │
│  ╭ arch ╮  ╭ arch ╮   │  headliner niches (arch echo)
│  │Ebrahim│ │Rosieda│   │
│  ╰───────╯ ╰───────╯   │  name · topic · Read bio ▸
│ ╭── JOINT · SESSION ─╮ │  magenta band + glow
│ │ "Love, Deen and    │ │  Caslon italic, verbatim
│ │  Life…"            │ │
│ ╰────────────────────╯ │
│   ◯  Fatima   ◯ Adam   │  circular cards on the
│   ◯  Aisha    ◯ Shubnum│  standard gradient bg + ring
│   ◯  Zohra            │
└───────────────────────┘
```
- **Desktop:** headliner pair side-by-side (two arch niches); joint band full-width beneath;
  remaining five in a **3-col** circular grid; equal card heights; `--space-6` gaps.
- **Components:** **speaker-card** (circular) · **headliner niche** (arch) · **joint-session band**
  · **bio disclosure** · eyebrow. All cards are **one component looped over `speakers[]`** (a
  `variant: "niche" | "circle"` flag selects the frame).
- **Joint-session band:** magenta-600 fill + `.daybreak-bloom`; eyebrow “JOINT · INTERACTIVE
  SESSION”; **title in Caslon Text italic, verbatim incl. the doubled quotes**:
  `"Love, Deen and Life: an honest conversation about marriage and family"`; both names; off-white
  text. Placed **immediately after Ebrahim & Rosieda**, before Fatima (D24).
- **Motion:** portrait-settle (`scale(.96→1)`) staggered; `.daybreak-reveal`; joint band bloom. RM
  static. Bio expand = height auto (no required animation).
- **States:** bio collapsed (≈3 lines on mobile) / expanded via `<button aria-expanded>`; desktop
  ≥lg may show full bio. Low-res/missing photo → placeholder + `{/* [OPEN] asset */}` (Ebrahim res,
  M6/A3).
- **A11y:** each speaker is an `<article>`; **name = `h3`**; portrait `alt` = speaker name;
  disclosure keyboard-operable; joint band off-white-on-magenta passes AA.
- **Acceptance:**
  - [ ] Order EXACT (Ebrahim, Rosieda, joint band, Fatima, Adam, Aisha, Shubnum, Zohra).
  - [ ] Names/topics/bios verbatim; Aisha **Kilumbilo**; joint title verbatim with doubled quotes.
  - [ ] **All** portraits share one crop/background/ring (visually identical treatment); rendered from data.
  - [ ] Grid items equal height & spacing; AA contrast; bios are accessible disclosures.

---

## 5) TESTIMONIALS
- **Intent:** social proof in the attendees' own words; warmth & trust; reinforces the speakers.
- **Inputs:** `testimonials[]` (`01-content.md §5`, verbatim): Naledi Pandor (2025 Speaker) · Clare ·
  Zee · Fahmida · Fathima.
- **Mobile layout:** eyebrow + Caslon headline → **scroll-snap carousel**, one card per view
  (oversized magenta-200 quote glyph · **quote in Caslon Text italic** · attribution Source Sans 600
  + grey-600 note) · position dots · swipeable.
```
mobile (scroll-snap)              desktop (grid 2–3-up)
┌───────────────────┐             ┌──────┐ ┌──────┐ ┌──────┐
│ [ VOICES ]        │             │ " …" │ │ " …" │ │ " …" │
│  ❝ Caslon italic  │             │ —Nal │ │ —Zee │ │ —Fah │
│    quote …        │             └──────┘ └──────┘ └──────┘
│  — Naledi Pandor  │             ┌──────┐ ┌──────┐
│    2025 Speaker   │             │ " …" │ │ " …" │
│  ● ○ ○ ○ ○        │             └──────┘ └──────┘
└───────────────────┘
```
- **Desktop:** 2–3-col grid (masonry tolerant of varying quote lengths); Naledi's card may be
  lightly featured (larger / optional companion portrait).
- **Components:** **testimonial-card** · carousel (mobile) · eyebrow. Looped over data.
- **Motion:** `.daybreak-reveal`; **no autoplay**. RM → manual swipe only, no snap animation.
- **Assets:** optional Naledi companion portrait (`past-events/Naledi Portrait`); quote glyph
  `aria-hidden`.
- **A11y:** carousel keyboard-operable (arrow/Tab), dots reflect position, quotes are real text.
- **Acceptance:**
  - [ ] All 5 verbatim; Clare's `2022`/`2023` kept; **Fathima** distinct from speaker **Fatima**.
  - [ ] Naledi attributed “2025 Speaker”; no autoplay; keyboard-operable; AA; data-driven.

---

## 6) PAST-EVENT IMAGERY
- **Intent:** proof in pictures — the real warmth, scale and diversity of the day; the emotional
  crescendo into Tickets. **No video, no flyer images** (D18/D19).
- **Inputs:** a curated **6–10** of the 15 past-event photos (A4) — e.g. `Audience`, the delegates
  embrace, `Naledi`, several `P64A…`. **Exclude** the `Digital flyer` images.
- **Mobile layout:** eyebrow + short Caslon headline (a section title) → **horizontal scroll-snap
  gallery strip** of full-colour shots (warm grade, `--radius-lg`, hairline `--mt-border`),
  captions grey-500; lazy-loaded.
```
mobile (swipe strip)              desktop (masonry 3–4-up)
┌───────────────────┐             ┌────┐┌──────┐┌────┐
│ [ MOMENTS ]       │             │    ││      ││    │
│ ┌────┐┌────┐┌──→  │             └────┘│      │┌────┘
│ │img ││img ││img  │             ┌────┐└──────┘│    │
│ └────┘└────┘└──   │             │    │┌────┐  │    │
│  caption · caption│             └────┘└────┘  └────┘
└───────────────────┘
```
- **Desktop:** curated grid/masonry, 3–4 across, mixed portrait/landscape.
- **Components:** bordered image (full-colour grade) · gallery strip · eyebrow · caption.
- **Motion:** `.daybreak-reveal` staggered; gentle image `scale`/clip; native CSS scroll-snap. RM
  static.
- **Assets:** `astro:assets` `<Image>`, responsive `srcset`, `loading="lazy"`; meaningful shots get
  `alt`, purely decorative ones `aria-hidden`. Driven by `gallery[]` data.
- **A11y:** strip is keyboard-scrollable; captions legible (grey-500 at ≥`--text-sm`, large enough).
- **Acceptance:**
  - [ ] Photos only — **no flyers, no video**; consistent treatment & aspect handling.
  - [ ] Lazy-loaded & optimised (Astro pipeline); captions legible; keyboard-scrollable; data-driven.

---

## 7) TICKETS — *scannable centrepiece + warm climax*  `#tickets`
- **Intent:** price + deadline graspable **at a glance** (“people can't read”); the page's
  conversion peak and its **one** closing magenta moment.
- **Inputs:** `ticketTiers[]` (`01-content.md §2`, verbatim); Book → `www.ilmsa.co.za/MT2026`;
  Sponsored → `www.ilmsa.co.za/MTSP2026`; Pensioner/Student WhatsApp `083 271 4500`; sales close
  `Wednesday 26 August`.
- **Mobile layout:** eyebrow `[ TICKETS ]` + Caslon headline → **Featured Early-bird card**
  (magenta-600 fill; label “EARLY BIRD”; **`R250`** Caslon `--text-3xl` — the single largest glance
  target; “until 31 July”; “then R320”; inclusions “lunch · refreshments · goodie bag” with check
  icons) → **rows** (off-white, dotted leaders, **right-aligned numbers**): `STANDARD … R320`
  (from 1 Aug) · `PENSIONER & STUDENT … R220` (WhatsApp ›) · `SPONSORED … apply ›` (quota 100,
  closes 11 Aug) → **sales-close tag** (magenta pill, ⚑ “SALES CLOSE WED 26 AUG”) → **Book** CTA
  full-width → inclusions caption (verbatim wording).
```
┌─────────────────────────┐
│ [ TICKETS ]             │
│ Reserve your place      │
│ ╭─────────────────────╮ │  featured — magenta fill
│ │ EARLY BIRD          │ │
│ │  R250               │ │  Caslon --text-3xl
│ │  until 31 July      │ │
│ │  then R320          │ │
│ │  ✓ lunch ✓ refresh… │ │
│ ╰─────────────────────╯ │
│  STANDARD ········· R320│  off-white rows,
│  from 1 Aug             │  right-aligned numbers
│  ─────────────────────  │
│  PENS./STUDENT ···· R220│
│  WhatsApp 083 271 4500 ›│
│  ─────────────────────  │
│  SPONSORED ······· apply│
│  quota 100 · close 11 Aug│
│  [⚑ SALES CLOSE WED 26 AUG]│ magenta tag
│  [   Book your seat →   ]│ primary CTA
└─────────────────────────┘
```
- **Desktop:** featured card left + rows right (2-col), numbers aligned to each other; tag + CTA
  span beneath.
- **Components:** ticket featured card · ticket rows · magenta tag · primary CTA · eyebrow. Tiers
  rendered from `ticketTiers[]` (a `variant: "featured" | "row"` flag).
- **Motion:** `.daybreak-reveal`; featured card subtle `.daybreak-bloom`; `.daybreak-rule` row
  dividers. RM static.
- **States:** if `MT2026` / `MTSP2026` not live (M5) → those CTAs **disabled**, helper “opens soon”.
  WhatsApp → `wa.me/27832714500` or `tel:`.
- **A11y:** tiers = a semantic list; tier meaning conveyed by label + structure, **not colour
  alone**; off-white-on-magenta passes AA; all numbers ≥16px.
- **Acceptance:**
  - [ ] `R250` is the largest glance target; `31 July` (early-bird) and `Wed 26 August` (sales close) are **both visible without interaction**.
  - [ ] All figures, phone `083 271 4500`, quota `100`, and dates verbatim; Book/Sponsored links correct (disabled state if pending).
  - [ ] Numbers right-aligned & mutually aligned; tiers data-driven; AA.
  - [ ] This is the page's **only** full-magenta closing CTA — the footer must not repeat one.

---

## 8) FOOTER
- **Intent:** attribution, sponsors, socials, the practical close — a **restrained** warm sign-off
  (Tickets already delivered the saturated climax).
- **Inputs:** attribution (`01-content.md §6`, verbatim); sponsors in **3 tiers** — Primary
  **Polygon** · Sponsors (Osmans Taj Mahal, Impress, RVBD, SASOL, Arctic Amanzi, NMJ, Pastry Shack,
  TLB, Luxe, GQ Tissue, Willowton Group, Cellular Citi) · Media Partners (Tabloid, The Weekly
  Gazette, Radio Al-Ansaar — **display names `[OPEN]`**, Q-name); socials (FB `ILM.SouthAfrica` ·
  IG `ilmsouthafrica` · WhatsApp `ilmsa.co.za/WA`); venue + Maps.
- **Mobile layout:** optional **one-line warm sign-off** that reuses the **verbatim date** (e.g.
  “Saturday, 29th August 2026, in sha Allah”) + a small Book link — **do not invent a slogan** →
  “brought to you by” lockups (ILM-for-Women **stacked** + “a division of” + **ILM-SA teal,
  untouched**) → sponsor tiers: Primary (Polygon, largest, centred) → Media Partners (row) →
  Sponsors (2-col **white-chip** grid, `auto-fit minmax(7rem,1fr)` so the **+2 pending** logos drop
  in with no redesign) → socials icon buttons (44px) + handles → venue + Maps link → small grey
  credit line.
- **Desktop:** multi-column; **horizontal** ILM lockups; wider sponsor grids; socials inline.
- **Components:** logo lockups · sponsor tier grid (chips) · social icon buttons · footer. Sponsors
  driven by `sponsors[]` data grouped by tier.
- **Motion:** `.daybreak-reveal` only. RM static.
- **States:** +2 pending sponsor logos accommodated by `auto-fit` (no layout change); a missing logo
  → chip placeholder + `{/* [OPEN] asset */}`.
- **A11y:** **ILM-SA logo stays teal and is never recoloured; teal never enters the page palette**;
  social links have accessible labels; 44px targets; AA.
- **Acceptance:**
  - [ ] Attribution text exact; 3 tiers' membership correct (Polygon = primary; Tabloid/Weekly
        Gazette/Radio Al-Ansaar = media partners; the rest = sponsors).
  - [ ] Socials correct (FB `ILM.SouthAfrica`, IG `ilmsouthafrica`, WhatsApp `ilmsa.co.za/WA`); Maps present.
  - [ ] Sponsor grid extensible; media-partner display names flagged `[OPEN]`; **no second full-magenta CTA**.

---

## 9) BUILD-SEQUENCE CHECKLIST  *(mirrors `../07-tasks.md` B1–B6)*
1. **B1 Scaffold** — route, `muslimah-today.css` (`@import "tailwindcss"` + `@theme` tokens),
   namespaced components, minimal layout, `withBase()` only, never `global.css`.
2. **Global shell** — header/nav + sticky mobile Book bar + skip link (§1).
3. **B2 Sections in order** — Hero → About → Speakers (+joint) → Testimonials → Past-events →
   Tickets → Footer, each from its data module + named components.
4. **B3 Brand** — palette/bracket/arch applied; ILM-SA teal un-recoloured & out of palette.
5. **B4 Type** — `--font-display` / `--font-serif-text` / `--font-body`; the `02` scale.
6. **Motion layer** — “Daybreak” utilities + per-section triggers; every effect RM-guarded.
7. **B5 A11y + perf pass** — contrast, focus, reduced-motion, lazy-load, image sizes.
8. **B6 Wire links** — Book→MT2026, Sponsored→MTSP2026, WhatsApp, socials, Maps (disabled states
   where M5 pending).

## 10) GLOBAL ACCEPTANCE
- [ ] **A11y:** one h1; ordered h2/h3; landmarks; visible focus; 44px targets; reduced-motion honoured; body ≥16px; AA contrast (no text on gradients/photos without a scrim).
- [ ] **Perf (mobile):** transform/opacity-only motion, no parallax; images lazy + sized + responsive; no layout shift; few concurrent animations.
- [ ] **Consistency:** every size/space/radius/duration is a token from `02`; like things are one looped component; ≤ one large bracket-band per viewport.
- [ ] **Faithfulness:** no copy outside `01-content.md`; all `[OPEN]`s flagged in-source; no gold; no bursary teal/orange/Poppins/components.

---

## 11) SELF-CRITIQUE vs DESIGN-BRIEF §8
- **On-brand** ✅ magenta-led, Caslon + Source Sans, the vector-measured bracket + the arch echo,
  derived from the real flyer/logos.
- **Mobile-first & legible** ✅ every section specced mobile-first; body 18px; Tickets is the
  scannable centrepiece with `R250` + both deadlines visible at a glance.
- **Consistent** ✅ tokens-only + data-driven repeats enforce equal sizing/spacing/alignment.
- **“Wow”** ✅ named language “Daybreak” (arch-dawn, light-bloom thresholds, portrait-settle) — all
  transform/opacity, perf-budgeted, reduced-motion-safe.
- **Complete** ✅ all 7 sections specced; standard speaker background (D26) and the motion language
  decided in `02`; global shell + states covered.
- **Faithful** ✅ copy verbatim from `01`; proofing checklist; “flag, don't invent” convention;
  locked decisions respected; `[OPEN]`s surfaced (M5 link states, Q-name media names, +2 sponsors,
  Ebrahim res).
- **Buildable** ✅ exact tokens, breakpoints, component states, motion timing/easing, asset
  treatments & paths, and per-section acceptance criteria — a build chat can implement with no
  further design decisions.

**Definition of done:** Direction “Noor” is fully specified across `02` + `03`, passes §8, and the
build chat (`07-tasks` B1–B6) can implement it faithfully — only `[OPEN]`s (external materials)
remain.

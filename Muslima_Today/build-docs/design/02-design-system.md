# 02 — Design System — Direction D **“Noor” (Light)**

The system that makes Noor buildable and consistent. **Every** size/space/radius/duration comes
from a named scale (this is how the client's “equal spacing, equal sizes, alignment” is
enforced — no arbitrary values). Colours derive **only** from the 5 locked brand hexes +
neutrals; no new hue, no bursary teal/orange, ILM-SA teal logo is never a page colour.

**The three balance rules that keep Noor “Noor”** (the build must not drift):
1. **Magenta is light & ink, not wallpaper.** Solid magenta is reserved for **feature moments**
   (hero CTA, joint-session band, sales-close tag, closing band) + small ink (rules, eyebrows,
   links). Everything that must be *read* sits on off-white. Target ≤ ~35% magenta coverage.
2. **Whitespace is warm, not austere.** Generous space, but always paired with warm photography
   or a soft magenta→lilac glow so it never reads cold.
3. **The arch is singular.** One grand arch (hero) + one echo (headliner niche). Elsewhere the
   bracket appears only as small notched-pill eyebrows/bands.

> **Stack note (Tailwind 4, no config file):** tokens below are authored as CSS custom
> properties in `src/styles/muslimah-today.css` and registered with `@theme { … }` so Tailwind
> generates matching utilities (`bg-mt-magenta`, `text-mt-ink`, `font-display`, `rounded-arch`,
> etc.). Names use Tailwind-4 theme namespaces (`--color-*`, `--font-*`, `--text-*`, `--radius-*`,
> `--shadow-*`, `--ease-*`, `--breakpoint-*`). The MT page imports **only** this file.

---

## Colour tokens

### Base (locked — do not alter)
```css
--color-mt-magenta:    #b92c73;  /* primary */
--color-mt-secondary:  #be98c5;  /* secondary */
--color-mt-lilac:      #c296d9;  /* lilac */
--color-mt-grey:       #848484;  /* grey (meta) */
--color-mt-offwhite:   #fefdfe;  /* page ground */
```

### Derived ramps (tints/shades — `[OURS]`, derived only from the above + neutrals)
```css
/* Magenta ramp (600 = locked base) */
--color-mt-magenta-50:  #fbeef5;   --color-mt-magenta-100: #f6d9e8;
--color-mt-magenta-200: #edb3d0;   --color-mt-magenta-300: #e08cb7;
--color-mt-magenta-400: #d05f9b;   --color-mt-magenta-500: #c43f83;
--color-mt-magenta-600: #b92c73;   --color-mt-magenta-700: #9c2461;
--color-mt-magenta-800: #7e1d4e;   --color-mt-magenta-900: #5f1539;
--color-mt-magenta-950: #3f0e26;
/* Lilac / secondary ramp */
--color-mt-lilac-50:  #f7f1fa;  --color-mt-lilac-100: #efe3f4;
--color-mt-lilac-200: #e0cbeb;  --color-mt-lilac-300: #d2b3e1;
--color-mt-lilac-400: #c296d9;  /* = lilac base */
--color-mt-secondary: #be98c5;
/* Neutrals (warm-leaning, derived) */
--color-mt-ink:      #2a2228;  /* body text on light — warm near-black */
--color-mt-grey-200: #d3d3d3;  --color-mt-grey-300: #b8b8b8;
--color-mt-grey-500: #848484;  /* = locked grey */
--color-mt-grey-600: #6b6b6b;  --color-mt-grey-700: #555555;
--color-mt-white:    #ffffff;  /* card surface lift vs off-white ground */
```

### Semantic roles
```css
--mt-bg:            var(--color-mt-offwhite);   /* page */
--mt-surface:       var(--color-mt-white);      /* cards (subtle lift on off-white) */
--mt-surface-tint:  var(--color-mt-magenta-50); /* soft wash card */
--mt-surface-lilac: var(--color-mt-lilac-50);   /* soft lilac panel (About) */
--mt-feature:       var(--color-mt-magenta-600);/* magenta feature fill */
--mt-text:          var(--color-mt-ink);        /* body */
--mt-text-muted:    var(--color-mt-grey-600);   /* secondary body (AA ok) */
--mt-text-meta:     var(--color-mt-grey-500);   /* captions/meta — LARGE/UI only */
--mt-heading:       var(--color-mt-magenta-700);/* display headlines on light */
--mt-on-feature:    var(--color-mt-offwhite);   /* text on magenta */
--mt-accent:        var(--color-mt-magenta-600);
--mt-link:          var(--color-mt-magenta-700);
--mt-link-hover:    var(--color-mt-magenta-800);
--mt-border:        var(--color-mt-magenta-200);/* hairline keyline */
--mt-divider:       var(--color-mt-grey-200);   /* neutral rule */
--mt-ring:          var(--color-mt-offwhite);   /* portrait ring */
--mt-focus:         var(--color-mt-magenta-700);/* focus ring on light */
--mt-focus-on-dark: var(--color-mt-offwhite);   /* focus ring on magenta */
/* “Light” gradient (the signature) — magenta↔lilac only */
--mt-glow:   radial-gradient(60% 60% at 50% 35%, var(--color-mt-magenta-100) 0%, var(--color-mt-lilac-100) 55%, transparent 100%);
--mt-speaker-bg: linear-gradient(180deg, var(--color-mt-magenta-100) 0%, var(--color-mt-lilac-100) 100%);
```

### Contrast (verified — AA targets)
| Pair | Ratio | Use |
|---|---|---|
| ink `#2a2228` on off-white | ~14:1 | all body, any size ✓ |
| magenta-700 on off-white | ~8:1 | headlines, links ✓ |
| **magenta-600 on off-white** | **~5.7:1** | normal text & eyebrows ✓ |
| off-white on magenta-600 | ~5.7:1 | text on feature fills ✓ |
| grey-600 on off-white | ~5.3:1 | muted body ✓ |
| **grey-500 `#848484` on off-white** | **3.74:1** | **LARGE text / UI / captions only** (≥18.66px bold or ≥24px) — never body |
| ink on lilac-100/200 | ≥7:1 | text on soft panels ✓ |
| ink on lilac-400 | ~6.5:1 | text on lilac fill ✓ |
| off-white on lilac-400 | 2.2:1 ✗ | **never** put off-white text on lilac |
**Hard rule:** text only on **solid** tokens — never directly on the `--mt-glow`/gradient/photos
without a solid scrim. Minimum magenta text size = body (we set 18px); fine print stays ink/grey-600.

---

## Typography

### Families
```css
--font-display:    "Libre Caslon Display", "Libre Caslon Text", Georgia, serif; /* 400 only */
--font-serif-text: "Libre Caslon Text", Georgia, serif;  /* 400 / 400 italic / 700 */
--font-body:       "Source Sans 3", system-ui, -apple-system, Segoe UI, sans-serif; /* 400/600/700 */
```
> **Buildable note `[OURS]`:** D22 names *Libre Caslon Display* (display has **only** weight 400,
> **no italic**). Noor's italic taglines/pull-quotes/drop-cap therefore use its sibling **Libre
> Caslon Text Italic** — same Caslon family, visually cohesive. This is a *companion*, not a font
> swap; both stay behind tokens. Subset to Latin; `font-display: swap`; preload the two used
> faces (Caslon Display 400, Source Sans 600).

### Type scale (fluid, mobile-first — `clamp(min, fluid, max)`)
```css
--text-xs:   0.8125rem;                                  /* 13px — fine print, leaders; lh 1.4 */
--text-sm:   0.9375rem;                                  /* 15px — captions/meta;     lh 1.45 */
--text-base: 1.125rem;                                   /* 18px — BODY (≥16 ✓);      lh 1.6  */
--text-md:   1.25rem;                                    /* 20px — lead paragraphs;    lh 1.55 */
--text-lg:   clamp(1.5rem, 1.20rem + 1.2vw, 1.75rem);    /* topics / small heads;     lh 1.3  */
--text-xl:   clamp(1.875rem, 1.40rem + 2.0vw, 2.5rem);   /* section headlines;         lh 1.2  */
--text-2xl:  clamp(2.25rem, 1.60rem + 3.0vw, 3.5rem);    /* big headlines;             lh 1.12 */
--text-3xl:  clamp(2.75rem, 1.80rem + 4.5vw, 4.5rem);    /* hero title / big numerals; lh 1.05 */
--text-display: clamp(3.25rem, 2.0rem + 6vw, 6rem);      /* rare hero “moment”;        lh 1.0  */
/* line-heights */ --lh-tight:1.05; --lh-snug:1.2; --lh-normal:1.5; --lh-relaxed:1.6;
/* tracking */ --track-eyebrow:0.18em; --track-caps:0.06em; --track-display:-0.01em;
```

### Usage rules
- **Libre Caslon Display (400):** big section headlines, hero numerals, **ticket prices** (`R250`
  at `--text-3xl`). Colour `--mt-heading` (magenta-700) or ink. Tracking `--track-display`.
- **Libre Caslon Text *italic*:** the tagline (`Sisterhood · Inspiration · Spiritual Upliftment`),
  testimonial quotes, the joint-session title, the About **drop-cap** (`--text-3xl`, magenta-300,
  float-left).
- **Source Sans 3:** **all** clarity-critical content — body/bios (400, `--text-base` 18px),
  ticket data, date/time/venue, nav. This is what carries “people can't read.”
- **Eyebrows / labels / buttons:** Source Sans 600, **uppercase**, `--track-eyebrow`,
  `--text-sm`, magenta-600 — echoes the logo's tracked “FOR WOMEN”.
- **Measure:** body ≤ `--measure` (40rem / ~64ch). Headlines may run wider.
- **Wordmark echo:** the hero **title** mirrors the logo's Caslon caps; **eyebrows** mirror its
  tracked small-caps. (“MUSLIMAH TODAY” itself stays a **logo image**, never live text.)

---

## Spacing & grid

### Spacing scale (4px base — named)
```css
--space-1:.25rem; --space-2:.5rem; --space-3:.75rem; --space-4:1rem; --space-5:1.5rem;
--space-6:2rem;   --space-7:3rem;  --space-8:4rem;   --space-9:6rem;  --space-10:8rem;
/* fluid section rhythm + page gutter */
--section-y: clamp(4rem, 2rem + 6vw, 8rem);     /* vertical padding per section */
--gutter:    clamp(1.5rem, 1rem + 2vw, 3rem);   /* page side padding */
--stack:     var(--space-5);                     /* default gap between stacked items */
```
> **Consistency rule:** like things use identical spacing — every speaker card, ticket row and
> sponsor chip shares the same internal padding (`--space-5`) and grid gap (`--space-5` mobile /
> `--space-6` desktop). No one-off values anywhere.

### Containers / grid
```css
--container: 75rem;   /* 1200px — section max width */
--measure:   40rem;   /* 640px — reading column */
--niche:     34rem;   /* headliner/feature max width */
```
- Page = single centred column, `--gutter` sides, sections `--container` max.
- Speaker grid: **1-col** (mobile) → **2-col** (md ≥768) → **3-col** (lg ≥1024); gap `--space-5/6`.
- Tickets: featured card full-width then list (mobile) → featured left + list right, 2-col (md).
- Sponsors: 2-col (mobile) → 3–4-col (md) → up to 6-col (lg); `auto-fit minmax()` so the **+2
  pending** logos drop in with no layout change.

### Breakpoints (mobile-first)
```css
--breakpoint-sm:640px; --breakpoint-md:768px; --breakpoint-lg:1024px; --breakpoint-xl:1280px;
```
Design the phone (360px) first; enhance upward.

### Radii / elevation / z-index
```css
--radius-sm:.5rem; --radius-md:.875rem; --radius-lg:1.25rem; --radius-xl:2rem;
--radius-pill:999px; --radius-circle:50%;
--radius-arch: 9999px 9999px var(--radius-lg) var(--radius-lg); /* rounded-top “arch/tombstone” */
--shadow-sm: 0 1px 2px rgba(42,34,40,.06);
--shadow-md: 0 4px 16px rgba(42,34,40,.08);
--shadow-lg: 0 12px 40px rgba(185,44,115,.14);   /* magenta-tinted lift — feature cards */
--z-base:0; --z-raised:10; --z-sticky:100; --z-overlay:1000; --z-modal:1100;
```
Prefer **hairline keylines** (`--mt-border`) over heavy shadows; shadow-lg only on the
featured ticket card + hovered CTAs. The **arch** shape = `border-radius: var(--radius-arch)`
(or an SVG/clip-path mask where a crisp curve over imagery is needed).

---

## Motion tokens — language **“Daybreak”** (light blooms)
```css
--dur-fast:180ms; --dur-base:320ms; --dur-slow:520ms; --dur-bloom:700ms;
--ease-out: cubic-bezier(.22,1,.36,1);     /* soft settle (default) */
--ease-standard: cubic-bezier(.4,0,.2,1);
--motion-rise:16px;   --motion-scale-from:.96;
```
**Signature mechanisms** (each maps to where it's used):
- **reveal-on-enter** (sections/cards): `opacity 0→1` + `translateY(var(--motion-rise)→0)`,
  `--dur-slow --ease-out`, fires at ~15% in view; children stagger 60–80ms.
- **light-bloom** (hero arch + section thresholds): a `--mt-glow` layer animates `opacity 0→.5`
  + slight `scale(.98→1)`, `--dur-bloom`. Behind content only.
- **arch-dawn** (hero, once on load): the glow inside the arch blooms as the wordmark fades up —
  one beat, not scroll-tied.
- **rule-draw** (dividers/eyebrow brackets): hairline `scaleX(0→1)` from left, `--dur-base`.
- **portrait-settle** (speakers): `scale(var(--motion-scale-from)→1)` + opacity on enter.
- **hover** (interactive): CTA lift `translateY(-2px)` + `--shadow-lg`; portrait ring thickens;
  link underline grows. `--dur-fast`.

**Reduced-motion (one global rule):**
```css
@media (prefers-reduced-motion: reduce){
  *{animation:none!important;transition:none!important}
  /* all reveals/blooms render at final state: opacity 1, transform none, glow at final opacity */
}
```
**Performance budget (mobile):** animate **transform/opacity only**; **no parallax**; gradients
are static CSS (bloom = opacity on an existing layer); cap concurrent animations; lazy-load
below-fold; target 60fps. Prefer CSS scroll-driven animations (`animation-timeline: view()`)
with the available `aos` as the no-`@supports` fallback; keep motion JS minimal.

---

## Components (anatomy · tokens · responsive · states)

### Buttons / CTAs
- **Primary “Book”** — fill `--mt-feature`, label `--mt-on-feature` (Source Sans 600,
  `--track-caps`, 18px), `--radius-pill`, padding `--space-3` × `--space-6`, **min-height 48px**,
  trailing `→`. Full-width on mobile. *Hover:* magenta-700 + lift −2px + `--shadow-lg`. *Active:*
  magenta-800, no lift. *Focus-visible:* 3px `--mt-focus` ring + 2px offset. *Disabled* (Quicket
  not live, M5): grey-200 fill, grey-500 label, `not-allowed`, helper text “Booking opens soon”.
- **Secondary** — transparent fill, 1.5px `--mt-accent` border, magenta-700 label; *hover*
  magenta-50 fill. Same metrics.
- **Text link / “›”** — magenta-700 + underline that **draws** on hover; for “venue ›”,
  “WhatsApp ›”, “apply ›”. ≥44px hit area.
- **Sticky mobile Book bar** `[OURS]` — after hero, a thumb-reachable bottom bar (off-white,
  `--shadow-md`, safe-area inset) with the primary CTA; hides at the footer CTA. Reduced-motion =
  no slide, just present.

### Logo lockups  *(analysed from the vector PDFs — core brand DNA)*
- **MT bracket wordmark** — the logo **image** (transparent SVG/PNG from `Muslimah Today
  logo.pdf`): a **lilac band** with “MUSLIMAH TODAY” (Caslon caps) **knocked out in off-white**,
  the band cut by the bracket notches (geometry below). Use the **lilac version on light**; a
  **knockout (all-off-white) version on magenta**. Clear-space = one end-cap width all sides;
  min-width 200px mobile. **Never** recolour, re-type, or set as live text. In the hero, seat it
  on a clear off-white zone *inside* the arch — **not** directly over the lilac glow — so the
  lilac band stays legible.
- **ILM-for-Women lockups** — lilac figures (a mother + 3 children that read as “ILM”) + “INSTITUTE
  *for* LEARNING & MOTIVATION” in **grey Caslon** (italic *for* + ornate ampersand) + “FOR WOMEN”
  in **lilac tracked caps**. Two official lockups exist: **stacked** (figures over text → hero top
  + mobile footer) and **horizontal** (figures · rule · 3-line text → desktop footer). Keep
  lilac+grey; never recolour.
- **“Brought to you by”** (footer) — ILM-for-Women (lilac) + ILM-SA (**teal, untouched** — same
  figure group in teal), equal optical height, “a division of” in Source Sans between; keep brand
  colours (no greyscale). Clear-space = cap-height each side.
- **Bracket motif `.mt-bracket`** — the reusable component built from the wordmark's exact shape
  (below). Variants: **eyebrow** (small; lilac-100 band + magenta-600 label on the middle bar) and
  **band** (full-width magenta feature). Best as an inline **SVG** (`fill: currentColor`, crisp at
  any size). **Rule:** ≤ one large bracket-band per viewport.

### Speaker card
- **Anatomy:** circular portrait (`--radius-circle`) on the **standard speaker background**
  (below), `--mt-ring` 4px ring + 1px `--mt-border` keyline → **name** (Caslon Display
  `--text-lg`, `--mt-heading`, centred) → **topic** (Source Sans 600, `--track-caps`, ink,
  16px) → **bio** (Source Sans 400, 18px).
- **Bio disclosure:** mobile shows ~3 lines + “Read bio ▸” (`<button aria-expanded>`); expands in
  place. Desktop ≥lg shows full bio.
- **Sizes:** portrait Ø 144px (mobile 1-up) / 160px (desktop 3-up). Uniform crop & subject scale.
- **States:** *default* · *hover (desktop)* ring → lilac-300 + portrait `scale(1.02)` + shadow-sm
  · *focus-visible* on the disclosure button · *expanded/collapsed* · *loading* grey-100 skeleton.

### Joint-session block (featured)
- Full-width band, **magenta-600 fill** with an inner `--mt-glow` bloom; placed **immediately
  after Ebrahim & Rosieda**. Contains: eyebrow “JOINT · INTERACTIVE SESSION” (off-white),
  **title in Caslon Text italic** — *“Love, Deen and Life: an honest conversation about marriage
  and family”* (verbatim per `01-content.md`) — and the two names with small paired circular
  portraits. Text `--mt-on-feature`. *Motion:* reveal + light-bloom; reduced-motion static.

### Ticket tier card / pricing block  *(the scannable centrepiece)*
- **Featured “Early bird” card:** magenta-600 fill, off-white text, `--radius-xl`, `--shadow-lg`.
  Label “EARLY BIRD” (eyebrow) · **price `R250`** (Caslon Display `--text-3xl` — the single
  biggest glance target) · “until 31 July” · “then R320” · inclusions (lunch · refreshments ·
  goodie bag) with check icons.
- **Other tiers as an ultra-clear list** on off-white: **Standard R320**, **Pensioner/Student
  R220** (WhatsApp ›), **Sponsored** (apply ›, quota 100, closes 11 Aug) — each row = label
  (Source Sans 700 uppercase) · dotted leader · price right-aligned (Caslon) · sub-line grey-600.
- **Deadline:** “SALES CLOSE WED 26 AUG” as a magenta **tag** (magenta-50 bg, magenta-700 text,
  `--radius-pill`, ⚑ icon). Primary **Book** CTA full-width beneath.
- **Hierarchy law:** at one glance a reader gets **price + early-bird deadline**; everything else
  is secondary. Numbers right-aligned & aligned to each other.
- **Responsive:** mobile 1-col (featured → list → tag → CTA); md → featured card left + list
  right. **States:** featured default; CTA states; disabled Book (M5) shows the “opens soon” note.

### Testimonial card
- Oversized magenta-200 opening quote glyph → **quote in Caslon Text italic** (`--text-md`) →
  attribution (Source Sans 600 name + grey-600 note, e.g. “2025 Speaker”). Card = off-white or
  `--mt-surface-tint`, `--radius-lg`, 1px `--mt-border`. **Naledi's** gets light emphasis (larger
  card; optional companion past-event photo of her).
- **Layout:** mobile **scroll-snap carousel** (one card/view, dots) ; md+ 2–3-col grid. *States:*
  active dot; **no auto-advance** (manual; reduced-motion safe); focus-visible on controls.

### Sponsor tier row/grid
- 3 tiers, each headed by an eyebrow: **Primary Sponsor** (Polygon — largest, own centred row) ·
  **Media Partners** (medium row) · **Sponsors** (grid). Each logo sits in a **white chip**
  (`--mt-surface`, `--radius-md`, 1px `--mt-divider`, uniform `--space-4` padding, fixed
  max-height 48px mobile / 64px desktop) so mismatched logos read as one set.
- **Responsive:** 2-col (mobile) → 3–4 (md) → up to 6 (lg) via `auto-fit minmax(7rem,1fr)` →
  **+2 pending logos drop in with zero layout change**. *States:* optional hover chip-lift.

### Section header / eyebrow
- **Eyebrow** = `.mt-bracket` (small) + label (Source Sans 600 uppercase `--track-eyebrow`,
  magenta-600). **Headline** = Caslon Display `--text-xl/2xl`, `--mt-heading`. Optional
  serif-italic subhead. Consistent `--section-y` top spacing; alignment per section (hero/tickets
  centred; about/speakers left on desktop).

### Footer
- Off-white (or `--mt-surface-lilac`), **preceded by the closing magenta “join us” CTA band**
  (the warmest, most saturated moment — magenta-600 + glow, big Caslon line + Book CTA).
- Then: “brought to you by” lockups → **3 sponsor tiers** → **socials** (FB / IG / WhatsApp icon
  buttons, magenta-600, 44px targets, handles per `01-content.md`) → venue + **Maps** link →
  small grey credit line.

---

## Imagery rules

### Standard speaker background (D26) — decided
- **The one backdrop:** `--mt-speaker-bg` = vertical gradient **magenta-100 `#f6d9e8` (top) →
  lilac-100 `#efe3f4` (bottom)**, with an optional Islamic-geometric tone-on-tone texture at
  **≤4% opacity**. Calm, luminous, palette-pure.
- **Treatment pipeline (for A2):** background-removed (`rembg`) → **crop head + upper body
  (above the chest)** → centred at a **uniform subject scale** (eyeline ~upper third, shoulders
  meet the base) → composited on `--mt-speaker-bg` inside a **circle** with `--mt-ring` 4px +
  1px `--mt-border`. Optional unifying warm overlay (magenta @ ~5%) to marry colour temperatures
  across the mixed sources — **apply consistently or not at all**.
- **Headliner exception:** Ebrahim & Rosieda use the same backdrop in an **arch-topped niche**
  (`--radius-arch`), larger — the one arch echo. (Ebrahim photo res is borderline, M6/A3 — niche
  size chosen to flatter the available resolution; flag if a higher-res file arrives.)
- Source reality handled in processing: rotate sideways shots (Shubnum), keep pre-cut-outs
  (Rosieda) — design only requires the **one backdrop + uniform crop + ring**.

### Past-event photos
- **Two grades:** (a) **full-colour** for the best “hero/About companion” shots (warm grade,
  `--radius-lg`, 1px `--mt-border`); (b) **magenta duotone** (magenta-900 shadows → off-white
  highlights) for secondary/background uses, to unify mixed colour. Captions grey-500.
- **Gallery:** scroll-snap strip (mobile) → grid/masonry (desktop). **No flyers, no video.**
  Responsive `srcset` via Astro image; lazy-load; decorative shots `aria-hidden`, meaningful ones
  get alt text. *(Provenance freed by client: any past-event photo may be used — choose on merit.)*

### Bracket-shape usage system  *(geometry measured from the MT logo vector)*
The wordmark's silhouette **is** the brand's signature: a horizontal band shaped like an
**I-beam / bracket** — two solid end-caps joined by a slimmer middle bar, formed by
**rounded-rectangle notches bitten from the top- and bottom-centre**. Reproduce these proportions
so every eyebrow/band matches the logo exactly:
- **End-caps:** each ≈ **16%** of band width (left & right); **outer corners square**.
- **Notch (the cut):** horizontal span ≈ **66%**, centred; **depth ≈ 28%** of band height top &
  bottom; **middle bar ≈ 44%** of height — the label/wordmark sits on this bar.
- **Notch inner corners:** rounded, radius ≈ **0.13 × band height**.
- **Fill:** magenta **or** lilac only; label/wordmark knocked out in off-white (or magenta-600 on a
  lilac eyebrow). Implement as an inline SVG path (preferred) or a band masked by two pseudo-
  element rounded-rects.

Where it appears: **(1)** the hero wordmark (logo image) · **(2)** section **eyebrows** (small
`.mt-bracket`) · **(3)** **feature bands** (joint-session, sales-close tag, closing CTA) ·
**(4)** optional notch echo on the featured ticket card. The **arch** is the bracket's
architectural cousin — used **once large** (hero) + the headliner niche; never combined with a
notched-pill in the same element.

### Iconography
- One thin-line set (1.5px stroke, e.g. **Lucide**): pin · WhatsApp · Facebook · Instagram · `›` ·
  check · flag/clock. Colour magenta-600 / grey-600; sizes 20/24px on the scale; 44px touch
  targets. Decorative use `aria-hidden`.

---

## Accessibility baseline
- **Contrast:** body/UI ≥4.5:1 (ink, magenta-600+, grey-600+); large/UI ≥3:1 (grey-500 only).
  Never text on gradients/photos without a solid scrim. Colour is never the **sole** carrier of
  meaning (ticket tiers have labels + structure, not just colour).
- **Focus-visible:** 2–3px ring (`--mt-focus` on light / `--mt-focus-on-dark` on magenta) + 2px
  offset; outlines never removed.
- **Landmarks & headings:** `header / nav / main / section / footer`; one `h1` (hero title),
  ordered `h2/h3`. Bios = `<button aria-expanded>` disclosures; carousel keyboard-operable + aria.
- **Targets:** ≥44×44px; primary CTAs thumb-reachable (sticky mobile Book bar).
- **Type:** body ≥16px (we use **18px**), body line-height ≥1.5, measure ≤64ch.
- **Motion:** global `prefers-reduced-motion` honoured; no info conveyed by motion alone.

---

## Open items surfaced (not invented)
- **`[OURS]` font companion:** added `--font-serif-text` (Libre Caslon Text) for italic — flagged
  above; revert to Display-only is one token change if you prefer.
- **`[OPEN]` (M5):** Book → `MT2026` and Sponsored → `MTSP2026` may be inactive until created →
  **disabled CTA state** specified (“Booking opens soon”).
- **`[OPEN]` (M6/A3):** Ebrahim photo resolution is borderline for the larger headliner niche.
- **`[OPEN]`:** +2 pending sponsor logos — grid is extensible, no redesign needed.
- **Palette:** stays the locked 5 hexes + neutrals; **no gold** unless the client later requests it.

> **Next:** on your sign-off of this system I write `03-section-specs.md` (per-section
> mobile→desktop layout, hierarchy, motion, assets, acceptance criteria) using only these tokens
> & components, then self-critique against the brief's success criteria.

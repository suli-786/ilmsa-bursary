# 01 — Visual Directions

Three **genuinely distinct** directions for the Muslimah Today 2026 landing page. All three
respect the locked palette (magenta `#b92c73`, secondary `#be98c5`, lilac `#c296d9`, grey
`#848484`, off-white `#fefdfe` + neutrals), the locked fonts (Libre Caslon Display +
Source Sans 3), the mandatory **bracket** motif, the locked section order, and mobile-first.
They differ on **feel, layout system, type expression, colour balance, and motion language** —
not on content. **Pick one (or a blend); then I elaborate only that into `02`/`03`.**

> **Brand read (grounded in the real assets, not generic instinct).**
> The **bracket** is literal: the MT wordmark sits in a lilac band with rounded-rectangle
> notches bitten from the top & bottom centre, leaving two end-caps that read as `[ ]`. The
> flyers reuse it as **notched pills** for section headers/CTAs — so the bracket becomes a
> *system*, not one logo. Wordmark + tagline are **Caslon caps / Caslon italic**; headings &
> body are a confident sans → exactly our pairing. The brand also owns: tone-on-tone
> **Islamic-geometric/floral damask** texture, **circular ringed portraits**, a real-event
> **floral arch** backdrop, and warm, diverse, candid event photography. The five hexes form a
> tight magenta→lilac family with grey/off-white neutrals — *no other hue earns a place.*

---

## How a woman should feel scrolling, top → bottom (shared north star)
Welcomed → reassured the day is *for her* (price is never a barrier) → moved by who she'll
hear → trusting (real sisters, real past joy) → ready to book. Each direction delivers that
arc with a different *temperature* and *tempo*.

---

## Direction A — **“Majlis”** (The Gathering)
*An immersive, warm, magenta-led experience — the flyer brought to life and given depth.*

- **Concept (one line):** You don't read a page, you're *welcomed into the hall* — full-bleed
  magenta rooms with living tone-on-tone pattern, parting into calm off-white rooms to read.
- **Mood / feel:** Warm, embracing, celebratory yet dignified. Scrolling feels like being
  ushered deeper into a gathering of sisters — colour wraps around you, then opens to breathe.
- **Palette use:** **Magenta-dominant.** Magenta `#b92c73` is the hero surface (hero, speakers,
  closing CTA); **off-white `#fefdfe`** is the relief/reading surface (about, testimonials);
  **lilac/secondary** are soft panels (tickets, joint-session). Grey for meta only. The page
  *alternates* magenta ↔ off-white bands to create a heartbeat. ~55% magenta coverage.
- **Type treatment:** Libre Caslon Display is **large and confident** — the “13th Annual”
  number set as a display moment; **Caslon italic** carries the tagline and every pull-quote
  (echoing the flyer's italic tagline). Source Sans 3 does all labels, body, ticket data.
  Headlines reverse to off-white on magenta; the serif “sings” in big italic quotes.
- **Motion / interaction language — “Unveil.”** Content *rises + fades* as each band enters
  (translateY 16px → 0, opacity, 600ms, soft ease-out); the damask pattern **parallax-drifts**
  slowly behind magenta panels; circular portraits **scale-in** 0.96→1. GPU-only (transform/
  opacity). `prefers-reduced-motion` → all reveals become instant opacity, parallax frozen.
- **Signature “wow” devices:**
  1. **Hero wordmark reveal** — the bracket end-caps *draw in* from left/right, the Caslon
     wordmark fades up between them (one tasteful 900ms beat, then still).
  2. **Living damask** — Islamic-geometric texture drifts at 0.3× scroll behind magenta rooms.
  3. **Magenta “curtain” wipe** between hero → tickets (a soft band sweep, once).
  4. **Lifting portraits** — speaker circles gently rise on a sticky scroll as you reach them.
- **Speaker treatment:** circular ringed portraits (brand-true) on a **single magenta-tinted
  studio backdrop**, off-white ring; uniform head-&-shoulders crop unifies the messy sources.
- **Named references:**
  - **Apple product pages** (e.g. AirPods Pro) — borrow the *confident full-bleed colour
    rooms + one restrained scroll reveal per room* (not the tech tone).
  - **aman.com** — borrow *enveloping warmth + serif restraint*; how full-bleed + quiet type
    feels luxurious rather than loud.
  - **Louvre Abu Dhabi / Museum of Islamic Art Doha** sites — borrow *tone-on-tone geometric
    pattern as ambient texture and “filtered light.”*
- **Trade-offs / risks:** Heavy magenta can fatigue the eye and threaten body-text contrast →
  mitigated by reserving all long-form reading for off-white bands and never setting <16px
  magenta-on-white. Most motion-rich of the three → strict perf budget needed on mobile.
- **ASCII wireframe — Hero (mobile):**
```
┌─────────────────────────┐
│      [ILM for Women]     │  small, top-centre, off-white
│ ░░ islamic-geo damask ░░ │  FULL-BLEED MAGENTA #b92c73
│ ░░  (parallax drift)  ░░ │   texture drifts on scroll
│                          │
│  ╭──┐  MUSLIMAH   ┌──╮   │  bracket-framed WORDMARK
│  │  │   TODAY     │  │   │  (logo image, off-white)
│  ╰──┘             ╰──╯   │
│                          │
│   13TH ANNUAL            │  Source Sans caps, off-white
│   WOMEN’S CONFERENCE     │
│   ─────                  │  short lilac rule
│   Sisterhood ·           │  CASLON ITALIC, off-white
│   Inspiration ·          │
│   Spiritual Upliftment   │
│                          │
│   Sat 29 Aug 2026        │  Source Sans, off-white
│   9am–4.30pm in sha Allah│
│   ◐ NMJ Islamic Centre,  │  ◐ pin → tap opens Maps
│     Durban  ›            │
│   ┌───────────────────┐  │  PRIMARY CTA: off-white fill,
│   │  Book your seat → │  │  magenta label
│   └───────────────────┘  │
│          ⌄               │  quiet scroll cue
└─────────────────────────┘
```
- **ASCII wireframe — Tickets (mobile, the scannable centrepiece):**
```
┌─────────────────────────┐
│ (OFF-WHITE band)         │
│      ── TICKETS ──       │  eyebrow, magenta, centred
│      Reserve your place  │  Caslon, magenta
│ ╭───────────────────────╮│  FEATURED card — magenta fill
│ │ EARLY BIRD            ││  off-white text
│ │  R250                 ││  HUGE Caslon numeral
│ │  until 31 July        ││
│ │  then R320            ││
│ │  lunch·refreshments·  ││
│ │  goodie bag           ││
│ ╰───────────────────────╯│
│ ┌──────────┐ ┌──────────┐│  two lilac-tint cards
│ │PENSIONER │ │SPONSORED ││
│ │& STUDENT │ │ TICKET   ││
│ │  R220    │ │ apply ›  ││
│ │ WhatsApp›│ │ quota 100││
│ └──────────┘ └──────────┘│
│  ⚑ Ticket sales close    │  magenta strip, off-white
│    Wed 26 August         │
└─────────────────────────┘
```

---

## Direction B — **“Atelier”** (Editorial Quiet Luxury)
*A refined women's-journal layout — off-white gallery, magenta used as ink. Type is the star.*

- **Concept (one line):** The dignity comes from **restraint** — museum whitespace, oversized
  Caslon, hairline rules, and magenta deployed like precious ink, never as wallpaper.
- **Mood / feel:** Elegant, calm, unhurried, expensive-through-restraint. A woman feels
  *respected and elevated* — addressed as a reader of a beautiful magazine, not sold to.
- **Palette use:** **Off-white dominant** (~75%). Magenta is **accent ink** — the bracket,
  rules, CTAs, and a few key headlines. Lilac is the only soft tint (cards, the About panel,
  duotone photo washes). Grey for captions/eyebrows. Low magenta *coverage*, high magenta
  *impact*.
- **Type treatment:** This is where **Caslon sings loudest** — huge editorial headlines,
  generous **italic**, a **drop-cap** opening the About, fine hairline rules, a comfortable
  reading measure (~38–42rem). Source Sans 3 appears only as **tiny tracked-out small-caps
  eyebrows/labels** (magazine kicker style) and ticket data. Big scale contrast = the wow.
- **Motion / interaction language — “Imprint.”** Deliberately quiet and tasteful: headlines
  **clip-reveal line-by-line** (as if type is being set/printed); images do a gentle
  scale(1.04→1) + clip; a **thin magenta rule draws across** each section divider. 350–500ms,
  few moving parts. `prefers-reduced-motion` → no clip/scale, rules appear static; nothing lost.
- **Signature “wow” devices:**
  1. **Oversized Caslon headlines** that imprint line-by-line on entry.
  2. **Bracket-as-punctuation** — the brand bracket frames each section eyebrow `[ ABOUT ]`,
     tying the motif through the whole page elegantly.
  3. **Horizontal-scroll past-event gallery** — a filmic strip you swipe, captions in grey.
  4. **Drop-cap + hairline rules** give an editorial, printed-page authority.
- **Speaker treatment:** **editorial portrait tiles** (soft-cornered rectangles, not circles)
  on a uniform pale-lilac backdrop with a thin magenta keyline; name in Caslon, topic in
  tracked small-caps — like contributor portraits in a magazine. Unifies mixed-quality sources
  by treatment, not crop alone.
- **Named references:**
  - **thegentlewoman.co.uk** — borrow *how a women's title portrays women with dignity*: big
    serif headlines, calm grid, portraits treated as art.
  - **aesop.com** — borrow *quiet-luxury restraint*: off-white space, refined captions,
    product/photo treatment, nothing shouting.
  - **readcereal.com (Cereal) / kinfolk.com** — borrow *gallery whitespace + measured editorial
    rhythm* for About, testimonials, and the photo strip.
- **Trade-offs / risks:** Could read as *too quiet / not celebratory* for a warm community
  event, and the least overtly “wow” motion → mitigated by 1–2 bigger beats (the line-by-line
  hero, the swipe gallery) and by warm candid photography carrying the emotion.
- **ASCII wireframe — Hero (mobile):**
```
┌─────────────────────────┐
│ [ILM for Women]      ≡   │  thin top bar, off-white
│                          │
│  EST. 2012 · DURBAN      │  tiny tracked grey eyebrow
│                          │
│  ╭─┐             ┌─╮     │  bracket marks (magenta)
│  │  MUSLIMAH TODAY  │    │  WORDMARK logo, magenta
│  ╰─┘             ╰─╯     │
│                          │
│  The 13th Annual         │  BIG CASLON ITALIC,
│  Women’s                 │  magenta ink on off-white
│  Conference              │  (clip-reveals line by line)
│                          │
│  SISTERHOOD · INSPIRATION│  tracked small-caps, grey
│  · SPIRITUAL UPLIFTMENT  │
│ ┌──────────────────────┐ │  full-bleed candid photo,
│ │  [warm event photo]  │ │  soft lilac duotone wash
│ └──────────────────────┘ │
│  Sat 29 Aug 2026 · 9–4.30│  one tidy meta line, grey
│  · NMJ Islamic Centre › │  › opens Maps
│                          │
│  Book your seat ───────→ │  text CTA w/ drawn rule
└─────────────────────────┘
```
- **ASCII wireframe — Tickets (mobile, editorial price list):**
```
┌─────────────────────────┐
│ ──────────────────────── │  hairline magenta rule
│  Tickets          [ · ]  │  Caslon headline + bracket
│                          │
│  EARLY BIRD ······· R250 │  small-caps + dotted leader
│  to 31 July              │  grey sub
│  ──────────────────────  │
│  STANDARD ········· R320 │
│  from 1 August           │
│  ──────────────────────  │
│  PENSIONER/STUDENT · R220 │
│  WhatsApp 083 271 4500 › │
│  ──────────────────────  │
│  SPONSORED ······· apply │
│  quota 100 · close 11 Aug│
│  ──────────────────────  │
│  Incl. lunch, refresh-   │  caption, grey
│  ments & a goodie bag.   │
│                          │
│  [▪ SALES CLOSE WED 26 AUG]│ magenta tag
│  [    Book your seat →   ]│ magenta CTA (filled)
└─────────────────────────┘
```

---

## Direction C — **“Mihrab”** (The Archway / Ascend)
*Architectural and luminous — built on the arch from the real event + mihrab geometry.*

- **Concept (one line):** The page is a **passage through arches** toward something higher —
  each section framed by an elegant arch, lit by a soft magenta→lilac gradient “dawn.”
- **Mood / feel:** Uplifting, ceremonial, modern-spiritual — literally *upward*, answering
  “Spiritual Upliftment.” A woman feels she's walking through beautiful doorways, elevated at
  each one; luminous and hopeful rather than enveloping or austere.
- **Palette use:** **Off-white base** with **magenta→lilac gradients used as light** (the
  signature) — derived *only* from the two brand hues, so no new colour enters. Arch frames &
  keylines in magenta; arch fills in lilac/secondary tints; grey for meta. The gradient subtly
  shifts warmer (magenta) high on the page to cooler (lilac) lower — a sense of ascent.
  Medium magenta coverage (~35%), but it glows rather than fills.
- **Type treatment:** Caslon set **centred, like an inscription** beneath each arch (echoing a
  carved doorway), with Source Sans structured beneath. Tagline in Caslon italic. Numbers
  (price, date) get architectural weight. Type is *contained by* the arch geometry.
- **Motion / interaction language — “Passage.”** As you scroll you **pass through arches**:
  arched image/section masks **reveal upward** (clip-path from base to crown); a soft gradient
  **light-shift** tracks scroll position; portraits resolve **inside arch frames**. Calm,
  scroll-driven (CSS scroll-driven animations / a light lib), 500–700ms.
  `prefers-reduced-motion` → arches render fully open, gradient static, no clip animation.
- **Signature “wow” devices:**
  1. **Grand hero arch** framing the wordmark, with a faint cascading-floral hint at the
     shoulders (abstracted from the real floral-arch backdrop; palette-bound, very subtle).
  2. **Arched reveals** — sections and the joint-session block emerge through arch masks.
  3. **Gradient light-shift** — the magenta→lilac “dawn” warms/cools as you descend.
  4. **Arched speaker frames** (rounded-top niches) — a distinctive, architectural alternative
     to circles (see trade-off).
- **Speaker treatment:** **arch-topped niches** (flat base, rounded crown) on a soft
  magenta→lilac gradient backdrop, thin magenta keyline — each speaker like a figure in a
  doorway. Distinctive and on-theme; *however* it departs from the brand's established circular
  crop → offered as C's signature, with circular as the safe fallback. **[OPEN]** for your call.
- **Named references:**
  - **stripe.com** — borrow the *soft multi-stop gradient as luminous “light”* (we constrain it
    to magenta↔lilac only).
  - **linear.app** — borrow *restrained glow + subtle, reduced-motion-friendly scroll motion*.
  - **louvreabudhabi.ae / Islamic mihrab architecture** — borrow the *arch + filtered-light*
    language and the dignity of arched, symmetrical framing.
- **Trade-offs / risks:** Arches everywhere risk feeling gimmicky → discipline: one grand arch
  (hero) + restrained echoes elsewhere. Gradients must stay strictly within the two hues to
  avoid inventing a colour. Arch speaker crops break the circular convention (flagged). Gold in
  the real arch decor is **excluded** (not in palette).
- **ASCII wireframe — Hero (mobile):**
```
┌─────────────────────────┐
│      [ILM for Women]     │
│       ╭───────────╮      │  ← GRAND ARCH frame
│      ╱ ░ soft light ░ ╲  │  magenta→lilac gradient glow
│     │  ╭─┐ MUSLIMAH ┌─┐ ││  WORDMARK inside the arch
│     │  ╰─┘  TODAY   ╰─┘ ││
│     │   13TH ANNUAL    ││  Source Sans caps
│     │  WOMEN’S CONF.   ││
│     │   ───            ││
│     │  Sisterhood ·    ││  Caslon italic
│     │  Inspiration ·   ││
│     │  Spiritual       ││
│     │  Upliftment      ││
│      ╲_______________╱  │  arch base
│                          │
│   Sat 29 Aug · 9–4.30pm  │  meta, centred
│   in sha Allah           │
│   ◐ NMJ Islamic Centre › │  pin → Maps
│   ┌───────────────────┐  │
│   │  Book your seat → │  │  CTA (magenta fill)
│   └───────────────────┘  │
└─────────────────────────┘
```
- **ASCII wireframe — Tickets (mobile, arched tier cards):**
```
┌─────────────────────────┐
│     ─◠─ TICKETS ─◠─      │  arched eyebrow
│      Find your place     │  Caslon, centred
│      ╭───────────╮       │  ARCHED-TOP featured card
│     ╱  EARLY BIRD ╲      │  magenta→lilac fill
│    │     R250      │     │  HUGE Caslon numeral
│    │  until 31 Jul │     │
│    │  then R320    │     │
│    │ lunch·goodie  │     │
│     ╲_____________╱      │
│   ╭─────╮   ╭─────╮      │  two arched mini-cards
│  ╱PENS-  ╲ ╱SPON-  ╲     │
│ │ IONER  ││ SORED  │     │
│ │ R220   ││ apply ›│     │
│ │ WA ›   ││ q.100  │     │
│  ╲_____╱   ╲_____╱       │
│                          │
│   ◠ Sales close Wed 26 Aug│ arched strip
│   [   Book your seat →   ]│ CTA
└─────────────────────────┘
```

---

## Direction D — **“Noor”** (Light) ✅ **SELECTED**
*The disciplined convergence: B's editorial backbone, warmed by A (magenta-as-light), with one
signature arch from C. Organising idea = **light (noor)** — warm, elegant, spiritually resonant.*

- **Concept (one line):** A **luminous off-white room** the light fills — warmth arrives as
  *magenta light* (soft gradient glows + a few fully-magenta feature moments), not flat fill,
  and a single grand **arch** at the hero is the threshold a woman is welcomed through.
- **Mood / feel:** Elegant, warm, dignified, quietly luxurious — all four at once. Scrolling
  feels like moving through a calm, light-filled space where warmth glows at each threshold;
  unhurried and respectful (never austere), celebratory at the peaks (never loud).
- **Palette use:** **Off-white-dominant (~65%).** Magenta works **two ways** — as *ink* (rules,
  CTAs, key headlines, the bracket) **and** as *light* (soft magenta→lilac gradient glows behind
  the hero arch and at section thresholds). Lilac/secondary = soft fills/tints. Grey = meta.
  A handful of **fully-magenta feature moments** (hero CTA, joint-session band, closing “join
  us”) carry the warmth; everything that must be *read* sits on off-white.
- **Type treatment:** Editorial Caslon leads — big but warm (not austere). Caslon **italic**
  carries the tagline + pull-quotes; a drop-cap opens the About; hairline magenta rules.
  Source Sans 3 owns all clarity-critical content (ticket data, meta, labels) at ≥16px. Scale
  contrast (large serif ↔ small tracked sans) is the elegance engine.
- **Motion / interaction language — “Daybreak.”** *Light blooms.* On entry, a soft gradient
  **blooms** behind content; the hero arch **fills with light** once on load; portraits resolve
  in place; thin magenta rules **draw** across thresholds. Opacity/transform only, 400–700ms,
  soft ease-out. `prefers-reduced-motion` → everything renders **statically fully-lit**; nothing
  is lost. Light mobile-perf budget (no parallax pattern; gradients are static CSS, glow is opacity).
- **Signature “wow” devices:**
  1. **The hero arch “dawns”** — a magenta→lilac light blooms within the grand arch as the
     wordmark settles (one tasteful beat, then still). Meaningful: threshold + mihrab + upliftment.
  2. **Magenta-as-light thresholds** — soft gradient glows mark the seams between sections, so
     warmth pulses gently down the page instead of shouting from full bands.
  3. **Warm sisterhood photography** treated as art (duotone-wash on mixed shots, full-colour on
     the best) — the real emotional warmth, art-directed.
  4. **One fully-magenta closing moment** — the final “Book your seat / join us” band lands as
     the warmest, most saturated note, resolving the journey.
- **Speaker treatment (resolves the crop `[OPEN]`):** **circular ringed portraits** (warm,
  familiar, brand-true) composited on **one standard magenta→lilac gradient “light” backdrop**
  with an off-white ring + thin magenta keyline; uniform head-&-shoulders crop unifies the messy
  sources. The **Ebrahim & Rosieda headliner** gets a larger **arch-topped niche** (the one place
  the arch echoes), then the **joint-session band**, then the rest as circles.
- **Named references:**
  - **thegentlewoman.co.uk** — borrow *how a women's title portrays women with dignity*: big
    serif, calm grid, portraits as art (the backbone).
  - **aesop.com** — borrow *quiet-luxury off-white restraint*: whitespace, captions, nothing shouting.
  - **stripe.com** — borrow *soft gradient as luminous “light”* (constrained to magenta↔lilac only).
  - **louvreabudhabi.ae / Islamic mihrab architecture** — borrow the *single arch + filtered light*.
- **Trade-offs / risks:** The balancing act is the risk — magenta must stay *light/feature*, not
  creep into flat fill (or it becomes A); whitespace must stay *warm*, not austere (or it becomes
  B); the arch must stay *singular*, not spread (or it becomes C). Mitigation = the token/coverage
  rules in `02` enforce the balance, so the build can't drift.
- **ASCII wireframe — Hero (mobile):**
```
┌─────────────────────────┐
│  [ILM for Women]         │  small, off-white top
│  EST. 2012 · DURBAN      │  tiny tracked grey eyebrow
│       ╭───────────╮      │  ← single GRAND ARCH (threshold)
│      ╱ ·  light  · ╲     │  magenta→lilac glow blooms inside
│     │  ╭─┐MUSLIMAH ┐│    │  WORDMARK (logo image, not text)
│     │  ╰─┘ TODAY  ╯ │    │
│     │ 13TH ANNUAL    │   │  Source Sans caps
│     │ WOMEN’S CONF.  │   │
│      ╲______________╱    │  arch base
│  Sisterhood · Inspiration│  Caslon italic, magenta, centred
│  · Spiritual Upliftment  │
│  Sat 29 Aug 2026 ·       │  Source Sans, grey — scannable
│  9am–4.30pm in sha Allah │
│  ◐ NMJ Islamic Centre › │  pin → Maps
│  ┌────────────────────┐  │  PRIMARY CTA — magenta fill
│  │  Book your seat →  │  │  (the one saturated moment)
│  └────────────────────┘  │
└─────────────────────────┘
```
- **ASCII wireframe — Tickets (mobile, scannable + one warm card):**
```
┌─────────────────────────┐
│  ── TICKETS ──           │  eyebrow magenta, centred
│  Reserve your place      │  Caslon
│ ╭───────────────────────╮│  FEATURED card — magenta fill
│ │ EARLY BIRD            ││  (the warm moment)
│ │  R250                 ││  HUGE Caslon numeral
│ │  until 31 July  ·then  ││
│ │  R320 · lunch·goodie  ││
│ ╰───────────────────────╯│
│  STANDARD ········· R320 │  off-white list, Source Sans,
│  from 1 August           │  dotted leaders — ultra clear
│  ──────────────────────  │
│  PENSIONER/STUDENT · R220 │
│  WhatsApp 083 271 4500 › │
│  ──────────────────────  │
│  SPONSORED ······· apply │
│  quota 100 · close 11 Aug│
│  [▪ SALES CLOSE WED 26 AUG]│ magenta tag
│  [    Book your seat →   ]│ magenta CTA
└─────────────────────────┘
```
- **ASCII wireframe — Speakers (mobile):**
```
┌─────────────────────────┐
│  ── SPEAKERS ──          │  eyebrow + Caslon head
│ ┌───────────────────────┐│  HEADLINER (arch echo)
│ │    ╭ arch niche ╮     ││  Ebrahim + Rosieda on
│ │    │  portraits │     ││  magenta→lilac light bg
│ │    ╰───────────╯      ││
│ │  EBRAHIM RASOOL ·     ││  Caslon names
│ │  ROSIEDA SHABODIEN    ││
│ │  topics · bio ▸       ││
│ └───────────────────────┘│
│ ╭──── JOINT SESSION ────╮│  featured band, magenta light
│ │ “Love, Deen and Life” ││  Caslon italic (interactive)
│ ╰───────────────────────╯│
│   ◯          ◯           │  circular ringed portraits on
│  Fatima     Adam         │  the standard gradient backdrop
│  topic ▸    topic ▸      │
│   ◯          ◯           │
│  Aisha     Shubnum       │
│   ◯                       │
│  Zohra                   │
└─────────────────────────┘
```

---

## Comparison at a glance
| | **A — Majlis** | **B — Atelier** | **C — Mihrab** |
|---|---|---|---|
| **Feel** | Warm, immersive, celebratory | Calm, editorial, quiet-luxury | Luminous, architectural, uplifting |
| **Colour balance** | Magenta-dominant (~55%), alternating bands | Off-white-dominant (~75%), magenta as ink | Off-white + magenta→lilac *gradient light* (~35%) |
| **Type expression** | Big confident Caslon, italic pull-quotes | Oversized editorial Caslon, drop-cap, hairlines | Centred inscriptional Caslon under arches |
| **Motion** | **“Unveil”** — parallax pattern, rise+fade | **“Imprint”** — line-by-line clip, drawn rules | **“Passage”** — arch reveals, gradient light-shift |
| **Bracket motif** | Notched pills as section headers/CTAs | Bracket framing every eyebrow `[ ]` | Arch as the macro-bracket; small brackets as accents |
| **Speakers** | Circular ringed (brand-true) | Editorial portrait tiles | Arch-topped niches *(circular fallback)* |
| **Risk** | Magenta fatigue / perf | Could feel too quiet | Arch could feel gimmicky / convention break |
| **Best for** | Maximum warmth + “event” energy | Maximum elegance + dignity | Maximum distinctiveness + “wow” |

---

## Notes & flags (surfaced, not invented)
- **`[OPEN]` — Gold accent:** the real event decor uses gold lettering, but gold is **not** in
  the locked 5-colour palette → **excluded** from all three. If you want a metallic accent,
  that's a palette decision for you to make (would need a hex).
- **`[OPEN]` — “Inspiring women since 2012”:** appears on ILM's roll-up banner but is **not** in
  the brief's locked copy for this page → **not used**. Available if you want to add it.
- **`[OPEN]` — Speaker crop shape:** circular (A, brand-true) vs editorial tile (B) vs arched
  niche (C). Confirmed at selection; feeds the D26 standard-background decision.
- **`[OPEN]` — Hero wordmark asset:** “MUSLIMAH TODAY” must be the **logo image** (not live
  text); all three assume a clean transparent PNG/SVG derived from the MT logo PDF.
- **Asset reality:** speaker sources are very inconsistent (studio / sideways outdoor / phone
  selfie / pre-cut-out). Every direction's speaker treatment is built to *unify* them via one
  standard background + uniform crop + keyline/ring.

---

## ✅ SELECTED DIRECTION
- **Chosen:** **D — “Noor” (Light)** — the synthesis (B's editorial backbone · A's warmth as
  magenta-light · C's one signature arch). Confirmed by the user 2026-06-30.
- **Notes / tweaks:** Take Noor **“as described”** — balanced temperature (neither warmer toward
  A nor cooler toward B). Speaker crop = **circular** (arch reserved for the headliner only).
  Provenance constraints relaxed by the user: *event decor / “Inspiring women since 2012” are not
  blockers, and any past-event photo may be used* — choose on design merit. (Palette stays the
  locked 5 hexes; no gold unless the client later asks.)

> Now elaborating **only** Direction D into `02-design-system.md` (tokens, components, motion,
> imagery incl. the standard speaker background) → review checkpoint → then `03-section-specs.md`.

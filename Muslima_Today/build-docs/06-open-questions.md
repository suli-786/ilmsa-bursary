# 06 — Decisions Log + Open Questions (living tracker)

Keep this current as answers arrive. Decisions feed `[DECISION]` tags elsewhere; open
items stay `[OPEN]` and must never be guessed. Execution work lives in `07-tasks.md`.

## Decisions log ✅ (confirmed by client / decided)
| # | Decision |
|---|---|
| D1 | Brand name spelling is **"Muslimah Today"** (with the *h*). |
| D2 | Tagline = the **brief's** 3 words **Sisterhood • Inspiration • Spiritual Upliftment**. |
| D3 | Speaker surname = **Aisha Kilumbilo** (brief); flyer's "Mponda" is wrong. |
| D4 | Speaker order = **Ebrahim → Rosieda → [joint block] → Fatima → then alphabetical** (Adam, Aisha, Shubnum, Zohra). Rosieda moved to #2 (Ebrahim's wife). |
| D5 | Ebrahim + Rosieda **joint session shown as its own item**. |
| D6 | `www.ilmsa.co.za/MT2026` **is the Quicket page** (Book button target). |
| D7 | **Google Maps** clickable, opens exact pin: `https://maps.app.goo.gl/GhgJAQSFquFEftqX9`. |
| D8 | **Keep Clare's testimonial as-is.** |
| D9 | **Include socials**: FB `ILM.SouthAfrica`, IG `ilmsouthafrica`, WhatsApp `ilmsa.co.za/WA`. |
| D10 | Sponsors = **3 tiers only** (Primary / Sponsors / Media Partners). |
| D11 | Spelling glossary = **the brief** (preserve verbatim). |
| D12 | Palette = magenta `#b92c73`, secondary `#be98c5`, lilac `#c296d9`, grey `#848484`, off-white `#fefdfe`; bracket shape mandatory. |
| D13 | Client sends raw originals; a future chat crops (head + upper body), removes background, applies one standard background. |
| D14 | Asset intake folders = `assets-raw/{logos, speakers, past-events}`. |
| D15 | "The logos" = the **sponsor logos** (was Q8). |
| D16 | ILM-SA parent logo = `ILM Logo vertical …` (**teal**) — keep as-is; don't recolour / bleed teal (was Q2). |
| D17 | The pack was authored in a planning-only session — a per-session instruction; does NOT restrict execution chats. |
| D18 | **No videos** (encapsulating or testimonial). |
| D19 | **No flyer images on the page** (brand reference only). `Digital flyer 2025.jpg` = font-feel reference. |
| D20 | **Polygon** (primary) logo = `assets-raw/logos/Polygon.pdf` (renamed from `PPE.pdf`). |
| D21 | Image tooling installed: `rembg`+`pymupdf`+`pillow` in `Muslima_Today/.venv`. |
| **D22** | **Fonts:** Display/headings = **Libre Caslon Display**, Body/UI = **Source Sans 3** (Google), behind `--font-display`/`--font-body`. Grounded in the ILM logo's embedded **Adobe Caslon Pro + Myriad Pro**. Swappable at final review. (Was Q1.) |
| **D23** | **Page URL = `ilmsa.co.za/MT`** (route `src/pages/MT.astro`); short for flyers. Book → `MT2026`. (Was Q3.) |
| **D24** | **Joint-session placement** = its own featured block **immediately after Ebrahim & Rosieda (positions 1–2), before Fatima** (design chat styles it). (Was Q4.) |
| **D25** | **No street address** — Maps pin + "NMJ Islamic Centre, Durban" is sufficient. (Was Q5.) |
| **D26** | **Standard speaker background** (decided): `--mt-speaker-bg` = vertical gradient **magenta-100 `#f6d9e8` → lilac-100 `#efe3f4`** (+ optional ≤4% Islamic-geo texture); circular, off-white ring, uniform crop. (Was Q7.) |
| **D27** | **Visual direction = "Noor" (Light)** — off-white editorial backbone, magenta-as-light/ink (≤~35% coverage), one signature **arch**, motion language **"Daybreak"**. (User pick.) |
| **D28** | **Section order = persuasion-first:** Hero → About → Speakers (+joint) → Testimonials → Past-events → **Tickets (warm climax)** → Footer, with a global sticky **Book** bar. (Confirmed — moves Tickets late but keeps it the scannable centrepiece.) |
| **D29** | **Font companion:** *Libre Caslon Text (Italic)* added for italics (Display 400 has no italic) — `[OURS]`, behind a token, revertible. |
| **D30** | **Provenance freed:** any past-event photo may be used (choose on merit). |

## Open — needs a client/team answer ❓ `[OPEN]`
| # | Item | Needed for |
|---|---|---|
| Q-name | Confirm Media-Partner **display names** (brief "Tabloid Newspapers" vs list "Tabloid"). | Sponsors (minor) |

*(Q1→D22, Q2→D16, Q3→D23, Q4→D24, Q5→D25, Q6→D18/D19, Q7→D26, Q8→D15, Q-pol/ppe→D20,
Q-tool→D21 — all resolved.)*

## Provisional defaults — confirm at the FINAL WALKTHROUGH 🔁
Made now to keep the build moving; each is a one-point swap, none recorded as fact.
- Visual direction "Noor" + **section order** (Tickets late) (D27/D28) · fonts incl. the Caslon
  Text italic companion (D22/D29) · page route `/MT` (D23) · standard speaker background (D26) ·
  Book/sponsored links → `MT2026`/`MTSP2026` (live when Raeesah creates them) · extensible slots
  for the **2 pending** sponsor logos.

## Open — awaiting external materials 📦 `[OPEN]`
| # | Material | Status |
|---|---|---|
| M1 | Speaker photos (7) | ✅ Received |
| M2 | Past-event photos (17) | ✅ Received |
| M3 | Sponsor list | ✅ Received — **+2 pending** |
| M4 | Sponsor logos | ✅ 16 received (incl. Polygon); **+2 pending** |
| M5 | Quicket page (MT2026) + sponsored-ticket form (MTSP2026) | Not created yet (Raeesah) |
| M6 | Higher-res `Ebrahim Rasool` photo | Optional |

## Notes / flags
- Page uses the brief's tagline; flyer's "Spritual"/"Motivation" is a flyer typo (D2).
- ILM-SA logo is teal by nature — never recolour, never let teal enter the page palette (D16).

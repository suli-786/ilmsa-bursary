# 02 — Brand / Visual Identity

This is the **Muslimah Today** identity. It is its own brand — **not** ILM-SA bursary,
not the existing bursary site. See `05-build.md` for the "do not reuse bursary brand"
enforcement.

> The **full design system** (elaborated colour ramps, type scale, spacing, components,
> motion) lives in **`design/02-design-system.md`**, produced by the design chat from this doc.

## Colour tokens `[DECISION]` (client-supplied hex)
| Role | Hex | Source / usage |
|---|---|---|
| **Primary — magenta** | `#b92c73` | Flyer's dominant colour (big pink background). The page's primary brand colour. |
| **Secondary** | `#be98c5` | Flyer accent (e.g. footer pill). |
| **Lilac** | `#c296d9` | Logo colour: ILM for Women people-icon, the "FOR WOMEN" sub-text, and the Muslimah Today wordmark. |
| **Grey** | `#848484` | ILM for Women logo headline text ("Institute for Learning & Motivation"). |
| **Off-white** | `#fefdfe` | Background. |

Notes:
- These five are the confirmed palette. Tints/shades/states (hover, borders, etc.) are
  `[OURS]` to derive from these — never introduce a new hue without asking.
- The ILM for Women logo internally uses: people graphic `#c296d9`, headline `#848484`,
  "For Women" `#c296d9`, background `#fefdfe`.

## The mandatory shape `[DECISION]`
- The **Muslimah Today wordmark sits inside a specific bracket / banner shape** — this
  shape is **part of the brand and must be retained**. Source: the Muslimah Today logo PDF
  (the purple banner with notched ends) and the flyer.

## Logos `[BRIEF]`
Three logos are referenced by the brief. See `04-assets.md` for files/formats.
1. **Muslimah Today logo** — wordmark in the bracket shape. (Have: PDF.)
2. **ILM for Women logo** — people icon + "Institute for Learning & Motivation / FOR
   WOMEN". (Have: PDF, two lockups.)
3. **ILM-SA (parent charity) logo** — for the footer "a division of ILM-SA". `[OPEN]`
   (candidate `public/images/ILM-SA logo.jpg` exists — verify it's the correct one.)

## Typography `[DECISION]` (D22)
Grounded in the ILM brand's **embedded** logo fonts (extracted from `ILM SA women logo.pdf`):
**Adobe Caslon Pro** (serif) + **Myriad Pro** (sans). Chosen free web equivalents:
- **Display / headings → `Libre Caslon Display`** (Google) — a Caslon revival; echoes the ILM
  Caslon and the elegant "MUSLIMAH TODAY" wordmark.
- **Body / UI → `Source Sans 3`** (Google) — open-source successor to Myriad Pro; matches the
  "FOR WOMEN" subtext and is highly legible on mobile (key: "people can't read").
- Expose both behind tokens (`--font-display`, `--font-body`) so a final-review swap is one
  line. The "MUSLIMAH TODAY" wordmark is the **logo image**, not live text.
- The design chat builds the type *scale/hierarchy* on these two families. A companion
  **Libre Caslon Text (Italic)** is used for italics (Display 400 has no italic) — see
  `design/02-design-system.md` → Typography (D29).
- *(Reference: `assets-raw/past-events/Digital flyer 2025.jpg` shows the brand's intended feel;
  confirm/swap at final walkthrough if it diverges.)*

## Hard rule — do NOT reuse the bursary brand
The following belong to the **ILM-SA bursary site** and must **not** appear on this page:
- Colours: teal `#009193`, orange `#f6931c`, `#97c9c3`.
- Font: `Poppins` (as the bursary heading font).
- Files/components: `src/styles/global.css`, and the bursary components
  (`Header`, `Hero`, `Footer`, `WhoCanApply`, `HowToApply`, `Preloader`).

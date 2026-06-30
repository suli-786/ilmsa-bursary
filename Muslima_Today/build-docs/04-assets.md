# 04 — Asset Manifest, Catalogue & Processing

All of the client's images are in the repo under `../assets-raw/`. This doc catalogues
them and defines how they become build-ready. Identities below were verified by viewing
the files (read-only). Actual sorting/cropping/conversion is future work (`07-tasks.md`).

## Received catalogue (raw — as delivered)

### Organisation logos — `assets-raw/logos/organisations/` (verified ✅)
| File(s) | Identity | Notes |
|---|---|---|
| `Muslimah Today logo.pdf` (vector), `Muslimah Today Logo.jpg` | Muslimah Today | PDF has the mandatory bracket shape. |
| `ILM SA women logo.pdf` (vector), `ILM for women logo.jpg` | **ILM for Women** | Purple "Institute for Learning & Motivation / FOR WOMEN". Footer "brought to you by". |
| `ILM Logo vertical png.png`, `ILM Logo vertical jpeg.jpg` | **ILM-SA (parent)** | **Teal** "…/ SOUTH AFRICA". Do NOT recolour; don't let teal enter the page palette. |

### Sponsor logos — `assets-raw/logos/` (tiers per `Updated logo list.docx`)
| File | Sponsor | Tier |
|---|---|---|
| `Polygon.pdf` | **Polygon** | **Primary** ✅ (was `PPE.pdf`; renamed per client) |
| `Osmans.tif` | Osmans Taj Mahal | Sponsor (`.tif` — convert) |
| `impress.pdf` | Impress | Sponsor |
| `rvbd.pdf` | RVBD | Sponsor |
| `sasol.pdf` | SASOL | Sponsor |
| `Arctic.pdf` | Arctic Amanzi | Sponsor |
| `NMJ.pdf` | NMJ | Sponsor *(also the venue)* |
| `Pastry Shack.png` | Pastry Shack | Sponsor |
| `TLB.pdf` | TLB | Sponsor |
| `Luxe logo.png` | Luxe | Sponsor |
| `GQ Tissue logo.pdf` | GQ Tissue | Sponsor |
| `Willowton Group.pdf` | Willowton Group | Sponsor |
| `Cellular Citi.png` | Cellular Citi | Sponsor |
| `tabloid.pdf` | Tabloid | Media Partner |
| `weekly-gazette.pdf` | The Weekly Gazette | Media Partner |
| `al-ansaar.pdf` | Radio Al-Ansaar | Media Partner |
| `Updated logo list.docx` | (the sponsor list itself) | Source doc, not a logo |

> The list doc notes **2 more sponsors awaiting confirmation** — logos to follow.

### Speaker photos — `assets-raw/speakers/` (all 7 ✅)
`Adam Deane.jpeg`, `Aisha Kilumbilo.jpg`, `Ebrahim Rasool.jpg`, `Fatima Asmal.jpg`,
`Rosieda Shabodien.jpg`, `Shubnum Khan.JPG`, `Zohra Sooliman.jpg`.
- Inconsistent sizes/backgrounds (expected). `Ebrahim Rasool.jpg` ~91 KB → **check res**.

### Past-event images — `assets-raw/past-events/` (17)
- Photos: `Audience.JPG`, `Delegates Portrait.jpg`, `P64A####.jpg` ×12,
  `Naledi Portrait/Landscape.JPG` (= Naledi Pandor, ties to her testimonial). All 3–8 MB.
- `Digital flyer 2024.jpg`, `Digital flyer 2025.jpg` — **NOT used on the page** (brand
  reference only, D19). **`Digital flyer 2025.jpg` = the correct-FONT reference** (see Q1).

## Have / Need summary
- **Have ✅:** all 3 org logos; all 7 speaker photos; 17 past-event images; **16** sponsor/
  media logos (incl. Polygon); the sponsor list doc.
- **Need ⛔ `[OPEN]`:** the **2 pending** sponsor logos; possibly a higher-res Ebrahim photo.

## Image tooling — set up in this repo `[DONE/verifying]`
No system `pip`/`sudo` here, so tooling lives in an isolated venv (gitignored):
- **`Muslima_Today/.venv/`** — created via `virtualenv`. Packages:
  - **`rembg[cpu,cli]`** — ML background removal + its ONNX runtime backend (first run
    downloads the U2Net model → needs network).
  - **`pymupdf`** (`import fitz`) — render/convert PDF logos → SVG/PNG **without** poppler/ImageMagick.
  - **`pillow`** — crop/resize/compose.
- Use via `Muslima_Today/.venv/bin/python` (or activate). Verified imports OK (rembg 2.0.76,
  pymupdf 1.28.0, pillow 12.2.0, onnxruntime 1.27.0).
- To recreate (no system pip/sudo here): bootstrap pip via `get-pip.py --user
  --break-system-packages` → `pip install --user virtualenv` → `python3 -m virtualenv
  Muslima_Today/.venv` → `.venv/bin/pip install "rembg[cpu,cli]" pymupdf pillow`.
- **Gap:** no raster→SVG vectoriser (potrace/autotrace need sudo). Vector logos come from the
  PDFs via pymupdf; raster logos stay raster (transparent PNG).

## Processing — a FUTURE chat does this; nobody crops manually `[OURS]`
(Full task list in `07-tasks.md`.)
- **Speaker photos:** crop to **head + upper body (above the chest)**; **remove background**
  (rembg); composite onto the **standard speaker background** — see `design/02-design-system.md`
  → Imagery (**D26** = magenta-100→lilac-100 gradient; circular, off-white ring; uniform crop);
  responsive + compressed.
- **Logos:** sort into tiers; PDF → SVG/PNG (pymupdf); normalise; keep MT bracket shape.
- **Past-event photos:** select, crop, compress.

## Build-ready OUTPUT — where the AI references final assets `[OURS]`
- Photos → `src/assets/muslimah-today/{speakers,past-events}/` (Astro image pipeline).
- Logos → `src/assets/muslimah-today/logos/` (SVG/PNG).
- **`assets-raw/` is never referenced by the build — only the processed output is.**

## Naming convention (target, applied during processing)
kebab-case: `speaker-ebrahim-rasool.jpg`, `logo-muslimah-today.svg`, `sponsor-polygon.svg`,
`media-radio-al-ansaar.svg`, `org-ilm-sa.svg`.

#!/usr/bin/env python3
"""Sort & convert Muslimah Today logos into tiered, kebab-named transparent PNGs.

Source: Muslima_Today/assets-raw/logos/**   →   Output: src/assets/muslimah-today/logos/
- PDFs are rendered (pymupdf) at high DPI with alpha, then trimmed to content.
- Rasters (.tif/.png) are opened, background made transparent where it's a flat white/light
  border, then trimmed.
- Vector PDFs are rasterised to high-res PNG (faithful; pymupdf SVG risks font substitution).
Run from repo root via Muslima_Today/.venv/bin/python.
"""
import io, json, os, sys
import fitz                       # pymupdf
import numpy as np
from PIL import Image, ImageDraw

RAW = "Muslima_Today/assets-raw/logos"
OUT = "src/assets/muslimah-today/logos"
os.makedirs(OUT, exist_ok=True)

# source (rel to RAW) -> (output-stem, tier, mode, cap)
#   mode: "auto"  = trim alpha; if fully opaque, strip border white then trim
#         "split2"= one page holds two lockups → split at the centre gutter into -stacked/-horizontal
#         "keep-dark" = opaque dark-bg logo (gold-on-dark) → keep its bg, contrast-trim
JOBS = [
    ("organisations/Muslimah Today logo.pdf", "logo-muslimah-today", "org", "auto",   1400),
    ("organisations/ILM SA women logo.pdf",   "org-ilm-for-women",   "org", "split2", 1100),
    ("organisations/ILM Logo vertical png.png","org-ilm-sa",         "org", "auto",   1100),
    ("Polygon.pdf",            "sponsor-polygon",         "primary", "auto",     1100),
    ("Osmans.tif",             "sponsor-osmans",          "sponsor", "auto",      800),
    ("impress.pdf",            "sponsor-impress",         "sponsor", "auto",      800),
    ("rvbd.pdf",               "sponsor-rvbd",            "sponsor", "auto",      800),
    ("sasol.pdf",              "sponsor-sasol",           "sponsor", "auto",      800),
    ("Arctic.pdf",             "sponsor-arctic",          "sponsor", "auto",      800),
    ("NMJ.pdf",                "sponsor-nmj",             "sponsor", "auto",      800),
    ("Pastry Shack.png",       "sponsor-pastry-shack",    "sponsor", "auto",      800),
    ("TLB.pdf",                "sponsor-tlb",             "sponsor", "auto",      800),
    ("Luxe logo.png",          "sponsor-luxe",            "sponsor", "keep-dark", 800),
    ("GQ Tissue logo.pdf",     "sponsor-gq-tissue",       "sponsor", "auto",      800),
    ("Willowton Group.pdf",    "sponsor-willowton-group", "sponsor", "auto",      800),
    ("Cellular Citi.png",      "sponsor-cellular-citi",   "sponsor", "auto",      800),
    ("tabloid.pdf",            "media-tabloid",           "media",   "auto",      900),
    ("weekly-gazette.pdf",     "media-weekly-gazette",    "media",   "auto",      900),
    ("al-ansaar.pdf",          "media-radio-al-ansaar",   "media",   "auto",      900),
]


def load_pdf_rgba(path):
    doc = fitz.open(path)
    pg = doc[0]
    long_pts = max(pg.rect.width, pg.rect.height)
    zoom = max(3.0, 2600.0 / long_pts)
    pix = pg.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=True)
    return Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGBA")


def flood_bg_transparent(im, target=(255, 255, 255), thresh=50, sentinel=(255, 0, 254)):
    """Make the border-connected flat background transparent (preserves interior fills)."""
    rgb = im.convert("RGB")
    w, h = rgb.size
    fired = False
    for c in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        px = rgb.getpixel(c)
        if sum(abs(px[i] - target[i]) for i in range(3)) <= thresh * 3:
            ImageDraw.floodfill(rgb, c, sentinel, thresh=thresh)
            fired = True
    if not fired:
        return im, False
    arr = np.array(rgb)
    mask = np.all(arr == np.array(sentinel), axis=-1)
    out = im.convert("RGBA")
    a = np.array(out)
    a[..., 3] = np.where(mask, 0, np.array(out)[..., 3])
    return Image.fromarray(a, "RGBA"), True


def autotrim(im, pad_frac=0.05):
    im = im.convert("RGBA")
    bbox = im.getchannel("A").getbbox()
    if not bbox:
        return im
    w, h = im.size
    pw = int((bbox[2] - bbox[0]) * pad_frac)
    ph = int((bbox[3] - bbox[1]) * pad_frac)
    return im.crop((max(0, bbox[0] - pw), max(0, bbox[1] - ph),
                    min(w, bbox[2] + pw), min(h, bbox[3] + ph)))


def cap(im, cap_long):
    w, h = im.size
    if max(w, h) > cap_long:
        s = cap_long / max(w, h)
        im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)
    return im


def contrast_trim_keep_bg(im, thresh=28, pad_frac=0.08):
    """For an opaque dark-bg logo: crop to where pixels differ from the corner colour,
    but KEEP the background inside the crop (so gold-on-dark stays legible)."""
    rgb = np.array(im.convert("RGB")).astype(int)
    bg = rgb[0, 0]
    diff = np.abs(rgb - bg).sum(axis=-1)
    ys, xs = np.where(diff > thresh)
    if len(xs) == 0:
        return im
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    pw = int((x1 - x0) * pad_frac); ph = int((y1 - y0) * pad_frac)
    w, h = im.size
    return im.crop((max(0, x0 - pw), max(0, y0 - ph),
                    min(w, x1 + pw), min(h, y1 + ph)))


def split_two(im):
    """Split a trimmed image holding two lockups at the widest transparent column-gutter
    in the middle third. Returns (left, right)."""
    a = np.array(im.convert("RGBA"))[..., 3]
    col_has = (a > 8).any(axis=0)                 # columns containing content
    w = len(col_has)
    lo, hi = int(w * 0.30), int(w * 0.70)
    best, run, start = None, 0, None
    for x in range(lo, hi):
        if not col_has[x]:
            if start is None: start = x
            run += 1
        else:
            if best is None or run > best[0]: best = (run, start, x) if start is not None else best
            run, start = 0, None
    if start is not None and (best is None or run > best[0]): best = (run, start, hi)
    cut = (best[1] + best[2]) // 2 if best else w // 2
    return im.crop((0, 0, cut, im.height)), im.crop((cut, 0, w, im.height))


manifest = []
for rel, stem, tier, mode, cap_long in JOBS:
    src = os.path.join(RAW, rel)
    if not os.path.exists(src):
        print(f"  MISSING {rel}"); continue
    im = load_pdf_rgba(src) if src.lower().endswith(".pdf") else Image.open(src).convert("RGBA")
    has_alpha = im.getchannel("A").getextrema()[0] < 255

    outputs = []   # list of (stem, image)
    if mode == "keep-dark":
        outputs = [(stem, contrast_trim_keep_bg(im))]
    elif mode == "split2":
        im = autotrim(im)
        left, right = split_two(im)
        outputs = [(stem + "-stacked", autotrim(left)),
                   (stem + "-horizontal", autotrim(right))]
    else:  # auto
        if not has_alpha:
            im, _ = flood_bg_transparent(im, target=(255, 255, 255), thresh=55)
        outputs = [(stem, autotrim(im))]

    for ostem, oim in outputs:
        oim = cap(oim, cap_long)
        out = os.path.join(OUT, ostem + ".png")
        oim.save(out, optimize=True)
        kb = os.path.getsize(out) // 1024
        manifest.append({"stem": ostem, "tier": tier, "src": rel,
                         "w": oim.size[0], "h": oim.size[1], "kb": kb})
        print(f"  {tier:8s} {ostem:28s} {oim.size[0]:4d}x{oim.size[1]:4d}  {kb:4d}KB")

with open(os.path.join(OUT, "_manifest.json"), "w") as f:
    json.dump(manifest, f, indent=2)
print(f"\nWrote {len(manifest)} logos → {OUT}")

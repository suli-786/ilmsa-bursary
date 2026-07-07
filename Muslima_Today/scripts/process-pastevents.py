#!/usr/bin/env python3
"""Curate & optimise past-event photos for the Muslimah Today gallery.

Selected 8 gallery photos (atmosphere / sisterhood / branding / joy / speakers) + the
Naledi Pandor portrait (companion for her testimonial). Digital flyers excluded;
any past-event photo is usable (client-approved). Photos kept full-colour & natural —
any colour treatment is CSS at build.
Output: src/assets/muslimah-today/past-events/. Run via Muslima_Today/.venv/bin/python.
"""
import os
from PIL import Image, ImageOps

RAW = "Muslima_Today/assets-raw/past-events"
OUT = "src/assets/muslimah-today/past-events"
os.makedirs(OUT, exist_ok=True)

LONG = 1600       # cap long side (px) — Astro generates responsive variants from this
QUALITY = 82

#  source file            -> output stem            (meaning / use)
SELECT = [
    ("Audience.JPG",          "gallery-audience"),        # full room, engaged, diverse
    ("Delegates Portrait.jpg","gallery-embrace"),         # two women embracing — sisterhood
    ("P64A1574.JPG",          "gallery-venue"),           # magenta-set tables — venue/scale
    ("P64A7796.jpg",          "gallery-welcome-arch"),    # floral "WELCOMES YOU" arch — branding
    ("P64A7875.jpg",          "gallery-goodie-bag"),      # smiling attendee w/ goodie bag — joy
    ("P64A7907.jpg",          "gallery-group-elegant"),   # group of four — sisterhood
    ("P64A8056.jpg",          "gallery-speaker"),         # speaker mid-talk at podium
    ("P64A8183.jpg",          "gallery-group-vibrant"),   # vibrant group — diversity/joy
    ("Naledi Portrait.JPG",   "past-event-naledi"),       # Naledi Pandor — testimonial companion
]


def fit(im, long):
    w, h = im.size
    if max(w, h) > long:
        s = long / max(w, h)
        im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)
    return im


total = 0
for src, stem in SELECT:
    p = os.path.join(RAW, src)
    if not os.path.exists(p):
        print(f"  MISSING {src}"); continue
    im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
    sw, sh = im.size
    im = fit(im, LONG)
    out = os.path.join(OUT, stem + ".jpg")
    im.save(out, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    kb = os.path.getsize(out) // 1024
    total += kb
    print(f"  {stem:24s} {sw}x{sh} -> {im.size[0]}x{im.size[1]}  {kb:4d}KB")
print(f"\nWrote {len(SELECT)} photos -> {OUT}  ({total//1024 or total} {'MB' if total>1024 else 'KB'} total)")

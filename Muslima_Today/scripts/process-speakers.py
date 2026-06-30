#!/usr/bin/env python3
"""A2 — process the 7 Muslimah Today speaker photos into uniform portrait tiles.

Pipeline (design/02 → Imagery D26, 04-assets A2):
  EXIF + face-detected auto-orient (fixes Shubnum's sideways landscape)
  → rembg human-seg cut-out → face-aligned uniform crop (eyeline ~upper third,
  consistent subject scale) → composite on the D26 standard speaker bg
  (--mt-speaker-bg: magenta-100 #f6d9e8 → lilac-100 #efe3f4 vertical gradient),
  baked as a SQUARE tile.

Note: the circular / arch mask + off-white ring are applied at BUILD via the CSS
tokens (--radius-circle / --radius-arch, --mt-ring, --mt-border) so the same tile
serves both the circular speaker grid and Ebrahim & Rosieda's arch headliner niche.
Run from repo root via Muslima_Today/.venv/bin/python.
"""
import io, json, os
import cv2
import numpy as np
from PIL import Image, ImageOps
from rembg import new_session, remove

RAW = "Muslima_Today/assets-raw/speakers"
OUT = "src/assets/muslimah-today/speakers"
os.makedirs(OUT, exist_ok=True)
os.makedirs("Muslima_Today/.verify", exist_ok=True)

SPEAKERS = [   # (source file, output stem, headliner?)
    ("Ebrahim Rasool.jpg",   "speaker-ebrahim-rasool",   True),
    ("Rosieda Shabodien.jpg","speaker-rosieda-shabodien",True),
    ("Fatima Asmal.jpg",     "speaker-fatima-asmal",     False),
    ("Adam Deane.jpeg",      "speaker-adam-deane",       False),
    ("Aisha Kilumbilo.jpg",  "speaker-aisha-kilumbilo",  False),
    ("Shubnum Khan.JPG",     "speaker-shubnum-khan",     False),
    ("Zohra Sooliman.jpg",   "speaker-zohra-sooliman",   False),
]

CANVAS = 900
TOP = (246, 217, 232)   # magenta-100  #f6d9e8
BOT = (239, 227, 244)   # lilac-100    #efe3f4
FACE_FRAC = 0.30        # face-box width as fraction of canvas
EYE_Y = 0.40            # vertical placement of the eye line
MAX_UP = 2.4            # cap upscaling of low-res sources
WORK_LONG = 3000        # rembg/crop working long side (keep detail; only downscale if bigger)
DET_LONG = 1300         # face-detection copy long side (speed)

# Manual face-box override (cx, cy=eye-line, width) as fractions of the oriented image,
# for shots the cascade can't reliably detect. Shubnum's head is tilted against busy
# autumn foliage → Haar returns a false box; her face is framed here by eye.
MANUAL = {
    "speaker-shubnum-khan": (0.515, 0.40, 0.175),
}

SESS = new_session("u2net_human_seg")
CASCADES = [cv2.CascadeClassifier(cv2.data.haarcascades + n) for n in
            ("haarcascade_frontalface_default.xml", "haarcascade_frontalface_alt2.xml")]


def gradient(size):
    ys = np.linspace(0, 1, size)[:, None]
    arr = np.zeros((size, size, 4), np.uint8)
    for i in range(3):
        arr[..., i] = (TOP[i] + (BOT[i] - TOP[i]) * ys).astype(np.uint8)
    arr[..., 3] = 255
    return Image.fromarray(arr, "RGBA")


def detect_largest(pil_rgb):
    """Return (x, y, w, h) of the largest detected face, or None."""
    g = cv2.cvtColor(np.array(pil_rgb), cv2.COLOR_RGB2GRAY)
    g = cv2.equalizeHist(g)
    best = None
    for c in CASCADES:
        for (x, y, w, h) in c.detectMultiScale(g, 1.1, 5, minSize=(40, 40)):
            if best is None or w * h > best[2] * best[3]:
                best = (int(x), int(y), int(w), int(h))
    return best


def downscale(im, long):
    w, h = im.size
    if max(w, h) <= long:
        return im
    s = long / max(w, h)
    return im.resize((round(w * s), round(h * s)), Image.LANCZOS)


def rotate(im, ang):
    return im if ang == 0 else im.rotate({90: -90, 270: 90, 180: 180}[ang], expand=True)


def best_orientation(small):
    """Strongly prefer upright (0°): portraits are ~never truly upside-down, and Haar
    throws false positives at rotated angles. Only rotate when 0° finds no face; never 180°."""
    if detect_largest(small):
        return 0
    for ang in (90, 270):                       # genuinely sideways source (no EXIF)
        if detect_largest(rotate(small, ang)):
            return ang
    return 0


def silhouette_face(cut):
    """Fallback when no face is detected: estimate a head box from the alpha mask."""
    a = np.array(cut)[..., 3]
    ys, xs = np.where(a > 16)
    if len(xs) == 0:
        return None
    sy0, sy1 = ys.min(), ys.max()
    band = a[sy0:sy0 + max(1, int((sy1 - sy0) * 0.22))] > 16
    cols = np.where(band.any(axis=0))[0]
    if len(cols) == 0:
        return None
    hx0, hx1 = cols.min(), cols.max()
    hw = hx1 - hx0
    return (hx0, sy0, hw, int(hw * 1.2))   # approx head box


report = []
for fn, stem, headliner in SPEAKERS:
    src = os.path.join(RAW, fn)
    orig = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    sw, sh = orig.size
    ang = best_orientation(downscale(orig, 1100))
    orig = rotate(orig, ang)

    work = downscale(orig, WORK_LONG)           # high-res working copy (rembg + crop)
    ww, wh = work.size
    cut = remove(work, session=SESS)            # RGBA at work res
    used_silhouette = False
    if stem in MANUAL:
        cxf, cyf, wf = MANUAL[stem]
        face_cx, face_cy, fw = cxf * ww, cyf * wh, wf * ww
    else:
        det = downscale(work, DET_LONG)         # fast detection copy
        k = work.size[0] / det.size[0]          # det -> work coord scale
        face = detect_largest(det)
        used_silhouette = face is None
        if used_silhouette:
            face = silhouette_face(cut)
            fx, fy, fw, fh = face
        else:
            fx, fy, fw, fh = tuple(round(v * k) for v in face)
        face_cx = fx + fw / 2
        face_cy = fy + fh * 0.42                 # eye line ~ 42% down the face box

    scale = (FACE_FRAC * CANVAS) / fw
    upscaled = scale > 1.0
    scale = min(scale, MAX_UP)
    cw, ch = cut.size
    cut_s = cut.resize((max(1, round(cw * scale)), max(1, round(ch * scale))), Image.LANCZOS)
    ox = round(CANVAS / 2 - face_cx * scale)
    oy = round(EYE_Y * CANVAS - face_cy * scale)

    canvas = gradient(CANVAS)
    canvas.alpha_composite(cut_s, (ox, oy))
    out = os.path.join(OUT, stem + ".jpg")     # opaque tile (gradient fills it) → JPEG per naming
    canvas.convert("RGB").save(out, "JPEG", quality=90, optimize=True, progressive=True)
    kb = os.path.getsize(out) // 1024
    report.append({"stem": stem, "src": fn, "src_dims": [sw, sh], "orient": ang,
                   "face_w_px": int(fw), "scale": round(scale, 2), "upscaled": upscaled,
                   "silhouette": used_silhouette, "headliner": headliner, "kb": kb})
    print(f"  {stem:26s} src {sw}x{sh} orient={ang:3d} face_w={int(fw):4d} "
          f"scale={scale:.2f}{' UP' if upscaled else '  '} "
          f"{'SILHOUETTE' if used_silhouette else ''} -> {kb}KB")

with open("Muslima_Today/.verify/speakers-report.json", "w") as f:
    json.dump(report, f, indent=2)
print(f"\nWrote {len(report)} speaker tiles -> {OUT}")

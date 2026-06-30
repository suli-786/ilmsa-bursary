#!/usr/bin/env python3
"""A2 / A2b — process the 7 Muslimah Today speaker photos into uniform portrait tiles.

Pipeline (design/02 → Imagery D26, 04-assets A2):
  EXIF + face-detected auto-orient (fixes Shubnum's sideways landscape)
  → rembg human-seg cut-out (A2b: ALPHA MATTING on → clean edges, no dark halo)
  → face-aligned uniform crop (eyeline ~upper third, consistent subject scale)
  → composite on the D26 standard speaker bg
  (--mt-speaker-bg: magenta-100 #f6d9e8 → lilac-100 #efe3f4 vertical gradient),
  baked as a SQUARE tile.

A2b — why this changed: the first cut (plain rembg) left a hard dark box on Rosieda
and dark edge halos on Adam/Shubnum/Zohra (dark subject against a bright/dark bg →
the matte kept a semi-transparent dark rim that reads as a halo on the light gradient).
Fix: rembg `alpha_matting=True` re-estimates the edge alpha AND the true foreground
colour (kills colour spill), then a gentle alpha erode+feather trims any residual rim.

Note: the circular / arch mask + off-white ring are applied at BUILD via the CSS
tokens (--radius-circle / --radius-arch, --mt-ring, --mt-border) so the same tile
serves both the circular speaker grid and Ebrahim & Rosieda's arch headliner niche.
The contact sheet written to .verify/ previews those masks faithfully (circle for the
grid, arch for the two headliners, 4px off-white ring + 1px magenta-200 keyline) so
edge defects are caught exactly as they will render.

Run from repo root via Muslima_Today/.venv/bin/python.
"""
import io, json, os
import cv2
import numpy as np
from PIL import Image, ImageOps, ImageDraw, ImageFont
from rembg import new_session, remove

RAW = "Muslima_Today/assets-raw/speakers"
OUT = "src/assets/muslimah-today/speakers"
VERIFY = "Muslima_Today/.verify"
os.makedirs(OUT, exist_ok=True)
os.makedirs(VERIFY, exist_ok=True)

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
WORK_LONG = 3000        # rembg/matting working long side — keep native detail so
                        # small-in-frame faces (Fatima/Shubnum) crop crisp, not upscaled.
DET_LONG = 1300         # face-detection copy long side (speed)

# Design tokens for the verification contact sheet (must mirror design/02).
OFFWHITE = (254, 253, 254, 255)   # --color-mt-offwhite #fefdfe (page ground)
MAGENTA200 = (237, 179, 208, 255) # --color-mt-magenta-200 #edb3d0 (--mt-border keyline)

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


def cut_out(work):
    """rembg cut-out with alpha matting (A2b). Matting re-estimates the boundary
    alpha and the true foreground colour, removing the dark spill/halo that plain
    masking leaves on dark subjects. Falls back to plain removal if matting fails."""
    try:
        return remove(
            work, session=SESS,
            alpha_matting=True,
            alpha_matting_foreground_threshold=250,
            alpha_matting_background_threshold=8,
            alpha_matting_erode_size=15,
            post_process_mask=True,
        )
    except Exception as e:                      # pragma: no cover — defensive
        print(f"    [warn] alpha matting failed ({e}); falling back to plain remove")
        return remove(work, session=SESS, post_process_mask=True)


def clean_alpha(cut, long_side):
    """Trim any residual dark rim: erode the alpha a hair, then feather for a clean
    anti-aliased edge. Proportional to working res; small enough to preserve hair."""
    arr = np.array(cut)
    a = arr[..., 3]
    r = max(1, round(long_side * 0.0016))       # ~2-3px at 1600
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r + 1, 2 * r + 1))
    a = cv2.erode(a, k, iterations=1)
    a = cv2.GaussianBlur(a, (0, 0), sigmaX=max(0.6, r * 0.6))
    arr[..., 3] = a
    return Image.fromarray(arr, "RGBA")


# ── verification contact sheet (mirrors the build masks) ────────────────────────
def shape_mask(S, shape):
    """L-mode mask: 'circle' = --radius-circle 50%; 'arch' = --radius-arch
    (semicircular top, radius-lg bottom corners → tombstone)."""
    m = Image.new("L", (S, S), 0)
    d = ImageDraw.Draw(m)
    if shape == "circle":
        d.ellipse([0, 0, S - 1, S - 1], fill=255)
    else:
        rb = round(S * 0.10)                     # radius-lg, scaled
        d.rounded_rectangle([0, S // 2, S - 1, S - 1], radius=rb, fill=255)
        d.ellipse([0, 0, S - 1, S - 1], fill=255)
    return m


def render_cell(tile, shape, S):
    """Portrait masked to shape with 1px-equiv magenta keyline + off-white ring,
    on the off-white page ground — exactly the build's portrait anatomy."""
    key = max(1, round(S * 0.006))
    ring = max(3, round(S * 0.020))
    cell = Image.new("RGBA", (S, S), OFFWHITE)
    cell.paste(Image.new("RGBA", (S, S), MAGENTA200), (0, 0), shape_mask(S, shape))
    si = S - 2 * key
    cell.paste(Image.new("RGBA", (si, si), OFFWHITE), (key, key), shape_mask(si, shape))
    off = key + ring
    inner = S - 2 * off
    pin = tile.convert("RGBA").resize((inner, inner), Image.LANCZOS)
    cell.paste(pin, (off, off), shape_mask(inner, shape))
    return cell


def contact_sheet(cells, labels, cols=4, cell=300):
    pad, gap, lab = 24, 18, 26
    rows = (len(cells) + cols - 1) // cols
    W = pad * 2 + cols * cell + (cols - 1) * gap
    H = pad * 2 + rows * (cell + lab) + (rows - 1) * gap
    sheet = Image.new("RGB", (W, H), (254, 253, 254))
    d = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 16)
    except Exception:
        font = ImageFont.load_default()
    for i, (c, label) in enumerate(zip(cells, labels)):
        r, col = divmod(i, cols)
        x = pad + col * (cell + gap)
        y = pad + r * (cell + lab + gap)
        sheet.paste(c.resize((cell, cell), Image.LANCZOS), (x, y), c.resize((cell, cell), Image.LANCZOS))
        d.text((x, y + cell + 5), label, fill=(42, 34, 40), font=font)
    return sheet


report, cells, labels = [], [], []
for fn, stem, headliner in SPEAKERS:
    src = os.path.join(RAW, fn)
    orig = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    sw, sh = orig.size
    ang = best_orientation(downscale(orig, 1100))
    orig = rotate(orig, ang)

    work = downscale(orig, WORK_LONG)           # working copy (rembg + crop)
    ww, wh = work.size
    cut = clean_alpha(cut_out(work), max(ww, wh))   # RGBA, matted + edge-cleaned
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

    cells.append(render_cell(canvas, "arch" if headliner else "circle", CANVAS))
    labels.append(f"{stem.replace('speaker-','')} {'ARCH' if headliner else 'circle'} "
                  f"s{scale:.2f}{' UP' if upscaled else ''}{' SIL' if used_silhouette else ''}")
    report.append({"stem": stem, "src": fn, "src_dims": [sw, sh], "orient": ang,
                   "face_w_px": int(fw), "scale": round(scale, 2), "upscaled": upscaled,
                   "silhouette": used_silhouette, "headliner": headliner, "kb": kb})
    print(f"  {stem:26s} src {sw}x{sh} orient={ang:3d} face_w={int(fw):4d} "
          f"scale={scale:.2f}{' UP' if upscaled else '  '} "
          f"{'SILHOUETTE' if used_silhouette else ''} -> {kb}KB")

contact_sheet(cells, labels).save(os.path.join(VERIFY, "speakers-contact-sheet.png"))
with open(os.path.join(VERIFY, "speakers-report.json"), "w") as f:
    json.dump(report, f, indent=2)
print(f"\nWrote {len(report)} speaker tiles -> {OUT}")
print(f"Contact sheet -> {VERIFY}/speakers-contact-sheet.png")

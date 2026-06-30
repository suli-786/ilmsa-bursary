#!/usr/bin/env bash
# verify-mt.sh — STRUCTURAL verification for the Muslimah Today build.
# Run from anywhere. Exit 0 = pass, non-zero = fail. Safe to run pre-build (setup phase):
# content checks are skipped until the MT page exists.
set -uo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"   # repo root (this lives in Muslima_Today/scripts)
cd "$ROOT" || exit 2
fail=0
ok(){  printf '  \033[32m✓\033[0m %s\n' "$*"; }
err(){ printf '  \033[31m✗\033[0m %s\n' "$*"; fail=1; }
note(){ printf '  · %s\n' "$*"; }

echo "== 1. Build (astro) =="
if npm run build >/tmp/mt-build.log 2>&1; then ok "astro build clean"; else err "astro build FAILED — tail:"; tail -25 /tmp/mt-build.log; fi

echo "== 2. Scope fence (no out-of-scope changes) =="
allow='^(src/pages/MT\.astro|src/components/muslimah-today/|src/styles/muslimah-today\.css|src/assets/muslimah-today/|src/data/muslimah-today/|Muslima_Today/|package\.json|package-lock\.json|\.gitignore)'
# -uall lists untracked files individually (a brand-new dir like src/data/ would
# otherwise collapse to one entry that misses the more specific allow-prefix).
offenders="$(git status --porcelain -uall | awk '{print $2}' | grep -Ev "$allow" || true)"
if [ -n "$offenders" ]; then err "changes outside the MT scope fence:"; printf '     %s\n' $offenders; else ok "all working changes are in scope"; fi

echo "== 3. Forbidden tokens in MT source =="
mtsrc=$(ls -d src/pages/MT.astro src/components/muslimah-today src/styles/muslimah-today.css src/data/muslimah-today 2>/dev/null || true)
if [ -n "$mtsrc" ]; then
  if grep -rniE '#009193|#f6931c|#97c9c3|poppins|global\.css|\bgold\b' $mtsrc 2>/dev/null; then
    err "forbidden token found (bursary colour/font, global.css, or gold)"
  else ok "no forbidden tokens (bursary brand / gold)"; fi
else note "MT source not created yet (setup phase) — skipped"; fi

echo "== 4. Content checks (built HTML) =="
html="$(ls dist/MT/index.html dist/MT.html 2>/dev/null | head -1 || true)"
# While the build is still RUNNING (per STATUS Loop state), the page is assembled
# section-by-section — missing copy/anchors for not-yet-built sections are reported
# as pending NOTES, not failures. They become HARD gates at handoff (any non-RUNNING
# state: AWAITING-HUMAN / DONE / HALTED) and whenever STATUS is unreadable
# (fail-safe default = enforce). The wrong-value guards stay hard at all times.
STATUSMD="$ROOT/Muslima_Today/build-docs/STATUS.md"
loopstate="$(grep -m1 -i 'Loop state:' "$STATUSMD" 2>/dev/null | grep -oE '`[A-Za-z-]+`' | head -1 | tr -d '`' | tr '[:lower:]' '[:upper:]')"
[ "$loopstate" = "RUNNING" ] && content_pending=1 || content_pending=0
if [ -z "$html" ]; then note "MT page not built yet (setup phase) — skipped"; else
  must=( "Sisterhood" "Spiritual Upliftment" "in sha Allah" "NMJ" "2026" \
         "R250" "R320" "R220" "Kilumbilo" "Ebrahim Rasool" "Rosieda Shabodien" \
         "Love, Deen and Life" "Fathima" "Polygon" )
  miss=0; pend=0
  contentcheck(){ # $1 = failure message, $2 = string that must be present
    grep -qiF "$2" "$html" && return
    if [ "$content_pending" -eq 1 ]; then note "pending (build in progress): $1"; pend=1
    else err "$1"; miss=1; fi
  }
  for s in "${must[@]}"; do contentcheck "missing copy: \"$s\"" "$s"; done
  for a in 'id="about"' 'id="speakers"' 'id="tickets"'; do contentcheck "missing anchor: $a" "$a"; done
  if [ "$miss" -eq 0 ] && [ "$pend" -eq 0 ]; then ok "required copy + anchors present"
  elif [ "$miss" -eq 0 ]; then note "content/anchors pending while Loop state RUNNING — enforced at handoff"; fi
  # guard against the known wrong values (always hard — only fire if the bad string is present)
  grep -qiF "Mponda" "$html"  && err "found 'Mponda' (must be Kilumbilo)"
  grep -qiF "Spritual" "$html" && err "found flyer typo 'Spritual'"
fi

echo
if [ "$fail" -eq 0 ]; then echo -e "\033[32mVERIFY-MT: PASS\033[0m"; exit 0; else echo -e "\033[31mVERIFY-MT: FAIL\033[0m"; exit 1; fi

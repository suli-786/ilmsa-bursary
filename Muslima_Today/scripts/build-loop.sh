#!/usr/bin/env bash
# build-loop.sh — ONE autonomous build leg, fired by cron. Runs Claude headless on the
# muslimah-today branch to do the next segment, verify, commit, and update STATUS.md.
#
# Safe to fire repeatedly: it LOCKS (no overlap), guards the BRANCH, honours a STOP file,
# and NO-OPS once STATUS shows the build is DONE / HALTED / AWAITING-HUMAN.
#
#   build-loop.sh            # do one leg (this is what cron runs)
#   build-loop.sh --dry-run  # run all guards + say what it WOULD do; never calls claude
#   build-loop.sh --smoke    # prove headless `claude` works (trivial prompt), then exit
#
# KILL SWITCH:  touch Muslima_Today/.loop/STOP     (delete the file to resume)
# Logs/lock/STOP live in Muslima_Today/.loop/ (gitignored).

# Cron runs with a bare environment — set these explicitly.
export HOME="/home/suleiman"
export PATH="/home/suleiman/.local/bin:/usr/local/bin:/usr/bin:/bin"

REPO="/home/suleiman/code/ilmsa-bursary"
BRANCH="muslimah-today"
LOOPDIR="$REPO/Muslima_Today/.loop"
LOG="$LOOPDIR/loop.log"
LOCK="$LOOPDIR/loop.lock"
STATUS="$REPO/Muslima_Today/build-docs/STATUS.md"
MODE="${1:-run}"

mkdir -p "$LOOPDIR"
log(){ printf '%s  %s\n' "$(date -Is)" "$*" | tee -a "$LOG" >&2; }

# --- single instance ---
exec 9>"$LOCK"
if ! flock -n 9; then log "another leg is already running — skip."; exit 0; fi

cd "$REPO" || { log "repo not found: $REPO"; exit 1; }

# --- guards ---
[ -f "$LOOPDIR/STOP" ] && { log "STOP file present — halt."; exit 0; }
cur="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
[ "$cur" = "$BRANCH" ] || { log "not on $BRANCH (on '$cur') — refuse."; exit 0; }
if grep -qiE 'Loop state:.*(DONE|HALTED|AWAITING-HUMAN)' "$STATUS" 2>/dev/null; then
  log "STATUS shows build done/halted — nothing to do."; exit 0
fi

KICKOFF='You are running NON-INTERACTIVELY (headless): there is NO human to answer questions — never ask anything, never present options, never deliberate about whether to start; just DO the work. You ARE the worker (any running claude or build-loop process you notice is yourself — ignore it; do not inspect processes). Read and follow Muslima_Today/build-docs/08-build-protocol.md exactly, then continue from Muslima_Today/build-docs/STATUS.md: do the next unblocked task(s) up to the end of the current segment, verifying each (structural via "bash Muslima_Today/scripts/verify-mt.sh" and visual via "node Muslima_Today/scripts/shoot.mjs"), committing each task on the muslimah-today branch (NEVER push, NEVER main, NEVER deploy), and updating STATUS.md after each. Stay strictly in MT namespaces. If you hit a hard stop, or finish all build legs, set the STATUS "Loop state:" line accordingly (HALTED / AWAITING-HUMAN / DONE) and stop. Use extended thinking.'

CLAUDE=(claude --print --model opus --permission-mode bypassPermissions --output-format text)

case "$MODE" in
  --dry-run)
    log "DRY-RUN: guards passed (on $BRANCH, no STOP, STATUS active) — would run a build leg."
    ;;
  --smoke)
    log "SMOKE: testing headless claude (trivial prompt)…"
    out="$(timeout 240 "${CLAUDE[@]}" 'Reply with exactly: LOOP-OK and do nothing else.' 2>>"$LOG")"
    log "SMOKE result: [$out]"
    [ "$out" = "LOOP-OK" ] || { log "SMOKE: unexpected output"; exit 1; }
    ;;
  *)
    log "LEG: starting headless build leg…"
    timeout 5400 "${CLAUDE[@]}" "$KICKOFF" >>"$LOG" 2>&1
    rc=$?
    log "LEG: claude exited rc=$rc"
    ;;
esac

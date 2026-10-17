#!/usr/bin/env bash
# Pack the theme, install the tarball in a throwaway deck outside the repo, and build it.
# Catches packaging mistakes (missing folders in "files", unresolved imports) before they reach npm.
set -euo pipefail

repo="$(cd "$(dirname "$0")/.." && pwd)"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

cd "$repo"
tarball="$(npm pack --silent --pack-destination "$work" | tail -n 1)"
echo "packed: $tarball"

cd "$work"
cp "$repo/example/smoke/slides.md" slides.md
npm init -y > /dev/null
npm install --no-audit --no-fund "./$tarball" "@slidev/cli@^53.0.0" > npm-install.log 2>&1 \
  || { cat npm-install.log; exit 1; }
npx --no-install slidev build slides.md --out dist > build.log 2>&1 || { cat build.log; exit 1; }

test -f dist/index.html || { echo "smoke: dist/index.html missing" >&2; exit 1; }
echo "smoke: built $work/dist ($(find dist -type f | wc -l | tr -d ' ') files)"

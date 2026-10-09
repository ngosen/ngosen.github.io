#!/bin/sh
# Render tools/og/card.html to public/og.png (1200x630, the size Facebook and others show).
set -eu
here=$(cd "$(dirname "$0")" && pwd)
root=$(cd "$here/../.." && pwd)
profile=$(mktemp -d)
trap 'rm -rf "$profile"' EXIT
firefox --headless --no-remote --profile "$profile" --window-size=1200,630 \
  --screenshot "$root/public/og.png" "file://$here/card.html"

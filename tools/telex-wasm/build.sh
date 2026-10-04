#!/bin/bash
# Rebuilds public/telex/telex.wasm from bamboo-core at the revision pinned in go.mod.
# Needs Go; the result is committed, so building the site itself does not.
set -euo pipefail
cd "$(dirname "$0")"

out=../../public/telex
mkdir -p "$out"
GOOS=js GOARCH=wasm go build -trimpath -buildvcs=false -ldflags='-s -w' -o "$out/telex.wasm" .

# Go moved wasm_exec.js between releases.
goroot=$(go env GOROOT)
for candidate in "$goroot/lib/wasm/wasm_exec.js" "$goroot/misc/wasm/wasm_exec.js"; do
    if [ -f "$candidate" ]; then
        cp "$candidate" "$out/wasm_exec.js"
        break
    fi
done
[ -f "$out/wasm_exec.js" ] || { echo "wasm_exec.js not found under $goroot" >&2; exit 1; }

ls -l "$out"

#!/bin/bash
# Rebuilds public/telex/telex.wasm from bamboo-core at the version pinned in Cargo.toml.
# Needs Rust with the wasm32-unknown-unknown target (rustup target add wasm32-unknown-unknown);
# the result is committed, so building the site itself does not.
set -euo pipefail
cd "$(dirname "$0")"

cargo build --locked --release --target wasm32-unknown-unknown
cp "${CARGO_TARGET_DIR:-target}"/wasm32-unknown-unknown/release/telex_wasm.wasm ../../public/telex/telex.wasm
ls -l ../../public/telex/telex.wasm

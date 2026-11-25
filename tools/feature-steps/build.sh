#!/bin/bash
# Regenerates src/data/feature-steps.json: what the app shows after each key of the feature
# examples, typed by the Ngó Sen core in Gõ Sen mode with default settings.
# Usage: tools/feature-steps/build.sh <checkout of ngosen/ngosen at the released tag>
set -euo pipefail
here=$(cd "$(dirname "$0")" && pwd)
src=$(cd "$1" && pwd)
build=${BUILD_DIR:-/dev/shm/ngosen-feature-steps}
cp "$here/show-steps.cpp" "$src/test/core/"
grep -q show_steps "$src/test/core/CMakeLists.txt" || cat >> "$src/test/core/CMakeLists.txt" <<'CMAKE'
add_executable(show_steps show-steps.cpp fake-app.cpp fake-host.cpp fake-engine.cpp)
target_compile_definitions(show_steps PRIVATE NGOSEN_TEST_DICTIONARY="${PROJECT_SOURCE_DIR}/data/dictionaries/vietnamese.cm.dict"
    NGOSEN_TEST_ENGLISH_WORDS="${PROJECT_SOURCE_DIR}/data/english-common.txt"
    NGOSEN_TEST_KEEP_WORDS="${PROJECT_SOURCE_DIR}/data/keep-words.txt")
target_link_libraries(show_steps PRIVATE ngosen_core)
CMAKE
cmake -S "$src" -B "$build" -DNGOSEN_CORE_ONLY=ON -DBUILD_TESTING=ON -DCMAKE_BUILD_TYPE=Release >/dev/null
CARGO_TARGET_DIR="$build/cargo" make -C "$build" -j"$(nproc)" show_steps >/dev/null
version=$(git -C "$src" describe --tags --always)
grep -v '^#' "$here/examples.txt" | cut -f2 | "$build/test/core/show_steps" |
  python3 "$here/to-json.py" "$here/examples.txt" "$version" > "$here/../../src/data/feature-steps.json"
echo "wrote src/data/feature-steps.json from $version"

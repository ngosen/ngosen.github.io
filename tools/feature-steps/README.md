# Feature step generator

Generates `src/data/feature-steps.json` for `/tinh-nang/` (`TypedExample.astro`) using the real Ngó Sen core in Gõ Sen mode with default settings.

## What it does

- Reads example definitions from `tools/feature-steps/examples.txt` (`id<TAB>keys`, where `<` is Backspace and `|` is a mouse click right after the word).
- Copies `show-steps.cpp` into a `ngosen/ngosen` checkout, builds the `show_steps` helper against `ngosen_core`, and feeds each key sequence through `FakeApp`.
- Runs `to-json.py` to keep the Gõ Sen runs and write `src/data/feature-steps.json` with the checkout's git tag (`version`) and per-key outputs (`steps`, `final`).

## How to run

```bash
tools/feature-steps/build.sh /path/to/ngosen-checkout
```

Pass a checkout of `ngosen/ngosen` checked out at the released tag. Set `BUILD_DIR` to override the temporary build directory (defaults to `/dev/shm/ngosen-feature-steps`).

The script adds `show-steps.cpp` and a `show_steps` target to that checkout, so use a throwaway worktree.

# Ngó Sen website

The maintainer only **vibecodes** this project: an AI coding agent writes the code and the
maintainer directs, checks and publishes it.

Source of the website for [Ngó Sen](https://github.com/ngosen/ngosen), a Vietnamese input method for
fcitx5 on Linux. It is a static [Astro](https://astro.build) site meant for GitHub Pages at
`ngosen.github.io`: a home page, an install guide, a page on what differs from fcitx5-lotus, a blog
with an RSS feed, and one English page.

## Commands

```
npm ci
npm run dev          # local preview
npm run build        # static output in dist/
npm run check:telex  # compare the typing core with the expected Telex results
```

## The typing demo

The home page composes Vietnamese with
[bamboo-core](https://github.com/LotusInputMethod/bamboo-core) (MIT), the same composing core the
input method uses, compiled to WebAssembly. The browser fetches it only when a visitor focuses the
demo field; the scripted run plays from precomputed steps.

```
tools/telex-wasm/build.sh              # rebuild public/telex/telex.wasm (needs Go)
node tools/telex-wasm/demo-steps.mjs   # regenerate src/data/demo-steps.json
```

## Content

- Blog posts: Markdown files in `src/content/blog/`.
- The list of distributions and how far each was tested: `src/data/site.ts`. It mirrors
  `packaging/release-notes.md` in the main repository and has to change with it.

## Third-party files

`public/telex/telex.wasm` is built from bamboo-core (MIT) with the Go toolchain, and
`public/telex/wasm_exec.js` comes from the Go distribution (BSD-3-Clause). Both license texts are
shipped next to them in `public/telex/`. The fonts are Xanh Mono, Barlow and Barlow Condensed (SIL
Open Font License), self-hosted through Fontsource.

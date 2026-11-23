# Ngó Sen website

Source of the website for [Ngó Sen](https://github.com/ngosen/ngosen), a Vietnamese input method for
Linux that comes in two editions: one for fcitx5 and one for IBus
([ibus-ngosen](https://github.com/ngosen/ibus-ngosen)). It is a static [Astro](https://astro.build)
site served by GitHub Pages at `ngosen.github.io`.

`AGENTS.md` holds the rules for changing the site (where each fact comes from, wording, what to update
on a release). `PRODUCT.md` describes who the site is for and `DESIGN.md` the visual system.

## Commands

```
npm ci
npm run dev          # local preview
npm run build        # static output in dist/; also type-checks blog frontmatter
npm run check:telex  # compare the typing core with the expected Telex results
```

There is no linter or unit-test runner.

## Pages

- `/`: home page with the typing demo and the edition chooser.
- `/cai-dat/` and `/cai-dat/nang-cao/`: install guide for the fcitx5 edition (`INSTALL_PAGES`).
- `/huong-dan/`: usage guide, one task per page (`GUIDE`).
- `/ngo-sen-cho-gnome/`: the IBus edition: overview, install, releases and its own usage guide
  (`GNOME_PAGES`, `GNOME_GUIDE`, `IBUS_RELEASES`).
- `/ban-phat-hanh/`: releases of the fcitx5 edition (`RELEASES`).
- `/roadmap/`: mirrors `ROADMAP.md` of the main repository (`ROADMAP`).
- `/go-khong-gach-chan/`: typing without preedit, in Vietnamese; `/en/typing-without-preedit/` is the
  English version.
- `/blog/` with an RSS feed at `/rss.xml`, and `/en/`, the one English overview page.

The names in brackets are exports of `src/data/site.ts`, which holds the site's data: releases, tested
distributions, the intro and scope note, the roadmap and the page lists. Most of it mirrors files in the
main repositories and has to change with them.

## Content

- Blog posts: Markdown files in `src/content/blog/`. Comments come from giscus, one GitHub Discussion
  per post in this repository, matched by URL path.
- Screenshots: `public/screenshots/`, light/dark pairs shown through `src/components/Shot.astro`.

## The typing demo

The home page composes Vietnamese with the Rust
[bamboo-core](https://github.com/bamboo-vi/bamboo-core) (MIT), the core every Ngó Sen package ships,
compiled to WebAssembly from `tools/telex-wasm/` with the settings the input method uses. The browser
fetches the WebAssembly file only when a visitor focuses the demo field; the scripted run plays from
precomputed steps. `src/lib/telex.js` calls into it from the page and the scripts below.

```
tools/telex-wasm/build.sh              # rebuild public/telex/telex.wasm (needs Rust and the wasm32-unknown-unknown target)
npm run check:telex
node tools/telex-wasm/demo-steps.mjs   # regenerate src/data/demo-steps.json
```

Keep the bamboo-core version in `tools/telex-wasm/Cargo.toml` in step with `bamboo-rs/Cargo.lock` in
the main repository.

## Other tools

```
tools/og/render.sh                     # render tools/og/card.html to public/og.png (needs Firefox)
node tools/review/capture.mjs <port> <outDir> <suffix>   # full-page screenshots for design review
```

After re-rendering `public/og.png`, bump the query in `OG_IMAGE` (`src/data/site.ts`) so link previews
fetch the new image. `capture.mjs` explains at the top how to start the preview server and a headless
Firefox first.

## Publishing

Every push to `main` builds and deploys the site through `.github/workflows/deploy.yml`, so merging
to `main` publishes it.

## Third-party files

`public/telex/telex.wasm` is built from bamboo-core (MIT); its license text is shipped next to it in
`public/telex/`. The fonts are Xanh Mono, Barlow and Barlow Condensed (SIL
Open Font License), self-hosted through Fontsource.

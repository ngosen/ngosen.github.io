# Ngó Sen website

Static Astro site for `ngosen.github.io`. Product context is in `PRODUCT.md`; the visual system is in
`DESIGN.md`. Read both before changing a page.

## Commands

Defined in `package.json`: `npm run dev`, `npm run build`, `npm run check:telex`. There is no linter
or unit-test runner; `npm run build` type-checks content frontmatter and fails on a broken page.

## Rules that are easy to break

- Every factual claim on the site comes from the main repository (`README.md`, `CHANGELOG.md`,
  `KHAC-GI-SO-VOI-BAN-GOC.md`, `packaging/release-notes.md` in `ngosen/ngosen`). Do not add numbers,
  tested systems or dates that are not there. "Builds" is not "works": keep the tested levels exact.
- `src/data/site.ts` mirrors the release notes of the main repository. Change them together.
- Page text is Vietnamese; code, comments and commit messages are English. `/en/` is the only English
  page.
- The site must not imply support, a team or a roadmap, and must say that the maintainer vibecodes
  the project.
- Internal names stay `lotus` (service `fcitx5-lotus-server`, config paths). Do not rename them in
  commands shown to users.
- `public/telex/telex.wasm` is a build output kept in the repository. Rebuild it with
  `tools/telex-wasm/build.sh`, then run `npm run check:telex` and
  `node tools/telex-wasm/demo-steps.mjs`.
- Ribbon red (`--ribbon`) is reserved for the install copy key, the caret, the "not fixed" mark,
  focus and selection, and the line under the current page's nav key. Tested levels are told apart
  by the stamp's outline, never by colour alone.
- Animate only `transform`, `opacity` and `box-shadow`, and keep the reduced-motion path working.

## Publishing

The site is deployed by hand-off only: do not create the Pages repository, push, or deploy without
the maintainer's explicit approval.

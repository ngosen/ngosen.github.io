# Ngó Sen website

Static Astro site for `ngosen.github.io`. Product context is in `PRODUCT.md`; the visual system is in
`DESIGN.md`. Read both before changing a page.

## Commands

Defined in `package.json`: `npm run dev`, `npm run build`, `npm run check:telex`. There is no linter
or unit-test runner; `npm run build` type-checks content frontmatter and fails on a broken page.

## Rules that are easy to break

- Every factual claim on the site comes from the main branch of the main repository (`README.md`,
  `CHANGELOG.md`, `TU-DUNG.md`, `install.sh`, `packaging/release-notes.md` in `ngosen/ngosen`). Do not
  add numbers, tested systems or dates that are not there. "Builds" is not "works": keep the tested levels exact.
- `src/data/site.ts` mirrors the release notes of the main repository. Change them together.
- Page text is Vietnamese; code, comments and commit messages are English. `/en/` is the only English
  page.
- The site must not imply support or a team, and must say that the maintainer vibecodes the project.
  The 1.0 roadmap from the README may be shown, always as a direction with no date and no promise.
- Internal names stay `lotus` (config paths such as `lotus*.conf`). Do not rename them in commands
  shown to users.
- Vietnamese page text keeps common technical terms in English: file, repo, script, test, build,
  source, release, changelog, roadmap, hash/SHA-256, distro, app, container. Translate lỗi, phiên
  bản, cài đặt, gỡ, cập nhật, thư mục, cấu hình, máy ảo, gói.
- `public/telex/telex.wasm` is a build output kept in the repository. Rebuild it with
  `tools/telex-wasm/build.sh`, then run `npm run check:telex` and
  `node tools/telex-wasm/demo-steps.mjs`.
- Ribbon red (`--ribbon`) is reserved for the install copy key, the caret, the "not fixed" mark,
  focus and selection, and the line under the current page's nav key. Tested levels are told apart
  by the stamp's outline, never by colour alone.
- Animate only `transform`, `opacity` and `box-shadow`, and keep the reduced-motion path working.

## Publishing

The site lives in `ngosen/ngosen.github.io`; every push to `main` builds and deploys it through
`.github/workflows/deploy.yml`. Pushing to `main` therefore publishes: do it only with the
maintainer's explicit approval, and only after the release the site describes is public.

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
- `src/data/site.ts` mirrors the release notes of the main repository. Change them together. On each
  release, add an entry at the top of `RELEASES` (user-visible changes only, picked from
  `CHANGELOG.md`); the home page shows the first entry and `/ban-phat-hanh/` lists them all.
- Page text is Vietnamese; code, comments and commit messages are English. `/en/` is the only English
  page.
- The site must not imply support or a team. The intro, highlights and roadmap mirror the top of the
  README; show the roadmap as a direction, without dates or promises. Do not mention vibecoding (dropped at the
  maintainer's request) or list fork lineage outside the footer credit and the comparison page.
- Internal names stay `lotus` (config paths such as `lotus*.conf`). Do not rename them in commands
  shown to users.
- Vietnamese page text keeps common technical terms in English: file, repo, script, test, build,
  source, release, changelog, roadmap, hash/SHA-256, distro, app, container, key names such as Backspace, and input-method terms: uinput server, preedit, surrounding text, commit, forward key. Translate lỗi, phiên
  bản, cài đặt, gỡ, cập nhật, thư mục, cấu hình, máy ảo, gói.
- `public/telex/telex.wasm` is a build output kept in the repository. Rebuild it with
  `tools/telex-wasm/build.sh`, then run `npm run check:telex` and
  `node tools/telex-wasm/demo-steps.mjs`.
- Ribbon red (`--ribbon`) is reserved for the install copy key, the caret, the "not fixed" mark,
  focus and selection, and the line under the current page's nav key. Tested levels are told apart
  by the stamp's outline, never by colour alone.
- Animate only `transform`, `opacity` and `box-shadow`, and keep the reduced-motion path working.

## Keeping up with the main repository

`RELEASING.md` in `ngosen/ngosen` lists what to update after each merged PR and each release; the
website is the last step of both lists. This section is the website side.

Two rules apply to every update:

- `/en/` follows the Vietnamese pages. When a page changes for a new release or a new README, change
  `src/pages/en.astro` in the same commit.
- Blog posts must not contradict the latest release. On each release, search `src/content/blog/` for
  version numbers and for wording such as "bản tiếp theo", "bản kế tiếp" or "bản hiện tại". Correct the
  text, or add an `outdated` note when the post describes an older state on purpose.

After a merged PR, before any release: change the site only when users can see the change or the
roadmap moved (the `progress` line in `ROADMAP`). Never present unreleased work as a new version.

When a version is released, in this order:

1. Start only after the release is public and marked Latest on GitHub.
2. Add an entry at the top of `RELEASES` in `src/data/site.ts`: user-visible changes only, picked from
   `CHANGELOG.md`. The version, date and download links on every page derive from that entry.
3. Update the tested levels in `DISTRIBUTIONS` from `packaging/release-notes.md`.
4. If the README changed, update the intro, highlights and roadmap (`TAGLINE`, `HIGHLIGHTS`,
   `ROADMAP`); clear a `progress` line the release has made obsolete.
5. Update `/en/` and the blog posts as described above.
6. Run `npm run build`, check the changed pages, then ask the maintainer for approval before pushing
   to `main`.

## Publishing

The site lives in `ngosen/ngosen.github.io`; every push to `main` builds and deploys it through
`.github/workflows/deploy.yml`. Pushing to `main` therefore publishes: do it only with the
maintainer's explicit approval, and only after the release the site describes is public.

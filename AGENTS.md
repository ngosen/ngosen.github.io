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
- Pull requests up to release 1.0.0-1 live in the archived fork `ngosen/ngosen-fork-archive`; the
  repository was recreated outside the old fork network and numbers its pull requests from #1
  again. Old entries carry `prRepo: ARCHIVE_REPO`; new release entries leave it out.
- Page text is Vietnamese; code, comments and commit messages are English. `/en/` is the only English
  page.
- The site must not imply support or a team. The intro, highlights and the fcitx5-only note (`SCOPE`) mirror
  the top of the README. Do not mention vibecoding (dropped at the maintainer's request).
- `/roadmap/` mirrors `ROADMAP.md` on `main` of the main repository through `ROADMAP` in
  `src/data/site.ts`; change them together. No dates; a version number only where the work has a
  GitHub milestone. Nothing else on the site promises future work or shows a date for it.
- fcitx5-lotus appears once, in the footer credit line. No comparison page, no "forked from" lines,
  no instructions aimed at fcitx5-lotus users. Old `lotus` file names stay only where a command needs them.
- Since 1.1.0 installed names are `ngosen` (`ngosen*.conf`, `fcitx5 --verbose ngosen=4`). Show `lotus`
  names only for versions before 1.1.0 and for moving off them.
- Vietnamese page text keeps common technical terms in English: file, repo, script, test, build,
  source, release, version, changelog, roadmap, hash/SHA-256, distro, app, container, key names such as Backspace, and input-method terms: uinput server, preedit, surrounding text, commit, forward key. Translate lỗi,
  cài đặt, gỡ, cập nhật, thư mục, cấu hình, máy ảo, gói.
- A release number is a "version" ("version 1.4.2", "version thử", "version sửa lỗi"), as in the main
  repository; "bản" stays where it means something else (bản gốc, bản snap, bản IBus, bản sửa, bản build).
- One name per concept across every page and post: "service" (not "dịch vụ"), "uinput server" (not
  "chương trình chạy ngầm"), "module" (not "mô-đun"), "compositor" (not an unexplained "WM"), "click"
  for the mouse and "bấm" for keys, "test" and "lỗi" (not "thử", "hỏng") when talking about checking
  apps, and upstream spellings such as Xwayland. The tested-level labels ("Đã thử tới đâu") stay as
  they are until the maintainer decides.
- Avoid machine-sounding Vietnamese: no explanatory analogies for technical readers, no empty "không
  phải X mà là Y" contrasts, no dramatic closing lines, no "Label: phrase" headings. The patterns and
  rewrites are listed in the `vietnamese-writing` skill (`references/ai-tells.md`).
- `public/telex/telex.wasm` is a build output kept in the repository. Rebuild it with
  `tools/telex-wasm/build.sh`, then run `npm run check:telex` and
  `node tools/telex-wasm/demo-steps.mjs`.
- Ribbon red (`--ribbon`) is reserved for the install copy key, the caret, the "not fixed" mark,
  focus and selection, and the line under the current page's nav key. Tested levels are told apart
  by the stamp's outline, never by colour alone.
- Animate only `transform`, `opacity` and `box-shadow`, and keep the reduced-motion path working.
- Blog comments come from giscus (`src/components/Comments.astro`): one GitHub Discussion per post in
  the Announcements category of `ngosen/ngosen.github.io`, matched by URL path. Renaming a post's slug
  starts a new, empty thread.
- `public/og.png` is the link preview image, rendered from `tools/og/card.html` by
  `tools/og/render.sh`. It shows the logo from `public/favicon.svg`, the name and `TAGLINE`; re-render
  it when either changes. Small previews (Facebook comments, chat apps) crop the centre 630×630
  square, so everything stays inside it, large enough to read as a thumbnail. After re-rendering, bump the query in `OG_IMAGE`
  (`src/data/site.ts`) so caches fetch the new image.
- The install guide is two pages, `/cai-dat/` (what most machines need) and `/cai-dat/nang-cao/`
  (manual download, preview builds, building from source, NixOS), listed in `INSTALL_PAGES`. A page
  with a `toc` gets the on-page index (`src/components/OnThisPage.astro`); keep its entries in step with
  the page's `h2`/`h3` ids. A section that moves between the two keeps its id and goes into the
  `moved` list at the end of `cai-dat.astro`, so old `/cai-dat/#…` links still land on it.

## Usage guide

`/huong-dan/` explains how to use Ngó Sen once it is installed, one task per page. It is Vietnamese
only. These rules add to the ones above:

- Sources: page, tab, button and option names are the Vietnamese strings the settings window shows,
  from `po/vi.po` and `settings-gui/` on `main` of `ngosen/ngosen`; the options are defined in
  `src/ngosen-config.h`. What an option does comes from `CHANGELOG.md` and `README.md`. Quote a UI
  string exactly, in “…”.
- Every step is carried out on a virtual machine with a released package before it is written. A step
  that was not tried stays out.
- Name a page after the task ("Gõ tắt một cụm từ hay dùng"), and give the path in the window as well,
  as a sentence: Vào “Cài đặt Ngó Sen › Gõ tắt & Từ điển › Gõ tắt”.
- Numbered steps, about five at most; one or two screenshots per page, light/dark pairs taken from the
  real window. Reusing a screenshot from another page is fine.
- Pages use `src/layouts/Guide.astro`, steps go in `<ol class="steps">`, and screenshots go through
  `src/components/Shot.astro` with a caption naming the system and the version shown. New screenshots
  are named `guide-*` in `public/screenshots/`.
- The pages and their order are listed in `GUIDE` (`src/data/site.ts`), grouped as on `/huong-dan/`;
  the previous/next keys at the end of each page follow that order.
- Leave out the hidden "Experiment" options, how fixes work inside, and internal measurements. An option
  the window marks as "(thử nghiệm)" is described as experimental.
- Typing comes first: turning Vietnamese on and off, input method, typing modes and emoji, then marks
  and spelling, then macros, then customising, then reporting a bug.

## Keeping up with the main repository

`RELEASING.md` in `ngosen/ngosen` lists what to update after each merged PR and each release; the
website is the last step of both lists. This section is the website side.

Two rules apply to every update:

- `/en/` follows the Vietnamese pages. When a page changes for a new release or a new README, change
  `src/pages/en.astro` in the same commit.
- Blog posts must not contradict the latest release. On each release, search `src/content/blog/` for
  version numbers and for wording such as "bản tiếp theo", "bản kế tiếp" or "bản hiện tại". Correct the
  text, or add an `outdated` note when the post describes an older state on purpose.
- When a post's content changes (new facts, a rewritten section, an `outdated` note), set `updatedDate`
  in its frontmatter; the sitemap and the post's structured data read it. Copy edits leave it alone.

After a merged PR, before any release: change the site only when users can see the change or the
README's scope changed (`SCOPE`). Never present unreleased work as a new version.

When a version is released, in this order:

1. Start only after the release is public and marked Latest on GitHub.
2. Add an entry at the top of `RELEASES` in `src/data/site.ts`: user-visible changes only, picked from
   `CHANGELOG.md`. The version, date and download links on every page derive from that entry.
3. Update the tested levels in `DISTRIBUTIONS` from `packaging/release-notes.md`.
4. If the README changed, update the intro, highlights and scope note (`TAGLINE`, `HIGHLIGHTS`,
   `SCOPE`).
5. Bring `ROADMAP` in line with `ROADMAP.md`: the released version leaves the roadmap.
6. Update `/en/` and the blog posts as described above. If the settings window changed (a renamed
   page, button or option, a new option), check the `/huong-dan/` pages that show it.
7. Run `npm run build`, check the changed pages, then ask the maintainer for approval before pushing
   to `main`.

## Publishing

The site lives in `ngosen/ngosen.github.io`; every push to `main` builds and deploys it through
`.github/workflows/deploy.yml`. Pushing to `main` therefore publishes: do it only with the
maintainer's explicit approval, and only after the release the site describes is public.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, static output, deployed to GitHub Pages at `ngosen.github.io` (the maintainer's choice).
A custom domain is undecided; nothing may assume one.

## Users

People who type Vietnamese on Linux desktops through fcitx5 and keep hitting broken input: letters
eaten, tone marks landing on the wrong word, text duplicated in chat apps and browser address bars.
Most are on KDE Plasma or GNOME, increasingly on Wayland. They arrive from a search, a forum thread
or the upstream project, usually mid-frustration, and want three answers fast: what is this, will it
work on my machine, how do I install it.

A second, smaller audience reads the blog: people who build or debug input methods and want to see
how a problem was measured and fixed.

## Product Purpose

Ngó Sen is a Vietnamese input method for fcitx5, forked from fcitx5-lotus 3.5.10. The website is its
public home: it explains what the project is, tells visitors honestly which systems it has been used
on, gets them installed with one command, and publishes write-ups of what was measured and changed.

Success for a visitor: they can tell within a screen whether Ngó Sen is for their setup, and if it
is, they have it installed and typing without opening the source repository.

## Positioning

- It is kept by one person who uses it every day on Fedora 44 KDE Plasma Wayland and CachyOS KDE
  Plasma Wayland. Other systems are labelled by how far they were actually tested, package by
  package.
- Changes are measured before they are merged: predictions are written down first, then checked.
- Since 0.5.0 there is no background server: the input method deletes old text with keys forwarded
  through fcitx5, or XTEST on X11, so nothing runs with special device permissions.
- Tagline, from the README: "Bộ gõ tiếng Việt tối ưu cho Linux." The site no longer mentions how the
  code is written (the maintainer asked to drop the vibecode wording on 2026-10-08).

## Operating Context

- Install is one line: `curl -fsSL https://raw.githubusercontent.com/ngosen/ngosen/main/install.sh | bash`.
  It picks a prebuilt package from the latest GitHub release for Fedora 43/44, Ubuntu 22.04/24.04/26.04,
  Debian 12/13, Arch, CachyOS and openSUSE Tumbleweed (x86_64), verifies its checksum and asks before
  installing. Packages for Fedora, Arch, openSUSE and Ubuntu 24.04+ use the Rust composition core;
  Debian 12/13 and Ubuntu 22.04 keep the Go core. Building from source is the fallback for everything else.
- After install the user restarts fcitx5, adds "Ngó Sen" in Fcitx5 Configuration, and on KDE Wayland
  selects "Fcitx 5" under Virtual Keyboard. On Ubuntu 26.04 they also enable a bundled GNOME
  extension once.
- Typing modes are Gõ Sen (default) and Preedit, plus Emoji. Telex is used and checked daily; VNI
  works but is not checked closely.
- Source, releases and the changelog live at `github.com/ngosen/ngosen`. Issues are open for bug
  reports.

## Capabilities and Constraints

- Internal names stay `lotus` (config paths, gettext domain), so the
  package cannot be installed alongside fcitx5-lotus; installing Ngó Sen replaces it.
- The site must not imply a support channel or a team; bug reports go to Issues. The README's roadmap
  may appear, as a direction with no date.
- Primary language is Vietnamese. One short English page or section is enough.
- Blog posts come from the maintainer's private notes; each is a real account of something measured
  or fixed. The first three are to be chosen with the maintainer.
- Undecided: custom domain; a pictorial logo.
- Versions: Ngó Sen numbers its own releases from 0.5.0 (package `1:0.5.0-1`; the epoch keeps it newer
  than `3.5.10-4`). Tags are `ngosen-<version>`.

## Brand Commitments

- Name: **Ngó Sen** (lotus stem), always with diacritics. Package name `fcitx5-ngosen`, organisation
  `ngosen`.
- No pictorial logo yet. The mark is the two words "Ngó Sen" set in type.
- Voice: plain, first person where the maintainer speaks, specific about what was and was not tested.
  No hype, no claims of being the best or fastest.
- Credit: based on fcitx5-lotus, which descends from VMK; upstream authors are named.

## Evidence on Hand

- `README.md`, `CHANGELOG.md` and `packaging/release-notes.md` in `ngosen/ngosen`: what differs from
  upstream, what was tested where. `KHAC-GI-SO-VOI-BAN-GOC.md` and its measurements were removed from
  the repository in #42, so the site no longer quotes them.
- Package test results per distribution (pull requests #19, #23, #24, #26 in `ngosen/ngosen`).
- Private notes with measured investigations, source material for blog posts.

Absent, and not to be fabricated: screenshots or recordings of the input method in use, user counts,
testimonials, benchmarks against other input methods, a logo.

## Product Principles

1. Say exactly how far something was tested; "builds" is not "works".
2. The shortest path from landing to typing wins over everything else on the home page.
3. Show the work: a claim on the site should point at a measurement, a test or a change.
4. Vietnamese text is the product; the site must render diacritics flawlessly at every size.
5. One person keeps this. Nothing on the site may create an obligation he cannot meet.

## Accessibility & Inclusion

Vietnamese diacritics must stay legible in every typeface and weight used, including stacked marks
(ế, ỗ, ặ). Commands must be copyable as text and readable without a wide screen.

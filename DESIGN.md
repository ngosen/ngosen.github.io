---
name: Ngó Sen
description: A keyboard at work. Enamel machine body, ivory keycaps, typed paper sheets, one red ribbon.
colors:
  enamel: "#1c6b5f"
  enamel-deep: "#134b43"
  on-enamel: "#f0f5ee"
  on-enamel-muted: "#d3e8df"
  cap: "#f1ead9"
  cap-skirt: "#c5bba3"
  cap-ink: "#15191a"
  paper: "#fbfbf8"
  paper-edge: "#dfe3dc"
  desk: "#dfe9e3"
  ink: "#15191a"
  ink-muted: "#48524f"
  ribbon: "#c2301c"
  ribbon-text: "#b02a18"
  on-ribbon: "#ffffff"
  strip: "#15191a"
  on-strip: "#f1ead9"
  on-strip-muted: "#b9c2bc"
  enamel-dark: "#145247"
  enamel-deep-dark: "#0d3832"
  on-enamel-muted-dark: "#c5ddd3"
  cap-dark: "#e9e2d0"
  cap-skirt-dark: "#b0a68e"
  paper-dark: "#222927"
  paper-edge-dark: "#38423f"
  desk-dark: "#0c1715"
  ink-dark: "#ebe8de"
  ink-muted-dark: "#aab6b1"
  ribbon-dark: "#d0432c"
  ribbon-text-dark: "#f08571"
  strip-dark: "#0a0d0d"
typography:
  wordmark:
    fontFamily: "'Xanh Mono', 'DejaVu Sans Mono', ui-monospace, monospace"
    fontSize: "clamp(3.4rem, 2rem + 6.5vw, 6rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  display:
    fontFamily: "'Xanh Mono', 'DejaVu Sans Mono', ui-monospace, monospace"
    fontSize: "clamp(2.1rem, 1.4rem + 3.2vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "'Xanh Mono', 'DejaVu Sans Mono', ui-monospace, monospace"
    fontSize: "2.3rem"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "'Xanh Mono', 'DejaVu Sans Mono', ui-monospace, monospace"
    fontSize: "1.7rem"
    fontWeight: 400
    lineHeight: 1.2
  typed:
    fontFamily: "'Xanh Mono', 'DejaVu Sans Mono', ui-monospace, monospace"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.4
  typed-output:
    fontFamily: "'Xanh Mono', 'DejaVu Sans Mono', ui-monospace, monospace"
    fontSize: "clamp(1.7rem, 1.1rem + 2.6vw, 2.9rem)"
    fontWeight: 400
    lineHeight: 1.35
  code:
    fontFamily: "'Xanh Mono', 'DejaVu Sans Mono', ui-monospace, monospace"
    fontSize: "0.95em"
    fontWeight: 400
    lineHeight: 1.55
  lede:
    fontFamily: "'Barlow', system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "'Barlow', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  small:
    fontFamily: "'Barlow', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.04em"
  stamp:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.06em"
rounded:
  sheet: "2px"
  block: "3px"
  kbd: "0.25em"
  key: "0.4em"
spacing:
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  flow: "1.1rem"
  sheet-pad: "clamp(1.5rem, 4.5vw, 3.25rem)"
  band: "clamp(3rem, 8vw, 6rem)"
  section: "clamp(3.5rem, 9vw, 7rem)"
components:
  key:
    backgroundColor: "{colors.cap}"
    textColor: "{colors.cap-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.key}"
    padding: "0.3em 0.75em 0.25em"
  key-ribbon:
    backgroundColor: "{colors.ribbon}"
    textColor: "{colors.on-ribbon}"
    typography: "{typography.label}"
    rounded: "{rounded.key}"
    padding: "0.3em 1.1em 0.25em"
  stamp:
    textColor: "{colors.ink}"
    typography: "{typography.stamp}"
    rounded: "{rounded.block}"
    padding: "0.12em 0.6em 0.08em"
  sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "{spacing.sheet-pad}"
  command-strip:
    backgroundColor: "{colors.strip}"
    textColor: "{colors.on-strip}"
    typography: "{typography.code}"
    padding: "1.1rem {spacing.gutter} 1.3rem"
  code-block:
    backgroundColor: "{colors.strip}"
    textColor: "{colors.on-strip}"
    typography: "{typography.code}"
    rounded: "{rounded.block}"
    padding: "0.9rem 1.1rem"
  inline-code:
    backgroundColor: "{colors.desk}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.sheet}"
    padding: "0.08em 0.3em"
  typed-field:
    textColor: "{colors.ink}"
    typography: "{typography.typed}"
    rounded: "0"
    padding: "0.35rem 0.1rem"
    height: "2.75rem"
---

# Design System: Ngó Sen

## Overview

**Creative North Star: "A keyboard at work"**

The site is a machine you can watch typing. An enamel green body carries the keys, ivory keycaps go
down when pressed, and whatever was typed or measured comes out on a sheet of paper. Before any claim
is made, keystrokes turn into Vietnamese in front of the visitor. The palette is the machine's own
materials: enamel, ivory caps, paper, carbon ink, and one red ribbon.

Every surface is one of three grounds, and the ground says what kind of content it holds. The enamel
band carries the machine (the header, the hero, the Telex keyboard). Paper sheets carry anything typed
or measured (the wordmark, the demo line, tested systems, measured results, guides, posts). The ink
strip carries commands and the footer. Between them is the desk, a pale green-grey the sheets rest on.

Density is unhurried on the home page and plain on read pages: the install guide, the comparison page
and blog posts are a single sheet on the desk with one text column. Both colour schemes are authored;
the dark one follows the system setting and keeps the same materials, with paper lifted clear of the
desk so a sheet still reads as a sheet.

Motion is one authored moment: the typing run in the hero. Everything else is a short press.

**Key Characteristics:**
- Three grounds with fixed jobs: enamel for the machine, paper for typed or measured content, ink for commands.
- Keycaps are the only button shape, and they move the way a key does.
- Ribbon red is reserved for a short, fixed list of marks.
- Tested levels are told apart by outline form, never by colour.
- Three typefaces with fixed voices: typed, legend, body.
- Commands wrap; nothing a visitor must copy scrolls sideways.

## Colors

The palette is the materials of a typewriter: a deep enamel green, warm ivory, near-white paper,
carbon ink, and a single saturated red.

### Primary
- **Enamel Green** (`enamel`, `enamel-dark`): the machine body. Fills the header, the hero and the
  Telex keyboard band, and is the browser theme colour. Text on it is `on-enamel`; secondary text is
  `on-enamel-muted`.
- **Deep Enamel** (`enamel-deep`): the roller the hero sheet feeds out of. A shadowed part of the same
  body, not a second surface colour.

### Secondary
- **Ribbon Red** (`ribbon`, `ribbon-dark`): fills. The install copy key, the caret on the typed line,
  the text selection, the line under the current page's nav key.
- **Ribbon Red, text weight** (`ribbon-text`, `ribbon-text-dark`): the same red tuned to read as text
  or a thin line on paper and desk. The "Chưa sửa" struck mark and the focus ring. `on-ribbon` is the
  white legend on a ribbon key.

### Tertiary
- **Keycap Ivory** (`cap`) on **Keycap Skirt** (`cap-skirt`): the top and the visible side of every
  key. Legends are `cap-ink`, which stays dark in both schemes because the cap stays light. Ivory is
  also the text colour on the ink strip (`on-strip`).

### Neutral
- **Paper** (`paper`): the sheet. Near-white in light, a lifted charcoal green (`paper-dark`) in dark.
- **Paper Edge** (`paper-edge`): hairlines on paper: the sheet's one-pixel edge, table rules, dividers.
- **Desk** (`desk`): the page background the sheets rest on; also the chip behind inline code on paper.
- **Carbon Ink** (`ink`): text on paper and desk. **Muted Ink** (`ink-muted`): sources, dates,
  captions, placeholder text.
- **Ink Strip** (`strip`): the ground for commands, code blocks and the footer, with `on-strip` and
  `on-strip-muted` text.

### Named Rules
**The Ribbon Rule.** Ribbon red marks the install copy key, the caret, the "Chưa sửa" struck mark,
focus and selection, and the line under the current page's nav key. Nothing else. No red headings,
links, badges or decoration.

**The Three Grounds Rule.** Enamel carries the machine, paper carries what was typed or measured, the
ink strip carries commands and the footer. New content picks its ground by what it is, not by which
colour the page is short of.

**The Ground Decides Focus Rule.** The focus ring is a 2px outline at 3px offset in `ribbon-text` on
paper and desk. On enamel it switches to `on-enamel` and on the ink strip to `on-strip`, because red
on enamel green has almost no contrast.

## Typography

**Display Font:** Xanh Mono (with DejaVu Sans Mono, ui-monospace, monospace)
**Body Font:** Barlow (with system-ui, sans-serif)
**Label Font:** Barlow Condensed (with Arial Narrow, sans-serif)

**Character:** Xanh Mono is the typed voice, a high-contrast typewriter face drawn for Vietnamese: the
wordmark, headings, anything typed or measured, and code. Barlow Condensed is the legend voice, the
lettering stamped on keys and rubber stamps. Barlow carries running text. All three are self-hosted
through Fontsource; Xanh Mono ships in regular and italic only, Barlow in 400 and 600, Barlow
Condensed in 500 and 600.

### Hierarchy
- **Wordmark** (400, `clamp(3.4rem, 2rem + 6.5vw, 6rem)`, line-height 1): "Ngó Sen" on the hero sheet.
  In the header of every other page the same setting runs at 1.7rem.
- **Display** (400, `clamp(2.1rem, 1.4rem + 3.2vw, 3.6rem)`, line-height 1.1): the title of a read page.
- **Headline** (400, 2.3rem, line-height 1.2): section headings on the home page.
- **Title** (400, 1.7rem, line-height 1.2): headings inside a guide or post, and post titles in lists.
- **Typed** (400, 1.3rem, line-height 1.4): measured claims, system names in the tested table, third-level
  headings in prose. The demo's output line is the same voice at `clamp(1.7rem, 1.1rem + 2.6vw, 2.9rem)`.
- **Lede** (Barlow 400, 1.3rem, line-height 1.45 to 1.5): the one sentence under a title.
- **Body** (Barlow 400, 1.0625rem, line-height 1.65): running text, capped at 68ch. Emphasis is weight 600.
- **Small** (Barlow 400, 0.875rem, line-height 1.45 to 1.55): sources, bases and notes, in muted ink.
- **Label** (Barlow Condensed 600, 0.95rem to 1.1rem, letter-spacing 0.04em to 0.06em, uppercase):
  keycap legends, stamps, table column heads, dates (weight 500, tabular figures), "all posts" links.
- **Code** (Xanh Mono 400, 0.95em, line-height 1.55): commands and inline code.

### Named Rules
**The Closed Word Space Rule.** A monospace word space is a full cell, and at heading sizes it reads as
a gap. Xanh Mono headings set `word-spacing: -0.2em`; the wordmark sets `-0.28em`. A heading that
switches to the legend font resets word-spacing to normal.

**The Typed or Measured Rule.** Xanh Mono is for what the machine produced or what was measured:
names, numbers, results, commands, headings. Explanations and notes around them are Barlow.

**The Marks Stay Whole Rule.** Vietnamese stacked marks (ế, ỗ, ặ) must stay legible at every size
used. Lines of large typed text keep room above and below the line box rather than clipping.

## Layout

The page is a column of full-width bands. Each band holds a centred container 78rem wide with a fluid
gutter (`clamp(1rem, 4vw, 2.5rem)`). The body is a flex column so the footer strip sits at the bottom
of a short page.

Read pages are one sheet on the desk: a single paper sheet 60rem wide holding a title block closed by
a 1px ink rule and one text column capped at 68ch, with 1.1rem between blocks and 2.8rem above a
second-level heading. The blog index is a stack of sheets, each stepped further right in a cycle of
three, the way pages fan out of a pile.

The home page alternates grounds: enamel hero with the ink install strip closing it, desk with a paper
table, enamel Telex band, desk with two overlapping sheets, a second full-width install strip, then
open desk for the post list. Vertical rhythm between sections is `clamp(3.5rem, 9vw, 7rem)`; enamel
bands pad `clamp(3rem, 8vw, 6rem)`.

Sheets may overlap and turn slightly where one is a note left on another (the "Chưa sửa" sheet lies on
the report at 1.2 degrees, from 62rem up). Body text never rotates below that width.

Responsive behaviour is structural:
- **Below 30rem:** nav keys shrink and tighten so all five fit in two rows.
- **Below 40rem:** the hero's demo keys sit on a 12-column grid with the pause/replay key placed in the
  grid's second row; the install guide's table drops its header row and stacks each system as a block.
- **From 44rem:** three-column groups (Telex notes, post-install steps); post lists gain a date column.
- **From 62rem:** two columns in the hero (sheet 3 : tested list 2) and in the tested and measured
  sections; the tested section's intro stays in view while the table scrolls.

Interactive controls keep a minimum height of 2.75rem where their shape would otherwise be shorter.

## Elevation & Depth

Depth is physical and shallow: things rest on other things. Paper lies on the desk or rises out of the
machine, keys stand on the body, and nothing floats. Shadows are soft, pulled in with a negative spread
so they read as contact shadows under an edge, never as a glow around a box.

### Shadow Vocabulary
- **Key at rest** (`box-shadow: 0 0.45em 0.6em -0.3em rgb(0 0 0 / 0.45)`): under every live keycap,
  together with the 0.3em skirt.
- **Key pressed** (`box-shadow: 0 0.12em 0.25em -0.12em rgb(0 0 0 / 0.45)`): with the key moved down
  0.22em.
- **Sheet on desk** (`box-shadow: 0 0 0 1px var(--paper-edge), 0 1.4rem 2rem -1.4rem rgb(0 0 0 / 0.35)`):
  a hairline edge plus a shadow under the bottom edge only.
- **Sheet in the machine** (`box-shadow: 0 1.2rem 2rem -1.2rem rgb(0 0 0 / 0.55)`): the hero sheet on
  enamel, darker and without the hairline.
- **Roller** (`box-shadow: inset 0 0.2rem 0.2rem -0.1rem rgb(255 255 255 / 0.16), 0 0.5rem 0.8rem -0.5rem rgb(0 0 0 / 0.6)`):
  the hero's roller only.

### Named Rules
**The Skirt Rule.** A key's height is its skirt: a 0.3em bottom edge in the skirt colour. Pressing
moves the cap down and shortens the shadow. Hover is a 0.08em dip, active is 0.22em, both over 120ms.
Keys that are legends rather than controls (dimmed Telex keys) carry no shadow.

**The Sheets Stay Sheets Rule.** In the dark scheme paper is lifted well above the desk so the sheet
edge is visible without relying on the shadow.

## Shapes

Two families of form. Paper and ink blocks are nearly square: sheets at 2px, stamps and code blocks at
3px. Keys are soft: 0.4em corners that scale with the legend, with the smaller inline key in running
text at 0.25em. The roller is the only pill.

Lines are hairlines: 1px paper-edge rules between table rows, a 1px ink rule under a page title and
over a post list. The typing field is a 2px ink underline with no box. Stamps use a 2px outline in the
text colour.

## Components

### Keycap
The only button shape in the system; it also serves as navigation, step numbers and the keyboard
diagrams.
- **Shape:** soft corners (0.4em), ivory top, 0.3em skirt along the bottom edge, minimum width 2.4em.
- **Legend:** Barlow Condensed 600, uppercase, letter-spacing 0.04em, dark on ivory.
- **Hover / Active:** dips 0.08em on hover, 0.22em with the short shadow on press, 120ms ease-out
  (`cubic-bezier(0.16, 1, 0.3, 1)`). Only links and buttons respond; keys used as diagram or step
  number keep the default cursor.
- **Ribbon key:** red top with white legend and a darker red skirt. One per command strip: the copy
  key. Its legend changes to "copied" for two seconds; if the clipboard is refused the command is
  selected and a line says so.
- **Focus:** outline in the ground's focus colour (see The Ground Decides Focus Rule).

### Stamp
The tested level of a system. Legend type in a 2px outline in the current text colour, so it works on
paper, desk and enamel alike.
- **Double box:** used every day. An inner ring drawn inside the outline, with the ground colour
  between the two rings.
- **Single box:** used a little on a real machine.
- **Dashed box:** installed in a container only. Weight 500.
- **Brackets:** only built. Side strokes only, square corners, weight 500.
- **Rule:** the form is the level. Every stamp sits next to the basis for its claim, in small muted text.

### Struck mark
"Chưa sửa": a stamp-shaped box in ribbon red, turned 2 degrees, heading the sheet of things not fixed.
One use; it is the only red text on the site.

### Sheet
- **Corner Style:** 2px.
- **Background:** paper, ink text.
- **Shadow Strategy:** hairline edge plus contact shadow (see Elevation).
- **Border:** none beyond the hairline edge; internal dividers are 1px paper-edge.
- **Internal Padding:** fluid, from `clamp(1.25rem, 3.5vw, 2rem)` on a small note to
  `clamp(1.5rem, 6vw, 4.5rem)` on a read page.

### Command strip
An ink band holding the install command and the ribbon copy key. The command is Xanh Mono with a muted
`$ ` in front, focusable, and wraps anywhere. Full-width on the home page; inside a read page it
becomes an inset block with 3px corners in the text column.

### Code block
Ink ground, ivory text, 3px corners, 0.9rem by 1.1rem padding, focusable. Long lines wrap
(`pre-wrap`, break anywhere). Inline code on paper is a desk-coloured chip; on the desk it is a
paper-coloured chip.

### Table
Collapsed, 1px paper-edge row rules, tabular figures, top-aligned cells. Column heads are legend type;
row heads are body or typed. On narrow screens rows restack as blocks and the header row is hidden
visually but kept for assistive technology.

### Typing field
A text input with no box: a 2px ink underline, Xanh Mono at 1.3rem, placeholder in muted ink, at least
2.75rem tall. On focus the underline turns ribbon red and doubles. Its label is legend type.

### Navigation
A row of ivory keycaps on the enamel header, wrapping as needed, with the wordmark at the left on every
page except the home page, where the hero sheet carries it. The current page's key stays pressed and
shows a ribbon line along its bottom edge. The footer is the ink strip: provenance in ivory, a note in
muted text, and a row of legend-type links.

### The typing run
The hero's signature. A row of keycaps shows the keys of a phrase; each goes down in turn (220ms per
key) while the composed Vietnamese appears on the sheet's single typed line, followed by a red caret.
Keys already used fade to 62%. It runs three phrases once, holding 2 seconds between them, and stops
on the last. A keycap toggle pauses or replays it. Under reduced motion nothing plays: the first
phrase is shown fully typed and the toggle offers to run it. When the visitor types in the field, the
run stops and the same row shows their last sixteen keys. The typed line never wraps; it keeps its end
in view.

### Telex keyboard
Three staggered rows of keycaps on the enamel band. Keys that add a mark show it bottom-right in mixed
case; plain letter keys are dimmed to 60% with no shadow. It is a diagram, exposed to assistive
technology as one labelled image.

## Do's and Don'ts

### Do:
- **Do** choose the ground by content: enamel for the machine, paper for typed or measured content, the ink strip for commands and the footer.
- **Do** make every button a keycap with a skirt, and let it move down when pressed (0.08em hover, 0.22em active, 120ms).
- **Do** set Xanh Mono headings with `word-spacing: -0.2em` and the wordmark with `-0.28em`; reset it when a heading uses the legend font.
- **Do** tell tested levels apart by stamp form (double box, single box, dashed box, brackets) and put the basis for the claim next to the stamp.
- **Do** let commands and code wrap, and give the install command a ribbon copy key wherever it appears.
- **Do** switch the focus ring to the light text colour on enamel and on the ink strip.
- **Do** keep stacked Vietnamese marks whole: leave room above and below large typed lines.
- **Do** author both colour schemes, with dark paper lifted clear of the dark desk.
- **Do** keep transitions to transform, opacity and box-shadow, between 120ms and 240ms, and keep the reduced-motion path working.

### Don't:
- **Don't** use ribbon red for anything outside the Ribbon Rule's list: no red headings, links, badges or decoration.
- **Don't** carry a tested level, or any other state, by colour alone.
- **Don't** loop the typing run or add a second authored animation; the run plays once and stops.
- **Don't** make a command scroll sideways on a narrow screen.
- **Don't** set running text in Xanh Mono or body paragraphs in the legend font.
- **Don't** set Xanh Mono in bold; only regular and italic exist.
- **Don't** draw a pictorial logo. The mark is the two words "Ngó Sen" set in Xanh Mono, always with diacritics.
- **Don't** float surfaces with wide ambient shadows or glows; shadows are contact shadows under an edge.

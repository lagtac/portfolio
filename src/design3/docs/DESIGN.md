---
name: Dimitris Chrysomallis — portfolio
description: 'A conventional developer portfolio: type-led, evidence-forward, one accent.'
colors:
  signal-blue: '#1d46d6'
  signal-blue-dark: '#93a8ff'
  accent-contrast: '#ffffff'
  accent-contrast-dark: '#0c0d10'
  paper: '#fafaf7'
  paper-dark: '#0c0d10'
  surface: '#f1f1ec'
  surface-dark: '#14161b'
  sunken: '#e7e7e0'
  sunken-dark: '#1b1e24'
  ink: '#16181d'
  ink-dark: '#f0efe9'
  ink-secondary: '#4f545c'
  ink-secondary-dark: '#b7bac1'
  ink-muted: '#676d76'
  ink-muted-dark: '#969ba4'
  rule: '#dedfd8'
  rule-dark: '#282b32'
  rule-strong: '#c5c7bf'
  rule-strong-dark: '#3b3f48'
  field-green: '#0f6b43'
  field-green-dark: '#62d7a1'
  caution-ochre: '#85560f'
  caution-ochre-dark: '#f0b45f'
  fault-red: '#9f211c'
  fault-red-dark: '#ff9086'
  good-soft: '#e2f1e8'
  good-soft-dark: '#0f241a'
  warn-soft: '#f7eeda'
  warn-soft-dark: '#2a1f0d'
  bad-soft: '#fae5e3'
  bad-soft-dark: '#2b1412'
  neutral-soft: '#ecece6'
  neutral-soft-dark: '#1d2027'
typography:
  display:
    fontFamily: Archivo, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: clamp(2.85rem, 5.9vw, 4.2rem)
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: -0.048em
  page-title:
    fontFamily: Archivo, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: clamp(2.8rem, 6.4vw, 5.4rem)
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: -0.05em
  headline:
    fontFamily: Archivo, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: clamp(1.85rem, 3.5vw, 2.75rem)
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: -0.03em
  title:
    fontFamily: Archivo, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: clamp(1.25rem, 1.9vw, 1.5rem)
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: -0.02em
  lead:
    fontFamily: Archivo, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: clamp(1.1rem, 1.5vw, 1.3rem)
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.01em
  body:
    fontFamily: Archivo, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0em
  label:
    fontFamily: Azeret Mono, ui-monospace, SFMono-Regular, Menlo, monospace
    fontSize: 0.6875rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.13em
  greek:
    fontFamily: Noto Sans, Archivo, sans-serif
    fontSize: 1em
    fontWeight: 400
rounded:
  sm: 2px
spacing:
  s1: 4px
  s2: 8px
  s3: 12px
  s4: 16px
  s5: 24px
  s6: 32px
  s7: 48px
  s8: 64px
  s9: 96px
  s10: 128px
  section: clamp(4rem, 9vw, 8rem)
components:
  button-primary:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    rounded: '{rounded.sm}'
    padding: 0.7rem 1.1rem
    height: 2.75rem
    typography: '{typography.body}'
  button-primary-hover:
    backgroundColor: '{colors.signal-blue}'
    textColor: '{colors.accent-contrast}'
    rounded: '{rounded.sm}'
  button-default:
    backgroundColor: transparent
    textColor: '{colors.ink}'
    rounded: '{rounded.sm}'
    padding: 0.7rem 1.1rem
    height: 2.75rem
  button-ghost:
    backgroundColor: transparent
    textColor: '{colors.ink}'
    rounded: '{rounded.sm}'
    padding: 0.7rem 1.1rem
    height: 2.75rem
  tag:
    backgroundColor: transparent
    textColor: '{colors.ink-secondary}'
    rounded: '{rounded.sm}'
    padding: 0.25rem 0.45rem
    typography: '{typography.label}'
  badge-good:
    backgroundColor: '{colors.good-soft}'
    textColor: '{colors.field-green}'
    rounded: '{rounded.sm}'
    padding: 0.2rem 0.45rem
    typography: '{typography.label}'
  badge-warn:
    backgroundColor: '{colors.warn-soft}'
    textColor: '{colors.caution-ochre}'
    rounded: '{rounded.sm}'
    padding: 0.2rem 0.45rem
    typography: '{typography.label}'
  badge-bad:
    backgroundColor: '{colors.bad-soft}'
    textColor: '{colors.fault-red}'
    rounded: '{rounded.sm}'
    padding: 0.2rem 0.45rem
    typography: '{typography.label}'
  nav-link:
    backgroundColor: transparent
    textColor: '{colors.ink-secondary}'
    rounded: '{rounded.sm}'
    padding: 0.45rem 0.6rem

---

# Design System: Dimitris Chrysomallis — portfolio

## Overview

**Creative North Star: "The Plain Record"**

The portfolio is a working record, read in under a minute by someone filling a
fullstack role. It is type-led, evidence-forward, and deliberately unremarkable
in its genre: a name, a claim, two projects, the numbers, the failures, and a way
to make contact. The craft is in the hierarchy and the facts, not in a governing
metaphor.

The page behaves like a well-set document that happens to be a website. A real
product screenshot is evidence, not decoration. A metric sits next to its run ID
and its date. A failure is written at the same weight as a win. The single accent
marks the active and the linked; everything else is ink, paper, and a hairline.

This world refuses two neighbours: the technical-dossier costume (cream paper,
display serif, vermilion annotation marks) and the dark specimen frame (near-black
field, acid lime, corner ticks). It also refuses the current SaaS hero: a tracked
uppercase eyebrow chip above a giant headline, gradient blobs, glass, and a card
grid with fake logos. Convention is the commitment; the execution has to earn it.

**Key Characteristics:**

- A strong grotesque hierarchy, with mono reserved for evidence.
- Two themes, one signal. Light is the default; dark mirrors every role.
- Flat surfaces, 1px rules, 2px corners. No shadows, no glass, no gradients.
- Real product screenshots, cropped to remove identifiers.
- Copy that carries a number, a date, or a named failure.

## Colors

The palette is a paper-and-ink neutral field with one blue signal. Green, ochre,
and red exist only as data states, and every state also carries a word.

### Primary

- **Signal Blue** (#1d46d6 / #93a8ff in dark): Links, active navigation, figure
  numbers, the left rule on a note, the small rule before an eyebrow, and the
  focus ring. It is the only saturated colour on a normal page.
- **Accent Contrast** (#ffffff / #0c0d10): Text on a Signal Blue fill. In dark,
  the signal is lighter and the contrast ink is near-black.

### Neutral

- **Paper** (#fafaf7 / #0c0d10): Page ground.
- **Surface** (#f1f1ec / #14161b): Raised panels, table wells, the Now block.
- **Sunken** (#e7e7e0 / #1b1e24): Table heads and inset bands.
- **Graphite Ink** (#16181d / #f0efe9): Body and display.
- **Ink Secondary** (#4f545c / #b7bac1): Standfirsts, secondary copy, meta.
- **Ink Muted** (#676d76 / #969ba4): Captions, labels, footer.
- **Rule Grey** (#dedfd8 / #282b32): Hairlines.
- **Rule Strong** (#c5c7bf / #3b3f48): Figure frames, control borders.

### Data States

- **Field Green** (#0f6b43 / #62d7a1) on **Good Soft** (#e2f1e8 / #0f241a):
  Correct verdicts, high confidence, a healthy state.
- **Caution Ochre** (#85560f / #f0b45f) on **Warn Soft** (#f7eeda / #2a1f0d):
  Medium confidence, partial results.
- **Fault Red** (#9f211c / #ff9086) on **Bad Soft** (#fae5e3 / #2b1412): Wrong
  verdicts, removed features.
- **Neutral Soft** (#ecece6 / #1d2027): Abstentions and low tiers.

### Named Rules

**The One Signal Rule.** Signal Blue marks the active, the linked, and the
measured. It never fills a decorative block, and it never becomes a second brand
colour. Data states are the only other hue, and they always pair with a word.

**The Named State Rule.** A badge is never colour-only. “Correct”, “Wrong”, “No
diagnosis”, “High”, “Medium”, and “Low” are part of the component, not an
accessible-name afterthought.

## Typography

**Display Font:** Archivo (with system-ui, Segoe UI, sans-serif)
**Body Font:** Archivo (same stack)
**Label/Mono Font:** Azeret Mono (with ui-monospace, SFMono-Regular, Menlo)
**Greek Font:** Noto Sans (with Archivo)

**Character:** A working grotesque carries the argument; a slightly wide mono
carries the evidence. Archivo is set tight at display sizes and plain at body
sizes. Azeret Mono is used for numbers, dates, run IDs, labels, tags, and table
heads, not for prose. Greek disease names are data and switch to Noto Sans under
`lang="el"`.

### Hierarchy

- **Display** (600, clamp(2.85rem, 5.9vw, 4.2rem), 0.94): The home hero only.
- **Page Title** (600, clamp(2.8rem, 6.4vw, 5.4rem), 1.06): Case-study, About,
  and Design system page titles.
- **Headline** (600, clamp(1.85rem, 3.5vw, 2.75rem), 1.06): Section titles,
  case-study sections.
- **Title** (600, clamp(1.25rem, 1.9vw, 1.5rem), 1.18): Work items, card titles,
  service names.
- **Lead** (400, clamp(1.1rem, 1.5vw, 1.3rem), 1.5): The standfirst under a page
  title.
- **Body** (400, 1.0625rem, 1.65, max 68ch): Prose. The measure is capped.
- **Label** (500, 0.6875rem, 1.2, +0.13em, uppercase): Mono labels, table heads,
  figure numbers, tags.

### Named Rules

**The Evidence Is Monospaced Rule.** A number, date, run ID, commit count, file
name, or verdict label is set in Azeret Mono. Prose is set in Archivo. Mixing the
two is a hierarchy decision, not a decoration.

**The Greek Is Data Rule.** Every Greek disease name carries `lang="el"` and the
Noto Sans face. It is not a stylistic accent, and it never falls back silently.

## Layout

A 1200px page inside a fluid gutter (`clamp(1.25rem, 5vw, 3rem)`), a 4px spacing
base, and a section rhythm of `clamp(4rem, 9vw, 8rem)`. The home page is a single
column of bands: hero, proof strip, work list, method, Now, contact. The case
study is a 10.5rem sticky rail plus a reading column; the rail collapses to a
horizontal scroller below 960px. Work items are a three-column row at desktop and
a single column below 720px. The case table becomes a card list below 960px, so
there is never a horizontal scroll.

The hero is a two-column split at desktop (copy and a real screenshot in a browser
frame) and a single column below 960px. The first viewport is claim, evidence, and
action; the screenshot is proof, not wallpaper.

## Elevation & Depth

Flat by default. There are no box shadows, no blur, no glass, and no gradient
decoration. Depth comes from three paper values and one hairline: a surface sits
on paper, a sunken band sits inside a surface, and a 1px rule separates them. The
only lift is the sticky header, which is separated by a rule rather than a shadow.

### Named Rules

**The Flat-By-Default Rule.** A surface is flat at rest. If a state needs
emphasis, change the rule, the ink, or the background; do not add a shadow.

## Shapes

A 2px radius on buttons, tags, badges, figures, tables, and media frames. Large
surfaces are square. Borders are 1px Rule Grey, 1px Rule Strong for a frame or a
control, and 1px Graphite Ink for a table's top rule or the pager. No pills, no
clipped corners, no decorative geometry.

## Components

### Buttons

- **Shape:** 2px radius, 1px border, 2.75rem minimum height.
- **Primary:** Graphite Ink fill, Paper text. Hover shifts to Signal Blue with
  accent-contrast text.
- **Default:** transparent, ink text, ink border. Hover inverts to ink fill.
- **Ghost:** transparent, ink text, Rule Strong border. Hover fills with ink.
- **Focus:** 2px Signal Blue outline, 3px offset, on every variant.

### Chips / Tags / Badges

- **Tag:** transparent, 1px Rule Strong, 2px radius, mono label, ink-secondary.
  Used for stack names.
- **Badge:** soft state background, state ink, mono label, 2px radius. Used for
  verdicts and tiers. Always carries the word.

### Figures

- **Frame:** 1px Rule Strong, 2px radius, surface background.
- **Caption:** mono figure number in Signal Blue plus a sans caption in
  ink-secondary.
- **Screenshots:** real product surfaces only, cropped to remove identifiers.
- **Hero figure:** a detail crop at least 2:1, sized so the interface text is
  legible at 462px wide. It shows one surface at a readable scale, not the whole
  window.

### Work Item

- **Row:** three columns at desktop (meta, body, evidence) and one column below
  720px.
- **Thumb:** a 16:9 crop of a second surface from the same project, never a
  repeat of the hero figure.
- **Facts:** mono value and sans label on hairlines, one per inventory-backed
  claim. A value that restates the row's title or meta is not a fact.
- **Link:** a 44px target, with `sr-only` text naming the destination after the
  short label.

### Tables

- **Frame:** 1px Rule Grey, 2px radius, surface background.
- **Head:** sunken background, mono uppercase labels in ink-secondary.
- **Rows:** 1px hairlines; tabular numerals in the numeric columns.
- **Mobile:** below 960px the table becomes a card list with `data-label`
  prefixes; no horizontal scrolling.

### Navigation

- **Header:** sticky, 4rem, Paper background, 1px Rule Grey bottom border. Name
  left; Work, About, Contact, and the theme toggle right.
- **States:** ink-secondary at rest, ink on hover and `aria-current="page"`.
- **Mobile:** a menu button toggles a solid panel; Escape closes it; the theme
  toggle remains in the panel.

### Case Rail

- **Style:** 10.5rem sticky column, mono title, a list of section links with a
  1px left rule. The current section takes Signal Blue text and a Signal Blue
  left rule.
- **Mobile:** a horizontal scroller with a bottom rule instead of a left rule.

### Architecture Diagram

- **Style:** four labelled nodes and two connector rules, on a Surface panel
  inside a 1px Rule Strong frame. The labels are mono. The prose carries the
  contracts; the diagram is a map, not the only explanation.

### Now Block

- **Style:** 1px Rule Strong border, 2px radius, Surface background, padded
  `clamp(1.4rem, 3vw, 2rem)`. A mono date column and a prose body. Dated, never
  implied.

## Do's and Don'ts

### Do:

- **Do** keep one accent and reserve it for links, active states, and measured
  marks.
- **Do** set every number, date, run ID, and verdict label in Azeret Mono.
- **Do** label the ten-case test as a product test, not a validation study,
  wherever the numbers appear.
- **Do** check both themes at 390, 768, and 1440px with axe-core.
- **Do** use real product screenshots and crop them to remove identifiers.
- **Do** keep the prose measure at or below 68 characters.

### Don't:

- **Don't** add a shadow, blur, glass panel, or decorative gradient.
- **Don't** put a tracked uppercase eyebrow chip above an oversized hero
  headline; the name is in the header and the claim is the headline.
- **Don't** number sections as decorative scaffolding. Case-study section numbers
  are navigation; home sections are not.
- **Don't** use colour as the only signal for a verdict or a state.
- **Don't** publish `assets/`, `docs/`, `README.md`, `DEPLOY.md`, or `ASSETS.md`.
- **Don't** reproduce a KPMG or client brand, screenshot, credential, or metric.
- **Don't** invent a metric, a testimonial, a logo, or a claim above what is
  built.

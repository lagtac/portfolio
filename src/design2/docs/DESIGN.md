# Design system — Annotated

The visual identity of the current portfolio build. `css/tokens.css` is the
normative source; this document explains intent and use.

## Concept

The portfolio is an **annotated evidence surface**. A product artifact is shown
like a specimen: framed, marked with corner ticks, and labelled with the fact
that matters. The interface recedes so the artifact, the numbers, and the
documented failures carry the argument.

Three rules:

1. **Artifact first.** Every page leads with a real product surface or a
   verified number, never decoration.
2. **One signal.** Acid lime marks the active, the measured, and the linked.
   Nothing else competes.
3. **Show the failure.** The three documented failures sit at the same level as
   the wins.

## Colour

Single dark theme. No toggle.

| Token | Value | Use | Contrast on `--field` |
|---|---|---|---|
| `--field` | `#090B0A` | Page | — |
| `--field-2` | `#111513` | Raised artifact well | — |
| `--field-3` | `#171C19` | Reserved for nested surfaces | — |
| `--bone` | `#ECEAE3` | Body and display | 16.4:1 |
| `--muted` | `#9AA39C` | Secondary copy | 7.6:1 |
| `--muted-2` | `#77817A` | Metadata, captions | 4.8:1 |
| `--rule` | `#252C28` | Hairlines | — |
| `--rule-2` | `#3A443E` | Strong rules, frame edges | — |
| `--signal` | `#C8F751` | Annotation mark, links, active | 15.9:1 |
| `--signal-ink` | `#090B0A` | Text on signal | 15.9:1 |
| `--good` | `#63D6C0` | Correct / positive data | 11.2:1 |
| `--warn` | `#F2B45C` | Caution / medium | 10.8:1 |
| `--bad` | `#FF7261` | Wrong / negative data | 7.4:1 |
| `--info` | `#8FA8FF` | Neutral data | 8.7:1 |

Status is never colour-only. Every badge and verdict carries a word. The palette
is checked against WCAG 2.1 AA at 390, 768, and 1440 px with axe-core.

## Typography

Self-hosted from `fonts/`; see `fonts/LICENSES.md`.

| Role | Family | Notes |
|---|---|---|
| Display / body | Instrument Sans (variable 400–700) | Headlines, body, large values |
| Editorial accent | Instrument Serif italic 400 | One word per headline; pull quotes |
| Data / labels | DM Mono 400/500 | Indices, metrics, captions, tables |
| Greek fallback | Noto Sans (Greek subset) | Only under `.lang-el`; Instrument has no Greek |

Scale (fluid, 360 → 1440 px):

| Token | Size / line-height | Use |
|---|---|---|
| `--t-hero` | `clamp(2.15rem, 8vw, 6.5rem)` / 0.9 | Home hero |
| `--t-h1` | `clamp(2.75rem, 6vw, 5.5rem)` / 0.94 | Page titles |
| `--t-h2` | `clamp(1.95rem, 4vw, 3.5rem)` / 1.0 | Section titles |
| `--t-h3` | `clamp(1.3rem, 2vw, 1.65rem)` / 1.15 | Card and item titles |
| `--t-lead` | `clamp(1.125rem, 1.6vw, 1.375rem)` / 1.5 | Standfirst |
| `--t-body` | `1.0625rem` / 1.65 | Body |
| `--t-small` | `0.8125rem` / 1.5 | Captions |
| `--t-micro` | `0.6875rem` / 1.2, `+0.13em` | Labels |

Display tracking is `-0.035em` to `-0.055em` at the largest sizes. Body copy is
capped at 66 characters. Serif italic is an accent, never a body face.

## Space, grid, shape

- 4 px base: 4, 8, 12, 16, 24, 32, 48, 64.
- Page max 1440 px; gutter `clamp(20px, 5vw, 64px)`.
- 12-column grid. The hero is 5 / 7; section heads are 2 / 10; case splits are
  5 / 7.
- Radius 0. No shadows, no glass, no gradient decoration.
- Borders: 1 px `--rule`; 1 px `--rule-2` for frames; 2 px `--signal` for focus.
- Annotation frame: four 14 px lime corner ticks on artifact wells. It is the
  only ornamental device and it carries meaning.
- Callouts: solid `--field` chip, 1 px `--signal` border, mono label, short
  leader line. At most two per viewport.

## Components

| Component | Behaviour |
|---|---|
| `.site-head` | Sticky 72 px, solid field, hairline bottom; persistent nav from 901 px |
| `.nav` | Mono 11 px uppercase; current page gets a lime dot; email is the only lime link |
| `.nav-toggle` | 44 px menu button below 901 px; opens a full-width link panel; Esc and outside click close it |
| `.hero` | Full-width statement, 5 / 7 body with specimen, data strip below |
| `.specimen` | Product screenshot in a framed well, corner ticks, two callouts, mono caption |
| `.data-strip` | Four hairline-separated facts, large tabular numerals |
| `.case-card` | Full-width case link; media reveals a 1.5% scale on hover |
| `.work-row` | Text-only index rows for Waypoint, KPMG, EPIS; no invented images |
| `.method` | Three principles, each with a measured receipt |
| `.metrics` | Four model metrics, mono labels, tabular values |
| `.verdicts` | 4 / 3 / 3 clinical result; colour plus word |
| `.confidence` | Ten-column confidence chart with grid lines; scroll-scrubbed fill |
| `.table.data` | Ten-case table; becomes labelled cards below 700 px |
| `.arch` | Four service nodes with labelled contracts; 2 × 2 below 900 px |
| `.surface` | Alternating media / copy blocks for the four product surfaces |
| `.failure` | Numbered failure notes: evidence line, story, result |
| `.contact` | Oversized serif-accented CTA, email, availability, LinkedIn |
| `.btn` | 1 px border, mono uppercase; solid variant is signal fill |

## Motion

- GSAP 3 + ScrollTrigger; Lenis is the only smooth-scroll engine.
- Intro, home only: nav is static; headline lines rise from masks; specimen
  settles; ticks draw; callouts rise into place; data strip follows. The lead and CTA
  are visible before the sequence ends.
- Scroll: section titles split into words and rise with a 35 ms stagger;
  `[data-reveal]` blocks rise 24 px once; hairlines and frames do not
  animate independently.
- One scrubbed moment: the ten-case confidence bars scale up on entry. Nothing
  is pinned.
- Hover and focus are CSS. No count-up numbers. No continuously animated
  offscreen content.
- `prefers-reduced-motion: reduce`: no Lenis, no timelines, no split text. Final
  states render immediately. If the preference changes mid-session, ScrollTrigger
  is killed, Lenis is destroyed, and all animated properties are cleared.

## Accessibility

- One `h1` per page, semantic landmarks, skip link, `main` focus target.
- Visible focus: 2 px signal outline, 3 px offset; skip link becomes visible on
  focus.
- Split headings keep an `aria-label`; visual word spans are `aria-hidden`.
- Table keeps table semantics at 390 px even when displayed as cards; the
  wrapper is labelled and focusable.
- Target size ≥ 44 px on touch.
- Greek strings carry `lang="el"`; the Greek face is loaded only for that range.
- axe-core WCAG 2.1 A/AA: zero violations at 390, 768, and 1440 px on all three
  pages.
- No trackers, analytics, or cookie banner.

## Assets

All published images are cropped derivatives. No staff names, raw clinical
reports, or the logged-in screenshot are published. See `ASSETS.md`.

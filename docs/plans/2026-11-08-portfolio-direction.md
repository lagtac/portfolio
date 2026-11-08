# Portfolio direction — Annotated

Date: 2026-11-08
Status: Confirmed by the user on 2026-11-08. Implemented in `src/design2/`.
Supersedes the visual direction of `src/design1/` (Case Record). The content
model in `docs/CONTENT.md` still applies.

## 1. Visual thesis

**The portfolio is an annotated evidence surface.**

Diagoradisa marks regions of an image and attaches a label to each one. The site
does the same to the work: every claim gets a marked region, a name, and a piece
of evidence. The interface stays quiet so the product screens, the numbers, and
the failures carry the argument.

This is an *observation field*, not a dossier, a blueprint, or a poster. The
artifact is lit; the chrome around it recedes.

Three rules follow:

1. **Artifact first.** A real product surface is the first thing after the
   headline. No decorative hero illustration.
2. **One signal.** Acid lime is the annotation mark: active, measured, linked.
   Nothing else competes with it.
3. **Show the failure.** The three documented failures sit on the same level as
   the wins. That is the differentiator, not a disclaimer.

## 2. Why this replaces Case Record

| Case Record (old) | Annotated (new) |
|---|---|
| Paper, serif, vermilion, dossier | Graphite, grotesque, acid lime, observation field |
| Structure made visible with section rules and a contents rail | Structure made visible with annotation marks and data labels |
| Reads like a well-kept report | Reads like the product's own surface |
| Light-first with a dark theme | One committed dark theme |

No layout, typeface, colour, or component from `src/design1/` is carried
over. Only verified copy and sanitized image derivatives survive as raw
material.

## 3. Hero

Full-width graphite field. The composition is:

- **Full-width statement:** the positioning line, set large on three lines.
  **“AI products are mostly plumbing. I build the plumbing.”** The final
  *plumbing* is serif italic in signal, with a fine underline.
- **Body, 5 / 7:** the lead and two actions on the left; the Palmist case-result
  screen on the right, in a sharp frame with four lime corner ticks. Two
  callouts are attached: `4 / 4 views agree` and `18 classes · 640 px`.
- **Below:** a full-width data strip — `4 services`, `18 classes in production`,
  `1,629 commits`, `10,575 images`. Mono labels, large values, hairline rules.

The nav, headline, lead, and CTAs are usable before the intro finishes. With
JavaScript off, the hero is complete.

Primary CTA: `Read the case study`. Secondary: `See the evidence` (anchor to the
table). One primary action only.

## 4. Type hierarchy

Self-hosted, `src/design2/fonts/`.

| Role | Family | Use |
|---|---|---|
| Display | **Instrument Sans** 400–700 | Hero, section titles, large values |
| Editorial accent | **Instrument Serif** italic 400 | One word per headline at most; pull quotes |
| Data / labels | **DM Mono** 400/500 | Section indices, metrics, captions, tags, table data |

Scale, fluid from 360 to 1440 px:

| Token | Size / line-height | Use |
|---|---|---|
| `--t-hero` | `clamp(2.15rem, 8vw, 6.5rem)` / 0.9 | Home hero |
| `--t-h1` | `clamp(2.75rem, 6vw, 5.5rem)` / 0.94 | Page titles |
| `--t-h2` | `clamp(1.95rem, 4vw, 3.5rem)` / 1.0 | Section titles |
| `--t-h3` | `clamp(1.3rem, 2vw, 1.65rem)` / 1.15 | Card titles |
| `--t-lead` | `clamp(1.125rem, 1.6vw, 1.375rem)` / 1.5 | Standfirst |
| `--t-body` | `1.0625rem` / 1.65 | Body |
| `--t-small` | `0.8125rem` / 1.5 | Captions |
| `--t-micro` | `0.6875rem` / 1.2, `+0.13em`, uppercase | Labels |

Display tracking is `-0.035em` to `-0.055em`; body measure is capped at 66
characters. Greek copy
carries `lang="el"` and needs a family with Greek coverage. Instrument Sans has
no Greek subset, so Greek strings fall back to **Noto Sans** (also self-hosted)
inside `.lang-el` only. This is the one deliberate font exception.

## 5. Colour system

Single theme. No toggle.

| Token | Value | Use |
|---|---|---|
| `--field` | `#090B0A` | Page |
| `--field-2` | `#111513` | Raised artifact well |
| `--bone` | `#ECEAE3` | Body and display |
| `--muted` | `#9AA39C` | Secondary copy, captions |
| `--rule` | `#252C28` | Hairlines |
| `--rule-2` | `#3A443E` | Strong rules, frame edges |
| `--signal` | `#C8F751` | Annotation mark, links, active |
| `--signal-ink` | `#090B0A` | Text on signal |
| `--good` | `#63D6C0` | Correct / positive data |
| `--warn` | `#F2B45C` | Medium / caution |
| `--bad` | `#FF7261` | Wrong / negative data |
| `--info` | `#8FA8FF` | Neutral data |

Verified contrast against `--field`: bone 16.4:1, muted 7.6:1, signal 15.9:1,
good 11.2:1, warn 10.8:1, bad 7.4:1, info 8.7:1. Status is never colour-only:
every badge carries a word.

## 6. Layout and signature parts

- Max width 1440 px, gutter `clamp(20px, 5vw, 64px)`, 12-column grid.
- Radius 0. No shadows. No glass. Hairlines and frames do the separation.
- **Annotation frame:** four lime corner ticks, 1 px arms, appear on the active
  figure. The only ornamental device, and it carries meaning.
- **Callout:** 1 px lime leader line, mono label, anchored to a point on an
  artifact. Used at most twice per viewport.
- **Data strip:** hairline top, mono label above a large value.
- **Work row:** full-width, year + name + role + stack, hairline between rows.
  Hover turns the name signal. No fake thumbnails for Waypoint, KPMG, or EPIS.
- **Case table:** hairline rows, tabular numerals, verdict as word + dot.
- **Buttons:** 1 px bone border, transparent; primary is signal fill with
  `--signal-ink`. Hover inverts or shifts the arrow 4 px. Focus is a 2 px signal
  outline at 2 px offset.

## 7. Section sequence

### Home

1. Hero: statement + specimen + data strip.
2. Selected work: Diagoradisa case card; Waypoint, KPMG, EPIS as honest text
   rows.
3. Method: three principles, each with one measured example.
4. Evidence: model metrics, then the ten-case result and caveat.
5. Contact: direct email, availability, LinkedIn.
6. Footer: name, build note, source note.

### Case study — `/work/diagoradisa.html`

Header → context → constraints → architecture (authored data graphic) → four
surfaces → three failures → evidence → next → contact.

### About — `/about.html`

Positioning → how I got here (EPIS, KPMG, Bookscanner, Waypoint) → tools →
contact.

## 8. Motion narrative

The page is **read as an image being annotated**.

- Intro: headline lines rise out of masks; the specimen settles; the four
  corner ticks draw; the two callouts rise into place; the data strip follows.
  Text does not fade, so contrast never drops during the sequence. Nav and CTA
  are present from frame one.
- Scroll: section titles split into words and rise with a 35 ms stagger.
  `[data-reveal]` blocks rise 24 px once. One scrubbed moment: the ten-case
  confidence bars scale up on entry. Nothing is pinned.
- Hover and focus are CSS. No animation runs offscreen. No count-up numbers.
- `prefers-reduced-motion: reduce`: no Lenis, no GSAP timelines, no split text.
  Final states render immediately.

## 9. Engine and WebGL decisions

- **GSAP 3 + ScrollTrigger**, CDN.
- **Lenis**, CDN, as the single smooth-scroll engine. Chosen over Locomotive:
  smaller, first-class ScrollTrigger hook. Never both. Connected through
  `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker`; destroyed on
  pagehide; refreshed after fonts and images.
- **Three.js: no.** The artifact is the hero. A WebGL layer would add weight,
  compete with the evidence, and add a failure mode for no narrative gain. The
  annotation frame, callouts, and masked line reveals carry the concept in DOM
and CSS.

## 10. Asset provenance plan

Publish only derivatives, never `assets/` itself.

| Asset | Source | Treatment |
|---|---|---|
| Palmist case result | `assets/palmist-ui-2026-11-03/screenshots/01-PAT-16K8CB-top.png` | Top interface crop; WebP 1200×542; no clinical photograph, no patient fields |
| Annotator editor | `assets/Screenshot 2026-11-03 at 16-24-38 Annotator ...png` | Crop to 1338×819, removing the right-hand patient panel |
| Annotator detail | Same source, full-resolution PNG | UI crop with the tool rail and lesion polygon; no patient panel |
| ML readiness | `assets/Screenshot 2026-11-03 at 16-21-20 ML Readiness ...png` | Staff name blurred in the derivative; crop to 1400×980 |
| Ten-case evidence | `docs/CONTENT.md` §3.4 | Rendered as HTML, not an image |
| Architecture | `docs/CONTENT.md` §3.2 | Authored HTML/CSS service diagram, not an illustration |

Never published: `assets/` in any form, the ten PDF reports, the full clinical
screenshots, the logged-in capture
`assets/Screen Shot 2026-09-18 at 08.01.12.png`, and `docs/`.

If a source crop still shows a staff name, patient name, or full identifier, it
is not used. The alias shown in the product is the only patient reference.

## 11. Accessibility and performance contract

- Semantic landmarks, one `h1` per page, skip link, visible focus everywhere.
- Target size ≥ 44 px on touch; mobile nav is a real disclosure.
- Split text keeps an unsplit accessible name; decorative words are
  `aria-hidden`; no links or inline markup are split.
- axe-core WCAG 2.1 AA at 390, 768, and 1440 px, plus keyboard and reduced
  motion.
- Fonts self-hosted with `font-display: swap`; images responsive with explicit
  dimensions; below-fold media `loading="lazy"`; no layout shift.
- CDN failure leaves the page fully readable and navigable.
- No trackers, no analytics, no cookie banner.

## 12. Copy and identity decisions

- Name: **Dimitris Chrysomallis** (double l, matches CV).
- Email: `dxrysom@gmail.com`.
- Location: **Athens, Greece**.
- Availability: **Open to fullstack roles, Athens, Greece or remote** (confirmed).
- Positioning, project line, method, caveat: `docs/CONTENT.md` §3.5, unchanged.
- Every number stays traceable to `docs/CONTENT.md`. The ten-case test is
  **4 correct / 3 wrong / 3 no diagnosis**, with the product-test caveat.

## 13. Acceptance bar for Phase 1

The direction is confirmed when:

1. The visual world above is accepted or amended. **Accepted.**
2. The single-theme decision is accepted. **Accepted.**
3. The availability and location lines are confirmed. **Accepted.**
4. The derivative asset plan is accepted, including the clinical-image
   restriction. **Accepted.**

Built after that confirmation. This document remains the contract.

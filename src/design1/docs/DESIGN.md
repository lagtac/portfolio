# Design system — Case Record

The portfolio's identity. New, not reused from Palmist's Chairside Instrument, but built to the same standard.

## Concept

A portfolio as a **case record**: numbered sections, figure captions, margin notes, measured claims. The page should read like a well-kept technical dossier — paper, rules, evidence — not like a startup landing page. The accent is a vermilion **annotation mark**, borrowed from the act of marking up an image.

Three rules follow from the concept:

1. **Evidence over adjectives.** Numbers sit in mono, with units and dates.
2. **Structure is visible.** Section indices, hairlines, figure numbers, and a sticky contents rail.
3. **One accent.** Vermilion marks the active, the linked, and the measured. Nothing else is coloured.

## Colour

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#F1EEE6` | `#12110E` | Page |
| `--paper-2` | `#F8F6F0` | `#191814` | Raised surfaces |
| `--paper-3` | `#E7E2D6` | `#211F1A` | Sunken / table stripes |
| `--ink` | `#16150F` | `#EDE8DA` | Body |
| `--ink-2` | `#57544A` | `#A9A392` | Secondary |
| `--ink-3` | `#6F6A5C` | `#8A8474` | Metadata |
| `--rule` | `#D5CFC0` | `#2E2C25` | Hairlines |
| `--rule-2` | `#B3AC99` | `#4A473C` | Strong rules |
| `--mark` | `#BE3F26` | `#E4674B` | Accent |
| `--good` | `#1F5C46` | `#79C6A2` | Correct / positive |
| `--warn` | `#8A5A12` | `#D9A45B` | Medium / caution |
| `--bad` | `#9E2B25` | `#E58078` | Wrong / negative |
| `--info` | `#2C4A78` | `#8FB3E0` | Neutral data |

Contrast: body ink on paper ≥ 12:1; `--ink-2` ≥ 6:1; `--ink-3` ≥ 4.65:1 (AA at 11 px). All four pages pass axe-core WCAG 2.1 A/AA in both themes. Status colours are never the only signal — every badge carries a word.

## Typography

| Role | Family | Notes |
|---|---|---|
| Display | Literata (variable, 200–900, italic) | Headlines, pull quotes, the one italic word in a headline |
| UI / body | IBM Plex Sans (variable, 100–700) | Body, labels, buttons, tables |
| Data | IBM Plex Mono (400/500) | Numbers, section indices, captions, tags |

Both Literata and Plex Sans ship Greek subsets. Greek disease names must render in the correct face, not a system fallback.

**Scale** (fluid, 360 → 1440 px):

| Token | Size | Use |
|---|---|---|
| `--t-micro` | 11 px / 1.2 | Mono labels, uppercase, +0.12em |
| `--t-small` | 13 px / 1.5 | Captions, metadata |
| `--t-body` | 17 px / 1.65 | Body |
| `--t-lead` | clamp(19px, 1.6vw, 22px) / 1.5 | Standfirst |
| `--t-h3` | clamp(20px, 1.8vw, 24px) | Subheads |
| `--t-h2` | clamp(30px, 3.6vw, 46px) | Section titles |
| `--t-h1` | clamp(44px, 7.2vw, 96px) | Page titles |
| `--t-display` | clamp(52px, 9vw, 128px) | Home hero only |

Display headings use weight 500, tracking `-0.025em`, line-height `0.98`. Body copy is capped at 68 characters.

## Space, grid, shape

- 4 px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Page max 1320 px, gutter `clamp(20px, 5vw, 56px)`.
- 12-column grid; prose spans 7, figures span 10–12.
- Radius: 2 px on buttons, inputs, and badges. 0 on cards and images. Sharp corners are part of the dossier look.
- Borders: 1 px `--rule`; 2 px `--rule-2` for emphasis; 3 px `--mark` for the active marker.

## Components

| Component | Behaviour |
|---|---|
| `.masthead` | Sticky, 64 px, hairline bottom, name left, nav right, theme toggle |
| `.eyebrow` | Mono, uppercase, 11 px, `--ink-3`, optional `§ 01` index |
| `.section-head` | Index + title + optional standfirst, hairline above |
| `.btn` | Sharp rectangle, 2 px border. Primary = ink fill; ghost = transparent; arrow shifts 4 px on hover |
| `.tag` | Mono, 11 px, 1 px rule, no fill |
| `.figure` | Image + `Fig. NN` caption; vermilion corner brackets appear on hover |
| `.stat` | Mono value, sans label, hairline top |
| `.note` | Left rule in `--mark`, 13 px, margin-note voice |
| `.table` | Hairline rows, tabular numerals, sticky header on the case table |
| `.badge` | Text + dot, tinted background, never colour-only |
| `.arch` | Four service cards + connectors + detail panel, keyboard operable |
| `.timeline` | Four phases, vertical on mobile, horizontal on desktop |
| `.dialog` | Native `<dialog>` lightbox for figures and case screenshots |
| `.toc` | Sticky contents rail on the case study, desktop only |

## Motion

- `--ease: cubic-bezier(0.2, 0.7, 0.2, 1)`; durations 160 / 240 / 400 ms.
- Reveal: 12 px rise + fade, 400 ms, once, via IntersectionObserver.
- Connector dots in the architecture diagram travel at 6 s; disabled under `prefers-reduced-motion`.
- No parallax, no scroll hijacking, no animation on text that is being read.

## Accessibility

- Every interactive element is a real `<button>`, `<a>`, or focusable SVG node.
- Visible focus: 2 px `--mark` outline, 2 px offset.
- Theme toggle: `system → dark → light → system`, persisted in `localStorage`, applied before first paint by an inline script. The first click always changes the appearance.
- Lightbox: native `<dialog>`, labelled, Esc closes, focus returns to the trigger.
- Table filters announce result counts with `aria-live="polite"`.
- Greek text carries `lang="el"`.
- Target size ≥ 44 px on touch.

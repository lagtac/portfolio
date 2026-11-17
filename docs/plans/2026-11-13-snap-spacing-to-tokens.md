# Spacing: snap design3 onto the `--s-*` ladder

Date: 2026-11-13
Status: approved. One mechanical refactor with a visual pass. This is the spacing
half of `2026-11-13-typography-tracking-and-spacing.md`, with its Phase 2 option 1
(`em` for text-relative space) replaced by option 2 (snap everything to the
ladder). The tracking (`--ls-*`) half stays separate.

One line: `tokens.css` defines the ladder, `site.css` ignores it and hardcodes
~300 `rem` values. Snap every discrete value onto the ladder.

## Finding

- `--s-1`…`--s-10` are defined in `tokens.css` and in the `DESIGN.md` frontmatter
  (`spacing.s1`…`s10`) and are referenced **zero times** in `base.css` and
  `site.css`.
- `site.css` carries 358 raw `rem`/`px` literals (41 more in `base.css`). Only
  about 63 of the spacing literals sit on the ladder; the rest are off it
  (`0.7` ×15, `1.2` ×14, `0.4` ×10, `0.8`/`0.9`/`0.55`/`0.35`/`1.1`/`0.6` ×8–9,
  `1.6`/`1.4`/`1.25`/`1.8`, and ~30 `clamp()` values).
- The mismatch is why the page feels like it "doesn't carry the tokens": the
  declared scale and the built scale are different scales.

## Scope

- In: `src/design3/css/base.css`, `src/design3/css/site.css`, and the `?v=` bumps
  in the seven HTML files that load them.
- Out: `css/tokens.css` and `DESIGN.md` — the ladder is already the source of
  truth, so it is not edited. `cv/cv.css` is a separate print document. Colour,
  fonts, layout structure, copy, and line-height are untouched.
- Tracking (`letter-spacing`) is out of scope; it is the Phase 1 half of the
  other plan.

## The rule

Replace every discrete `rem` margin / padding / gap with the nearest `--s-*`
token, round half up. Values already on the ladder map directly.

| Raw `rem`       | Token                  |
| --------------- | ---------------------- |
| `0.1` – `0.35`  | `var(--s-1)` `0.25rem` |
| `0.38` – `0.6`  | `var(--s-2)` `0.5rem`  |
| `0.65` – `0.85` | `var(--s-3)` `0.75rem` |
| `0.9` – `1.25`  | `var(--s-4)` `1rem`    |
| `1.3` – `1.6`   | `var(--s-5)` `1.5rem`  |
| `1.8` – `2.2`   | `var(--s-6)` `2rem`    |
| `2.5` – `2.75`  | `var(--s-7)` `3rem`    |

Ties round up: `1.25` → `--s-5`, `1.8` → `--s-6`, `2.5` → `--s-7`.

## Leave raw (not rhythm — snapping breaks them)

- `1px` hairlines and borders. They are `--rule` rules, not spacing.
- Negative margins. They are alignment compensation, not a rhythm step:
  - `.work-item__more .link-arrow` uses `padding-block: 0.4rem` +
    `margin-block: -0.4rem` to hold a 44px target without moving the baseline.
    Keep both raw and paired; snapping them apart breaks the trick.
  - `.site-footer__links a` `margin-block: -0.7rem`.
  - `.case-rail a` `margin-left: -1px`, `.case-table td` and similar.
- `clamp()` structural padding (hero, case-head, section). That is
  `--section` / `--gutter` scale, already viewport-scaled. Leave it.
- `scroll-padding-top`, position offsets (`top` / `left` / `right` / `bottom`),
  widths, heights, `min-height`, `border-radius`, `font-size`, `line-height`.

## Risk bands the visual pass must check

Snap-all re-tunes the rhythm. Watch these three:

1. **Fine values `0.1`–`0.45` → `0.25` / `0.5`.** Chip padding, tag gaps, and
   nav-link padding inflate. Check the header, tags, and badges at 390.
2. **`1.2` → `1`, `1.4` → `1.5`, `1.6` → `1.5`, `1.8` → `2`.** Paragraph and
   section rhythm shifts. Check prose, `.now`, and case-section spacing.
3. **`2.5` → `3`.** The single `2.5rem` value grows. Confirm no section gap
   jumps.

## Commit

One commit: `style(design3): snap spacing to the --s-* ladder`

- Both CSS files and the `?v=` bumps in the same commit (the links and the
  files they point at are one change).

## Cache busting

`DEPLOY.md` requires every CSS link to bump together. Current values:
`tokens.css?v=5`, `base.css?v=5`, `site.css?v=23`. Bump all three across the
seven pages that load them (`404.html`, `about.html`, `design/index.html`,
`index.html`, and the three `work/*.html`):

- `tokens.css?v=5` → `?v=6`
- `base.css?v=5` → `?v=6`
- `site.css?v=23` → `?v=24`

Count before and after:

```bash
grep -rhoE '\?v=[0-9]+' src/design3 --include='*.html' | sort | uniq -c
```

## Verify

- Screenshot before and after at 390 / 768 / 1440, light and dark, on the home
  page, one case page, and about. Compare the pair, not one alone. Snap-all
  changes the look, so this pass is mandatory.
- `pnpm test` — Playwright / axe.
- `pnpm test:a11y` — mobile, tablet, desktop.
- `pnpm check` — Biome.
- Drive the pages with Playwright and read the rendered result at the ship sizes.
- Read the staged diff before committing.

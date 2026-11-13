# Typography: collapse tracking, then scale spacing

Date: 2026-11-13
Status: proposed. Two phases, three commits. Phase 1 is a mechanical refactor
with a visual pass; Phase 2 is a judgment pass with visual verification. Phase 1
changes what the page looks like, so screenshot it too.

One line: the type ladder grew, but tracking and spacing are still hardcoded.
Fix tracking first as five tokens, then make spacing follow type size.

## Finding

- Tracking drifted to 16 hardcoded values across `base.css` and `site.css`:
  nine positive label values and six negative display values, plus `0`.
- Spacing is worse. `--s-1`…`--s-10` are defined in `tokens.css` and referenced
  **zero times**. Every gap is a raw `rem` or `clamp()` value in `site.css`.
- The font-size increase exposed this: margins like `margin-top: 1.4rem` are
  fixed, so the space under a heading did not grow with the heading. The rule
  already varies — `.prose > * + *` and `.about-body > p + p` use `1.1em`
  (scales), most sibling margins use `rem` (does not).

## Scope

- In: `css/tokens.css`, `css/base.css`, `css/site.css`.
- Out: `cv/cv.css` (separate print document, its own tracking), fonts, colour,
  layout structure, copy, line-heights. `design/index.html` line 92 carries an
  inline `letter-spacing:-0.04em` that already matches the display value; leave
  it or swap for `var(--ls-display)` later, your call.

---

## Phase 1 — collapse tracking (do now)

CSS commit: `style(design3): collapse tracking to five tokens`. Cut 5 is a
separate docs commit.

### Cut 1 — one tracking value for mono labels

All positive tracking on mono, uppercase labels becomes `var(--ls-tag)`
(`0.06em`). Two exceptions keep a wider value via `var(--ls-label)`
(`0.13em`):

- `.eyebrow` — `base.css:142`
- `.now__label h2` — `site.css:610`

Current positive values to fold, by group:

| Current  | Selectors                                                                                                                                                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0.02em` | `.breadcrumb`                                                                                                                                                                                                                 |
| `0.04em` | `.case-table__id`, `.ledger__years`, `.swatch__meta b`                                                                                                                                                                        |
| `0.05em` | `.timeline__date`, `.badge`                                                                                                                                                                                                   |
| `0.06em` | 12 selectors already at the target value; swap them to `var(--ls-tag)`                                                                                                                                                        |
| `0.07em` | `.failure dt`, `.record dt`, `thead th`                                                                                                                                                                                       |
| `0.08em` | `.hero__status`, `.method__proof b`, `.now__label`, `.case-meta dt`, `.case-rail__title`, `.arch__node-num`, `.arch__infra strong`, `.surface__role`, `.record__label`, `.about-actions__copy`, `.specimen__label`, `caption` |
| `0.1em`  | `.brand__role`                                                                                                                                                                                                                |
| `0.12em` | `.method__proof` (also loses uppercase, see Cut 4)                                                                                                                                                                            |
| `0.13em` | `.eyebrow`, `.now__label h2` → `var(--ls-label)`                                                                                                                                                                              |

Run `grep -rn "letter-spacing:" src/design3/css` to confirm the full set before
editing.

### Cut 2 — three display tracking values

| Token          | Value     | Applies to                                                                                                                     |
| -------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `--ls-display` | `-0.04em` | `.hero__title` (both rules), `.proof__value`, `.case-head h1`, `.metric__value`, `.about h1`, `.design-hero h1`, `.contact h2` |
| `--ls-title`   | `-0.03em` | `h1`–`h4` base rule (explicit `h3` exception below)                                                                            |
| `--ls-sub`     | `-0.02em` | `h3`, `.work-item__title`, `.work-item__facts b`, `.about-actions__email`, `.contact__email`                                   |

`h3` overrides the `h1`–`h4` rule with `--ls-sub`, so it is not a third
`--ls-title` value. `.about h1`, `.design-hero h1`, and `.contact h2` take
`--ls-display` so page titles match `DESIGN.md` (`page-title = -0.04em`).
`.work-item__title` and `.contact__email` move to `--ls-sub` to match the
`DESIGN.md` title step (`-0.02em`).

Folds:

- `-0.035em` → `-0.02em`: `.work-item__title` (now `--ls-sub`).
- `-0.03em` → `-0.02em`: `.contact__email` (now `--ls-sub`).
- `-0.015em` → `0`: `.brand__name`.
- `-0.01em` → `0`: `.lede`, `.mono`, `.timeline__phase h3`, `.arch__node-name`.
- `.lede` at `0` leaves it separated from body by line-height and colour only —
  this is intended.

Keep the deliberate zeros: `[lang="el"]` (`base.css:215`) and `.record dd .num`
(`site.css:1466`).

### Cut 3 — tokens own the values

Add to `:root` in `tokens.css`, under a new `/* Tracking */` comment:

```css
:root {
	--ls-display: -0.04em; /* display and page titles */
	--ls-title: -0.03em; /* section headlines */
	--ls-sub: -0.02em; /* subheads, work-item titles, contact email */
	--ls-tag: 0.06em; /* most mono labels and tags */
	--ls-label: 0.13em; /* eyebrow */
}
```

Reference the token at every site listed above. The point of the token is that
the value appears once; do not leave a literal `-0.03em` behind in `base.css`.
The names follow `DESIGN.md`: `label` is the `0.13em` eyebrow value, and `tag`
is the `0.06em` value used by table heads, figure numbers, and badges.

### Cut 4 — drop uppercase where it does no work

- `.method__proof` (`site.css:544–560`): remove `text-transform: uppercase`.
  The line carries proper nouns and code (`VBScript → C# → PHP → TypeScript`),
  which uppercase mangles. Keep `font-family: var(--mono)` and `var(--ls-tag)`.
  To keep the role statement labelled, add a rule:
  `.method__proof__role { text-transform: uppercase; letter-spacing: var(--ls-tag); }`
  The class already exists in the markup (`index.html:239`), so no HTML change
  is needed.
- `.hero__status` (`site.css:228`): the suggestion claims
  `text-transform: capitalize` here. **It is not present.** The rule is mono +
  `0.08em` with no transform, and `index.html:76` renders "Open to fullstack
  roles" as written. This item is a no-op; only the Cut 1 tracking change
  applies. Do not add a transform to remove.

### Cut 5 — sync the design record

One commit: `docs(design3): align DESIGN.md tracking with the tokens`.

`tokens.css` states every value mirrors `DESIGN.md`, so the record must match
what ships:

- `lead` letterSpacing `-0.01em` → `0em` (folded in Cut 2).
- Fix the `label`/`tag` descriptions: most mono labels (table heads, figure
  numbers, badges) sit at tag tracking (`0.06em`); label (`0.13em`) is reserved
  for the eyebrow and the Now heading.
- `.impeccable/design.json` carries no typography block, so it needs no edit.

### Verify visually (Phase 1)

Phase 1 changes the look, even though it is a token refactor. Screenshot before
and after at 390 / 768 / 1440 px, light and dark, on the home page and one case
page. Check the three biggest moves:

- `.method__proof`: `0.12em` → `0.06em`, and the loss of uppercase.
- `.brand__role`: `0.1em` → `0.06em`.
- `.breadcrumb`: `0.02em` → `0.06em`.

---

## Phase 2 — scale spacing (separate commit, after Phase 1 lands)

One commit: `style(design3): scale spacing with the type ladder`.

### Decision before editing

Pick one policy and apply it consistently:

1. **em for text-relative space, tokens for structure.** Sibling margins and
   gaps between type use `em` (they scale with the enlarged text); padding and
   grid gaps use a ladder token. This matches what `.prose` and `.about-body`
   already do.
2. **Everything on the ladder.** Snap values to `--s-*`. Cheaper to read, but
   the existing values (`0.55`, `0.65`, `0.9`, `1.1`, `1.4`, `1.8`…) do not map
   1:1, so this shifts layout.

Recommended: option 1. Do not force every magic number onto the ladder; extend
the ladder only when a value recurs.

### Targets

Convert the fixed `rem` type-relative margins so they track font size. Start
with the hero and case heads, which the type bump most affected:

- `.hero__lede` `1.4rem`, `.hero__actions` `1.8rem`, `.hero__status` `1.6rem`
- `.section-head` `margin-bottom`, `.method__item h3` `0.8rem`
- `.case-head__lead` `1.1rem`, `.case-head h1` `1.1rem`
- `.now__body p + p` `0.7rem`, `.method__item p` `0.7rem`

Leave alone:

- Line-heights — already correct for the larger type (`0.94`/`1.06` display,
  `1.65` body). The problem is between elements, not inside line boxes.
- `--section` and `--gutter` — already tokenized and viewport-scaled.
- `--s-1`…`--s-10` values — keep the ladder; just start using it.

### Verify visually (Phase 2)

Screenshot before and after at 390 / 768 / 1440, light and dark, on the home,
one case page, and about. Confirm the heading-to-prose gaps grow with the type
and no section collapses. Compare the pair, not one alone.

---

## Verification (both phases)

- Bump `?v=` on every edited stylesheet across all seven pages that load it
  (`404.html`, `about.html`, `design/index.html`, `index.html`, and the three
  `work/*.html`). Current values: `tokens.css?v=5`, `base.css?v=5`,
  `site.css?v=18`. Edit `tokens.css` → `6`, `base.css` → `6`, `site.css` → `19`.
- `pnpm test` — Playwright/axe, discovers `design3`.
- `pnpm test:a11y` — mobile, tablet, desktop.
- `pnpm check` — Biome.
- Drive the pages with Playwright and read the rendered result at the ship sizes.
- Read the staged diff before each commit; one logical change per commit.

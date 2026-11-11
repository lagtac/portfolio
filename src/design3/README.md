# design3 — the published portfolio

Plain HTML, CSS, and JavaScript. No build step, no framework. The destination
candidate for `dchris`'s job search; `design1` and `design2` remain as reference.

## Pages

| Path                    | What it is                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| `index.html`            | Home: hero, proof strip, selected work, method, Now, contact                                                  |
| `work/diagoradisa.html` | The Diagoradisa case study: context, constraints, architecture, four surfaces, three failures, evidence, next |
| `about.html`            | About, how I got here, tools, KPMG Greece (2010–2018), Now, contact                                           |
| `design/index.html`     | The design system reference: tokens, type, spacing, components, motion, accessibility                         |

## Preview

From `src/`:

```bash
python3 -m http.server 4175
# http://127.0.0.1:4175/design3/
```

## Verification

From the repository root:

```bash
pnpm test          # axe-core WCAG 2.1 A/AA at 390, 768, 1440
pnpm check         # Biome
```

The axe suite discovers `design3` automatically and skips the reference builds.
Both themes are checked; the suite's `reducedMotion: reduce` setting makes every
final state visible to axe. Drive the pages with Playwright for motion, theme,
menu, and case-rail behavior.

## Content and assets

- `../../docs/CONTENT.md` is the only source for numbers, dates, and names.
- `ASSETS.md` records the provenance of every published image.
- `fonts/LICENSES.md` records the font licences.
- `DEPLOY.md` holds the GitHub Pages staging and pre-launch checklist.
- `docs/DESIGN.md` is the carbonised design system.

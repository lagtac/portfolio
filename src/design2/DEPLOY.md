# Deploying the site

Static site. No build step, no package manager, no runtime.

## Publish these paths only

```
index.html
about.html
work/
css/
js/
img/
fonts/
```

## Do not publish

- **`assets/`** — raw source material at the repository root: clinical
  photographs, PDF reports, and a logged-in screenshot. Nothing here links to
  it.
- **`docs/`** — the design system and working notes.
- **`README.md`, `DEPLOY.md`, `ASSETS.md`** — build notes, not site content.
- Any screenshot or probe output outside the publish list.

If the host publishes the repository root, add `assets/` and `docs/` to its
ignore list, or deploy from a directory that contains only the list above.

## Local preview

From this directory (`src/design2/`):

```bash
python3 -m http.server 4175
# http://127.0.0.1:4175/
```

## Replace before launch

| Where | What |
|---|---|
| all pages | `og:image` is relative (`img/og.jpg`). Set the absolute URL once the domain is known. |
| all pages | Canonical URL is not set. Add it once the domain is known. |
| `index.html`, `about.html`, `work/diagoradisa.html` | Public email is `dxrysom@gmail.com`; confirm it is the address to publish. |
| `about.html`, contact blocks | "Open to fullstack roles · Athens, Greece or remote" is the confirmed line. |

## Cache busting

CSS, JS, and font CSS links carry `?v=15`. Bump the version in all three pages
after editing `css/`, `js/`, or `fonts/fonts.css`, or the browser may serve the
old file.

## Source corrections

- **Ten-case test:** 4 correct, 3 wrong, 3 no diagnosis. The source summary line
  says 5 / 3 / 2, but its own table sums to 4 / 3 / 3. The site uses the table.
- **Class count:** the production model has 18 classes. 95 is the original
  ICD-10 taxonomy, not the current class count.
- **Timeline:** Jul 2025 – Oct 2026, about 15 months.
- **Name:** Dimitris Chrysomallis, double l.
- **Email:** `dxrysom@gmail.com`.

## Checks already run

- HTML parse: no unclosed tags, no duplicate IDs, one `h1` per page.
- Links and assets: none missing.
- Fonts: Instrument Sans, Instrument Serif, DM Mono, and Noto Sans Greek load
  from local files; no third-party font request.
- axe-core WCAG 2.1 A/AA: zero violations on all three pages at 390, 768, and
  1440 px.
- Playwright: intro, mobile menu open/close, anchor targets, focus order, skip
  link, reduced motion, no-JS rendering, and the ten-case table at 390 px.
- One smooth-scroll engine (Lenis); ScrollTrigger refresh after load and fonts;
  cleanup on `pagehide`.

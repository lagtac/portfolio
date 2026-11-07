# Deploying the site

Static site. No build step, no package manager, no runtime.

## Publish these paths only

```
index.html
about.html
work/
design/
css/
js/
img/
fonts/
```

## Do not publish

- **`assets/`** — raw source material, held at the repository root. It contains full-resolution clinical photographs, PDF reports, and a screenshot of a logged-in account. Nothing on the site links to it. Never copy it into `src/design1/`.
- **`docs/`** — working notes for the build. Not part of the site.

If the host publishes the repository root, add `assets/` and `docs/` to its ignore list, or deploy from a directory that contains only the publish list above.

## Local preview

From this directory (`src/design1/`):

```bash
python3 -m http.server 4173
# http://127.0.0.1:4173/
```

## Replace before launch

| Where | What |
|---|---|
| `index.html`, `about.html` | Email `dchrysomallis@bookscanner.gr`. Use the address you want public. |
| `about.html` | "Open to fullstack roles" and the closing line about looking for a role. |
| `index.html`, `about.html` | "Greece · remote". Adjust if the location line should be more specific. |
| all pages | `og:image` is relative (`img/og.jpg`). Set the absolute URL once the domain is known. |

## Cache busting

CSS and JS links carry `?v=1`. Bump the version in all four pages after editing `css/` or `js/`, or the browser may serve the old file.

## Source corrections

- **Ten-case test:** 4 correct, 3 wrong, 3 no diagnosis. `assets/palmist-ui-2026-11-03/RESULTS.md` says 5 / 3 / 2 in its summary line, but its own table sums to 4 / 3 / 3. The site uses the table.
- **Class count:** the production model has 18 classes. The 95 figure is the original ICD-10 taxonomy, not the current class count.
- **Timeline:** the project runs Jul 2025 – Oct 2026, which is about 15 months, not two years.

## Checks already run

- HTML parse: no unclosed tags, no duplicate IDs.
- Links and assets: none missing.
- Fonts: Literata, Plex Sans, and Plex Mono load; Greek subsets included.
- axe-core WCAG 2.1 A/AA: zero violations on all four pages, light and dark.
- Playwright: theme cycle, mobile menu, architecture panel, table filters, lightbox open and Esc close.

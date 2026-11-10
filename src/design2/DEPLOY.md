# Deploying the site

Static site. No build step, no package manager, no runtime. This is a pre-launch
checklist; no host is chosen yet.

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
  photographs, PDF reports, a logged-in screenshot. Nothing here links to it.
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

## Third-party requests

Three remote scripts load on every page, pinned to exact versions:

```
https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/gsap.min.js
https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/ScrollTrigger.min.js
https://cdn.jsdelivr.net/npm/lenis@1.3.27/dist/lenis.min.js
```

Nothing else is remote: fonts, CSS, images, and first-party JS are all local.
A host that sets a Content-Security-Policy must allow `cdn.jsdelivr.net`, and
local preview without network access will render the page without motion.

## Replace before launch

| Where                                               | What                                                                                                 |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `index.html`, `about.html`, `work/diagoradisa.html` | Public email is `dxrysom@gmail.com`; confirm it is the address to publish.                           |
| `about.html`, contact blocks                        | "Open to fullstack roles · Athens, Greece or remote" is the confirmed line.                          |
| all pages                                           | `og:image` is relative (`img/og.jpg`). Set the absolute URL once the domain is known.                |
| all pages                                           | Canonical URL is not set. Add it once the domain is known.                                           |
| all pages                                           | Confirm the name renders as "Dimitris Chrysomallis", double l, in titles, `og:title`, and body copy. |

## Cache busting

Every CSS, JS, and font link carries `?v=15`, 15 links across the three pages.
All of them must share the same value. Bump every one together after editing
`css/`, `js/`, or `fonts/fonts.css`, or the browser may serve the old file.

## Facts and figures

Numbers, dates, and names come from `../../docs/CONTENT.md`. Do not restate them
here. If a page needs a different number, change `CONTENT.md` first.

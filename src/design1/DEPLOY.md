# Deploying the site

Static site. No build step, no package manager, no runtime. This is a pre-launch
checklist; no host is chosen yet.

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

- **`assets/`** — raw source material, held at the repository root. It contains
  full-resolution clinical photographs, PDF reports, and a screenshot of a
  logged-in account. Nothing on the site links to it. Never copy it into
  `src/design1/`.
- **`docs/`** — working notes for the build. Not part of the site.
- **`README.md`, `DEPLOY.md`** — build notes, not site content.

If the host publishes the repository root, add `assets/` and `docs/` to its
ignore list, or deploy from a directory that contains only the publish list
above.

## Local preview

From this directory (`src/design1/`):

```bash
python3 -m http.server 4173
# http://127.0.0.1:4173/
```

## Replace before launch

| Where                      | What                                                                                                                                |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| all four pages             | Name renders as "Chrysomalis" (one l) in titles, `og:title`, the brand, and the `about.html` h1. Correct to the published spelling. |
| `index.html`, `about.html` | Email `dchrysomallis@bookscanner.gr`. Use the address you want public.                                                              |
| `about.html`               | "Open to fullstack roles" and the closing line about looking for a role.                                                            |
| `index.html`, `about.html` | "Greece · remote". Adjust if the location line should be more specific.                                                             |
| all pages                  | `og:image` is relative (`img/og.jpg`). Set the absolute URL once the domain is known.                                               |
| all pages                  | No canonical URL is set. Add one once the domain is known.                                                                          |

## Cache busting

Every CSS, JS, and font link carries `?v=`, and all 22 links across the four
pages must share the same value. Bump all of them together after editing `css/`,
`js/`, or `fonts/fonts.css`. A partial bump is the failure mode, and it has
already happened here: 18 links are at `?v=1` and the four `js/site.js` links are
at `?v=2`.

## Facts and figures

Numbers, dates, and names come from `../../docs/CONTENT.md`. Do not restate them
here. If a page needs a different number, change `CONTENT.md` first.

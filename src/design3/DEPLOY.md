# Deploying design3

Static site. No build step, no package manager, no runtime. The Pages artifact is
this directory only, staged before upload.

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

`fonts/LICENSES.md` ships with `fonts/`; it is a licence, not a build note.
Nothing else ships.

## Never publish

- **`assets/`** — raw source material. Full-resolution clinical photographs, the
  ten PDF reports, and account screenshots. No page links to it.
- **`docs/`** — `DESIGN.md` and the build notes.
- **`README.md`, `DEPLOY.md`, `ASSETS.md`** — build notes, not site content.
- **Unused case screenshots** — the ten result screens were removed from `img/`
  because they carry patient identifiers the table does not need.

The staging command below copies only the publish list, so private material is
excluded by construction rather than by an ignore rule.

## Stage and inspect

From the repository root:

```bash
rm -rf /tmp/design3-site
mkdir -p /tmp/design3-site
rsync -a --delete \
  src/design3/index.html \
  src/design3/about.html \
  src/design3/work \
  src/design3/design \
  src/design3/css \
  src/design3/js \
  src/design3/img \
  src/design3/fonts \
  /tmp/design3-site/
touch /tmp/design3-site/.nojekyll
python3 -m http.server 4175 --directory /tmp/design3-site
# http://127.0.0.1:4175/
```

Check the staged copy, not the source tree. A missing file or a link to `assets/`
is a staging failure.

## GitHub Pages

`.github/workflows/deploy-design3.yml` runs the same `rsync` staging step and
uploads the result with `actions/upload-pages-artifact`. In the repository
settings, set **Pages → Source** to **GitHub Actions**. The workflow deploys on a
push to `main` that touches `src/design3/`, or by manual dispatch.

No git remote is configured in this checkout, so this is prepared, not pushed.

## Cache busting

Every CSS, JS, and font link carries `?v=`, and all of them share one value. Bump
every link together after editing `css/`, `js/`, or `fonts/fonts.css`. Count them
before and after:

```bash
grep -rhoE '\?v=[0-9]+' src/design3 --include='*.html' --include='*.css' | sort | uniq -c
```

A partial bump is the failure mode.

## Before launch

| Where                                               | What                                                                                                              |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `index.html`, `about.html`, `work/diagoradisa.html` | Confirm the public email `dchrysomallis@bookscanner.gr`.                                                          |
| all pages                                           | Set the absolute `og:image` URL once the domain is known. It is relative today (`img/og.jpg` or `../img/og.jpg`). |
| all pages                                           | Add the canonical URL once the domain is known.                                                                   |
| `index.html`                                        | The “Now” block is dated 10 Nov 2026. Update the date and the sentence when the TypeScript/React work ships.      |
| `about.html`                                        | The confidential role statement names no client. Keep the name off until the client clears it.                    |
| `index.html`                                        | The KPMG card links to `about.html#kpmg`; when `/work/kpmg.html` ships, point the card there.                     |

## Facts

Numbers, dates, and names come from `../../docs/CONTENT.md`. Change that file
first, then the page. The ten-case test is a product test, not a validation
study; keep the caveat wherever the numbers appear.

## Local preview of the source directory

```bash
cd src
python3 -m http.server 4175
# http://127.0.0.1:4175/design3/
```

# Deploying design3

Static site. No build step, no package manager, no runtime. The Pages artifact is
this directory only, staged before upload.

## Publish these paths only

```
404.html
cv/
index.html
about.html
work/
css/
js/
fonts/
img/favicon.svg
img/og.jpg
img/annotator-tools.webp
img/annotator-canvas.webp
img/annotator-editor-detail.webp
img/ml-readiness.webp
img/palmist-results.webp
img/palmist-upload.webp
img/faltso-band.webp
img/faltso-community.webp
img/faltso-rock-hotel.webp
```

`fonts/LICENSES.md` ships with `fonts/`; it is a licence, not a build note.
Nothing else ships.

`img/` is a file allowlist, never a directory copy. A new image enters the list by
name, so an unreferenced export cannot ship by existing.

## Never publish

- **`assets/`** — raw source material. Full-resolution clinical photographs, the
  ten PDF reports, and account screenshots. No page links to it.
- **`docs/`** — `DESIGN.md` and the build notes.
- **`README.md`, `DEPLOY.md`, `ASSETS.md`** — build notes, not site content.
- **Uncropped product exports** — `assets/source/design3-raw/` holds the full
  screenshots the WebP derivatives were cropped from. They show staff names,
  patient folders, patient IDs, and unredacted clinical photographs.

The staging command below copies only the publish list, so private material is
excluded by construction rather than by an ignore rule.

## Stage and inspect

From the repository root:

```bash
rm -rf /tmp/design3-site
mkdir -p /tmp/design3-site
rsync -a --delete \
  src/design3/404.html \
  src/design3/cv \
  src/design3/index.html \
  src/design3/about.html \
  src/design3/work \
  src/design3/css \
  src/design3/js \
  src/design3/fonts \
  /tmp/design3-site/
rsync -a \
  src/design3/img/favicon.svg \
  src/design3/img/og.jpg \
  src/design3/img/annotator-tools.webp \
  src/design3/img/annotator-canvas.webp \
  src/design3/img/annotator-editor-detail.webp \
  src/design3/img/ml-readiness.webp \
  src/design3/img/palmist-results.webp \
  src/design3/img/palmist-upload.webp \
  src/design3/img/faltso-band.webp \
  src/design3/img/faltso-community.webp \
  src/design3/img/faltso-rock-hotel.webp \
  /tmp/design3-site/img/
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

Published at <https://lagtac.github.io/portfolio/> (`lagtac/portfolio`, branch
`main`, Pages source **GitHub Actions**).

## The CV

`cv/` is a copy. Its source is the separate repository at `~/src/cv`, which also
holds the Greek CV and the PDF. Edit the CV there, never in `cv/`, then:

```bash
./scripts/sync-cv.sh
```

The script copies `cv-en.html`, `cv.css`, and `ddc.jpg`, and applies the two
site-only adaptations: the footer link to `../index.html` and the cache-buster.
It stamps `?v=` with the first eight hex digits of the CV's SHA-256, so the
stylesheet URL changes exactly when the CV content changes.

## Cache busting

Every CSS, JS, and font link carries `?v=`. Bump every link together after
editing `css/`, `js/`, or `fonts/fonts.css`. The CV stylesheet is the exception:
`scripts/sync-cv.sh` maintains its content hash. Count them before and after:

```bash
grep -rhoE '\?v=[0-9]+' src/design3 --include='*.html' --include='*.css' | sort | uniq -c
```

A partial bump is the failure mode.

## Before launch

| Where                                                           | What                                                                                                              |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `index.html`, `about.html`, `work/oral-pathology-platform.html` | Confirm the public email `dchrysomallis@outlook.com`.                                                             |
| all pages                                                       | Set the absolute `og:image` URL once the domain is known. It is relative today (`img/og.jpg` or `../img/og.jpg`). |
| all pages                                                       | Add the canonical URL once the domain is known.                                                                   |
| `index.html`                                                    | The “Now” block is dated 10 Nov 2026. Update the date and the sentence when the TypeScript/React work ships.      |
| `about.html`                                                    | No current client is named. Add one only after the client clears it.                                              |
| `work/kpmg.html`                                                | Text-only by design. No KPMG brand, screenshot, credential, or metric may be added; the inventory stays private.  |
| `work/faltso.html`                                              | Images come from the group's own site, with the families' consent. No school name, enrolment, or revenue figure.  |

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

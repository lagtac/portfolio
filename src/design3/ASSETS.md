# Asset provenance

Everything published from `img/` is either a cropped product screenshot or an
authored mark. Raw material stays in `../../assets/` and is never copied into the
site.

| Published file                     | Source                                                                                                       | Treatment                                                                                                                                                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `img/annotator-tools.webp`         | `assets/Screenshot 2026-11-03 at 16-24-38 Annotator - Diagoradisa Annotation System.png`                     | Cropped to 1580×820 at x=0, y=80: the type and shape tool panel beside the canvas. The breadcrumb path, filmstrip, and patient panel are removed.                                                     |
| `img/annotator-canvas.webp`        | same source, cropped to 1260×820 at x=320, y=80                                                              | The canvas and polygon only. No breadcrumb, filmstrip, tool rail, or patient panel.                                                                                                                   |
| `img/annotator-editor-detail.webp` | same source, cropped to 940×440 at x=620, y=130                                                              | The hero detail: the ICD-10 picker and the polygon. No breadcrumb, filmstrip, or patient panel.                                                                                                       |
| `img/ml-readiness.webp`            | `assets/Screenshot 2026-11-03 at 16-21-20 ML Readiness - Diagoradisa Annotation System.png`                  | Cropped from the full 1879×3187 screenshot to 1247×621 at x=316, y=344: export cascade, class-size histogram, train/val/test split. No nav, no class tables. Staff name was already blurred upstream. |
| `img/palmist-results.webp`         | `assets/palmist-ui-2026-11-03/screenshots/01-PAT-16K8CB-top.png`, via `src/design1/img/palmist-results.webp` | Top interface only: model metadata, case-level diagnosis, and the two-view rule. No clinical photograph and no patient fields.                                                                        |
| `img/palmist-upload.webp`          | `src/design1/img/palmist-upload.webp`                                                                        | Upload panel only: camera, files, drag-and-drop, and the analyze action. No patient data.                                                                                                             |
| `img/og.jpg`                       | Rendered from a temporary 1200 × 630 HTML card in this directory                                             | Authored social card. The product screenshot inside it is the cropped derivative above.                                                                                                               |
| `img/favicon.svg`                  | Authored                                                                                                     | Monogram. No third-party mark.                                                                                                                                                                        |

## Re-encoding

Published derivatives are made with ImageMagick 6 (`convert`; `magick` is the
ImageMagick 7 name and is not installed here). WebP is encoded by libwebp, which
ships with the local install. `-auto-orient` applies the EXIF rotation before
`-strip` removes all metadata, including EXIF and GPS, as ADR 0002 requires.
Never publish a derivative that skipped `-strip`.

Run from the repository root. The steps are wrapped in `scripts/webp.sh`; it
requires one of `--crop` or `--resize` and always strips metadata. Crop, then
strip, then encode at the target size:

```bash
convert "assets/Screenshot 2026-11-03 at 16-24-38 Annotator - Diagoradisa Annotation System.png" \
  -auto-orient -crop 1580x820+0+80 +repage \
  -strip -quality 82 -define webp:method=6 \
  src/design3/img/annotator-tools.webp
```

For a photograph that is resized rather than cropped:

```bash
convert "assets/faltso/images/<photo>.jpg" -auto-orient -resize 1600x \
  -strip -quality 82 -define webp:method=6 \
  src/design3/img/faltso-band.webp
```

Pick the photo from `assets/faltso/images/`; publishing it needs the consent recorded in ADR 0002.

Crop values come from the table above. Confirm the output carries no EXIF:

```bash
identify -verbose src/design3/img/annotator-tools.webp | grep -i exif
```

No output means the metadata is gone.

## Not published

- `assets/` in any form, including `assets/source/` and the ten clinical PDFs.
- The ten case screenshots. The ten-case table carries the result; the result
  screens are not shipped because they include patient identifiers that the
  table does not need.
- The full annotator window: the breadcrumb folder path, the filmstrip of other
  patient photographs, and the patient panel. Only the three crops above are
  published.
- The uncropped exports the WebP derivatives were cut from, kept in
  `assets/source/design3-raw/`: staff names, patient folders, patient IDs, and
  unredacted clinical photographs.
- Any KPMG or client brand, screenshot, credential, or PII.
- `docs/`, `README.md`, `DEPLOY.md`, and this file.

## Icons

The contact and hero-link icons are inlined from [Iconoir](https://iconoir.com/),
regular style, 24px viewBox at 1.5 stroke: `mail`, `page`, `github`, and
`linkedin`. Iconoir is MIT licensed, copyright (c) 2021 Luca Burgio. The paths
live in `about.html` and `index.html`, share the `link-icon` class, and no icon
font or sprite is loaded at runtime.

## Fonts

Self-hosted from `fonts/`; see `fonts/LICENSES.md`. No hosted font stylesheet is
loaded at runtime.

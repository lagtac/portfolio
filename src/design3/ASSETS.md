# Asset provenance

Everything published from `img/` is either a cropped product screenshot or an
authored mark. Raw material stays in `../../assets/` and is never copied into the
site.

| Published file              | Source                                                                                                                                | Treatment                                                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `img/annotator-editor.webp` | `assets/Screenshot 2026-11-03 at 16-24-38 Annotator - Diagoradisa Annotation System.png`, via `src/design1/img/annotator-editor.webp` | Cropped at x=1338 to remove the right-hand patient panel (alias, age, sex, ID) and the account button. The lesion polygon and tool rail remain. |
| `img/ml-readiness.webp`     | `assets/Screenshot 2026-11-03 at 16-21-20 ML Readiness - Diagoradisa Annotation System.png`, via `src/design1/img/ml-readiness.webp`  | Staff name is already blurred in the derivative. Used as-is to keep the export cascade and class-size evidence readable.                        |
| `img/palmist-results.webp`  | `assets/palmist-ui-2026-11-03/screenshots/01-PAT-16K8CB-top.png`, via `src/design1/img/palmist-results.webp`                          | Top interface only: model metadata, case-level diagnosis, and the two-view rule. No clinical photograph and no patient fields.                  |
| `img/palmist-upload.webp`   | `src/design1/img/palmist-upload.webp`                                                                                                 | Upload panel only: camera, files, drag-and-drop, and the analyze action. No patient data.                                                       |
| `img/og.jpg`                | Rendered from a temporary 1200 × 630 HTML card in this directory                                                                      | Authored social card. The product screenshot inside it is the cropped derivative above.                                                         |
| `img/favicon.svg`           | Authored                                                                                                                              | Monogram. No third-party mark.                                                                                                                  |

## Not published

- `assets/` in any form, including `assets/source/` and the ten clinical PDFs.
- The ten case screenshots. The ten-case table carries the result; the result
  screens are not shipped because they include patient identifiers that the
  table does not need.
- Any KPMG or client brand, screenshot, credential, or PII.
- `docs/`, `README.md`, `DEPLOY.md`, and this file.

## Fonts

Self-hosted from `fonts/`; see `fonts/LICENSES.md`. No hosted font stylesheet is
loaded at runtime.

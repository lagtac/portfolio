# Asset provenance — Annotated

All published images are derivatives, not the raw `assets/` material. Every
crop removes staff names and patient identifiers beyond the alias that is
already visible in the product.

| Published file | Source | Treatment |
|---|---|---|
| `img/palmist-result.webp` | `assets/palmist-ui-2026-11-03/screenshots/01-PAT-16K8CB-top.png`, via `src/design1/img/palmist-results.webp` | Top interface only; no clinical photograph, no patient fields |
| `img/annotator-editor.webp` | `assets/Screenshot 2026-11-03 at 16-24-38 Annotator - Diagoradisa Annotation System.png`, via `src/design1/img/annotator-editor.webp` | Cropped at x=1338 to remove the right-hand patient panel; no staff names |
| `img/annotator-detail.webp` | Same source, full-resolution PNG | Crop with the tool rail and the lesion polygon; no patient panel, no staff names |
| `img/ml-readiness.webp` | `assets/Screenshot 2026-11-03 at 16-21-20 ML Readiness - Diagoradisa Annotation System.png`, via `src/design1/img/ml-readiness.webp` | Staff name already blurred in the derivative; cropped to the dashboard and cascade, no long class tables |
| `img/palmist-upload.webp` | `src/design1/img/palmist-upload.webp` | Upload panel only; no patient data |
| `img/og.jpg` | Screenshot of this build at 1200 × 630 | Recomposed social card |
| `img/favicon.svg` | Authored brand mark | Annotation-frame mark, no third-party asset |

Never published: `assets/` in any form, the ten clinical PDF reports, the full
clinical screenshots, and `assets/Screen Shot 2026-09-18 at 08.01.12.png`.

## Fonts

Self-hosted from Google Fonts, all SIL Open Font License 1.1:

- Instrument Sans (variable, Latin)
- Instrument Serif (italic, Latin)
- DM Mono (400/500, Latin)
- Noto Sans (Greek subset)

## Icons

The brand mark, arrows, and annotation ticks are authored SVG primitives. No
icon set beyond these is used.

## Motion libraries

- GSAP 3.15.1 and ScrollTrigger, loaded from jsDelivr.
- Lenis 1.3.27, loaded from jsDelivr. The only smooth-scroll engine.

No trackers, analytics, cookies, or third-party embeds.

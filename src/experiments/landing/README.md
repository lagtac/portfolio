# Landing experiment — probe

Disposable probe for a new landing page for this portfolio. Not linked from the
live site; nothing in the final site may link here.

## Direction

- **Thesis:** _The blueprint of a one-person system._ Ink rules on cool drafting
  paper, one signal colour (blue) carrying data through the pipes.
- **Hero focal asset:** an authored SVG schematic of the four services and the
  two contracts between them. It is a data graphic, not decoration: the same
  information as the case-study architecture section, seen at a glance.
- **Type:** Archivo (display + body), IBM Plex Mono (labels, data, captions).
  Both loaded from Google Fonts — external request, system fallbacks in place.
- **Colour:** light `#e6eaed` paper / `#0d1418` ink / `#1b48d0` signal; dark
  `#070d12` / `#e4eaee` / `#6b8dff`. Theme toggle + `prefers-color-scheme`.
- **Section sequence:** hero + schematic → facts → selected work → method →
  evidence (metrics + ten-case table) → contact → footer.
- **Motion narrative:** the page is drafted in front of you — pipes draw, nodes
  land, then a signal starts travelling the pipeline and keeps running only
  while the schematic is on screen.

## Motion stack

- GSAP 3.12.5 + ScrollTrigger (jsDelivr).
- **Lenis 1.1.20** as the single smooth-scroll engine (chosen over Locomotive:
  lighter, first-class ScrollTrigger hook). Never both.
- `prefers-reduced-motion: reduce` bypasses GSAP and Lenis entirely; content
  renders at final state because nothing is hidden by CSS.
- **Three.js: not used.** The schematic already carries the spatial story; a
  WebGL layer would compete with it and cost the first viewport.

## Asset provenance

- Icons: Solar icon set (CC BY 4.0, via Iconify), inlined as SVG — arrow-right,
  arrow-right-up, sun-2, moon, letter, check-circle, hamburger-menu.
- Screenshots: `src/design1/img/*.webp` (own product UI), referenced by relative
  path. Nothing from `assets/` is referenced or copied here.
- All copy and numbers: `docs/CONTENT.md`. Nothing invented.

## Limitations

- GSAP, ScrollTrigger, Lenis and the fonts are CDN requests. Offline or blocked,
  the page is fully readable and navigable; only motion and the webfont go away.
- Links point at `../../design1/` because the real case study and design system
  live there. Promoting this probe means copying the images it uses.
- Schematic scrolls horizontally below 760px (min-width 860px); the scroll box
  is keyboard focusable and labelled.

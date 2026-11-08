# Portfolio — Annotated

Static portfolio for Dimitris Chrysomallis. Plain HTML, CSS, and vanilla
JavaScript. No build step, no package manager, no runtime.

## Pages

| Path | What it is |
|---|---|
| `index.html` | Home: positioning, selected work, method, evidence, contact |
| `work/diagoradisa.html` | The Diagoradisa case study |
| `about.html` | About, history, tools, learning, contact |

## Preview

From this directory:

```bash
python3 -m http.server 4175
# http://127.0.0.1:4175/
```

## Stack

- Self-hosted Instrument Sans, Instrument Serif, DM Mono, and Noto Sans Greek.
- GSAP 3 + ScrollTrigger from jsDelivr.
- Lenis 1.3 from jsDelivr, the only smooth-scroll engine.
- No Three.js: the product artifact is the focal asset; a WebGL layer would
  compete with it.

## Working documents

- `docs/DESIGN.md` — identity, tokens, components, motion, accessibility.
- `DEPLOY.md` — publish list, exclusions, launch replacements.
- `ASSETS.md` — provenance for every published image and font.
- `../../docs/CONTENT.md` — verified facts and the content model.

## Do not deploy the repository `assets/`

It holds raw screenshots, PDFs, and clinical photographs. See `DEPLOY.md`.

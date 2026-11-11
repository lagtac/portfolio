# Vendored JavaScript

These files are copied into the site so it has no runtime CDN dependency.

| File | Package | Version | Licence |
| --- | --- | --- | --- |
| `gsap.min.js` | GSAP | 3.13.0 | GSAP standard "no charge" licence: <https://gsap.com/standard-license/> |
| `ScrollTrigger.min.js` | GSAP ScrollTrigger | 3.13.0 | Same GSAP licence |
| `lenis.min.js` | Lenis | 1.3.11 | MIT |

Only Lenis is initialised as a smooth-scroll engine. ScrollTrigger is registered
with GSAP; both are skipped under `prefers-reduced-motion: reduce`.

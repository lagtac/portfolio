# Gen Z personal statement — probe

A disposable landing-page probe. Not linked from the live site; nothing in the
final site may link here. The persona is fictional.

## Direction

- **Thesis:** _A manifesto as a risograph poster._ Cream paper, one hot pink, acid
  yellow and electric violet, hard 3px ink borders and offset shadows. Loud, flat
  and deliberate — a zine cover, not a SaaS hero.
- **Hero focal asset:** the pink unicorn, a die-cut sticker sitting over a halftone
  acid disc. It is the joke _and_ the argument: the part of a life that refuses to
  be optimized.
- **Type:** Bricolage Grotesque (display), Space Grotesk (body), Space Mono
  (labels). Google Fonts, with system fallbacks.
- **Colour:** paper `#fff6ea`, ink `#120716`, pink `#ff2f92`, acid `#e4ff1a`,
  violet `#6c2bff`. Verified pairs: ink/paper 18.4:1, ink/pink 5.7:1,
  paper/violet 5.7:1, ink/acid 17.4:1.
- **Section sequence:** ticker → hero → manifesto (4 beliefs) → receipts →
  pull-quote → say hi → footer.
- **Motion narrative:** things get _stuck on_ the page — headline words rise,
  the unicorn slaps down with an overshoot, stickers pop in. Scroll reveals are
  short and snappy, never floaty.

## Motion stack

- GSAP 3.12.5 + ScrollTrigger (jsDelivr).
- **Lenis 1.1.20** is the single smooth-scroll engine (lighter than Locomotive,
  first-class ScrollTrigger hook). Never both.
- `prefers-reduced-motion: reduce` skips GSAP and Lenis; every element renders at
  its final state because nothing is hidden by CSS.
- The ticker is a CSS linear marquee, stopped under reduced motion.
- **Three.js: not used.** The poster aesthetic is flat; a WebGL layer would
  compete with the unicorn and cost the first viewport.

## Asset provenance

- **Unicorn:** silhouette from Openclipart, _Unicorn_ by liftarn
  (https://openclipart.org/detail/328759/unicorn), public domain (CC0). Original
  is a black silhouette; recoloured to `#ff2f92` and given a cream + ink die-cut
  edge with ImageMagick/Pillow. No path was authored by the model.
- Icons: Solar set (CC BY 4.0, via Iconify), inlined as SVG — arrow-down,
  arrow-up-right. The favicon is an authored asterisk brand mark.
- No people, testimonials, logos, partnerships or invented numbers are presented
  as evidence.

## Fictional persona

Mika Sol, 22, they/them. Fictional, disclosed in the footer and the meta
description. Social links point at the platform home pages, not at profiles. The
`mailto:` address uses the reserved `.example` domain, so it cannot receive mail;
the page says so.

## Limitations

- GSAP, ScrollTrigger, Lenis and the fonts are CDN requests. Blocked or offline,
  the page is fully readable; only motion and webfonts go away.
- The unicorn PNG is a single raster; there is no photo or video media.

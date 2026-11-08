# Portfolio design plan

Date: 2026-11-08
Status: Phases 1–5 executed in `src/design2/`. Phase 6 is prepared but not
deployed. The direction contract is
`docs/plans/2026-11-08-portfolio-direction.md`.

## 1. Goal

Build a professional portfolio from scratch. It must win a first conversation
with hiring managers and tech leads for a fullstack role.

## 2. Settled decisions

- **Audience and outcome.** Hiring managers and tech leads. The site proves
  end-to-end full-stack depth and earns a first conversation.
- **Scope.** Diagoradisa is the deep case study. The work index is text-only:
  Waypoint, KPMG, EPIS as honest text cards. No invented screenshots.
- **Direction energy.** Bold concept, disciplined finish. Visitor mode is
  Experience: the artifact leads, the interface recedes.
- **Stack.** Plain HTML, CSS, and vanilla JavaScript. No build step, no package
  manager, no runtime. GSAP and any smooth-scroll engine load from CDN.
- **Identity.** Dimitris Chrysomallis. Public email `dxrysom@gmail.com`.
- **Content.** `docs/CONTENT.md` is the source of truth for copy and verified
  numbers. Never edit a verified number.
- **Assets.** `./assets/` holds the Diagoradisa material (screenshots, the
  Palmist 10-case clinical test, PDFs).
- **Old site.** `src/design1/` is an anti-reference, not a template.

## 3. Skill availability

The following design skills are no longer available and are not part of this
plan: `impeccable`, `animate`, `better-writing`, `better-accessibility`,
`better-colors`, `better-interface`, `better-layout`, `better-typography`,
`better-ui`, `interface-review`, `web-design-guidelines`.

What remains that applies to this portfolio:

- `build-awwwards-quality-sites` (build) — art direction, honest asset system,
  hero, motion system, optional Three.js, quality bar, validation.
- `emil-design-eng` (build) — motion decisions and polish.
- `prototype`, `variant`, `state-machine`, `break` (build) — optional,
  throwaway exploration only.

Gaps with no available skill:

- **Formal design-system capture (DESIGN.md, tokens).** Nearest: the art
  direction step of `build-awwwards-quality-sites`, written as a direction doc.
- **Whole-screen or diff review.** Nearest: the manual check in `AGENTS.md`
  (axe-core and Playwright against the preview server).
- **Dedicated interface-copy skill.** Copy stays in `docs/CONTENT.md`.

## 4. Phases

### Phase 1 — Direction and style guide (build-owned)

Skill: `build-awwwards-quality-sites`, Step 1 (Set the art direction).

Produce a written direction before any code:

- visual thesis
- hero focal asset
- type hierarchy
- color system
- section sequence
- motion narrative
- chosen smooth-scroll engine (Lenis or Locomotive, exactly one)
- Three.js decision (yes or no, with a reason)
- asset provenance plan

Deliverable: a direction/style-guide doc. This is the closest available
substitute for a formal design system. It becomes the build's contract.

### Phase 2 — Build (build-owned)

Skill: `build-awwwards-quality-sites`, Steps 2–7.

- Honest asset system from `./assets`.
- Composed GSAP hero; nav, message, and CTA readable before the animation ends.
- One smooth-scroll engine, connected to ScrollTrigger, destroyed on cleanup.
- Three.js only if it supports the direction; static poster otherwise.
- Complete semantic page: responsive nav, section progression, contact CTA,
  footer, visible keyboard focus.
- Reduced-motion, no-JS, and static-media fallbacks.
- Responsive media, lazy loading below the fold, capped canvas work.

Content from `docs/CONTENT.md`. The never-publish list stays closed.

### Phase 3 — Motion polish (build-owned)

Skill: `emil-design-eng`.

Review the motion decisions, tighten timing and easing, and remove motion with
no narrative role. Keep the single smooth-scroll engine.

### Phase 4 — Review (gap)

No review skill is available. The nearest path is the manual check in
`AGENTS.md`: axe-core and Playwright at 390, 768, and 1440 px, plus keyboard
and reduced-motion behavior. Report failures; do not claim a pass from a
partial run.

### Phase 5 — Capture (gap)

No design-system capture skill is available. The nearest path is to write
`DESIGN.md` by hand from the built CSS, modelled on the format already in
`src/design1/docs/DESIGN.md`. Tokens are normative; prose explains use.

### Phase 6 — Deploy

Model the publish list on `src/design1/DEPLOY.md`. Never publish `assets/` in
any form, `docs/`, or the logged-in screenshot
`assets/Screen Shot 2026-09-18 at 08.01.12.png`.

## 5. Open decisions

Resolved on 2026-11-08:

- Visual world: **Annotated**, confirmed.
- Availability and location: **Athens, Greece or remote**, confirmed.
- Second-pass probes: none before the first review.

## 6. Verification

- Run `build-awwwards-quality-sites` Step 7: production build, desktop and
  mobile checks, keyboard and focus, reduced motion, one smooth-scroll engine.
- axe-core and Playwright at 390, 768, and 1440 px.
- Bump the `?v=` version on CSS and JS links after editing them.
- Confirm asset provenance and the never-publish list before publishing.

## 7. Out of scope

- Copying the full `diagoradisa` repository into this project.
- Adding a build step or package manager.
- Publishing clinical source material.

## 8. Execution record

Date: 2026-11-08

- Phase 1 confirmed by the user: "Annotated" direction, single dark theme,
  Athens or remote, cropped UI derivatives only.
- Phase 2 built in `src/design2/`: home, Diagoradisa case study, About.
- Phase 3 applied: one GSAP intro, word reveals, one scrubbed confidence chart,
  CSS hover and focus, reduced-motion fallback.
- Phase 4 checked: axe-core WCAG 2.1 AA zero violations at 390, 768, and
  1440 px on all three pages; keyboard order, skip link, no-JS, reduced motion,
  console, image loading, and horizontal overflow checked with Playwright.
- Phase 5 written: `src/design2/docs/DESIGN.md`.
- Phase 6 prepared: `src/design2/DEPLOY.md`, publish list, exclusions, cache
  busting, and launch replacements.
- Asset provenance recorded in `src/design2/ASSETS.md`.

Not done: deployment, a custom domain, canonical URLs, and `robots.txt` /
`sitemap.xml`, which need the domain.

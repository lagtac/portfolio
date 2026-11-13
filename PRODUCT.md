# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain static HTML, CSS, and vanilla JavaScript. No build step, no framework.
Decided in `docs/adr/0001-design3-plain-html-not-react.md`.

## Users

Hiring managers and recruiters filling fullstack web roles, plus technical leads
screening candidates. They arrive from a CV, a referral, or a search, skim for
evidence in under a minute, and want to know whether Dimitris can own a real
system end to end.

## Product Purpose

A public, three-page portfolio that gets Dimitris a fullstack job by showing
delivered work with verified evidence. Success: a visitor opens the Diagoradisa
case study or reaches the contact block, because the evidence is credible — not
because the page is pretty.

## Positioning

"One layer above the plumbing." The differentiator is a generalist who owns a
whole system — the product calls, the architecture and the visual language
— rather than one tool or one layer. The arc behind it is long and
consistent: philosophy, then cognitive science, then software since 2004 — ASP
and SQL Server at EPIS, nine years of KPMG's web estate, a music company he
founded and ran, and a four-service clinical AI platform built alone with agentic
tooling. He documents the failures alongside the wins, and moves down a layer
when the detail matters, but plumbing is not his main trait. On the contrary,
he is empathetic, curious, wants to understand the product, not just the
architecture.

## Operating Context

Dimitris is between roles and learning TypeScript, React, and Next.js. The site
is his primary job-search surface: English only, public, deployed to GitHub
Pages. Work is judged on shipped features and the diversity of tasks.
The canonical CV lives at `~/src/cv/cv-en.html`; a copy is published as
`src/design3/cv/cv.html` with Faltso at 2019–2024. Keep the two in step.

## Capabilities and Constraints

- Five pages at launch: home, `work/oral-pathology-platform.html`,
  `work/faltso.html`, `work/kpmg.html`, `about.html`. The `docs/CONTENT.md` IA
  also lists `/design/`; it is not in the launch scope.
- Three cards at launch: the oral pathology platform, Faltso Art, and the Content
  Management position, each linking to its own page.
- One dated "Now" block for the TypeScript/React transition on home and about. No
  claim beyond what is built.
- Diagoradisa numbers, dates, and names come only from `docs/CONTENT.md`. The
  ten-case clinical test is a product test, not a validation study, and must be
  labelled as such wherever the numbers appear.
- KPMG: no metric not backed by the inventory; no KPMG or client brand,
  screenshot, credential, or PII.
- Location line: "Athens, Greece", decided 2026-11-11.
- Go-to-market: public this month on GitHub Pages; custom domain versus
  `github.io` is undecided.

## Brand Commitments

Name: Dimitris Chrysomallis (published spelling). Voice: plain, specific,
evidence-led, dry. No hype and no adjectives standing in for facts. English only;
Greek disease names appear as data and must render in the correct face.

The platform name is withheld from the site. Its public title is "Oral pathology
imaging platform", and the services are named descriptively: annotation tool,
model server, clinician app, deployment. The name stays in this document and in
`docs/CONTENT.md` for traceability, never in published copy or a URL.

Visual direction: the conventional developer portfolio, played straight. No
governing metaphor, no costume, no smuggled quirk. The craft bar is the strongest
personal dev portfolios (brittanychiang.com, leerob.io, joshwcomeau.com) plus the
plain category canon: type-led, evidence-forward, one accent, real product proof.
Chosen 2026-11-10 when the concept roll's standing exit was taken.

## Evidence on Hand

- Diagoradisa: four-service clinical AI platform, Jul 2025 – Oct 2026, sole
  developer, 1,629 commits. Verified metrics, architecture, three documented
  failures, and a ten-case clinical test in `docs/CONTENT.md`.
- Product screenshots: annotator editor, image browser, ML-readiness dashboard,
  Palmist upload and results, and ten case/PDF pairs under `assets/`. Raw material
  is never published; cropped derivatives only.
- KPMG Greece 2010–2018: nine selected projects with qualitative outcomes,
  inventory at `docs/kpmg-2010-2018-inventory.md`.
- Faltso Art 2019–2024: a music and theatre group for children that he
  co-founded with Daphne Kammenou and ran, with schools and parents'
  associations. Four programmes, an original musical, and the site at
  `https://lagtac.github.io/faltso.org/about.html` (public, 76 commits,
  Jekyll 3.8.6, Tailwind). Photographs from the group's own site may publish,
  with the families' consent, copied into `src/design3/img/` as WebP (ADR 0002).
  The `faltso.gr` domain is a third-party for-sale page; never link it. No
  enrolment or revenue figures exist; do not invent them.
- Delivery method: the platform was built solo with Claude Code — parallel
  agents across the four repositories, plus vendor and custom skills. The
  1,629 commits are authored by Dimitris. No percentage of agent-written code
  has been measured; do not claim one.
- Education: BS Philosophy, Aristotle University of Thessaloniki, 1994–1999;
  MS Cognitive Science, National and Kapodistrian University of Athens,
  2001–2003, thesis _Methods in Cognitive Musicology_.
- Absent and must not be fabricated: testimonials, client logos, customer counts,
  revenue, benchmarks beyond CONTENT.md, or any KPMG brand asset.

## Product Principles

1. Evidence over adjectives. Every claim carries a number, a date, a commit, or a
   shipped artifact.
2. Show the failure. Dead ends and removed features are part of the argument, not
   a footnote.
3. Own the whole system. The story is one developer across four services, not a
   list of tools.
4. Say only what is built. The TypeScript/React transition is dated
   work-in-progress, never delivered experience.
5. Publish nothing private. `assets/` and `docs/` never ship; confidentiality is
   structural, not a setting.
6. Craft serves evidence. Motion and detail are allowed, but never at the cost of
   legibility, speed, or a claim. The page earns trust by being readable, not by
   being animated.

## Accessibility & Inclusion

WCAG 2.1 AA is a hard floor at 390, 768, and 1440 px in both themes (light and
dark, defaulting to the OS preference), checked with axe-core. Keyboard
operability, visible focus, reduced-motion paths, and correct Greek language
tagging are required.

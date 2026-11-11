# Guide: improving UX and copy with `impeccable` on `src/design3`

Date: 2026-11-11
Scope: the About page (`src/design3/about.html`) first, then the home page.
Target: UX clarity and copy, inside the existing "Plain Record" world in
`src/design3/docs/DESIGN.md`.

## Purpose

`impeccable` is the design director. It diagnoses against a heuristic score,
then applies targeted fixes. It preserves the incumbent identity, behavior,
and good copy. It refuses shadows, glass, gradients, and the SaaS hero.

The About page is **Read** mode: the visitor is trying to understand who
Dimitris is. Structure for comprehension, then make the reading worth it.

## Prereq: one context load per session

Run once before any edit:

```
impeccable context --target src/design3/about.html
```

It loads `PRODUCT.md`, `DESIGN.md`, and the surface brief, and sets the mode.
Every fix below must respect those files. Do not rerun it.

## Phase 1 — Diagnose before touching anything

### Step 1 — Critique

```
impeccable critique src/design3/about.html
```

Returns a scored list: hierarchy, clarity, findability, copy. It ranks the
issues, so fix the worst first. Expected flags:

- The `<h1>` "Dimitris Chrysomallis" duplicates the header brand.
- The `record` aside and the prose column compete for attention.
- "How I got here" is seven dense paragraphs with no waypoints.

### Step 2 — Audit

```
impeccable audit src/design3/about.html
```

Runs axe-core at 390, 768, and 1440 px in both themes. Checks focus rings,
reduced-motion, and the Greek `lang="el"` tags. Enforces the WCAG 2.1 AA floor
in `PRODUCT.md`.

### Step 3 — Rank

Keep a short list. Cross out what is already fine. The contact copy
("Tell me what you're building.") is good; leave it.

## Phase 2 — Fix the copy

### Step 4 — Clarify

```
impeccable clarify src/design3/about.html
```

Rewrites UX copy, labels, and CTAs for a skimming reader. See the worked
examples below.

### Step 5 — Distill

```
impeccable distill src/design3/about.html
```

Strips redundancy. Pulls the shared role out of the nine KPMG rows and
tightens the "What it shows" note (line 225).

## Phase 3 — Fix layout and type

### Step 6 — Typeset

Run `impeccable typeset` on the page. Tunes the `about-subhead` to body
spacing and the Archivo / Azeret Mono split so numbers and dates pop. Keep
the prose measure at or below 68 characters.

### Step 7 — Layout

Run `impeccable layout` on the page. Fixes the `about-grid` rhythm so the
`record` aside and the prose column do not compete.

### Step 8 — Adapt

Run `impeccable adapt` on the page. Verifies the grid collapses cleanly below
desktop and that the record does not bury the lead on a phone.

## Phase 4 — Verify and version

### Step 9 — Re-audit

Re-run `impeccable audit` after every colour or layout change. Never report
success from a partial run.

### Step 10 — Bump the cache

Increment `?v=` on the CSS/JS links you touched. On the About page those are
`tokens.css`, `site.css`, and `js/site.js` (lines 30–32 and 265–268).

## Phase 5 — Motion, only if it earns it

### Step 11 — Animate (optional)

Run `impeccable animate` on the page. The site already loads GSAP +
ScrollTrigger + Lenis. Add only motion that serves evidence. DESIGN.md line
386 forbids anything that slows a claim.

## Worked copy examples

These are the kind of changes `clarify` / `distill` would make. They are
illustrative, not approved rewrites.

### 1. The lead (line 72) — a 48-word run-on

Before:

> "Fullstack engineer. I have built software since 2004, from ASP against SQL
> Server to a four-service platform built alone with agentic coding. The
> constant is owning the whole job, not one layer of it."

Problem: the opener repeats the header brand; the middle clause is a run-on.

After:

> "Building software since 2004 — from ASP on SQL Server to a four-service
> clinical platform built alone with agentic coding. The constant is owning
> the whole job, not one layer of it."

### 2. "How I got here" (lines 105–114) — no waypoints

Seven dense paragraphs in one block. Split into a job-by-job arc with a mono
year label; EPIS (2004–2009), KPMG (2010–2018), Faltso (2019–2024), the
platform (2025–2026). A skimming recruiter then reads the 20-year span at a
glance.

### 3. KPMG rows (lines 151–224) — repeated role

"Content Manager;" appears in nine rows. Pull the shared role into one label
and leave each row with title + outcome. Cuts roughly 40 words of noise.

### 4. The contact block — preserve

"Tell me what you're building." and "A short description of the problem is
more useful than a job title." are already strong, dry, and specific.
Impeccable's refinement rule keeps them.

## What not to do

- Do not add a shadow, blur, glass, or gradient (DESIGN.md line 390).
- Do not put a tracked uppercase eyebrow above an oversized headline.
- Do not turn About into a Persuade page; it is Read.
- Do not edit a verified number. Copy lives in `docs/CONTENT.md`.

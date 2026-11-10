# Guide: using `impeccable` with `build-awwwards-quality-sites`

Date: 2026-11-09
Reference guide for the portfolio build. Two questions and their answers.

## Q1. How do I use `impeccable` in tandem with `build-awwwards-quality-sites`?

`impeccable` is the director; `build-awwwards-quality-sites` is the builder.
Run impeccable before and after, and awwwards in the middle.

### The sequence

1. **`impeccable init`** — write `PRODUCT.md`. Product truth only: audience,
   job, positioning, evidence, constraints. No visuals yet.
2. **`impeccable shape`** — discovery plus `new-work`. The visual world is
   chosen here (the concept-seed roll), and it returns a direction contract
   and surface brief.
3. **`impeccable document --seed`** — write the seed `DESIGN.md`, the
   style-guide. Optional, and a deliberate choice: see the caveat below.
4. **`build-awwwards-quality-sites`** — build the site to that direction.
   GSAP hero, one smooth-scroll engine, honest asset system, optional Three.js,
   validation. Its "Set the art direction" step reads the direction impeccable
   already chose; it does not invent a rival.
5. **`impeccable critique` / `audit` / `polish`** — review the built site
   against the direction contract.
6. **`impeccable document`** (scan mode) — carbonize the real tokens into
   `DESIGN.md` and `.impeccable/design.json`, replacing the seed.

### The one place they fight

Art direction. Resolve it by making impeccable's chosen world and `DESIGN.md`
the authority, and awwwards' step 1 a consumer of it, not a rival.

### If you skip the ceremony

`build-awwwards-quality-sites` alone already does direction plus build in its
step 1. But you lose the durable `DESIGN.md`/tokens and the review discipline.
That is what impeccable adds.

### Caveat

Impeccable's own doctrine prefers writing `DESIGN.md` at finish from the built
world, not as a pre-build seed. Step 3 is your call: seed it early if you want
the style-guide first, or let step 6 produce it from reality.

## Q2. What can `impeccable` do, and how do I invoke it?

### Command groups

- **Build** — `init` (capture product truth in `PRODUCT.md`), `shape` (plan
  UX/UI before code), `document` (generate `DESIGN.md` from existing code),
  `extract` (pull tokens/components into the system). `craft` is a deprecated
  alias.
- **Evaluate** — `critique` (UX review with scoring), `audit` (a11y, perf,
  responsive).
- **Refine** — `polish`, `bolder`, `quieter`, `distill`, `harden`, `onboard`.
- **Enhance** — `animate`, `colorize`, `typeset`, `layout`, `delight`,
  `overdrive`.
- **Fix** — `clarify`, `adapt`, `optimize`.
- **Iterate** — `live` (in-browser variant picking), `generate` (named-element
  variants).

### Invocation

- `impeccable` with no argument → a context-aware menu of the 2–3 highest-value
  next commands. It never auto-runs; you confirm.
- `impeccable <command> [target]` → runs that command.
- `teach` aliases `init`. `impeccable doctor` reports drift between its
  artifacts.

### Setup

First use in a session runs `impeccable context`, which loads `PRODUCT.md`,
`DESIGN.md`, and surface briefs. If it reports `NO_PRODUCT_MD`, the top
recommendation becomes `impeccable init`.

### Starting point for this project

The portfolio is greenfield with no `PRODUCT.md` yet. The lead is
`impeccable init` (product truth), then `shape` (discover the direction).

Full workflow guide: <https://impeccable.style/docs/>

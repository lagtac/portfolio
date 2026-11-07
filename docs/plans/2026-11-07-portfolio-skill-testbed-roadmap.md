# Portfolio as skill testbed — roadmap

## Context

`~/projects/portfolio` is not a normal portfolio project. It has three jobs:

1. A testbed for individual design skills.
2. A testbed for the `/my/design` skill router.
3. A source of at least one finished portfolio site.

The current repository is the output of the `Diagoradisa portfolio site` session
(`ses_e5dfaa435ffeoNmbzqnZmcJqFc`). That session produced a complete "Case Record"
site under `src/design1/`: home, About, the Diagoradisa case study, and a design
system reference page. The design was never approved. A later planning session
(`ses_e5d71c018ffeqTZwqQjz49kWnQ`) proposed an "instrument panel" direction but no
direction was chosen and nothing was implemented.

The repository history starts at the `design1` baseline import; the "Case Record"
site and its verified research landed as the first commit.

Two things are therefore true at once:

- The **research is valuable**. `docs/CONTENT.md` holds verified metrics, a sourced
  timeline, a service model, a ten-case clinical test table, and three documented
  failures. Rebuilding that from scratch would be waste.
- The **visual identity is disposable**. The old look is evidence and an
  anti-reference, not a starting point.

## Goal

Run design work as a sequence of experiments, promote only what survives, and
finish with at least one portfolio site built from promoted material.

The rule that keeps the three jobs compatible: **experiments are disposable, the
evidence is not, and the final site only consumes promoted artefacts.**

## Salvage boundary

### Keep as working documents

- `docs/CONTENT.md` — verified facts, content model, information architecture.
- `src/design1/README.md` — static-site constraints and preview command.
- `src/design1/TODO.md` — unresolved factual and launch questions.
- `src/design1/DEPLOY.md` — publish list, exclusions, source corrections.
- `src/design1/docs/DESIGN.md` — the discarded "Case Record" identity, kept as
  an anti-reference.

### Keep as raw material

Already in `assets/` (54 MB):

- `palmist-ui-2026-11-03/reports/` — 10 clinical result PDFs.
- `palmist-ui-2026-11-03/screenshots/` — 20 clinical result screenshots
  (10 full, 10 `-top` crops).
- `palmist-ui-2026-11-03/RESULTS.md` — the ten-case table.
- Annotator, ML-readiness, and Palmist screenshots at the `assets/` root.
- Two dated `Screen Shot` files.

### Copy in from `~/projects/diagoradisa` (17 GB, do not copy wholesale)

```text
diagoradisa-platform/project-history-summary.md
diagoradisa-platform/docs/architecture.md
diagoradisa-ml/docs/experiment-log/2026-06-14-yolo-min150-640px-bg-20260614.md
diagoradisa-annotator/ROADMAP.md
diagoradisa-annotator/CHANGELOG.md
diagoradisa-ml/ROADMAP.md
diagoradisa-ml/CHANGELOG.md
diagoradisa-palmist/ROADMAP.md
diagoradisa-palmist/CHANGELOG.md
diagoradisa-palmist/docs/plans/2026-04-22-design-foundation.md
diagoradisa-platform/docs/presentation/index.html
diagoradisa-platform/docs/presentation/diagrams/*.svg
diagoradisa-platform/docs/presentation/assets/diagoradisa-logo.png
```

Destination:

```text
assets/source/diagoradisa/
assets/source/presentation/
```

### Never publish

- `assets/` in any form, including `assets/source/`.
- `docs/`.
- `assets/Screen Shot 2026-09-18 at 08.01.12.png`, which shows a logged-in account.

`src/design1/DEPLOY.md` already states the publish list. Any experiment directory must sit
outside that list.

## Phases

### Phase 1 — Skill probes

Issue one narrow task per skill. The point is to learn what each skill actually
generates, not to produce anything shippable.

Each probe records a short entry:

| Field | Content |
|---|---|
| Target | File, page, or component the skill ran against |
| Skill or router path | Exact command or skill ID used |
| Output | Screenshot path, diff, or file produced |
| Verdict | Worked / partly worked / failed |
| Reusable | Yes / no, and which part |

Suggested probe order, cheap to expensive:

1. Typography.
2. Color and contrast.
3. Layout and spacing.
4. Writing and interface copy.
5. Motion.
6. Accessibility.
7. Responsive adaptation.
8. Full interface review.
9. `/my/design` router end-to-end.

Constraints for every probe:

- Run against a copy, never against the candidate final pages.
- Do not edit `docs/CONTENT.md` or any verified number.
- Record the output path before starting.

### Phase 2 — Larger structures

Combine surviving probes into reusable structures:

- page shells and navigation
- hero treatments
- project cards and work index
- case-study section patterns
- data displays (metrics grid, ten-case table, confidence strip)
- responsive and motion patterns
- token layer
- accessibility conventions

A structure is promoted only when it passes the evaluation criteria below. The
old `src/design1/` site is a reference library here, not a template.

### Phase 3 — Whole sites

Build at least one complete site from promoted structures. Each site is evaluated
on:

- visual distinction from the current "Case Record" look
- clarity of the hiring-manager and tech-lead reading path
- truthful numbers traceable to `docs/CONTENT.md` or a primary source
- responsive behaviour at 390, 768, and 1440 px
- keyboard and screen-reader accessibility
- performance without a build step
- asset provenance and privacy
- maintainability with plain HTML, CSS, and minimal JavaScript

### Phase 4 — Final portfolio

Select the strongest site, close its open items from `src/design1/TODO.md`, and
ship it. Likely final structure stays static, with its own publish list modelled
on `src/design1/DEPLOY.md`.

## Directory conventions

```text
docs/plans/            written plans (this file)
docs/CONTENT.md        verified facts and IA
assets/                raw private material, never published
assets/source/         copied primary sources, never published
src/design1/           previous site, reference only
src/experiments/       disposable probe output
```

`src/experiments/` is disposable by definition. Nothing in the final site may
link to it.

## Open questions

- Which visual direction replaces "Case Record"? The earlier proposal was an
  instrument-panel direction; it was never confirmed.
- Name spelling: Chrysomalis or Chrysomallis.
- Public contact email to replace `dchrysomallis@bookscanner.gr`.
- Whether the availability and location lines stay as written.
- Which probe failures are worth a second pass, if any.

## Out of scope

- Copying the full `diagoradisa` repository into this project.
- Adding a build step or package manager.
- Publishing clinical source material.

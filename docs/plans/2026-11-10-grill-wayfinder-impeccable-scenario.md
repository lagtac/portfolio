# Scenario: grill-with-docs → impeccable → awwwards, then maintain

Date: 2026-11-10 (updated)

A worked example of the corrected process. The **decision layer** is
`grill-with-docs`; the **delivery layer** is `impeccable` →
`build-awwwards-quality-sites`; the **maintain layer** is the execution loop.
No wayfinder map — for a single static portfolio it is a phase you skip, not a
lifecycle you keep.

The rule it demonstrates: one interviewer owns the decisions; the generative
skills produce the visual answer and the artifact at the points the process
hands them the work; the loop closes on files.

---

## Stage: a loose idea

> "I want a portfolio that gets me a fullstack job."

## Decide — `grill-with-docs`

> The agent runs the decision interview as a design tree, one frontier per
> round. It writes ADRs and `GLOSSARY.md` as decisions land.
>
> ❓ **Q1 — Audience**: who is this for?
> ➡️ Hiring managers + tech leads evaluating you for a fullstack role. Yes?
> **Dimitris:** yes.
>
> ❓ **Q2 — Scope**: single flagship or multi?
> ➡️ Diagoradisa deep, plus a text-only index. Yes?
> **Dimitris:** yes.
>
> ❓ **Q3 — Energy**: how bold?
> ➡️ Bold concept, disciplined finish. Yes?
> **Dimitris:** yes.
>
> A research subagent reads `docs/CONTENT.md`, `./assets`, and
> `~/src/cv/cv-en.html`: only Diagoradisa has evidence; the name is
> "Chrysomallis"; the email is `dxrysom@gmail.com`. Facts recorded, not asked.

## Build — `impeccable` then awwwards

> `impeccable init` writes `PRODUCT.md` (product truth, no visuals).
>
> `impeccable shape` runs discovery + `new-work`. The concept-seed roll deals
> three directions; a decision page shows full cards.
>
> 🎴 **THE ROLL** — _Field Notebook_ (clinician's record), _Signal Panel_
> (diagnostic dashboard), _Quiet Monograph_ (editorial case study).
>
> **Dimitris:** _Signal Panel_ — the instrument-panel read of the work.
>
> `impeccable document --seed` writes the seed `DESIGN.md`: the _Signal Panel_
> world, palette strategy, type character, motion grammar.
>
> `build-awwwards-quality-sites` builds to that direction — GSAP hero, one
> smooth-scroll engine, honest assets from `./assets`, keyboard and
> reduced-motion fallbacks. Its "Set the art direction" step _reads_ the
> direction instead of inventing one.
>
> `impeccable document` (scan) carbonizes the real tokens into `DESIGN.md`.

## Maintain — the execution loop, later sessions

> **Retro** walks the finished build: what shipped, one open question (deploy).
>
> **Optimize** — "the hero is slow": `impeccable optimize` diagnoses, or the
> change becomes a ticket → `implement`.
>
> **Bug** — "the nav breaks at 390px": `triage` reproduces and confirms, then
> a `ready-for-agent` ticket → `implement` with `tdd` at the seams.
>
> **Refactor** — `to-tickets` breaks it into tracer bullets; a wide change uses
> expand–contract. Then `implement`.
>
> **Redesign** — back to Build, tracked as a ticket on the same tracker.

---

## What to notice

- **One interviewer.** `grill-with-docs` owns the decisions. Impeccable answers
  visual calls inside the build stage; it does not re-interview from scratch.
- **No wayfinder map here.** It earns its place only when decisions span many
  sessions in fog. The tracker + files are the spine, not the map.
- **Close on files.** ADRs, `GLOSSARY.md`, `PRODUCT.md`, `DESIGN.md`. The next
  session resumes from those, not from conversation.

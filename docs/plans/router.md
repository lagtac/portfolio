# Skill router — the process

One line: route every task through three stages — **Decide → Build → Maintain**.
Each stage owns its skills; the tracker and the design docs are the durable record.

## Stage 1 — Decide

Figure out what to build and which decisions matter.

- `grill-with-docs` — the decision interview (grilling + domain-modeling). Writes ADRs and `GLOSSARY.md` as you go.
- `wayfinder` — only when the route is foggy and decisions span sessions. Charts a map of decision tickets.

Outputs: ADRs, `GLOSSARY.md`, and (if used) the wayfinder map.

Handoff to Stage 2: `impeccable init` reads the ADRs and `GLOSSARY.md` as its
product evidence and re-asks only material gaps — it does not start the
interview over. The visual energy/concept decision feeds `shape` → `new-work`
(the concept roll), not `init`, which takes no visual direction.

## Stage 2 — Build

Turn the decisions into a direction, a design system, and a built site.

- `impeccable init` → `shape` → `document --seed` — direction + style-guide.
- `build-awwwards-quality-sites` — build the site to that direction.
- `impeccable document` (scan) — carbonize the real tokens into `DESIGN.md`.

## Stage 3 — Maintain

Optimize, refactor, debug, and redesign, tracked on the same tracker.

- New feature / optimization → `to-spec` → `to-tickets` → `implement`.
- Bug → `triage` (reproduce, confirm) → `implement`.
- Refactor → `to-tickets` (wide changes use expand–contract) → `implement`.
- Redesign → back to Stage 2, tracked as a ticket.
- End each session → `retro`; bridge with `handoff` when needed.

## Rules

1. **One interviewer.** Pick one decision owner; don't let two skills grill the same questions.
2. **Ticket type picks the skill.** research → facts, grilling → decision, prototype → artifact, task → build.
3. **The tracker is the spine.** Wayfinder is a phase you retire once the route is clear, not the forever mechanism.
4. **Close the loop on files.** `DESIGN.md`, ADRs, and `GLOSSARY.md` are what the next session resumes from.

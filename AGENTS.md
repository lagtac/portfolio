# Portfolio — project rules

Static portfolio site for Dimitris Chrysomallis. Multiple design candidates.

## Stack

- Plain HTML, CSS, JavaScript.
- pnpm package manager for scaling up in the future with react components.
- Preview a static site from `src/`: `python3 -m http.server 4175`.
- `src/design{1,2}/` are for reference only. they were built with no special provsions or skills.

## Directory map

- `docs/plans/router.md` - skill routing guidance for agents.
- `docs/plans/` — written plans.
- `docs/CONTENT.md` — source of truth for copy and numbers. Never edit a verified number.
- `assets/` and `assets/source/` — raw private material. Never publish.
- `src/design1/` — Reference only, not a template. It reflects what to avoid.
- `src/designX/` — Candidate design. X out of N.
- `src/experiments/` — disposable probes. Nothing in the final site may link to it.

## Never publish

- `assets/` in any form, including `assets/source/`.
- `docs/`.

## Verify

Run axe-core and Playwright against the review server, re-run after any colour or layout change, and bump the `?v=`
version on CSS/JS links after editing them. Model the final publish list on `src/design1/DEPLOY.md`.

## Agent skills

### Issue tracker

Issues and specs live as markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical roles use their default strings: `needs-triage`, `needs-info`,
`ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Skill division

`impeccable` (designer) is the director: direction, design system, refinement,
review. `build-awwwards-quality-sites` (build) is the specialist builder for the
premium/motion-rich portfolio. Complementary, not interchangeable — see
`docs/plans/2026-11-09-impeccable-awwwards-guide.md`.

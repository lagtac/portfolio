# Portfolio — project rules

Static portfolio site for Dimitris Chrysomallis. Also a testbed for individual
design skills and the `/my/design` router, and the source of at least one
finished site.

## Stack

- Plain HTML, CSS, minimal JavaScript. No build step, no package manager, no runtime.
- Preview the current build from `src/design2/`: `python3 -m http.server 4175`.
- `src/design1/` is the previous site, reference only.

## The one rule

Experiments are disposable, evidence is not, and the final site only consumes
promoted artefacts. Run design work as probes; promote only what passes.

## Directory map

- `docs/plans/` — written plans.
- `docs/CONTENT.md` — source of truth for copy and numbers. Never edit a verified number.
- `assets/` and `assets/source/` — raw private material. Never publish.
- `src/design1/` — previous site. Reference only, not a template.
- `src/design2/` — current build, the "Annotated" direction.
- `src/experiments/` — disposable probe output. Nothing in the final site may link to it.

## Never publish

- `assets/` in any form, including `assets/source/`.
- `docs/`.
- `assets/Screen Shot 2026-09-18 at 08.01.12.png` (shows a logged-in account).

## Verify

There is no package.json. Check by hand: run axe-core and Playwright against the
preview server, re-run after any colour or layout change, and bump the `?v=`
version on CSS/JS links after editing them. Model the final publish list on
`src/design1/DEPLOY.md`.

## Agent skills

### Issue tracker

Issues and specs live as markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical roles use their default strings: `needs-triage`, `needs-info`,
`ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

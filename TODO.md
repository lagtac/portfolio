# TODO

Short-lived tasks for the portfolio. Roadmap-level features stay in a roadmap,
not here.

Handoff note: `impeccable init` reads the grill output — `docs/adr/` and
`GLOSSARY.md` — as its product evidence, per `docs/plans/router.md`. It re-asks
only material gaps; it does not restart the interview. The concept and visual
energy decision belongs to `shape` → `new-work` (the concept roll), not `init`.

## design3

- [x] Decide `PRODUCT.md` location: repo root
- [x] `impeccable init` → `PRODUCT.md` at the repo root, from the ADRs and `GLOSSARY.md`
- [x] `impeccable shape` → conventional developer portfolio, chosen via the standing exit
- [x] `build-awwwards-quality-sites` → build `src/design3/`: home,
  `work/oral-pathology-platform.html`, `about.html`
- [x] Write `src/design3/docs/DESIGN.md` and `src/design3/DEPLOY.md`
- [x] Add the dated "Now" block on home and about
- [ ] Stage `src/design3/` with `rsync` and publish via GitHub Pages
  (workflow and staging command prepared; no git remote in this checkout)
- [x] Run `pnpm test` (axe, 390/768/1440) and drive the pages with Playwright
- [x] Re-run axe and Playwright after any colour or layout change

## Deferred

- [ ] Buy a domain or accept `github.io`
- [ ] Add the Waypoint card when it is deployed
- [ ] Add the zitamu card when the client clears the name

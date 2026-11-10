# design3 — the destination portfolio

Date: 2026-11-10
Status: decided. Route settled by `grill-with-docs`; visual direction belongs to
`impeccable`.

One line: a third, publishable candidate that gets Dimitris a fullstack job. Not
another comparison piece — the site that ships.

## Decision record

| #   | Decision   | Value                                                                                                                      |
| --- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| 1   | Audience   | Broad fullstack, evidence-led. Diagoradisa + KPMG carry the argument.                                                      |
| 2   | Standing   | `src/design3/` is the **destination**. design1/design2 stay as reference, not deleted.                                     |
| 3   | Scope      | Three pages, the `docs/CONTENT.md` IA: home, `work/diagoradisa.html`, `about.html`.                                        |
| 4   | Live       | Public this month, on GitHub Pages.                                                                                        |
| 5   | Stack      | Plain HTML, CSS, vanilla JS. No build step.                                                                                |
| 6   | Direction  | Delegated to `impeccable shape` → `build-awwwards-quality-sites`. One interviewer only.                                    |
| 7   | Transition | One dated "Now" block on home and about. Links Waypoint when it ships. No claims beyond what is built.                     |
| 8   | Cards      | Two at launch: Diagoradisa, KPMG. Incoming: Waypoint (public), zitamu (confidential).                                      |
| 9   | Theme      | Delegated. Floor: axe WCAG 2.1 AA at 390 / 768 / 1440 in every theme offered.                                              |
| 10  | Motion     | Restrained. Motion explains the system or the evidence. Reduced-motion path mandatory. GSAP plus one smooth-scroll engine. |
| 11  | zitamu     | Confidential. Role statement only; product name withheld until the client clears it.                                       |
| 12  | Host       | GitHub Pages. Publish list modelled on `src/design1/DEPLOY.md`.                                                            |

Answers to the interview that produced these: Q1 C, Q2 destination, Q3 three
pages, Q4 live, Q5 plain, Q6 delegate, Q7 b, Q8 two plus two incoming, Q9
delegate, Q10 restrained, Q11 hidden, Q12 GitHub Pages.

## Content rules

- `docs/CONTENT.md` is the only source for numbers, dates, and names. Change it
  first, then the page.
- Do not use a "plumbing" or any other positioning line that CONTENT.md does not
  carry. The copy registers on the site is Dimitris's, not an agent's.
- KPMG: no brand, client, screenshot, credential, or PII from
  `~/Downloads/kpmg/`.
- zitamu: name, screenshots, and client details stay off the site until cleared.
  A role statement ("a Greek real-estate marketplace, Laravel 13 + Nuxt 3") is
  the maximum.
- The ten-case clinical test is a product test, not a validation study. Say so
  wherever the numbers appear.
- English only.

## Build route

1. `impeccable init` — `PRODUCT.md`. Per `docs/plans/router.md`, it reads the
   grill output — `docs/adr/` and `GLOSSARY.md` — as its product evidence and
   re-asks only material gaps. It does not restart the interview. Product truth
   only, no visuals.
2. `impeccable shape` — discovery plus `new-work`. The direction is chosen here.
   The concept and visual energy decision belongs to this step, not `init`.
   design1 (Case Record) and design2 (Annotated) are reference, not templates;
   the third world must not repeat either.
3. `build-awwwards-quality-sites` — build to that direction in
   `src/design3/`. Restrained motion, honest asset system from `./assets`,
   keyboard and reduced-motion fallbacks.
4. `impeccable document` (scan) — carbonise the real tokens into
   `src/design3/docs/DESIGN.md`.

Do not invent a rival direction in step 3. `DESIGN.md` is the authority.

## Deploy — GitHub Pages

The site lives in `src/design3/`, so the Pages artifact is that directory only,
staged before upload:

- Publish: `index.html`, `about.html`, `work/`, `design/`, `css/`, `js/`, `img/`,
  `fonts/`.
- Never publish: `assets/`, `docs/`, `README.md`, `DEPLOY.md`.
- Stage with `rsync` into a temp directory using the publish list, then upload
  with `actions/upload-pages-artifact`. This keeps private material out by
  construction, not by ignore rules.
- Every CSS, JS, and font link carries `?v=`; all links share one value. Bump
  them together.
- Set the absolute `og:image` URL and a canonical URL when the domain exists.

## Verification

- `pnpm test` — the axe suite discovers `design3` automatically; `design1` and
  `design2` are excluded as reference. Run at mobile, tablet, and desktop.
- `pnpm check` — Biome.
- Drive the built pages with Playwright before calling it done.
- Re-run both after any colour or layout change.

## Open items

- Buy a domain or accept `github.io`. Separate decision.
- Waypoint: card when it is deployed and real.
- zitamu: card and name when the client clears it.
- Retire design1/design2 from the repo only if Dimitris asks. They are reference
  until then.

## Out of scope

- React/Next.js for this site. See ADR-0001.
- A fourth page, a blog, a design-system route beyond `design/`.
- Greek copy.

# design3 is plain HTML, CSS, and JavaScript — not React or Next.js

**Status**: accepted

Dimitris is looking for a fullstack job and is learning TypeScript, React, and
Next.js, so the obvious move is to make this portfolio itself the React work
sample. We decided against it. The site is three static pages whose content
changes rarely; a React or Next.js rebuild would add a build step, a dependency
surface, and a deploy pipeline for no content gain, and it would put the site's
uptime in the hands of a toolchain that has nothing to do with what the pages
say. The React evidence belongs where the React is: `refresher` and Waypoint,
shipped and deployed on their own terms. A recruiter who wants to see React
should be sent to a working React app, not to a static portfolio re-platformed to
look like one.

**Consequences**: publishing stays `rsync` plus a GitHub Pages artifact, the
Playwright and axe suite keeps working unchanged, and `pnpm` remains for tooling
only. Revisiting this means a real re-platform, not a stylesheet swap.

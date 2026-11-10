import { defineConfig } from "@playwright/test";

// Every candidate is served from `src/` on one port, matching the preview
// command in AGENTS.md. Candidate directories are discovered by the tests, so
// adding `src/design3/` needs no config change.
const PORT = 4175;

const WIDTHS = [
	{ name: "mobile", width: 390, height: 844 },
	{ name: "tablet", width: 768, height: 1024 },
	{ name: "desktop", width: 1440, height: 900 },
];

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	reporter: "list",

	use: {
		// Measure settled colours, not colours mid-transition. Candidates ship a
		// reduced-motion path, so axe sees the final state of every element.
		reducedMotion: "reduce",
		trace: "off",
	},

	projects: WIDTHS.map(({ name, width, height }) => ({
		name,
		use: { viewport: { width, height } },
	})),

	webServer: {
		command: `python3 -m http.server ${PORT} --bind 127.0.0.1`,
		cwd: "src",
		url: `http://127.0.0.1:${PORT}/`,
		reuseExistingServer: true,
		timeout: 15_000,
	},
});

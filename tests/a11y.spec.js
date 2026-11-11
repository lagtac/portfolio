import { readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// design1 and design2 are reference material, not candidates. See AGENTS.md.
const REFERENCE = new Set(["design1", "design2"]);
const PORT = 4175;
const SRC = "src";

const WCAG_21_AA = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

/** Candidate directories under src/, excluding the reference builds. */
function candidates() {
	return readdirSync(SRC, { withFileTypes: true })
		.filter((d) => d.isDirectory() && /^design/i.test(d.name))
		.map((d) => d.name)
		.filter((name) => !REFERENCE.has(name))
		.sort();
}

/** Every published HTML page in a candidate, skipping working notes. */
function pages(dir) {
	const found = [];
	const walk = (current) => {
		for (const entry of readdirSync(current, { withFileTypes: true })) {
			if (entry.name === "docs") continue;
			const full = join(current, entry.name);
			if (entry.isDirectory()) walk(full);
			else if (entry.name.endsWith(".html"))
				found.push(relative(join(SRC, dir), full));
		}
	};
	walk(join(SRC, dir));
	return found.sort();
}

const CANDIDATES = candidates();

if (CANDIDATES.length === 0) {
	test("no candidate design to check yet", () => {
		test.skip(
			true,
			`No candidate under ${SRC}/. Reference builds (${[...REFERENCE].join(", ")}) are ignored. ` +
				"A new src/designX/ directory is picked up automatically.",
		);
	});
}

for (const dir of CANDIDATES) {
	for (const pagePath of pages(dir)) {
		test(`${dir}/${pagePath} has no axe WCAG 2.1 A/AA violations`, async ({
			page,
		}) => {
			const url = `http://127.0.0.1:${PORT}/${dir}/${pagePath}`;
			const response = await page.goto(url, { waitUntil: "load" });
			expect(response?.status(), `HTTP status for ${url}`).toBe(200);

			await page.evaluate(() => document.fonts.ready);

			const { violations } = await new AxeBuilder({ page })
				.withTags(WCAG_21_AA)
				.analyze();

			const summary = violations.map(
				(v) =>
					`${v.id} [${v.impact}] ${v.nodes.length} node(s) — ${v.help}\n` +
					v.nodes.map((n) => `    ${n.target.join(" ")}`).join("\n"),
			);

			expect(summary, summary.join("\n")).toEqual([]);
		});
	}
}

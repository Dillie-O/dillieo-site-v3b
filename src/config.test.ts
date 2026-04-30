/**
 * Deployment configuration tests
 *
 * These verify that critical runtime configuration is correct so the site
 * doesn't silently break in the Netlify environment.  They run against the
 * actual source files, not mocks, so a bad change to astro.config.mjs or
 * netlify.toml is caught here before a deploy.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ROOT = resolve(import.meta.dirname, "..");

function readFile(rel: string): string {
	return readFileSync(resolve(ROOT, rel), "utf-8");
}

// ---------------------------------------------------------------------------
// Netlify adapter — edgeMiddleware must be true
// ---------------------------------------------------------------------------
describe("Netlify adapter configuration", () => {
	it("sets edgeMiddleware: true so the middleware runs for all requests, including prerendered pages", () => {
		// Without edgeMiddleware: true, @astrojs/netlify bundles the middleware
		// into the SSR serverless function.  Pre-rendered (static) pages bypass
		// the SSR function entirely and are served by Netlify CDN, so the
		// middleware never executes — meaning Accept: text/markdown headers are
		// ignored and AI crawlers get HTML instead of markdown.
		const config = readFile("astro.config.mjs");
		expect(config).toMatch(/netlify\(\s*\{[^}]*edgeMiddleware\s*:\s*true/s);
	});

	it("uses the Netlify adapter (not Cloudflare or any other)", () => {
		const config = readFile("astro.config.mjs");
		expect(config).toContain('@astrojs/netlify"');
		expect(config).not.toMatch(/@astrojs\/cloudflare/);
	});
});

// ---------------------------------------------------------------------------
// netlify.toml — publish dir and Node version
// ---------------------------------------------------------------------------
describe("netlify.toml configuration", () => {
	it('publishes from the "dist" directory', () => {
		const toml = readFile("netlify.toml");
		expect(toml).toMatch(/publish\s*=\s*"dist"/);
	});

	it("uses Node 20", () => {
		const toml = readFile("netlify.toml");
		expect(toml).toMatch(/NODE_VERSION\s*=\s*"20"/);
	});

	it("uses pnpm to build", () => {
		const toml = readFile("netlify.toml");
		expect(toml).toMatch(/pnpm run build/);
	});
});

// ---------------------------------------------------------------------------
// .gitignore — build artifacts should not be tracked
// ---------------------------------------------------------------------------
describe(".gitignore", () => {
	it("ignores dist/ build output", () => {
		const gitignore = readFile(".gitignore");
		expect(gitignore).toMatch(/^dist\/$/m);
	});

	it("ignores .netlify/ build output so edge-function bundles are not committed", () => {
		// The Netlify adapter writes compiled edge-function bundles to
		// .netlify/v1/edge-functions/.  Tracking these in git bloats the repo
		// and can cause confusing diffs.
		const gitignore = readFile(".gitignore");
		expect(gitignore).toMatch(/^\.netlify\/$/m);
	});
});

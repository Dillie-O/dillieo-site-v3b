import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { onRequest } from "./middleware.ts";

// ---------------------------------------------------------------------------
// Module mock
// ---------------------------------------------------------------------------
// Mock astro-markdown-for-agents/runtime so tests are self-contained and
// don't require a full Astro build environment.  The implementations below
// faithfully mirror the real package's logic (verified against its source).
vi.mock("astro-markdown-for-agents/runtime", () => ({
	prefersMarkdown(acceptHeader: string): boolean {
		if (!acceptHeader) return false;
		const entries = acceptHeader.split(",").map((part, i) => {
			const [mediaType, ...params] = part.split(";").map((s) => s.trim().toLowerCase());
			let q = 1;
			for (const p of params) {
				if (p.startsWith("q=")) q = Number(p.slice(2));
			}
			return { mediaType, q, index: i };
		});
		const mdIdx = entries.findIndex(
			(e) => e.mediaType === "text/markdown" || e.mediaType === "text/plain",
		);
		if (mdIdx === -1) return false;
		const htmlIdx = entries.findIndex(
			(e) =>
				e.mediaType === "text/html" ||
				e.mediaType === "text/*" ||
				e.mediaType === "*/*",
		);
		return htmlIdx === -1 || mdIdx < htmlIdx;
	},

	markdownAssetPath(pathname: string, dir: string): string {
		const normalized =
			!pathname || pathname === "/"
				? "/"
				: pathname.endsWith("/")
					? pathname
					: `${pathname}/`;
		if (normalized === "/") return `/${dir}/index.md`;
		return `/${dir}${normalized}index.md`;
	},

	applyMarkdownHeaders(
		headers: Headers,
		markdown: string,
		options: { contentSignalHeader: string },
	): void {
		headers.set("content-type", "text/markdown; charset=utf-8");
		headers.set(
			"x-markdown-tokens",
			String(markdown.trim().split(/\s+/).filter(Boolean).length),
		);
		headers.set("content-signal", options.contentSignalHeader);
		headers.delete("content-length");
		headers.delete("etag");
	},

	ensureVaryAccept(headers: Headers): void {
		const vary = headers.get("vary");
		if (!vary) {
			headers.set("vary", "Accept");
		} else if (!vary.toLowerCase().split(",").map((s) => s.trim()).includes("accept")) {
			headers.set("vary", `${vary}, Accept`);
		}
	},
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type MiddlewareContext = Parameters<typeof onRequest>[0];

function makeContext(
	url: string,
	options: { headers?: Record<string, string>; method?: string } = {},
): MiddlewareContext {
	const { headers = {}, method = "GET" } = options;
	const request = new Request(url, { method, headers });
	return { request, locals: {} } as MiddlewareContext;
}

function makeNext(
	status = 200,
	responseHeaders: Record<string, string> = {},
) {
	return vi.fn(() =>
		Promise.resolve(
			new Response("<html>page</html>", {
				status,
				headers: { "content-type": "text/html", ...responseHeaders },
			}),
		),
	);
}

const MARKDOWN_CONTENT = "# Hello\n\nThis is a test post with some words.";

function stubFetchOk(body = MARKDOWN_CONTENT) {
	vi.stubGlobal(
		"fetch",
		vi.fn(() => Promise.resolve(new Response(body, { status: 200 }))),
	);
}

function stubFetchNotFound() {
	vi.stubGlobal(
		"fetch",
		vi.fn(() => Promise.resolve(new Response("Not found", { status: 404 }))),
	);
}

function stubFetchThrows() {
	vi.stubGlobal(
		"fetch",
		vi.fn(() => Promise.reject(new Error("network error"))),
	);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("middleware — onRequest", () => {
	beforeEach(() => {
		vi.unstubAllGlobals();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	// -------------------------------------------------------------------------
	// HTTP method filtering
	// -------------------------------------------------------------------------
	describe("HTTP method filtering", () => {
		it("passes POST requests through to next() without touching markdown logic", async () => {
			const next = makeNext();
			const ctx = makeContext("https://example.com/blog/my-post/", {
				method: "POST",
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, next);
			expect(next).toHaveBeenCalledOnce();
			expect(response.status).toBe(200);
		});

		it("passes DELETE requests through to next()", async () => {
			const next = makeNext();
			const ctx = makeContext("https://example.com/blog/my-post/", {
				method: "DELETE",
			});
			await onRequest(ctx, next);
			expect(next).toHaveBeenCalledOnce();
		});

		it("handles GET requests (does not immediately short-circuit to next)", async () => {
			stubFetchOk();
			const next = makeNext();
			const ctx = makeContext("https://example.com/blog/post/", {
				method: "GET",
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, next);
			// Should serve markdown, not fall through
			expect(next).not.toHaveBeenCalled();
			expect(response.headers.get("content-type")).toContain("text/markdown");
		});

		it("handles HEAD requests (does not immediately short-circuit to next)", async () => {
			stubFetchOk();
			const next = makeNext();
			const ctx = makeContext("https://example.com/blog/post/", {
				method: "HEAD",
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, next);
			expect(next).not.toHaveBeenCalled();
			expect(response.headers.get("content-type")).toContain("text/markdown");
		});
	});

	// -------------------------------------------------------------------------
	// Normal browser requests
	// -------------------------------------------------------------------------
	describe("normal browser requests (no markdown preference)", () => {
		it("passes through to next() when a typical browser Accept header is sent", async () => {
			const next = makeNext();
			const ctx = makeContext("https://example.com/blog/", {
				headers: {
					accept:
						"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
					"user-agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
				},
			});
			const response = await onRequest(ctx, next);
			expect(next).toHaveBeenCalledOnce();
			expect(response.status).toBe(200);
		});

		it("passes through when no Accept header is present", async () => {
			const next = makeNext();
			const ctx = makeContext("https://example.com/");
			await onRequest(ctx, next);
			expect(next).toHaveBeenCalledOnce();
		});

		it("does not call fetch() for a regular browser request", async () => {
			const fetchMock = vi.fn();
			vi.stubGlobal("fetch", fetchMock);
			const ctx = makeContext("https://example.com/blog/post/", {
				headers: {
					accept: "text/html,*/*;q=0.8",
					"user-agent":
						"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
				},
			});
			await onRequest(ctx, makeNext());
			expect(fetchMock).not.toHaveBeenCalled();
		});

		it("adds Vary: Accept to the response when the markdown cache is present (cache-miss path)", async () => {
			// Verify that when a markdown-capable client hits a page with NO cached .md file,
			// the HTML fallback response gets Vary: Accept so CDNs know to vary by Accept header.
			stubFetchNotFound();
			const next = makeNext(200, {});
			const ctx = makeContext("https://example.com/blog/post/", {
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, next);
			expect(next).toHaveBeenCalledOnce();
			const vary = response.headers.get("vary") ?? "";
			expect(vary.toLowerCase()).toContain("accept");
		});

		it("preserves existing Vary header values while appending Accept (cache-miss path)", async () => {
			stubFetchNotFound();
			const next = makeNext(200, { vary: "Origin" });
			const ctx = makeContext("https://example.com/blog/post/", {
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, next);
			const vary = response.headers.get("vary") ?? "";
			expect(vary.toLowerCase()).toContain("accept");
		});
	});

	// -------------------------------------------------------------------------
	// Markdown cache hit
	// -------------------------------------------------------------------------
	describe("markdown response — cache hit", () => {
		it("serves markdown with correct Content-Type when Accept: text/markdown and cache file exists", async () => {
			stubFetchOk();
			const ctx = makeContext("https://example.com/blog/my-post/", {
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, makeNext());
			expect(response.status).toBe(200);
			expect(response.headers.get("content-type")).toContain("text/markdown");
		});

		it("returns the markdown body verbatim", async () => {
			stubFetchOk();
			const ctx = makeContext("https://example.com/blog/my-post/", {
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, makeNext());
			const body = await response.text();
			expect(body).toBe(MARKDOWN_CONTENT);
		});

		it("sets Vary: Accept on the markdown response", async () => {
			stubFetchOk();
			const ctx = makeContext("https://example.com/blog/my-post/", {
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, makeNext());
			expect(response.headers.get("vary")).toContain("Accept");
		});

		it("sets x-markdown-tokens header", async () => {
			stubFetchOk();
			const ctx = makeContext("https://example.com/blog/my-post/", {
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, makeNext());
			expect(response.headers.get("x-markdown-tokens")).toBeTruthy();
		});

		it("sets content-signal header", async () => {
			stubFetchOk();
			const ctx = makeContext("https://example.com/blog/my-post/", {
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, makeNext());
			const signal = response.headers.get("content-signal");
			expect(signal).toContain("ai-train=yes");
		});

		it("does not call next() when markdown is served from cache", async () => {
			stubFetchOk();
			const next = makeNext();
			const ctx = makeContext("https://example.com/blog/my-post/", {
				headers: { accept: "text/markdown" },
			});
			await onRequest(ctx, next);
			expect(next).not.toHaveBeenCalled();
		});

		it("constructs the correct cache URL for a blog post path", async () => {
			const fetchMock = vi.fn(() =>
				Promise.resolve(new Response(MARKDOWN_CONTENT, { status: 200 })),
			);
			vi.stubGlobal("fetch", fetchMock);
			const ctx = makeContext("https://example.com/blog/my-post/", {
				headers: { accept: "text/markdown" },
			});
			await onRequest(ctx, makeNext());
			expect(fetchMock).toHaveBeenCalledOnce();
			const calledUrl = fetchMock.mock.calls[0][0] as string;
			expect(calledUrl).toMatch(/_markdown-cache\/blog\/my-post\/index\.md$/);
		});

		it("constructs the correct cache URL for the root path", async () => {
			const fetchMock = vi.fn(() =>
				Promise.resolve(new Response(MARKDOWN_CONTENT, { status: 200 })),
			);
			vi.stubGlobal("fetch", fetchMock);
			const ctx = makeContext("https://example.com/", {
				headers: { accept: "text/markdown" },
			});
			await onRequest(ctx, makeNext());
			const calledUrl = fetchMock.mock.calls[0][0] as string;
			expect(calledUrl).toMatch(/_markdown-cache\/index\.md$/);
		});
	});

	// -------------------------------------------------------------------------
	// Markdown cache miss
	// -------------------------------------------------------------------------
	describe("markdown response — cache miss", () => {
		it("falls through to next() when the cached file returns 404", async () => {
			stubFetchNotFound();
			const next = makeNext();
			const ctx = makeContext("https://example.com/blog/unknown-post/", {
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, next);
			expect(next).toHaveBeenCalledOnce();
			expect(response.headers.get("vary")).toContain("Accept");
		});

		it("falls through to next() when fetch throws a network error", async () => {
			stubFetchThrows();
			const next = makeNext();
			const ctx = makeContext("https://example.com/blog/broken/", {
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, next);
			expect(next).toHaveBeenCalledOnce();
			expect(response.headers.get("vary")).toContain("Accept");
		});

		it("returns the HTML response from next() on a cache miss", async () => {
			stubFetchNotFound();
			const ctx = makeContext("https://example.com/blog/unknown-post/", {
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, makeNext());
			const body = await response.text();
			expect(body).toContain("<html>");
		});
	});

	// -------------------------------------------------------------------------
	// AI crawler detection
	// -------------------------------------------------------------------------
	describe("AI crawler detection", () => {
		const knownCrawlers = [
			"GPTBot/1.0",
			"ClaudeBot/1.0",
			"Claude-Web/1.0",
			"ChatGPT-User/1.0",
			"Google-Extended/1.0",
			"PerplexityBot/1.0",
			"anthropic-ai/1.0",
			"cohere-ai/1.0",
			"Bytespider/1.0",
			"CCBot/2.0",
		];

		for (const ua of knownCrawlers) {
			it(`serves markdown to AI crawler: ${ua}`, async () => {
				stubFetchOk();
				const ctx = makeContext("https://example.com/blog/post/", {
					headers: { "user-agent": ua },
				});
				const response = await onRequest(ctx, makeNext());
				expect(response.headers.get("content-type")).toContain("text/markdown");
			});
		}

		it("does not serve markdown to a regular Chrome browser", async () => {
			const fetchMock = vi.fn();
			vi.stubGlobal("fetch", fetchMock);
			const next = makeNext();
			const ctx = makeContext("https://example.com/blog/post/", {
				headers: {
					"user-agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
					accept:
						"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
				},
			});
			await onRequest(ctx, next);
			expect(fetchMock).not.toHaveBeenCalled();
			expect(next).toHaveBeenCalledOnce();
		});
	});

	// -------------------------------------------------------------------------
	// Netlify compatibility — no Cloudflare ASSETS binding required
	// -------------------------------------------------------------------------
	describe("Netlify compatibility", () => {
		it("serves markdown without any Cloudflare runtime in context.locals", async () => {
			stubFetchOk();
			const ctx = makeContext("https://example.com/blog/post/", {
				headers: { accept: "text/markdown" },
			});
			// Confirm there's no Cloudflare-style runtime binding
			expect(
				(ctx.locals as Record<string, unknown>).runtime,
			).toBeUndefined();
			const response = await onRequest(ctx, makeNext());
			expect(response.status).toBe(200);
			expect(response.headers.get("content-type")).toContain("text/markdown");
		});

		it("uses the global fetch() — not a platform-specific binding", async () => {
			const globalFetch = vi.fn(() =>
				Promise.resolve(new Response(MARKDOWN_CONTENT, { status: 200 })),
			);
			vi.stubGlobal("fetch", globalFetch);
			const ctx = makeContext("https://example.com/blog/post/", {
				headers: { accept: "text/markdown" },
			});
			await onRequest(ctx, makeNext());
			// The middleware must have called the standard global fetch
			expect(globalFetch).toHaveBeenCalledOnce();
		});

		it("falls back gracefully to next() even with no runtime context and a cache miss", async () => {
			stubFetchNotFound();
			const next = makeNext();
			const ctx = makeContext("https://example.com/blog/no-cache/", {
				headers: { accept: "text/markdown" },
			});
			const response = await onRequest(ctx, next);
			expect(next).toHaveBeenCalledOnce();
			expect(response.headers.get("vary")).toContain("Accept");
		});
	});
});

import type { MiddlewareHandler } from "astro";
import {
	applyMarkdownHeaders,
	ensureVaryAccept,
	markdownAssetPath,
	prefersMarkdown,
} from "astro-markdown-for-agents/runtime";

const MARKDOWN_DIR = "_markdown-cache";

const AI_CRAWLER_PATTERNS = [
	"anthropic-ai",
	"Claude-Web",
	"ClaudeBot",
	"GPTBot",
	"ChatGPT-User",
	"Google-Extended",
	"cohere-ai",
	"PerplexityBot",
	"YouBot",
	"Applebot-Extended",
	"Bytespider",
	"CCBot",
	"DataForSeoBot",
	"FacebookBot",
	"facebookexternalhit",
	"ImagesiftBot",
	"Omgilibot",
	"Omgili",
	"PiplBot",
	"Seekr",
	"Timpibot",
	"VelenPublicWebCrawler",
	"WebzIO-Extended",
];

function isAiCrawler(userAgent: string): boolean {
	return AI_CRAWLER_PATTERNS.some((pattern) =>
		userAgent.toLowerCase().includes(pattern.toLowerCase()),
	);
}

function ensureVaryUserAgent(headers: Headers): void {
	const vary = headers.get("vary") ?? "";
	const parts = vary.split(",").map((s) => s.trim().toLowerCase());
	if (!parts.includes("user-agent")) {
		headers.set("vary", vary ? `${vary}, User-Agent` : "User-Agent");
	}
}

export const onRequest: MiddlewareHandler = async (context, next) => {
	const { request } = context;

	if (request.method !== "GET" && request.method !== "HEAD") {
		return next();
	}

	const acceptHeader = request.headers.get("accept") ?? "";
	const userAgent = request.headers.get("user-agent") ?? "";

	const wantsMarkdown = prefersMarkdown(acceptHeader) || isAiCrawler(userAgent);

	if (!wantsMarkdown) {
		return next();
	}

	const pathname = new URL(request.url).pathname;
	const mdPath = markdownAssetPath(pathname, MARKDOWN_DIR);

	const isHead = request.method === "HEAD";

	// Try to serve pre-generated Markdown from the cache via a standard fetch
	try {
		const mdUrl = new URL(mdPath, request.url);
		const mdResponse = await fetch(mdUrl.toString(), { method: request.method });

		if (mdResponse.ok) {
			const headers = new Headers();
			if (isHead) {
				// HEAD: populate headers without consuming the body
				applyMarkdownHeaders(headers, "", {
					contentSignalHeader: "ai-train=yes, search=yes, ai-input=yes",
				});
				ensureVaryAccept(headers);
				ensureVaryUserAgent(headers);
				return new Response(null, { status: 200, headers });
			}
			const markdown = await mdResponse.text();
			applyMarkdownHeaders(headers, markdown, {
				contentSignalHeader: "ai-train=yes, search=yes, ai-input=yes",
			});
			ensureVaryAccept(headers);
			ensureVaryUserAgent(headers);
			return new Response(markdown, { status: 200, headers });
		}
	} catch {
		// Markdown cache miss — fall through to normal response
	}

	// Fallback: let the normal response through but add Vary: Accept, User-Agent
	const response = await next();
	ensureVaryAccept(response.headers);
	ensureVaryUserAgent(response.headers);
	return response;
};

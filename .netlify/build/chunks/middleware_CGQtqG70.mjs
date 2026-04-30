// src/core/accept.ts
function parseAcceptHeader(value) {
  if (!value) {
    return [];
  }
  return value.split(",").map((item, index) => {
    const [mediaType, ...params] = item.split(";").map((part) => part.trim().toLowerCase());
    let q = 1;
    for (const param of params) {
      if (!param.startsWith("q=")) {
        continue;
      }
      const parsed = Number(param.slice(2));
      if (!Number.isNaN(parsed)) {
        q = parsed;
      }
    }
    return { mediaType, q, index };
  }).filter((entry) => entry.mediaType && entry.q > 0).sort((a, b) => b.q !== a.q ? b.q - a.q : a.index - b.index);
}
function prefersMarkdown(acceptHeader, preferPlainText = true) {
  const accepted = parseAcceptHeader(acceptHeader);
  if (accepted.length === 0) {
    return false;
  }
  const markdownIndex = accepted.findIndex(
    (entry) => entry.mediaType === "text/markdown" || preferPlainText && entry.mediaType === "text/plain"
  );
  if (markdownIndex === -1) {
    return false;
  }
  const htmlIndex = accepted.findIndex(
    (entry) => entry.mediaType === "text/html" || entry.mediaType === "text/*" || entry.mediaType === "*/*"
  );
  return htmlIndex === -1 || markdownIndex < htmlIndex;
}

// src/core/headers.ts
function ensureVaryAccept(headers) {
  const vary = headers.get("vary");
  if (!vary) {
    headers.set("vary", "Accept");
    return;
  }
  const values = vary.split(",").map((part) => part.trim().toLowerCase()).filter(Boolean);
  if (!values.includes("accept")) {
    headers.set(
      "vary",
      [.../* @__PURE__ */ new Set([...vary.split(",").map((part) => part.trim()), "Accept"])].filter(Boolean).join(", ")
    );
  }
}
function countTokens(markdown) {
  return markdown.trim().split(/\s+/).filter(Boolean).length;
}
function applyMarkdownHeaders(headers, markdown, options) {
  headers.set("content-type", "text/markdown; charset=utf-8");
  headers.set("x-markdown-tokens", String(countTokens(markdown)));
  headers.set("content-signal", options.contentSignalHeader);
  headers.delete("content-length");
  headers.delete("etag");
}

// src/core/routes.ts
function normalizePathname(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }
  if (pathname.endsWith("/")) {
    return pathname;
  }
  const lastSegment = pathname.split("/").pop() ?? "";
  if (lastSegment.includes(".")) {
    return pathname;
  }
  return `${pathname}/`;
}
function markdownAssetPath(pathname, markdownDir) {
  const normalized = normalizePathname(pathname);
  if (normalized === "/") {
    return `/${markdownDir}/index.md`;
  }
  if (normalized.endsWith("/")) {
    return `/${markdownDir}${normalized}index.md`;
  }
  return `/${markdownDir}${normalized}.md`;
}

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
  "WebzIO-Extended"
];
function isAiCrawler(userAgent) {
  return AI_CRAWLER_PATTERNS.some(
    (pattern) => userAgent.toLowerCase().includes(pattern.toLowerCase())
  );
}
const onRequest = async (context, next) => {
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
  try {
    const mdUrl = new URL(mdPath, request.url);
    const mdResponse = await fetch(mdUrl.toString());
    if (mdResponse.ok) {
      const markdown = await mdResponse.text();
      const headers = new Headers();
      applyMarkdownHeaders(headers, markdown, {
        contentSignalHeader: "ai-train=yes, search=yes, ai-input=yes"
      });
      ensureVaryAccept(headers);
      return new Response(markdown, { status: 200, headers });
    }
  } catch {
  }
  const response = await next();
  ensureVaryAccept(response.headers);
  return response;
};

export { onRequest };

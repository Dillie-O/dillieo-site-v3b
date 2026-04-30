function appendForwardSlash(path) {
  return path.endsWith("/") ? path : path + "/";
}
function prependForwardSlash(path) {
  return path[0] === "/" ? path : "/" + path;
}
function removeTrailingForwardSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
function isRemotePath(src) {
  if (!src) return false;
  const trimmed = src.trim();
  if (!trimmed) return false;
  let decoded = trimmed;
  let previousDecoded = "";
  let maxIterations = 10;
  while (decoded !== previousDecoded && maxIterations > 0) {
    previousDecoded = decoded;
    try {
      decoded = decodeURIComponent(decoded);
    } catch {
      break;
    }
    maxIterations--;
  }
  if (/^[a-zA-Z]:/.test(decoded)) {
    return false;
  }
  if (decoded[0] === "/" && decoded[1] !== "/" && decoded[1] !== "\\") {
    return false;
  }
  if (decoded[0] === "\\") {
    return true;
  }
  if (decoded.startsWith("//")) {
    return true;
  }
  try {
    const url = new URL(decoded, "http://n");
    if (url.username || url.password) {
      return true;
    }
    if (decoded.includes("@") && !url.pathname.includes("@") && !url.search.includes("@")) {
      return true;
    }
    if (url.origin !== "http://n") {
      const protocol = url.protocol.toLowerCase();
      if (protocol === "file:") {
        return false;
      }
      return true;
    }
    if (URL.canParse(decoded)) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}
function removeBase(path, base) {
  if (path.startsWith(base)) {
    return path.slice(removeTrailingForwardSlash(base).length);
  }
  return path;
}

const env_d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const global_d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

/// <reference types="mdast" />

const rehypeComponentAdmonition = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

/// <reference types="mdast" />

const rehypeComponentGithubCard = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const remarkDirectiveRehype = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

// biome-ignore lint/suspicious/noShadowRestrictedNames: <toString from mdast-util-to-string>

const remarkExcerpt = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

export { appendForwardSlash as a, removeBase as b, rehypeComponentAdmonition as c, rehypeComponentGithubCard as d, env_d as e, remarkDirectiveRehype as f, global_d as g, remarkExcerpt as h, isRemotePath as i, prependForwardSlash as p, removeTrailingForwardSlash as r };

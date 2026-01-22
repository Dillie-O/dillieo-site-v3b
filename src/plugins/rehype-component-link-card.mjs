/// <reference types="mdast" />
import { h } from "hastscript";

// Constant definitions
const CONSTANTS = {
  FAVICON_API: 'https://www.google.com/s2/favicons',
  FAVICON_SIZE: 32,
  ID_PREFIX: 'LC',
  LOADING_TITLE: 'Loading...',
  LOADING_DESC: 'Loading description...',
};

// Error messages
const ERRORS = {
  INVALID_DIRECTIVE: 'Invalid directive. ("link-card" directive must be leaf type "::link-card{url="https://example.com"}")',
  INVALID_URL: 'Invalid URL. ("url" attribute must be a valid HTTP/HTTPS URL)',
};

/**
 * Generate unique card ID
 * Use timestamp and random number to ensure uniqueness
 */
function generateCardId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `${CONSTANTS.ID_PREFIX}${timestamp}${random}`;
}

/**
 * Safely extract domain name
 */
function extractDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return 'unknown';
  }
}

/**
 * Validate if URL is valid
 */
function isValidUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Escape string for safe insertion into JavaScript
 */
function escapeForScript(str) {
  return JSON.stringify(str);
}

/**
 * Generate script to fetch metadata
 * Use IIFE to avoid global pollution, use JSON.stringify to prevent XSS
 */
function generateMetadataScript(cardId, url, domain) {
  return `
    (function() {
      'use strict';
      try {
        const cardElement = document.getElementById('${cardId}-card');
        const titleElement = document.getElementById('${cardId}-title');
        const descElement = document.getElementById('${cardId}-description');
        
        if (!cardElement || !titleElement || !descElement) {
          console.warn('[LINK-CARD] Elements not found for ${cardId}');
          return;
        }

        // Only set default values when there is no custom content
        if (!titleElement.dataset.hasCustomTitle) {
          titleElement.textContent = ${escapeForScript(domain)};
        }
        if (!descElement.dataset.hasCustomDesc) {
          descElement.textContent = ${escapeForScript(`Visit ${domain}`)};
        }

        cardElement.classList.remove("fetch-waiting");
        console.log("[LINK-CARD] Loaded card for:", ${escapeForScript(url)}, "|", "${cardId}");
      } catch (err) {
        console.error("[LINK-CARD] Error loading card:", err);
        const cardEl = document.getElementById('${cardId}-card');
        if (cardEl) {
          cardEl.classList.add("fetch-error");
          cardEl.classList.remove("fetch-waiting");
        }
      }
    })();
  `;
}

/**
 * Creates a Link Card component for third-party links.
 * @param {Object} properties - The properties for the link card
 * @param {string} properties.url - The URL to link to (required)
 * @param {string} [properties.title] - Custom title for the card
 * @param {string} [properties.description] - Custom description
 * @param {string} [properties.image] - Custom image URL
 * @param {string} [properties.icon] - Custom favicon URL
 * @param {Array} children - Should be empty for leaf directive
 * @returns {Object} HAST element representing the link card
 */
export function LinkCardComponent(properties = {}, children = []) {
  // Validation: ensure it's a leaf directive (no child elements)
  if (Array.isArray(children) && children.length !== 0) {
    return h("div", { class: "hidden" }, ERRORS.INVALID_DIRECTIVE);
  }

  // Validate URL
  if (!isValidUrl(properties.url)) {
    return h("div", { class: "hidden" }, ERRORS.INVALID_URL);
  }

  const url = properties.url;
  const domain = extractDomain(url);
  const cardId = generateCardId();
  
  // Destructure custom properties, provide default values
  const {
    title: customTitle = null,
    description: customDescription = null,
    image: customImage = null,
    icon: customIcon = null
  } = properties;

  // Determine if metadata needs to be fetched
  const needsFetch = !customTitle || !customDescription;

  // Build favicon URL, use custom icon or Google's favicon service
  const iconUrl = customIcon || 
    `${CONSTANTS.FAVICON_API}?domain=${encodeURIComponent(domain)}&sz=${CONSTANTS.FAVICON_SIZE}`;

  // Create favicon element
  const nFavicon = h(`div#${cardId}-favicon`, {
    class: "lc-favicon",
    style: `background-image: url(${iconUrl})`,
    // Add error handling: if icon fails to load, use default background color
    onerror: "this.style.backgroundImage='none'; this.style.backgroundColor='#f0f0f0';"
  });

  // Create title bar
  const nTitle = h("div", { class: "lc-titlebar" }, [
    h("div", { class: "lc-titlebar-left" }, [
      h("div", { class: "lc-site" }, [
        nFavicon,
        h("div", { class: "lc-domain" }, domain),
      ]),
    ]),
    h("div", { class: "lc-external-icon" }),
  ]);

  // Create card title
  const nCardTitle = h(
    `div#${cardId}-title`,
    { 
      class: "lc-card-title",
      ...(customTitle && { 'data-has-custom-title': 'true' })
    },
    customTitle || CONSTANTS.LOADING_TITLE
  );

  // Create description
  const nDescription = h(
    `div#${cardId}-description`,
    { 
      class: "lc-description",
      ...(customDescription && { 'data-has-custom-desc': 'true' })
    },
    customDescription || CONSTANTS.LOADING_DESC
  );

  // Build card content array
  const cardContent = [nTitle, nCardTitle, nDescription];

  // If there is a custom image, add image element
  if (customImage) {
    const nImage = h(
      `div#${cardId}-image`,
      { class: "lc-image" },
      h("img", { 
        src: customImage, 
        alt: customTitle || "Link preview",
        loading: "lazy", // Add lazy loading
        onerror: "this.style.display='none';" // Hide image when it fails to load
      })
    );
    cardContent.push(nImage);
  }

  // If metadata needs to be fetched, add script
  if (needsFetch) {
    const nScript = h(
      `script#${cardId}-script`,
      { 
        type: "text/javascript", 
        defer: true 
      },
      generateMetadataScript(cardId, url, domain)
    );
    cardContent.push(nScript);
  }

  // Create and return link card
  return h(
    `a#${cardId}-card`,
    {
      class: needsFetch ? "card-link fetch-waiting no-styling" : "card-link no-styling",
      href: url,
      target: "_blank",
      rel: "noopener noreferrer", // Security: prevent new page from accessing window.opener
      'data-url': url,
      'aria-label': `Link to ${domain}`, // Accessibility: add screen reader label
      title: customTitle || `Visit ${domain}` // Add hover tooltip
    },
    cardContent
  );
}

// Export default function, maintain backward compatibility
export default LinkCardComponent;
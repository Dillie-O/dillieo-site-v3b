import { r as renderers } from './chunks/_@astro-renderers_RxkgsC32.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_D458DhfT.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image/index.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/archive.astro.mjs');
const _page4 = () => import('./pages/contact.astro.mjs');
const _page5 = () => import('./pages/contact-success.astro.mjs');
const _page6 = () => import('./pages/cv.astro.mjs');
const _page7 = () => import('./pages/discoveries.astro.mjs');
const _page8 = () => import('./pages/posts/_---slug_.astro.mjs');
const _page9 = () => import('./pages/robots.txt.astro.mjs');
const _page10 = () => import('./pages/rss.xml.astro.mjs');
const _page11 = () => import('./pages/series.astro.mjs');
const _page12 = () => import('./pages/_---page_.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.15.5_@netlify+blobs@10.7.4_@types+node@24.10.1_jiti@1.21.7_lightningcss@1.29.3__44620583656571d19517695276215fa0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/archive.astro", _page3],
    ["src/pages/contact.astro", _page4],
    ["src/pages/contact-success.astro", _page5],
    ["src/pages/cv.astro", _page6],
    ["src/pages/discoveries.astro", _page7],
    ["src/pages/posts/[...slug].astro", _page8],
    ["src/pages/robots.txt.ts", _page9],
    ["src/pages/rss.xml.ts", _page10],
    ["src/pages/series.astro", _page11],
    ["src/pages/[...page].astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "086a991a-1b2e-4568-88a3-15e830d95cc8"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

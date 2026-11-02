/**
 * Post-build step: renders public pages to static HTML so crawlers and link
 * previews get real content and per-page tags, then writes sitemap.xml and robots.txt.
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle in dist-ssr).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');
const SUPABASE_INFO = path.join(ROOT, 'src', 'app', 'utils', 'supabase', 'info.tsx');

const { render, PUBLIC_PAGES, SITE_URL } = await import(pathToFileURL(SSR_ENTRY).href);

/** Same endpoint the shop uses in the browser; a failure skips product pages rather than the deploy. */
async function fetchProducts() {
  const info = fs.readFileSync(SUPABASE_INFO, 'utf8');
  const projectId = info.match(/projectId = "([^"]+)"/)?.[1];
  const anonKey = info.match(/publicAnonKey = "([^"]+)"/)?.[1];
  try {
    const res = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-fd83a735/stripe-products`,
      { headers: { Authorization: `Bearer ${anonKey}` }, signal: AbortSignal.timeout(20000) },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data.products) ? data.products : null;
  } catch (err) {
    console.warn(`[prerender] Could not fetch products (${err.message}); product pages will render in the browser only.`);
    return null;
  }
}

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
// Untouched SPA shell for routes that are not prerendered (cart, admin, new products).
fs.writeFileSync(path.join(DIST, 'app-shell.html'), template);

const products = await fetchProducts();
const productsScript = products
  ? `<script>window.__SBE_PRODUCTS__=${JSON.stringify(products).replace(/</g, '\\u003c')}</script>`
  : '';

function writePage(url, outFile, withProducts) {
  const { html, head } = render(url, withProducts ? products : null);
  const page = template
    .replace(/<title>[\s\S]*?<\/title>/, head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>${withProducts ? productsScript : ''}`);
  const dest = path.join(DIST, outFile);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, page);
}

const sitemapUrls = [];
for (const route of Object.keys(PUBLIC_PAGES)) {
  const isShop = route === '/products';
  writePage(route, route === '/' ? 'index.html' : `${route.slice(1)}.html`, isShop);
  sitemapUrls.push(route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`);
}
for (const product of products ?? []) {
  writePage(`/products/${product.id}`, `products/${product.id}.html`, true);
  sitemapUrls.push(`${SITE_URL}/products/${product.id}`);
}
writePage('/__not-found__', '404.html', false);

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((loc) => `  <url><loc>${loc}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`,
);
fs.writeFileSync(
  path.join(DIST, 'robots.txt'),
  `User-agent: *
Allow: /
Disallow: /cart
Disallow: /order-success
Disallow: /owner-dashboard
Disallow: /square-setup
Disallow: /square-service-ids
Disallow: /square-product-ids
Disallow: /product-catalog
Disallow: /quick-products
Disallow: /stripe-migration
Disallow: /design-system

Sitemap: ${SITE_URL}/sitemap.xml
`,
);

fs.rmSync(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true });
console.log(`[prerender] Wrote ${sitemapUrls.length} pages + 404, sitemap.xml and robots.txt`);

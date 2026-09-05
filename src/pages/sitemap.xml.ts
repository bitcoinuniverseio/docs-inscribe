// @astrojs/sitemap publishes sitemap-index.xml and sitemap-0.xml. Plenty of
// crawlers and link checkers ask for /sitemap.xml by convention and treat a 404
// as "this site has no sitemap", so serve one there too: a sitemap index
// pointing at the generated file. One list, two well-known addresses.
import type { APIRoute } from 'astro';

const SITE = 'https://bitcoinuniverseio.github.io/docs-inscribe';

export const GET: APIRoute = async () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE}/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

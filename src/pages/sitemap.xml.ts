import type { APIRoute } from 'astro';

// Search Console and other tools often try /sitemap.xml first; point it at the generated sitemap.
export const GET: APIRoute = ({ site }) => {
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    `<sitemap><loc>${new URL('/sitemap-0.xml', site)}</loc></sitemap>` +
    '</sitemapindex>';
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};

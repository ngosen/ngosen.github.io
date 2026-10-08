import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ngosen.github.io',
  integrations: [sitemap()],
  // Code blocks take the site's own ink-strip style, not a highlighter theme.
  markdown: { syntaxHighlight: false },
  // Minifying drops the space between a word and an inline element on the next source line.
  compressHTML: false,
  // Keep links to renamed or removed posts working.
  redirects: {
    '/blog/may-chu-nen-chi-doc-chuot': '/blog/bo-uinput-server/',
    '/blog/dong-goi-cho-muoi-ban-linux': '/cai-dat/',
  },
});

import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://ngosen.github.io';

// The sitemap's lastmod for each post: updatedDate if set, else pubDate. The config cannot read
// content collections, so the dates come straight from the frontmatter.
function postDates() {
  const dir = new URL('./src/content/blog/', import.meta.url);
  const dates = new Map();
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md') || file.startsWith('_')) continue;
    const front = readFileSync(new URL(file, dir), 'utf8').split(/^---$/m)[1] ?? '';
    const date = front.match(/^updatedDate:\s*(\S+)/m)?.[1] ?? front.match(/^pubDate:\s*(\S+)/m)?.[1];
    if (date) dates.set(`${site}/blog/${file.slice(0, -3)}/`, new Date(date).toISOString());
  }
  return dates;
}
const lastmod = postDates();

export default defineConfig({
  site,
  integrations: [
    sitemap({
      serialize(item) {
        const date = lastmod.get(item.url);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  // Code blocks take the site's own ink-strip style, not a highlighter theme.
  markdown: { syntaxHighlight: false },
  // Minifying drops the space between a word and an inline element on the next source line.
  compressHTML: false,
  // Keep links to renamed or removed pages working.
  redirects: {
    '/blog/may-chu-nen-chi-doc-chuot': '/blog/bo-uinput-server/',
    '/blog/dong-goi-cho-muoi-ban-linux': '/cai-dat/',
    '/khac-gi-ban-goc': '/',
  },
});

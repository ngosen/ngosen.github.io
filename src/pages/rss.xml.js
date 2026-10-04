import rss from '@astrojs/rss';
import { getPosts } from '../lib/posts';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: 'Blog Ngó Sen',
    description: 'Ghi chép của dự án Ngó Sen, bộ gõ tiếng Việt cho fcitx5 trên Linux.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>vi</language>',
  });
}

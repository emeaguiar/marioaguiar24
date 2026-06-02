/**
 * External dependencies
 */
import RSS from 'rss';

/**
 * Internal dependencies
 */
import { getPosts } from '@/lib/posts';
import { SITE_URL } from '@/lib/data';

export function generateRSSFeed(lang: 'en' | 'es'): string {
  const posts = getPosts(lang);
  const isDefault = lang === 'es';
  const feedUrl = isDefault ? `${SITE_URL}/rss.xml` : `${SITE_URL}/en/rss.xml`;
  const blogUrl = isDefault ? `${SITE_URL}/blog` : `${SITE_URL}/en/blog`;

  const feed = new RSS({
    title: 'Mario Aguiar',
    description:
      lang === 'es'
        ? 'Blog de desarrollo web por Mario Aguiar'
        : 'Web development blog by Mario Aguiar',
    site_url: SITE_URL,
    feed_url: feedUrl,
    language: lang,
    pubDate: new Date(),
    custom_namespaces: {
      media: 'http://search.yahoo.com/mrss/',
    },
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${blogUrl}/${post.slug}`,
      date: post.publishedOn,
      custom_elements: [
        {
          'media:content': {
            _attr: {
              url:
                post.image ??
                `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`,
              medium: 'image',
            },
          },
        },
      ],
    });
  });

  return feed.xml({ indent: true });
}

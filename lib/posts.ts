/**
 * External dependencies
 */
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

/**
 * Internal dependencies
 */
import type { PostItem } from '@/types/post';

function getPostSlugs(lang: 'en' | 'es') {
  return fs.readdirSync(getPostsDirectory(lang));
}

export function getPostsDirectory(lang: 'en' | 'es') {
  return join(process.cwd(), `/lib/_posts/${lang}`);
}

export function getPosts(lang: 'en' | 'es', limit: number = 0) {
  let slugs = getPostSlugs(lang);

  const posts = slugs
    .map((slug) =>
      getPostDataBySlug(slug, lang, [
        'slug',
        'title',
        'description',
        'publishedOn',
        'updatedOn',
        'published',
      ])
    )
    .sort((post1, post2) => (post1.publishedOn > post2.publishedOn ? -1 : 1));

  // Filter out drafts
  const filteredPosts = posts.filter((post) => post.published);

  if (limit) {
    return filteredPosts.slice(0, limit);
  }

  return filteredPosts;
}

function getPostDataBySlug(
  slug: string,
  lang: 'en' | 'es',
  fields: string[] = []
) {
  const trimmedSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(getPostsDirectory(lang), `${trimmedSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  const items: PostItem = {
    title: '',
    slug: '',
    description: '',
    publishedOn: '',
    updatedOn: '',
    readingTime: 0,
    published: false,
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    switch (field) {
      case 'slug':
        items.slug = trimmedSlug;
        break;
      case 'title':
        items.title = data.title;
        break;
      case 'description':
        items.description = data.description;
        break;
      case 'publishedOn':
        items.publishedOn = data.publishedOn;
        break;
      case 'updatedOn':
        items.updatedOn = data.updatedOn;
        break;
      case 'published':
        items.published = data.published;
        break;
    }
  });

  return items;
}

export function generateSiteMap() {
  const enPosts = getPosts('en');
  const esPosts = getPosts('es');

  const siteMap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${enPosts
        .map((post, index) => {
          return `
            <url>
              <loc>${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}</loc>
              <lastmod>${post.updatedOn}</lastmod>
              <xhtml:link
                rel="alternate"
                hreflang="es"
                href="${process.env.NEXT_PUBLIC_SITE_URL}/blog/${esPosts[index].slug}"
              />
              <xhtml:link
                rel="alternate"
                hreflang="en"
                href="${process.env.NEXT_PUBLIC_SITE_URL}/en/blog/${post.slug}"
              />
            </url>
          `;
        })
        .join('')}
    </urlset>`;

  return siteMap;
}

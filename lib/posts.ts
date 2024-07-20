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

  if (limit > 0) {
    slugs = slugs.slice(0, limit);
  }

  const posts = slugs
    .map((slug) =>
      getPostDataBySlug(slug, lang, [
        'slug',
        'title',
        'description',
        'publishedOn',
        'updatedOn',
      ])
    )
    .sort((post1, post2) => (post1.publishedOn > post2.publishedOn ? -1 : 1));

  return posts;
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
    }
  });

  return items;
}

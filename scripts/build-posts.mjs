/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

import { compilePost } from '../lib/mdx.mjs';

process.env.NODE_ENV ??= 'production';

const LANGS = ['es', 'en'];
const COMPILED_POSTS_DIR = join(process.cwd(), '.compiled-posts');

async function buildPostsForLang(lang) {
  const postsDirectory = join(process.cwd(), `lib/_posts/${lang}`);
  const outputDirectory = join(COMPILED_POSTS_DIR, lang);
  fs.mkdirSync(outputDirectory, { recursive: true });

  const slugs = fs.readdirSync(postsDirectory);
  let count = 0;

  for (const slug of slugs) {
    const trimmedSlug = slug.replace(/\.mdx$/, '');
    const filePath = join(postsDirectory, slug);
    const { data } = matter.read(filePath);

    if (data.published === false) {
      continue;
    }

    const { code, frontmatter } = await compilePost(filePath);

    fs.writeFileSync(
      join(outputDirectory, `${trimmedSlug}.json`),
      JSON.stringify({ code, frontmatter })
    );

    count += 1;
  }

  console.log(`Compiled ${count} ${lang} posts`);
}

async function buildPosts() {
  fs.rmSync(COMPILED_POSTS_DIR, { recursive: true, force: true });

  for (const lang of LANGS) {
    await buildPostsForLang(lang);
  }
}

buildPosts();

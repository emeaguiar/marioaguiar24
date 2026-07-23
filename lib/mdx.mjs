/* eslint-disable import/no-extraneous-dependencies */
import { bundleMDX } from 'mdx-bundler';
import remarkGfm from 'remark-gfm';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import rehypeSlug from 'rehype-slug';
import rehypeVideo from 'rehype-video';
import rehypeUnwrapImages from 'rehype-unwrap-images';

/**
 * @param {string} filePath Absolute path to the .mdx file to compile.
 * @returns {Promise<{ code: string, frontmatter: Record<string, any> }>}
 */
export async function compilePost(filePath) {
  return bundleMDX({
    file: filePath,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];

      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeGithubAlerts,
        rehypeSlug,
        rehypeUnwrapImages,
        [rehypeVideo, { details: false }],
      ];

      return options;
    },
  });
}

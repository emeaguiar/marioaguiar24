/**
 * External dependencies
 */
import clsx from 'clsx';
import { useMemo } from 'react';
import { bundleMDX } from 'mdx-bundler';
import remarkGfm from 'remark-gfm';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import { getMDXComponent } from 'mdx-bundler/client';
import rehypeSlug from 'rehype-slug';
import { NextSeo } from 'next-seo';
import { usePathname } from 'next/navigation';
import rehypeUnwrapImages from 'rehype-unwrap-images';

/**
 * Next dependencies
 */
import { YouTubeEmbed } from '@next/third-parties/google';

/**
 * Internal dependencies
 */
import {
  A,
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  Img,
  P,
  Pre,
  OL,
  UL,
  Table,
  Td,
  Th,
  Tr,
  Code as CodeElement,
} from '@/components/elements';
import Alert from '@/components/alerts';
import { getPosts, getPostsDirectory } from '@/lib/posts';
import BlogMeta from '@/components/blog/meta';
import { SITE_URL } from '@/lib/data';

export default function PostPage({
  code,
  frontmatter,
  locale,
}: {
  code: string;
  frontmatter: {
    [key: string]: any;
  };
  locale: string;
}) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const { publishedOn, updatedOn, title, description, readingTime } =
    frontmatter;
  const pathname = usePathname();

  return (
    <article>
      <NextSeo
        title={title}
        description={description}
        canonical={`${SITE_URL}/${locale}${pathname}`}
      />
      <header className='max-w-screen-sm mb-20 flex flex-col items-center gap-6 px-4 text-xl/9 lg:mb-16 lg:max-w-screen-lg lg:mx-auto'>
        <H1>{title}</H1>

        <BlogMeta
          publishedOn={publishedOn}
          updatedOn={updatedOn}
          readingTime={readingTime / 60}
          locale={locale}
        />
      </header>
      
      <div
        className={clsx(
          'prose prose-p:max-w-screen-sm prose-p:mx-auto lg:prose-xl prose-strong:text-inherit prose-figure:mb-18 px-4 mx-auto text-justify max-w-none',
        )}
      >
        {/* @todo: Clean up this madness */}
        <Component
          components={{
            YouTubeEmbed,
            a: A,
            blockquote: Blockquote,
            code: CodeElement,
            h1: H1,
            h2: (props: any) => {
              let classes;
              if ('footnote-label' === props.id) {
                classes = 'footnote-label font-bold mb-4 text-xl';
              }

              return <H2 {...props} className={classes} />;
            },
            h3: H3,
            h4: H4,
            img: (props: any) => <Img {...props} />,
            ol: OL,
            p: P,
            ul: UL,
            table: Table,
            td: Td,
            th: Th,
            tr: Tr,
            div: (props: any) => {
              if (props.className.includes('markdown-alert')) {
                const type = props.className.replace(
                  'markdown-alert markdown-alert-',
                  ''
                );

                return <Alert type={type}>{props.children}</Alert>;
              }

              return <div {...props} />;
            },
            section: (props: any) => {
              let classes;
              if (props.className.includes('footnotes')) {
                classes = 'footnotes text-sm w-full max-w-screen-sm';
              }

              return <div {...props} className={classes} />;
            },
            pre: Pre,
          }}
        />
      </div>
    </article>
  );
}

export async function getStaticProps({
  params,
  locale,
}: {
  params: {
    slug: string;
  };
  locale: '';
}) {
  const postLocaleDirectory = getPostsDirectory(locale as 'en' | 'es');

  const { code, frontmatter } = await bundleMDX({
    file: `${postLocaleDirectory}/${params.slug}.mdx`,
    mdxOptions(options: any) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];

      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeGithubAlerts,
        rehypeSlug,
        rehypeUnwrapImages,
      ];

      return options;
    },
  });

  return {
    props: {
      code,
      frontmatter,
      locale,
    },
  };
}

export async function getStaticPaths() {
  const spanishPosts = getPosts('es');
  const englishPosts = getPosts('en');

  const paths = [
    ...spanishPosts.map((post) => ({
      params: { slug: post.slug },
      locale: 'es',
    })),
    ...englishPosts.map((post) => ({
      params: { slug: post.slug },
      locale: 'en',
    })),
  ];

  return {
    paths,
    fallback: false,
  };
}

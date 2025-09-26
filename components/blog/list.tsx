/**
 * External dependencies
 */
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import useTranslation from 'next-translate/useTranslation';
import clsx from 'clsx';

/**
 * Next dependencies
 */
import Link from 'next/link';

/**
 * Internal dependencies
 */
import { FormatDateShort } from '@/components/format-date';
import type { PostItem } from '@/types/post';
import { BLOG_PREFIX } from '@/lib/data';

export function List({ posts, locale }: { posts: PostItem[]; locale: string }) {
  return (
    <div
      id='blog-list'
      className='auto flex w-full flex-col gap-2 lg:max-w-screen-md'
    >
      {posts.map((post) => (
        <ListItem post={post} key={post.slug} locale={locale} />
      ))}
    </div>
  );
}

export function ListItem({ post, locale }: { post: PostItem; locale: string }) {
  const { t } = useTranslation('blog');

  return (
    <div className='group relative flex flex-row gap-4 border-b border-gray-200 py-2 last:border-b-0 overflow-hidden'>
      <div className='flex flex-col gap-4'>
        <FormatDateShort
          dateString={post.publishedOn}
          locale={locale}
          className='text-sm font-extrabold'
        />
      </div>
      <h3
        className={clsx(
          'transition-colors',
          'group-hover:text-zinc-900/60',
          'dark:hover:text-slate-300'
        )}
      >
        {post.title}
      </h3>
      <div className='ml-auto mr-0 flex flex-row items-center gap-2 translate-x-4 group-hover:translate-x-0 transition-transform'>
        <p className='text-sm text-gray-500'>
          {t('blog:readingTime', { minutes: post.readingTime / 60 })}
        </p>
        <ChevronRightIcon className='h-4 w-4' />
      </div>
      <Link
        href={`${BLOG_PREFIX}/${post.slug}`}
        className='absolute right-0 top-0 h-full w-full'
      />
    </div>
  );
}

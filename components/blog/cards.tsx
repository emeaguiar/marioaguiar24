/**
 * External dependencies
 */
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import useTranslation from 'next-translate/useTranslation';

/**
 * Next dependencies
 */
import Link from 'next/link';

/**
 * Internal dependencies
 */
import { BLOG_PREFIX } from '@/lib/data';
import type { PostItem } from '@/types/post';
import clsx from 'clsx';
import { WithUnderline } from '../elements';

export default function Cards({ posts }: { [key: string]: any }) {
  return (
    <div className='auto grid w-full items-stretch gap-8 lg:max-w-screen-xl lg:grid-cols-3'>
      {posts &&
        posts.map((post: PostItem) => <Card post={post} key={post.slug} />)}
    </div>
  );
}

function Card({ post }: { post: PostItem }) {
  const { t } = useTranslation('common');

  return (
    <div
      className={clsx(
        'flex flex-col gap-4 border p-6',
        'dark:bg-slate-800'
      )}
    >
      <h3 className={`text-xl font-extrabold uppercase`}>
        <Link className="hover:underline" href={`${BLOG_PREFIX}/${post.slug}`}>{post.title}</Link>
      </h3>

      <p className='line-clamp-5'>{post.description}</p>

      <Link
        href={`${BLOG_PREFIX}/${post.slug}`}
        className={`mb-0 mt-auto flex items-center gap-2 text-sm uppercase group font-semibold`}
      >
        <span>
          <WithUnderline>
            {t('readMore')}
          </WithUnderline>
        </span>
      </Link>
    </div>
  );
}

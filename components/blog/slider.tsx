/**
 * External dependencies
 */
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

/**
 * Internal dependencies
 */
import { Card } from '@/components/blog/cards';
import type { PostItem } from '@/types/post';

const POSTS_PER_PAGE = 3;

export default function BlogSlider({ posts }: { posts: PostItem[] }) {
  const { t } = useTranslation('home');
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;

  const pages = Array.from({ length: totalPages }, (_, i) =>
    posts.slice(i * POSTS_PER_PAGE, (i + 1) * POSTS_PER_PAGE)
  );

  return (
    <div className='flex w-full items-center gap-4'>
      <button
        onClick={() => setCurrentPage((p) => p - 1)}
        disabled={isFirst}
        aria-label={t('sliderPrev')}
        className='flex-shrink-0 rounded-full p-2 transition-opacity disabled:cursor-not-allowed disabled:opacity-30'
      >
        <ChevronLeftIcon className='h-6 w-6' />
      </button>

      <div className='flex-1 overflow-hidden'>
        <div
          className='flex transition-transform duration-300 ease-in-out'
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {pages.map((pagePosts, i) => (
            <div
              key={i}
              className='grid w-full flex-shrink-0 grid-cols-1 items-stretch gap-8 lg:grid-cols-3'
            >
              {pagePosts.map((post) => (
                <Card key={post.slug} post={post} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setCurrentPage((p) => p + 1)}
        disabled={isLast}
        aria-label={t('sliderNext')}
        className='flex-shrink-0 rounded-full p-2 transition-opacity disabled:cursor-not-allowed disabled:opacity-30'
      >
        <ChevronRightIcon className='h-6 w-6' />
      </button>
    </div>
  );
}

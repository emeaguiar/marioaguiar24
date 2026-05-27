/**
 * External dependencies
 */
import { useState, useEffect, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

/**
 * Internal dependencies
 */
import { Card } from '@/components/blog/cards';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { PostItem } from '@/types/post';

/** Threshold in pixels to commit a drag to a page change */
const DRAG_THRESHOLD = 50;

export default function BlogSlider({ posts }: { posts: PostItem[] }) {
  const { t } = useTranslation('home');

  // True once the viewport is >= lg (1024 px) — matches Tailwind's `lg:` breakpoint
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const postsPerPage = isDesktop ? 3 : 1;

  const [currentPage, setCurrentPage] = useState(0);

  // Clamp currentPage whenever postsPerPage changes so we never point past the
  // last page (e.g. transitioning from 9 mobile pages down to 3 desktop pages).
  useEffect(() => {
    const total = Math.ceil(posts.length / postsPerPage);
    setCurrentPage((p) => Math.min(p, total - 1));
  }, [postsPerPage, posts.length]);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;

  const pages = Array.from({ length: totalPages }, (_, i) =>
    posts.slice(i * postsPerPage, (i + 1) * postsPerPage)
  );

  // ── Drag / swipe state ────────────────────────────────────────────────────
  const isDragging = useRef(false);
  const startX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.clientX;
    setEnableTransition(false);
    // Capture so we still receive events if the pointer leaves the element
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    setDragOffset(e.clientX - startX.current);
  };

  const commitDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setEnableTransition(true);

    if (dragOffset < -DRAG_THRESHOLD && !isLast) {
      setCurrentPage((p) => p + 1);
    } else if (dragOffset > DRAG_THRESHOLD && !isFirst) {
      setCurrentPage((p) => p - 1);
    }
    setDragOffset(0);
  };

  // ── Shared button elements ────────────────────────────────────────────────
  const prevButton = (
    <button
      onClick={() => setCurrentPage((p) => p - 1)}
      disabled={isFirst}
      aria-label={t('sliderPrev')}
      className='flex-shrink-0 rounded-full p-2 transition-opacity disabled:cursor-not-allowed disabled:opacity-30'
    >
      <ChevronLeftIcon className='h-6 w-6' />
    </button>
  );

  const nextButton = (
    <button
      onClick={() => setCurrentPage((p) => p + 1)}
      disabled={isLast}
      aria-label={t('sliderNext')}
      className='flex-shrink-0 rounded-full p-2 transition-opacity disabled:cursor-not-allowed disabled:opacity-30'
    >
      <ChevronRightIcon className='h-6 w-6' />
    </button>
  );

  return (
    /**
     * Layout:
     *   Mobile  — flex-col: card area on top, arrows row below (bottom-right)
     *   Desktop — flex-row: prev arrow | card area | next arrow
     */
    <div className='flex w-full flex-col lg:flex-row lg:items-center lg:gap-4'>
      {/* Prev arrow — desktop only (flanking position) */}
      <div className='hidden lg:block'>{prevButton}</div>

      {/* ── Sliding card area ── */}
      <div
        className='flex-1 cursor-grab overflow-hidden active:cursor-grabbing'
        style={{ touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={commitDrag}
        onPointerLeave={commitDrag}
      >
        <div
          className={
            enableTransition
              ? 'flex transition-transform duration-300 ease-in-out'
              : 'flex'
          }
          style={{
            transform: `translateX(calc(-${currentPage * 100}% + ${dragOffset}px))`,
          }}
        >
          {pages.map((pagePosts, i) => (
            <div
              key={i}
              className={
                postsPerPage === 1
                  ? 'w-full flex-shrink-0'
                  : 'grid w-full flex-shrink-0 grid-cols-3 items-stretch gap-8'
              }
            >
              {pagePosts.map((post) => (
                <Card key={post.slug} post={post} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows — mobile only, bottom-right */}
      <div className='mt-4 flex justify-end gap-2 lg:hidden'>
        {prevButton}
        {nextButton}
      </div>

      {/* Next arrow — desktop only (flanking position) */}
      <div className='hidden lg:block'>{nextButton}</div>
    </div>
  );
}

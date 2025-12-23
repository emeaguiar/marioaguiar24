/**
 * External dependencies
 */
import { useRef } from 'react';

/**
 * Internal dependencies
 */
import { useCurrentSrc } from './use-current-src';

/**
 * Internal dependencies
 */

export function SrcsetExample() {
  const imageRef = useRef<HTMLImageElement>(null);
  const currentSrc = useCurrentSrc(imageRef);

  return (
    <div className='max-w-[400px] lg:max-w-none'>
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className='w-full object-cover'
          srcSet='https://picsum.photos/400/225 400w, https://picsum.photos/800/450 800w'
          sizes='(max-width: 700px) 400px, 800px'
          src='https://picsum.photos/400/225'
          alt='Imagen Responsiva'
          ref={imageRef}
        />

        <figcaption>
          Current source:{' '}
          <code className='rounded-md bg-slate-100 px-1.5 py-1 dark:bg-slate-700 dark:text-foreground'>
            {currentSrc}
          </code>
        </figcaption>
      </figure>
    </div>
  );
}

export function PictureExample() {
  const imageRef = useRef<HTMLImageElement>(null);
  const currentSrc = useCurrentSrc(imageRef);

  return (
    <div>
      <figure>
        <picture>
          <source
            srcSet='https://picsum.photos/800/450'
            media='(min-width: 700px)'
          />
          <img
            src='https://picsum.photos/400/225'
            alt='Imagen Responsiva'
            ref={imageRef}
            className='w-full'
          />
        </picture>

        <figcaption>
          Current source:{' '}
          <code className='rounded-md bg-slate-100 px-1.5 py-1 dark:bg-slate-700 dark:text-foreground'>
            {currentSrc}
          </code>
        </figcaption>
      </figure>
    </div>
  );
}

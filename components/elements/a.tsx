/**
 * External dependencies
 */
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

/**
 * Next.js dependencies
 */
import Link from 'next/link';

export function A({ children, href, id }: any) {
  const isExternal = href.startsWith('http');

  return (
    <Link
      className={clsx('text-inherit underline', 'hover:no-underline', {
        'inline-flex items-center': isExternal,
      })}
      href={href}
      passHref={isExternal}
      id={id}
    >
      {children}

      {isExternal && (
        <ArrowTopRightOnSquareIcon
          aria-hidden
          className='ml-1 inline-flex h-5 w-5'
        />
      )}
    </Link>
  );
}

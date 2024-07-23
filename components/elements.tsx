/**
 * External dependencies
 */
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

/**
 * Next.js dependencies
 */
import Link from 'next/link';

/**
 * Internal dependencies
 */
import { merriweather } from '@/components/fonts';

export function H1({
  children,
  className,
  id,
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h1
      className={clsx(
        `${merriweather.className} text-3xl/10 font-bold lg:mt-12 lg:max-w-screen-sm lg:text-center lg:text-4xl/normal`,
        className
      )}
      id={id}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
  id,
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const H2Element = () => (
    <h2
      className={clsx(
        `${merriweather.className} max-w-screen-sm text-2xl font-bold`,
        className
      )}
      id={id}
    >
      {id && (
        <span
          className='pr-4 opacity-0 transition-opacity group-hover:opacity-100'
          aria-hidden
        >
          #
        </span>
      )}

      {children}
    </h2>
  );

  if (id) {
    return (
      <Link
        href={`#${id}`}
        className='group block w-full max-w-screen-md self-start text-start'
      >
        <H2Element />
      </Link>
    );
  }

  return <H2Element />;
}

export function H3({
  children,
  className,
  id,
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h3
      className={clsx(
        `${merriweather.className} w-full max-w-screen-sm text-xl font-bold text-gray-600 dark:text-gray-300`,
        className
      )}
      id={id}
    >
      {children}
    </h3>
  );
}

export function WithUnderline({ children }: { children?: React.ReactNode }) {
  return (
    <span className='relative isolate'>
      <span className='absolute bottom-1 left-0 h-1 w-full bg-underline opacity-80 lg:h-2' />

      <span className='relative z-10'>{children}</span>
    </span>
  );
}

export function P({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={clsx('w-full max-w-screen-sm', className)}>{children}</p>
  );
}

export function A({ children, href }: any) {
  const isExternal = href.startsWith('http');

  return (
    <Link
      className={clsx('text-inherit underline', 'hover:no-underline', {
        'inline-flex items-center': isExternal,
      })}
      href={href}
      passHref={isExternal}
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

export function UL({ children }: { children?: React.ReactNode }) {
  return (
    <ul className='w-full max-w-screen-sm list-outside list-disc pl-8'>
      {children}
    </ul>
  );
}

export function OL({ children }: { children?: React.ReactNode }) {
  return (
    <ol className='w-full max-w-screen-sm list-outside list-decimal pl-8'>
      {children}
    </ol>
  );
}

/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { merriweather } from '@/components/fonts';

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
        'w-full max-w-screen-sm text-xl font-light text-gray-600 mx-auto',
        'dark:text-gray-300',
        className
      )}
      id={id}
    >
      {children}
    </h3>
  );
}

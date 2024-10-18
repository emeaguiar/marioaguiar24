/**
 * External dependencies
 */
import clsx from 'clsx';

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

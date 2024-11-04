/**
 * External dependencies
 */
import clsx from 'clsx';

export function H4({
  children,
  className,
  id,
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h4
      className={clsx(
        `mx-auto w-full max-w-screen-sm text-lg font-bold text-gray-600 dark:text-gray-300`,
        className
      )}
      id={id}
    >
      {children}
    </h4>
  );
}

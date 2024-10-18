/**
 * External dependencies
 */
import clsx from 'clsx';

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

/**
 * External dependencies
 */
import clsx from 'clsx';

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
        'text-3xl/10 lg:max-w-screen-xl lg:text-center lg:text-6xl/tight uppercase font-light',
        className
      )}
      id={id}
    >
      {children}
    </h1>
  );
}

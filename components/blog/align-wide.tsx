/**
 * External dependencies
 */
import clsx from 'clsx';

export default function AlignWide({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'w-full max-w-screen-md mx-auto',
        'lg:max-w-screen-md',
        className
      )}
    >
      {children}
    </div>
  );
}

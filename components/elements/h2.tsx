/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Next.js dependencies
 */
import Link from 'next/link';

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
        "flex max-w-screen-sm text-4xl uppercase tracking-wide font-light",
        className
      )}
      id={id}
    >
      {id && (
        <span
          className='transition-opacity lg:opacity-0 group-hover:lg:opacity-100'
          aria-hidden
        >
          #
        </span>
      )}

      <span
        className={clsx({
          'pl-4': id,
        })}
      >
        {children}
      </span>
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

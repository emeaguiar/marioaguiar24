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
  const H2Element = ({ pull = false }: { pull?: boolean }) => {
    if (!id) {
      return (
        <h2
          className={clsx(
            'max-w-screen-sm text-4xl font-light tracking-wide',
            className
          )}
        >
          {children}
        </h2>
      );
    }

    return (
      <h2
        className={clsx(
          '-ml-4 flex text-4xl font-light tracking-wide',
          'dark:text-foreground',
          className,
          {
            'lg:-ml-11': pull,
          }
        )}
        id={id}
      >
        <span
          className='hidden font-bold transition-opacity lg:flex lg:opacity-0 group-hover:lg:opacity-100'
          aria-hidden
        >
          #
        </span>

        <span
          className={clsx({
            'pl-4': id,
          })}
        >
          {children}
        </span>
      </h2>
    );
  };

  if (id) {
    return (
      <Link
        href={`#${id}`}
        className='group mx-auto block w-full self-start text-start no-underline hover:underline prose-strong:font-black lg:max-w-screen-sm'
      >
        <H2Element pull={true} />
      </Link>
    );
  }

  return <H2Element />;
}

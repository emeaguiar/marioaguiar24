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
  const H2Element = ({pull = false}: {
    pull?: boolean;
  }) => {

    if ( ! id ) {
      return (
        <h2
          className={clsx(
            "max-w-screen-sm text-4xl tracking-wide font-light",
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
          "flex text-4xl tracking-wide font-light -ml-4",
          'dark:text-foreground',
          className,
          {
            'lg:-ml-11': pull,
          }
        )}
        id={id}
      >
        <span
          className='transition-opacity hidden lg:flex lg:opacity-0 group-hover:lg:opacity-100 font-bold'
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
        className='group block w-full lg:max-w-screen-sm self-start text-start mx-auto no-underline hover:underline prose-strong:font-black'
      >
        <H2Element pull={true} />
      </Link>
    );
  }

  return <H2Element />;
}

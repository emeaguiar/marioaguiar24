/**
 * External dependencies
 */
import clsx from 'clsx';
import { Fragment } from 'react';

/**
 * Internal dependencies
 */
import { P } from '@/components/elements/p';

export function Blockquote({
  children,
  allowExpand = true,
}: {
  children?: React.ReactNode;
  allowExpand?: boolean;
}) {
  return (
    <blockquote
      className={clsx(
        'relative my-4 w-full border-0 py-2 text-lg/8 font-normal italic',
        'before:absolute before:left-12 before:top-5 before:text-6xl before:font-medium before:opacity-20 before:content-["“"] lg:before:text-9xl',
        'prose-p:max-w-screen-lg',
        'md:mx-auto md:max-w-screen-md',
        {
          'text-zinc-500 dark:text-zinc-300': allowExpand,
          'opacity-75': !allowExpand,
        }
      )}
    >
      {/**
       * Map over all children so we can identify their type.
       * If the child is a paragraph, we'll render it as a default paragraph instead of
       * using our custom-styled P component.
       */}
      {Array.isArray(children) &&
        children.map((child: any, index: number) => {
          /**
           * If the child is a paragraph, we'll render it as a default style.
           * "P" is the custom component we created for paragraphs, all this happens after
           * the markdown is parsed.
           */
          if ('object' === typeof child && P === child.type) {
            return (
              <p key={index} className='px-6'>
                {child.props.children}
              </p>
            );
          }

          return <Fragment key={index}>{child}</Fragment>;
        })}
    </blockquote>
  );
}

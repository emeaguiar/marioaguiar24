/**
 * External dependencies
 */
import clsx from 'clsx';
import { Fragment } from 'react';

/**
 * Internal dependencies
 */
import { P } from '@/components/elements/p';
import { merriweather } from '@/components/fonts';

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
        merriweather.className,
        'relative my-4 w-full max-w-screen-sm border-primary py-2 pl-10 text-2xl/12 italic lg:pl-20',
        'before:absolute before:left-0 before:top-3 before:text-6xl before:opacity-20 before:content-["“"] lg:before:text-9xl',
        {
          'text-gray-600': allowExpand,
          'lg:-mx-8 lg:max-w-screen-md': allowExpand,
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
            return <p key={index}>{child.props.children}</p>;
          }

          return <Fragment key={index}>{child}</Fragment>;
        })}
    </blockquote>
  );
}

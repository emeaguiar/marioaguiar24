/**
 * External depenencies
 */
import { Children } from 'react';
import clsx from 'clsx';
import Trans from 'next-translate/Trans';
import { cloneElement } from 'react';

/**
 * Internal dependencies
 */
import { Blockquote, Pre } from '@/components/elements';

export default function Alert({
  children,
  type,
}: {
  children: React.ReactNode;
  type: 'note' | 'tip' | 'important' | 'warning' | 'caution';
}) {
  return (
    <div
      className={clsx(
        'my-4 w-full border-l-4 p-4 text-base mx-auto lg:max-w-screen-md',
        {
          'border-blue-400 bg-blue-50 text-blue-800 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-100':
            type === 'note',
          'border-green-400 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-950 dark:text-green-100':
            type === 'tip',
          'border-yellow-400 bg-yellow-50 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-100':
            type === 'important',
          'border-red-400 bg-red-50 text-red-800 dark:border-red-400 dark:bg-red-950 dark:text-red-100':
            type === 'warning',
          'border-purple-400 bg-purple-50 text-purple-800 dark:border-purple-400 dark:bg-purple-950 dark:text-purple-100':
            type === 'caution',
        }
      )}
    >
      {Children.map(children, (child: any, index: Number) => {
        if (0 === index) {
          // @TODO: Add translations for alert titles
          return (
            <div className='text-2xl lg:text-4xl flex items-center gap-3 font-black uppercase lg:gap-4'>
              {
                cloneElement(child.props.children[0], {
                  className: clsx(
                    child.props.className,
                    'h-5 w-5 lg:h-8 lg:w-8'
                  ),
                })
              }

              <Trans
                i18nKey={`alerts:${type}`}
              />
            </div>
          );
        }

        /**
         * If the child is a "expandable" element (breaks outside margins), we'll pass a prop to
         * stay contained.
         * All this happens after the markdown is parsed.
         */
        if (child && 'object' === typeof child) {
          switch (child.type) {
            case Blockquote:
            case Pre:
              return (
                <child.type {...child.props} allowExpand={false}>
                  {child.props.children}
                </child.type>
              );
            default:
              return child;
          }
        }

        return child;
      })}
    </div>
  );
}

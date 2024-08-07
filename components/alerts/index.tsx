/**
 * External depenencies
 */
import { Children } from 'react';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

export default function Alert({
  children,
  type,
}: {
  children: React.ReactNode;
  type: 'note' | 'tip' | 'important' | 'warning' | 'caution';
}) {
  const { t } = useTranslation('common');

  return (
    <div
      className={clsx(
        'my-4 flex w-full max-w-screen-md flex-col gap-2 rounded-lg border-l-4 p-4 text-base',
        'lg:-mx-8 lg:max-w-screen-md',
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
      {Children.map(children, (child, index) => {
        if (0 === index) {
          // @TODO: Add translations for alert titles
          return <div className='alert-title'>{child}</div>;
        }

        return child;
      })}
    </div>
  );
}

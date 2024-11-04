/**
 * External dependencies
 */
import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      aria-label={t('backToTop')}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className={clsx(
        'fixed bottom-0 right-0 z-50 m-4 rounded-full bg-foreground p-2 text-background shadow-lg ring-1 ring-zinc-900',
        'transform-gpu transition-transform hover:scale-105',
        'dark:bg-slate-700 dark:text-white dark:ring-slate-700',
        {
          'translate-y-18': !isVisible,
          'translate-y-0': isVisible,
        }
      )}
    >
      <ArrowUpIcon className='h-8 w-8' />
    </button>
  );
}

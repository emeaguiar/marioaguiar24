'use client';

/**
 * External dependencies
 */
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

/**
 * Next dependencies
 */
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LanguageToggle({ className }: { className?: string }) {
  const { t } = useTranslation('common');
  const { locale, asPath } = useRouter();
  const isEs = locale === 'es';

  return (
    <nav
      aria-label={t('changeLanguage')}
      className={clsx(
        'flex items-center gap-1 text-sm font-bold uppercase',
        className
      )}
    >
      {isEs ? (
        <span className='text-primary' aria-current='true'>
          ES
        </span>
      ) : (
        <Link
          href={asPath}
          locale='es'
          className='text-foreground/50 transition-colors hover:text-primary'
        >
          ES
        </Link>
      )}

      <span aria-hidden='true' className='text-foreground/30'>
        |
      </span>

      {!isEs ? (
        <span className='text-primary' aria-current='true'>
          EN
        </span>
      ) : (
        <Link
          href={asPath}
          locale='en'
          className='text-foreground/50 transition-colors hover:text-primary'
        >
          EN
        </Link>
      )}
    </nav>
  );
}

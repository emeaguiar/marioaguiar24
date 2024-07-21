/**
 * External dependencies
 */
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

/**
 * Next dependencies
 */
import Link from 'next/link';

export default function LanguageSwitcher({
  locale,
  pathname,
}: {
  locale: string;
  pathname: string;
}) {
  const { t } = useTranslation('blog');

  return (
    <Link
      href={pathname}
      locale={locale === 'es' ? 'en' : 'es'}
      className={clsx(
        'flex items-start rounded-lg border border-red-700 bg-background px-4 py-2 font-bold uppercase text-primary transition-colors',
        'hover:bg-red-50',
        'disabled:cursor-not-allowed disabled:border-gray-900 disabled:bg-red-50 disabled:text-gray-500',
        'dark:border-slate-900 dark:text-white dark:hover:bg-slate-900'
      )}
    >
      {t('switchLanguage')}
    </Link>
  );
}

/**
 * External dependencies
 */
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
    <Link href={pathname} locale={locale === 'es' ? 'en' : 'es'}>
      {t('switchLanguage')}
    </Link>
  );
}

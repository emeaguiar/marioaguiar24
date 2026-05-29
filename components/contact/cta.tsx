/**
 * External dependencies
 */
import useTranslation from 'next-translate/useTranslation';
import clsx from 'clsx';

/**
 * Next dependencies
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ContactCTA() {
  const pathname = usePathname();
  const { t } = useTranslation('common');

  return (
    <Link
      href={{ pathname, search: '?modal=1' }}
      className={clsx(
        'ml-0 mr-auto border-2 border-zinc-900 p-4 text-lg font-extrabold uppercase text-zinc-900',
        'transition-colors hover:bg-zinc-900 hover:text-white',
        'lg:mr-0',
        'dark:border-foreground dark:text-foreground dark:hover:bg-foreground dark:hover:text-background'
      )}
    >
      {t('contact')}
    </Link>
  );
}

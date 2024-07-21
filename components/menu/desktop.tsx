/**
 * External dependencies
 */
import useTranslation from 'next-translate/useTranslation';

/**
 * Next dependencies
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Internal dependencies
 */
import { MENU_ITEMS } from '@/lib/data';
import DarkModeToggle from '@/components/dark-mode-toggle';

export default function DesktopMenu() {
  const { t } = useTranslation('common');
  const pathname = usePathname();

  return (
    <nav aria-label='Navegación principal' className='hidden lg:flex'>
      <ul className='flex items-center justify-between gap-18'>
        {MENU_ITEMS.map(({ href, key }, index) => (
          <MenuItem key={index}>
            <Link href={href} className='transition-colors hover:text-primary'>
              {t(key)}
            </Link>
          </MenuItem>
        ))}

        <MenuItem>
          <Link
            href={{ pathname, search: '?modal=1' }}
            className='transition-colors hover:text-primary'
          >
            {t('contact')}
          </Link>
        </MenuItem>

        <li>
          <DarkModeToggle />
        </li>
      </ul>
    </nav>
  );
}

function MenuItem({ children }: { children: React.ReactNode }) {
  return <li className='font-bold uppercase'>{children}</li>;
}

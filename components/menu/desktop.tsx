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
import { WithUnderline } from '../elements';

export default function DesktopMenu() {
  const { t } = useTranslation('common');
  const pathname = usePathname();

  return (
    <nav aria-label='Navegación principal' className='hidden lg:flex'>
      <ul className='flex items-center justify-between gap-18 text-lg'>
        {MENU_ITEMS.map(({ href, key }, index) => (
          <MenuItem key={index}>
            <Link href={href} className='group'>
              <WithUnderline>
                {t(key)}
              </WithUnderline>
            </Link>
          </MenuItem>
        ))}

        <MenuItem>
          <Link
            href={{ pathname, search: '?modal=1' }}
            className='font-extrabold p-4 border-zinc-900 text-zinc-900 border-2'
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
  return <li className='font-light uppercase'>{children}</li>;
}

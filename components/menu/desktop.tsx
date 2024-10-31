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
      <ul className='flex items-center justify-between gap-18 text-lg'>
        {MENU_ITEMS.map(({ href, key }, index) => (
          <MenuItem key={index}>
            <Link href={href} className='transition-colors hover:text-decor group'>
              {t(key)}

              <div className="h-1 -mt-2 preserve-3d bg-primary origin-left will-change-transform transition-transform scale-x-0 group-hover:scale-x-100" />
            </Link>
          </MenuItem>
        ))}

        <MenuItem>
          <Link
            href={{ pathname, search: '?modal=1' }}
            className='transition-colors font-extrabold p-4 border-foreground border-2 hover:border-primary'
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

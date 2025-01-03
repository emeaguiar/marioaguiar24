'use client';

/**
 * External dependencies
 */
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

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

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <DarkModeToggle className='ml-auto mr-8 md:hidden' />

      <button className='md:hidden' onClick={() => setIsOpen(true)}>
        <Bars3Icon className='h-6 w-6' />
      </button>

      <div
        className={clsx(
          'fixed inset-0 z-10 -translate-y-full bg-background transition-transform md:hidden',
          {
            'translate-y-0': isOpen,
          }
        )}
      >
        <button
          className='absolute right-0 top-1 p-4'
          onClick={() => setIsOpen(false)}
        >
          <XMarkIcon className='h-6 w-6' />
        </button>

        <nav aria-label='Menú Principal' className='flex flex-col gap-4'>
          <ul className='flex w-full flex-col gap-4 py-3'>
            {MENU_ITEMS.map(({ href, key }, index) => (
              <MenuItem key={index} href={href}>
                {t(key)}
              </MenuItem>
            ))}

            <li>
              <Link
                href={{ pathname, search: '?modal=1' }}
                className='block px-4 py-2 font-bold uppercase transition-colors'
              >
                {t('contact')}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

function MenuItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className='block px-4 py-2 font-bold uppercase transition-colors'
      >
        {children}
      </Link>
    </li>
  );
}

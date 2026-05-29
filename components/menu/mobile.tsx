'use client';

/**
 * External dependencies
 */
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
import LanguageToggle from '@/components/language-toggle';
import Logo from '@/components/logo';
import ContactCTA from '@/components/contact/cta';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Asymmetric hamburger — three lines of decreasing width */}
      <button
        className='flex h-8 w-8 flex-col items-end justify-center gap-[5px] md:hidden'
        onClick={() => setIsOpen(true)}
        aria-label={t('openMenu')}
      >
        <span className='block h-[2px] w-[22px] bg-foreground transition-colors' />
        <span className='block h-[2px] w-[16px] bg-foreground transition-colors' />
        <span className='block h-[2px] w-[10px] bg-foreground transition-colors' />
      </button>

      {/* Full-screen overlay */}
      <div
        className={clsx(
          'fixed inset-0 z-50 flex flex-col bg-background transition-opacity duration-200 md:hidden',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        {/* Top row: logo + close */}
        <div className='flex items-center justify-between p-6'>
          <Link href='/' onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            aria-label={t('closeMenu')}
            className='flex items-center justify-center p-1 text-foreground'
          >
            <svg
              width='22'
              height='22'
              viewBox='0 0 22 22'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            >
              <line x1='3' y1='3' x2='19' y2='19' />
              <line x1='19' y1='3' x2='3' y2='19' />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav aria-label={t('mainMenu')} className='flex-1 px-6'>
          <ul className='flex flex-col'>
            {MENU_ITEMS.map(({ href, key }, index) => (
              <li key={index} className='border-foreground/10 border-b'>
                <Link
                  href={href}
                  className='block py-5 text-[28px] font-light uppercase tracking-wide transition-colors'
                  onClick={() => setIsOpen(false)}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom: CTA + toggles */}
        <div className='flex flex-col gap-5 p-6 pt-8'>
          <ContactCTA />

          <div className='flex items-center gap-5'>
            <DarkModeToggle />
            <span className='text-foreground/20'>|</span>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </>
  );
}

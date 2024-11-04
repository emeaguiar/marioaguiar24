/**
 * Next dependencies
 */
import Link from 'next/link';

/**
 * Internal dependencies
 */
import Logo from '@/components/logo';
import MobileMenu from '@/components/menu/mobile';
import DesktopMenu from '@/components/menu/desktop';

export default function Header() {
  return (
    <div className='flex w-full max-w-screen-xl justify-between p-6'>
      <Link
        href='/'
        className='hover:text-zinc-900/60 dark:hover:text-slate-300'
      >
        <Logo />
      </Link>

      <DesktopMenu />

      <MobileMenu />
    </div>
  );
}

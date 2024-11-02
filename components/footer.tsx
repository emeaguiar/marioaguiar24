/**
 * External dependencies
 */
import Link from 'next/link';

/**
 * Internal dependencies
 */
import Logo from '@/components/logo';
import SocialLinks from '@/components/social/social-links';

export default function Footer() {
  return (
    <footer className='mt-6 flex w-full flex-col items-center gap-10 p-8 lg:mt-44 lg:gap-10'>
      <SocialLinks />

      <Link
        href='/'
        className='text-foreground hover:text-primary dark:hover:text-sky-300'
      >
        <Logo />
      </Link>
    </footer>
  );
}

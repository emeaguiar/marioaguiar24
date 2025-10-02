/**
 * External dependencies
 */
import clsx from 'clsx';
import { useEffect, useState } from 'react';

/**
 * Next dependencies
 */
import { usePathname } from 'next/navigation';

/**
 * Internal dependencies
 */
import { raleway } from '@/components/fonts';
import Footer from '@/components/footer';
import Header from '@/components/header';
import ContactModal from '@/components/contact/modal';
import SkipNavigation from '@/components/skip-navigation';
import BackToTop from '@/components/back-to-top';

const HEADER_HEIGHT = 84;

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBlog, setIsBlog] = useState(false);

  useEffect(() => {
    setIsBlog(pathname.includes('/blog'));
  }, [pathname]);

  useEffect(() => {
    // Only apply in /blog pages
    if (!isBlog) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > HEADER_HEIGHT);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isBlog]);

  return (
    <>
      <SkipNavigation />
      <BackToTop />

      <div
        className={clsx(
          raleway.className,
          'z-50 mb-6 flex flex-col items-center lg:mb-44',
          {
            'sticky top-0 bg-background': isBlog,
            'shadow-lg': isScrolled,
          }
        )}
      >
        <Header />
      </div>

      <main
        id='main-content'
        className={clsx(
          raleway.className,
          'flex flex-col items-center gap-20 lg:gap-52'
        )}
      >
        {children}
      </main>

      <ContactModal />
      <Footer />
    </>
  );
}

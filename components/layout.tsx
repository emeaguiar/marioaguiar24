/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { raleway } from '@/components/fonts';
import Footer from '@/components/footer';
import Header from '@/components/header';
import ContactModal from '@/components/contact/modal';
import SkipNavigation from '@/components/skip-navigation';
import BackToTop from '@/components/back-to-top';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavigation />
      <BackToTop />

      <div
        className={clsx(
          raleway.className,
          'mb-6 flex flex-col items-center lg:mb-44'
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

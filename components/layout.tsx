/**
 * Internal dependencies
 */
import Footer from '@/components/footer';
import Header from '@/components/header';
import ContactModal from '@/components/contact/modal';
import SkipNavigation from '@/components/skip-navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavigation />

      <div className='mb-6 flex flex-col items-center lg:mb-20'>
        <Header />
      </div>

      <main
        id='main-content'
        className='flex flex-col items-center gap-6 lg:gap-20'
      >
        {children}
      </main>

      <ContactModal />
      <Footer />
    </>
  );
}

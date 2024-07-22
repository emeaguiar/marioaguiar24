/**
 * Internal dependencies
 */
import Footer from '@/components/footer';
import Header from '@/components/header';
import ContactModal from '@/components/contact/modal';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='mb-6 flex flex-col items-center lg:mb-20'>
        <Header />
      </div>

      <main className='flex flex-col items-center gap-6 lg:gap-20'>
        {children}
      </main>

      <ContactModal />
      <Footer />
    </>
  );
}

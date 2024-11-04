/**
 * External dependencies
 */
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

/**
 * Next dependencies
 */
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

/**
 * Internal dependencies
 */
import { H2, P } from '@/components/elements';
import { raleway } from '@/components/fonts';
import ContactForm from '@/components/contact/form';

export default function Modal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const usesModal = searchParams.get('modal');
  const { t } = useTranslation('common');

  return (
    <>
      {usesModal && (
        <dialog
          className={clsx(
            raleway.className,
            'modal fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-zinc-900/50 backdrop-blur'
          )}
        >
          <div
            className={clsx(
              'mx-auto h-full w-full bg-background p-4 lg:bg-background',
              'lg:h-auto lg:w-fit lg:border-4 lg:border-foreground lg:p-8',
              'dark:bg-dark:lg:bg-slate-800'
            )}
          >
            <Link
              aria-label={t('close')}
              href={pathname}
              className='ml-auto mr-0 flex h-6 w-6'
            >
              <XMarkIcon className='h-6 w-6' />
            </Link>

            <div className='-mt-8 flex h-max flex-col items-center'>
              <H2 className='mb-4 max-w-screen-xl self-start uppercase'>
                <Trans
                  i18nKey='common:contactModalTitle'
                  components={[<strong key='strong' className='font-black' />]}
                />
              </H2>

              <P className='max-w-screen-xl lg:max-w-screen-md'>
                <Trans
                  i18nKey='common:contactModalMessage'
                  components={[<strong key='strong' className='font-bold' />]}
                />
              </P>

              <ContactForm />
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

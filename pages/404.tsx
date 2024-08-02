/**
 * External dependencies
 */
import useTranslation from 'next-translate/useTranslation';
import { NextSeo } from 'next-seo';

/**
 * Internal dependencies
 */
import { luckiestGuySans } from '@/components/fonts';

export default function Custom404() {
  const { t } = useTranslation('common');

  return (
    <>
      <NextSeo title={t('notFound')} description={t('pageNotFound')} noindex />

      <div className='flex flex-col items-center justify-center gap-40'>
        <h1
          className={`${luckiestGuySans.className} bg-gradient-to-t from-indigo-500 via-violet-500 to-purple-500 bg-clip-text p-4 text-7xl uppercase text-transparent [text-shadow:_1px_1px_10px_rgb(0_0_0_/_20%)] lg:text-9xl`}
        >
          &lt;404 /&gt;
        </h1>

        <h2
          className={`${luckiestGuySans.className} bg-gradient-to-t from-indigo-500 via-violet-500 to-purple-500 bg-clip-text p-4 text-7xl uppercase text-transparent [text-shadow:_1px_1px_10px_rgb(0_0_0_/_20%)] lg:text-9xl`}
        >
          {t('tooBad')}
        </h2>
        <p className='text-lg'>{t('pageNotFound')}</p>
      </div>
    </>
  );
}

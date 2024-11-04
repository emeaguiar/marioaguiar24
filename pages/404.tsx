/**
 * External dependencies
 */
import useTranslation from 'next-translate/useTranslation';
import { NextSeo } from 'next-seo';

/**
 * Internal dependencies
 */

export default function Custom404() {
  const { t } = useTranslation('common');

  return (
    <>
      <NextSeo title={t('notFound')} description={t('pageNotFound')} noindex />

      <div className='flex flex-col items-center justify-center gap-40'>
        <h1 className='p-4 text-7xl font-black uppercase md:text-8xl'>
          &lt;404 /&gt;
        </h1>

        <h2 className='p-4 text-7xl font-black uppercase md:text-7xl'>
          {t('tooBad')}
        </h2>
        <p className='text-lg'>{t('pageNotFound')}</p>
      </div>
    </>
  );
}

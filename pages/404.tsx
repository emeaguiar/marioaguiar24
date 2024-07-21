/**
 * External dependencies
 */
import useTranslation from 'next-translate/useTranslation';

/**
 * Internal dependencies
 */
import { luckiestGuySans } from '@/components/fonts';

export default function Custom404() {
  const { t } = useTranslation('common');

  return (
    <div className='flex flex-col items-center justify-center gap-40'>
      <h1
        className={`${luckiestGuySans.className} bg-gradient-to-t from-indigo-500 via-violet-500 to-purple-500 bg-clip-text p-4 text-9xl uppercase text-transparent [text-shadow:_1px_1px_10px_rgb(0_0_0_/_20%)]`}
      >
        &lt;404 /&gt;
      </h1>

      <h2
        className={`${luckiestGuySans.className} bg-gradient-to-t from-indigo-500 via-violet-500 to-purple-500 bg-clip-text p-4 text-9xl uppercase text-transparent [text-shadow:_1px_1px_10px_rgb(0_0_0_/_20%)]`}
      >
        {t('tooBad')}
      </h2>
      <p className='text-lg'>{t('pageNotFound')}</p>
    </div>
  );
}

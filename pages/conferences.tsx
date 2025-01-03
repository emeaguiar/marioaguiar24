/**
 * External dependencies
 */
import {
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Next dependencies
 */
import Head from 'next/head';
import Link from 'next/link';

/**
 * Internal dependencies
 */
import { CONFERENCES, SITE_URL } from '@/lib/data';

export default function Conferences({ locale }: { locale: 'es' | 'en' }) {
  const { t } = useTranslation('conferences');

  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favicon.png' />
      </Head>

      <NextSeo
        title={t('title').replace('<0>', '').replace('</0>', '')}
        description={t('description')}
        canonical={`${SITE_URL}/${locale}conferences`}
      />

      <div className={`flex flex-col items-center gap-16 lg:max-w-screen-xl`}>
        <h1 className='w-full px-4 text-5xl font-light uppercase lg:text-center lg:text-7xl'>
          <Trans
            i18nKey='conferences:title'
            components={[<strong key='title' className='font-black' />]}
          />
        </h1>

        <p className='px-4 text-xl/10 lg:max-w-screen-md'>
          <Trans
            i18nKey='conferences:content'
            components={[<strong key='strong' className='font-extrabold' />]}
          />
        </p>

        <p className='w-full px-4 text-xl/10 lg:max-w-screen-md'>
          <Trans
            i18nKey='conferences:cta'
            components={[
              <Link
                className='underline hover:no-underline'
                href={{ search: '?modal=1' }}
                key='email'
              />,
              <EnvelopeIcon className='inline-block h-6 w-6' key='icon' />,
            ]}
          />
        </p>

        <div className='grid gap-4 self-start md:grid-cols-2 lg:max-w-screen-md'>
          {CONFERENCES.map((conference) => (
            <Conference locale={locale} {...conference} key={conference.name} />
          ))}
        </div>
      </div>
    </>
  );
}

function Conference({
  name,
  title,
  date,
  locale,
  location,
  presentation,
  video,
  href,
}: {
  name: string;
  title: string;
  date: string;
  locale: string;
  location: string;
  presentation?: string;
  video?: string;
  href: string;
}): JSX.Element {
  const { t } = useTranslation('conferences');
  const dateOptions = { locale: locale === 'es' ? es : undefined };

  return (
    <div key={name} className='flex flex-col gap-2 p-4'>
      <h2
        className='text-xl uppercase'
        dangerouslySetInnerHTML={{ __html: name }}
      />

      <p>{format(date, 'PPP', dateOptions)}</p>

      <p>{location}</p>

      <p className='font-bold italic'>“{title}”</p>
      <div className='divide-x-2'>
        {href && (
          <Link href={href} className='pr-2 underline hover:no-underline'>
            {t('link')}

            <ArrowTopRightOnSquareIcon
              aria-hidden
              className='ml-1 inline-flex h-4 w-4'
            />
          </Link>
        )}
        {presentation && (
          <Link
            href={presentation}
            className='px-2 underline hover:no-underline'
          >
            {t('presentation')}

            <ArrowTopRightOnSquareIcon
              aria-hidden
              className='ml-1 inline-flex h-4 w-4'
            />
          </Link>
        )}
        {video && (
          <Link href={video} className='px-2 underline hover:no-underline'>
            {t('video')}

            <ArrowTopRightOnSquareIcon
              aria-hidden
              className='ml-1 inline-flex h-4 w-4'
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: 'es' | 'en' }) {
  return {
    props: {
      locale,
    },
  };
}

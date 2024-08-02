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
import { CONTACT_FORM_TO_EMAIL, CONFERENCES } from '@/lib/data';
import { merriweather } from '@/components/fonts';

export default function Conferences({ locale }: { locale: 'es' | 'en' }) {
  const { t } = useTranslation('conferences');

  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favicon.png' />
      </Head>

      <NextSeo
        title={t('title')}
        description={t('description')}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/conferences`}
      />

      <div className={`flex flex-col items-center gap-4 lg:gap-8`}>
        <h1
          className={`${merriweather.className} self-start px-4 text-2xl font-bold lg:text-5xl`}
        >
          {t('title')}
        </h1>

        <p className='px-4 lg:max-w-screen-md'>
          <Trans
            i18nKey='conferences:content'
            components={[<strong key='strong' />]}
          />
        </p>

        <p className='w-full px-4 lg:max-w-screen-md'>
          <Trans
            i18nKey='conferences:cta'
            components={[
              <Link
                className='underline hover:no-underline'
                href={`mailto:${CONTACT_FORM_TO_EMAIL}`}
                key='email'
              />,
              <EnvelopeIcon className='inline-block h-6 w-6' key='icon' />,
            ]}
          />
        </p>

        <div className='grid gap-4 lg:max-w-screen-md lg:grid-cols-2'>
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
      <h2 className={`${merriweather.className} text-xl font-bold`}>{name}</h2>

      <p>{format(date, 'PPP', dateOptions)}</p>

      <p>{location}</p>

      <p className='italic'>{title}</p>
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

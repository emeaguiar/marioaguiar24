/**
 * External dependencies
 */
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';

/**
 * Next dependencies
 */
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Internal dependencies
 */
import styles from '@/styles/home.module.css';
import { H2 } from '@/components/elements';
import { merriweather, raleway } from '@/components/fonts';
import BlogCards from '@/components/blog/cards';
import { getPosts } from '@/lib/posts';
import { SITE_URL } from '@/lib/data';

export default function Home({
  locale,
  posts,
}: {
  locale: string;
  posts: {
    [key: string]: any;
  };
}) {
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favicon.png' />
      </Head>

      <NextSeo canonical={`${SITE_URL}/${locale}`} />

      <div
        className={`${raleway.className} flex flex-col gap-4 lg:gap-8 max-w-screen-xl p-4 w-full tracking-wide mb-10 lg:mb-20`}
      >
        <h1 className='text-4xl uppercase lg:text-6xl self-start'>
          <Trans
            i18nKey='home:headline'
            components={[<br key='spacing' />, <strong className="font-black" key='frontend' />]}
          />
        </h1>

        <p className='text-7xl uppercase lg:text-8xl font-light -order-10'>
          <Trans
            i18nKey='home:hello'
            components={[
              <br />,
              <strong className="font-black" key='name' />,
            ]}
          />
        </p>
      </div>

      <div className='w-full bg-zinc-900 px-4 text-background dark:bg-slate-300'>
        <div className="grid items-end lg:grid-cols-2 gap-4 lg:max-w-screen-xl m-auto py-8">
          <div className={`items-baseline lg:flex lg:justify-start m-auto ${styles.aboutImage}`}>
              <Image
                src="/mariobw.webp"
                alt={t('aboutImageAlt')}
                className="object-contain"
                width="1000"
                height="1000"
              />
          </div>
          <p className={`text-xl dark:text-foreground lg:text-2xl lg:mb-8 font-light ${styles.aboutText}`}>
            <span className="block h-1 mb-4 preserve-3d bg-background origin-left scale-x-50" />

            <Trans
              i18nKey='home:strip'
              components={[
                <strong className="font-semibold" key='strip' />,
              ]}
            />
          </p>
        </div>
      </div>

      <div className='flex w-full flex-col items-center gap-10 px-4 lg:max-w-screen-xl'>
        <H2 className='text-center'>
          <Trans
            i18nKey='home:blogTitle'
            components={[
              <strong className='font-black' key='bold' />,
            ]}
          />
        </H2>

        <BlogCards posts={posts} />
      </div>

      <div className='flex w-full items-center lg:max-w-screen-xl lg:px-4'>
        <div className='flex w-full flex-col gap-8 bg-primary px-4 py-8 dark:bg-slate-800 lg:flex-row lg:items-center lg:justify-between lg:rounded-2xl lg:p-12'>
          <div className='flex max-w-screen-md flex-col items-center gap-4 lg:items-start'>
            <H2 className='text-center text-white lg:text-start'>
              {t('ctaTitle')}
            </H2>

            <p className='text-center text-white'>{t('cta')}</p>
          </div>

          <Link
            href='/?modal=1'
            className={clsx(
              'flex w-fit items-center self-center rounded-lg border border-red-700 bg-background px-4 py-2 font-bold uppercase text-primary transition-colors',
              'hover:bg-red-50',
              'disabled:cursor-not-allowed disabled:border-gray-900 disabled:bg-red-50 disabled:text-gray-500',
              'dark:border-slate-900 dark:text-white dark:hover:bg-slate-900'
            )}
          >
            {t('common:contactCta')}
          </Link>
        </div>
      </div>

      <div className='flex'>
        <p
          className={`${merriweather.className} my-8 text-center text-sm/5 italic`}
        >
          <Trans i18nKey='home:improve' components={[<br key='break' />]} />
        </p>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: 'es' | 'en' }) {
  const posts = getPosts(locale, 3);

  return {
    props: {
      locale,
      posts,
    },
  };
}

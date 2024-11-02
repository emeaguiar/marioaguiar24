/**
 * External dependencies
 */
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { NextSeo } from 'next-seo';

/**
 * Next dependencies
 */
import Head from 'next/head';
import Image from 'next/image';

/**
 * Internal dependencies
 */
import styles from '@/styles/home.module.css';
import { H2 } from '@/components/elements';
import BlogCards from '@/components/blog/cards';
import ContactCTA from '@/components/contact/cta';
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

      <div id="intro" className="lg:grid max-w-screen-xl w-full lg:grid-cols-3 mb-10">
        <div
          className="flex flex-col col-span-2 gap-4 lg:gap-8 max-w-screen-xl p-4 w-full tracking-wide"
        >
          <h1 className='text-4xl uppercase lg:text-6xl self-start lg:mt-auto lg:mb-0'>
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

        <div className={`items-baseline lg:flex lg:justify-start lg:m-auto ${styles.aboutImage}`}>
            <Image
              src="/mariobw.webp"
              alt={t('aboutImageAlt')}
              className="object-contain"
              width="1000"
              height="1000"
            />
        </div>
      </div>

      <div id="about" className='w-full bg-zinc-900 px-4 text-background dark:text-foreground dark:bg-slate-800'>
        <div className="grid lg:grid-cols-3 gap-4 lg:max-w-screen-xl m-auto p-8 lg:p-32">
          <H2 className='uppercase mt-5'>
            <Trans
              i18nKey='home:aboutTitle'
              components={[
                <strong className='font-black' key='bold' />,
              ]}
            />
          </H2>

          <p className={`text-xl lg:col-span-2 lg:text-2xl font-light ${styles.aboutText}`}>
            <span className="block h-1 mb-4 preserve-3d bg-background origin-left scale-x-50 dark:bg-foreground" />

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

      <div className='flex w-full flex-col gap-8 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:max-w-screen-xl'>
        <div className='flex max-w-screen-md flex-col items-center gap-10 lg:items-start'>
          <H2 className='uppercase'>
            <Trans
              i18nKey='home:ctaTitle'
              components={[
                <strong className='font-black' key='bold' />,
              ]}
            />
          </H2>

          <p className='text-lg'>{t('cta')}</p>
        </div>

        <ContactCTA />
      </div>

      <div className='flex'>
        <p
          className="my-8 text-center text-sm/5 font-light"
        >
          <Trans
            i18nKey='home:improve'
            components={[
              <br key='break' />,
              <strong key='strong' className='font-bold' />,
            ]}
          />
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

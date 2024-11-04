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

      <div
        id='intro'
        className='mb-10 w-full max-w-screen-xl md:grid md:grid-cols-3'
      >
        <div className='col-span-2 flex w-full max-w-screen-xl flex-col gap-4 p-4 tracking-wide lg:gap-8'>
          <h1 className='self-start text-4xl uppercase lg:mb-0 lg:mt-auto lg:text-6xl'>
            <Trans
              i18nKey='home:headline'
              components={[
                <br key='spacing' />,
                <strong className='font-black' key='frontend' />,
              ]}
            />
          </h1>

          <p className='-order-10 text-7xl font-light uppercase lg:text-8xl'>
            <Trans
              i18nKey='home:hello'
              components={[
                <br key='break' />,
                <strong className='font-black' key='name' />,
              ]}
            />
          </p>
        </div>

        <div
          className={`items-baseline lg:mx-auto lg:flex lg:justify-start ${styles.aboutImage}`}
        >
          <Image
            src='/mariobw.webp'
            alt={t('aboutImageAlt')}
            className='object-contain'
            width='1000'
            height='1000'
            loading='eager'
          />
        </div>
      </div>

      <div
        id='about'
        className='w-full bg-zinc-900 px-4 text-background dark:bg-slate-800 dark:text-foreground'
      >
        <div className='mx-auto grid gap-4 py-8 lg:max-w-screen-xl lg:grid-cols-3 lg:p-32'>
          <H2 className='mt-5 uppercase'>
            <Trans
              i18nKey='home:aboutTitle'
              components={[<strong className='font-black' key='bold' />]}
            />
          </H2>

          <p
            className={`text-xl font-light lg:col-span-2 lg:text-2xl ${styles.aboutText}`}
          >
            <span className='preserve-3d mb-4 block h-1 origin-left scale-x-50 bg-background dark:bg-foreground' />

            <Trans
              i18nKey='home:strip'
              components={[<strong className='font-semibold' key='strip' />]}
            />
          </p>
        </div>
      </div>

      <div
        id='blog'
        className='flex w-full flex-col items-center gap-10 px-4 lg:max-w-screen-xl'
      >
        <H2 className='self-start uppercase lg:self-center'>
          <Trans
            i18nKey='home:blogTitle'
            components={[<strong className='font-black' key='bold' />]}
          />
        </H2>

        <BlogCards posts={posts} />
      </div>

      <div
        id='cta'
        className='flex w-full flex-col gap-8 px-4 py-8 lg:max-w-screen-xl lg:flex-row lg:items-center lg:justify-between'
      >
        <div className='flex max-w-screen-md flex-col gap-10 lg:items-start'>
          <H2 className='uppercase'>
            <Trans
              i18nKey='home:ctaTitle'
              components={[<strong className='font-black' key='bold' />]}
            />
          </H2>

          <p className='text-lg'>{t('cta')}</p>
        </div>

        <ContactCTA />
      </div>

      <div id='footer' className='flex'>
        <p className='my-8 text-center text-sm/5 font-light'>
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

/**
 * External dependencies
 */
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { NextSeo } from 'next-seo';

/**
 * Internal dependencies
 */
import { H2 } from '@/components/elements';
import BlogCards from '@/components/blog/cards';
import { getPosts } from '@/lib/posts';
import { BLOG_PREFIX, SITE_URL } from '@/lib/data';

export const metadata = {
  title: 'Blog',
};

export default function Page({
  locale,
  posts,
}: {
  locale: string;
  posts: {
    [key: string]: any;
  };
}) {
  const { t } = useTranslation('blog');

  return (
    <>
      <NextSeo
        title={t('title').replace('<0>', '').replace('</0>', '')}
        description={t('description')}
        canonical={`${SITE_URL}/${locale}${BLOG_PREFIX}`}
      />

      <div className='flex w-full flex-col items-center gap-16 px-4 lg:max-w-screen-xl'>
        <h1 className='w-full max-w-screen-sm text-center text-5xl uppercase lg:text-7xl'>
          <Trans
            i18nKey='blog:title'
            components={[<strong key='title' className='font-black' />]}
          />
        </h1>

        <p className='text-center lg:max-w-screen-md'>
          <Trans
            i18nKey='blog:description'
            components={[
              <strong key='description' className='font-extrabold' />,
            ]}
          />
        </p>

        <H2 className='text-center uppercase'>
          <Trans
            i18nKey='blog:latest'
            components={[<strong key='latest' className='font-black' />]}
          />
        </H2>

        <BlogCards posts={posts} />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: 'es' | 'en' }) {
  const posts = getPosts(locale, 0);

  return {
    props: {
      locale,
      posts,
    },
  };
}

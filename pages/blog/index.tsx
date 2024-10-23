/**
 * External dependencies
 */
import useTranslation from 'next-translate/useTranslation';
import { NextSeo } from 'next-seo';

/**
 * Internal dependencies
 */
import { H2 } from '@/components/elements';
import BlogCards from '@/components/blog/cards';
import { getPosts } from '@/lib/posts';
import { merriweather } from '@/components/fonts';
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
        title={t('title')}
        description={t('description')}
        canonical={`${SITE_URL}/${locale}${BLOG_PREFIX}`}
      />

      <div className='flex w-full flex-col items-center gap-10 px-4 lg:max-w-screen-xl'>
        <h1
          className={`${merriweather.className} w-full max-w-screen-sm text-center text-2xl font-bold`}
        >
          {t('title')}
        </h1>

        <p className='text-center lg:max-w-screen-md'>{t('description')}</p>

        <H2 className='text-center'>{t('latest')}</H2>

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

/**
 * External dependencies
 */
import { DefaultSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { ThemeProvider } from 'next-themes';

/**
 * Next dependencies
 */
import type { AppProps } from 'next/app';
import { GoogleAnalytics } from '@next/third-parties/google';

/**
 * Internal dependencies
 */
import '@/styles/globals.css';
import { ANALYTICS_ID, SITE_URL } from '@/lib/data';
import Layout from '@/components/layout';

export default function App({ Component, pageProps }: AppProps) {
  const { t } = useTranslation('common');
  const title = t('seoTitle');
  const description = t('seoDescription');

  return (
    <>
      <DefaultSeo
        defaultTitle={title}
        titleTemplate='%s | Mario Aguiar'
        description={description}
        openGraph={{
          type: 'website',
          locale: 'es' === pageProps.__lang ? 'es_MX' : 'en_US',
          url: SITE_URL,
          site_name: title,
          images: [
            {
              url: `${SITE_URL}/api/og`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
        twitter={{
          handle: '@emeaguiar',
          site: '@emeaguiar',
          cardType: 'summary_large_image',
        }}
      />

      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>

      {ANALYTICS_ID && <GoogleAnalytics gaId={ANALYTICS_ID} />}
    </>
  );
}

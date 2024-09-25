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
import Layout from '@/components/layout';

export default function App({ Component, pageProps }: AppProps) {
  const { t } = useTranslation('common');

  return (
    <>
      <DefaultSeo
        defaultTitle={t('seoTitle')}
        titleTemplate='%s | Mario Aguiar'
        description={t('seoDescription')}
        openGraph={{
          type: 'website',
          locale: 'es' === pageProps.__lang ? 'es_MX' : 'en_US',
          url: 'https://www.marioaguiar.net',
          site_name: 'Example',
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

      <GoogleAnalytics gaId='G-YRPBH5KSTQ' />
    </>
  );
}

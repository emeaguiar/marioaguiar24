/**
 * Next dependencies
 */
import { Html, Head, Main, NextScript } from 'next/document';
import clsx from 'clsx';

export default function Document() {
  return (
    <Html className={clsx('scroll-smooth bg-background text-foreground', {})}>
      <Head>
        <link
          rel='alternate'
          type='application/rss+xml'
          title='Mario Aguiar (ES)'
          href='/rss.xml'
        />
        <link
          rel='alternate'
          type='application/rss+xml'
          title='Mario Aguiar (EN)'
          href='/en/rss.xml'
        />
      </Head>
      <body className='has-[dialog]:overflow-hidden'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

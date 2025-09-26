/**
 * Next dependencies
 */
import { Html, Head, Main, NextScript } from 'next/document';
import clsx from 'clsx';

export default function Document() {
  return (
    <Html className={clsx('scroll-smooth bg-background text-foreground', {})}>
      <Head />
      <body className='has-[dialog]:overflow-hidden'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

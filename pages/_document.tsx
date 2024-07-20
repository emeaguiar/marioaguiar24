/**
 * Next dependencies
 */
import { Html, Head, Main, NextScript } from 'next/document';
import clsx from 'clsx';

export default function Document() {
  return (
    <Html className={clsx('bg-background text-foreground', {})}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

/**
 * Next dependencies
 */
import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";

/**
 * Internal dependencies
 */
import { useDarkMode } from '@/components/dark-mode';

export default function Document() {
  const { isDarkMode } = useDarkMode();

  return (
    <Html className={
      clsx(
        'bg-background text-foreground',
        {
          "dark": isDarkMode,
        }
      )
    }>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

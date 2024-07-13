/**
 * Next dependencies
 */
import type { Metadata } from "next";

/**
 * Internal dependencies
 */
import "./globals.css";
import { notoSans } from "./ui/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s | Mario Aguiar",
    default: "Desarrollador Frontend",
  },
  description: "Sitio web personal del desarrollador Frontend Mario Aguiar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>{children}</body>
    </html>
  );
}

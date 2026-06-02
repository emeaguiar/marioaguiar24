/**
 * Internal dependencies
 */
import { generateRSSFeed } from '@/lib/rss';

export default function RSSFeed() {}

export async function getServerSideProps({
  res,
  locale,
}: {
  res: any;
  locale: 'en' | 'es';
}) {
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.write(generateRSSFeed(locale));
  res.end();

  return { props: {} };
}

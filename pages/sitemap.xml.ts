/**
 * Internal dependencies
 */
import { generateSiteMap } from '@/lib/posts';

export default function SiteMap() {
  // This function will generate the sitemap.xml file
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml');

  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

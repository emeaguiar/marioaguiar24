/**
 * External dependencies
 */
import { DiscussionEmbed } from 'disqus-react';

/**
 * Internal dependencies
 */
import { SITE_URL, DISQUS_SHORTNAME } from '@/lib/data';

export default function Comments({
  slug,
  title,
  locale,
}: {
  slug: string;
  title: string;
  locale: string;
}) {
  const language = locale === 'es' ? 'es_MX' : 'en_US';
  const disqusConfig = {
    url: `${SITE_URL}/${slug}`,
    identifier: slug,
    title: title,
    language,
  };

  return <DiscussionEmbed shortname={DISQUS_SHORTNAME} config={disqusConfig} />;
}

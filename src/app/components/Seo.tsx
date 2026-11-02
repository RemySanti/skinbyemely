import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { DEFAULT_OG_IMAGE, SITE_URL, seoForPath } from '../config/seo';

interface SeoProps {
  title: string;
  description: string;
  /** Path for the canonical URL; defaults to the current route. */
  path?: string;
  image?: string;
  type?: 'website' | 'product';
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

export function Seo({ title, description, path, image, type = 'website', noindex, jsonLd }: SeoProps) {
  const location = useLocation();
  const canonical = `${SITE_URL}${path ?? location.pathname.replace(/(.)\/+$/, '$1')}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return (
    // defer={false}: apply tags immediately instead of on the next animation frame,
    // so crawlers (and background tabs) see them as soon as the route renders.
    <Helmet prioritizeSeoTags defer={false}>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <link rel="canonical" href={canonical} />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

/** Default tags for whichever route is showing; pages can override with their own <Seo>. */
export function RouteSeo() {
  const { pathname } = useLocation();
  const page = seoForPath(pathname);
  return <Seo title={page.title} description={page.description} noindex={page.noindex} />;
}

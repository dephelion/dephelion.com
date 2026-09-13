import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from './site';

/**
 * Next replaces `openGraph` and `twitter` wholesale when a child route declares
 * them — it does not merge field by field, and the file-based OG image is merged
 * into that same object. A page that set only title and description therefore
 * shipped no og:image, no og:type and no og:site_name. Building both objects in
 * one place is what stops that happening again.
 */
/** Measured, not assumed: the artwork is square, and 1200x630 would be a lie. */
export const OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image.jpg`,
  width: 1200,
  height: 1200,
  alt: `${SITE_NAME} — Expand Your Digital Horizon`,
};

export const TWITTER_IMAGE = {
  url: `${SITE_URL}/twitter-image.jpg`,
  width: 1200,
  height: 1200,
  alt: OG_IMAGE.alt,
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  /** Route path with a leading and trailing slash, matching `trailingSlash`. */
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      locale: 'en_US',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [TWITTER_IMAGE],
    },
  };
}

/** Nested pages get a trail; the home page is the root and needs none. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: `${SITE_URL}${step.path}`,
    })),
  };
}

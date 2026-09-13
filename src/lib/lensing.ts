import { SITE_URL } from './site';

export const LENSING_NAME = 'Lensing';

/** Leading and trailing slash, matching the site's `trailingSlash` export. */
export const LENSING_PATH = '/lensing-browser-extension/';
export const LENSING_URL = `${SITE_URL}${LENSING_PATH}`;
export const LENSING_TAGLINE = 'Blur what you did not come here to read';

/** Kept under ~160 characters so search results show it whole. */
export const LENSING_DESCRIPTION =
  'A free browser extension for Chrome, Edge and Brave. Pick your topics and Lensing blurs the posts on X, LinkedIn and Reddit that are not about them.';

/** The plain-words version, for people rather than crawlers. */
export const LENSING_SUMMARY =
  'Lensing is a free add-on for your web browser. You tell it what you came to read about, and it fades out everything else in your feed.';

export const LENSING_BROWSERS = 'Chrome, Edge, Brave and other Chrome-based browsers';

/** Empty until the store listing is live; every install link checks it first. */
export const LENSING_STORE_URL = '';

/** Shown on the policy pages. Bump on any material change. */
export const LENSING_POLICY_DATE = '13 September 2026';

export const LENSING_KEYWORDS = [
  'Lensing',
  'browser extension',
  'feed filter',
  'content blurring',
  'on-device AI',
  'privacy',
  'X',
  'LinkedIn',
  'Reddit',
];

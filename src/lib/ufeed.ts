import { SITE_URL } from './site';

export const UFEED_NAME = 'uFeed';

/** Leading and trailing slash, matching the site's `trailingSlash` export. */
export const UFEED_PATH = '/ufeed-browser-extension/';
export const UFEED_URL = `${SITE_URL}${UFEED_PATH}`;
export const UFEED_TAGLINE = 'Local AI feed cleaner for social media';

/** Kept under ~160 characters so search results show it whole. */
export const UFEED_DESCRIPTION =
  'A free browser extension for Chrome, Edge and Brave. Local AI blurs distracting posts on X, LinkedIn and Reddit — nothing leaves your device.';

/** The plain-words version, for people rather than crawlers. */
export const UFEED_SUMMARY =
  'uFeed is a free add-on for your web browser. You tell it what you came to read about, and it fades out everything else in your feed.';

export const UFEED_BROWSERS = 'Chrome, Edge, Brave and other Chrome-based browsers';

/** Set once the store listing goes live; every install link checks it first. */
export const UFEED_STORE_URL =
  'https://chromewebstore.google.com/detail/ahlojbckjlffcfdhmkjepaglnhhpmdck';

/** Shown on the policy pages. Bump the relevant date on any material change. */
export const UFEED_PRIVACY_DATE = '23 September 2026';
export const UFEED_TERMS_DATE = '14 September 2026';

export const UFEED_KEYWORDS = [
  'uFeed',
  'browser extension',
  'feed cleaner',
  'content blurring',
  'local AI',
  'distraction',
  'privacy',
  'X',
  'LinkedIn',
  'Reddit',
];

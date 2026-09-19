import { SITE_URL } from './site';

export const FEEDLENS_NAME = 'FeedLens';

/** Leading and trailing slash, matching the site's `trailingSlash` export. */
export const FEEDLENS_PATH = '/feedlens-browser-extension/';
export const FEEDLENS_URL = `${SITE_URL}${FEEDLENS_PATH}`;
export const FEEDLENS_TAGLINE = 'Local AI feed cleaner for social media';

/** Kept under ~160 characters so search results show it whole. */
export const FEEDLENS_DESCRIPTION =
  'A free browser extension for Chrome, Edge and Brave. Local AI blurs distracting posts on X, LinkedIn and Reddit — nothing leaves your device.';

/** The plain-words version, for people rather than crawlers. */
export const FEEDLENS_SUMMARY =
  'FeedLens is a free add-on for your web browser. You tell it what you came to read about, and it fades out everything else in your feed.';

export const FEEDLENS_BROWSERS = 'Chrome, Edge, Brave and other Chrome-based browsers';

/** Set once the store listing goes live; every install link checks it first. */
export const FEEDLENS_STORE_URL =
  'https://chromewebstore.google.com/detail/ahlojbckjlffcfdhmkjepaglnhhpmdck';

/** Shown on the policy pages. Bump on any material change. */
export const FEEDLENS_POLICY_DATE = '14 September 2026';

export const FEEDLENS_KEYWORDS = [
  'FeedLens',
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

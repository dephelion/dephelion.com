import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const PAGES = [
  { path: '/', priority: 1, changeFrequency: 'monthly' as const },
  { path: '/lensing-browser-extension/', priority: 0.8, changeFrequency: 'monthly' as const },
  {
    path: '/lensing-browser-extension/privacy/',
    priority: 0.3,
    changeFrequency: 'yearly' as const,
  },
  { path: '/lensing-browser-extension/terms/', priority: 0.3, changeFrequency: 'yearly' as const },
  {
    path: '/lensing-browser-extension/contact/',
    priority: 0.4,
    changeFrequency: 'yearly' as const,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

import type { MetadataRoute } from 'next';
import { canonicalUrl } from '@/config/business';

const PUBLIC_ROUTES = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/servizi', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/chi-siamo', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contatti', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/lavora-con-noi', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/prodotti', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/location', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/testimonianze', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/cookie-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/termini-servizio', changeFrequency: 'yearly', priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: canonicalUrl(path),
    changeFrequency,
    priority,
  }));
}

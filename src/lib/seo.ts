import type { Metadata } from 'next';
import { BUSINESS, canonicalUrl } from '@/config/business';

const SOCIAL_IMAGE = '/og-maskio-1200x630.webp';

export function publicPageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const url = canonicalUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'it_IT',
      siteName: BUSINESS.name,
      title,
      description,
      url,
      images: [{
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: `Interno del salone ${BUSINESS.name} a San Giovanni Rotondo`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: `Interno del salone ${BUSINESS.name} a San Giovanni Rotondo`,
      }],
    },
  };
}

export const PRIVATE_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: false,
  noarchive: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

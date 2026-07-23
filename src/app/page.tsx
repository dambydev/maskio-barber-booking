import HomePageClient from './HomePageClient';
import JsonLdScript from '@/components/JsonLdScript';
import { publicPageMetadata } from '@/lib/seo';

export const metadata = publicPageMetadata({
  title: 'Maskio Barber Concept | Barbiere a San Giovanni Rotondo',
  description: 'Maskio Barber Concept è il barbiere a San Giovanni Rotondo per taglio uomo e cura della barba. Scopri il salone e prenota online.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <JsonLdScript />
      <HomePageClient />
    </>
  );
}

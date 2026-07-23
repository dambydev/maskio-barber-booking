import { publicPageMetadata } from '@/lib/seo';

export const metadata = publicPageMetadata({
  title: 'Prodotti per capelli e barba',
  description: 'Scopri i prodotti per capelli, barba e styling disponibili da Maskio Barber Concept a San Giovanni Rotondo.',
  path: '/prodotti',
});

export default function ProdottiLayout({ children }: { children: React.ReactNode }) {
  return children;
}

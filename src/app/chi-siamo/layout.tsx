import { publicPageMetadata } from '@/lib/seo';

export const metadata = publicPageMetadata({
  title: 'Chi siamo',
  description: 'Conosci la storia, il team e l’approccio di Maskio Barber Concept, barbiere a San Giovanni Rotondo dal 2023.',
  path: '/chi-siamo',
});

export default function ChiSiamoLayout({ children }: { children: React.ReactNode }) {
  return children;
}

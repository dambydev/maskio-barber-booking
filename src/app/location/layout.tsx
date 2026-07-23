import { publicPageMetadata } from '@/lib/seo';

export const metadata = publicPageMetadata({
  title: 'Dove siamo a San Giovanni Rotondo',
  description: "Trova Maskio Barber Concept in Via Sant'Agata 24 a San Giovanni Rotondo: mappa, indicazioni e orari ufficiali.",
  path: '/location',
});

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import { publicPageMetadata } from '@/lib/seo';

export const metadata = publicPageMetadata({
  title: 'Testimonianze dei clienti',
  description: 'Scopri le esperienze condivise dai clienti di Maskio Barber Concept a San Giovanni Rotondo.',
  path: '/testimonianze',
});

export default function TestimonianzeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

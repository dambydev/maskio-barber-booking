import { publicPageMetadata } from '@/lib/seo';

export const metadata = publicPageMetadata({
  title: 'Recensioni Google',
  description: 'Leggi le recensioni Google di chi ha scelto Maskio Barber Concept a San Giovanni Rotondo.',
  path: '/reviews',
});

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

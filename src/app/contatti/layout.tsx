import { publicPageMetadata } from '@/lib/seo';

export const metadata = publicPageMetadata({
  title: 'Contatti e orari',
  description: "Contatta Maskio Barber Concept a San Giovanni Rotondo: telefono, email, orari e indirizzo in Via Sant'Agata 24.",
  path: '/contatti',
});

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return children;
}

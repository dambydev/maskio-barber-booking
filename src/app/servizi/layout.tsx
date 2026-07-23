import { publicPageMetadata } from '@/lib/seo';

export const metadata = publicPageMetadata({
  title: 'Servizi di barberia',
  description: 'Consulta i servizi e i prezzi disponibili per ciascun barbiere di Maskio Barber Concept a San Giovanni Rotondo.',
  path: '/servizi',
});

export default function ServiziLayout({ children }: { children: React.ReactNode }) {
  return children;
}

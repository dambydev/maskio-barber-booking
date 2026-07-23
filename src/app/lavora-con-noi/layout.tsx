import { publicPageMetadata } from '@/lib/seo';

export const metadata = publicPageMetadata({
  title: 'Lavora con noi',
  description: 'Consulta le opportunità per entrare nel team di Maskio Barber Concept a San Giovanni Rotondo e invia la tua candidatura.',
  path: '/lavora-con-noi',
});

export default function LavoraConNoiLayout({ children }: { children: React.ReactNode }) {
  return children;
}

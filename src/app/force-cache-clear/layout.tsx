import type { Metadata } from 'next';
import { PRIVATE_ROBOTS } from '@/lib/seo';

export const metadata: Metadata = { title: 'Aggiornamento cache', robots: PRIVATE_ROBOTS };

export default function ForceCacheClearLayout({ children }: { children: React.ReactNode }) {
  return children;
}

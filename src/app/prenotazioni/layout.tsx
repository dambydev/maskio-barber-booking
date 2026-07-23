import type { Metadata } from 'next';
import { PRIVATE_ROBOTS } from '@/lib/seo';

export const metadata: Metadata = { title: 'Le tue prenotazioni', robots: PRIVATE_ROBOTS };

export default function PrenotazioniLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';
import { PRIVATE_ROBOTS } from '@/lib/seo';
import PannelloClientLayout from './PannelloClientLayout';

export const metadata: Metadata = {
  title: 'Pannello prenotazioni',
  robots: PRIVATE_ROBOTS,
};

export default function PannelloLayout({ children }: { children: React.ReactNode }) {
  return <PannelloClientLayout>{children}</PannelloClientLayout>;
}

import type { Metadata } from 'next';
import { PRIVATE_ROBOTS } from '@/lib/seo';

export const metadata: Metadata = { title: 'Area personale', robots: PRIVATE_ROBOTS };

export default function AreaPersonaleLayout({ children }: { children: React.ReactNode }) {
  return children;
}

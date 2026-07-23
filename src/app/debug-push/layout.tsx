import type { Metadata } from 'next';
import { PRIVATE_ROBOTS } from '@/lib/seo';

export const metadata: Metadata = { title: 'Debug notifiche', robots: PRIVATE_ROBOTS };

export default function DebugPushLayout({ children }: { children: React.ReactNode }) {
  return children;
}

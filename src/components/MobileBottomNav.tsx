'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  HomeIcon, 
  InformationCircleIcon, 
  ScissorsIcon, 
  MapPinIcon, 
  UserIcon,
  ClipboardDocumentListIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  InformationCircleIcon as InformationCircleIconSolid,
  ScissorsIcon as ScissorsIconSolid,
  MapPinIcon as MapPinIconSolid,
  UserIcon as UserIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid
} from '@heroicons/react/24/solid';

export default function MobileBottomNav() {
  const [isStandalone, setIsStandalone] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  
  // Verifica se l'utente è un barbiere
  const isBarber = session?.user?.role === 'barber';

  useEffect(() => {
    // Rileva se l'app è in modalità standalone (PWA installata)
    const checkStandalone = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.matchMedia('(display-mode: fullscreen)').matches ||
                        (window.navigator as any).standalone === true;
      setIsStandalone(standalone);
    };

    checkStandalone();

    // Ascolta i cambi di modalità
    const standaloneQuery = window.matchMedia('(display-mode: standalone)');
    standaloneQuery.addEventListener('change', checkStandalone);

    return () => {
      standaloneQuery.removeEventListener('change', checkStandalone);
    };
  }, []);

  // Non mostrare la navbar se non è in modalità standalone
  if (!isStandalone) {
    return null;
  }

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
    },
    {
      name: 'Chi Siamo',
      href: '/chi-siamo',
      icon: InformationCircleIcon,
      iconSolid: InformationCircleIconSolid,
    },
    // Bottone centrale che cambia in base al ruolo
    isBarber ? {
      name: 'Pannello',
      href: '/pannello-prenotazioni',
      icon: ClipboardDocumentListIcon,
      iconSolid: ClipboardDocumentListIconSolid,
      isHighlight: true,
    } : {
      name: 'Prenota',
      href: '/prenota',
      icon: ScissorsIcon,
      iconSolid: ScissorsIconSolid,
      isHighlight: true,
    },
    {
      name: 'Location',
      href: '/location',
      icon: MapPinIcon,
      iconSolid: MapPinIconSolid,
    },
    {
      name: 'Profilo',
      href: session ? '/area-personale' : '/auth/signin',
      icon: UserIcon,
      iconSolid: UserIconSolid,
    },
  ];

  return (
    <nav className="standalone-only fixed inset-x-0 bottom-0 z-[90] px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 sm:px-4">
      <div className="mx-auto max-w-lg rounded-[1.6rem] border border-amber-400/20 bg-[linear-gradient(180deg,rgba(17,16,14,0.94),rgba(9,8,7,0.98))] px-2 py-2 shadow-[0_-16px_40px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
        <div className="grid grid-cols-5 items-end gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = isActive ? item.iconSolid : item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`bottom-nav-item group flex min-h-[3.75rem] flex-col items-center justify-center gap-1 rounded-[1.15rem] px-1 py-2 text-center transition-all duration-200 ${
                  item.isHighlight
                    ? isActive
                      ? 'bg-amber-400 text-black shadow-[0_10px_24px_rgba(216,173,76,0.28)]'
                      : 'bg-amber-500 text-black shadow-[0_10px_24px_rgba(216,173,76,0.18)]'
                    : isActive
                      ? 'bg-white/[0.06] text-amber-200 ring-1 ring-amber-300/20'
                      : 'text-zinc-400 hover:bg-white/[0.035] hover:text-zinc-100'
                }`}
              >
                <IconComponent className={`h-5 w-5 ${item.isHighlight && isActive ? 'text-black' : ''}`} />
                <span className={`text-[0.68rem] font-semibold leading-none tracking-tight ${item.isHighlight && isActive ? 'text-black' : ''}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

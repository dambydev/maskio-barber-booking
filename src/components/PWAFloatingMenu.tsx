'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ScissorsIcon,
  MapPinIcon,
  PhoneIcon,
  BriefcaseIcon,
  StarIcon,
  ShoppingBagIcon,
  InformationCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function PWAFloatingMenu() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  // Non mostrare se non è in modalità standalone
  if (!isStandalone) {
    return null;
  }

  const menuItems = [
    {
      name: 'Home',
      href: '/',
      icon: HomeIcon,
      description: 'Torna alla homepage'
    },
    {
      name: 'Chi Siamo',
      href: '/chi-siamo',
      icon: InformationCircleIcon,
      description: 'La nostra storia'
    },    {
      name: 'Servizi',
      href: '/servizi',
      icon: ScissorsIcon,
      description: 'I nostri servizi'
    },
    // {
    //   name: 'Prodotti',
    //   href: '/prodotti',
    //   icon: ShoppingBagIcon,
    //   description: 'Prodotti per capelli'
    // }, // Temporaneamente nascosto
    {
      name: 'Location',
      href: '/location',
      icon: MapPinIcon,
      description: 'Dove siamo'
    },
    {
      name: 'Contatti',
      href: '/contatti',
      icon: PhoneIcon,
      description: 'Come contattarci'
    },
    {
      name: 'Testimonianze',
      href: '/testimonianze',
      icon: StarIcon,
      description: 'Cosa dicono di noi'
    },
    {
      name: 'Lavora con noi',
      href: '/lavora-con-noi',
      icon: BriefcaseIcon,
      description: 'Unisciti al team'
    }
  ];

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Chiudi menu rapido"
          className="fixed inset-0 z-[88] standalone-only cursor-default bg-black/35 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="standalone-only fixed right-3 top-[calc(env(safe-area-inset-top)+0.75rem)] z-[89] sm:right-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-11 items-center gap-2 rounded-full border border-amber-300/18 px-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-200 active:scale-[0.98] ${isOpen
            ? 'bg-white/[0.08] backdrop-blur-xl'
            : 'bg-[linear-gradient(180deg,rgba(216,173,76,0.96),rgba(185,132,42,0.96))] text-black'
          }`}
          aria-label={isOpen ? 'Chiudi menu rapido' : 'Apri menu rapido'}
          aria-expanded={isOpen}
        >
          <SparklesIcon className="h-4 w-4" />
          <span className="tracking-tight">Menu</span>
          {isOpen ? <XMarkIcon className="h-4.5 w-4.5" /> : <Bars3Icon className="h-4.5 w-4.5" />}
        </button>

        {isOpen && (
          <div className="mt-2 w-[min(18rem,calc(100vw-1.5rem))] overflow-hidden rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,17,15,0.98),rgba(9,8,7,0.98))] shadow-[0_28px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-amber-200/80">Scorciatoie</p>
                <p className="mt-1 text-sm text-zinc-300">Navigazione rapida</p>
              </div>
              <span className="rounded-full border border-amber-300/15 bg-amber-300/8 px-2.5 py-1 text-[0.65rem] font-semibold text-amber-100">PWA</span>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 rounded-[1rem] px-3 py-3 transition-colors hover:bg-white/[0.05] active:scale-[0.99]"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/15 bg-amber-300/8 text-amber-200">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-semibold text-white">{item.name}</h4>
                      <p className="truncate text-xs text-zinc-400">{item.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

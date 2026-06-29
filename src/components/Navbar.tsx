'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import { usePWA } from '@/hooks/usePWA';
import BookingButton from './BookingButton';
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  BriefcaseIcon,
  HomeIcon,
  MapPinIcon,
  PhoneIcon,
  ScissorsIcon,
  StarIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Chi siamo', href: '/chi-siamo', icon: UserGroupIcon },
  { name: 'Servizi', href: '/servizi', icon: ScissorsIcon },
  { name: 'Location', href: '/location', icon: MapPinIcon },
  { name: 'Contatti', href: '/contatti', icon: PhoneIcon },
  { name: 'Recensioni', href: '/testimonianze', icon: StarIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { isStandalone } = usePWA();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isBarber = session?.user?.role === 'barber';
  const isAdmin = session?.user?.role === 'admin';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const accountLinks = (
    <>
      <Link
        href="/area-personale"
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-100 transition-colors hover:bg-white/[0.06] hover:text-yellow-100"
      >
        <UserIcon className="h-5 w-5 text-yellow-300" aria-hidden="true" />
        Area personale
      </Link>
      <Link
        href="/area-personale/profilo"
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-100 transition-colors hover:bg-white/[0.06] hover:text-yellow-100"
      >
        <UserIcon className="h-5 w-5 text-yellow-300" aria-hidden="true" />
        Profilo
      </Link>
      {(isAdmin || isBarber) && (
        <Link
          href="/admin/users"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-yellow-100 transition-colors hover:bg-yellow-400/10"
        >
          <UserGroupIcon className="h-5 w-5 text-yellow-300" aria-hidden="true" />
          Pannello admin
        </Link>
      )}
      <button
        type="button"
        onClick={() => signOut()}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-200 transition-colors hover:bg-red-500/10 hover:text-red-100"
      >
        <ArrowRightStartOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
        Esci
      </button>
    </>
  );

  return (
    <>
      <header className={`navbar-main fixed inset-x-0 top-0 z-[100] px-3 py-3 ${isStandalone ? 'standalone-hidden' : ''}`}>
        <div className="mx-auto max-w-7xl">
          <div className="maskio-panel flex h-[64px] items-center justify-between rounded-2xl px-3 backdrop-blur-xl sm:px-4">
            <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="Maskio Barber Concept home">
              <Image
                src="/LogoSimboloNome_BiancoOrizzontale_BUONO.png"
                alt="Maskio Barber Concept"
                width={260}
                height={65}
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-[1.015] sm:h-14"
                priority
                quality={85}
              />
            </Link>

            <nav className="hidden items-center gap-1 xl:flex" aria-label="Navigazione principale">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-yellow-300/14 text-yellow-100 ring-1 ring-yellow-300/20'
                        : 'text-zinc-300 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden lg:block">
                {isBarber ? (
                  <Link href="/pannello-prenotazioni" className="maskio-button px-4 py-2 text-sm">
                    Pannello
                  </Link>
                ) : (
                  <BookingButton className="px-4 py-2 text-sm">Prenota</BookingButton>
                )}
              </div>

              {session ? (
                <div className="relative hidden lg:block">
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((open) => !open)}
                    className="flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-yellow-300/30 hover:bg-yellow-300/10"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="menu"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-300/14 text-yellow-200">
                      <UserIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="max-w-[8rem] truncate">{session.user.name}</span>
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="maskio-panel absolute right-0 top-[calc(100%+0.75rem)] w-64 rounded-2xl p-2 shadow-2xl"
                        role="menu"
                      >
                        <div className="border-b border-white/10 px-3 py-3">
                          <p className="truncate text-sm font-semibold text-white">{session.user.name}</p>
                          <p className="truncate text-xs text-zinc-400">{session.user.email}</p>
                        </div>
                        <div className="pt-2">{accountLinks}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : status !== 'loading' ? (
                <Link
                  href="/auth/signin"
                  className="hidden min-h-11 items-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-yellow-300/30 hover:bg-yellow-300/10 lg:inline-flex"
                >
                  Accedi
                </Link>
              ) : null}

              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-yellow-300/30 hover:bg-yellow-300/10 xl:hidden"
                aria-label={mobileMenuOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[95] bg-black/78 backdrop-blur-xl xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 280 }}
              className="maskio-panel ml-auto flex h-full w-full max-w-[24rem] flex-col rounded-l-[1.6rem] border-y-0 border-r-0 p-5 pt-24"
            >
              <div className="flex-1 overflow-y-auto pr-1">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-yellow-200/80">Menu</p>
                <nav className="space-y-1" aria-label="Menu mobile">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold transition-colors ${
                          active ? 'bg-white/[0.06] text-yellow-100 ring-1 ring-yellow-300/25' : 'text-zinc-100 hover:bg-white/[0.06]'
                        }`}
                      >
                        <Icon className="h-5 w-5 text-yellow-300" aria-hidden="true" />
                        {item.name}
                      </Link>
                    );
                  })}
                  <Link
                    href="/lavora-con-noi"
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold text-zinc-100 transition-colors hover:bg-white/[0.06]"
                  >
                    <BriefcaseIcon className="h-5 w-5 text-yellow-300" aria-hidden="true" />
                    Lavora con noi
                  </Link>
                </nav>

                <div className="mt-6 border-t border-white/10 pt-5">
                  {session ? (
                    <>
                      <p className="mb-3 px-3 text-sm text-zinc-400">Account di {session.user.name}</p>
                      <div className="space-y-1">{accountLinks}</div>
                    </>
                  ) : status !== 'loading' ? (
                    <Link href="/auth/signin" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold text-yellow-100 hover:bg-yellow-300/10">
                      <UserIcon className="h-5 w-5" aria-hidden="true" />
                      Accedi
                    </Link>
                  ) : null}
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                {isBarber ? (
                  <Link href="/pannello-prenotazioni" className="maskio-button w-full px-6 py-3 text-base">
                    Apri pannello prenotazioni
                  </Link>
                ) : (
                  <BookingButton className="w-full text-base font-semibold">Prenota ora</BookingButton>
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/maskio_barberconcept/',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/p/Maskio-barber-concept-100092091309931/',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@maskio_barberconcept',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

const footerLinks = [
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Cookie', href: '/cookie-policy' },
  { label: 'Termini', href: '/termini-servizio' },
];

export default function Footer() {
  return (
    <footer className="footer-main standalone-hidden relative isolate overflow-hidden border-t border-yellow-500/15 bg-[#050505] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_0%,rgba(216,173,76,0.12),transparent_34rem),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_35%)]" />
      <div className="maskio-wide py-14 sm:py-18">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1.3fr_1fr] lg:items-end">
          <div className="maskio-panel rounded-2xl p-6">
            <p className="maskio-kicker">San Giovanni Rotondo</p>
            <h2 className="maskio-heading mt-5 text-4xl font-bold text-white sm:text-5xl">
              Il prossimo taglio parte da qui.
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-zinc-300">
              Tagli, styling e cura della barba in un salone diretto, preciso e riconoscibile.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link href="/prenota" className="maskio-button px-5 py-3 text-sm">
                Prenota ora
              </Link>
              <a href="tel:+393317100730" className="maskio-button-secondary px-5 py-3 text-sm">
                Chiama il salone
              </a>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="maskio-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-yellow-100">Contatti</h3>
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-300">
                <a href="tel:+393317100730" className="block transition-colors hover:text-yellow-100">+39 331 710 0730</a>
                <a href="mailto:fabio.cassano97@icloud.com" className="block break-words transition-colors hover:text-yellow-100">fabio.cassano97@icloud.com</a>
                <p>Via Sant'Agata, 24<br />San Giovanni Rotondo (FG)</p>
              </div>
            </div>

            <div className="maskio-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-yellow-100">Orari</h3>
              <dl className="mt-5 space-y-3 text-sm text-zinc-300">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                  <dt>Lun-Sab</dt>
                  <dd className="text-right text-white">9:00-13:00<br />15:00-18:00</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Giovedì e Domenica</dt>
                  <dd className="text-right text-red-200">Chiuso</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 lg:items-end lg:text-right">
            <Link href="/" className="inline-flex">
              <Image
                src="/LogoSimboloNome_BiancoOrizzontale_BUONO.png"
                alt="Maskio Barber Concept"
                width={270}
                height={70}
                className="h-16 w-auto"
                loading="lazy"
                quality={75}
              />
            </Link>
            <div className="flex gap-3">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-yellow-300/35 hover:bg-yellow-500/15 hover:text-yellow-100"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label={item.name}
                  title={item.name}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Via+Sant'Agata+24,+San+Giovanni+Rotondo,+FG,+Italy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-yellow-200 underline decoration-yellow-200/25 underline-offset-4 transition-colors hover:text-yellow-100"
            >
              Apri su Google Maps
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>&copy; {new Date().getFullYear()} Maskio Barber Concept. Tutti i diritti riservati.</p>
            <p>P.IVA: 04123456789 • Sito realizzato da <a href="https://linktr.ee/dambystudio" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200">dambystudio</a></p>
          </div>
          <nav className="flex flex-wrap gap-4" aria-label="Link legali">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

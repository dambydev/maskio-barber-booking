'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/maskio_barberconcept/',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/p/Maskio-barber-concept-100092091309931/',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@maskio_barberconcept',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer-main standalone-hidden relative border-t border-yellow-500/15 bg-[#050505] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/35 to-transparent" />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <h3 className="mb-6 text-xl font-semibold text-yellow-200">Contatti</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <svg className="h-5 w-5 flex-shrink-0 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498A1 1 0 0 1 21 16.72V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5Z" />
                </svg>
                <a href="tel:+393317100730" className="text-zinc-300 transition-colors hover:text-white">
                  +39 331 710 0730
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <svg className="h-5 w-5 flex-shrink-0 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 4.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
                </svg>
                <a href="mailto:fabio.cassano97@icloud.com" className="break-words text-zinc-300 transition-colors hover:text-white">
                  fabio.cassano97@icloud.com
                </a>
              </div>
              <div className="mt-6 flex flex-col items-center space-y-2">
                <div className="mb-2 flex items-center gap-2">
                  <svg className="h-5 w-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="text-sm font-medium text-zinc-300">Orari</span>
                </div>
                <div className="text-center text-sm text-zinc-300">
                  <div>Lun-Sab: 9:00-13:00</div>
                  <div>15:00-18:00</div>
                  <div className="mt-2 text-red-300">Giovedì e Domenica: Chiuso</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <Link href="/" className="mb-6 flex justify-center">
              <Image
                src="/LogoSimboloNome_BiancoOrizzontale_BUONO.png"
                alt="Maskio Barber Concept"
                width={280}
                height={70}
                className="h-20 w-auto"
                loading="lazy"
                quality={75}
              />
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-zinc-400">
              Il tuo barbiere di fiducia per un look sempre perfetto. Tradizione, stile e innovazione in un unico posto.
            </p>
            <h3 className="mb-4 text-xl font-semibold text-yellow-200">Seguici</h3>
            <div className="flex justify-center gap-6">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-zinc-300 transition-colors duration-200 hover:bg-white/[0.06] hover:text-yellow-200"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={item.name}
                  aria-label={item.name}
                >
                  <div className="flex h-8 w-8 items-center justify-center">{item.icon}</div>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <h3 className="mb-6 text-xl font-semibold text-yellow-200">Dove siamo</h3>
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-3">
                <svg className="h-6 w-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657 13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <p className="leading-relaxed text-zinc-300">
                  Via Sant'Agata, 24<br />
                  San Giovanni Rotondo (FG)
                </p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Via+Sant'Agata+24,+San+Giovanni+Rotondo,+FG,+Italy"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-yellow-200 transition-colors hover:bg-white/[0.06] hover:text-yellow-100"
              >
                <span>Visualizza sulla mappa</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
            <div className="flex flex-col items-center space-y-2 md:items-start">
              <p className="text-sm text-zinc-400">&copy; {new Date().getFullYear()} Maskio Barber Concept. Tutti i diritti riservati.</p>
              <p className="text-xs text-zinc-500">P.IVA: 04123456789 • San Giovanni Rotondo (FG)</p>
              <p className="text-xs text-zinc-500">
                Sito realizzato da{' '}
                <a href="https://linktr.ee/dambystudio" target="_blank" rel="noopener noreferrer" className="font-medium text-yellow-200 transition-colors hover:text-yellow-100">
                  dambystudio
                </a>
              </p>
            </div>
            <nav className="flex flex-wrap justify-center gap-5 text-sm" aria-label="Link legali">
              <Link href="/privacy-policy" className="text-zinc-400 transition-colors hover:text-white">Privacy Policy</Link>
              <Link href="/cookie-policy" className="text-zinc-400 transition-colors hover:text-white">Cookie Policy</Link>
              <Link href="/termini-servizio" className="text-zinc-400 transition-colors hover:text-white">Termini di Servizio</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

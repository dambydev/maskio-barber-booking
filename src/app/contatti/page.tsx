'use client';

import { motion } from 'framer-motion';
import BookingButton from '../../components/BookingButton';
import { BUSINESS, formatBusinessHours } from '@/config/business';

const contactCards = [
  {
    title: 'Telefono',
    value: BUSINESS.telephone,
    helper: 'Per chiamare direttamente il salone',
    href: BUSINESS.telephoneHref,
    icon: 'M3 5a2 2 0 0 1 2-2h2.2a1 1 0 0 1 .95.68l1.1 3.3a1 1 0 0 1-.45 1.17l-1.5.9a12 12 0 0 0 5.65 5.65l.9-1.5a1 1 0 0 1 1.17-.45l3.3 1.1a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2h-1C8.27 21 3 15.73 3 9V5Z',
  },
  {
    title: 'Email',
    value: BUSINESS.email,
    helper: 'Per richieste e comunicazioni',
    href: `mailto:${BUSINESS.email}`,
    icon: 'M4 6h16v12H4V6Zm0 0 8 7 8-7',
  },
  {
    title: 'Indirizzo',
    value: `${BUSINESS.address.street}\n${BUSINESS.address.postalCode} ${BUSINESS.address.locality} (${BUSINESS.address.province})`,
    helper: 'Apri la mappa e raggiungici',
    href: BUSINESS.mapsUrl,
    icon: 'M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  },
];

const hours = BUSINESS.hours.map(({ day, periods }) => ({
  day,
  time: formatBusinessHours(periods),
  closed: periods.length === 0,
}));

export default function Page() {
  return (
    <main className="maskio-page maskio-grain py-24 sm:py-28">
      <div className="maskio-wide relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end"
        >
          <div>
            <p className="maskio-kicker">Contatti</p>
            <h1 className="maskio-heading mt-6 max-w-4xl text-6xl font-bold text-white sm:text-7xl lg:text-8xl">
              Parliamo del tuo prossimo taglio.
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl lg:justify-self-end">
            Chiamaci, scrivici o raggiungici in salone. Manteniamo il contatto semplice, diretto e utile.
          </p>
        </motion.section>

        <section className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {contactCards.map((card, index) => (
            <motion.a
              key={card.title}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`maskio-card group block rounded-2xl p-6 transition-colors hover:border-yellow-300/35 ${index === 1 ? 'md:translate-y-8' : ''}`}
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-200 transition-colors group-hover:bg-yellow-300 group-hover:text-black">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-white">{card.title}</h2>
              <p className="mt-4 whitespace-pre-line break-words text-zinc-300">{card.value}</p>
              <p className="mt-6 text-sm font-semibold text-yellow-200">{card.helper}</p>
            </motion.a>
          ))}
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="maskio-panel rounded-2xl p-6 sm:p-8">
            <h2 className="maskio-heading text-5xl font-bold text-white sm:text-6xl">Orari</h2>
            <div className="mt-8 space-y-4">
              {hours.map((item) => (
                <div key={item.day} className="flex items-start justify-between gap-5 border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{item.day}</p>
                  <p className={`text-right tabular-nums ${item.closed ? 'text-red-200' : 'text-zinc-300'}`}>{item.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-yellow-500/20 bg-[radial-gradient(circle_at_18%_0%,rgba(216,173,76,0.18),transparent_30rem),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018))] p-8 sm:p-10">
            <h2 className="text-3xl font-semibold text-white">Pronto per il tuo nuovo look?</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-zinc-300">
              Prenota il tuo appuntamento e lasciati guidare dal team Maskio Barber Concept.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookingButton size="lg" className="rounded-full bg-yellow-400 px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-yellow-300">
                Prenota ora
              </BookingButton>
              <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="maskio-button-secondary px-6 py-3">
                Apri la mappa
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

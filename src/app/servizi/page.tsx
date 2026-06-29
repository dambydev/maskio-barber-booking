'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import BookingButton from '../../components/BookingButton';
import { barbersFromData } from '../../data/booking';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function parseSpecialties(specialties: unknown): string[] {
  if (Array.isArray(specialties)) return specialties;
  if (typeof specialties === 'string') {
    try {
      const parsed = JSON.parse(specialties);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export default function Servizi() {
  return (
    <main className="maskio-page maskio-grain py-24 sm:py-28">
      <div className="maskio-wide relative z-10">
        <motion.section initial="hidden" animate="visible" variants={fadeUp} className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="maskio-kicker">Listino e barbieri</p>
            <h1 className="maskio-heading mt-6 max-w-4xl text-6xl font-bold text-white sm:text-7xl lg:text-8xl">
              Servizi chiari, risultato su misura.
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl lg:justify-self-end">
            Scegli il professionista e il servizio più adatto. I prezzi e le durate restano quelli configurati nel sistema di prenotazione.
          </p>
        </motion.section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          {barbersFromData.map((barber, index) => {
            const specialties = parseSpecialties(barber.specialties);
            return (
              <motion.article
                key={barber.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="maskio-panel overflow-hidden rounded-2xl"
              >
                <div className="grid min-h-full lg:grid-rows-[19rem_1fr_auto]">
                  <div className="relative overflow-hidden">
                    <Image
                      src={barber.image}
                      alt={barber.name}
                      fill
                      className="object-cover object-center grayscale-[10%] transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-yellow-200">{barber.experience}</p>
                      <h2 className="mt-2 text-4xl font-bold text-white">{barber.name}</h2>
                      {specialties.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {specialties.map((specialty) => (
                            <span key={specialty} className="rounded-full border border-yellow-300/25 bg-black/45 px-3 py-1 text-xs font-semibold text-yellow-100 backdrop-blur-sm">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="mb-5 flex items-end justify-between gap-4">
                      <h3 className="text-2xl font-semibold text-white">Servizi disponibili</h3>
                      <span className="text-sm text-zinc-500">{barber.availableServices?.length || 0} voci</span>
                    </div>
                    <div className="space-y-3">
                      {(barber.availableServices || []).map((service) => (
                        <div key={service.id} className="group rounded-2xl border border-white/10 bg-black/22 p-4 transition-colors hover:border-yellow-300/30 hover:bg-yellow-300/[0.035]">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-semibold text-white">{service.name}</h4>
                              <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">{service.description}</p>
                            </div>
                            <div className="text-right tabular-nums">
                              <p className="text-2xl font-bold text-yellow-200">{service.price === 0 ? '-' : `€${service.price}`}</p>
                              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">{service.duration} min</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/10 p-5 sm:p-6">
                    <BookingButton disableAnimation className="w-full rounded-full bg-yellow-400 px-6 py-3 font-bold text-black transition-colors hover:bg-yellow-300">
                      Prenota con {barber.name}
                    </BookingButton>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 overflow-hidden rounded-2xl border border-yellow-500/20 bg-[radial-gradient(circle_at_14%_0%,rgba(216,173,76,0.18),transparent_28rem),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018))] p-8 sm:p-10"
        >
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white">Non sai quale scegliere?</h2>
              <p className="mt-3 max-w-2xl text-zinc-300">
                Prenota e lasciati consigliare in salone: il servizio giusto dipende dal tuo capello, non da una lista più lunga.
              </p>
            </div>
            <BookingButton className="rounded-full bg-yellow-400 px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-yellow-300">
              Prenota subito
            </BookingButton>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

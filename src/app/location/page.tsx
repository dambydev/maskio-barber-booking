'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BUSINESS, formatBusinessHours } from '@/config/business';

const contactActions = [
  { label: 'Chiama', href: BUSINESS.telephoneHref, detail: BUSINESS.telephone },
  { label: 'WhatsApp', href: BUSINESS.whatsappUrl, detail: 'Messaggio diretto' },
];

const hours = BUSINESS.hours.map(({ day, periods }) => ({
  day,
  value: formatBusinessHours(periods),
  active: periods.length > 0,
}));

const arrivalNotes = [
  {
    title: 'Arriva dal centro',
    text: "Via Sant'Agata è facile da raggiungere dalle vie principali di San Giovanni Rotondo.",
  },
  {
    title: 'Apri le indicazioni',
    text: 'Usa la CTA per avviare direttamente il navigatore sul tuo dispositivo.',
  },
  {
    title: 'Se sei in ritardo',
    text: 'Chiama il salone: ti confermiamo subito se possiamo mantenere lo slot.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function Page() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mapLoaded) setMapError(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [mapLoaded]);

  const openMaps = () => {
    const address = BUSINESS.address.formatted;
    const coordinates = `${BUSINESS.coordinates.latitude},${BUSINESS.coordinates.longitude}`;
    const placeName = 'Maskio Barber Concept';
    const userAgent = navigator.userAgent;

    if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.open(`http://maps.apple.com/?q=${encodeURIComponent(placeName)}&ll=${coordinates}&address=${encodeURIComponent(address)}`, '_blank');
    } else if (/Android/.test(userAgent)) {
      window.open(`geo:${coordinates}?q=${encodeURIComponent(`${placeName}, ${address}`)}`, '_blank');
    } else {
      window.open(BUSINESS.mapsUrl, '_blank');
    }
  };

  const openDirections = () => {
    const address = BUSINESS.address.formatted;
    const coordinates = `${BUSINESS.coordinates.latitude},${BUSINESS.coordinates.longitude}`;
    const placeName = 'Maskio Barber Concept';
    const userAgent = navigator.userAgent;

    if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.open(`http://maps.apple.com/?daddr=${coordinates}&dirflg=d`, '_blank');
    } else if (/Android/.test(userAgent)) {
      window.open(`google.navigation:q=${coordinates}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${placeName}, ${address}`)}`, '_blank');
    }
  };

  return (
    <main className="maskio-page maskio-grain overflow-hidden py-24 text-white sm:py-28">
      <section className="maskio-wide relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="maskio-panel flex min-h-[34rem] flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10">
            <div>
              <p className="maskio-kicker">Location</p>
              <h1 className="maskio-heading mt-6 max-w-4xl text-6xl font-bold text-white sm:text-7xl lg:text-8xl">
                Il salone, senza giri a vuoto.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
                Siamo in Via Sant'Agata 24, nel cuore di San Giovanni Rotondo. Apri la mappa, scegli il percorso e arriva diretto al tuo appuntamento.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={openDirections} className="maskio-button px-6 py-4 text-sm uppercase tracking-[0.12em]">
                Indicazioni
              </button>
              <button type="button" onClick={openMaps} className="maskio-button-secondary px-6 py-4 text-sm uppercase tracking-[0.12em]">
                Apri mappa
              </button>
            </div>
          </div>

          <div className="relative min-h-[32rem] overflow-hidden rounded-2xl border border-yellow-500/15 bg-black">
            <Image
              src="/fotoSalone.webp"
              alt="Interno del salone Maskio Barber Concept"
              fill
              className="object-cover object-center contrast-110 saturate-[0.92]"
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/28 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/68 p-5 backdrop-blur-md">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-yellow-200">Indirizzo</p>
              <p className="mt-2 text-2xl font-semibold text-white">Via Sant'Agata, 24</p>
              <p className="mt-1 text-zinc-300">San Giovanni Rotondo (FG)</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="maskio-wide relative z-10 mt-8 grid gap-4 md:grid-cols-3">
        {contactActions.map((action) => (
          <a key={action.label} href={action.href} target={action.href.startsWith('http') ? '_blank' : undefined} rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="maskio-card rounded-2xl p-5 transition-colors hover:border-yellow-300/35">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-yellow-200">{action.label}</p>
            <p className="mt-3 text-lg font-semibold text-white">{action.detail}</p>
          </a>
        ))}
        <button type="button" onClick={openMaps} className="maskio-card rounded-2xl p-5 text-left transition-colors hover:border-yellow-300/35">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-yellow-200">Coordinate</p>
          <p className="mt-3 text-lg font-semibold text-white tabular-nums">{BUSINESS.coordinates.latitude}, {BUSINESS.coordinates.longitude}</p>
        </button>
      </section>

      <section className="maskio-wide relative z-10 mt-16 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="maskio-panel overflow-hidden rounded-2xl p-2">
          <div className="relative min-h-[28rem] overflow-hidden rounded-[1rem] bg-zinc-950">
            {!mapLoaded && !mapError && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-transparent border-t-yellow-300" />
              </div>
            )}

            {mapError ? (
              <button type="button" onClick={openMaps} className="absolute inset-0 flex w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_0%,rgba(216,173,76,0.16),transparent_26rem),#0b0a08] p-8 text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-yellow-200">Mappa non disponibile</span>
                <span className="mt-4 max-w-sm text-2xl font-semibold text-white">Apri la posizione nell'app mappe del dispositivo.</span>
                <span className="maskio-button mt-6 px-6 py-3">Apri mappa</span>
              </button>
            ) : (
              <iframe
                src={`https://www.google.com/maps?q=${BUSINESS.coordinates.latitude},${BUSINESS.coordinates.longitude}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa Maskio Barber Concept - Via Sant'Agata 24, San Giovanni Rotondo"
                className="absolute inset-0 h-full w-full grayscale-[18%] invert-0"
                onLoad={() => setMapLoaded(true)}
                onError={() => setMapError(true)}
              />
            )}
          </div>
        </motion.div>

        <motion.aside initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="space-y-5">
          <div className="maskio-panel rounded-2xl p-6">
            <p className="maskio-kicker">Orari</p>
            <div className="mt-6 space-y-4">
              {hours.map((item) => (
                <div key={item.day} className="flex items-start justify-between gap-5 border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                  <p className="font-semibold text-white">{item.day}</p>
                  <p className={`text-right tabular-nums ${item.active ? 'text-yellow-100' : 'text-red-200'}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="maskio-card rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white">Prima volta da Maskio?</h2>
            <p className="mt-4 leading-relaxed text-zinc-300">
              Tocca “Indicazioni” dal telefono: apriamo il navigatore giusto per iOS, Android o desktop senza cambiare percorso.
            </p>
            <button type="button" onClick={openDirections} className="maskio-button mt-6 w-full px-6 py-3">
              Calcola percorso
            </button>
          </div>
        </motion.aside>
      </section>

      <section className="maskio-wide relative z-10 mt-16">
        <div className="mb-8 max-w-2xl">
          <p className="maskio-kicker">Come arrivare</p>
          <h2 className="maskio-heading mt-5 text-5xl font-bold text-white sm:text-6xl">Tre dettagli utili prima di partire.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {arrivalNotes.map((note, index) => (
            <motion.article key={note.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }} className={`maskio-card rounded-2xl p-6 ${index === 1 ? 'md:translate-y-8' : ''}`}>
              <span className="text-sm font-bold text-yellow-200 tabular-nums">0{index + 1}</span>
              <h3 className="mt-8 text-2xl font-semibold text-white">{note.title}</h3>
              <p className="mt-4 leading-relaxed text-zinc-400">{note.text}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}

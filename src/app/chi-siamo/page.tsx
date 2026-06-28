'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const teamNotes = [
  'Tagli maschili e styling quotidiano',
  'Sfumature, contorni e texture controllate',
  'Consiglio pratico per mantenere il look',
];

export default function ChiSiamo() {
  return (
    <main className="maskio-page maskio-grain py-24 sm:py-28">
      <div className="maskio-wide relative z-10">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div>
            <p className="maskio-kicker">Chi siamo</p>
            <h1 className="maskio-heading mt-6 max-w-4xl text-6xl font-bold text-white sm:text-7xl lg:text-8xl">
              Una bottega moderna per tagli che durano.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
              Da anni nel grooming maschile, portiamo stile e professionalità nel cuore di San Giovanni Rotondo con un approccio concreto: ascolto, precisione, risultato.
            </p>
          </div>

          <div className="maskio-panel rounded-2xl p-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem]">
              <Image
                src="/fotoBarbieri_dietro.webp"
                alt="Barbieri Maskio al lavoro in salone"
                fill
                className="object-cover object-center contrast-110 grayscale-[15%]"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 text-balance text-2xl font-semibold leading-tight text-white">
                L'eccellenza è una tradizione che rinnoviamo ogni giorno.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="mt-20 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="maskio-panel rounded-2xl p-6 sm:p-8">
            <h2 className="maskio-heading text-5xl font-bold text-white sm:text-6xl">Il metodo</h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-300">
              Non partiamo da un taglio standard. Partiamo dal tuo capello, da come lo porti ogni giorno e da quanto tempo vuoi dedicare allo styling.
            </p>
            <div className="mt-8 space-y-4">
              {teamNotes.map((item) => (
                <div key={item} className="flex gap-3 border-t border-white/10 pt-4">
                  <span className="mt-2 h-2 w-2 rotate-45 bg-yellow-300" />
                  <p className="text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="maskio-card rounded-2xl p-6 sm:col-span-2">
              <span className="text-sm font-bold uppercase tracking-[0.14em] text-yellow-200">Hair first</span>
              <h3 className="mt-6 text-3xl font-semibold text-white">Il taglio resta al centro.</h3>
              <p className="mt-4 leading-relaxed text-zinc-400">
                La barba fa parte del servizio, ma il cuore del salone è il lavoro su capelli, volumi, sfumature e finitura.
              </p>
            </div>
            <div className="maskio-card rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-white">Tradizione</h3>
              <p className="mt-4 text-zinc-400">Manualità e attenzione da barber shop, senza cliché vintage forzati.</p>
            </div>
            <div className="maskio-card rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-white">Prenotazione chiara</h3>
              <p className="mt-4 text-zinc-400">Il percorso online resta semplice: scegli servizio, barbiere e orario.</p>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/fotoPosterioreBarbieri.webp"
              alt="Area lavoro del salone Maskio Barber Concept"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <div className="maskio-panel rounded-2xl p-6 sm:p-8">
            <h2 className="text-3xl font-semibold text-white">Vieni in salone con un'idea, esci con un look preciso.</h2>
            <p className="mt-4 leading-relaxed text-zinc-300">
              Ti aiutiamo a scegliere una forma credibile, curata e gestibile anche nei giorni dopo l'appuntamento.
            </p>
            <Link href="/prenota" className="maskio-button mt-7 px-6 py-3">
              Prenota ora
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

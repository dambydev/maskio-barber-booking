'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const featuredProducts = [
  {
    name: 'Pomata Modellante Premium',
    description: 'Pomata professionale a tenuta forte per uno styling ordinato che dura tutta la giornata.',
    price: '€32.00',
    image: '/prodotti.webp',
  },
  {
    name: 'Olio da Barba Artigianale',
    description: 'Olio nutriente per ammorbidire, idratare e rifinire la barba con un profumo discreto.',
    price: '€28.00',
    image: '/prodotti.webp',
  },
  {
    name: 'Kit Barba Completo',
    description: 'Set per la cura quotidiana: olio nutriente, balsamo modellante e pettine in legno.',
    price: '€65.00',
    image: '/prodotti.webp',
  },
];

export default function Page() {
  return (
    <main className="maskio-page maskio-grain py-24 sm:py-28">
      <div className="maskio-wide relative z-10">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="maskio-kicker">Prodotti</p>
            <h1 className="maskio-heading mt-6 max-w-4xl text-6xl font-bold text-white sm:text-7xl lg:text-8xl">Finish professionale, anche a casa.</h1>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl lg:justify-self-end">
            Una selezione essenziale di prodotti per capelli e barba, pensata per mantenere il risultato tra un appuntamento e l'altro.
          </p>
        </motion.section>

        <section className="maskio-panel mt-14 overflow-hidden rounded-2xl p-2">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative min-h-[22rem] overflow-hidden rounded-[1rem] lg:rounded-r-none">
              <Image src="/prodotti.webp" alt="Prodotti professionali Maskio Barber" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
            </div>
            <div className="flex items-center p-6 sm:p-10">
              <div>
                <h2 className="text-4xl font-semibold text-white">Qualità professionale</h2>
                <p className="mt-5 text-lg leading-relaxed text-zinc-300">
                  In salone usiamo prodotti selezionati per tenuta, finitura e facilità di applicazione. Il consiglio sul prodotto giusto arriva dopo aver visto capello, barba e routine.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {['Ingredienti selezionati', 'Consiglio in salone'].map((item) => (
                    <div key={item} className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm font-semibold text-yellow-100">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white">Prodotti in vendita</h2>
            <p className="mt-2 text-zinc-400">Disponibilità e consiglio finale direttamente in salone.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <motion.article key={product.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }} className={`maskio-card overflow-hidden rounded-2xl ${index === 1 ? 'md:translate-y-8' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                  <Image src={product.image} alt={product.name} fill className="object-cover object-center transition-transform duration-700 hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white">{product.name}</h3>
                  <p className="mt-3 min-h-[5rem] text-sm leading-relaxed text-zinc-400">{product.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold text-yellow-200 tabular-nums">{product.price}</span>
                    <Link href="/contatti" className="maskio-button-secondary px-4 py-2 text-sm">Chiedi info</Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-2xl border border-yellow-500/20 bg-[linear-gradient(135deg,rgba(216,173,76,0.18),rgba(255,255,255,0.035))] p-8 text-center sm:p-10">
          <h2 className="text-3xl font-semibold text-white">Vuoi capire cosa usare?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-300">Porta una foto del risultato che cerchi o chiedi consiglio dopo il taglio: ti indichiamo solo ciò che serve davvero.</p>
          <Link href="/contatti" className="maskio-button mt-7 px-8 py-3">Contattaci</Link>
        </section>
      </div>
    </main>
  );
}

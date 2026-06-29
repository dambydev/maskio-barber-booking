import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Chi Siamo | Maskio Barber Concept',
  description: 'Scopri la storia di Maskio Barber Concept, il nostro team di professionisti e la nostra passione per l\'arte del barbiere.',
};

const values = [
  {
    title: 'Qualità misurabile',
    text: 'Prodotti professionali, tagli puliti e finiture controllate su ogni dettaglio visibile.',
  },
  {
    title: 'Consulenza reale',
    text: 'Ogni servizio parte da capelli, forma del viso, routine e risultato desiderato.',
  },
  {
    title: 'Ritmo contemporaneo',
    text: 'Un salone diretto e moderno: prenotazione chiara, tempi rispettati, esperienza senza confusione.',
  },
];

export default function AboutPage() {
  return (
    <main className="maskio-page maskio-grain py-24 sm:py-28">
      <div className="maskio-wide relative z-10">
        <section className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <p className="maskio-kicker">Maskio Barber Concept</p>
            <h1 className="maskio-heading mt-6 max-w-3xl text-6xl font-bold text-white sm:text-7xl lg:text-8xl">
              Stile maschile, senza rumore.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
              La passione per l'arte del barbiere incontra una cultura del taglio più moderna, precisa e personale.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/prenota" className="maskio-button px-6 py-3">
                Prenota un appuntamento
              </Link>
              <Link href="/servizi" className="maskio-button-secondary px-6 py-3">
                Vedi i servizi
              </Link>
            </div>
          </div>

          <div className="maskio-panel relative overflow-hidden rounded-2xl p-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] sm:aspect-[16/11] lg:aspect-[4/5]">
              <Image
                src="/fotoSalone.webp"
                alt="Interno del salone Maskio Barber Concept"
                fill
                className="object-cover object-center contrast-110 saturate-[0.92]"
                sizes="(max-width: 1024px) 100vw, 48vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/58 p-4 backdrop-blur-md">
                <p className="text-sm font-semibold text-yellow-100">Via Sant'Agata, 24</p>
                <p className="mt-1 text-sm text-zinc-300">San Giovanni Rotondo</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="maskio-heading text-5xl font-bold text-white sm:text-6xl">La nostra storia</h2>
            <p className="mt-5 max-w-md leading-relaxed text-zinc-400">
              Un'identità locale, un metodo contemporaneo e un'attenzione concreta al risultato finale.
            </p>
          </div>
          <div className="maskio-panel rounded-2xl p-6 sm:p-8">
            <div className="space-y-5 text-lg leading-relaxed text-zinc-300">
              <p>
                Maskio Barber Concept nasce dalla passione per l'arte tradizionale del barbiere, combinata con tecniche moderne e un modo più ordinato di vivere il salone.
              </p>
              <p>
                Situati nel cuore di San Giovanni Rotondo, lavoriamo su taglio, styling e cura della barba con una promessa semplice: capire cosa ti valorizza e renderlo facile da mantenere.
              </p>
              <p>
                Il team è dedicato a offrire servizi di alta qualità in un ambiente curato, diretto e accogliente, senza sovraccaricare l'esperienza con formalità inutili.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {values.map((value, index) => (
            <article key={value.title} className={`maskio-card rounded-2xl p-6 ${index === 1 ? 'md:translate-y-8' : ''}`}>
              <span className="text-sm font-bold tabular-nums text-yellow-200">0{index + 1}</span>
              <h3 className="mt-8 text-2xl font-semibold text-white">{value.title}</h3>
              <p className="mt-4 leading-relaxed text-zinc-400">{value.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-24 overflow-hidden rounded-2xl border border-yellow-500/20 bg-[linear-gradient(135deg,rgba(216,173,76,0.16),rgba(255,255,255,0.035))] p-8 sm:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white">Vuoi conoscerci dal vivo?</h2>
              <p className="mt-3 max-w-2xl text-zinc-300">
                Passa in salone o prenota online: il modo migliore per capire Maskio è vedere il lavoro sul tuo taglio.
              </p>
            </div>
            <Link href="/contatti" className="maskio-button px-6 py-3">
              Contatti e orari
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

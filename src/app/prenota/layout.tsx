import Link from 'next/link';
import { publicPageMetadata } from '@/lib/seo';

export const metadata = publicPageMetadata({
  title: 'Prenota il tuo appuntamento',
  description: 'Accedi e scegli servizio, barbiere, giorno e orario per prenotare il tuo appuntamento da Maskio Barber Concept.',
  path: '/prenota',
  index: false,
});

export default function PrenotaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="maskio-page maskio-grain pt-24 sm:pt-28" aria-labelledby="booking-title">
        <div className="maskio-wide relative z-10 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="maskio-kicker">Prenotazione online</p>
            <h1 id="booking-title" className="maskio-heading mt-6 max-w-4xl text-6xl font-bold text-white sm:text-7xl">
              Prenota il tuo appuntamento da Maskio.
            </h1>
          </div>
          <div className="max-w-xl text-lg leading-relaxed text-zinc-300 lg:justify-self-end">
            <p>Accedi, scegli il servizio, il barbiere e uno degli orari disponibili: riceverai la conferma al termine.</p>
            <p className="mt-4 text-sm">
              Prima di iniziare puoi consultare i <Link href="/servizi" className="text-yellow-200 hover:text-yellow-100">servizi</Link> o verificare <Link href="/contatti" className="text-yellow-200 hover:text-yellow-100">contatti e orari</Link>.
            </p>
          </div>
        </div>
      </section>
      {children}
    </>
  );
}

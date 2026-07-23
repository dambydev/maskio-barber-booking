import { BUSINESS, formatBusinessHours } from '@/config/business';
import { publicPageMetadata } from '@/lib/seo';

export const metadata = publicPageMetadata({
  title: 'Termini di servizio',
  description: 'Consulta i termini e le condizioni di utilizzo dei servizi di Maskio Barber Concept.',
  path: '/termini-servizio',
});

export default function TermsOfService() {
  return (
    <div className="maskio-page maskio-grain py-24 text-white sm:py-28">
      <div className="maskio-container relative z-10">
        <div className="maskio-panel rounded-2xl p-6 sm:p-9">
          <h1 className="maskio-heading mb-8 text-6xl font-bold leading-none text-white sm:text-7xl">Termini di Servizio</h1>
          
          <div className="maskio-document max-w-none">
            <p className="text-zinc-400 mb-6">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Accettazione dei termini</h2>
              <p className="text-zinc-300 mb-4">
                Utilizzando il sito web e i servizi di <strong>Maskio Barber Concept</strong>, 
                accetti di essere vincolato dai seguenti termini e condizioni d'uso.
              </p>
              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                <p className="text-yellow-100">
                  <strong>Importante:</strong> Se non accetti questi termini, ti preghiamo di non utilizzare i nostri servizi.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">I nostri servizi</h2>
              <div className="space-y-4">
                <div className="maskio-card rounded-2xl p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Servizi di barbiere</h3>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1">
                    <li>Taglio capelli e styling</li>
                    <li>Rasatura e cura della barba</li>
                    <li>Trattamenti specifici per capelli e cuoio capelluto</li>
                    <li>Consulenza per lo stile</li>
                  </ul>
                </div>
                
                <div className="maskio-card rounded-2xl p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Servizi digitali</h3>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1">
                    <li>Sistema di prenotazione online</li>
                    <li>Gestione dell'account cliente</li>
                    <li>Notifiche e promemoria</li>
                    <li>Storico appuntamenti</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Prenotazioni e cancellazioni</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="maskio-card rounded-2xl border-yellow-500/20 p-4">
                  <h3 className="text-lg font-semibold text-yellow-100 mb-2">Prenotazioni</h3>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1 text-sm">
                    <li>Prenotazione online 24/7</li>
                    <li>Conferma automatica via email</li>
                    <li>Possibilità di modificare fino a 48h prima</li>
                    <li>Selezione del barbiere preferito</li>
                  </ul>
                </div>
                
                <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-4">
                  <h3 className="text-lg font-semibold text-red-100 mb-2">Cancellazioni</h3>
                  <ul className="list-disc list-inside text-red-200 space-y-1 text-sm">
                    <li><strong>Gratuita:</strong> Fino a 48 ore prima</li>
                    <li><strong>Penale:</strong> Cancellazioni tardive</li>
                    <li><strong>No-show:</strong> Addebito del 50% del servizio</li>
                    <li><strong>Emergenze:</strong> Valutate caso per caso</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 mt-4">
                <h3 className="text-lg font-semibold text-yellow-100 mb-2">⚠️ Politica di cancellazione</h3>
                <p className="text-yellow-200 text-sm">
                  Le cancellazioni devono essere effettuate almeno <strong>48 ore prima</strong> dell'appuntamento 
                  tramite il sito web o contattando direttamente il salone. Cancellazioni tardive o mancate 
                  presentazioni potrebbero comportare l'addebito di una penale.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Account utente</h2>
              
              <div className="space-y-4">
                <div className="maskio-card rounded-2xl p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Responsabilità dell'utente</h3>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1">
                    <li>Fornire informazioni accurate e aggiornate</li>
                    <li>Mantenere riservate le credenziali di accesso</li>
                    <li>Notificare immediatamente accessi non autorizzati</li>
                    <li>Utilizzare il servizio in modo appropriato</li>
                  </ul>
                </div>

                <div className="maskio-card rounded-2xl p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Nostre responsabilità</h3>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1">
                    <li>Proteggere i tuoi dati personali</li>
                    <li>Mantenere la sicurezza del sistema</li>
                    <li>Fornire assistenza tecnica</li>
                    <li>Rispettare la privacy policy</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Pagamenti e prezzi</h2>
              
              <div className="overflow-x-auto">
                <table className="maskio-table min-w-full border border-white/10 bg-zinc-950/80">
                  <thead className="bg-zinc-900/80">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">Modalità di pagamento</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">Quando</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="px-6 py-4 text-sm text-white">Contanti</td>
                      <td className="px-6 py-4 text-sm text-zinc-300">Al momento del servizio</td>
                      <td className="px-6 py-4 text-sm text-zinc-300">Sempre accettati</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-white">Carta di credito/debito</td>
                      <td className="px-6 py-4 text-sm text-zinc-300">Al momento del servizio</td>
                      <td className="px-6 py-4 text-sm text-zinc-300">Visa, Mastercard, Bancomat</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-white">Pagamenti digitali</td>
                      <td className="px-6 py-4 text-sm text-zinc-300">Al momento del servizio</td>
                      <td className="px-6 py-4 text-sm text-zinc-300">PayPal, Apple Pay, Google Pay</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-2xl border border-yellow-500/15 bg-white/[0.03] p-4 mt-4">
                <p className="text-yellow-100 text-sm">
                  <strong>Prezzi:</strong> I prezzi dei servizi sono disponibili sul sito web e possono variare 
                  senza preavviso. Il prezzo finale sarà quello vigente al momento dell'erogazione del servizio.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Limitazioni e esclusioni</h2>
              
              <div className="space-y-4">
                <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-4">
                  <h3 className="text-lg font-semibold text-red-100 mb-2">Esclusioni di responsabilità</h3>
                  <ul className="list-disc list-inside text-red-200 space-y-1 text-sm">
                    <li>Problemi tecnici del sito web o dell'app</li>
                    <li>Interruzioni del servizio per manutenzione</li>
                    <li>Reazioni allergiche a prodotti (previa informazione)</li>
                    <li>Risultati non conformi alle aspettative non specificate</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                  <h3 className="text-lg font-semibold text-yellow-100 mb-2">Limitazioni del servizio</h3>
                  <ul className="list-disc list-inside text-yellow-200 space-y-1 text-sm">
                    <li>Servizi disponibili solo durante gli orari di apertura</li>
                    <li>Prenotazioni soggette a disponibilità</li>
                    <li>Alcuni servizi richiedono consulenza preliminare</li>
                    <li>Ci riserviamo il diritto di rifiutare il servizio</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Proprietà intellettuale</h2>
              <p className="text-zinc-300 mb-4">
                Tutti i contenuti del sito web (testi, immagini, loghi, design) sono protetti da copyright 
                e appartengono a Maskio Barber Concept o ai rispettivi proprietari.
              </p>
              <div className="maskio-card rounded-2xl p-4">
                <p className="text-zinc-300 text-sm">
                  È vietata la riproduzione, distribuzione o utilizzo commerciale dei contenuti 
                  senza autorizzazione scritta.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Modifiche ai termini</h2>
              <p className="text-zinc-300 mb-4">
                Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. 
                Le modifiche saranno pubblicate su questa pagina con la data di aggiornamento.
              </p>
              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                <p className="text-yellow-100 text-sm">
                  <strong>Consiglio:</strong> Controlla periodicamente questa pagina per rimanere 
                  aggiornato sui termini di servizio.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Legge applicabile</h2>
              <p className="text-zinc-300 mb-4">
                Questi termini sono regolati dalla legge italiana. Per qualsiasi controversia, 
                sarà competente il Foro di Foggia.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Contatti</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <p className="text-yellow-100 mb-4">
                  Per domande sui termini di servizio o per assistenza:
                </p>
                <div className="space-y-2 text-yellow-200">
                  <p><strong>Email:</strong> {BUSINESS.email}</p>
                  <p><strong>Telefono:</strong> {BUSINESS.telephone}</p>
                  <p><strong>Indirizzo:</strong> {BUSINESS.address.formatted}</p>
                  <div>
                    <strong>Orari:</strong>
                    <ul className="mt-1 list-inside list-disc">
                      {BUSINESS.hours.map(({ day, periods }) => (
                        <li key={day}>{day}: {formatBusinessHours(periods)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

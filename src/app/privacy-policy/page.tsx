import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Maskio Barber',
  description: 'Informativa sulla privacy e protezione dei dati personali di Maskio Barber',
};

export default function PrivacyPolicy() {
  return (
    <div className="maskio-page maskio-grain py-24 text-white sm:py-28">
      <div className="maskio-container relative z-10">
        <div className="maskio-panel rounded-2xl p-6 sm:p-9">
          <h1 className="maskio-heading mb-8 text-6xl font-bold leading-none text-white sm:text-7xl">Privacy Policy</h1>
          
          <div className="maskio-document max-w-none">
            <p className="text-zinc-400 mb-6">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Chi siamo</h2>
              <p className="text-zinc-300 mb-4">
                <strong>Maskio Barber Concept</strong> (di seguito "noi", "nostro" o "Maskio Barber") 
                gestisce il sito web maskiobarber.it e l'applicazione mobile (di seguito "Servizio").
              </p>
              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                <p className="text-yellow-100">
                  <strong>Titolare del trattamento:</strong><br />
                  Maskio Barber Concept<br />
                  Via Sant'Agata, 24<br />
                  71013 San Giovanni Rotondo (FG)<br />
                  Email: fabio.cassano97@icloud.com
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Dati che raccogliamo</h2>
              
              <div className="space-y-6">
                <div className="maskio-card rounded-2xl p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Dati di registrazione</h3>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1">
                    <li>Nome e cognome</li>
                    <li>Indirizzo email</li>
                    <li>Numero di telefono</li>
                    <li>Password (crittografata)</li>
                  </ul>
                </div>

                <div className="maskio-card rounded-2xl p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Dati di prenotazione</h3>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1">
                    <li>Data e ora degli appuntamenti</li>
                    <li>Servizi richiesti</li>
                    <li>Note specifiche</li>
                    <li>Barbiere scelto</li>
                  </ul>
                </div>

                <div className="maskio-card rounded-2xl p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Dati tecnici</h3>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1">
                    <li>Indirizzo IP</li>
                    <li>Tipo di browser e dispositivo</li>
                    <li>Pagine visitate</li>
                    <li>Data e ora di accesso</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Come utilizziamo i tuoi dati</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="maskio-card rounded-2xl border-yellow-500/20 p-4">
                  <h3 className="text-lg font-semibold text-yellow-100 mb-2">Gestione del servizio</h3>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1 text-sm">
                    <li>Gestire le prenotazioni</li>
                    <li>Confermare gli appuntamenti</li>
                    <li>Inviare promemoria</li>
                    <li>Gestire il tuo account</li>
                  </ul>
                </div>
                
                <div className="maskio-card rounded-2xl border-yellow-500/20 p-4">
                  <h3 className="text-lg font-semibold text-yellow-100 mb-2">Comunicazione</h3>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1 text-sm">
                    <li>Inviare conferme via email</li>
                    <li>Notificare modifiche</li>
                    <li>Fornire assistenza</li>
                    <li>Aggiornamenti importanti</li>
                  </ul>
                </div>

                <div className="maskio-card rounded-2xl border-yellow-500/20 p-4">
                  <h3 className="text-lg font-semibold text-yellow-100 mb-2">Miglioramento del servizio</h3>
                  <ul className="list-disc list-inside text-zinc-300 space-y-1 text-sm">
                    <li>Analizzare l'utilizzo</li>
                    <li>Ottimizzare l'esperienza</li>
                    <li>Sviluppare nuove funzionalità</li>
                    <li>Risolvere problemi tecnici</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                  <h3 className="text-lg font-semibold text-yellow-100 mb-2">Obblighi legali</h3>
                  <ul className="list-disc list-inside text-yellow-200 space-y-1 text-sm">
                    <li>Rispettare normative</li>
                    <li>Conservare documenti</li>
                    <li>Collaborare con autorità</li>
                    <li>Gestire controversie</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Base giuridica del trattamento</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">✓</div>
                  <div>
                    <h3 className="font-semibold text-white">Consenso</h3>
                    <p className="text-zinc-300">Per l'invio di comunicazioni promozionali</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">✓</div>
                  <div>
                    <h3 className="font-semibold text-white">Esecuzione del contratto</h3>
                    <p className="text-zinc-300">Per gestire le prenotazioni e fornire i servizi</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">✓</div>
                  <div>
                    <h3 className="font-semibold text-white">Interesse legittimo</h3>
                    <p className="text-zinc-300">Per migliorare i nostri servizi e la sicurezza</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">I tuoi diritti</h2>
              <div className="maskio-card rounded-2xl p-6">
                <p className="text-zinc-300 mb-4">Secondo il GDPR, hai i seguenti diritti:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span className="text-zinc-300">Accesso ai tuoi dati</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span className="text-zinc-300">Rettifica dei dati</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span className="text-zinc-300">Cancellazione</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span className="text-zinc-300">Limitazione del trattamento</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span className="text-zinc-300">Portabilità dei dati</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span className="text-zinc-300">Opposizione</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span className="text-zinc-300">Revoca del consenso</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span className="text-zinc-300">Reclamo al Garante</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Sicurezza dei dati</h2>
              <p className="text-zinc-300 mb-4">
                Implementiamo misure di sicurezza appropriate per proteggere i tuoi dati personali:
              </p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2">
                <li>Crittografia delle password</li>
                <li>Connessioni HTTPS sicure</li>
                <li>Database protetti</li>
                <li>Accesso limitato ai dati</li>
                <li>Backup regolari</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Conservazione dei dati</h2>
              <div className="overflow-x-auto">
                <table className="maskio-table min-w-full border border-white/10 bg-zinc-950/80">
                  <thead className="bg-zinc-900/80">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">Tipo di dato</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">Periodo di conservazione</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="px-6 py-4 text-sm text-white">Dati di registrazione</td>
                      <td className="px-6 py-4 text-sm text-zinc-300">Fino alla cancellazione dell'account</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-white">Storico prenotazioni</td>
                      <td className="px-6 py-4 text-sm text-zinc-300">5 anni per obblighi fiscali</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-white">Log di accesso</td>
                      <td className="px-6 py-4 text-sm text-zinc-300">12 mesi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Contatti</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <p className="text-yellow-100 mb-4">
                  Per esercitare i tuoi diritti o per domande su questa Privacy Policy:
                </p>
                <div className="space-y-2 text-yellow-200">
                  <p><strong>Email:</strong> fabio.cassano97@icloud.com</p>
                  <p><strong>Telefono:</strong> +39 331 710 0730</p>
                  <p><strong>Indirizzo:</strong> Via Sant'Agata, 24 - 71013 San Giovanni Rotondo (FG)</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

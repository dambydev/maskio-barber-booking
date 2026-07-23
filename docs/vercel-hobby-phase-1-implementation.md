# Vercel Hobby — Fase 1

## Baseline Git

- Branch: `perf/vercel-hobby-phase-1`
- Commit di partenza: `9bab859047c6825cd5869b21fc46f535082b9fc4`
- Nessun deploy o push eseguito.
- File locali/untracked preesistenti non correlati esclusi dai commit.

## Finding verificati

- `DailyUpdateManager` era montato globalmente e chiamava il job tramite localStorage e timer per tab.
- Non esisteva un cron Vercel e la route non richiedeva autenticazione.
- `BookingsList` interrogava `/api/bookings` ogni 5 secondi anche a scheda nascosta.
- `/auth` montava un secondo `SessionProvider` sotto quello root.
- La callback JWT accettava `session.role` durante `trigger === "update"`.
- `next-pwa` applicava il runtime caching predefinito alle GET `/api/*`; la registrazione era duplicata e `sw-init.js` controllava aggiornamenti ogni minuto.

## Modifiche

### Daily update

- Rimosso `DailyUpdateManager` e ogni trigger browser/localStorage/timer.
- Configurato un solo cron in `vercel.json`: `0 2 * * *`.
- Vercel interpreta il cron in UTC: 02:00 UTC corrisponde alle 03:00 Europe/Rome in CET e alle 04:00 in CEST.
- GET e POST richiedono `Authorization: Bearer ${CRON_SECRET}`; secret assente o errato restituisce 401 prima di aprire connessioni DB.
- Aggiunto `pg_try_advisory_xact_lock` dentro una transazione esplicita su un singolo Neon `PoolClient`. `BEGIN` mantiene lo stesso backend PostgreSQL anche con endpoint Neon pooled; COMMIT/ROLLBACK o terminazione della connessione rilasciano il lock. Una seconda esecuzione concorrente viene saltata senza svolgere il job.
- Gli schedule invariati non vengono più aggiornati grazie a `IS DISTINCT FROM`.
- Log strutturati: run ID, inizio/fine/fallimento, sorgente, durata, date, schedule aggiunti/modificati/invariati, closure inserite e cleanup. Nessuna PII.
- Le regole di date, slot, domeniche, closure, recurring closure ed eccezioni non sono state riscritte.

### Polling bookings

- Prima: richiesta iniziale + intervallo 5 secondi, anche in background.
- Dopo: richiesta iniziale + intervallo 30 secondi soltanto se la scheda è visibile.
- Refresh immediato al ritorno visibile e dopo create/update/delete/swap nello stesso documento.
- Deduplicazione in-flight, AbortController e cleanup di interval/listener/request.
- Gli errori non creano retry aggiuntivi.
- Il formato API `/api/bookings` non è cambiato; il service normalizza il DTO esistente per il componente legacy.

Invocazioni teoriche per un client continuamente attivo:

| Periodo | Prima, 5 s | Dopo, 30 s e visibile |
|---|---:|---:|
| minuto | 12 | 2 |
| ora | 720 | 120 |
| 8 ore | 5.760 | 960 |
| 30 giorni continuativi | 518.400 | 86.400 |

Nel nuovo comportamento il valore effettivo è inferiore quando la scheda è nascosta.

### NextAuth

- Rimosso il provider annidato da `src/app/auth/layout.tsx`; rimane il provider root.
- `session.update()` non può più copiare role/ID/permission nel JWT.
- I controlli DB della session callback e la determinazione server-side del ruolo restano invariati.

### PWA/service worker

- `register: false` nel plugin: `sw-init.js` è l'unico proprietario della registrazione.
- Runtime caching esplicito vuoto: nessuna regola generica per `/api/*` nel worker generato.
- Anche il worker custom legacy usa NetworkOnly per ogni API.
- Eliminato l'update check ogni minuto; aggiornamenti solo al load/registrazione e su online/focus/visibility, con throttle di 6 ore.
- Eliminati all'avvio i cache legacy `apis` e `api-cache`, che potevano contenere dati di utenti precedenti.

## File applicativi modificati

- `vercel.json`
- `next.config.ts`
- `public/sw-init.js`, `public/sw-custom.js`, `public/sw.js`, Workbox generato
- `src/app/api/system/daily-update/route.ts`
- `src/app/layout.tsx`, `src/app/auth/layout.tsx`
- `src/components/BookingsList.tsx`, `BookingSwapModal.tsx`
- `src/app/pannello-prenotazioni/page.tsx`, `src/app/area-personale/page.tsx`
- `src/services/bookingService.ts`
- `src/lib/{cron-auth,postgres-advisory-lock,booking-events,visible-polling,normalize-bookings}.ts`
- `src/lib/auth.ts`
- `package.json`, `tsconfig.json`, `test/vercel-hobby-phase-1.test.ts`

## Test eseguiti

- `npm run typecheck`: superato.
- `npm run lint`: superato con 12 warning preesistenti, nessun errore. `next lint` segnala la propria deprecazione.
- `npm test`: 6/6 superati.
- `npm run build`: superato; 75 pagine generate e worker PWA rigenerato.
- `git diff --check`: superato.

Copertura automatica: auth cron, secret errato/assente, lock concorrente, polling iniziale/30s/background/visibility/deduplica/cleanup, normalizzazione DTO, assenza manager/provider duplicato/claim role client, singolo cron e assenza runtime cache API nel worker generato.

Non è stata eseguita una chiamata autorizzata contro il database configurato in `.env.local`, perché avrebbe mutato dati reali. Deve essere eseguita una volta in un ambiente controllato dopo aver configurato il secret.

## Configurazione manuale Vercel

1. Generare localmente un valore casuale forte, senza salvarlo nel repository, ad esempio `openssl rand -base64 32`.
2. Vercel Project → Settings → Environment Variables.
3. Creare `CRON_SECRET` per Production; aggiungerlo a Preview soltanto se si intende testare esplicitamente il cron in preview.
4. Ridistribuire il branch/commit approvato.
5. Verificare in Settings → Cron Jobs che esista una sola entry `/api/system/daily-update` alle `0 2 * * *`.
6. Test manuale controllato: `curl -H "Authorization: Bearer $CRON_SECRET" https://<host>/api/system/daily-update`. Non stampare il secret nei log o nella shell history condivisa.
7. Verificare che chiamate senza header o con token errato restituiscano 401.

## Verifica nei 7 giorni successivi

- Vercel Observability → Functions: invocazioni e Active CPU per `daily-update`, `/api/bookings`, auth e totale progetto.
- Atteso per daily-update: circa una invocazione autorizzata al giorno; controllare eventi strutturati `daily_update_*` e run ID.
- Per `/api/bookings`: confrontare invocazioni per ora di utilizzo pannello e verificare Network con tab visibile/nascosta.
- Controllare duration e Active CPU separatamente; l'attesa DB non equivale a CPU.
- DevTools Application: un solo service worker `/sw.js`; nessuna risposta API in Cache Storage; logout/cambio account offline non deve mostrare dati precedenti.
- Registrare P50/P75/P95, status code, bytes e memory GB-hours prima/dopo su finestre di traffico comparabile.

## Rischi residui e lavoro escluso

- L'advisory lock transazionale è cooperativo: senza vincoli unique un writer esterno al job può ancora creare duplicati. I vincoli DB sono fuori fase.
- La verifica end-to-end login/logout/OAuth e il cron su Neon richiedono ambiente/browser e credenziali controllate.
- Restano intenzionalmente aperti: race di prenotazione, endpoint pubblici/ownership, N+1, batch availability, generatori slot divergenti, middleware/rate limiting e indici database.

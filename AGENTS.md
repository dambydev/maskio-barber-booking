UI Modernization / Redesign Workflow

Quando la richiesta riguarda modernizzazione, redesign, restyling, polish grafico o miglioramento UI di una pagina/sezione esistente, usa il workflow di progetto /modernize-page.

Questo workflow vale solo per:

* homepage
* landing page
* pagine vetrina
* sezioni UI esistenti
* componenti visuali collegati direttamente alla pagina target

Non applicare questo workflow a:

* bug fix generici
* sicurezza
* backend
* auth
* booking flow
* API
* database
* admin panel
* refactor architetturali
* configurazioni deploy
* file .env o secret

Regola principale

Per ogni richiesta di modernizzazione UI:

1. Usa Plannotator planning mode prima di implementare.
2. Non modificare file finché l’utente non approva esplicitamente con la parola procedi.
3. Usa scout/context-builder per raccogliere contesto sulla pagina target.
4. Usa Taste Skill /redesign o redesign-existing-projects per audit creativo e direzione visiva.
5. Usa Impeccable per shape, critique, audit e polish.
6. Usa reviewer o parallel-review dopo l’implementazione per controllare il diff.
7. Non usare worker prima dell’approvazione del piano.
8. Non fare redesign globale se la richiesta riguarda una singola pagina.
9. Non aggiungere librerie o dipendenze senza approvazione esplicita.
10. Non cambiare logica, routing, API, auth, booking, database o env.

Scope consentito

Durante /modernize-page puoi modificare solo:

* pagina target indicata dall’utente
* componenti UI direttamente usati dalla pagina target
* CSS/Tailwind/classi/stili relativi alla pagina target
* microcopy visuale se migliora chiarezza, conversione o gerarchia

Scope vietato

Durante /modernize-page non modificare:

* auth
* login/register
* booking flow
* admin panel
* API routes
* database/schema
* file env
* configurazioni deploy
* sicurezza
* routing generale
* business logic
* dipendenze/librerie senza conferma

Design quality

Evita AI slop:

* niente gradienti casuali
* niente card inutili
* niente sezioni riempitive
* niente animazioni eccessive
* niente layout generici da template
* niente componenti incoerenti con il brand

Mantieni:

* palette esistente, salvo piccoli miglioramenti motivati
* identità del brand
* coerenza tipografica
* mobile-first
* gerarchia visiva chiara
* CTA leggibili
* spacing ordinato
* performance e accessibilità base

Output richiesto prima dell’approvazione

Prima di implementare, produci sempre:

1. Obiettivo del redesign
2. Diagnosi UI attuale
3. Direzione visiva proposta
4. File probabilmente coinvolti
5. File vietati
6. Step implementativi piccoli
7. Rischi
8. Test/comandi da eseguire
9. Cosa verrà lasciato invariato

Fermati e aspetta procedi.

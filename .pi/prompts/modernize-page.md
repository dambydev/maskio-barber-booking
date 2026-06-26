---
description: Modernizza una pagina UI usando Taste Skill, Impeccable, Plannotator e subagents in modo controllato
argument-hint: "<pagina-o-percorso> [note]"
---

# Modernize Page Workflow

Target da modernizzare: `$1`
Note extra dell'utente: `$ARGUMENTS`

Questo workflow si applica solo a modernizzazione UI/redesign di una pagina o sezione esistente.

## Regola principale

Non modificare file finché il piano non è stato approvato esplicitamente dall'utente con la parola:

procedi

Se Plannotator planning mode non è attivo, fermati e chiedi all'utente di eseguire `/plannotator` oppure di riavviare Pi con `pi --plan`. Non iniziare l'implementazione senza plan mode o conferma esplicita.

## Scope consentito

Puoi lavorare solo su:
- pagina target indicata dall'utente
- componenti UI direttamente usati dalla pagina target
- CSS/Tailwind/classi/stili necessari alla pagina target
- copy visuale o microcopy se migliora chiarezza e conversione

## Scope vietato

Non modificare:
- auth
- booking flow
- API routes
- database
- env
- configurazioni deploy
- admin panel
- routing generale
- logica business
- sicurezza
- dipendenze/librerie, salvo approvazione esplicita

## Fase 0 — Preflight

Prima di ogni cosa:
1. Controlla mentalmente che la richiesta sia davvero un redesign/modernizzazione pagina.
2. Se non lo è, non usare questo workflow.
3. Verifica se la repo sembra sporca o se ci sono modifiche esistenti. Se necessario chiedi checkpoint Git.
4. Non stampare mai secret o contenuti di file `.env`.

## Fase 1 — Context build con subagents

Usa scout e/o context-builder per raccogliere contesto sulla pagina target.

Obiettivo:
- trovare file della pagina
- trovare componenti collegati
- capire stack e styling
- capire palette, typography, spacing, pattern UI esistenti
- identificare file che NON devono essere toccati

Non modificare file.

## Fase 2 — Taste Skill / redesign audit

Usa la skill Taste Skill `/redesign` o la skill redesign-existing-projects se disponibile.

Obiettivo:
- audit della UI attuale
- identificare pattern generici o AI slop
- proporre direzione visiva coerente
- migliorare gerarchia, spacing, typography, CTA, mobile e qualità percepita
- lavorare con stack esistente, senza riscrivere da zero

Non modificare file in questa fase.

## Fase 3 — Impeccable shape + critique

Usa Impeccable come secondo livello di design review.

Applica mentalmente o tramite comando disponibile:
- `/impeccable shape` per pianificare UX/UI prima del codice
- `/impeccable critique` per review di gerarchia, chiarezza e qualità percepita

Registro:
- usa Brand per homepage, landing, portfolio, siti marketing, pagine vetrina
- usa Product per dashboard, admin, tool, gestionali, pannelli interni

Non modificare file in questa fase.

## Fase 4 — Piano approvabile

Produci un piano breve ma concreto con:

1. Obiettivo del redesign
2. Diagnosi UI attuale
3. Direzione visiva proposta
4. File probabilmente coinvolti
5. File vietati
6. Step implementativi piccoli
7. Rischi
8. Test/comandi da eseguire
9. Cosa verrà lasciato invariato

Fermati e aspetta approvazione.

Non implementare nulla finché l'utente non scrive "procedi".

## Fase 5 — Implementazione

Solo dopo approvazione:
- implementa uno step alla volta
- modifica il minimo indispensabile
- non fare refactor non richiesti
- non aggiungere librerie senza approvazione
- mantieni logica, routing e dati invariati
- dopo ogni step indica file modificati e motivo

Usa worker solo se utile e solo sul piano approvato.

## Fase 6 — Impeccable audit/polish

Dopo l'implementazione usa Impeccable per:
- `/impeccable audit` se disponibile
- `/impeccable polish` se disponibile

Focus:
- responsive
- a11y base
- overflow testi
- coerenza visuale
- spacing
- tipografia
- slop patterns
- design system alignment

Non applicare fix extra non approvati se sono fuori scope.

## Fase 7 — Review tecnica con subagent

Usa reviewer o parallel-review per controllare il diff.

Review focus:
- bug introdotti
- regressioni UI/mobile
- modifiche inutili
- logica/routing/API toccati per errore
- sicurezza
- build/lint/test

Alla fine mostra:
- file modificati
- riepilogo modifiche
- rischi residui
- comandi eseguiti
- eventuali comandi da eseguire manualmente

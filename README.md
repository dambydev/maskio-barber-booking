# 💈 Maskio Barber Concept — Booking System & Web App

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.43-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

Applicazione web premium e sistema di prenotazione online per **Maskio Barber Concept**, salone da barba e acconciature maschili con sede a San Giovanni Rotondo.

---

## ✨ Caratteristiche Principali

- 📅 **Prenotazioni Online in Tempo Reale**: Selezione servizi, barbiere, data e orario con calcolo dinamico della disponibilità.
- 📲 **Progressive Web App (PWA)**: Esperienza mobile nativa installabile su iOS e Android con supporto offline per le rotte chiave.
- ⏳ **Lista d'Attesa Intelligente (Waitlist)**: Notifiche automatiche per gli utenti quando si libera uno slot prenotato.
- 🔄 **Scambio Appuntamenti**: Funzionalità avanzata per proporre lo scambio di orario tra clienti.
- 🔔 **Notifiche Multicanale**: Notifiche Push Web in tempo reale, email di conferma/promemoria (Resend) e integrazione SMS (Twilio).
- 💈 **Pannello di Gestione Barbiere & Admin**: Gestione degli appuntamenti, chiusure festive/straordinarie, orari ricorrenti e permessi utente.
- 🔐 **Autenticazione Sicura**: Gestione sessioni e ruoli (Cliente, Barbiere, Admin) via NextAuth.js.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & React Server Components)
- **Linguaggio**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS
- **Database & ORM**: [PostgreSQL (Neon Serverless)](https://neon.tech/) + [Drizzle ORM](https://orm.drizzle.team/)
- **Autenticazione**: [NextAuth.js](https://next-auth.js.org/)
- **Notifiche**: [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API), [Resend](https://resend.com/) (Email), [Twilio](https://www.twilio.com/) (SMS)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Guida di Avvio Rapido

### 1. Prerequisiti
- Node.js `^18.17` o superiore
- npm `^9.0`

### 2. Installazione delle dipendenze
```bash
npm install
```

### 3. Configurazione Variabili d'Ambiente
Crea un file `.env.local` nella root del progetto basandoti sulle chiavi necessarie:

```env
DATABASE_URL=postgres://...
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=re_...
NEXT_PUBLIC_VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
```

### 4. Gestione Database (Drizzle ORM)
```bash
# Genera le migrazioni dal nuovo schema
npm run db:generate

# Sincronizza lo schema direttamente con il database
npm run db:push

# Apri la dashboard visiva Drizzle Studio
npm run db:studio
```

### 5. Avvio del Server di Sviluppo
```bash
npm run dev
```
L'applicazione sarà accessibile all'indirizzo [http://localhost:3000](http://localhost:3000).

---

## 📦 Script Disponibili

| Comando | Descrizione |
| :--- | :--- |
| `npm run dev` | Avvia il server di sviluppo Next.js su `0.0.0.0:3000` |
| `npm run build` | Compila l'applicazione per la produzione |
| `npm run start` | Avvia la build di produzione |
| `npm run lint` | Esegue il controllo sintattico ESLint |
| `npm run db:push` | Sincronizza lo schema Drizzle con il DB Neon |
| `npm run db:studio` | Avvia la GUI Drizzle Studio per esplorare i dati |

---

## 📄 Licenza

Proprietà riservata a **Maskio Barber Concept**. Tutti i diritti riservati.

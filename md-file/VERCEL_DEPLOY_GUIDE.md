# 🚀 Guida Deploy Vercel - Dominio Personalizzato

## ⚠️ PROBLEMA DEPLOY VERCEL

Il deploy fallisce perché Vercel non ha accesso alle variabili d'ambiente del file `.env.local`.

## ✅ SOLUZIONE: Configurare le Environment Variables

### 1. **Accedi al Dashboard Vercel**
- Vai su [vercel.com](https://vercel.com)
- Apri il tuo progetto `maskio-barber-booking`
- Vai in **Settings** → **Environment Variables**

### 2. **Aggiungi queste variabili OBBLIGATORIE:**

```bash
# Database
DATABASE_URL=postgres://neondb_owner:npg_Wj09qDUmTsxE@ep-old-forest-a2ur722g-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://maskiobarberconcept.it

# Ruoli autorizzati
ADMIN_EMAILS=davide431@outlook.it
BARBER_EMAILS=fabio.cassano97@icloud.com,michelebiancofiore0230@gmail.com

# Google OAuth (opzionale)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Twilio SMS
TWILIO_ACCOUNT_SID=il_tuo_twilio_sid
TWILIO_AUTH_TOKEN=il_tuo_twilio_token
TWILIO_PHONE_NUMBER=il_tuo_numero_twilio
TWILIO_SERVICE_SID=il_tuo_service_sid
```

### 3. **IMPORTANTE: Dominio Personalizzato**
⚠️ **NEXTAUTH_URL**: `http://maskiobarberconcept.it`
⚠️ **Configurazione dominio su Vercel**:
1. Vai in **Settings** → **Domains**
2. Aggiungi `maskiobarberconcept.it`
3. Configura i DNS del tuo provider:
   - Tipo: CNAME
   - Nome: @ (o www)
   - Valore: cname.vercel-dns.com

### 4. **Environment per tutti gli ambienti:**
Seleziona: **Production**, **Preview**, **Development**

### 5. **Redeploy automatico:**
Dopo aver aggiunto le variabili, Vercel farà automaticamente un nuovo deploy.

---

## 🌐 CONFIGURAZIONE DOMINIO PERSONALIZZATO

### **Steps per configurare maskiobarberconcept.it:**

1. **Su Vercel Dashboard:**
   - Vai su **Settings** → **Domains**
   - Clicca **Add Domain**
   - Inserisci: `maskiobarberconcept.it`
   - Aggiungi anche: `www.maskiobarberconcept.it`

2. **Configurazione DNS (presso il tuo provider):**
   ```
   Tipo: CNAME
   Nome: @
   Valore: cname.vercel-dns.com
   
   Tipo: CNAME  
   Nome: www
   Valore: cname.vercel-dns.com
   ```

3. **Verifica configurazione:**
   - Attendi propagazione DNS (5-30 minuti)
   - Vercel mostrerà "Valid Configuration" ✅

---

## 🔍 DEBUG DEPLOY

Se il deploy continua a fallire, controlla:

1. **Build Logs** su Vercel
2. **Errori di database** (connessione Neon)
3. **Variabili mancanti** nei logs
4. **Sintassi .env** (nessuno spazio extra)

---

## ✅ CHECKLIST PRE-DEPLOY

- [ ] Database Neon attivo e accessibile
- [ ] Tutte le variabili d'ambiente configurate
- [ ] NEXTAUTH_URL corretto
- [ ] ADMIN_EMAILS contiene la tua email
- [ ] Push su GitHub completato

---

🎯 **Una volta configurato tutto, il sito sarà accessibile su http://maskiobarberconcept.it!**

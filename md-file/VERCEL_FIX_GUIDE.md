# 🚀 Guida Deploy Vercel - Maskio Barber

## ✅ Problema Risolto!
I file N8N problematici sono stati rimossi. La build ora funziona correttamente.

## 🔧 Configurazione Variabili Vercel

### Vai su Vercel Dashboard:
1. Seleziona il progetto `maskio-barber-booking`
2. Vai su **Settings** → **Environment Variables**
3. Aggiungi queste variabili:

### 📝 Variabili Obbligatorie:

```bash
# Database
DATABASE_URL=postgres://neondb_owner:npg_Wj09qDUmTsxE@ep-old-forest-a2ur722g-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://maskiobarberconcept.it

# Ruoli Autorizzati  
ADMIN_EMAILS=davide431@outlook.it
BARBER_EMAILS=fabio.cassano97@icloud.com,michelebiancofiore0230@gmail.com

# Twilio SMS (Opzionali ma consigliate)
TWILIO_ACCOUNT_SID=il_tuo_account_sid
TWILIO_AUTH_TOKEN=il_tuo_auth_token  
TWILIO_SERVICE_SID=il_tuo_service_sid

# Google OAuth (Opzionali)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

## 🌐 CONFIGURAZIONE DOMINIO PERSONALIZZATO

### Su Vercel:
1. **Settings** → **Domains** → **Add Domain**
2. Aggiungi: `maskiobarberconcept.it` e `www.maskiobarberconcept.it`

### Configurazione DNS:
```
Tipo: CNAME
Nome: @
Valore: cname.vercel-dns.com

Tipo: CNAME
Nome: www  
Valore: cname.vercel-dns.com
```

### ⚠️ IMPORTANTE:
- **NEXTAUTH_URL**: Deve essere `http://maskiobarberconcept.it`
- **Tutte le variabili** devono essere in "Production" environment
- **Rideploy** dopo aver aggiunto le variabili

### 🎯 Steps Rapidi:
1. ✅ Files problematici rimossi (fatto)
2. ✅ Push su GitHub (fatto)  
3. 🔄 Configura variabili su Vercel
4. 🌐 Configura dominio personalizzato
5. 🚀 Rideploy automatico

Il sito sarà accessibile su http://maskiobarberconcept.it! 🎉
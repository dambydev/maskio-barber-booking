# 🔐 VERCEL ENVIRONMENT VARIABLES SETUP
## Configurazione completa per Maskio Barber

**IMPORTANTE**: Queste variabili devono essere aggiunte nel Dashboard Vercel:
1. Vai su [Vercel Dashboard](https://vercel.com/dashboard)
2. Seleziona il tuo progetto "maskio-barber"
3. Vai su Settings > Environment Variables
4. Aggiungi TUTTE le variabili elencate sotto

---

## 📋 **VARIABILI OBBLIGATORIE**

### **🗄️ Database PostgreSQL**
```
DATABASE_URL=postgres://neondb_owner:npg_Wj09qDUmTsxE@ep-old-forest-a2ur722g-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

### **🔐 NextAuth Configuration**
```
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
```
**⚠️ IMPORTANTE**: Cambia `NEXTAUTH_URL` con il dominio effettivo che ti darà Vercel!

### **👑 Gestione Ruoli (NUOVE - ESSENZIALI)**
```
ADMIN_EMAILS=fabio.cassano97@icloud.com
BARBER_EMAILS=fabio.cassano97@icloud.com,prova@gmail.com
```

---

## 📋 **VARIABILI OPZIONALI**

### **🔑 Google OAuth (per login Google)**
```
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### **📧 Email System (Resend)**
```
RESEND_API_KEY=re_your_api_key_here
```

### **📍 Google Places API (per recensioni)**
```
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
GOOGLE_PLACE_ID=your_google_place_id_here
```

---

## 🎯 **PRIORITÀ SETUP**

### **✅ FASE 1 - Deploy Base (MINIMO)**
Aggiungi queste per il primo deploy funzionante:
1. `DATABASE_URL`
2. `NEXTAUTH_SECRET` 
3. `NEXTAUTH_URL` (con dominio Vercel)
4. `ADMIN_EMAILS`
5. `BARBER_EMAILS`

### **✅ FASE 2 - Funzionalità Complete**
Aggiungi dopo per funzionalità complete:
6. `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` (login Google)
7. `RESEND_API_KEY` (email CV/conferme)
8. `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` (recensioni)

---

## 📝 **COME AGGIUNGERE SU VERCEL**

### **Via Dashboard (RACCOMANDATO)**
1. 🌐 Vai su https://vercel.com/dashboard
2. 📁 Seleziona progetto "maskio-barber"
3. ⚙️ Settings > Environment Variables
4. ➕ Add New per ogni variabile
5. 📝 Name: nome variabile (es. `DATABASE_URL`)
6. 🔒 Value: valore variabile
7. 🎯 Environment: seleziona "Production, Preview, Development"
8. 💾 Save

### **Via CLI (Alternativo)**
```bash
vercel env add DATABASE_URL
# Inserisci il valore quando richiesto
# Ripeti per ogni variabile
```

---

## ⚠️ **NOTE IMPORTANTI**

### **🔄 NEXTAUTH_URL**
- **Development**: `http://localhost:3000`
- **Production**: `https://your-app-name.vercel.app` (sostituisci con URL effettivo)

### **🔐 Sicurezza**
- ✅ Tutte le chiavi API sono nascoste su Vercel
- ✅ Non sono visibili nel codice GitHub
- ✅ Separate per environment (dev/prod)

### **🚀 Dopo il Deploy**
1. Vercel ti darà un URL tipo: `https://maskio-barber-xyz.vercel.app`
2. **AGGIORNA** `NEXTAUTH_URL` con questo URL
3. **Redeploy** per applicare la modifica

---

## 🧪 **TEST VARIABILI**

Dopo il deploy, testa che funzionino:
```bash
# API di test
https://your-vercel-url.vercel.app/api/test

# Test ruoli (una volta loggato come admin)
https://your-vercel-url.vercel.app/api/admin/role-config
```

---

## 📞 **SUPPORT**

Se hai problemi:
1. 🔍 Controlla Vercel Function Logs
2. 🛠️ Verifica che tutte le variabili siano salvate
3. 🔄 Redeploy dopo modifiche variabili
4. 📧 Le email di test arrivano nelle tue API keys di Resend

**🎉 Una volta configurate, il sistema sarà completamente funzionale in produzione!**

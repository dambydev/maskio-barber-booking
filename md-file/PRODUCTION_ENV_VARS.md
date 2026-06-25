# 🔧 Environment Variables Corrette per Produzione

## 🌐 Variabili Dominio (Vercel)

```env
# NextAuth - URL base per autenticazione (HTTPS!)
NEXTAUTH_URL=https://maskiobarberconcept.it

# URL pubblico del sito
NEXT_PUBLIC_SITE_URL=https://maskiobarberconcept.it

# Secret per NextAuth (genera nuovo per produzione)
NEXTAUTH_SECRET=your_nextauth_secret_here
```

## 🔑 Google OAuth (se configurato)

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 📱 Twilio SMS (se necessario in futuro)

```env
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-phone
```

## 🗄️ Database (se configurato)

```env
DATABASE_URL=your-database-connection-string
```

---

## ⚠️ IMPORTANTE:

### **HTTPS è Obbligatorio per:**
- ✅ NextAuth.js authentication
- ✅ Google OAuth
- ✅ Cookie sicuri
- ✅ Service Worker
- ✅ Moderne API browser

### **Vercel fornisce HTTPS automaticamente:**
- ✅ SSL certificate gratuito
- ✅ Redirect HTTP → HTTPS
- ✅ HTTP/2 support
- ✅ CDN globale

---

## 🔍 Test dopo aggiornamento:

```bash
# Test HTTPS
curl -I https://maskiobarberconcept.it

# Dovrebbe rispondere:
# HTTP/2 200
# server: Vercel
```

---

**AGGIORNA SUBITO:** `NEXTAUTH_URL=https://maskiobarberconcept.it`

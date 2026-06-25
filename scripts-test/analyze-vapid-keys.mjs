import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);

async function analyzeVapidKeys() {
  try {
    console.log('🔍 === ANALISI VAPID KEYS ===\n');

    // 1. Mostra le chiavi locali
    console.log('📋 Chiavi VAPID nel .env.local:');
    console.log('   PUBLIC:', process.env.VAPID_PUBLIC_KEY);
    console.log('   PRIVATE:', process.env.VAPID_PRIVATE_KEY);
    console.log('   NEXT_PUBLIC:', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);
    console.log();

    // 2. Controlla le subscription più recenti di Fabio
    const subscriptions = await sql`
      SELECT 
        ps.*,
        u.email,
        u.name
      FROM push_subscriptions ps
      JOIN users u ON ps.user_id = u.id
      WHERE u.email = 'fabio.cassano97@icloud.com'
      ORDER BY ps.created_at DESC
    `;

    console.log(`📱 Subscription di Fabio: ${subscriptions.length}\n`);

    subscriptions.forEach((sub, index) => {
      console.log(`Subscription #${index + 1}:`);
      console.log(`   ID: ${sub.id}`);
      console.log(`   Created: ${sub.created_at}`);
      console.log(`   Endpoint: ${sub.endpoint.substring(0, 70)}...`);
      
      // Determina quando è stata creata
      const createdDate = new Date(sub.created_at);
      const today = new Date();
      const hoursDiff = (today - createdDate) / (1000 * 60 * 60);
      
      console.log(`   Età: ${hoursDiff.toFixed(1)} ore fa`);
      
      if (hoursDiff < 2) {
        console.log('   ⚠️  CREATA OGGI - potrebbe usare chiavi locali');
      } else if (hoursDiff < 24) {
        console.log('   ⏰ Creata nelle ultime 24h');
      } else {
        console.log('   📅 Creata più di 24h fa - probabilmente chiavi Vercel');
      }
      console.log();
    });

    // 3. Analisi: quale ambiente ha creato le subscription?
    console.log('\n📊 ANALISI:\n');
    
    const recentSubs = subscriptions.filter(s => {
      const hoursDiff = (new Date() - new Date(s.created_at)) / (1000 * 60 * 60);
      return hoursDiff < 2;
    });

    const oldSubs = subscriptions.filter(s => {
      const hoursDiff = (new Date() - new Date(s.created_at)) / (1000 * 60 * 60);
      return hoursDiff >= 2;
    });

    console.log(`   ${recentSubs.length} subscription create nelle ultime 2 ore`);
    console.log(`   ${oldSubs.length} subscription create prima di 2 ore fa\n`);

    if (oldSubs.length > recentSubs.length) {
      console.log('✅ CONCLUSIONE:');
      console.log('   Le subscription più vecchie sono la maggioranza.');
      console.log('   Probabilmente sono state create su PRODUCTION (maskiobarberconcept.it)');
      console.log('   con le chiavi VAPID di Vercel (agosto 2024).\n');
      console.log('🎯 AZIONE CONSIGLIATA:');
      console.log('   OPZIONE 1 (più veloce):');
      console.log('   - Aggiorna le chiavi su Vercel con quelle locali');
      console.log('   - Le subscription esistenti funzioneranno subito\n');
      console.log('   OPZIONE 2 (più lunga):');
      console.log('   - Elimina TUTTE le subscription dal database');
      console.log('   - Chiedi agli utenti di ri-attivare le notifiche');
      console.log('   - Useranno automaticamente le chiavi corrette');
    } else {
      console.log('⚠️  CONCLUSIONE INCERTA:');
      console.log('   Ci sono subscription recenti. Potrebbero usare chiavi diverse.\n');
      console.log('🎯 AZIONE CONSIGLIATA:');
      console.log('   TEST: Prova ad aggiornare Vercel con chiavi locali');
      console.log('   Se non funziona, prova l\'inverso (locale con chiavi Vercel)');
    }

    // 4. Mostra quale chiave corrisponde a quale subscription
    console.log('\n\n🔑 TEST CHIAVI:\n');
    console.log('Se aggiorni Vercel con chiavi LOCALI:');
    console.log('   VAPID_PUBLIC_KEY = BI1mgGZVTXnfKm6IjjUEqItwjvxXBRAIUrGyang5siUndVisiblUzh02SFRhkV7u_FCtPo0PB10nKsFJgHWCHzA');
    console.log('   VAPID_PRIVATE_KEY = your_vapid_private_key_here');
    console.log('   → Subscription create OGGI funzioneranno ✅');
    console.log('   → Subscription vecchie (agosto) potrebbero non funzionare ❌\n');

    console.log('Se aggiorni Vercel con chiavi VERCEL (agosto):');
    console.log('   VAPID_PUBLIC_KEY = BEu9U-pCWHxXKKyjMFtpGaoKqXQ3DAweitOh8VVJ4zCvNBRXk8eeCw7jLZwxytBnTSvPy6crcQvevfhgO_VbcmU');
    console.log('   VAPID_PRIVATE_KEY = your_vapid_private_key_here');
    console.log('   → Subscription vecchie (agosto) funzioneranno ✅');
    console.log('   → Subscription create OGGI non funzioneranno ❌\n');

    // 5. Conteggio per tipo di endpoint (indica dove è stata registrata)
    console.log('\n📊 DISTRIBUZIONE PER TIPO:\n');
    const types = {
      apple: subscriptions.filter(s => s.endpoint.includes('web.push.apple.com')).length,
      fcm: subscriptions.filter(s => s.endpoint.includes('fcm.googleapis.com')).length,
      mozilla: subscriptions.filter(s => s.endpoint.includes('mozilla')).length,
    };

    console.log(`   🍎 Apple: ${types.apple}`);
    console.log(`   🤖 FCM/Chrome: ${types.fcm}`);
    console.log(`   🦊 Mozilla: ${types.mozilla}`);

  } catch (error) {
    console.error('❌ Errore:', error);
  }
}

analyzeVapidKeys();

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PushNotificationBanner() {
  const { data: session } = useSession();
  const [showBanner, setShowBanner] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    // Non mostrare se:
    // 1. Non è supportato
    // 2. Utente non loggato
    // 3. Banner già chiuso in questa sessione
    if (!('Notification' in window) || !session || isDismissed) {
      return;
    }

    // Controlla se banner già mostrato/chiuso permanentemente
    const bannerDismissed = localStorage.getItem('maskio-push-banner-dismissed');
    if (bannerDismissed === 'true') {
      return;
    }

    // Controlla permesso corrente
    const permission = Notification.permission;
    
    console.log('🔔 Banner notifiche - Permesso:', permission);

    // Mostra banner solo se permesso è "default" (non ancora richiesto)
    if (permission === 'default') {
      // Delay di 2 secondi per non essere troppo invasivo
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [session, isDismissed]);

  const handleEnable = async () => {
    setIsRequesting(true);

    try {
      console.log('🔔 Richiesta permesso notifiche...');
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        console.log('✅ Permesso concesso!');
        
        // Registra subscription
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        if (!vapidKey) {
          console.error('❌ VAPID key mancante');
          alert('Errore configurazione. Contatta il supporto.');
          return;
        }

        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidKey)
        });

        // Salva sul server
        const response = await fetch('/api/push/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription.toJSON())
        });

        if (response.ok) {
          console.log('✅ Subscription salvata');
          setShowBanner(false);
          setIsDismissed(true);
        } else {
          console.error('❌ Errore salvando subscription');
          alert('Errore salvando le notifiche. Riprova più tardi.');
        }
      } else {
        console.log('❌ Permesso negato');
        setShowBanner(false);
        setIsDismissed(true);
        // Salva permanentemente per non chiedere più
        localStorage.setItem('maskio-push-banner-dismissed', 'true');
      }
    } catch (error) {
      console.error('❌ Errore:', error);
      alert('Errore attivando le notifiche. Riprova più tardi.');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleDismiss = () => {
    console.log('🔕 Banner chiuso');
    setShowBanner(false);
    setIsDismissed(true);
    // Salva temporaneamente (solo per questa sessione)
    // NON salviamo in localStorage così lo rivede al prossimo accesso
  };

  const handleDismissPermanently = () => {
    console.log('🔕 Banner chiuso permanentemente');
    setShowBanner(false);
    setIsDismissed(true);
    localStorage.setItem('maskio-push-banner-dismissed', 'true');
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="pointer-events-auto w-full max-w-xl overflow-hidden rounded-2xl border border-yellow-500/25 bg-zinc-950/95 text-white shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-xl"
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 18.75a2.25 2.25 0 0 1-4.5 0m9-3.75V11a6.75 6.75 0 0 0-13.5 0v4l-1.5 2.25h18L18.75 15Z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  Notifiche utili per il tuo appuntamento
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                  Avvisi per lista d&apos;attesa, promemoria e conferme: solo quando servono.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <button
                    onClick={handleEnable}
                    disabled={isRequesting}
                    className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isRequesting ? 'Attivazione...' : 'Attiva notifiche'}
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-yellow-400/40 hover:text-yellow-100"
                  >
                    Più tardi
                  </button>
                  <button
                    onClick={handleDismissPermanently}
                    className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-300 sm:ml-auto"
                  >
                    Non mostrare più
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

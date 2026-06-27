'use client';

import { useState, useEffect } from 'react';

/**
 * Banner che chiede all'utente di abilitare le notifiche push
 * Appare solo se:
 * - L'utente è loggato
 * - Non ha già una subscription attiva
 * - Non ha rifiutato in precedenza (localStorage)
 */
export default function NotificationPrompt() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAndShow();
  }, []);

  async function checkAndShow() {
    // Controlla se ha già rifiutato
    if (localStorage.getItem('notification-prompt-dismissed') === 'true') {
      return;
    }

    // Controlla se ha già una subscription
    try {
      const response = await fetch('/api/push/subscribe');
      const data = await response.json();
      
      if (data.hasSubscription) {
        return; // Ha già le notifiche attive
      }

      // Mostra il prompt dopo 3 secondi
      setTimeout(() => setShow(true), 3000);
    } catch (error) {
      console.error('Errore check subscription:', error);
    }
  }

  async function handleEnable() {
    setLoading(true);

    try {
      // Chiedi permesso
      const permission = await Notification.requestPermission();
      
      if (permission !== 'granted') {
        alert('Per ricevere notifiche quando si liberano posti, devi abilitare i permessi nelle impostazioni del browser.');
        handleDismiss();
        return;
      }

      // Crea subscription
      const registration = await navigator.serviceWorker.ready;
      
      const response = await fetch('/api/push/vapid-public-key');
      const { publicKey } = await response.json();

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey,
      });

      // Salva sul server
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });

      alert('✅ Notifiche attivate! Ti avviseremo quando si liberano posti.');
      setShow(false);

    } catch (error) {
      console.error('Errore attivazione notifiche:', error);
      alert('Errore durante l\'attivazione delle notifiche. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  }

  function handleDismiss() {
    localStorage.setItem('notification-prompt-dismissed', 'true');
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="pointer-events-auto relative w-full max-w-md rounded-2xl border border-yellow-500/25 bg-zinc-950/95 p-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-xl animate-slide-up">
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-3 rounded-full p-1 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Chiudi"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-start gap-3 pr-7">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 18.75a2.25 2.25 0 0 1-4.5 0m9-3.75V11a6.75 6.75 0 0 0-13.5 0v4l-1.5 2.25h18L18.75 15Z" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-white sm:text-base">
            Avvisi quando si libera un posto
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-zinc-300">
            Attiva le notifiche per ricevere aggiornamenti sulle disponibilità che ti interessano.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={handleEnable}
              disabled={loading}
              className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-yellow-300 disabled:opacity-60"
            >
              {loading ? 'Attivazione...' : 'Attiva ora'}
            </button>
            <button
              onClick={handleDismiss}
              className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-yellow-400/40 hover:text-yellow-100"
            >
              Non ora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

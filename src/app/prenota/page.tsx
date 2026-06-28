'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import BookingForm from '../../components/BookingForm';
import BookingNotificationModal from '../../components/BookingNotificationModal';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent('/prenota'));
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <main className="maskio-page flex min-h-screen items-center justify-center">
        <div className="text-center text-white">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-2 border-transparent border-t-yellow-300" />
          <p className="mt-5 text-lg font-semibold">Caricamento prenotazione...</p>
        </div>
      </main>
    );
  }

  if (!session) return null;

  return (
    <main className="maskio-page maskio-grain py-24 sm:py-28">
      <div className="maskio-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end"
        >
          <div>
            <p className="maskio-kicker">Prenotazione</p>
            <h1 className="maskio-heading mt-6 max-w-4xl text-6xl font-bold text-white sm:text-7xl">
              Scegli servizio, barbiere e orario.
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-300 lg:justify-self-end">
            Il flusso resta quello originale: qui abbiamo solo reso la cornice più leggibile e coerente con il sito.
          </p>
        </motion.div>

        <BookingForm userSession={session} />
      </div>

      {/* Modal banner rimosso */}
      {/* <BookingNotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
      /> */}
    </main>
  );
}

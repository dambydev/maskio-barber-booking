'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
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
    <main className="maskio-page maskio-grain pb-24 pt-12 sm:pb-28">
      <div className="maskio-wide relative z-10">
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

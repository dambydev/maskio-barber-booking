'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
import Link from 'next/link';
import PhoneRequiredModal from '@/components/PhoneRequiredModal';
import { usePhoneRequired } from '@/hooks/usePhoneRequired';
import { emitBookingChanged } from '@/lib/booking-events';

interface UserBooking {
  id: string;
  service_name: string;
  barber_name: string;
  barber_phone?: string;
  booking_date: string;
  booking_time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at: string;
  notes?: string;
  service_price?: number;
  customer_name?: string;
  customer_phone?: string;
}

type TabType = 'appointments' | 'profile' | 'account';

const tabs: { id: TabType; label: string }[] = [
  { id: 'appointments', label: 'Appuntamenti' },
  { id: 'profile', label: 'Profilo' },
  { id: 'account', label: 'Account' },
];

export default function AreaPersonale() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>('appointments');
  const isBarber = session?.user?.role === 'barber';
  const isAdmin = session?.user?.role === 'admin';
  const hasManagementAccess = isBarber || isAdmin;

  const [realPermissions, setRealPermissions] = useState({
    isAdmin: false,
    isBarber: false,
    hasManagementAccess: false,
    checked: false,
  });

  useEffect(() => {
    if (session?.user?.email === 'davide431@outlook.it') {
      fetch('/api/staff/check-permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.permissions) {
            setRealPermissions({
              isAdmin: data.permissions.isAdmin,
              isBarber: data.permissions.isBarber,
              hasManagementAccess: data.permissions.hasManagementAccess,
              checked: true,
            });
          } else {
            setRealPermissions({ isAdmin: false, isBarber: false, hasManagementAccess: false, checked: true });
          }
        })
        .catch((err) => {
          console.error('Error checking permissions:', err);
          setRealPermissions({ isAdmin: false, isBarber: false, hasManagementAccess: false, checked: true });
        });
    } else {
      setRealPermissions({ isAdmin: false, isBarber: false, hasManagementAccess: false, checked: true });
    }
  }, [session?.user?.email]);

  const effectiveIsAdmin = session?.user?.email === 'davide431@outlook.it' ? realPermissions.isAdmin : isAdmin;
  const effectiveIsBarber = session?.user?.email === 'davide431@outlook.it' ? realPermissions.isBarber : isBarber;
  const effectiveHasManagementAccess = session?.user?.email === 'davide431@outlook.it' ? realPermissions.hasManagementAccess : hasManagementAccess;

  useEffect(() => {
    setActiveTab('appointments');
  }, [effectiveHasManagementAccess]);

  const { showPhoneModal, handlePhoneComplete, userEmail, userName } = usePhoneRequired();

  const fetchUserBookings = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      setLoading(true);
      const isBarberUser = session.user.role === 'barber';
      const params = new URLSearchParams();

      if (isBarberUser) {
        params.append('barberEmail', session.user.email);
      } else {
        params.append('userId', session.user.id);
      }

      const response = await fetch(`/api/bookings?${params.toString()}`);
      if (!response.ok) throw new Error('Errore nel caricamento delle prenotazioni');

      const data = await response.json();
      const bookingsData = data.bookings.map((b: UserBooking) => ({ ...b, customer_name: b.customer_name }));
      setBookings(bookingsData || []);
    } catch (err) {
      setError('Impossibile caricare le prenotazioni');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, session?.user?.email, session?.user?.role]);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.profile);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  }, []);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent('/area-personale'));
      return;
    }

    fetchUserBookings();
    fetchUserProfile();
  }, [session, status, router, fetchUserBookings, fetchUserProfile]);

  const openWhatsAppCustomer = (phone: string, customerName: string | undefined) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const whatsappPhone = cleanPhone.startsWith('39') ? cleanPhone : '39' + cleanPhone;
    const message = `Ciao ${customerName || 'cliente'}, ti contatto da Maskio Barber per il tuo appuntamento.`;
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const makePhoneCallCustomer = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const canCancelBooking = (bookingDate: string, bookingTime: string) => {
    try {
      return true;
    } catch (error) {
      console.error('Error checking booking cancellation:', error);
      return false;
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Sei sicuro di voler cancellare questa prenotazione?')) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/bookings?id=${bookingId}`, { method: 'DELETE' });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore nella cancellazione');
      }

      emitBookingChanged('delete');
      await fetchUserBookings();
      alert('Prenotazione cancellata con successo');
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert('Errore nella cancellazione della prenotazione: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'border-green-500/25 bg-green-500/10 text-green-200';
      case 'pending': return 'border-yellow-500/25 bg-yellow-500/10 text-yellow-100';
      case 'cancelled': return 'border-red-500/25 bg-red-500/10 text-red-200';
      default: return 'border-white/10 bg-white/[0.04] text-zinc-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confermata';
      case 'pending': return 'In attesa';
      case 'cancelled': return 'Cancellata';
      default: return status;
    }
  };

  const generateWhatsAppLink = (phone: string, barberName: string, serviceName: string, date: string, time: string) => {
    if (!phone) return '';
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    const message = `Ciao ${barberName}! Ti scrivo per la mia prenotazione del ${date} alle ${time} per ${serviceName}.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const handleLogout = async () => {
    if (confirm('Sei sicuro di voler uscire?')) {
      await signOut({ callbackUrl: '/' });
    }
  };

  if (status === 'loading' || loading) {
    return (
      <main className="maskio-page flex min-h-screen items-center justify-center">
        <div className="text-center text-white">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-2 border-transparent border-t-yellow-300" />
          <p className="mt-5 text-lg font-semibold">Caricamento area personale...</p>
        </div>
      </main>
    );
  }

  if (!session) return null;

  const sortedBookings = [...bookings].sort((a, b) =>
    new Date(`${a.booking_date}T${a.booking_time}`).getTime() - new Date(`${b.booking_date}T${b.booking_time}`).getTime()
  );

  const upcomingBookings = sortedBookings.filter((booking) =>
    new Date(`${booking.booking_date}T${booking.booking_time}`) > new Date() && booking.status !== 'cancelled'
  );

  const pastBookings = sortedBookings.filter((booking) =>
    new Date(`${booking.booking_date}T${booking.booking_time}`) <= new Date() || booking.status === 'cancelled'
  ).reverse();

  const tabVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -14 },
  };

  const stats = [
    { label: 'Prossimi', value: upcomingBookings.length, tone: 'text-yellow-100' },
    { label: 'Completati', value: pastBookings.length, tone: 'text-zinc-100' },
    { label: 'Confermati', value: bookings.filter((b) => b.status === 'confirmed').length, tone: 'text-green-200' },
  ];

  return (
    <main className="maskio-page maskio-grain min-h-screen py-24">
      <section className="maskio-wide relative z-10">
        <div className="maskio-panel overflow-hidden rounded-2xl p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="maskio-kicker">Area personale</p>
              <h1 className="maskio-heading mt-5 text-5xl font-bold text-white sm:text-7xl">
                Ciao, {session.user.name?.split(' ')[0]}
              </h1>
              <p className="mt-4 max-w-2xl text-zinc-400">
                Appuntamenti, dati personali e impostazioni raccolti in una dashboard più pulita.
              </p>
            </div>
            <div className="flex rounded-full border border-white/10 bg-black/35 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors ${
                    activeTab === tab.id ? 'bg-yellow-300 text-black' : 'text-zinc-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="maskio-wide relative z-10 mt-8">
        {activeTab === 'appointments' && (
          <motion.div key="appointments" variants={tabVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
            <div className="grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="maskio-card rounded-2xl p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">{stat.label}</p>
                  <p className={`mt-4 text-4xl font-bold tabular-nums ${stat.tone}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-[linear-gradient(135deg,rgba(216,173,76,0.18),rgba(255,255,255,0.035))] p-5 sm:p-6">
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Prenota il prossimo slot</h2>
                  <p className="mt-2 text-zinc-300">Scegli servizio, barbiere e orario con il flusso di prenotazione originale.</p>
                </div>
                <Link href="/prenota" className="maskio-button px-6 py-3 text-sm uppercase tracking-[0.12em]">
                  Nuovo appuntamento
                </Link>
              </div>
            </div>

            {error && <div className="mt-6 rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-red-100">{error}</div>}

            <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
              <section>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Prossimi appuntamenti</h2>
                    <p className="mt-1 text-sm text-zinc-500">Ordinati per data e ora.</p>
                  </div>
                </div>

                {upcomingBookings.length === 0 ? (
                  <div className="maskio-panel rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-semibold text-white">Nessun appuntamento programmato</h3>
                    <p className="mx-auto mt-3 max-w-md text-zinc-400">Quando prenoti, il prossimo appuntamento comparirà qui con azioni e dettagli rapidi.</p>
                    <Link href="/prenota" className="maskio-button mt-6 px-6 py-3">Prenota ora</Link>
                  </div>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                    {upcomingBookings.map((booking) => (
                      <motion.article key={booking.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="maskio-panel rounded-2xl p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-yellow-200 tabular-nums">{booking.booking_time}</p>
                            <h3 className="mt-2 text-2xl font-semibold text-white">{booking.service_name}</h3>
                            <p className="mt-1 text-zinc-400">{isBarber ? `Cliente: ${booking.customer_name || 'Cliente'}` : `Barbiere: ${booking.barber_name}`}</p>
                          </div>
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(booking.status)}`}>{getStatusText(booking.status)}</span>
                        </div>

                        <div className="mt-5 grid gap-3 text-sm text-zinc-300">
                          <div className="rounded-2xl border border-white/10 bg-black/24 p-3">
                            {format(parseISO(booking.booking_date), 'EEEE d MMMM yyyy', { locale: it })}
                          </div>
                          {booking.service_price && !isBarber && (
                            <div className="rounded-2xl border border-white/10 bg-black/24 p-3 tabular-nums">Prezzo: {booking.service_price.toFixed(2)} €</div>
                          )}
                        </div>

                        {booking.status === 'confirmed' && !isBarber && (
                          <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
                            {canCancelBooking(booking.booking_date, booking.booking_time) ? (
                              <button onClick={() => handleCancelBooking(booking.id)} className="rounded-full border border-red-500/35 px-4 py-2 text-sm font-semibold text-red-100 transition-colors hover:bg-red-500/10">
                                Cancella
                              </button>
                            ) : (
                              <button disabled className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-500">Non cancellabile</button>
                            )}
                            <a href={generateWhatsAppLink(booking.barber_phone || '', booking.barber_name, booking.service_name, booking.booking_date, booking.booking_time)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 px-4 py-2 text-center text-sm font-semibold text-zinc-100 transition-colors hover:border-yellow-300/35">
                              WhatsApp
                            </a>
                            <a href={`/api/booking/calendar/${booking.id}`} download className="rounded-full border border-white/10 px-4 py-2 text-center text-sm font-semibold text-zinc-100 transition-colors hover:border-yellow-300/35">
                              Calendario
                            </a>
                          </div>
                        )}

                        {isBarber && booking.customer_phone && (
                          <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
                            <button onClick={() => openWhatsAppCustomer(booking.customer_phone!, booking.customer_name)} className="maskio-button-secondary px-4 py-2 text-sm">WhatsApp cliente</button>
                            <button onClick={() => makePhoneCallCustomer(booking.customer_phone!)} className="maskio-button-secondary px-4 py-2 text-sm">Chiama cliente</button>
                          </div>
                        )}
                      </motion.article>
                    ))}
                  </div>
                )}
              </section>

              <aside>
                <h2 className="text-2xl font-semibold text-white">Ultimi appuntamenti</h2>
                <div className="mt-4 space-y-3">
                  {pastBookings.length === 0 ? (
                    <div className="maskio-card rounded-2xl p-6 text-zinc-400">Lo storico comparirà dopo il primo appuntamento completato.</div>
                  ) : (
                    pastBookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="maskio-card rounded-2xl p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-white">{booking.service_name}</h3>
                            <p className="mt-1 text-sm text-zinc-500">{booking.booking_date ? format(parseISO(booking.booking_date), 'dd/MM/yyyy', { locale: it }) : 'N/A'} · {booking.booking_time}</p>
                          </div>
                          <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusColor(booking.status)}`}>{getStatusText(booking.status)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </aside>
            </div>
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div key="profile" variants={tabVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
            {userProfile ? (
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="maskio-panel rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-300 text-2xl font-bold text-black">
                      {effectiveIsBarber ? 'B' : (userProfile.name?.charAt(0) || 'M')}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{userProfile.name}</h2>
                      <p className="mt-1 text-yellow-200">
                        {effectiveIsAdmin ? 'Amministratore' : effectiveIsBarber ? 'Barbiere' : `Cliente dal ${userProfile.createdAt ? format(parseISO(userProfile.createdAt), 'MMMM yyyy', { locale: it }) : 'N/A'}`}
                      </p>
                    </div>
                  </div>
                  <Link href="/area-personale/profilo" className="maskio-button mt-7 w-full px-6 py-3">Modifica profilo</Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ['Email', userProfile.email],
                    ['Telefono', userProfile.phone || 'Non specificato'],
                    ['Membro dal', userProfile.createdAt ? format(parseISO(userProfile.createdAt), 'dd MMMM yyyy', { locale: it }) : 'N/A'],
                    ['Ultimo accesso', userProfile.lastLogin ? format(parseISO(userProfile.lastLogin), 'dd/MM/yyyy HH:mm', { locale: it }) : 'Primo accesso'],
                  ].map(([label, value]) => (
                    <div key={label} className="maskio-card rounded-2xl p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">{label}</p>
                      <p className="mt-3 break-words font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="maskio-card rounded-2xl p-6 lg:col-span-2">
                  <h3 className="text-xl font-semibold text-white">Statistiche</h3>
                  <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                      ['Totali', bookings.length],
                      ['Confermati', bookings.filter((b) => b.status === 'confirmed').length],
                      ['Completati', pastBookings.length],
                      ['In programma', upcomingBookings.length],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-white/10 bg-black/24 p-4 text-center">
                        <p className="text-3xl font-bold text-yellow-100 tabular-nums">{value}</p>
                        <p className="mt-2 text-sm text-zinc-500">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="maskio-panel rounded-2xl p-8 text-center text-zinc-400">Caricamento profilo...</div>
            )}
          </motion.div>
        )}

        {activeTab === 'account' && (
          <motion.div key="account" variants={tabVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }} className="grid gap-5 lg:grid-cols-2">
            <div className="maskio-panel rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white">Stato account</h2>
              <p className="mt-3 text-zinc-300">Il tuo account è attivo e verificato.</p>
              <p className="mt-2 text-sm font-semibold text-green-200">Account verificato</p>
            </div>

            <div className="maskio-panel rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white">Azioni rapide</h2>
              <div className="mt-5 space-y-3">
                <Link href="/area-personale/profilo" className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/24 p-4 transition-colors hover:border-yellow-300/35">
                  <span>
                    <span className="block font-semibold text-white">Modifica profilo</span>
                    <span className="text-sm text-zinc-500">Aggiorna le informazioni personali</span>
                  </span>
                  <span className="text-yellow-200">→</span>
                </Link>
                <Link href="/prenota" className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/24 p-4 transition-colors hover:border-yellow-300/35">
                  <span>
                    <span className="block font-semibold text-white">Nuova prenotazione</span>
                    <span className="text-sm text-zinc-500">Blocca il prossimo appuntamento</span>
                  </span>
                  <span className="text-yellow-200">→</span>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-6">
              <h3 className="text-xl font-semibold text-white">Disconnessione</h3>
              <p className="mt-3 text-red-100/80">Dovrai effettuare nuovamente l'accesso per usare l'area personale.</p>
              <button onClick={handleLogout} className="mt-5 rounded-full bg-red-500 px-6 py-3 font-bold text-white transition-colors hover:bg-red-400">Disconnetti account</button>
            </div>

            <div className="maskio-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white">Informazioni app</h3>
              <div className="mt-4 space-y-2 text-sm text-zinc-400">
                <p>Versione: 1.0.0</p>
                <p>Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>
                <p>Sviluppato per Maskio Barber Concept</p>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <PhoneRequiredModal isOpen={showPhoneModal} userEmail={userEmail} userName={userName} onComplete={handlePhoneComplete} />
    </main>
  );
}

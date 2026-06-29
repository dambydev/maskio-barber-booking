'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import UserWaitlist from '@/components/UserWaitlist';
import PushNotificationManager from '@/components/PushNotificationManager';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
}

export default function ProfiloUtente() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchProfileData = useCallback(async () => {
    if (!session) return;

    try {
      setLoading(true);
      const response = await fetch('/api/user/profile');

      if (response.ok) {
        const data = await response.json();
        setProfile({
          id: data.profile.id,
          name: data.profile.name,
          email: data.profile.email,
          phone: data.profile.phone || '',
          image: data.profile.image || '',
        });
      } else {
        setProfile({
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          phone: '',
          image: session.user.image || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        phone: '',
        image: session.user.image || '',
      });
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent('/area-personale/profilo'));
      return;
    }
    fetchProfileData();
  }, [session, status, router, fetchProfileData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          phone: profile.phone,
        }),
      });

      if (!response.ok) throw new Error("Errore nell'aggiornamento del profilo");

      setSuccess(true);
      await update({ name: profile.name });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Impossibile aggiornare il profilo');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <main className="maskio-page flex min-h-screen items-center justify-center">
        <div className="text-center text-white">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-2 border-transparent border-t-yellow-300" />
          <p className="mt-5 text-lg font-semibold">Caricamento profilo...</p>
        </div>
      </main>
    );
  }

  if (!session || !profile) return null;

  const roleLabel = session.user.role === 'admin' ? 'Amministratore' : session.user.role === 'barber' ? 'Barbiere' : 'Cliente';

  return (
    <main className="maskio-page maskio-grain py-24 sm:py-28">
      <div className="maskio-wide relative z-10">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="maskio-kicker">Profilo</p>
            <h1 className="maskio-heading mt-5 text-6xl font-bold text-white sm:text-7xl">Dati personali, in ordine.</h1>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-300 lg:justify-self-end">
            Aggiorna nome e telefono usati per prenotazioni e comunicazioni del salone. Email e ruolo restano gestiti dal sistema.
          </p>
        </motion.section>

        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="space-y-5">
            <div className="maskio-panel rounded-2xl p-6 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-yellow-500/20 bg-yellow-500/10 text-4xl font-bold text-yellow-100">
                {profile.image ? (
                  <Image src={profile.image} alt={`Avatar di ${profile.name}`} width={96} height={96} className="h-24 w-24 object-cover" />
                ) : (
                  profile.name.charAt(0).toUpperCase()
                )}
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">{profile.name}</h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-yellow-200">{roleLabel}</p>
            </div>

            <div className="maskio-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white">Informazioni account</h3>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                  <dt className="text-zinc-500">Ruolo</dt>
                  <dd className="mt-1 font-semibold text-white">{roleLabel}</dd>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <dt className="text-zinc-500">ID utente</dt>
                  <dd className="mt-1 break-all font-mono text-xs text-zinc-300">{profile.id}</dd>
                </div>
              </dl>
            </div>
          </aside>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="maskio-panel rounded-2xl p-6 sm:p-8">
            {error && <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-100">{error}</div>}
            {success && <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-100">Profilo aggiornato con successo.</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-zinc-200">Nome completo *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="maskio-input"
                    placeholder="Il tuo nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-zinc-200">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={profile.email}
                    readOnly
                    className="maskio-input cursor-not-allowed opacity-70"
                    placeholder="La tua email"
                  />
                  <p className="mt-2 text-xs text-zinc-500">L'email non può essere modificata.</p>
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-zinc-200">Numero di telefono</label>
                  <input
                    type="tel"
                    id="phone"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="maskio-input"
                    placeholder="Es. +39 333 1234567"
                  />
                  <p className="mt-2 text-xs text-zinc-500">Richiesto per prenotazioni e comunicazioni operative.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
                <button type="submit" disabled={saving} className="maskio-button flex-1 px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60">
                  {saving ? 'Salvataggio...' : 'Salva modifiche'}
                </button>
                <button type="button" onClick={() => router.push('/area-personale')} className="maskio-button-secondary flex-1 px-6 py-3">
                  Torna all'area personale
                </button>
              </div>
            </form>
          </motion.section>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="maskio-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white">Notifiche push</h2>
            <p className="mt-3 text-zinc-300">Gestisci notifiche per liste d'attesa, promemoria e conferme.</p>
            <div className="mt-6">
              <PushNotificationManager />
            </div>
          </motion.div>

          <div className="maskio-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white">Lista d'attesa</h2>
            <p className="mt-3 text-zinc-300">Le richieste collegate alla tua email restano gestite dal componente esistente.</p>
          </div>
        </section>

        {session?.user?.email && <UserWaitlist userEmail={session.user.email} />}
      </div>
    </main>
  );
}

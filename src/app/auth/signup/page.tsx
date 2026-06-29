'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { isChristmasThemeActive } from '@/config/christmas-theme';

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [christmasActive, setChristmasActive] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  useEffect(() => {
    setChristmasActive(isChristmasThemeActive());
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signIn('google', {
        callbackUrl: '/',
        redirect: true,
      });

      if (result?.error) setError('Errore durante la registrazione con Google');
    } catch (err) {
      setError('Errore durante la registrazione con Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.firstName || formData.firstName.trim().length < 2) {
      setError('Il nome deve essere di almeno 2 caratteri');
      setLoading(false);
      return;
    }

    if (!formData.lastName || formData.lastName.trim().length < 2) {
      setError('Il cognome deve essere di almeno 2 caratteri');
      setLoading(false);
      return;
    }

    if (!formData.email || formData.email.trim().length === 0) {
      setError("L'email è obbligatoria");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Formato email non valido');
      setLoading(false);
      return;
    }

    if (!formData.phone || formData.phone.trim().length === 0) {
      setError('Il numero di telefono è obbligatorio');
      setLoading(false);
      return;
    }

    if (formData.phone && formData.phone.trim().length > 0) {
      const phoneRegex = /^(\+39|0039|39)?[\s]?3[0-9]{2}[\s]?[0-9]{3}[\s]?[0-9]{3,4}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        setError('Inserisci un numero di cellulare italiano valido (es. +39 333 123 4567)');
        setLoading(false);
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Le password non corrispondono');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La password deve essere di almeno 6 caratteri');
      setLoading(false);
      return;
    }

    if (!formData.termsAccepted) {
      setError('Per registrarti devi accettare i Termini di Servizio e confermare la presa visione della Privacy Policy');
      setLoading(false);
      return;
    }

    await performRegistration();
  };

  const performRegistration = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Errore durante la registrazione');
      }

      const loginResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (loginResult?.ok) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const session = await getSession();

        if (session) {
          window.location.href = '/';
        } else {
          setTimeout(() => {
            window.location.href = '/';
          }, 500);
        }
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const labelClass = 'mb-2 block text-sm font-semibold text-zinc-200';

  if (success) {
    return (
      <main className="maskio-page maskio-grain flex min-h-screen items-center justify-center px-4 py-24 text-white">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="maskio-panel relative z-10 w-full max-w-md rounded-2xl p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-green-400/30 bg-green-400/10 text-green-200">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-semibold text-white">Registrazione completata</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">Account creato con successo. Ti reindirizzeremo alla pagina di login.</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="maskio-page maskio-grain min-h-screen px-4 py-24 text-white sm:px-6">
      <div className="maskio-wide relative z-10 grid min-h-[calc(100svh-12rem)] items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block"
        >
          <p className="maskio-kicker">Nuovo account</p>
          <h1 className="maskio-heading mt-6 max-w-3xl text-7xl font-bold text-white xl:text-8xl">
            Prenota più veloce dalla prossima volta.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
            Salva i dati essenziali e gestisci gli appuntamenti con un percorso più chiaro, senza ripetere tutto a ogni prenotazione.
          </p>
          <div className="mt-10 max-w-xl rounded-2xl border border-yellow-500/18 bg-yellow-500/10 p-5 text-sm leading-relaxed text-yellow-50">
            La checkbox termini/privacy resta lato UI e client-side: non cambia endpoint, database o validazioni backend.
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="maskio-panel mx-auto w-full max-w-2xl rounded-2xl p-6 sm:p-8"
        >
          <div className="mb-8 text-center">
            <Image
              src={christmasActive ? '/LogoSimboloNome_BiancoNatalizio.png' : '/LogoSimboloNome_Bianco(1).png'}
              alt="Maskio Barber Concept"
              width={190}
              height={48}
              className="mx-auto mb-6 h-auto w-44"
              priority
            />
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yellow-200">Crea profilo</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Registrati</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">Compila i dati essenziali per prenotare online.</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
              {error}
            </motion.div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="mb-6 flex w-full min-h-12 items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {loading ? 'Registrazione in corso...' : 'Continua con Google'}
          </button>

          <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
            <div className="h-px flex-1 bg-white/10" />
            oppure
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className={labelClass}>Nome <span className="text-yellow-200">*</span></label>
                <input type="text" id="firstName" required minLength={2} autoComplete="given-name" value={formData.firstName} onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))} className="maskio-input" placeholder="Mario" />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>Cognome <span className="text-yellow-200">*</span></label>
                <input type="text" id="lastName" required minLength={2} autoComplete="family-name" value={formData.lastName} onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))} className="maskio-input" placeholder="Rossi" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className={labelClass}>Email <span className="text-yellow-200">*</span></label>
                <input type="email" id="email" required autoComplete="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} className="maskio-input" placeholder="mario@email.com" />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Telefono <span className="text-yellow-200">*</span></label>
                <input type="tel" id="phone" required minLength={10} autoComplete="tel" value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} className="maskio-input" placeholder="+39 333 123 4567" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className={labelClass}>Password <span className="text-yellow-200">*</span></label>
                <input type="password" id="password" required minLength={6} autoComplete="new-password" value={formData.password} onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))} className="maskio-input" placeholder="••••••••" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className={labelClass}>Conferma password <span className="text-yellow-200">*</span></label>
                <input type="password" id="confirmPassword" required minLength={6} autoComplete="new-password" value={formData.confirmPassword} onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))} className="maskio-input" placeholder="••••••••" />
              </div>
            </div>

            <p className="text-xs leading-relaxed text-zinc-500">Il telefono serve per comunicazioni legate alla prenotazione.</p>

            <label className="flex items-start gap-3 rounded-2xl border border-yellow-500/20 bg-yellow-500/8 p-4 text-sm leading-relaxed text-yellow-50">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData((prev) => ({ ...prev, termsAccepted: e.target.checked }))}
                required
                className="mt-1 h-5 w-5 rounded border-white/20 bg-black text-yellow-400 focus:ring-yellow-400"
              />
              <span>
                Accetto i{' '}
                <Link href="/termini-servizio" className="font-semibold text-yellow-200 underline decoration-yellow-200/30 underline-offset-4 hover:text-yellow-100">
                  Termini di Servizio
                </Link>{' '}
                e confermo di aver letto la{' '}
                <Link href="/privacy-policy" className="font-semibold text-yellow-200 underline decoration-yellow-200/30 underline-offset-4 hover:text-yellow-100">
                  Privacy Policy
                </Link>.
              </span>
            </label>

            <button type="submit" disabled={loading} className="maskio-button w-full px-5 py-3 text-sm uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? 'Registrazione in corso...' : 'Registrati'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Hai già un account?{' '}
            <button type="button" onClick={() => router.push('/auth/signin')} className="font-semibold text-yellow-200 transition-colors hover:text-yellow-100">
              Accedi
            </button>
          </p>
        </motion.section>
      </div>
    </main>
  );
}

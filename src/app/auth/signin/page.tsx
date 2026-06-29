'use client';

import { useEffect, useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { isChristmasThemeActive } from '@/config/christmas-theme';

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [christmasActive, setChristmasActive] = useState(false);

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

      if (result?.error) setError('Errore durante il login con Google');
    } catch (err) {
      setError('Errore durante il login con Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email o password non corretti');
      } else if (result?.ok) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const session = await getSession();

        if (session) {
          window.location.href = '/';
        } else {
          setTimeout(() => {
            window.location.href = '/';
          }, 500);
        }
      }
    } catch (err) {
      setError('Errore durante il login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="maskio-page maskio-grain min-h-screen px-4 py-24 text-white sm:px-6">
      <div className="maskio-wide relative z-10 grid min-h-[calc(100svh-12rem)] items-center gap-8 lg:grid-cols-[1fr_28rem]">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block"
        >
          <p className="maskio-kicker">Area personale</p>
          <h1 className="maskio-heading mt-6 max-w-3xl text-7xl font-bold text-white xl:text-8xl">
            Accedi. Prenota. Gestisci.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
            Entra nel tuo account Maskio per controllare appuntamenti, dati salvati e comunicazioni utili dal salone.
          </p>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-sm text-zinc-400">
            {['Appuntamenti', 'Profilo', 'Promemoria'].map((item) => (
              <div key={item} className="maskio-card rounded-2xl p-4 text-center font-semibold text-zinc-200">
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="maskio-panel mx-auto w-full max-w-md rounded-2xl p-6 sm:p-8"
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
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yellow-200">Bentornato</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Accedi al tuo account</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">Usa email e password oppure continua con Google.</p>
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
            className="flex w-full min-h-12 items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {loading ? 'Accesso in corso...' : 'Continua con Google'}
          </button>

          <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
            <div className="h-px flex-1 bg-white/10" />
            oppure
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-zinc-200">Email</label>
              <input
                type="email"
                id="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="maskio-input"
                placeholder="la.tua@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-zinc-200">Password</label>
              <input
                type="password"
                id="password"
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                className="maskio-input"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" disabled={loading} className="maskio-button w-full px-5 py-3 text-sm uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? 'Accesso in corso...' : 'Accedi'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Non hai un account?{' '}
            <button type="button" onClick={() => router.push('/auth/signup')} className="font-semibold text-yellow-200 transition-colors hover:text-yellow-100">
              Registrati
            </button>
          </p>
          <p className="mt-4 text-center text-xs text-zinc-500">
            Proseguendo accetti l'uso del servizio secondo i nostri{' '}
            <Link href="/termini-servizio" className="text-zinc-300 underline underline-offset-4 hover:text-white">termini</Link>.
          </p>
        </motion.section>
      </div>
    </main>
  );
}

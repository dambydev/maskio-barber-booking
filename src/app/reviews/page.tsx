'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/google-reviews');
      if (!response.ok) throw new Error('Errore nel caricamento delle recensioni');
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Errore:', error);
      setError('Impossibile caricare le recensioni al momento');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={index} className={`h-5 w-5 ${index < rating ? 'text-yellow-300' : 'text-zinc-700'}`} />
    ));

  return (
    <main className="maskio-page maskio-grain py-24 sm:py-28">
      <div className="maskio-wide relative z-10">
        <section className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="maskio-kicker">Recensioni</p>
            <h1 className="maskio-heading mt-6 max-w-4xl text-6xl font-bold text-white sm:text-7xl lg:text-8xl">
              Quello che resta dopo il taglio.
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-300 sm:text-xl lg:justify-self-end">
            Le opinioni dei clienti raccontano precisione, accoglienza e fiducia meglio di qualsiasi promessa.
          </p>
        </section>

        {loading && (
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="maskio-card animate-pulse rounded-2xl p-6">
                <div className="h-12 w-12 rounded-full bg-white/10" />
                <div className="mt-6 h-4 w-1/2 rounded bg-white/10" />
                <div className="mt-5 space-y-3">
                  <div className="h-3 rounded bg-white/10" />
                  <div className="h-3 w-5/6 rounded bg-white/10" />
                  <div className="h-3 w-2/3 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="maskio-panel mt-14 rounded-2xl p-8 text-center">
            <p className="text-lg text-red-200">{error}</p>
            <button type="button" onClick={fetchReviews} className="maskio-button mt-6 px-6 py-3">
              Riprova
            </button>
          </div>
        )}

        {!loading && !error && reviews.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-14 columns-1 gap-5 md:columns-2 xl:columns-3">
            {reviews.map((review, index) => (
              <motion.article
                key={`${review.author_name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="maskio-card mb-5 break-inside-avoid rounded-2xl p-6"
              >
                <div className="flex items-center gap-4">
                  {review.profile_photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={review.profile_photo_url} alt={review.author_name} className="h-12 w-12 rounded-2xl object-cover" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-300 text-lg font-bold text-black">
                      {review.author_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h2 className="font-semibold text-white">{review.author_name}</h2>
                    <p className="text-sm text-zinc-500">{formatDate(review.time)}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-1">{renderStars(review.rating)}</div>
                <p className="mt-5 leading-relaxed text-zinc-300">{review.text}</p>
              </motion.article>
            ))}
          </motion.div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <div className="maskio-panel mt-14 rounded-2xl p-8 text-center">
            <p className="text-lg text-zinc-300">Nessuna recensione disponibile al momento.</p>
          </div>
        )}

        <section className="mt-16 rounded-2xl border border-yellow-500/20 bg-[linear-gradient(135deg,rgba(216,173,76,0.20),rgba(255,255,255,0.035))] p-8 sm:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white">Vuoi lasciare una recensione?</h2>
              <p className="mt-3 max-w-2xl text-zinc-300">Condividi la tua esperienza su Google e aiuta altri clienti a scegliere con più fiducia.</p>
            </div>
            <a href="https://maps.google.com/maps?q=Maskio+Barber+Concept" target="_blank" rel="noopener noreferrer" className="maskio-button px-6 py-3">
              Scrivi su Google
            </a>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link href="/testimonianze" className="text-sm font-semibold text-yellow-200 underline decoration-yellow-200/25 underline-offset-4 hover:text-yellow-100">
            Vai alla pagina testimonianze
          </Link>
        </div>
      </div>
    </main>
  );
}

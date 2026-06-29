'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import BookingButton from '@/components/BookingButton';

interface GoogleReview {
  id?: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description?: string;
}

const baseTimestamp = 1733481600000;
const mockReviews: GoogleReview[] = [
  {
    id: '1',
    author_name: 'Marco Rossi',
    rating: 5,
    text: 'Esperienza fantastica. Il taglio è stato perfetto e il servizio impeccabile.',
    time: baseTimestamp - 86400000 * 7,
    relative_time_description: '1 settimana fa',
  },
  {
    id: '2',
    author_name: 'Luca Bianchi',
    rating: 5,
    text: 'Professionalità e cortesia al top. Finalmente ho trovato il mio barbiere di fiducia.',
    time: baseTimestamp - 86400000 * 14,
    relative_time_description: '2 settimane fa',
  },
  {
    id: '3',
    author_name: 'Andrea Verdi',
    rating: 5,
    text: 'Ambiente moderno e accogliente. Personale preparato e attento ai dettagli.',
    time: baseTimestamp - 86400000 * 21,
    relative_time_description: '3 settimane fa',
  },
  {
    id: '4',
    author_name: 'Giuseppe Neri',
    rating: 4,
    text: 'Ottimo servizio, prezzi giusti e risultato eccellente. Tornerò sicuramente.',
    time: baseTimestamp - 86400000 * 30,
    relative_time_description: '1 mese fa',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} stelle su 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} className={`h-5 w-5 ${star <= rating ? 'text-yellow-300' : 'text-zinc-700'}`} />
      ))}
    </div>
  );
}

export default function TestimonianzePage() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const initialReviewsCount = 4;

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/google-reviews');
        const data = await response.json();

        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
          setIsDemo(data.isDemo || false);
          setMessage(data.message || null);
        } else {
          setReviews(mockReviews);
          setIsDemo(true);
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
        setReviews(mockReviews);
        setIsDemo(true);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    return Math.round((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) * 10) / 10;
  }, [reviews]);

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, initialReviewsCount);

  return (
    <main className="maskio-page maskio-grain py-24 sm:py-28">
      <div className="maskio-wide relative z-10">
        <section className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="maskio-kicker">Testimonianze</p>
            <h1 className="maskio-heading mt-6 max-w-4xl text-6xl font-bold text-white sm:text-7xl lg:text-8xl">
              Esperienze che parlano chiaro.
            </h1>
          </div>
          <div className="maskio-panel rounded-2xl p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">Valutazione media</p>
            <div className="mt-4 flex items-end gap-3">
              <span className="text-6xl font-bold text-yellow-200 tabular-nums">{averageRating || '—'}</span>
              <span className="pb-2 text-zinc-400">/ 5</span>
            </div>
            <div className="mt-4"><StarRating rating={Math.round(averageRating)} /></div>
          </div>
        </section>

        {message && (
          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-100">
            {message}
          </div>
        )}

        {loading ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="maskio-card animate-pulse rounded-2xl p-6">
                <div className="h-4 w-32 rounded bg-white/10" />
                <div className="mt-8 h-20 rounded bg-white/10" />
              </div>
            ))}
          </div>
        ) : (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-14 grid gap-5 md:grid-cols-2">
            {visibleReviews.map((review, index) => (
              <motion.article
                key={review.id || `${review.author_name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="maskio-card rounded-2xl p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
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
                      <p className="text-sm text-zinc-500">{review.relative_time_description || 'Recensione Google'}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="mt-6 text-lg leading-relaxed text-zinc-300">“{review.text}”</p>
              </motion.article>
            ))}
          </motion.section>
        )}

        {!loading && reviews.length > initialReviewsCount && (
          <div className="mt-8 text-center">
            <button type="button" onClick={() => setShowAllReviews((value) => !value)} className="maskio-button-secondary px-6 py-3">
              {showAllReviews ? 'Mostra meno recensioni' : 'Leggi altre recensioni'}
            </button>
          </div>
        )}

        <section className="mt-16 rounded-2xl border border-yellow-500/20 bg-[linear-gradient(135deg,rgba(216,173,76,0.20),rgba(255,255,255,0.035))] p-8 sm:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white">Vuoi vivere la tua esperienza Maskio?</h2>
              <p className="mt-3 max-w-2xl text-zinc-300">
                Scegli il servizio e blocca l'orario. Il resto lo definiamo in salone, davanti allo specchio.
              </p>
              {isDemo && <p className="mt-3 text-sm text-yellow-100/75">Alcune recensioni possono essere mostrate come esempio quando Google non risponde.</p>}
            </div>
            <BookingButton className="rounded-full bg-yellow-400 px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-yellow-300">
              Prenota ora
            </BookingButton>
          </div>
        </section>
      </div>
    </main>
  );
}

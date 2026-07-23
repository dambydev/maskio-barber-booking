'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import BookingButton from '../components/BookingButton';
import ChristmasDecorations from '../components/ChristmasDecorations';
// 🎄 CHRISTMAS THEME - Logo natalizio
import { isChristmasThemeActive } from '../config/christmas-theme';
// 🎄 END CHRISTMAS THEME

// Lazy load video component for better LCP
function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={isVisible ? "/videoLoopCompresso.mp4" : undefined}
      autoPlay={isVisible}
      muted
      loop
      playsInline
      className="absolute inset-0 h-full w-full object-cover brightness-[0.5] contrast-[1.08] saturate-[0.92]"
      poster="/sediaOro.webp"
      preload="none"
    />
  );
}

export default function Home() {
  // 🎄 CHRISTMAS THEME - Stato per logo natalizio
  const [christmasActive, setChristmasActive] = useState(false);

  useEffect(() => {
    setChristmasActive(isChristmasThemeActive());
  }, []);
  // 🎄 END CHRISTMAS THEME

  // Simplified Animation Variants for better INP
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.94, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const services = [
    {
      title: 'Taglio & Styling',
      description: 'Tagli personalizzati per esaltare la tua personalità e stile',
      image: '/servizi-taglio.webp',
      price: 'da 18€'
    },
    {
      title: 'Taglio Barba',
      description: 'Taglio barba con rifinitura professionale',
      image: '/servizi-barba.webp',
      price: 'da 10€'
    },
    {
      title: 'Altri Servizi',
      description: 'Colore capelli o servizi su richiesta',
      image: '/servizi-altri.webp',
      price: 'Contattare Maskio Barber Concept'
    }
  ];

  const benefits = [
    {
      title: 'Consulenza prima del taglio',
      description: 'Capelli, forma del viso e abitudini quotidiane guidano ogni scelta.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 7.5h14M5 12h10M5 16.5h7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 14.5 20 17l-3.5 3" />
        </svg>
      )
    },
    {
      title: 'Precisione nei dettagli',
      description: 'Contorni, sfumature e texture vengono rifiniti con ritmo e controllo.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 20 20 4M7 7l10 10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 18.5h4m3-13h4" />
        </svg>
      )
    },
    {
      title: 'Prodotti professionali',
      description: 'Finish e mantenimento sono pensati per far durare il risultato anche fuori dal salone.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6l.75 4.5h-7.5L9 3Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h9l1 12A1.5 1.5 0 0 1 16 21H8a1.5 1.5 0 0 1-1.5-1.5l1-12Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 13h5" />
        </svg>
      )
    },
    {
      title: 'Prenotazione semplice',
      description: 'Il percorso online resta diretto: scegli il servizio e blocca il tuo appuntamento.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 3v3m10-3v3M4.5 9h15" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 5.5h12A1.5 1.5 0 0 1 19.5 7v11A1.5 1.5 0 0 1 18 19.5H6A1.5 1.5 0 0 1 4.5 18V7A1.5 1.5 0 0 1 6 5.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 14 2 2 4-5" />
        </svg>
      )
    }
  ];

  const gallery = [
    { src: '/taglio1.webp', title: 'Taglio moderno' },
    { src: '/taglio2.webp', title: 'Styling pulito' },
    { src: '/sediaOro.webp', title: 'Ambiente Maskio' },
    { src: '/prodotti.webp', title: 'Prodotti professionali' }
  ];

  return (
    <LazyMotion features={domAnimation}>
      {/* 🎄 DECORAZIONI NATALIZIE */}
      <ChristmasDecorations />

      <div className="relative isolate min-h-screen overflow-x-hidden bg-black text-white">
        {/* Premium background atmosphere */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-yellow-500/10 blur-[110px]" />
          <div className="absolute bottom-10 right-0 h-[28rem] w-[28rem] rounded-full bg-yellow-700/10 blur-[130px]" />
          <div
            className="absolute inset-0 pointer-events-none opacity-80"
            style={{ background: "radial-gradient(circle at 50% 20%, rgba(234,179,8,0.08), transparent 34%), linear-gradient(180deg, rgba(0,0,0,0.2), #000 88%)" }}
          />
        </div>

        {/* 🔔 BANNER AVVISO AUMENTO PREZZI */}
        <div className="relative z-20 border-b border-yellow-500/20 bg-black/95 px-3 py-3 shadow-[0_12px_35px_rgba(0,0,0,0.32)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-3">
            <span className="rounded-full border border-yellow-400/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-yellow-300">
              Avviso listino
            </span>
            <p className="text-sm leading-snug text-zinc-200 sm:text-base">
              Dal <span className="font-semibold text-white">1° giugno 2026</span> i nostri prezzi subiranno un aggiornamento.{' '}
              <Link href="/servizi" className="font-semibold text-yellow-300 underline decoration-yellow-300/30 underline-offset-4 transition-colors hover:text-yellow-200 hover:decoration-yellow-200">
                Verifica qui il nuovo listino prezzi
              </Link>
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[calc(100svh-70px)] overflow-hidden">
          {/* Hero Video with lazy loading */}
          <m.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.02 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <HeroVideo />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.10),transparent_34%),linear-gradient(135deg,rgba(0,0,0,0.78),rgba(0,0,0,0.48)_48%,rgba(68,46,12,0.38))]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute inset-x-8 top-8 hidden h-px bg-gradient-to-r from-transparent via-yellow-400/35 to-transparent md:block" />
            <div className="absolute bottom-16 left-1/2 hidden h-20 w-px -translate-x-1/2 bg-gradient-to-b from-yellow-400/40 to-transparent md:block" />
          </m.div>

          {/* Hero Content */}
          <div className="relative z-10 flex min-h-[calc(100svh-70px)] flex-col items-center justify-center px-4 py-20 text-center text-white sm:px-6 lg:px-8">
            <m.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="mx-auto flex max-w-4xl flex-col items-center"
            >
              <h1 className="sr-only">Maskio Barber Concept - barbiere a San Giovanni Rotondo</h1>
              {/* Logo */}
              <m.div variants={fadeInUp} className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-16 rounded-full bg-yellow-400/10 blur-[85px]" />
                  {/* 🎄 CHRISTMAS THEME - Logo natalizio condizionale */}
                  <Image
                    src={christmasActive ? "/LogoSimboloNome_BiancoNatalizio.png" : "/LogoSimboloNome_Bianco(1).png"}
                    alt="Maskio Barber Concept"
                    width={384}
                    height={48}
                    className="relative z-10 mb-1 h-auto w-64 drop-shadow-[0_18px_45px_rgba(0,0,0,0.65)] sm:w-72 md:w-80 lg:w-96"
                    priority
                  />
                  {/* 🎄 END CHRISTMAS THEME */}
                </div>

                <div className="mt-8 flex flex-col items-center">
                  <div className="h-px w-56 bg-gradient-to-r from-transparent via-yellow-300/80 to-transparent" />
                  <div className="mt-3 h-1.5 w-1.5 rotate-45 border border-yellow-300/70 bg-black/40" />
                </div>
              </m.div>

              <m.p
                variants={fadeInUp}
                className="mt-7 max-w-3xl text-balance text-xl font-light leading-relaxed tracking-[0.02em] text-zinc-100 sm:text-2xl"
              >
                <span className="font-serif text-yellow-400/45">&quot;</span>
                Una nuova concezione del barbiere, dove{' '}
                <span className="font-medium">tradizione</span> e{' '}
                <span className="font-medium">innovazione</span>{' '}
                si incontrano per creare il tuo{' '}
                <span className="font-normal italic text-yellow-200">stile perfetto</span>
                <span className="font-serif text-yellow-400/45">&quot;</span>
              </m.p>

              {/* Buttons */}
              <m.div
                variants={fadeInUp}
                className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
              >
                <BookingButton
                  size="lg"
                  className="w-full rounded-full border-0 bg-yellow-400 px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black shadow-[0_16px_40px_rgba(234,179,8,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 sm:w-auto"
                >
                  Prenota il tuo taglio
                </BookingButton>

                <Link
                  href="/servizi"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/18 bg-black/45 px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-300/60 hover:text-yellow-100 sm:w-auto"
                >
                  Vedi i servizi
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </m.div>
            </m.div>
          </div>
        </section>

        {/* About Section */}
        <m.section
          className="relative overflow-hidden bg-black py-20 sm:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer}
        >
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"
              variants={staggerContainer}
            >
              <m.div variants={fadeInLeft} className="relative order-2 lg:order-1">
                <div className="relative h-[28rem] overflow-hidden rounded-2xl border border-yellow-500/20 bg-zinc-950 shadow-[0_28px_70px_rgba(0,0,0,0.35)]">
                  <Image
                    src="/taglio1.webp"
                    alt="Taglio capelli professionale nel salone Maskio Barber Concept"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-yellow-500/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="max-w-sm text-sm font-medium leading-relaxed text-zinc-200">
                      Ogni linea nasce da una consulenza: il taglio deve funzionare sul momento e nei giorni dopo.
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-5 -right-5 hidden h-32 w-32 border-b border-r border-yellow-400/35 md:block" />
              </m.div>

              <m.div variants={fadeInRight} className="order-1 space-y-8 lg:order-2">
                <div className="space-y-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">Hair-first barber concept</p>
                  <h2 className="max-w-3xl text-balance font-alien text-5xl font-bold leading-[0.95] text-white sm:text-6xl md:text-7xl">
                    Il taglio come firma personale.
                  </h2>
                  <p className="max-w-2xl text-lg leading-relaxed text-zinc-300">
                    Maskio Barber Concept è costruito intorno ai capelli: tagli moderni, linee classiche riviste, styling e cura del dettaglio. La barba resta un servizio di rifinitura quando completa il look, non un racconto forzato.
                  </p>
                  <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
                    L’obiettivo è semplice: uscire con un taglio che ti rappresenta, facile da portare e rifinito con mano professionale.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {['Consulenza', 'Taglio', 'Styling'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-center">
                      <span className="text-sm font-semibold uppercase tracking-[0.14em] text-yellow-200">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/chi-siamo" className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-yellow-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-300 hover:bg-yellow-300 hover:text-black">
                  La nostra storia
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </m.div>
            </m.div>
          </div>
        </m.section>

        {/* Services Preview */}
        <m.section
          className="relative overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,#030303,#0b0b0b_45%,#000)] py-20 sm:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end" variants={fadeInUp}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">Servizi</p>
                <h2 className="mt-4 text-balance font-alien text-5xl font-bold leading-none text-white sm:text-6xl md:text-7xl">
                  I Nostri Servizi
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-zinc-300 lg:justify-self-end lg:text-lg">
                Dalla consulenza personalizzata ai trattamenti più avanzati, offriamo una gamma completa di servizi per la cura dell&apos;uomo moderno.
              </p>
            </m.div>

            <m.div className="grid gap-5 md:grid-cols-3" variants={staggerContainer}>
              {services.map((service) => (
                <m.article
                  key={service.title}
                  variants={scaleIn}
                  className="group relative overflow-hidden rounded-2xl border border-yellow-500/15 bg-zinc-950 shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
                >
                  <div className="relative h-72 overflow-hidden bg-black">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                      quality={78}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="mb-4 inline-flex rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-yellow-200">
                      {service.price}
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{service.description}</p>
                  </div>
                </m.article>
              ))}
            </m.div>

            <m.div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:p-7" variants={fadeInUp}>
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                Consulta il listino completo e scegli il servizio più adatto al tuo prossimo taglio.
              </p>
              <Link href="/servizi" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-yellow-400 px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 sm:w-auto">
                Vedi listino servizi
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </m.div>
          </div>
        </m.section>

        {/* Why Choose Us */}
        <m.section
          className="relative overflow-hidden bg-black py-20 text-white sm:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div className="mx-auto mb-14 max-w-3xl text-center" variants={fadeInUp}>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">Perché sceglierci</p>
              <h2 className="mt-4 text-balance font-alien text-5xl font-bold leading-none text-white sm:text-6xl md:text-7xl">
                Cura visibile, senza eccessi.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-zinc-300 sm:text-lg">
                Un’esperienza precisa: meno promesse generiche, più attenzione al taglio, alla forma e al risultato finale.
              </p>
            </m.div>

            <m.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerContainer}>
              {benefits.map((feature) => (
                <m.div
                  key={feature.title}
                  variants={scaleIn}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 p-6 transition-colors hover:border-yellow-400/35"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-yellow-400/25 bg-yellow-400/10 text-yellow-300 transition-colors group-hover:bg-yellow-300 group-hover:text-black">
                    {feature.icon}
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{feature.description}</p>
                </m.div>
              ))}
            </m.div>
          </div>
        </m.section>

        {/* Gallery Preview */}
        <m.section
          className="relative overflow-hidden bg-[linear-gradient(180deg,#000,#090909)] py-20 sm:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between" variants={fadeInUp}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">Lavori e atmosfera</p>
                <h2 className="mt-4 text-balance font-alien text-5xl font-bold leading-none text-white sm:text-6xl md:text-7xl">
                  Guarda il risultato.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-zinc-300">
                Immagini reali, dettagli di taglio e materiali del salone: la qualità deve vedersi prima ancora di sedersi.
              </p>
            </m.div>

            <m.div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" variants={staggerContainer}>
              {gallery.map((item, index) => (
                <m.div
                  key={item.src}
                  variants={scaleIn}
                  className={`${index === 0 ? 'sm:col-span-2 lg:col-span-2' : ''} group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950`}
                >
                  <div className={`${index === 0 ? 'aspect-[4/3]' : 'aspect-[4/5] sm:aspect-square lg:aspect-[4/5]'} relative overflow-hidden bg-zinc-950`}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="scale-[1.03] object-cover object-center transition-transform duration-700 group-hover:scale-[1.07]"
                      sizes={index === 0 ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                  </div>
                </m.div>
              ))}
            </m.div>

            <m.div className="mt-12 text-center" variants={fadeInUp}>
              <Link href="/testimonianze" className="inline-flex items-center justify-center gap-2 rounded-full border border-yellow-400/40 px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-yellow-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-300 hover:bg-yellow-300 hover:text-black">
                Vedi le recensioni
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </m.div>
          </div>
        </m.section>

        {/* CTA Section */}
        <m.section
          className="relative overflow-hidden bg-black py-20 text-white sm:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="absolute inset-x-4 inset-y-8 rounded-[2rem] border border-yellow-500/20 bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <m.div variants={staggerContainer}>
              <m.h2
                className="text-balance font-alien text-5xl font-bold leading-none text-white sm:text-6xl md:text-7xl"
                variants={fadeInUp}
              >
                Il prossimo taglio parte da qui.
              </m.h2>

              <m.p
                className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300"
                variants={fadeInUp}
              >
                Scegli il tuo appuntamento e vivi l’esperienza Maskio Barber Concept: capelli curati, stile chiaro, risultato preciso.
              </m.p>

              <m.div
                className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
                variants={fadeInUp}
              >
                <BookingButton size="lg" className="w-full rounded-full bg-yellow-400 px-9 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 sm:w-auto">
                  Prenota appuntamento
                </BookingButton>

                <Link href="/contatti" className="inline-flex w-full items-center justify-center rounded-full border border-white/18 px-9 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-300/60 hover:text-yellow-100 sm:w-auto">
                  Contattaci
                </Link>
              </m.div>
            </m.div>
          </div>
        </m.section>
      </div>
    </LazyMotion>
  );
}

"use client";
import { useEffect, useState } from "react";

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return /android|iphone|ipad|ipod|opera mini|iemobile|mobile/i.test(
    window.navigator.userAgent
  );
};

export default function AddToHomeBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isMobile()) return;
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if (localStorage.getItem("maskio_add_to_home_dismissed")) return;
    setShow(true);
  }, []);

  if (!show) return null;

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("maskio_add_to_home_dismissed", "1");
  };

  return (
    <div className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border border-yellow-500/25 bg-zinc-950/95 px-4 py-3 text-white shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-xl animate-fade-in">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v12.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V3a1 1 0 0 1 1-1Z"/></svg>
      </div>
      <div className="min-w-0 flex-1 text-sm leading-relaxed text-zinc-300">
        <p className="font-semibold text-white">Aggiungi Maskio alla Home</p>
        <p className="mt-0.5 text-xs text-zinc-400">Apri il menu del browser e scegli “Aggiungi a schermata Home”.</p>
      </div>
      <button onClick={handleClose} aria-label="Chiudi notifica" className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

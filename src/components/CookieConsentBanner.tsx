'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsent } from './CookieConsentContext';

export default function CookieConsentBanner() {
    const { consent, acceptCookies, declineCookies } = useCookieConsent();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show banner only if consent is null (user hasn't chosen yet)
        // Small delay to prevent flashing on load
        const timer = setTimeout(() => {
            if (consent === null) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [consent]);

    if (!isVisible && consent !== null) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 24, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="pointer-events-auto w-full max-w-5xl rounded-2xl border border-yellow-500/25 bg-zinc-950/95 p-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-5"
                >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                            <div className="flex items-start gap-3">
                                <div className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 sm:flex">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white sm:text-base">
                                        Privacy e cookie
                                    </h3>
                                    <p className="mt-1 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                                        Usiamo cookie per migliorare l&apos;esperienza e analizzare il traffico. Puoi accettare o rifiutare ora; maggiori dettagli nella
                                        <Link href="/cookie-policy" className="ml-1 font-medium text-yellow-300 underline decoration-yellow-300/30 underline-offset-4 transition-colors hover:text-yellow-200 hover:decoration-yellow-200">
                                            Cookie Policy
                                        </Link>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row md:min-w-fit">
                            <button
                                onClick={declineCookies}
                                className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-yellow-400/40 hover:text-yellow-100 focus:ring-4 focus:ring-yellow-500/20"
                            >
                                Rifiuta
                            </button>
                            <button
                                onClick={acceptCookies}
                                className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-500/30"
                            >
                                Accetta tutto
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

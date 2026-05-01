'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BookingWizard from './BookingWizard';
import { Instagram, Twitter, Linkedin, Mail, MapPin, Clock, Youtube } from 'lucide-react';

interface SocialLinks {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    threads?: string;
    linkedin?: string;
    twitter?: string;
}

interface ContactStageProps {
    title?: string;
    introText?: string;
    socialLinks?: SocialLinks;
    email?: string;
    location?: string;
    studioLabel?: string;
    emailLabel?: string;
    followMeLabel?: string;
    pageBackground?: {
        asset: {
            url: string;
        };
    };
}

// Custom SVG Icons
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const ThreadsIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 192 192" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
    </svg>
);

export default function ContactStage({
    title,
    introText,
    socialLinks,
    email,
    location,
    studioLabel,
    emailLabel,
    followMeLabel,
    pageBackground
}: ContactStageProps) {
    const displayTitle = title || "Let's Inscribe Something Pure.";
    const displayIntro = introText || "I thrive on capturing raw emotion and cinematic moments. Share your vision below and let's craft something timeless.";
    
    const [showBookingWizard, setShowBookingWizard] = useState(true);

    // Map Sanity object to an array for rendering
    const links = [
        { id: 'instagram', url: socialLinks?.instagram || 'https://instagram.com/cielitosworld', Icon: Instagram, label: 'Instagram' },
        { id: 'youtube', url: socialLinks?.youtube || 'https://youtube.com/@abajodelcielo', Icon: Youtube, label: 'YouTube' },
        { id: 'threads', url: socialLinks?.threads || 'https://www.threads.net/@cielitosworld', Icon: ThreadsIcon, label: 'Threads' },
        { id: 'tiktok', url: socialLinks?.tiktok, Icon: TikTokIcon, label: 'TikTok' },
        { id: 'linkedin', url: socialLinks?.linkedin, Icon: Linkedin, label: 'LinkedIn' },
        { id: 'twitter', url: socialLinks?.twitter, Icon: Twitter, label: 'Twitter' },
    ].filter(link => !!link.url);



    return (
        <section className="relative w-full overflow-hidden flex flex-col items-start py-16 px-6">
            <div className="container max-w-7xl relative z-10 mx-auto w-full">
                <div className="flex flex-col items-start">
                    {/* Minimal Premium Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-start text-left max-w-3xl mb-16 px-4 sm:px-0"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-orange-600 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                            </span>
                            Availability: Open for Bookings
                        </div>
                        
                        <h1 className="hidden md:block text-5xl md:text-8xl font-fitzgerald-bold italic text-stone-950 dark:text-white leading-[1.1] mb-8 pr-4">
                            {displayTitle}
                        </h1>
                        
                        <p className="hidden md:block text-lg md:text-2xl text-stone-600 dark:text-stone-400 max-w-3xl font-light leading-relaxed mb-10">
                            {displayIntro}
                        </p>

                        <div className="flex flex-wrap items-center justify-start gap-4">
                            <button
                                onClick={() => setShowBookingWizard(true)}
                                className={`btn-press px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all ${
                                    showBookingWizard 
                                    ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/20' 
                                    : 'bg-stone-100 text-stone-400 hover:bg-stone-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-stone-500'
                                }`}
                                aria-pressed={showBookingWizard}
                            >
                                Inquiry Wizard
                            </button>
                            <button
                                onClick={() => setShowBookingWizard(false)}
                                className={`btn-press px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all ${
                                    !showBookingWizard 
                                    ? 'bg-stone-950 text-white dark:bg-white dark:text-stone-950 shadow-xl shadow-black/20' 
                                    : 'bg-stone-100 text-stone-400 hover:bg-stone-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-stone-500'
                                }`}
                                aria-pressed={!showBookingWizard}
                            >
                                Direct Channel
                            </button>
                        </div>
                    </motion.div>



                    {showBookingWizard ? (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="w-full max-w-5xl"
                        >
                            <div className="bg-white/5 dark:bg-stone-900/60 backdrop-blur-3xl border border-stone-200/50 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative min-h-[600px] max-h-[85dvh] mb-12">
                                <BookingWizard onClose={() => setShowBookingWizard(false)} isEmbedded={true} />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="w-full max-w-5xl mb-12"
                        >
                            <div className="relative overflow-hidden rounded-[2.5rem] border border-stone-200 bg-white/95 backdrop-blur-3xl shadow-2xl dark:border-white/10 dark:bg-stone-900/40">
                                <div className="relative grid gap-6 p-6 md:grid-cols-3 md:p-12">
                                    <div className="rounded-[2rem] border border-stone-100 bg-stone-50/50 p-8 dark:border-white/5 dark:bg-white/5">
                                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-lg shadow-orange-600/20">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-stone-400">
                                            {emailLabel || 'Communication'}
                                        </p>
                                        <a
                                            href={email ? `mailto:${email}` : 'mailto:Abajo.Del.Cieloo@gmail.com'}
                                            className="block break-words text-lg font-bold text-stone-950 transition-colors hover:text-orange-600 dark:text-white"
                                        >
                                            {email || 'Abajo.Del.Cieloo@gmail.com'}
                                        </a>
                                    </div>

                                    <div className="rounded-[2rem] border border-stone-100 bg-stone-50/50 p-8 dark:border-white/5 dark:bg-white/5">
                                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-950 text-white dark:bg-white dark:text-stone-950">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-stone-400">
                                            {studioLabel || 'Presence'}
                                        </p>
                                        <p className="text-lg font-bold text-stone-950 dark:text-white uppercase tracking-tight">
                                            {location || 'Southern California'}
                                        </p>
                                    </div>

                                    <div className="rounded-[2rem] border border-stone-100 bg-stone-50/50 p-8 dark:border-white/5 dark:bg-white/5">
                                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-900">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-stone-400">
                                            Response
                                        </p>
                                        <p className="text-lg font-bold text-stone-950 dark:text-white uppercase tracking-tight">
                                            24-48 Hours
                                        </p>
                                    </div>
                                </div>

                                <div className="relative border-t border-stone-100 dark:border-white/5 px-6 py-10 md:px-12">
                                    <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
                                        <div className="max-w-xl">
                                            <h2 className="text-2xl md:text-3xl font-archivo font-black uppercase tracking-tighter text-stone-950 dark:text-white mb-4">
                                                Digital Footprint
                                            </h2>
                                            <div className="flex flex-wrap gap-5 pt-4">
                                                {links.map(({ id, url, Icon, label }) => (
                                                    <motion.a
                                                        key={id}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ y: -5, scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-900 transition-all hover:bg-orange-600 hover:text-white hover:border-orange-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-orange-600 dark:hover:text-white shadow-sm hover:shadow-xl hover:shadow-orange-600/20"
                                                        aria-label={`Visit my ${label}`}
                                                    >
                                                        <Icon className="h-5 w-5" />
                                                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-500 whitespace-nowrap">
                                                                {label}
                                                            </span>
                                                        </div>
                                                    </motion.a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </section>
    );
}

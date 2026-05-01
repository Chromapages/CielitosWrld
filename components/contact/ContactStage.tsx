'use client';

import { useState } from 'react';
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
            metadata?: {
                dimensions?: {
                    width?: number;
                    height?: number;
                };
                lqip?: string;
            };
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
    const displayTitle = title || "Let's Capture Something Pure.";
    const displayIntro = introText || "I thrive on capturing raw emotion and cinematic moments. Share your vision below and let's craft something timeless.";
    const backgroundUrl = pageBackground?.asset?.url || '/images/contact/bg_cta.png';
    const displayEmail = email || 'Abajo.Del.Cieloo@gmail.com';
    const displayLocation = location || 'Southern California';

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



    const directRows = [
        {
            id: 'email',
            Icon: Mail,
            label: emailLabel || 'Communication',
            value: displayEmail,
            href: `mailto:${displayEmail}`,
            accent: 'bg-orange-600 text-white'
        },
        {
            id: 'location',
            Icon: MapPin,
            label: studioLabel || 'Presence',
            value: displayLocation,
            accent: 'bg-stone-950 text-white dark:bg-white dark:text-stone-950'
        },
        {
            id: 'response',
            Icon: Clock,
            label: 'Response',
            value: '24-48 Hours',
            accent: 'bg-stone-100 text-stone-950 dark:bg-white/10 dark:text-white'
        },
    ];

    return (
        <section className="relative w-full overflow-hidden bg-stone-50 px-0 pb-6 pt-[calc(var(--mobile-header-height,64px)+var(--safe-area-top,0px))] dark:bg-stone-950 md:px-6 md:py-16">
            <div className="relative z-10 mx-auto w-full max-w-7xl">
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative min-h-[240px] overflow-hidden px-5 pb-6 pt-12 text-center text-white md:mb-14 md:min-h-0 md:max-w-4xl md:overflow-visible md:bg-transparent md:px-4 md:pb-0 md:pt-0 md:text-center md:text-stone-950 md:dark:text-white"
                    >
                        <div className="absolute inset-0 md:hidden">
                            <Image
                                src={backgroundUrl}
                                alt=""
                                fill
                                sizes="100vw"
                                priority
                                className="object-cover"
                                placeholder={pageBackground?.asset?.metadata?.lqip ? 'blur' : 'empty'}
                                blurDataURL={pageBackground?.asset?.metadata?.lqip}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/90" />
                        </div>

                        <div className="relative z-10 flex min-h-[200px] flex-col items-center justify-end md:min-h-0 md:items-center md:justify-start">
                            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-orange-400/30 bg-black/35 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-orange-100 backdrop-blur-xl md:border-orange-500/20 md:bg-orange-500/5 md:text-orange-600">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                                </span>
                                Availability: Open for Bookings
                            </div>

                             <h1 className="max-w-[15ch] text-center text-4xl font-fitzgerald-bold italic leading-[0.98] text-white md:max-w-none md:text-center md:text-8xl md:leading-[1.1] md:text-stone-950 md:dark:text-white">
                                 {displayTitle}
                             </h1>

                            <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-white/82 md:mx-auto md:mt-8 md:text-2xl md:font-light md:text-stone-600 md:dark:text-stone-400">
                                {displayIntro}
                            </p>
                        </div>
                    </motion.div>

                    <div className="sticky top-[calc(var(--mobile-header-height,64px)+var(--safe-area-top,0px))] z-30 flex w-full justify-center border-y border-stone-200/70 bg-stone-50/95 px-4 py-3 backdrop-blur-2xl dark:border-white/10 dark:bg-stone-950/90 md:static md:mb-10 md:border-0 md:bg-transparent md:px-4 md:py-0 md:backdrop-blur-0">
                        <div className="grid w-full grid-cols-2 rounded-2xl border border-stone-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-white/5 md:inline-grid md:w-auto md:gap-2 md:border-0 md:bg-transparent md:p-0 md:shadow-none">
                            <button
                                onClick={() => setShowBookingWizard(true)}
                                className={`btn-press min-h-[46px] rounded-xl px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-all md:px-8 md:py-4 ${
                                    showBookingWizard
                                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                                        : 'text-stone-500 hover:bg-stone-100 hover:text-stone-950 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-white'
                                }`}
                                aria-pressed={showBookingWizard}
                            >
                                Inquiry
                            </button>
                            <button
                                onClick={() => setShowBookingWizard(false)}
                                className={`btn-press min-h-[46px] rounded-xl px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-all md:px-8 md:py-4 ${
                                    !showBookingWizard
                                        ? 'bg-stone-950 text-white shadow-lg shadow-black/15 dark:bg-white dark:text-stone-950'
                                        : 'text-stone-500 hover:bg-stone-100 hover:text-stone-950 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-white'
                                }`}
                                aria-pressed={!showBookingWizard}
                            >
                                Direct
                            </button>
                        </div>
                    </div>

                    {showBookingWizard ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="mx-auto w-full md:max-w-5xl md:px-4"
                        >
                            <div className="relative overflow-visible border-y border-stone-200 bg-white shadow-none dark:border-white/10 dark:bg-stone-900 md:min-h-[640px] md:overflow-hidden md:rounded-[2.5rem] md:border md:shadow-2xl">
                                <BookingWizard onClose={() => setShowBookingWizard(false)} isEmbedded={true} />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="mx-auto w-full px-4 pt-4 md:max-w-5xl md:pt-0"
                        >
                            <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-950/5 dark:border-white/10 dark:bg-stone-900/80 md:rounded-[2.5rem] md:shadow-2xl">
                                <div className="grid gap-3 p-3 md:grid-cols-3 md:gap-6 md:p-10">
                                    {directRows.map(({ id, Icon, label, value, href, accent }) => {
                                        const content = (
                                            <>
                                                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${accent}`}>
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-stone-400">
                                                        {label}
                                                    </p>
                                                    <p className="mt-1 break-words text-sm font-black uppercase tracking-tight text-stone-950 dark:text-white md:text-lg">
                                                        {value}
                                                    </p>
                                                </div>
                                            </>
                                        );

                                        return href ? (
                                            <a
                                                key={id}
                                                href={href}
                                                className="flex min-h-[74px] items-center gap-4 rounded-2xl border border-stone-100 bg-stone-50/70 p-4 transition-colors hover:border-orange-500/30 hover:bg-orange-50 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10 md:min-h-[180px] md:flex-col md:items-start md:justify-start md:p-8"
                                            >
                                                {content}
                                            </a>
                                        ) : (
                                            <div
                                                key={id}
                                                className="flex min-h-[74px] items-center gap-4 rounded-2xl border border-stone-100 bg-stone-50/70 p-4 dark:border-white/5 dark:bg-white/5 md:min-h-[180px] md:flex-col md:items-start md:justify-start md:p-8"
                                            >
                                                {content}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="border-t border-stone-100 px-5 py-6 dark:border-white/5 md:px-10 md:py-10">
                                    <h2 className="font-archivo text-xl font-black uppercase tracking-tight text-stone-950 dark:text-white md:text-3xl">
                                        {followMeLabel || 'Digital Footprint'}
                                    </h2>
                                    <div className="mt-5 flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:gap-5 md:overflow-visible md:pb-0">
                                        {links.map(({ id, url, Icon, label }) => (
                                            <motion.a
                                                key={id}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -3 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="group flex min-h-[54px] min-w-[54px] items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-900 shadow-sm transition-all hover:border-orange-600 hover:bg-orange-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-orange-600"
                                                aria-label={`Visit my ${label}`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </motion.a>
                                        ))}
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

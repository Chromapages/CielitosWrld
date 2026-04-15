'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BookingWizard from './BookingWizard';
import { Instagram, Twitter, Linkedin, Mail, MapPin, Clock, Youtube, ArrowDownRight, ArrowRight } from 'lucide-react';

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
    const [showBookingWizard, setShowBookingWizard] = useState(true);
    const wizardRef = useRef<HTMLDivElement | null>(null);

    // Map Sanity object to an array for rendering
    const links = [
        { id: 'email', url: email ? `mailto:${email}` : undefined, Icon: Mail, label: 'Email' },
        { id: 'instagram', url: socialLinks?.instagram, Icon: Instagram, label: 'Instagram' },
        { id: 'youtube', url: socialLinks?.youtube, Icon: Youtube, label: 'YouTube' },
        { id: 'tiktok', url: socialLinks?.tiktok, Icon: TikTokIcon, label: 'TikTok' },
        { id: 'threads', url: socialLinks?.threads, Icon: ThreadsIcon, label: 'Threads' },
        { id: 'linkedin', url: socialLinks?.linkedin, Icon: Linkedin, label: 'LinkedIn' },
        { id: 'twitter', url: socialLinks?.twitter, Icon: Twitter, label: 'Twitter' },
    ].filter(link => !!link.url);

    const handleScrollToWizard = () => {
        wizardRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <section className="relative min-h-screen w-full bg-white dark:bg-stone-900 overflow-hidden flex items-center justify-center pt-32 md:pt-44 pb-12 px-4">
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={pageBackground?.asset?.url || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2560"}
                    alt="Contact background"
                    fill
                    className="object-cover opacity-10 dark:opacity-20 blend-overlay"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-stone-100/90 dark:from-stone-950 dark:via-stone-950/95 dark:to-stone-950/80" />
            </div>

            <div className="container max-w-7xl relative z-10 mx-auto w-full px-4 sm:px-6">
                <div className="flex flex-col gap-8 md:gap-10 items-center">
                    
                    {/* Top Header Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full max-w-3xl flex flex-col items-center text-center pt-8"
                    >
                        {showBookingWizard && (
                            <span className="inline-block mb-2 text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
                                Available for Booking
                            </span>
                        )}

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-archivo font-black text-stone-950 dark:text-white tracking-tighter mb-6 leading-[0.95]">
                            {showBookingWizard ? (
                                <>
                                    Let&apos;s Create <br className="hidden md:block"/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">Something Real.</span>
                                </>
                            ) : (
                                <>
                                    Keep In Touch
                                </>
                            )}
                        </h1>

                        <p className="text-lg font-inter text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed mb-8">
                            {showBookingWizard
                                ? "I'm currently accepting new projects across Southern California. Fill out the inquiry form and I'll get back to you within 48 hours to discuss your vision."
                                : "Thanks for reaching out. Your inquiry is in. Use the details below for direct contact, social links, and location information while you wait for a response."}
                        </p>

                        {showBookingWizard && (
                            <div className="mb-4 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                                <button
                                    onClick={handleScrollToWizard}
                                    className="inline-flex min-w-[240px] items-center justify-center gap-3 rounded-full bg-orange-600 px-8 py-4 text-sm font-black uppercase tracking-[0.22em] text-white transition-all hover:bg-orange-500"
                                >
                                    Fill Out The Form
                                    <ArrowDownRight className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setShowBookingWizard(false)}
                                    className="inline-flex min-w-[240px] items-center justify-center gap-3 rounded-full border border-stone-300 bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.22em] text-stone-950 transition-all hover:border-orange-500 hover:bg-stone-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                                >
                                    View Contact Info
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        )}

                        {!showBookingWizard && (
                            <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16">
                            {email && (
                                <div className="flex flex-col items-center">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-2">Direct Email</h3>
                                    <a href={`mailto:${email}`} className="text-lg font-medium text-stone-950 hover:text-orange-400 transition-colors dark:text-white">
                                        {email}
                                    </a>
                                </div>
                            )}

                            <div className="flex flex-col items-center">
                                <div className="flex flex-wrap justify-center gap-3">
                                    {links.map(({ id, url, Icon, label }) => (
                                        <a
                                            key={id}
                                            href={url}
                                            target={id !== 'email' ? "_blank" : undefined}
                                            rel={id !== 'email' ? "noopener noreferrer" : undefined}
                                            className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 group shadow-lg dark:bg-white/5 dark:border-white/10 dark:text-stone-300"
                                            aria-label={`Visit my ${label}`}
                                        >
                                            <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        )}
                    </motion.div>

                    {showBookingWizard ? (
                        <motion.div
                            ref={wizardRef}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="w-full max-w-5xl"
                        >
                            <div className="bg-white/5 dark:bg-stone-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative h-[820px] md:h-[940px] flex flex-col mb-8">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -z-10 mix-blend-screen" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 mix-blend-screen" />

                                <div className="flex-1 w-full relative z-10 layout-wizard-container">
                                    <BookingWizard onClose={() => setShowBookingWizard(false)} isEmbedded={true} />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="w-full max-w-5xl mb-12"
                        >
                            <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white/90 backdrop-blur-xl shadow-2xl dark:border-white/10 dark:bg-white/5">
                                <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />
                                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

                                <div className="relative grid gap-6 p-6 md:grid-cols-3 md:p-10">
                                    <div className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6 dark:border-white/10 dark:bg-black/20">
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-stone-500 dark:text-stone-500">
                                            {emailLabel || 'Email'}
                                        </p>
                                        <a
                                            href={email ? `mailto:${email}` : 'mailto:Abajo.Del.Cieloo@gmail.com'}
                                            className="block break-words text-lg font-semibold text-stone-950 transition-colors hover:text-orange-500 dark:text-white dark:hover:text-orange-400"
                                        >
                                            {email || 'Abajo.Del.Cieloo@gmail.com'}
                                        </a>
                                        <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                                            Best for bookings, project briefs, rates, and collaboration requests.
                                        </p>
                                    </div>

                                    <div className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6 dark:border-white/10 dark:bg-black/20">
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-stone-500 dark:text-stone-500">
                                            {studioLabel || 'Location'}
                                        </p>
                                        <p className="text-lg font-semibold text-stone-950 dark:text-white">
                                            {location || 'Southern California, USA'}
                                        </p>
                                        <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                                            Available for local shoots, travel projects, and creative collaborations across the region.
                                        </p>
                                    </div>

                                    <div className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6 dark:border-white/10 dark:bg-black/20">
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-stone-500 dark:text-stone-500">
                                            Response Time
                                        </p>
                                        <p className="text-lg font-semibold text-stone-950 dark:text-white">
                                            Within 24-48 hours
                                        </p>
                                        <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                                            If your project has a hard deadline, include the requested date in your message.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative border-t border-stone-200 px-6 py-8 md:px-10 dark:border-white/10">
                                    <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                                        <div className="max-w-2xl">
                                            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-stone-500 dark:text-stone-500">
                                                {followMeLabel || 'Social Media'}
                                            </p>
                                            <h2 className="text-3xl font-archivo font-black uppercase tracking-tight text-stone-950 dark:text-white">
                                                {title || 'Stay in the Loop'}
                                            </h2>
                                            <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                                                {introText || 'Follow along for new work, behind-the-scenes moments, and current availability updates.'}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            {links.map(({ id, url, Icon, label }) => (
                                                <a
                                                    key={id}
                                                    href={url}
                                                    target={id !== 'email' ? "_blank" : undefined}
                                                    rel={id !== 'email' ? "noopener noreferrer" : undefined}
                                                    className="inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-bold text-stone-700 transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white dark:border-white/10 dark:bg-black/20 dark:text-stone-200"
                                                    aria-label={`Visit my ${label}`}
                                                >
                                                    <Icon className="h-4 w-4" />
                                                    {label}
                                                </a>
                                            ))}
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

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import WizardModal from './WizardModal';
import BookingWizard from './BookingWizard';
import { ArrowRight, Instagram, Twitter, Linkedin, Github, Globe, Share2, Mail } from 'lucide-react';

interface SocialLinks {
    instagram?: string;
    tiktok?: string;
    threads?: string;
    linkedin?: string;
    twitter?: string;
}

interface ContactStageProps {
    socialLinks?: SocialLinks;
    email?: string;
    pageBackground?: {
        asset: {
            url: string;
        };
    };
}

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const ThreadsIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 192 192"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
    </svg>
);

export default function ContactStage({ socialLinks, email, pageBackground }: ContactStageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Map Sanity object to an array for rendering
    // We only show icons if the URL is actually provided in Sanity
    const links = [
        { id: 'instagram', url: socialLinks?.instagram, Icon: Instagram, label: 'Instagram' },
        { id: 'tiktok', url: socialLinks?.tiktok, Icon: TikTokIcon, label: 'TikTok' },
        { id: 'threads', url: socialLinks?.threads, Icon: ThreadsIcon, label: 'Threads' },
        { id: 'linkedin', url: socialLinks?.linkedin, Icon: Linkedin, label: 'LinkedIn' },
        { id: 'twitter', url: socialLinks?.twitter, Icon: Twitter, label: 'Twitter' },
        { id: 'email', url: email ? `mailto:${email}` : undefined, Icon: Mail, label: 'Email' },
    ].filter(link => !!link.url);

    // Note: If you don't see any icons, please ensure you've filled out the 
    // "Social Links" or "Contact Email" section in the Contact Page document in Sanity Studio.

    return (
        <div className="relative h-screen w-full overflow-hidden bg-stone-900">
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={pageBackground?.asset?.url || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2560"}
                    alt="Contact background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-stone-950/40" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl flex flex-col items-center"
                >
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium tracking-wider uppercase">
                        Returning Spring &apos;26
                    </div>

                    <h1 className="text-6xl md:text-8xl font-archivo font-black text-white tracking-tighter mb-8 leading-[0.9]">
                        Let&apos;s Create <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">Something Real.</span>
                    </h1>

                    <p className="text-lg md:text-xl font-inter text-stone-300 max-w-xl mx-auto mb-10 leading-relaxed">
                        Ready to tell your story? I&apos;m currently accepting new projects for portraits, events, and brand collaborations.
                    </p>

                    <div className="flex flex-col items-center gap-10">
                        <motion.button
                            disabled
                            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-stone-800/50 text-stone-500 rounded-full font-bold text-lg tracking-wide cursor-not-allowed border border-white/5"
                        >
                            Booking Coming Soon
                        </motion.button>

                        {/* Social & Contact Icons - Animated Row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-8"
                        >
                            {links.map((link) => (
                                <motion.a
                                    key={link.id}
                                    href={link.url}
                                    target={link.id !== 'email' ? "_blank" : undefined}
                                    rel={link.id !== 'email' ? "noopener noreferrer" : undefined}
                                    whileHover={{ scale: 1.2, y: -4 }}
                                    className="text-stone-400 hover:text-white transition-all duration-300 p-2"
                                    aria-label={`Visit my ${link.label}`}
                                >
                                    <link.Icon className="w-6 h-6" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Footer Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-0 right-0 flex justify-center"
                >
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-stone-400 hover:text-white transition-colors text-sm font-medium border-b border-transparent hover:border-white"
                    >
                        Just want to say hi?
                    </button>
                </motion.div>
            </div>

            {/* Wizard Modal */}
            <WizardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <BookingWizard onClose={() => setIsModalOpen(false)} />
            </WizardModal>
        </div>
    );
}

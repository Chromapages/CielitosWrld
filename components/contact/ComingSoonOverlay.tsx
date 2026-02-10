'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram, AtSign } from 'lucide-react';

interface PolaroidProps {
    src: string;
    rotate: number;
    index: number;
    className?: string;
}

const Polaroid = ({ src, rotate, index, className = "" }: PolaroidProps) => {
    return (
        <motion.div
            animate={{
                opacity: 1,
                scale: 1,
                rotate: rotate,
                y: [0, -8, 0],
                rotateZ: [rotate, rotate + (index % 2 === 0 ? 1 : -1), rotate]
            }}
            transition={{
                opacity: { delay: index * 0.15, duration: 0.6 },
                scale: { delay: index * 0.15, duration: 0.6 },
                rotate: { delay: index * 0.15, duration: 0.6 },
                y: {
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                rotateZ: {
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
            whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 50,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            className={`absolute bg-white p-3 pb-10 shadow-xl border border-zinc-100 dark:bg-stone-800 dark:border-stone-700 pointer-events-auto ${className}`}
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-stone-900 w-32 md:w-40 lg:w-48">
                <Image
                    src={src}
                    alt="Atmospheric photography"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 128px, 192px"
                />
            </div>
        </motion.div>
    );
};

export default function ComingSoonOverlay() {
    const images = [
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800"
    ];

    return (
        <div className="relative w-full py-20 px-4 flex flex-col items-center justify-center overflow-hidden min-h-[500px]">
            {/* Scattered Polaroids Background */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none select-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full flex items-center justify-center">
                    {/* Static scattered ones */}
                    <div className="absolute -top-10 -left-10 w-40 h-50 bg-white/50 blur-sm rotate-12" />
                    <div className="absolute bottom-10 -right-20 w-60 h-80 bg-stone-200/30 blur-md -rotate-6" />
                </div>
            </div>

            {/* Main Interactive Stack */}
            <div className="relative w-full max-w-lg h-[400px] flex items-center justify-center z-10 pointer-events-none">
                <Polaroid src={images[0]} rotate={-12} index={0} className="-translate-x-32 -translate-y-16" />
                <Polaroid src={images[1]} rotate={8} index={1} className="translate-x-32 -translate-y-12" />
                <Polaroid src={images[2]} rotate={-4} index={2} className="-translate-x-8 translate-y-24" />
                <Polaroid src={images[3]} rotate={15} index={3} className="translate-x-20 translate-y-20" />
            </div>

            {/* Message Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="relative z-20 mt-12 text-center"
            >
                <div className="inline-block bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-white/20 dark:border-stone-800 p-8 md:p-12 rounded-[2rem] shadow-elevation-4 max-w-md mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="font-heading text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight leading-none"
                    >
                        Out Shooting.<br />
                        <span className="text-orange-600 dark:text-orange-500">Catch me in the wild.</span>
                    </motion.h2>

                    <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-10 text-lg leading-relaxed">
                        My contact form is taking a short hiatus. In the meantime, find me on the digital streets.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://www.instagram.com/cielitos.wrld/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-zinc-900/10"
                            tabIndex={0}
                        >
                            <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            Instagram
                        </a>
                        <a
                            href="https://www.threads.net/@cielitos.wrld"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 bg-white dark:bg-stone-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-stone-700 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/5"
                            tabIndex={0}
                        >
                            <AtSign className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                            Threads
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Background Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 dark:bg-orange-500/5 blur-[120px] -z-10 rounded-full" />
        </div>
    );
}

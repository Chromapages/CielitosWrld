"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Camera } from "lucide-react";

interface LoadingScreenProps {
    onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        setHasMounted(true);
        setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    }, []);

    useEffect(() => {
        const hasSeenLoader = sessionStorage.getItem("seen-loader");
        if (hasSeenLoader) {
            setLoading(false);
            onLoadingComplete?.();
            return;
        }

        // Progress fills over exactly 2500ms
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, 25);

        const timeout = setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("seen-loader", "true");
            onLoadingComplete?.();
        }, 2500);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, [onLoadingComplete]);

    // Ambient particles to match the "cinematic dust" in the user image
    const ambientParticles = useMemo(() => 
        Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            size: Math.random() * 2 + 0.5,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 20 + 15,
            delay: Math.random() * -20,
            opacity: Math.random() * 0.4 + 0.1,
        })), []);

    if (!hasMounted) return null;

    const exitAnimation = prefersReducedMotion 
        ? { opacity: 0 } 
        : { opacity: 0, transition: { duration: 0.8, ease: "easeInOut" as const } };

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="loading-screen"
                    role="status"
                    aria-live="polite"
                    aria-label={`Loading Cielito's Wrld — ${progress}% complete`}
                    initial={{ opacity: 1 }}
                    exit={exitAnimation}
                    className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
                    suppressHydrationWarning
                >
                    <span className="sr-only">
                        Loading Cielito&apos;s Wrld, {progress} percent complete
                    </span>

                    {/* ── Background Particles layer ── */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {ambientParticles.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute bg-white rounded-full"
                                style={{
                                    width: p.size,
                                    height: p.size,
                                    left: `${p.x}%`,
                                    top: `${p.y}%`,
                                    opacity: p.opacity,
                                }}
                                animate={{
                                    y: [0, -40, 0],
                                    x: [0, 20, 0],
                                    opacity: [p.opacity, p.opacity * 1.5, p.opacity],
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: p.delay,
                                }}
                            />
                        ))}
                    </div>

                    {/* ── Main UI Container ── */}
                    <div className="relative flex flex-col items-center gap-12 z-10 w-full max-w-sm px-4">
                        
                        {/* 1. Branding Row */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex items-center gap-3 md:gap-5"
                        >
                            <div className="size-10 md:size-14 text-orange-600 drop-shadow-[0_0_10px_rgba(234,88,12,0.4)]">
                                <Camera className="w-full h-full" strokeWidth={1.5} />
                            </div>
                            <h1 className="font-pattaya text-4xl md:text-6xl lg:text-7xl text-white italic drop-shadow-xl tracking-tight">
                                Cielito&apos;s Wrld
                            </h1>
                        </motion.div>

                        {/* 2. Glowing circular loader */}
                        <div className="relative size-20 md:size-24">
                            {/* Static Background Ring */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="40%"
                                    className="stroke-white/5 fill-none"
                                    strokeWidth="4"
                                />
                                {/* Progress Ring */}
                                <motion.circle
                                    cx="50%"
                                    cy="50%"
                                    r="40%"
                                    className="stroke-orange-600 fill-none"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    initial={{ strokeDasharray: "0 250" }}
                                    animate={{ strokeDasharray: `${(progress / 100) * 250} 250` }}
                                    style={{
                                        filter: "drop-shadow(0 0 8px rgba(234, 88, 12, 0.8))",
                                    }}
                                />
                            </svg>
                            
                            {/* Spinner Glow Core */}
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-2 border-transparent border-t-orange-500 rounded-full opacity-40"
                                style={{ filter: "blur(4px)" }}
                            />
                        </div>

                        {/* 3. Loading Footer */}
                        <div className="flex flex-col items-center gap-3">
                            <p className="font-archivo text-xs md:text-sm uppercase tracking-[0.6em] text-white/50 font-bold">
                                Loading...
                            </p>
                            {/* Subtle Progress Bar */}
                            <div className="w-48 h-[1px] bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.8)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface LoadingScreenProps {
    onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    }, []);

    useEffect(() => {
        const hasSeenLoader = sessionStorage.getItem("seen-loader");
        if (hasSeenLoader) {
            setLoading(false);
            onLoadingComplete?.();
            return;
        }

        // Progress fills over exactly 2500ms: +1 every 25ms = 100 steps
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

    // Smoothstep easing: slow start, fast middle, slow finish — feels mechanical
    const t = progress / 100;
    const easedT = t * t * (3 - 2 * t);

    // Iris radius in vmin (0 = fully closed, 150 = covers all corners of any screen)
    // vmin ensures a true circle on any aspect ratio
    const irisR = prefersReducedMotion ? 150 : easedT * 150;

    // Black overlay mask: transparent inside the growing circle, opaque black outside
    const irisMask = `radial-gradient(circle ${irisR}vmin at 50% 50%, transparent 97%, black 100%)`;

    // Brand name fades in once the iris is large enough to frame it (~35% progress)
    const logoOpacity = prefersReducedMotion ? 1 : Math.max(0, (progress - 35) / 65);

    const exitAnimation =
        prefersReducedMotion
            ? { opacity: 0, transition: { duration: 0 } }
            : isMobile
            ? { opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }
            : {
                  clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
              };

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
                    className="fixed inset-0 z-[9999] bg-black"
                >
                    <span className="sr-only">
                        Loading Cielito&apos;s Wrld, {progress} percent complete
                    </span>

                    {/* ── Content layer: revealed as iris opens ── */}
                    <div
                        className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none"
                        style={{ opacity: logoOpacity }}
                    >
                        <h1 className="font-pattaya text-4xl md:text-5xl text-amber-500">
                            Cielito&apos;s Wrld
                        </h1>
                        <div className="h-px w-10 bg-amber-500/30 my-3" />
                        <p className="font-archivo text-[9px] uppercase tracking-[0.35em] text-white/25">
                            {progress}%
                        </p>
                    </div>

                    {/* ── Aperture iris: black overlay with growing circular hole ── */}
                    <div
                        className="fixed inset-0 z-20 bg-black pointer-events-none"
                        style={{
                            WebkitMaskImage: irisMask,
                            maskImage: irisMask,
                        }}
                    />

                    {/* ── Blade seam lines: 6 radial divisions inside the black area ──
                        repeating-conic-gradient creates thin lines at 0°, 60°, 120°, 180°, 240°, 300°
                        Same mask as the iris so seams only show in the dark region, not through the opening
                    ── */}
                    <div
                        className="fixed inset-0 z-[21] pointer-events-none"
                        style={{
                            background: `repeating-conic-gradient(
                                from 0deg,
                                rgba(255,255,255,0.07) 0deg,
                                rgba(255,255,255,0.07) 0.6deg,
                                transparent 0.6deg,
                                transparent 60deg
                            )`,
                            WebkitMaskImage: irisMask,
                            maskImage: irisMask,
                        }}
                    />

                    {/* ── Iris edge amber glow ring ──
                        A thin amber halo at the exact iris boundary
                    ── */}
                    <div
                        className="fixed inset-0 z-[22] pointer-events-none"
                        style={{
                            background: `radial-gradient(
                                circle ${irisR}vmin at 50% 50%,
                                transparent calc(100% - 1.5px),
                                rgba(217,119,6,0.55) calc(100% - 0.5px),
                                rgba(217,119,6,0.2) 100%,
                                transparent calc(100% + 1.5px)
                            )`,
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;

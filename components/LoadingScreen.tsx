"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
    onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check if user has already seen the loader this session
        const hasSeenLoader = sessionStorage.getItem("seen-loader");
        if (hasSeenLoader) {
            setLoading(false);
            onLoadingComplete?.();
            return;
        }

        // Simulate progress
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 2;
            });
        }, 20);

        // Complete loading after a set duration
        const timeout = setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("seen-loader", "true");
            onLoadingComplete?.();
        }, 2500); // 2.5 seconds total

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="loading-screen"
                    initial={{ opacity: 1 }}
                    exit={{
                        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
                >
                    {/* Logo Animation */}
                    <div className="relative mb-8 flex flex-col items-center">
                        <svg
                            width="120"
                            height="120"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mb-4"
                        >
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="white"
                                strokeWidth="0.5"
                                initial={{ pathLength: 0, rotate: -90 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </svg>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="font-archivo text-2xl font-light tracking-[0.2em] text-white"
                        >
                            CIELITOSWRLD
                        </motion.h1>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-[1px] w-48 overflow-hidden bg-white/10">
                        <motion.div
                            className="h-full bg-white"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 font-space text-[10px] uppercase tracking-widest text-white/50"
                    >
                        Initializing Experience
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;

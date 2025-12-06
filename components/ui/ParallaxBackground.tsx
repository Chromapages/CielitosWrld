'use client';

import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface ParallaxBackgroundProps {
    children: ReactNode;
    /** Parallax intensity (0-1), default 0.1 (10% movement) */
    intensity?: number;
    /** Background image URL */
    backgroundUrl?: string;
    /** Additional className */
    className?: string;
}

/**
 * Light parallax effect on background images
 * Very subtle (5-10% movement) for photography-first feel
 * Respects prefers-reduced-motion
 */
export function ParallaxBackground({
    children,
    intensity = 0.1,
    backgroundUrl,
    className = '',
}: ParallaxBackgroundProps) {
    const prefersReducedMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (prefersReducedMotion || !containerRef.current) return;

        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how far through the viewport the element is
            // -1 = completely above, 0 = centered, 1 = completely below
            const progress = (windowHeight / 2 - rect.top - rect.height / 2) / windowHeight;

            // Convert to pixel offset (clamp to reasonable range)
            const maxOffset = 50; // max 50px movement
            const newOffset = Math.max(-maxOffset, Math.min(maxOffset, progress * maxOffset * intensity * 10));

            setOffset(newOffset);
        };

        // Use passive listener for performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial position

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [intensity, prefersReducedMotion]);

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            {/* Parallax background layer */}
            {backgroundUrl && !prefersReducedMotion && (
                <div
                    className="absolute inset-0 z-0 will-change-transform"
                    style={{
                        backgroundImage: `url(${backgroundUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: `translateY(${offset}px) scale(1.1)`, // Scale slightly to prevent edge gaps
                    }}
                />
            )}

            {/* Fallback static background if reduced motion */}
            {backgroundUrl && prefersReducedMotion && (
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${backgroundUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

export default ParallaxBackground;

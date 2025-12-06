'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface CursorPosition {
    x: number;
    y: number;
}

/**
 * Custom magnetic cursor component
 * - Ring cursor that follows mouse with smooth easing
 * - Magnetic pull toward interactive elements
 * - Hidden on mobile and when prefers-reduced-motion
 */
export function MagneticCursor() {
    const prefersReducedMotion = useReducedMotion();
    const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
    const [targetPosition, setTargetPosition] = useState<CursorPosition>({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const animationRef = useRef<number | undefined>(undefined);

    // Smooth lerp function
    const lerp = (start: number, end: number, factor: number): number => {
        return start + (end - start) * factor;
    };

    // Animation loop for smooth cursor movement
    useEffect(() => {
        if (prefersReducedMotion) return;

        const animate = () => {
            setPosition((prev) => ({
                x: lerp(prev.x, targetPosition.x, 0.15),
                y: lerp(prev.y, targetPosition.y, 0.15),
            }));
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [targetPosition, prefersReducedMotion]);

    // Mouse movement handler
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const { clientX, clientY } = e;

        // Check if hovering over an interactive element
        const target = e.target as HTMLElement;
        const interactiveElement = target.closest('a, button, [role="button"], [data-magnetic]');

        if (interactiveElement) {
            // Magnetic effect: cursor gravitates toward center of element
            const rect = interactiveElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Pull strength (0.3 = 30% toward center)
            const pullStrength = 0.3;
            const magneticX = clientX + (centerX - clientX) * pullStrength;
            const magneticY = clientY + (centerY - clientY) * pullStrength;

            setTargetPosition({ x: magneticX, y: magneticY });
            setIsHovering(true);
        } else {
            setTargetPosition({ x: clientX, y: clientY });
            setIsHovering(false);
        }
    }, []);

    // Mouse enter/leave document
    const handleMouseEnter = useCallback(() => setIsVisible(true), []);
    const handleMouseLeave = useCallback(() => setIsVisible(false), []);

    // Click effects
    const handleMouseDown = useCallback(() => setIsClicking(true), []);
    const handleMouseUp = useCallback(() => setIsClicking(false), []);

    // Set up event listeners
    useEffect(() => {
        if (prefersReducedMotion) return;

        // Only show on desktop (pointer: fine)
        if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
            return;
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp, prefersReducedMotion]);

    // Don't render if reduced motion or on mobile
    if (prefersReducedMotion) return null;

    return (
        <>
            {/* Hide default cursor globally */}
            <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

            {/* Custom cursor ring */}
            <div
                className="fixed pointer-events-none z-[9999] hidden md:block"
                style={{
                    left: position.x,
                    top: position.y,
                    transform: 'translate(-50%, -50%)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 200ms ease-out',
                }}
                aria-hidden="true"
            >
                {/* Outer ring */}
                <div
                    className="rounded-full border-2 border-orange-500/60 dark:border-orange-400/60"
                    style={{
                        width: isHovering ? 48 : 32,
                        height: isHovering ? 48 : 32,
                        transform: isClicking ? 'scale(0.85)' : 'scale(1)',
                        transition: 'width 200ms ease-out, height 200ms ease-out, transform 100ms ease-out',
                        backgroundColor: isHovering ? 'rgba(234, 88, 12, 0.1)' : 'transparent',
                    }}
                />

                {/* Inner dot */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 dark:bg-orange-400"
                    style={{
                        width: isHovering ? 6 : 4,
                        height: isHovering ? 6 : 4,
                        transition: 'width 200ms ease-out, height 200ms ease-out',
                    }}
                />
            </div>
        </>
    );
}

export default MagneticCursor;

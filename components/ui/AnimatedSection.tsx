'use client';

import React, { ReactNode } from 'react';
import { useInView } from '@/lib/hooks/useInView';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up';

interface AnimatedSectionProps {
    children: ReactNode;
    animation?: AnimationType;
    /** Delay before animation starts (ms) */
    delay?: number;
    /** Duration of animation (ms), max 400 */
    duration?: number;
    /** Threshold for triggering (0-1) */
    threshold?: number;
    /** Additional classes */
    className?: string;
    /** Element tag to use */
    as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav';
}

/**
 * Wrapper component for scroll-triggered section animations
 * Respects prefers-reduced-motion
 */
export function AnimatedSection({
    children,
    animation = 'fade-up',
    delay = 0,
    duration = 400,
    threshold = 0.1,
    className,
    as: Component = 'div',
}: AnimatedSectionProps) {
    const { ref, isInView } = useInView<HTMLDivElement>({ threshold, triggerOnce: true });
    const prefersReducedMotion = useReducedMotion();

    // Cap duration at 400ms for performance
    const safeDuration = Math.min(duration, 400);

    // Base styles for animations
    const baseStyles: React.CSSProperties = prefersReducedMotion
        ? {}
        : {
            transitionProperty: 'opacity, transform',
            transitionDuration: `${safeDuration}ms`,
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // ease-out-quad
            transitionDelay: `${delay}ms`,
        };

    // Animation-specific initial and final states
    const getAnimationClasses = () => {
        if (prefersReducedMotion) return '';

        const notInViewClasses: Record<AnimationType, string> = {
            'fade-up': 'opacity-0 translate-y-8',
            'fade-in': 'opacity-0',
            'slide-left': 'opacity-0 -translate-x-8',
            'slide-right': 'opacity-0 translate-x-8',
            'scale-up': 'opacity-0 scale-95',
        };

        const inViewClasses = 'opacity-100 translate-y-0 translate-x-0 scale-100';

        return isInView ? inViewClasses : notInViewClasses[animation];
    };

    return (
        <div
            ref={ref}
            className={cn(getAnimationClasses(), className)}
            style={baseStyles}
        >
            {children}
        </div>
    );
}

export default AnimatedSection;

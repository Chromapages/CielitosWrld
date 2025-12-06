'use client';

import React, { Children, ReactNode, isValidElement, cloneElement, ReactElement } from 'react';
import { useInView } from '@/lib/hooks/useInView';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface StaggeredChildrenProps {
    children: ReactNode;
    /** Delay between each child (ms), default 75 */
    staggerDelay?: number;
    /** Base duration for each animation (ms), max 400 */
    duration?: number;
    /** Initial delay before first child animates (ms) */
    initialDelay?: number;
    /** Animation type */
    animation?: 'fade-up' | 'fade-in' | 'scale-up';
    /** Threshold for triggering */
    threshold?: number;
    /** Container className */
    className?: string;
}

/**
 * Animates children with staggered entrance delays
 * Limited to 8 children to prevent animation overload
 */
export function StaggeredChildren({
    children,
    staggerDelay = 75,
    duration = 350,
    initialDelay = 0,
    animation = 'fade-up',
    threshold = 0.1,
    className,
}: StaggeredChildrenProps) {
    const { ref, isInView } = useInView<HTMLDivElement>({ threshold, triggerOnce: true });
    const prefersReducedMotion = useReducedMotion();

    // Cap duration at 400ms
    const safeDuration = Math.min(duration, 400);

    // Animation classes
    const getChildClasses = (index: number) => {
        if (prefersReducedMotion) return '';

        const notInViewClasses: Record<string, string> = {
            'fade-up': 'opacity-0 translate-y-6',
            'fade-in': 'opacity-0',
            'scale-up': 'opacity-0 scale-95',
        };

        const inViewClasses = 'opacity-100 translate-y-0 scale-100';

        return isInView ? inViewClasses : notInViewClasses[animation];
    };

    const getChildStyles = (index: number): React.CSSProperties => {
        if (prefersReducedMotion) return {};

        // Limit stagger to first 8 items
        const effectiveIndex = Math.min(index, 7);
        const delay = initialDelay + effectiveIndex * staggerDelay;

        return {
            transitionProperty: 'opacity, transform',
            transitionDuration: `${safeDuration}ms`,
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDelay: `${delay}ms`,
        };
    };

    const childArray = Children.toArray(children);

    return (
        <div ref={ref} className={className}>
            {childArray.map((child, index) => {
                if (!isValidElement(child)) return child;

                const childElement = child as ReactElement<{ className?: string; style?: React.CSSProperties }>;

                return cloneElement(childElement, {
                    className: cn(childElement.props.className, getChildClasses(index)),
                    style: { ...childElement.props.style, ...getChildStyles(index) },
                });
            })}
        </div>
    );
}

export default StaggeredChildren;

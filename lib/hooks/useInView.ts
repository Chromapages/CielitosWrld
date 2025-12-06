'use client';

import { useEffect, useState, useRef, RefObject } from 'react';

interface UseInViewOptions {
    /** Threshold for intersection (0-1), default 0.1 */
    threshold?: number;
    /** Root margin for early/late triggering, default '0px' */
    rootMargin?: string;
    /** Only trigger once, default true */
    triggerOnce?: boolean;
}

interface UseInViewReturn<T extends HTMLElement> {
    ref: RefObject<T | null>;
    isInView: boolean;
}

/**
 * Hook to detect when an element enters the viewport
 * Uses Intersection Observer for performance
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
    options: UseInViewOptions = {}
): UseInViewReturn<T> {
    const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;

    const ref = useRef<T>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Check for IntersectionObserver support
        if (typeof IntersectionObserver === 'undefined') {
            setIsInView(true); // Fallback: assume visible
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                const inView = entry.isIntersecting;

                if (inView) {
                    setIsInView(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsInView(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, rootMargin, triggerOnce]);

    return { ref, isInView };
}

export default useInView;

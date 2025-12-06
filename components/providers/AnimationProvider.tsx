'use client';

import { MagneticCursor } from '@/components/ui/MagneticCursor';

/**
 * Client-side providers for animations and interactivity
 * Wrapped in a separate component to avoid hydration issues in the root layout
 */
export function AnimationProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <MagneticCursor />
            {children}
        </>
    );
}

export default AnimationProvider;

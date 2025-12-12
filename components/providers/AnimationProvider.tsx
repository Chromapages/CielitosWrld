'use client';

import { usePathname } from 'next/navigation';
import { MagneticCursor } from '@/components/ui/MagneticCursor';

/**
 * Client-side providers for animations and interactivity
 * Wrapped in a separate component to avoid hydration issues in the root layout
 */
export function AnimationProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isStudioRoute = pathname?.startsWith('/studio');

    return (
        <>
            {/* Hide cursor on Studio routes */}
            {!isStudioRoute && <MagneticCursor />}
            {children}
        </>
    );
}

export default AnimationProvider;

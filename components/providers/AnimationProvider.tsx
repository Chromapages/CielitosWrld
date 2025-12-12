'use client';

/**
 * Client-side providers for animations and interactivity
 * Wrapped in a separate component to avoid hydration issues in the root layout
 */
export function AnimationProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}

export default AnimationProvider;

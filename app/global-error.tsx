'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to Sentry
        Sentry.captureException(error);
    }, [error]);

    return (
        <html>
            <body className="bg-stone-50 text-stone-900 flex items-center justify-center min-h-screen font-sans">
                <div className="text-center p-6">
                    <h2 className="text-3xl font-bold mb-4">Critical Error</h2>
                    <p className="mb-6 text-stone-600">Something went wrong at the application level.</p>
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-colors duration-200"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}

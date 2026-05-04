'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { getErrorMetadata, logger } from '@/lib/logger';

interface ErrorTemplateProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorTemplate({ error, reset }: ErrorTemplateProps) {
    useEffect(() => {
        logger.error('Route error boundary triggered', {
            route: 'ErrorTemplate',
            metadata: {
                ...getErrorMetadata(error),
                digest: error.digest,
            },
        });
    }, [error]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-stone-50 dark:bg-stone-950 px-4">
            <div className="max-w-md text-center">
                <h2 className="text-3xl font-bold mb-4 font-display text-stone-900 dark:text-stone-100">
                    Something went wrong
                </h2>
                <p className="text-stone-600 dark:text-stone-400 mb-8 leading-relaxed">
                    We're sorry, but something unexpected happened. We've been notified and are looking into it.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-orange-600/20"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-200 rounded-full font-bold hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                    >
                        Go Home
                    </Link>
                </div>
                {error.digest && (
                    <p className="mt-8 text-xs text-stone-400 font-mono">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}

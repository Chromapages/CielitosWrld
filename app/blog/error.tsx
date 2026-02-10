'use client';

import ErrorTemplate from '@/components/layout/ErrorTemplate';

export default function Error(props: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return <ErrorTemplate {...props} />;
}

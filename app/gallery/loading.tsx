import { SkeletonCard } from '@/components/ui/SkeletonCard';

export default function Loading() {
    return (
        <div className="container mx-auto px-6 py-16 min-h-screen pt-24 md:pt-32">
            <div className="mb-12 space-y-4">
                <div className="h-10 w-48 bg-stone-200 dark:bg-stone-800 rounded-lg animate-pulse" />
                <div className="h-6 w-96 max-w-full bg-stone-200 dark:bg-stone-800 rounded-lg animate-pulse" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}

import { SkeletonCard } from '@/components/ui/SkeletonCard';

export default function Loading() {
    return (
        <div className="container mx-auto px-6 py-24 min-h-screen">
            <div className="mb-12 space-y-4">
                <div className="h-12 w-48 bg-stone-200 dark:bg-stone-800 rounded-lg animate-pulse" />
                <div className="h-6 w-32 bg-stone-200 dark:bg-stone-800 rounded-lg animate-pulse" />
            </div>

            {/* Filters Skeleton */}
            <div className="flex gap-2 mb-8">
                <div className="h-10 w-20 bg-stone-200 dark:bg-stone-800 rounded-full animate-pulse" />
                <div className="h-10 w-24 bg-stone-200 dark:bg-stone-800 rounded-full animate-pulse" />
                <div className="h-10 w-24 bg-stone-200 dark:bg-stone-800 rounded-full animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}

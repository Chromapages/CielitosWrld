import { Skeleton } from '@/components/ui/SkeletonCard';

export default function Loading() {
    return (
        <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
            {/* Hero Skeleton */}
            <div className="relative -mt-16 md:-mt-24 pt-32 pb-32 md:pt-48 md:pb-40 bg-stone-950">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-stone-800" />
                    <Skeleton className="h-6 w-1/2 mx-auto bg-stone-800" />
                </div>
            </div>

            {/* Pricing Skeleton */}
            <div className="container mx-auto px-6 -mt-16 pb-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 h-[500px] flex flex-col">
                            <Skeleton className="h-8 w-1/2 mb-4" />
                            <Skeleton className="h-4 w-3/4 mb-8" />
                            <Skeleton className="h-12 w-1/3 mb-8" />
                            <div className="space-y-4 flex-grow">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                            <Skeleton className="h-12 w-full rounded-xl mt-8" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

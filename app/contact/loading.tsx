import { Skeleton } from '@/components/ui/SkeletonCard';

export default function Loading() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-stone-50 dark:bg-stone-950">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-12 text-center">
                    <Skeleton className="h-12 w-64 mx-auto mb-4" />
                    <Skeleton className="h-6 w-96 max-w-full mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image/Info Skeleton */}
                    <Skeleton className="h-[400px] w-full rounded-2xl" />

                    {/* Form Skeleton */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-12 w-full rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

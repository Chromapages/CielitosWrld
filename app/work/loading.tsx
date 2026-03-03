import React from "react";
import { SkeletonImage } from "@/components/ui/SkeletonImage";

export default function WorkLoading() {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="mb-16">
                <div className="h-12 w-64 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
                <div className="mt-4 h-6 w-96 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-4">
                        <SkeletonImage aspectRatio="video" className="rounded-xl" />
                        <div className="space-y-2">
                            <div className="h-6 w-3/4 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
                            <div className="h-4 w-1/2 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

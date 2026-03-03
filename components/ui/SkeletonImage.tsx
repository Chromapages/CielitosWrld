"use client";

import { cn } from "@/lib/utils"

interface SkeletonImageProps {
    className?: string;
    aspectRatio?: "square" | "video" | "portrait" | "landscape";
}

export function SkeletonImage({ className, aspectRatio = "portrait" }: SkeletonImageProps) {
    const aspectRatios = {
        square: "aspect-square",
        video: "aspect-video",
        portrait: "aspect-[3/4]",
        landscape: "aspect-[4/3]",
    };

    return (
        <div
            className={cn(
                "animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800/50",
                aspectRatios[aspectRatio],
                className
            )}
        />
    );
}

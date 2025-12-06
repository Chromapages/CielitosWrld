'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

import { cn } from '@/lib/utils';

interface PageBackgroundProps {
    image: any;
    alt?: string;
    className?: string;
    overlayClassName?: string;
}

export default function PageBackground({ image, alt = 'Page Background', className, overlayClassName }: PageBackgroundProps) {
    if (!image) return null;

    return (
        <div className={`fixed inset-0 z-0 ${className || ''}`}>
            <Image
                src={urlFor(image).width(1920).url()}
                alt={alt}
                fill
                className="object-cover"
                priority
            />
            {/* Glassmorphism Overlay */}
            <div className={cn("absolute inset-0 backdrop-blur-[3px] bg-white/5 dark:bg-black/5", overlayClassName)} />
        </div>
    );
}

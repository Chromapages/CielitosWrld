'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface BlogImageProps {
    value: {
        asset: {
            _ref: string;
        };
        alt?: string;
        caption?: string;
    };
}

// Extract intrinsic dimensions from Sanity asset ref string
// Format: image-abc12345-1200x800-jpg
const parseSanityDimensions = (ref: string) => {
    const pattern = /image-([a-f\d]+)-(\d+)x(\d+)-(\w+)/;
    const match = ref.match(pattern);

    if (match) {
        return {
            width: parseInt(match[2], 10),
            height: parseInt(match[3], 10),
            aspectRatio: parseInt(match[2], 10) / parseInt(match[3], 10)
        };
    }

    return { width: 800, height: 600, aspectRatio: 4 / 3 }; // Fallback
};

export default function BlogImage({ value }: BlogImageProps) {
    if (!value?.asset?._ref) return null;

    const { width, height } = parseSanityDimensions(value.asset._ref);

    return (
        <figure className="my-8 w-full">
            <div
                className="relative w-full rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800"
                style={{ aspectRatio: `${width} / ${height}` }}
            >
                <Image
                    src={urlFor(value.asset).url()}
                    alt={value.alt || 'Blog post image'}
                    width={width}
                    height={height}
                    className="object-contain w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px" // Responsive sizes
                />
            </div>

            {value.caption && (
                <figcaption className="mt-3 text-center font-inter text-sm text-stone-500 italic">
                    {value.caption}
                </figcaption>
            )}
        </figure>
    );
}

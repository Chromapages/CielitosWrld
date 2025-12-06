import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
    heading: string
    subheading?: string
    backgroundImage?: any
    ctaLabel?: string
    ctaLink?: string
    layout?: 'centered' | 'left'
}

export default function HeroSection({
    heading,
    subheading,
    backgroundImage,
    ctaLabel,
    ctaLink,
    layout = 'centered',
}: HeroSectionProps) {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={urlFor(backgroundImage).width(1920).url()}
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            )}

            {/* Content */}
            <div className={cn(
                "relative z-10 container mx-auto px-4",
                layout === 'centered' ? "text-center" : "text-left"
            )}>
                <div className={cn(
                    "max-w-3xl",
                    layout === 'centered' ? "mx-auto" : ""
                )}>
                    <h1 className="font-fitzgerald font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
                        {heading}
                    </h1>
                    {subheading && (
                        <p className="font-inter text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                            {subheading}
                        </p>
                    )}
                    {ctaLabel && ctaLink && (
                        <Link
                            href={ctaLink}
                            className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white font-fitzgerald text-lg rounded-full hover:bg-orange-700 transition-all hover:scale-105"
                        >
                            {ctaLabel}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    )
}

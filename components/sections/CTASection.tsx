import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

interface CTASectionProps {
    heading: string
    text?: string
    buttonText: string
    buttonLink: string
    backgroundImage?: any
}

export default function CTASection({
    heading,
    text,
    buttonText,
    buttonLink,
    backgroundImage,
}: CTASectionProps) {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background */}
            {backgroundImage ? (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={urlFor(backgroundImage).width(1920).url()}
                        alt="CTA Background"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-mud-900/60" />
                </div>
            ) : (
                <div className="absolute inset-0 bg-orange-600 dark:bg-orange-700" />
            )}

            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-fitzgerald font-bold text-3xl md:text-5xl text-white mb-6">
                        {heading}
                    </h2>
                    {text && (
                        <p className="font-inter text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                            {text}
                        </p>
                    )}
                    <Link
                        href={buttonLink}
                        className={cn(
                            "inline-flex items-center justify-center px-8 py-4 font-fitzgerald text-lg rounded-full transition-all hover:scale-105",
                            backgroundImage
                                ? "bg-white text-mud-900 hover:bg-sage-100"
                                : "bg-mud-900 text-white hover:bg-mud-800"
                        )}
                    >
                        {buttonText}
                    </Link>
                </div>
            </div>
        </section>
    )
}

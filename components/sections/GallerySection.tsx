import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

interface GallerySectionProps {
    title?: string
    description?: string
    images: any[]
    layout?: 'masonry' | 'grid' | 'carousel'
}

export default function GallerySection({
    title,
    description,
    images = [],
    layout = 'masonry',
}: GallerySectionProps) {
    if (!images || images.length === 0) return null

    return (
        <section className="py-20 bg-white dark:bg-sage-900">
            <div className="container mx-auto px-4">
                {/* Header */}
                {(title || description) && (
                    <div className="text-center mb-12 max-w-3xl mx-auto">
                        {title && (
                            <h2 className="font-fitzgerald font-bold text-3xl md:text-5xl text-mud-900 dark:text-sage-100 mb-4">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="font-inter text-mud-600 dark:text-sage-400 text-lg">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Grid Layout */}
                {layout === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((image, idx) => (
                            <div key={idx} className="relative aspect-square overflow-hidden rounded-lg group">
                                <Image
                                    src={urlFor(image).width(800).height(800).url()}
                                    alt={`Gallery Image ${idx + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Masonry Layout (Simple CSS Columns) */}
                {layout === 'masonry' && (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {images.map((image, idx) => (
                            <div key={idx} className="relative break-inside-avoid overflow-hidden rounded-lg group">
                                <Image
                                    src={urlFor(image).width(800).url()}
                                    alt={`Gallery Image ${idx + 1}`}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Carousel Layout (Horizontal Scroll) */}
                {layout === 'carousel' && (
                    <div className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 scrollbar-hide snap-x">
                        {images.map((image, idx) => (
                            <div key={idx} className="relative flex-shrink-0 w-[80vw] md:w-[40vw] aspect-[4/3] rounded-lg overflow-hidden snap-center">
                                <Image
                                    src={urlFor(image).width(1200).url()}
                                    alt={`Gallery Image ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

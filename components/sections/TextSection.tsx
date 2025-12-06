import { PortableText } from '@portabletext/react'
import { cn } from '@/lib/utils'

interface TextSectionProps {
    heading?: string
    content: any[]
    centered?: boolean
}

export default function TextSection({
    heading,
    content,
    centered = false,
}: TextSectionProps) {
    return (
        <section className="py-20 bg-sage-50 dark:bg-sage-900/50">
            <div className={cn(
                "container mx-auto px-4",
                centered ? "text-center" : ""
            )}>
                <div className={cn(
                    "max-w-3xl",
                    centered ? "mx-auto" : ""
                )}>
                    {heading && (
                        <h2 className="font-fitzgerald font-bold text-3xl md:text-4xl text-mud-900 dark:text-sage-100 mb-8">
                            {heading}
                        </h2>
                    )}
                    <div className={cn(
                        "prose dark:prose-invert prose-sage max-w-none font-inter text-mud-800 dark:text-sage-200 leading-relaxed",
                        centered ? "prose-p:mx-auto" : ""
                    )}>
                        <PortableText value={content} />
                    </div>
                </div>
            </div>
        </section>
    )
}

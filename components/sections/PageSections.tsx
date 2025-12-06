import HeroSection from './HeroSection'
import GallerySection from './GallerySection'
import TextSection from './TextSection'
import CTASection from './CTASection'

const SECTION_COMPONENTS: Record<string, any> = {
    heroSection: HeroSection,
    gallerySection: GallerySection,
    textSection: TextSection,
    ctaSection: CTASection,
}

interface PageSectionsProps {
    sections: any[]
}

export default function PageSections({ sections }: PageSectionsProps) {
    if (!sections || sections.length === 0) return null

    return (
        <div className="flex flex-col">
            {sections.map((section) => {
                const Component = SECTION_COMPONENTS[section._type]

                if (!Component) {
                    console.warn(`No component found for section type: ${section._type}`)
                    return null
                }

                return <Component key={section._key} {...section} />
            })}
        </div>
    )
}

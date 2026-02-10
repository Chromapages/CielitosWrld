import { sanityFetch } from "@/sanity/lib/client";
import { SERVICES_PAGE_QUERY } from "@/sanity/lib/queries";
import ServicesHero from "@/components/services/ServicesHero";
import PricingCards from "@/components/services/PricingCards";
import ComparisonTable from "@/components/services/ComparisonTable";
import ProcessSection from "@/components/services/ProcessSection";
import ProcessGallery from "@/components/services/ProcessGallery";
import FAQAccordion from "@/components/services/FAQAccordion";
import FinalCTA from "@/components/services/FinalCTA";
import { ServicePackage, ProcessStep, FAQ } from "@/types/services";

interface ServicesPageData {
    page: {
        heroHeading?: string;
        heroSubhead?: string;
        heroTrustText?: string;
        processSteps?: ProcessStep[];
        faqs?: FAQ[];
        finalCtaHeading?: string;
        finalCtaText?: string;
        processGallery?: any[];
        seo?: {
            title?: string;
            description?: string;
        };
    };
    packages: ServicePackage[];
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ServicesPage() {
    const data = await sanityFetch<ServicesPageData>({
        query: SERVICES_PAGE_QUERY,
    });

    const { page, packages: fetchedPackages } = data || { page: {}, packages: [] };

    const placeholderPackages: ServicePackage[] = [
        {
            _id: "placeholder-1",
            name: "The Essential",
            tagline: "Perfect for quick updates and social media content.",
            price: "$350",
            priceNote: "starting at",
            features: [
                "1 Hour Session",
                "15 High-Res Edits",
                "Online Gallery",
                "1 Location",
                "2 Outfit Changes"
            ],
            popular: false,
            ctaText: "Book Essential",
            ctaLink: "/contact",
            targetAudience: "Content Creators"
        },
        {
            _id: "placeholder-2",
            name: "The Signature",
            tagline: "Our most popular package for brands and creatives.",
            price: "$650",
            priceNote: "starting at",
            features: [
                "2 Hour Session",
                "35 High-Res Edits",
                "Online Gallery",
                "2 Locations",
                "3 Outfit Changes",
                "Creative Direction"
            ],
            popular: true,
            ctaText: "Book Signature",
            ctaLink: "/contact",
            targetAudience: "Brands & Creatives"
        },
        {
            _id: "placeholder-3",
            name: "The Branding",
            tagline: "Full-day coverage for a massive content library.",
            price: "$1,200",
            priceNote: "starting at",
            features: [
                "4 Hour Session",
                "80+ High-Res Edits",
                "Online Gallery",
                "Multiple Locations",
                "Unlimited Outfits",
                "Creative Direction & Styling",
                "Social Media Strategy"
            ],
            popular: false,
            ctaText: "Book Branding",
            ctaLink: "/contact",
            targetAudience: "Agencies & Enterprises"
        }
    ];

    const packages = fetchedPackages && fetchedPackages.length > 0 ? fetchedPackages : placeholderPackages;

    const defaultSteps = [
        { title: "Inquiry", description: "Fill out the contact form and tell me about your vision." },
        { title: "Consultation", description: "We'll hop on a call to discuss details and secure your date." },
        { title: "The Session", description: "We create magic together! I guide you through poses and lighting." },
        { title: "Delivery", description: "Receive your professionally edited gallery within 2 weeks." },
    ];
    const steps = page?.processSteps?.length ? page.processSteps : defaultSteps;

    const placeholderGalleryItems = [
        {
            _key: '1',
            image: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg',
            title: 'Concept & Styling',
            caption: 'We start by mood-boarding your vision to ensure every detail aligns with your brand.'
        },
        {
            _key: '2',
            image: 'https://images.pexels.com/photos/1540977/pexels-photo-1540977.jpeg',
            title: 'On-Location Shoot',
            caption: 'Finding the perfect light and angles to capture authentic moments.'
        },
        {
            _key: '3',
            image: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg',
            title: 'Creative Direction',
            caption: 'hands-on guidance with posing, movement, and energy throughout the session.'
        },
        {
            _key: '4',
            image: 'https://images.pexels.com/photos/256658/pexels-photo-256658.jpeg',
            title: 'Editing & Retouching',
            caption: 'Meticulous color grading and skin retouching for a polished, high-end look.'
        },
        {
            _key: '5',
            image: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
            title: 'The Final Gallery',
            caption: 'Delivered in an easy-to-share online gallery, ready for download and print.'
        }
    ];

    // Fallbacks
    const heroHeading = page?.heroHeading || "Simple, Transparent Pricing";
    const heroSubhead = page?.heroSubhead || "Choose the perfect package for your needs. No hidden fees, just beautiful results.";
    const heroTrustText = page?.heroTrustText || "Trusted by 100+ clients across California";

    return (
        <main className="bg-brand-50 dark:bg-brand-950 min-h-screen">
            <ServicesHero
                heading={heroHeading}
                subhead={heroSubhead}
                trustText={heroTrustText}
            />
            <PricingCards packages={packages} />
            <ComparisonTable packages={packages} />
            <ProcessSection steps={steps} />
            <section className="py-16 bg-white dark:bg-brand-900 overflow-hidden">
                <ProcessGallery items={page?.processGallery || placeholderGalleryItems} />
            </section>
            {page?.faqs && page.faqs.length > 0 && <FAQAccordion faqs={page.faqs} />}
            <FinalCTA heading={page?.finalCtaHeading} text={page?.finalCtaText} />
        </main>
    );
}

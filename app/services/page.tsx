import { sanityFetch } from "@/sanity/lib/client";
import { SERVICES_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Check, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface ServicePackage {
    _id: string;
    name: string;
    tagline?: string;
    price: string;
    priceNote?: string;
    features: string[];
    popular?: boolean;
    ctaText: string;
    ctaLink: string;
}

interface ProcessStep {
    title: string;
    description: string;
}

interface FAQ {
    question: string;
    answer: string;
}

interface ServicesPageData {
    page: {
        heroHeading?: string;
        heroSubhead?: string;
        heroTrustText?: string;
        processSteps?: ProcessStep[];
        faqs?: FAQ[];
        seo?: {
            title?: string;
            description?: string;
        };
    };
    packages: ServicePackage[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────

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
            ctaLink: "/contact"
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
            ctaLink: "/contact"
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
            ctaLink: "/contact"
        }
    ];

    const packages = fetchedPackages && fetchedPackages.length > 0 ? fetchedPackages : placeholderPackages;

    // Fallbacks
    const heroHeading = page?.heroHeading || "Simple, Transparent Pricing";
    const heroSubhead = page?.heroSubhead || "Choose the perfect package for your needs. No hidden fees, just beautiful results.";
    const heroTrustText = page?.heroTrustText || "Trusted by 100+ clients across California";

    const defaultSteps = [
        { title: "Inquiry", description: "Fill out the contact form and tell me about your vision." },
        { title: "Consultation", description: "We'll hop on a call to discuss details and secure your date." },
        { title: "The Session", description: "We create magic together! I guide you through poses and lighting." },
        { title: "Delivery", description: "Receive your professionally edited gallery within 2 weeks." },
    ];
    const steps = page?.processSteps?.length ? page.processSteps : defaultSteps;

    return (
        <main className="bg-stone-50 dark:bg-stone-950 min-h-screen">

            {/* ──────────────────────────────────────────────────────────────────
          Hero Section
      ────────────────────────────────────────────────────────────────── */}
            <section className="relative -mt-16 md:-mt-24 pt-32 pb-32 md:pt-48 md:pb-40 bg-stone-950 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-800/40 via-stone-950/0 to-transparent"></div>
                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/50 border border-stone-800 text-stone-400 text-xs uppercase tracking-widest mb-6">
                        <ShieldCheck className="w-3 h-3" /> {heroTrustText}
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight">
                        {heroHeading}
                    </h1>
                    <p className="text-lg md:text-xl text-stone-400 max-w-2xl mx-auto font-light leading-relaxed">
                        {heroSubhead}
                    </p>
                </div>
            </section>

            {/* ──────────────────────────────────────────────────────────────────
          Pricing Cards
      ────────────────────────────────────────────────────────────────── */}
            <section className="-mt-16 pb-24 relative z-20 px-4">
                <div className="container mx-auto max-w-[1400px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {packages.map((pkg) => (
                            <div
                                key={pkg._id}
                                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${pkg.popular
                                    ? 'bg-white dark:bg-stone-900 border-orange-500/50 shadow-orange-500/10 shadow-lg'
                                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-sm'
                                    }`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">{pkg.name}</h3>
                                    {pkg.tagline && <p className="text-sm text-stone-500 dark:text-stone-400">{pkg.tagline}</p>}
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-stone-900 dark:text-white">{pkg.price}</span>
                                        {pkg.priceNote && <span className="text-sm text-stone-500 font-medium">{pkg.priceNote}</span>}
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {pkg.features?.map((feature: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-stone-600 dark:text-stone-300">
                                            <Check className="w-5 h-5 text-orange-500 shrink-0" />
                                            <span className="leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={pkg.ctaLink || '/contact'}
                                    className={`w-full py-3 px-6 rounded-xl font-bold text-center transition-colors ${pkg.popular
                                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md'
                                        : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white hover:bg-stone-200 dark:hover:bg-stone-700'
                                        }`}
                                >
                                    {pkg.ctaText || 'Book Now'}
                                </Link>
                            </div>
                        ))}

                        {/* Custom Quote Card if fewer than 4 packages */}
                        {packages.length < 4 && (
                            <div className="flex flex-col p-8 rounded-3xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50 flex items-center justify-center text-center">
                                <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">Custom Project?</h3>
                                <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Need something specific? Let's create a custom package just for you.</p>
                                <Link href="/contact" className="text-orange-600 font-bold hover:underline underline-offset-4 decoration-2">
                                    Get a Custom Quote →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ──────────────────────────────────────────────────────────────────
          Process Section
      ────────────────────────────────────────────────────────────────── */}
            <section className="py-20 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold font-display mb-4">How It Works</h2>
                        <p className="text-stone-500">Simple, stress-free, and fun.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden lg:block absolute top-6 left-1/2 -translate-x-1/2 w-[80%] h-0.5 bg-stone-100 dark:bg-stone-800 -z-0"></div>

                        {steps.map((step: ProcessStep, i: number) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center font-bold text-lg mb-6 shadow-xl">
                                    {i + 1}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                                <p className="text-sm text-stone-500 leading-relaxed max-w-[200px]">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──────────────────────────────────────────────────────────────────
          FAQ Section
      ────────────────────────────────────────────────────────────────── */}
            {page?.faqs && page.faqs.length > 0 && (
                <section className="py-24 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold font-display mb-4">Frequently Asked Questions</h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {page.faqs.map((faq: FAQ, i: number) => (
                                <AccordionItem key={i} value={`item-${i}`} className="bg-white dark:bg-stone-900 px-6 rounded-2xl border border-stone-100 dark:border-stone-800 data-[state=open]:border-orange-200 dark:data-[state=open]:border-orange-900/30">
                                    <AccordionTrigger className="hover:no-underline py-6 font-medium text-left">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="text-stone-500 dark:text-stone-400 pb-6 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>
            )}

            {/* ──────────────────────────────────────────────────────────────────
          Final CTA
      ────────────────────────────────────────────────────────────────── */}
            <section className="py-24 bg-stone-900 text-white text-center">
                <div className="container mx-auto px-6 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                        {page?.heroHeading ? "Still have questions?" : "Ready to create something beautiful?"}
                    </h2>
                    <p className="text-stone-400 mb-8 text-lg">
                        Let's chat about your vision and see if we're a good fit. No pressure, just a conversation.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
                    >
                        Book a Session <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

        </main>
    );
}

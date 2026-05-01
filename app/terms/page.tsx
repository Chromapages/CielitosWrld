import { Metadata } from 'next';
import Script from 'next/script';
import { LegalPageLayout } from '@/components/ui/LegalPageLayout';

export const metadata: Metadata = {
    title: 'Terms of Service - Cielito\'s World',
    description: 'Read the terms and conditions for using the Cielito\'s World website and services. Information on booking, payments, and image licensing.',
    alternates: {
        canonical: 'https://cielitoswrld.com/terms',
    },
    openGraph: {
        title: 'Terms of Service | Cielito\'s World',
        description: 'Terms and conditions for using the Cielito\'s World website and services.',
        url: 'https://cielitoswrld.com/terms',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Terms of Service | Cielito\'s World',
        description: 'Conditions for our services and website use.',
    },
};

const toc = [
    { id: 'acceptance', label: '1. Acceptance of Terms' },
    { id: 'intellectual-property', label: '2. Intellectual Property Rights' },
    { id: 'booking', label: '3. Booking and Payments' },
    { id: 'image-use', label: '4. Image Use and Licensing' },
    { id: 'liability', label: '5. Limitation of Liability' },
    { id: 'governing-law', label: '6. Governing Law' },
];

export default function TermsPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Terms of Service - Cielito\'s World',
        description: 'Terms and conditions for using the Cielito\'s World website and services.',
        url: 'https://cielitoswrld.com/terms',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://cielitoswrld.com/terms',
        },
    };

    return (
        <>
            <Script
                id="terms-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <LegalPageLayout title="Terms of Service" lastUpdated="February 13, 2026" toc={toc}>
                <section id="acceptance" className="mb-24">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using <strong>Cielito's World</strong>, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                    </p>
                </section>

                <section id="intellectual-property" className="mb-24">
                    <h2>2. Intellectual Property Rights</h2>
                    <p>
                        Unless otherwise stated, Cielito's World and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this from Cielito's World for your own personal use subjected to restrictions set in these terms and conditions.
                    </p>
                    <p><strong>You must not:</strong></p>
                    <ul>
                        <li>Republish material from Cielito's World</li>
                        <li>Sell, rent or sub-license material from Cielito's World</li>
                        <li>Reproduce, duplicate or copy material from Cielito's World</li>
                        <li>Redistribute content from Cielito's World</li>
                    </ul>
                </section>

                <section id="booking" className="mb-24">
                    <h2>3. Booking and Payments</h2>
                    <p>
                        For photography and creative services booked through this website:
                    </p>
                    <ul>
                        <li>A non-refundable retainer may be required to secure your booking date.</li>
                        <li>Full payment is typically due on or before the date of the session, unless otherwise agreed in writing.</li>
                        <li>Cancellations or rescheduling must be communicated at least 48 hours in advance to avoid additional fees.</li>
                    </ul>
                </section>

                <section id="image-use" className="mb-24">
                    <h2>4. Image Use and Licensing</h2>
                    <p>
                        Upon full payment, clients are typically granted a personal use license for the delivered images. Commercial use, major alterations, or third-party transfers require explicit written consent and may involve additional licensing fees.
                    </p>
                </section>

                <section id="liability" className="mb-24">
                    <h2>5. Limitation of Liability</h2>
                    <p>
                        In no event shall Cielito's World, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. Cielito's World, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.
                    </p>
                </section>

                <section id="governing-law" className="mb-24">
                    <h2>6. Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of the State of California and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                </section>
            </LegalPageLayout>
        </>
    );
}

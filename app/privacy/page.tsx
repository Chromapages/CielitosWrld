import { Metadata } from 'next';
import Script from 'next/script';
import { LegalPageLayout } from '@/components/ui/LegalPageLayout';

export const metadata: Metadata = {
    title: 'Privacy Policy - Cielito\'s World',
    description: 'Learn how Cielito\'s World collects, uses, and protects your personal data. Our commitment to your privacy and data security.',
    alternates: {
        canonical: 'https://cielitosworld.com/privacy',
    },
    openGraph: {
        title: 'Privacy Policy | Cielito\'s World',
        description: 'Our commitment to protecting your personal data and privacy.',
        url: 'https://cielitosworld.com/privacy',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Privacy Policy | Cielito\'s World',
        description: 'Learn how we protect your information.',
    },
};

const toc = [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'data-we-collect', label: '2. Data We Collect' },
    { id: 'how-we-use', label: '3. How We Use Your Data' },
    { id: 'data-security', label: '4. Data Security' },
    { id: 'your-rights', label: '5. Your Legal Rights' },
    { id: 'third-party', label: '6. Third-Party Links' },
];

export default function PrivacyPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy - Cielito\'s World',
        description: 'Privacy Policy detailing data collection and protection practices.',
        url: 'https://cielitosworld.com/privacy',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://cielitosworld.com/privacy',
        },
    };

    return (
        <>
            <Script
                id="privacy-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <LegalPageLayout title="Privacy Policy" lastUpdated="February 13, 2026" toc={toc}>
                <section id="introduction" className="mb-24">
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to <strong>Cielito's World</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                    </p>
                </section>

                <section id="data-we-collect" className="mb-24">
                    <h2>2. Data We Collect</h2>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                    </p>
                    <ul>
                        <li><strong>Identity Data:</strong> first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> email address and telephone numbers.</li>
                        <li><strong>Technical Data:</strong> internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                        <li><strong>Usage Data:</strong> information about how you use our website, products and services.</li>
                    </ul>
                </section>

                <section id="how-we-use" className="mb-24">
                    <h2>3. How We Use Your Data</h2>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul>
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal obligation.</li>
                    </ul>
                </section>

                <section id="data-security" className="mb-24">
                    <h2>4. Data Security</h2>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>
                </section>

                <section id="your-rights" className="mb-24">
                    <h2>5. Your Legal Rights</h2>
                    <p>
                        Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
                    </p>
                </section>

                <section id="third-party" className="mb-24">
                    <h2>6. Third-Party Links</h2>
                    <p>
                        This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
                    </p>
                </section>
            </LegalPageLayout>
        </>
    );
}

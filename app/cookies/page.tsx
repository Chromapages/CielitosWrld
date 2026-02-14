import { Metadata } from 'next';
import Script from 'next/script';
import { LegalPageLayout } from '@/components/ui/LegalPageLayout';

export const metadata: Metadata = {
    title: 'Cookie Policy - Cielito\'s World',
    description: 'Understand how Cielito\'s World uses cookies and similar technologies. Manage your preferences and learn about our data tracking policies.',
    alternates: {
        canonical: 'https://cielitosworld.com/cookies',
    },
    openGraph: {
        title: 'Cookie Policy | Cielito\'s World',
        description: 'Information about how we use cookies and similar technologies.',
        url: 'https://cielitosworld.com/cookies',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Cookie Policy | Cielito\'s World',
        description: 'Manage your cookie preferences.',
    },
};

const toc = [
    { id: 'what-are-cookies', label: '1. What are Cookies?' },
    { id: 'how-we-use', label: '2. How We Use Cookies' },
    { id: 'third-party', label: '3. Third-Party Cookies' },
    { id: 'managing', label: '4. Managing Cookies' },
    { id: 'more-info', label: '5. More Information' },
];

export default function CookiesPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Cookie Policy - Cielito\'s World',
        description: 'Cookie Policy detailing cookie usage and user preferences.',
        url: 'https://cielitosworld.com/cookies',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://cielitosworld.com/cookies',
        },
    };

    return (
        <>
            <Script
                id="cookies-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <LegalPageLayout title="Cookie Policy" lastUpdated="February 13, 2026" toc={toc}>
                <section id="what-are-cookies" className="mb-24">
                    <h2>1. What are Cookies?</h2>
                    <p>
                        Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                    </p>
                </section>

                <section id="how-we-use" className="mb-24">
                    <h2>2. How We Use Cookies</h2>
                    <p>
                        We use cookies for the following purposes:
                    </p>
                    <ul>
                        <li><strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.</li>
                        <li><strong>Performance and Analytics Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.</li>
                        <li><strong>Functional Cookies:</strong> These enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.</li>
                    </ul>
                </section>

                <section id="third-party" className="mb-24">
                    <h2>3. Third-Party Cookies</h2>
                    <p>
                        In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
                    </p>
                    <ul>
                        <li>This site uses <strong>Google Analytics</strong> which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit.</li>
                        <li>We also use <strong>Sanity.io</strong> for content management, which may set functional cookies to ensure the proper delivery of visual assets and content.</li>
                    </ul>
                </section>

                <section id="managing" className="mb-24">
                    <h2>4. Managing Cookies</h2>
                    <p>
                        You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site.
                    </p>
                </section>

                <section id="more-info" className="mb-24">
                    <h2>5. More Information</h2>
                    <p>
                        Hopefully that has clarified things for you. As was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
                    </p>
                </section>
            </LegalPageLayout>
        </>
    );
}

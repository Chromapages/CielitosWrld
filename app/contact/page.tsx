import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { CONTACT_PAGE_QUERY } from '@/sanity/lib/queries';
import ContactStage from '@/components/contact/ContactStage';

export const metadata: Metadata = {
  title: 'Contact - Cielito\'s World',
  description: 'Start your creative project. Book photography sessions for events, portraits, or brand collaborations.',
};

export const revalidate = 60;

export default async function Contact() {
  // In the future, we can fetch background images or wizard options from Sanity here
  // and pass them as props to ContactStage.

  const data = await client.fetch(CONTACT_PAGE_QUERY).catch(() => ({}));

  return (
    <div className="-mt-16 md:-mt-24">
      <ContactStage
        title={data?.title}
        introText={data?.introText}
        socialLinks={data?.socialLinks}
        email={data?.email}
        location={data?.location}
        studioLabel={data?.studioLabel}
        emailLabel={data?.emailLabel}
        followMeLabel={data?.followMeLabel}
        pageBackground={data?.pageBackground}
      />
    </div>
  );
}

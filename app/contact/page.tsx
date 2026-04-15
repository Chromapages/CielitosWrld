import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { CONTACT_PAGE_QUERY } from '@/sanity/lib/queries';
import ContactStage from '@/components/contact/ContactStage';

export const metadata: Metadata = {
  title: 'Contact - Cielito\'s World',
  description: 'Start your creative project. Book photography sessions for events, portraits, or brand collaborations.',
};

export const revalidate = 60;

import { MobilePageShell } from '@/components/layout/MobilePageShell';

export default async function Contact() {
  const data = await client.fetch(CONTACT_PAGE_QUERY).catch(() => ({}));

  return (
    <MobilePageShell immersive={true}>
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
    </MobilePageShell>
  );
}

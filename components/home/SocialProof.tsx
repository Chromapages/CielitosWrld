'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface CollaborationItem {
  name: string;
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
}

interface SocialProofProps {
  data?: {
    title?: string;
    backgroundImage?: any;
    logos?: CollaborationItem[];
  };
}

export default function SocialProof({ data }: SocialProofProps) {

  // Display data
  const displayData = {
    heading: data?.title || 'Collaborations',
    items: data?.logos || []
  };

  // Don't render section if no logos
  if (displayData.items.length === 0) return null;

  return (
    <section aria-labelledby="collaborations-title" className="relative py-6 md:py-8 px-4 bg-neutral-200 dark:bg-stone-900 border-t border-neutral-300 dark:border-stone-800">
      {/* Optional Background Image */}
      {data?.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(data.backgroundImage).url()}
            alt="Background"
            fill
            className="object-cover opacity-50"
            placeholder={data.backgroundImage.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={data.backgroundImage.metadata?.lqip}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-200/80 via-neutral-200/50 to-neutral-200/80 dark:from-stone-900/80 dark:via-stone-900/50 dark:to-stone-900/80" />
        </div>
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        <h2
          id="collaborations-title"
          className="text-center text-xl md:text-2xl font-pattaya tracking-tight text-neutral-800 dark:text-stone-200 mb-6"
        >
          {displayData.heading}
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {displayData.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-2 opacity-80 grayscale dark:brightness-0 dark:invert"
            >
              {item.asset?.url ? (
                <div className="relative h-12 w-32 md:h-16 md:w-40">
                  <Image
                    src={item.asset.url.startsWith('/') ? item.asset.url : urlFor(item.asset).url()}
                    alt={item.alt || item.name || 'Partner Logo'}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-fitzgerald-italic text-[#371d13] dark:text-stone-400 text-lg">Partner</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

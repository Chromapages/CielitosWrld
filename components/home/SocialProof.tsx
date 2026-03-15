'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { urlFor, sanityLoader } from '@/sanity/lib/image';

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
    <section aria-labelledby="collaborations-title" className="relative py-12 md:py-16 px-4 bg-neutral-200 dark:bg-stone-900 border-t border-neutral-300 dark:border-stone-800">
      {/* Optional Background Image */}
      {data?.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            loader={sanityLoader}
            src={data.backgroundImage?.asset?.url || urlFor(data.backgroundImage).url()}
            alt="Abstract texture background"
            fill
            className="object-cover opacity-50"
            placeholder={data.backgroundImage?.asset?.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={data.backgroundImage?.asset?.metadata?.lqip}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-200/80 via-neutral-200/50 to-neutral-200/80 dark:from-stone-900/80 dark:via-stone-900/50 dark:to-stone-900/80" />
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logos-marquee {
          animation: marquee 18s linear infinite;
        }
        .logos-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-5xl mx-auto relative z-10">
        <h2
          id="collaborations-title"
          className="text-center text-xl md:text-2xl font-pattaya tracking-tight text-neutral-800 dark:text-stone-200 mb-10"
        >
          {displayData.heading}
        </h2>

        {/* Mobile: auto-scrolling marquee */}
        <div className="md:hidden overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-neutral-200 dark:from-stone-900 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-l from-neutral-200 dark:from-stone-900 to-transparent pointer-events-none" />
          <div className="logos-marquee flex w-max items-center gap-10">
            {[...displayData.items, ...displayData.items].map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center opacity-80 grayscale dark:brightness-0 dark:invert transition-all duration-300"
              >
                {item.asset?.url ? (
                  <div className="relative h-10 w-28">
                    <Image
                      loader={sanityLoader}
                      src={item.asset.url || urlFor(item.asset).url()}
                      alt={item.alt || item.name || 'Partner Logo'}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <p className="font-fitzgerald-italic text-[#371d13] dark:text-stone-400 text-lg">{item.name}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: wrapped flex grid */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-12 lg:gap-16">
          {displayData.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-2 opacity-80 hover:opacity-100 grayscale hover:grayscale-0 dark:brightness-0 dark:invert dark:hover:invert-0 dark:hover:brightness-100 transition-all duration-300"
            >
              {item.asset?.url ? (
                <div className="relative h-16 w-40">
                  <Image
                    loader={sanityLoader}
                    src={item.asset.url || urlFor(item.asset).url()}
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

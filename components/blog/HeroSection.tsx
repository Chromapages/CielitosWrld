'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { Calendar, Clock, User } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  coverImage?: any;
  category?: string;
  formattedDate: string;
  author?: string;
}

export function HeroSection({
  title,
  coverImage,
  category,
  formattedDate,
  author
}: HeroSectionProps) {
  if (!coverImage) {
    return (
      <header className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-zinc-100 to-[#FAFAFA] dark:from-zinc-900 dark:to-stone-950">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {category && (
              <Link
                href={`/blog/category/${category.toLowerCase()}`}
                className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#EC4899] bg-[#EC4899]/10 rounded-full mb-6 hover:bg-[#EC4899]/20 transition-colors"
              >
                {category}
              </Link>
            )}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-[1.1] mb-8">
              {title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time className="text-sm">{formattedDate}</time>
              </div>
              {author && (
                <>
                  <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700" />
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{author}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <section className="relative h-[60vh] md:h-[70vh] min-h-[400px] max-h-[800px] overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <Image
          src={urlFor(coverImage).width(1920).height(1080).url()}
          alt={coverImage.alt || title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ objectPosition: 'center 30%' }}
          placeholder={coverImage?.asset?.metadata?.lqip ? 'blur' : 'empty'}
          blurDataURL={coverImage?.asset?.metadata?.lqip}
        />
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
      </div>
    </section>
  );
}

export default HeroSection;

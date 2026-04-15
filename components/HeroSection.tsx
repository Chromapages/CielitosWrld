import Link from 'next/link';

import HeroMedia from '@/components/hero/HeroMedia';
import type { HomeHero, SanityImageWithAsset } from '@/lib/types';
import { urlFor } from '@/sanity/lib/image';

interface HeroSectionProps {
  className?: string;
  data?: HomeHero;
}

interface ResolvedPoster {
  url: string;
  srcSet: string;
  lqip?: string;
}

const DESKTOP_WIDTHS = [1280, 1600];
const MOBILE_WIDTHS = [640, 900];

function getOriginalAssetUrl(asset?: SanityImageWithAsset) {
  return asset?.asset?.url || null;
}

function getPosterUrl(asset: SanityImageWithAsset | undefined, width: number) {
  if (!asset) {
    return null;
  }

  try {
    return urlFor(asset).width(width).fit('max').auto('format').quality(72).url();
  } catch {
    return getOriginalAssetUrl(asset);
  }
}

function getPosterSourceSet(asset: SanityImageWithAsset | undefined, widths: number[]) {
  if (!asset) {
    return '';
  }

  return widths
    .map((width) => {
      const url = getPosterUrl(asset, width);
      return url ? `${url} ${width}w` : null;
    })
    .filter((value): value is string => Boolean(value))
    .join(', ');
}

function resolvePoster(
  primary: SanityImageWithAsset | undefined,
  fallback: SanityImageWithAsset | undefined,
  widths: number[],
) {
  const asset = primary || fallback;
  const url = getPosterUrl(asset, widths[widths.length - 1]);

  if (!asset || !url) {
    return null;
  }

  return {
    url,
    srcSet: getPosterSourceSet(asset, widths),
    lqip: asset.asset?.metadata?.lqip,
  } satisfies ResolvedPoster;
}

export default function HeroSection({ data, className }: HeroSectionProps) {
  const title = data?.title || "Cielito's Wrld";
  const subtitle = data?.subtitle || 'Visual stories & late night thoughts.';
  const ctaText = data?.ctaText || 'View Gallery';
  const ctaLink = data?.ctaLink || '/gallery';
  const secondaryCtaText = data?.secondaryCtaText || 'Read My Blog';
  const secondaryCtaLink = data?.secondaryCtaLink || '/blog';

  const desktopPoster = resolvePoster(data?.backgroundPosterImage, data?.backgroundImage, DESKTOP_WIDTHS);
  
  // Mobile poster fallback order: mobilePoster -> mobileBG -> desktopPoster -> desktopBG
  const mobilePoster = resolvePoster(
    data?.mobileBackgroundPosterImage,
    data?.mobileBackgroundImage || data?.backgroundPosterImage || data?.backgroundImage,
    MOBILE_WIDTHS,
  );
  
  const mediaAlt = data?.backgroundMediaAlt?.trim() || '';

  return (
    <section
      className={`relative min-h-[100svh] md:min-h-[min(92svh,900px)] w-full overflow-hidden ${className || ''}`}
    >
      {/* Media Layer */}
      <div className="absolute inset-0 select-none pointer-events-none">
        {/* LCP Poster Branch */}
        {(desktopPoster || mobilePoster) && (
          <picture>
            {mobilePoster && (
              <source
                media="(max-width: 767px)"
                sizes="100vw"
                srcSet={mobilePoster.srcSet || mobilePoster.url}
              />
            )}
            {desktopPoster && (
              <source
                media="(min-width: 768px)"
                sizes="100vw"
                srcSet={desktopPoster.srcSet || desktopPoster.url}
              />
            )}
            <img
              alt={mediaAlt}
              className="absolute inset-0 h-full w-full object-cover"
              decoding="async"
              fetchPriority="high"
              src={desktopPoster?.url || mobilePoster?.url || ''}
              loading="eager"
              suppressHydrationWarning
            />
          </picture>
        )}

        {/* Video Layer (Client Side) */}
        <HeroMedia
          desktopVideoUrl={data?.backgroundVideoUrl}
          mobileVideoUrl={data?.mobileBackgroundVideoUrl}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-[#2c3325]/40" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-end px-4 pb-[calc(var(--mobile-nav-height,64px)+var(--safe-area-bottom,0px)+3rem)] pt-[calc(var(--mobile-header-height,64px)+var(--safe-area-top,0px)+4rem)] text-center text-white md:min-h-[min(92svh,900px)] md:justify-center md:px-6 md:pb-16 md:pt-24">
        <div className="w-full max-w-sm md:max-w-3xl">
          <h1 className="mb-4 font-pattaya text-[clamp(3.5rem,15vw,5rem)] italic leading-[0.9] drop-shadow-2xl md:mb-6 md:text-[clamp(5rem,9vw,8rem)]">
            {title}
          </h1>

          <p className="mx-auto mb-8 max-w-[28ch] px-2 font-inter text-base font-medium leading-relaxed text-white/95 md:mb-12 md:max-w-[36ch] md:px-0 md:text-xl lg:text-2xl">
            {subtitle}
          </p>

          <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-center md:gap-6">
            <Link
              href={ctaLink}
              className="btn-press inline-flex w-full max-w-xs items-center justify-center rounded-xl bg-orange-600 px-8 py-4 text-sm font-bold tracking-wide text-white shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 md:w-auto md:px-10 md:py-5 md:text-base"
            >
              {ctaText}
            </Link>
            <Link
              href={secondaryCtaLink}
              className="btn-press inline-flex w-full max-w-xs items-center justify-center rounded-xl border-2 border-white/80 bg-white/5 px-8 py-4 text-sm font-bold tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 md:w-auto md:px-10 md:py-5 md:text-base"
            >
              {secondaryCtaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

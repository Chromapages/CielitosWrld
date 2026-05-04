'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { MobileSection } from '../layout/MobileSection';

interface ContactCTAProps {
  data?: {
    title?: string;
    text?: string;
    buttonText?: string;
    buttonLink?: string;
    email?: string;
  };
}

export default function ContactCTA({ data }: ContactCTAProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const title = data?.title || "Ready to Get Started?";
  const text = data?.text || "Let's collaborate on your next project. Whether you're looking for portrait photography, event coverage, or creative direction – I'm here to bring your vision to life.";
  const buttonText = data?.buttonText || "Contact Now";
  const buttonLink = data?.buttonLink || "/contact";
  const email = data?.email || 'Abajo.Del.Cieloo@gmail.com';

  return (
    <MobileSection className="relative z-10 overflow-hidden py-10 text-white md:py-12" hasGutter={false}>
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/contact/bg_cta.png)' }}
        suppressHydrationWarning
      >
        {/* Primary Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Depth & Focus Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center md:flex-row md:justify-between md:text-left">
        {/* Left Side: Content */}
        <div className="flex-1">
          <span className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">
            Photography Services
          </span>
          <h2 className="font-pattaya text-3xl italic leading-tight tracking-tight text-[#f8f3e9] md:text-4xl">
            {title}
          </h2>
          <p className="font-inter mt-2 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
            {text}
          </p>
        </div>

        {/* Right Side: Actions */}
        <div className="flex flex-col items-center gap-4 md:items-end">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href={buttonLink}
              className="inline-flex items-center justify-center rounded-full bg-[#822c01] px-7 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-[#9d3501] active:scale-95"
              aria-label={`Navigate to ${buttonText}`}
            >
              {buttonText}
            </Link>

            <button
              onClick={() => copyToClipboard(email)}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm text-white/80 transition-all duration-200 hover:border-white/50 hover:text-white active:scale-95"
              aria-label="Click to copy email address"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate font-medium">{copied ? 'Copied!' : email}</span>
            </button>
          </div>

          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
            Usually responds within 24 hours
          </p>
        </div>
      </div>
    </MobileSection>
  );
}

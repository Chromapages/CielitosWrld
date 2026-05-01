'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, Mail } from 'lucide-react';
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

const FEATURES = [
  "Professional editing included",
  "Quick turnaround times",
  "Satisfaction guaranteed",
];

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
    <MobileSection className="relative overflow-hidden py-16 text-white lg:py-20 xl:py-24" hasGutter={false}>
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: 'url(/images/contact/bg_cta.png)' }}
        suppressHydrationWarning
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#822c01]/45 via-black/35 to-black/85" />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 xl:gap-20 items-center px-6 md:px-12 lg:px-16 max-w-6xl mx-auto w-full">
        {/* Left column */}
        <div className="space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#822c01]/60 backdrop-blur-sm rounded-full text-xs font-bold tracking-[0.2em] uppercase text-[#f8f3e9]">
            PHOTOGRAPHY SERVICES
          </div>

          <h2 className="font-pattaya text-4xl md:text-5xl lg:text-6xl italic text-[#f8f3e9] leading-tight">
            {title}
          </h2>

          <div className="w-20 h-1 bg-[#822c01] rounded-full" />

          <p className="font-inter text-lg text-[#f8f3e9]/80 max-w-md leading-relaxed font-light">
            {text}
          </p>

          <ul className="space-y-3 font-inter text-sm">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center group">
                <div className="w-6 h-6 rounded-full bg-[#822c01]/30 flex items-center justify-center mr-3 group-hover:bg-[#822c01]/50 transition-colors">
                  <Check className="w-3.5 h-3.5 text-[#f8f3e9]" />
                </div>
                <span className="text-[#f8f3e9]/90 font-medium tracking-wide">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div className="bg-[#1a1e14]/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl xl:max-w-md xl:ml-auto w-full">
          <h3 className="font-pattaya text-2xl mb-6 text-center text-white">Get In Touch</h3>

          <button
            className="flex w-full items-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#822c01]/50 transition-all group relative overflow-hidden"
            onClick={() => copyToClipboard(email)}
            aria-label="Click to copy email address"
          >
            <div className="w-10 h-10 rounded-xl bg-[#822c01]/20 flex items-center justify-center mr-4 group-hover:bg-[#822c01]/30 transition-colors">
              <Mail className="w-5 h-5 text-[#822c01]" />
            </div>
            <span className="text-sm text-white/90 font-bold truncate">{email}</span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#822c01] group-hover:opacity-100 opacity-0 transition-opacity uppercase tracking-widest">
              {copied ? 'COPIED!' : 'COPY'}
            </span>
          </button>

          <div className="mt-6">
            <Link
              href={buttonLink}
              className="btn-press block w-full text-center bg-[#822c01] hover:bg-[#9d3501] text-white font-bold text-lg py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg active:scale-95"
            >
              {buttonText}
            </Link>
            <p className="text-xs text-center mt-4 text-white/40 tracking-[0.2em] uppercase font-bold">Usually responds within 24 hours</p>
          </div>
        </div>
      </div>
    </MobileSection>
  );
}

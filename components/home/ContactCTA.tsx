'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: 'email') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const title = data?.title || "Ready to Get Started?";
  const text = data?.text || "Let's collaborate on your next project. Whether you're looking for portrait photography, event coverage, or creative direction – I'm here to bring your vision to life.";
  const buttonText = data?.buttonText || "Contact Now";
  const buttonLink = data?.buttonLink || "/contact";

  return (
    <MobileSection className="relative overflow-hidden text-white" hasGutter={false}>
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-105"
        style={{
          backgroundImage: 'url(/images/contact/bg_cta.png)',
        }}
        suppressHydrationWarning
      >
        {/* Sage green overlay */}
        <div className="absolute inset-0 bg-[#2c3325]/85 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-[var(--mobile-gutter)] md:px-0">
        {/* Left column: Text content */}
        <div className="space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#822c01] bg-opacity-60 backdrop-blur-sm rounded-full text-xs font-bold tracking-[0.2em] uppercase text-[#f8f3e9]">
            PHOTOGRAPHY SERVICES
          </div>

          <h2 className="font-pattaya text-4xl md:text-5xl italic text-[#f8f3e9] leading-tight">
            {title}
          </h2>

          <div className="w-20 h-1 bg-[#822c01] rounded-full"></div>

          <p className="font-inter text-lg text-[#f8f3e9]/80 max-w-md leading-relaxed font-light">
            {text}
          </p>

          <ul className="space-y-3 font-inter text-sm">
            {[
              "Professional editing included",
              "Quick turnaround times",
              "Satisfaction guaranteed"
            ].map((feature, i) => (
              <li key={i} className="flex items-center group">
                <div className="w-6 h-6 rounded-full bg-[#822c01]/30 flex items-center justify-center mr-3 group-hover:bg-[#822c01]/50 transition-colors">
                  <svg className="w-3.5 h-3.5 text-[#f8f3e9]" fill="currentColor" viewBox="0 0 20 20" suppressHydrationWarning><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </div>
                <span className="text-[#f8f3e9]/90 font-medium tracking-wide">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column: CTA card */}
        <div className="bg-[#1a1e14]/80 backdrop-blur-md p-6 rounded-[18px] border border-white/10 shadow-2xl">
          <h3 className="font-pattaya text-2xl mb-6 text-center text-white">Get In Touch</h3>

          <div className="space-y-4">
            <button
              className="flex w-full items-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#822c01]/50 cursor-pointer transition-all group relative overflow-hidden"
              onClick={() => copyToClipboard(data?.email || 'Abajo.Del.Cieloo@gmail.com', 'email')}
              aria-label="Click to copy email address"
            >
              <div className="w-10 h-10 rounded-xl bg-[#822c01]/20 flex items-center justify-center mr-4 group-hover:bg-[#822c01]/30 transition-colors">
                <svg className="w-5 h-5 text-[#822c01]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" suppressHydrationWarning>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <span className="text-sm text-white/90 font-bold truncate max-w-[150px] sm:max-w-none">{data?.email || 'Abajo.Del.Cieloo@gmail.com'}</span>
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-bold text-[#822c01] group-hover:opacity-100 opacity-0 transition-opacity uppercase tracking-widest">
                {copied === 'email' ? 'COPIED!' : 'COPY'}
              </span>
            </button>
          </div>

          <div className="mt-6">
            <Link
              href={buttonLink}
              className="btn-press block w-full text-center bg-[#822c01] hover:bg-[#9d3501] text-white font-bold text-lg py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg transform active:scale-95"
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
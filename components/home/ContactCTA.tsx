'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface ContactCTAProps {
  data?: {
    title?: string;
    text?: string;
    buttonText?: string;
    buttonLink?: string;
  };
}

export default function ContactCTA({ data }: ContactCTAProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
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
    <section className="py-16 px-4 relative overflow-hidden text-white">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(/images/contactsheets/CONTACT2.png)',
        }}
      >
        {/* Green overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2c3325] to-[#1a1e14] opacity-70"></div>
      </div>

      {/* Content container with 2-column layout */}
      <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left column: Text content */}
        <div className="space-y-5">
          <div className="inline-block px-3 py-1 bg-[#822c01] bg-opacity-60 rounded-full text-xs tracking-wider text-[#f8f3e9] mb-2">
            PHOTOGRAPHY SERVICES
          </div>

          <h2 className="font-fitzgerald-bold text-3xl md:text-4xl italic text-[#f8f3e9]">
            {title}
          </h2>

          <div className="w-16 h-1 bg-[#822c01]"></div>

          <p className="font-inter text-[#f8f3e9]/80 max-w-md">
            {text}
          </p>

          <ul className="space-y-2 font-inter text-sm">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#822c01]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              <span>Professional editing included</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#822c01]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              <span>Quick turnaround times</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#822c01]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              <span>Satisfaction guaranteed</span>
            </li>
          </ul>
        </div>

        {/* Right column: CTA card */}
        <div className="bg-[#1a1e14] p-6 rounded-lg border border-white/10 shadow-xl">
          <h3 className="font-pattaya text-xl mb-4 text-center text-white">Get In Touch Today</h3>

          <div className="space-y-3">
            <div
              className="flex items-center p-3 rounded-md bg-[#2c3325] border border-white/10 hover:bg-[#3a4230] cursor-pointer transition-colors group relative"
              onClick={() => copyToClipboard('Abajo.Del.Cieloo@gmail.com', 'email')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && copyToClipboard('Abajo.Del.Cieloo@gmail.com', 'email')}
              aria-label="Click to copy email address"
            >
              <svg className="w-5 h-5 mr-3 text-[#822c01]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span className="text-sm text-white">Abajo.Del.Cieloo@gmail.com</span>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[#f8f3e9]/70 group-hover:opacity-100 opacity-0 transition-opacity">
                {copied === 'email' ? 'Copied!' : 'Click to copy'}
              </span>
            </div>

            <div
              className="flex items-center p-3 rounded-md bg-[#2c3325] border border-white/10 hover:bg-[#3a4230] cursor-pointer transition-colors group relative"
              onClick={() => copyToClipboard('(951) 563-2759', 'phone')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && copyToClipboard('(951) 563-2759', 'phone')}
              aria-label="Click to copy phone number"
            >
              <svg className="w-5 h-5 mr-3 text-[#822c01]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span className="text-sm text-white">(951) 563-2759</span>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[#f8f3e9]/70 group-hover:opacity-100 opacity-0 transition-opacity">
                {copied === 'phone' ? 'Copied!' : 'Click to copy'}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={buttonLink}
              className="block w-full text-center bg-[#822c01] hover:bg-[#9d3501] text-white font-fitzgerald-bold py-3 px-6 rounded-md transition-all duration-300 shadow-[0_4px_14px_0_rgba(130,44,1,0.39)]"
            >
              {buttonText}
            </Link>
            <p className="text-xs text-center mt-3 text-white/60">Usually responds within 24 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
}
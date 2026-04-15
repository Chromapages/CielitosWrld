'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
    <section className="py-20 md:py-24 px-4 relative overflow-hidden text-white">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
        style={{
          backgroundImage: 'url(/images/contactsheets/CONTACT2.png)',
        }}
      >
        {/* Green overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2c3325] to-[#1a1e14] opacity-80"></div>
      </div>

      {/* Content container with 2-column layout */}
      <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left column: Text content */}
        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 bg-[#822c01] bg-opacity-60 backdrop-blur-sm rounded-full text-xs font-semibold tracking-wider text-[#f8f3e9]">
            PHOTOGRAPHY SERVICES
          </div>

          <h2 className="font-fitzgerald-bold text-4xl md:text-5xl italic text-[#f8f3e9] leading-tight">
            {title}
          </h2>

          <div className="w-20 h-1.5 bg-[#822c01]"></div>

          <p className="font-inter text-lg text-[#f8f3e9]/80 max-w-md leading-relaxed">
            {text}
          </p>

          <ul className="space-y-3 font-inter text-base">
            <li className="flex items-center group">
              <div className="w-6 h-6 rounded-full bg-[#822c01]/20 flex items-center justify-center mr-3 group-hover:bg-[#822c01]/40 transition-colors">
                <svg className="w-4 h-4 text-[#822c01]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              </div>
              <span className="text-[#f8f3e9]/90">Professional editing included</span>
            </li>
            <li className="flex items-center group">
              <div className="w-6 h-6 rounded-full bg-[#822c01]/20 flex items-center justify-center mr-3 group-hover:bg-[#822c01]/40 transition-colors">
                <svg className="w-4 h-4 text-[#822c01]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              </div>
              <span className="text-[#f8f3e9]/90">Quick turnaround times</span>
            </li>
            <li className="flex items-center group">
              <div className="w-6 h-6 rounded-full bg-[#822c01]/20 flex items-center justify-center mr-3 group-hover:bg-[#822c01]/40 transition-colors">
                <svg className="w-4 h-4 text-[#822c01]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              </div>
              <span className="text-[#f8f3e9]/90">Satisfaction guaranteed</span>
            </li>
          </ul>
        </div>

        {/* Right column: CTA card */}
        <div className="bg-[#1a1e14]/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
          <h3 className="font-pattaya text-2xl mb-6 text-center text-white">Get In Touch Today</h3>

          <div className="space-y-4">
            <div
              className="flex items-center p-4 rounded-xl bg-[#2c3325] border border-white/10 hover:border-[#822c01]/50 cursor-pointer transition-all group relative"
              onClick={() => copyToClipboard(data?.email || 'Abajo.Del.Cieloo@gmail.com', 'email')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && copyToClipboard(data?.email || 'Abajo.Del.Cieloo@gmail.com', 'email')}
              aria-label="Click to copy email address"
            >
              <div className="w-10 h-10 rounded-lg bg-[#822c01]/10 flex items-center justify-center mr-4 group-hover:bg-[#822c01]/20 transition-colors">
                <svg className="w-5 h-5 text-[#822c01]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <span className="text-base text-white/90 font-medium">{data?.email || 'Abajo.Del.Cieloo@gmail.com'}</span>
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-[#822c01] group-hover:opacity-100 opacity-0 transition-opacity">
                {copied === 'email' ? 'COPIED!' : 'COPY'}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={buttonLink}
              className="btn-press block w-full text-center bg-[#822c01] hover:bg-[#9d3501] text-white font-fitzgerald-bold text-lg py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_4px_14px_0_rgba(130,44,1,0.39)] hover:shadow-[0_6px_20px_0_rgba(130,44,1,0.5)] transform hover:-translate-y-1"
            >
              {buttonText}
            </Link>
            <p className="text-xs text-center mt-4 text-white/50 tracking-wide uppercase">Usually responds within 24 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
}
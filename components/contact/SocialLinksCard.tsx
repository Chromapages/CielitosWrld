"use client";

import React, { useEffect, useState, KeyboardEvent } from "react";
import { Instagram, AtSign } from "lucide-react";

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface SocialLinksCardProps { }

export function SocialLinksCard(_: SocialLinksCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  // Track breakpoint to disable collapsing on desktop
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = "matches" in e ? e.matches : (e as MediaQueryList).matches;
      setIsDesktop(matches);
      if (matches) setIsOpen(true); // ensure open on desktop
    };
    onChange(mq);
    mq.addEventListener?.("change", onChange as (e: MediaQueryListEvent) => void);
    return () => mq.removeEventListener?.("change", onChange as (e: MediaQueryListEvent) => void);
  }, []);

  // Define social links
  const socialLinks: SocialLink[] = [
    {
      href: "https://instagram.com/cielitosworld",
      icon: <Instagram className="w-6 h-6 md:w-6 md:h-6" />,
      label: "Follow on Instagram"
    },
    {
      href: "https://threads.net/cielitosworld",
      icon: <AtSign className="w-6 h-6 md:w-6 md:h-6" />,
      label: "Follow on Threads"
    }
  ];

  const isTwoIcons = socialLinks.length === 2;
  const isMultiIcons = socialLinks.length >= 3;

  return (
    <div
      className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 group hover:shadow-md transition-all duration-300"
      style={{ boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" }}
    >
      {/* Header: clickable on mobile only */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 text-left md:cursor-default md:pointer-events-none"
        aria-expanded={isOpen}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-center">
          <h3 className="text-xl font-bold text-stone-800">
            Connect
          </h3>
        </div>
      </button>

      {/* Content: collapsed by default on mobile, always visible on md+ */}
      <div
        className={`mt-6 grid transition-[grid-template-rows] duration-150 ease-in-out md:block ${!isDesktop && !isOpen ? 'mt-0' : ''}`}
        style={isDesktop ? undefined : { gridTemplateRows: isOpen ? '1fr' : '0fr', willChange: 'grid-template-rows' }}
        aria-hidden={isDesktop ? false : !isOpen}
      >
        <div className="overflow-hidden md:overflow-visible">
          {/* Social Links with responsive sizing */}
          <div className={`
            flex gap-4 mb-4
            ${isTwoIcons ? 'justify-center max-[767px]:gap-8' : ''}
            ${isMultiIcons ? 'flex-wrap max-[767px]:gap-3' : ''}
          `}>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`
                  flex items-center justify-center rounded-full transition-all duration-300 
                  hover:shadow-lg hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${index === 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white focus:ring-purple-500' : 'bg-black text-white focus:ring-gray-500'}
                  ${isTwoIcons ? 'w-12 h-12 max-[767px]:w-12 max-[767px]:h-12' : 'w-12 h-12'}
                  ${isMultiIcons ? 'max-[767px]:w-10 max-[767px]:h-10' : ''}
                `}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                tabIndex={0}
              >
                {React.cloneElement(link.icon as React.ReactElement<{ className?: string }>, {
                  className: `
                    ${isTwoIcons ? 'w-6 h-6 max-[767px]:w-6 max-[767px]:h-6' : 'w-6 h-6'}
                    ${isMultiIcons ? 'max-[767px]:w-5 max-[767px]:h-5' : ''}
                  `
                })}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 px-3 py-2 bg-orange-50 text-orange-700 rounded-full text-xs font-medium border border-orange-200 mx-auto w-fit">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            Available for Bookings
          </div>

          <p className="text-xs text-stone-500 mt-4 leading-relaxed text-center">
            DM for inquiries or use the contact form above.
          </p>
        </div>
      </div>
    </div>
  );
}

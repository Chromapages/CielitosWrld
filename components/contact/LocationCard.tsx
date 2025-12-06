"use client";

import React, { useEffect, useState, KeyboardEvent } from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import ContactMap from "@/components/contact/ContactMap";

interface LocationCardProps { }

export function LocationCard(_: LocationCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = "matches" in e ? e.matches : (e as MediaQueryList).matches;
      setIsDesktop(matches);
      if (matches) setIsOpen(true);
    };
    onChange(mq);
    mq.addEventListener?.("change", onChange as (e: MediaQueryListEvent) => void);
    return () => mq.removeEventListener?.("change", onChange as (e: MediaQueryListEvent) => void);
  }, []);

  return (
    <div
      className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
      style={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
    >
      {/* Header button: clickable on mobile */}
      <div className="p-6 sm:p-8 lg:p-10 border-b border-stone-200 bg-stone-50">
        <button
          type="button"
          className="w-full flex items-center justify-between gap-4 text-left md:cursor-default md:pointer-events-none"
          aria-expanded={isOpen}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-stone-800">
              Location
            </h3>
          </div>
          <span className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-stone-200 text-stone-600">
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </span>
        </button>
      </div>

      {/* Collapsible content wrapper */}
      <div
        className={`grid transition-[grid-template-rows] duration-150 ease-in-out ${!isDesktop && !isOpen ? 'border-t-0' : ''}`}
        style={isDesktop ? undefined : { gridTemplateRows: isOpen ? '1fr' : '0fr', willChange: 'grid-template-rows' }}
        aria-hidden={isDesktop ? false : !isOpen}
      >
        <div className="overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10 border-t border-stone-200 bg-white">
            <p className="text-stone-600 leading-relaxed max-w-2xl mb-4">
              Based in Southern California, serving the Inland Empire, Los Angeles, and San Diego areas.
            </p>
          </div>
          <ContactMap />
        </div>
      </div>
    </div>
  );
}

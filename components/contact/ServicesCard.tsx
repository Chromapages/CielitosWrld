"use client";

import React, { useEffect, useState, KeyboardEvent } from "react";
import { Camera, ChevronDown, ChevronUp } from "lucide-react";

interface ServicesCardProps { }

export function ServicesCard(_: ServicesCardProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const services = [
    "Portrait Photography",
    "Event Coverage",
    "Commercial Photography",
    "Creative Collaborations",
    "Photo Editing"
  ];

  return (
    <div
      className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 group hover:shadow-md transition-all duration-300"
      style={{ boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" }}
    >
      {/* Header: clickable on mobile only */}
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 text-left md:cursor-default md:pointer-events-none"
        aria-expanded={isOpen}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
            <Camera className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-stone-800">
            Services
          </h3>
        </div>
        {/* Icon: show only on mobile */}
        <span className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-full border border-stone-200 text-stone-600">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {/* Content: collapsed by default on mobile, always visible on md+ */}
      <div
        className={`mt-6 grid transition-[grid-template-rows] duration-150 ease-in-out md:block ${!isDesktop && !isOpen ? 'mt-0' : ''}`}
        style={isDesktop ? undefined : { gridTemplateRows: isOpen ? '1fr' : '0fr', willChange: 'grid-template-rows' }}
        aria-hidden={isDesktop ? false : !isOpen}
      >
        <div className="overflow-hidden md:overflow-visible space-y-2">
          {services.map((service, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 transition-colors duration-200 group/service">
              <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 group-hover/service:scale-125 transition-transform duration-200"></div>
              <span className="text-sm text-stone-700 group-hover/service:text-orange-700 transition-colors duration-200">
                {service}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

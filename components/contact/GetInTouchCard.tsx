"use client";

import React, { useEffect, useState, KeyboardEvent } from "react";
import { Users, Mail, Phone, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";

interface GetInTouchCardProps { }

export function GetInTouchCard(_: GetInTouchCardProps) {
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

  return (
    <div
      className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 group transition-all duration-300 hover:shadow-md"
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
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-stone-800">
            Get in Touch
          </h2>
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
        <div className="overflow-hidden md:overflow-visible space-y-6">
          <div className="flex items-start gap-4 group/item">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:bg-orange-100 transition-colors duration-300">
              <Mail className="w-5 h-5 text-stone-600 group-hover/item:text-orange-600 transition-colors duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-stone-800 text-sm mb-1">
                Email
              </p>
              <a
                href="mailto:Abajo.Del.Cieloo@gmail.com"
                className="text-stone-600 hover:text-orange-600 focus:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded transition-all duration-300 text-sm underline-offset-4 hover:underline break-all"
                tabIndex={0}
              >
                Abajo.Del.Cieloo@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 group/item">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:bg-orange-100 transition-colors duration-300">
              <Phone className="w-5 h-5 text-stone-600 group-hover/item:text-orange-600 transition-colors duration-300" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-stone-800 text-sm mb-1">
                Phone
              </p>
              <a
                href="tel:+19515632759"
                className="text-stone-600 hover:text-orange-600 focus:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded transition-all duration-300 text-sm underline-offset-4 hover:underline"
                tabIndex={0}
              >
                (951) 563-2759
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 group/item">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:bg-orange-100 transition-colors duration-300">
              <MapPin className="w-5 h-5 text-stone-600 group-hover/item:text-orange-600 transition-colors duration-300" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-stone-800 text-sm mb-1">
                Service Areas
              </p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Inland Empire
                <br />
                Los Angeles
                <br />
                San Diego
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 group/item">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:bg-orange-100 transition-colors duration-300">
              <Clock className="w-5 h-5 text-stone-600 group-hover/item:text-orange-600 transition-colors duration-300" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-stone-800 text-sm mb-1">
                Availability
              </p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Weekdays: 9am - 6pm
                <br />
                Weekends: By appointment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

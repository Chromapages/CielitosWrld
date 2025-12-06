'use client';

import Link from 'next/link';
import { Instagram, Mail, MapPin, Phone, Camera, AtSign } from 'lucide-react';

const mainNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    threads?: string;
  };
}

export default function Footer({ contactInfo }: { contactInfo?: ContactInfo }) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', href: contactInfo?.socialLinks?.instagram || 'https://instagram.com/cielitosworld', icon: Instagram, color: 'hover:text-pink-400' },
    { name: 'Email', href: `mailto:${contactInfo?.email || 'Abajo.Del.Cieloo@gmail.com'}`, icon: Mail, color: 'hover:text-orange-400' },
    { name: 'Threads', href: contactInfo?.socialLinks?.threads || 'https://www.threads.net/@cielitosworld', icon: AtSign, color: 'hover:text-black' },
  ];

  return (
    <footer className="bg-white/90 dark:bg-stone-950/90 backdrop-blur-md border-t border-gray-200 dark:border-stone-800 hidden md:block relative z-50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* Company Information - Left Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Link
                href="/"
                className="text-2xl font-bold tracking-tight font-pattaya text-gray-900 dark:text-stone-50 hover:text-orange-600 dark:hover:text-orange-500 transition-colors duration-300"
              >
                Cielito's Wrld
              </Link>
            </div>

            <p className="font-inter text-gray-600 dark:text-stone-400 text-sm lg:text-base leading-relaxed mb-6">
              Capturing life through my lens, one moment at a time. Every photograph tells a story, and I'm here to help you tell yours.
            </p>
          </div>

          {/* Navigation Links - Middle Columns */}
          <div className="md:col-span-1 lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

              {/* Main Navigation */}
              <div>
                <h3 className="font-inter font-semibold text-gray-900 dark:text-stone-200 text-sm lg:text-base mb-4 uppercase tracking-wide">
                  Navigation
                </h3>
                <ul className="space-y-3">
                  {mainNavigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="font-inter text-sm lg:text-base text-gray-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-500 focus:text-orange-600 dark:focus:text-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded px-1 py-0.5 capitalize"
                        tabIndex={0}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="font-inter font-semibold text-gray-900 dark:text-stone-200 text-sm lg:text-base mb-4 uppercase tracking-wide">
                  Contact
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-500 flex-shrink-0" />
                    <span className="font-inter text-sm lg:text-base text-gray-600 dark:text-stone-400">{contactInfo?.location || 'Southern California, USA'}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-orange-600 dark:text-orange-500 flex-shrink-0" />
                    <a
                      href={`tel:${contactInfo?.phone || '+19515632759'}`}
                      className="font-inter text-sm lg:text-base text-gray-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-500 focus:text-orange-600 dark:focus:text-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded px-1 py-0.5"
                    >
                      {contactInfo?.phone || '(951) 563-2759'}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-orange-600 dark:text-orange-500 flex-shrink-0" />
                    <a
                      href={`mailto:${contactInfo?.email || 'Abajo.Del.Cieloo@gmail.com'}`}
                      className="font-inter text-sm lg:text-base text-gray-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-500 focus:text-orange-600 dark:focus:text-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded px-1 py-0.5"
                    >
                      {contactInfo?.email || 'Abajo.Del.Cieloo@gmail.com'}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social Media - Right Column */}
          <div className="lg:col-span-1">
            <h3 className="font-inter font-semibold text-gray-900 dark:text-stone-200 text-sm lg:text-base mb-4 uppercase tracking-wide">
              Follow My Work
            </h3>

            <div className="flex gap-4 mb-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-100 dark:bg-stone-900 rounded-full flex items-center justify-center text-gray-600 dark:text-stone-400 ${item.color} dark:hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 hover:-translate-y-0.5`}
                  aria-label={`Follow on ${item.name}`}
                  tabIndex={0}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-100 dark:border-orange-900/50">
              <Camera className="w-4 h-4 text-orange-600 dark:text-orange-500 flex-shrink-0" />
              <p className="font-inter text-xs text-orange-700 dark:text-orange-400">
                Available for bookings • Serving CA
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Legal */}
      <div className="border-t border-gray-200 dark:border-stone-800 bg-gray-50 dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">

            {/* Copyright */}
            <div className="flex items-center gap-4">
              <p className="font-inter text-sm text-gray-500 dark:text-stone-500">
                &copy; {currentYear} Cielito's Wrld. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4">
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-inter text-sm text-gray-500 dark:text-stone-500 hover:text-gray-700 dark:hover:text-stone-300 focus:text-gray-700 dark:focus:text-stone-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded px-1 py-0.5"
                  tabIndex={0}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
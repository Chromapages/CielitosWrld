'use client';

import Link from 'next/link';
import { Instagram, Mail, MapPin, Phone, Camera, AtSign, ArrowRight, Youtube } from 'lucide-react';

const navigation = {
  explore: [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Featured Work', href: '/work' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/#about' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Admin', href: '/studio' },
  ],
};

interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    threads?: string;
  };
}

export default function Footer({ contactInfo }: { contactInfo?: ContactInfo }) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', href: contactInfo?.socialLinks?.instagram || 'https://instagram.com/cielitosworld', icon: Instagram },
    { name: 'Youtube', href: contactInfo?.socialLinks?.youtube || 'https://youtube.com/@abajodelcielo?si=kB_wq_usUrtd_w11', icon: Youtube },
    { name: 'Threads', href: contactInfo?.socialLinks?.threads || 'https://www.threads.net/@cielitosworld', icon: AtSign },
    { name: 'Email', href: `mailto:${contactInfo?.email || 'Abajo.Del.Cieloo@gmail.com'}`, icon: Mail },
  ];

  return (
    <footer className="relative z-10 bg-stone-950 text-stone-400 border-t border-stone-900 font-sans pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      {/* Main Footer Content */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-8 md:pt-20 pb-0">

        {/* Mobile: Editorial Signature Layout */}
        <div className="md:hidden flex flex-col items-center text-center space-y-2 pb-0">
          <Link
            href="/"
            className="text-5xl font-bold font-pattaya text-stone-100 hover:text-orange-500 transition-colors"
            aria-label="Cielito's Wrld Home"
          >
            Cielito's Wrld
          </Link>

          <div className="flex gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-stone-900/50 text-stone-400 hover:text-orange-500 hover:bg-stone-900 transition-all"
                aria-label={`Follow on ${item.name}`}
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="text-xs text-stone-500 uppercase tracking-widest pt-2 md:hidden">
            &copy; {currentYear} • Southern California
          </div>
        </div>

        {/* Desktop: 4-Column Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Column 1: Brand & Identity */}
          <div className="space-y-6 stagger-1">
            <Link
              href="/"
              className="inline-block text-3xl font-bold font-pattaya text-stone-100 hover:text-orange-500 transition-colors"
            >
              Cielito's Wrld
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-stone-400 font-light">
              Capturing life's fleeting moments with authenticity and passion. Based in Southern California, available worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:bg-stone-800 hover:text-white transition-all duration-300"
                  aria-label={`Follow on ${item.name}`}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore Navigation - Hidden on mobile because it's in the bottom nav */}
          <div className="stagger-2 hidden md:block">
            <h3 className="text-stone-100 font-bold uppercase tracking-widest text-xs mb-6">
              Explore
            </h3>
            <ul className="space-y-3">
              {navigation.explore.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-orange-400 transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="stagger-3">
            <h3 className="text-stone-100 font-bold uppercase tracking-widest text-xs mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-stone-600 mt-0.5" />
                <span className="text-sm text-stone-400 leading-relaxed">
                  {contactInfo?.location || 'Southern California, USA'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-stone-600" />
                <a
                  href={`mailto:${contactInfo?.email || 'Abajo.Del.Cieloo@gmail.com'}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {contactInfo?.email || 'Abajo.Del.Cieloo@gmail.com'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-stone-600" />
                <span className="text-sm text-stone-500">
                  Accepting new projects
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: CTA */}
          <div className="lg:pl-8 stagger-4">
            <h3 className="text-stone-100 font-bold uppercase tracking-widest text-xs mb-6">
              Let's Create
            </h3>
            <p className="text-sm text-stone-400 mb-6 font-light">
              Ready to bring your vision to life? Let's discuss your next project.
            </p>
            <Link
              href="/contact"
              className="btn-press inline-flex items-center justify-center w-full px-6 py-3 bg-stone-100 text-stone-950 font-bold text-sm rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 group"
            >
              Book a Session
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Bar (Responsive) */}
      <div className="border-t border-stone-900 bg-stone-950/50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600">
            <p className="order-2 md:order-1">&copy; {currentYear} Cielito's Wrld. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 order-1 md:order-2">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-stone-400 transition-colors uppercase tracking-tight md:normal-case md:tracking-normal"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
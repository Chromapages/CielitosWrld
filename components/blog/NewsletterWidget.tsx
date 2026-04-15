'use client';

import Link from 'next/link';
import { MessageCircleMore, ArrowRight } from 'lucide-react';

interface NewsletterWidgetProps {
  heading?: string;
  description?: string;
}

export default function NewsletterWidget({
  heading = "Start Your Project",
  description = "Need portrait coverage, event photography, or a creative collaboration? Head to the contact page and send the details."
}: NewsletterWidgetProps) {
  return (
    <div className="border border-stone-200 bg-white p-6 rounded-2xl shadow-xl text-stone-900 overflow-hidden relative dark:border-brand-800 dark:bg-brand-900 dark:text-white">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 dark:bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-stone-100 dark:bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <MessageCircleMore className="w-5 h-5 text-orange-500" />
          <h4 className="text-sm font-archivo font-black uppercase tracking-widest text-stone-900 dark:text-white/90">{heading}</h4>
        </div>

        <p className="text-stone-600 dark:text-white/80 text-sm mb-5 leading-relaxed">
          {description}
        </p>

        <Link
          href="/contact"
          className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-500 transition-colors group"
        >
          Go to Contact Page
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <p className="text-[10px] text-stone-500 dark:text-white/50 mt-3 text-center uppercase tracking-[0.2em]">
          Response within 24-48 hours
        </p>
      </div>
    </div>
  );
}

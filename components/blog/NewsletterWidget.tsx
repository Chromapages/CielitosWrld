'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react';

interface NewsletterWidgetProps {
  heading?: string;
  description?: string;
}

export default function NewsletterWidget({
  heading = "Join the Inner Circle",
  description = "Get weekly insights on photography, creative process, and behind-the-scenes stories. No spam, just value."
}: NewsletterWidgetProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-lg shadow-orange-500/25 text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <h4 className="text-sm font-archivo font-black uppercase tracking-widest text-white/90">{heading}</h4>
        </div>

        <p className="text-white/80 text-sm mb-5 leading-relaxed">
          {description}
        </p>

        {/* Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-300" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-white/20 border border-white/30 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-orange-600 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Subscribing...
                </span>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="bg-white/20 rounded-xl py-4 px-4 text-center animate-in fade-in zoom-in duration-300">
            <Check className="w-8 h-8 mx-auto mb-2 text-green-300" />
            <p className="font-bold text-white">You're in!</p>
            <p className="text-sm text-white/80">Check your inbox soon.</p>
          </div>
        )}

        {/* Privacy note */}
        <p className="text-[10px] text-white/50 mt-3 text-center">
          Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  );
}

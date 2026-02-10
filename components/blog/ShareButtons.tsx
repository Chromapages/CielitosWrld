'use client';

import { useState } from 'react';
import { Twitter, Facebook, Link2, Check, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: 'twitter' | 'facebook') => {
    const text = encodeURIComponent(title);
    const urlEncoded = encodeURIComponent(url);
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${urlEncoded}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}`, '_blank');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[#3F3F46] dark:text-stone-400">Share:</span>
      
      <button
        onClick={() => handleShare('twitter')}
        className="p-2 text-[#3F3F46] dark:text-stone-400 hover:text-[#EC4899] hover:bg-[#EC4899]/10 rounded-full transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => handleShare('facebook')}
        className="p-2 text-[#3F3F46] dark:text-stone-400 hover:text-[#EC4899] hover:bg-[#EC4899]/10 rounded-full transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5" />
      </button>
      
      <button
        onClick={handleCopy}
        className="p-2 text-[#3F3F46] dark:text-stone-400 hover:text-[#EC4899] hover:bg-[#EC4899]/10 rounded-full transition-colors relative"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <Link2 className="w-5 h-5" />
        )}
        
        {copied && (
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}

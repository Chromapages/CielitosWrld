'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

interface FeaturedPostProps {
  post: any;
}

'use client';

import BlogPost from './BlogPost';

interface FeaturedPostProps {
  post: any;
  avatar?: string;
  username?: string;
}

export default function FeaturedPost({ post, avatar, username }: FeaturedPostProps) {
  if (!post) return null;

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest px-4 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
          Featured Story
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      </div>

      <div className="scale-[1.05] transition-transform duration-500 hover:scale-[1.07]">
        <BlogPost post={post} avatar={avatar} username={username} />
      </div>
    </div>
  );
}

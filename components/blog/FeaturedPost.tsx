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

      <div className="transition-transform duration-500 ease-out hover:scale-[1.02]">
        <BlogPost post={post} avatar={avatar} username={username} />
      </div>
    </div>
  );
}

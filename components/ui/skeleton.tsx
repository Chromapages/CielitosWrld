import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-stone-900/10 dark:bg-stone-50/10 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * ImageSkeleton - Animated loading placeholder for images
 * 
 * Usage:
 * <ImageSkeleton aspectRatio="4/3" />
 * <ImageSkeleton className="w-full h-64" />
 */
export function ImageSkeleton({ 
  className, 
  aspectRatio = '4/3' 
}: { 
  className?: string;
  aspectRatio?: string;
}) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg bg-stone-200 dark:bg-stone-800",
        className
      )}
      style={{ aspectRatio }}
    >
      {/* Shimmer animation */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      
      {/* Placeholder icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          className="w-8 h-8 text-stone-300 dark:text-stone-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * CardSkeleton - Loading skeleton for cards
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <ImageSkeleton aspectRatio="4/3" />
      <div className="space-y-2 px-1">
        <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}

/**
 * TextSkeleton - Loading skeleton for text
 */
export function TextSkeleton({ 
  lines = 3, 
  className 
}: { 
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i}
          className="h-4 bg-stone-200 dark:bg-stone-800 rounded animate-pulse"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

/**
 * GalleryGridSkeleton - Skeleton for gallery grid
 */
export function GalleryGridSkeleton({ count = 12 }: { count?: number }) {
  const aspectRatios = ['3/4', '4/3', '1/1', '3/2', '2/3', '16/9'];
  
  return (
    <div className="columns-2 md:columns-2 lg:columns-3 gap-3 md:gap-6 space-y-3 md:space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className="break-inside-avoid opacity-0 animate-in fade-in duration-500 fill-mode-forwards"
          style={{ animationDelay: `${(index % 8) * 50}ms` }}
        >
          <ImageSkeleton aspectRatio={aspectRatios[index % aspectRatios.length]} />
        </div>
      ))}
    </div>
  );
}

/**
 * BlogPostSkeleton - Skeleton for blog post cards
 */
export function BlogPostSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-stone-200 dark:border-stone-800">
        <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-20 animate-pulse" />
      </div>
      <ImageSkeleton aspectRatio="16/9" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-3/4 animate-pulse" />
        <TextSkeleton lines={3} />
        <div className="flex gap-2 pt-2">
          <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded-full w-16 animate-pulse" />
          <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded-full w-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/**
 * PageSkeleton - Full page loading state
 */
export function PageSkeleton() {
  return (
    <div className="min-h-screen space-y-8 p-4">
      {/* Header */}
      <div className="h-16 glass-card rounded-2xl animate-pulse" />
      
      {/* Hero */}
      <ImageSkeleton aspectRatio="21/9" className="rounded-3xl" />
      
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}

export { Skeleton }

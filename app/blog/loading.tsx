import { Skeleton } from "@/components/ui/skeleton"
import PageBackground from "@/components/ui/PageBackground"

export default function Loading() {
  return (
    <div className="min-h-screen relative pt-24 pb-20 md:pt-32 -mt-16 md:-mt-24">
      {/* Background Placeholder */}
      <div className="fixed inset-0 z-0 bg-sage-50 dark:bg-[#0a0a0a]" />

      {/* Optional: If we want to show a blurred background skeleton, we can add it here, 
          but usually a solid color is smoother for initial load until the image loads. 
          The PageBackground component handles its own image loading state. */}

      <div className="relative z-10">
        {/* Mobile Header Skeleton */}
        <div className="lg:hidden container mx-auto px-4 mb-8 text-center flex flex-col items-center gap-3">
          <Skeleton className="h-10 w-48 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded-md" />
        </div>

        <div className="container mx-auto px-4 md:px-8 flex justify-center gap-16">

          {/* Main Feed Skeleton */}
          <main className="w-full max-w-[640px] space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/70 dark:bg-moss-900/70 backdrop-blur-md rounded-sm border border-white/20 dark:border-white/10 overflow-hidden shadow-sm">
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-orange-500/30 dark:border-orange-400/30">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />

                  {/* Image Placeholder */}
                  <Skeleton className="w-full aspect-[4/3] rounded-sm mt-4" />
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-white/40 dark:bg-black/20 border-t border-orange-500/30 dark:border-orange-400/30 flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </main>

          {/* Sidebar Skeleton (Desktop) */}
          <aside className="w-72 flex-shrink-0 sticky top-32 self-start hidden lg:block space-y-8">

            {/* Profile Widget Skeleton */}
            <div className="bg-white/70 dark:bg-moss-900/70 backdrop-blur-md p-6 rounded-xl border border-white/20 dark:border-white/10 shadow-sm flex flex-col items-center gap-4">
              <Skeleton className="w-20 h-20 rounded-full" />
              <div className="space-y-2 w-full flex flex-col items-center">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-3 w-48" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>

            {/* Search Pill Skeleton */}
            <Skeleton className="h-10 w-full rounded-full" />

            {/* Navigation Skeleton */}
            <div className="bg-white/70 dark:bg-moss-900/70 backdrop-blur-md p-2 rounded-xl border border-white/20 dark:border-white/10 shadow-sm space-y-1">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-full rounded-lg" />
              ))}
            </div>

            {/* Currently Widget Skeleton */}
            <div className="bg-white/70 dark:bg-moss-900/70 backdrop-blur-md p-5 rounded-xl border border-white/20 dark:border-white/10 shadow-sm space-y-3">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Tags Cloud Skeleton */}
            <div className="bg-white/70 dark:bg-moss-900/70 backdrop-blur-md p-5 rounded-xl border border-white/20 dark:border-white/10 shadow-sm space-y-3">
              <Skeleton className="h-3 w-12" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-md" />
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  )
}

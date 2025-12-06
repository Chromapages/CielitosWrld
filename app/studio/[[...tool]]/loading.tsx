/**
 * Automatic loading state for Studio route
 * Next.js will show this during navigation and initial load
 */

export default function StudioLoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center animate-in fade-in duration-500">
        {/* Spinning loader with double ring effect */}
        <div className="relative mx-auto mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-600 border-t-transparent" />
          <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-orange-200 opacity-20" />
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">Loading Studio</h2>
          <p className="text-sm text-gray-500">Preparing your content workspace...</p>
        </div>
        
        {/* Animated dots */}
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}

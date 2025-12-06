export default function VideoSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-fitzgerald-bold text-3xl sm:text-4xl text-mud italic mb-8">
          Featured Video
        </h2>
        
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://player.vimeo.com/video/76979871?h=8272103f6e&autoplay=0&loop=1&muted=1"
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Featured Video"
          />
        </div>
        
        <p className="font-inter text-mud text-lg mt-6 max-w-2xl mx-auto">
          A glimpse into my creative process and the stories behind the lens
        </p>
      </div>
    </section>
  );
}
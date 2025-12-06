'use client';

import { useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export default function ContactMap() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Studio location coordinates (Los Angeles)
  const studioAddress = 'Southern California, USA';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studioAddress)}`;
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.8944!2d-118.2437!3d34.0928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA1JzM0LjEiTiAxMTjCsDE0JzM3LjMiVw!5e0!3m2!1sen!2sus!4v1609459200000!5m2!1sen!2sus`;

  return (
    <div className="relative h-96 lg:h-[480px] bg-gray-50 rounded-b-2xl overflow-hidden">
      {/* Loading placeholder with Material Design styling */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 z-20">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm animate-pulse">
              <MapPin className="w-8 h-8 text-orange-600" />
            </div>
            <div className="space-y-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
              <div className="w-16 h-2 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
            </div>
            <p className="font-inter text-gray-600 text-sm lg:text-base mt-4">Loading map...</p>
          </div>
        </div>
      )}

      {/* Google Maps Embed */}
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full"
        title="Studio Location Map"
      />

      {/* Address overlay with Material Design elevation-8 */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-xs lg:max-w-sm border border-white/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-inter font-semibold text-gray-900 text-sm lg:text-base mb-2">
              Studio Location
            </p>
            <p className="font-inter text-gray-600 text-xs lg:text-sm leading-relaxed mb-4">
              {studioAddress}
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-inter text-orange-600 hover:text-orange-700 focus:text-orange-700 text-xs lg:text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded px-1 py-0.5 hover:underline underline-offset-2"
              tabIndex={0}
            >
              <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Parking info overlay with Material Design elevation-4 */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 lg:p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-white/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs">🅿️</span>
          </div>
          <p className="font-inter text-gray-900 text-xs lg:text-sm font-semibold">
            Free Parking
          </p>
        </div>
        <p className="font-inter text-gray-600 text-xs lg:text-sm leading-relaxed">
          Available on-site
        </p>
      </div>
    </div>
  );
}

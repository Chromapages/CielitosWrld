/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to support Sanity Studio (requires server-side rendering)
  // For static deployment, use ISR with revalidate on pages instead
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Re-enable Next.js image optimization now that we're not doing static export
    unoptimized: false,
    // Configure domains for remote images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

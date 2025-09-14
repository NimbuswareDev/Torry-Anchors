/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'api.dicebear.com'],
    unoptimized: false,
  },
  // Enable static optimization
  trailingSlash: false,
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Production optimizations
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig
// next.config.js (Final CSP Configuration with Cache Bypass)

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // This targets all routes
        source: '/:path*', 
        headers: [
          // CRITICAL: Force the browser and Vercel Edge Network NOT to cache the response.
          // This ensures the browser always gets the NEW security headers (200 OK).
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate',
          },
          // CSP Header (remains the same)
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://app.storyblok.com https://*.vercel.app;", 
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,

  images: {
    // Optimisation is on: CMS images are resized per device and served as
    // AVIF/WebP from /_next/image. Sources must come from these hosts.
    remotePatterns: [
      { protocol: "https", hostname: "cda-sa.spider.ws" },
      { protocol: "https", hostname: "dashboard.cdaaudit.in" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Next serves optimized images as "attachment" by default, so opening the
    // /_next/image URL directly saves the file instead of showing it.
    contentDispositionType: "inline",
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      // The sitemap routes live under pages/sitemap/*; expose them at the
      // conventional .xml addresses that crawlers and Search Console expect.
      { source: "/sitemap.xml", destination: "/sitemap" },
      { source: "/sitemap-:name.xml", destination: "/sitemap/:name" },
    ];
  },

  async redirects() {
    return [
      { source: "/index", destination: "/", permanent: true },
      {
        source: "/location/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/location/:slug/:child",
        destination: "/:slug/:child",
        permanent: true,
      },
      // Privacy policy and terms used to be hand-written pages of their own.
      // They are CMS company pages now, so the old addresses point at them.
      {
        source: "/privacy-policy",
        destination: "/company/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms-condition",
        destination: "/company/terms-and-conditions",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

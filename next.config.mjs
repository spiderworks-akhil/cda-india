/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    unoptimized: true,
    domains: [
      "cda-sa.spider.ws",
      "dashboard.cdaaudit.in",
    ],
    // Next serves optimized images as "attachment" by default, so opening the
    // /_next/image URL directly saves the file instead of showing it.
    contentDispositionType: "inline",
  },


  async redirects() {
    return [
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
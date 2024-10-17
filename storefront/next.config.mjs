/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {hostname: "cdn.sanity.io"},
      {hostname: "munchies.medusajs.app"},
      {hostname: "tinloof-munchies.s3.eu-north-1.amazonaws.com"},
    ],
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === "production",
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    taint: true,
  },
  async rewrites() {
    return [
      {
        source:
          "/:path((?!us|dk|fr|de|es|jp|gb|ca|ar|za|mx|my|au|nz|dz|br|cms|api|images|icons|favicon.ico|sections|favicon-inactive.ico).*)",
        destination: "/us/:path*",
      },
    ];
  },
};

export default config;

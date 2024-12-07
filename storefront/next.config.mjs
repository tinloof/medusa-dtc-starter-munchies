/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {hostname: "cdn.sanity.io"},
      {hostname: "pub-f6bdb5ce4859422aae8d11a03552fccf.r2.dev"},
      {hostname: "tinloof-munchies.s3.eu-north-1.amazonaws.com"},
      {hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com"},
    ],
    formats: ["image/avif", "image/webp"],
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
  rewrites() {
    return [
      {
        source:
          "/:path((?!pk|dk|fr|de|es|jp|gb|ca|ar|za|mx|my|au|nz|dz|br|cms|api|images|icons|favicon.ico|sections|favicon-inactive.ico).*)",
        destination: "/pk/:path*",
      },
    ];
  },
};

export default config;

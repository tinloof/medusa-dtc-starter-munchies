/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      { hostname: "munchies.medusajs.app" },
      { hostname: "tinloof-munchies.s3.eu-north-1.amazonaws.com" },
      { hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com" },
      { hostname: "s3.eu-central-1.amazonaws.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  rewrites() {
    return [
      {
        source: "/static/:path*",
        destination: "/cms/static/:path*",
      },
      {
        source: "/cms/:path*",
        destination: "/cms/index.html",
      },
      {
        source:
          "/:path((?!us|dk|fr|de|es|jp|gb|ca|ar|za|mx|my|au|nz|dz|br|cms|api|images|icons|favicon.ico|sections|favicon-inactive.ico|static).*)",
        destination: "/us/:path*",
      },
    ];
  },
};

export default config;

/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://seujinsa.herokuapp.com/:path*`,
      },
    ];
  },
  images: {
    domains: ["https://seujinsa.netlify.app/", "localhost"],
  },
});

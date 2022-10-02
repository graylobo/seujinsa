/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;

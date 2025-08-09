/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['cms-perpusku.widhimp.my.id','cdn.pixabay.com', 'img.chrono24.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 's3-alpha-sig.figma.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ]
  },
  transpilePackages: ['geist']
};

module.exports = nextConfig;

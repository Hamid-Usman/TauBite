/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    domains: ['tau-api.onrender.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
    ],
  },
};

module.exports = nextConfig;

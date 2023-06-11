/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.otstatic.com',
        port: '',
        // pathname: '/v2/photos/wide-huge/**',
      },
    ],
  },}

module.exports = nextConfig

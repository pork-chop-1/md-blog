/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://imgse.com',
        port: '',
        pathname: '/i/**',
      },
    ],
  },
}

module.exports = nextConfig

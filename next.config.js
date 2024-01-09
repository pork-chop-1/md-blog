/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's11.ax1x.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    instrumentationHook: true
  }
}

module.exports = nextConfig

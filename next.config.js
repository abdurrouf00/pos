/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    // Add path alias for '@'
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    return config
  },
  async rewrites() {
    return [
      {
        source: '/proxy-api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig

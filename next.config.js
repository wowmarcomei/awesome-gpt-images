/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'animeai.online',
        port: '',
        pathname: '/demo/**',
      },
    ],
  },
}

module.exports = nextConfig 
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    path: '/_next/image',
    loader: 'default',
    disableStaticImages: false,
    unoptimized: false,
    domains: [
      'lh3.googleusercontent.com',    // Google 头像
      'avatars.githubusercontent.com'  // GitHub 头像
    ]
  },
  // 添加实验性功能支持
  experimental: {
    optimizeImages: true,
    optimizeCss: true,
  },
}

module.exports = nextConfig 
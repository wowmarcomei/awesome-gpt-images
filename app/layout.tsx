import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import { cn } from '../lib/utils';
import { Navbar } from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://awesome-gpt-images.com'),
  title: {
    default: 'Awesome GPT-4 Images - GPT-4 Vision 创作案例展示',
    template: '%s | Awesome GPT-4 Images'
  },
  description: '精选 GPT-4 Vision 图像创作案例展示，包含详细提示词、创作技巧和最佳实践。Collection of amazing GPT-4 Vision image creation showcases with detailed prompts and best practices.',
  keywords: 'GPT-4, Vision, AI, Image Generation, Prompts, Creative, Showcase, Examples, 图像生成, 提示词, 人工智能, 创意展示',
  authors: [{ name: 'wowmarcomei', url: 'https://github.com/wowmarcomei' }],
  creator: 'wowmarcomei',
  publisher: 'wowmarcomei',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    url: 'https://awesome-gpt-images.com/',
    siteName: 'Awesome GPT-4 Images',
    title: 'Awesome GPT-4 Images - GPT-4 Vision 创作案例展示',
    description: '精选 GPT-4 Vision 图像创作案例展示，包含详细提示词、创作技巧和最佳实践。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Awesome GPT-4 Images Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awesome GPT-4 Images - GPT-4 Vision 创作案例展示',
    description: '精选 GPT-4 Vision 图像创作案例展示，包含详细提示词、创作技巧和最佳实践。',
    creator: '@wowmarcomei',
    images: ['/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'your-google-site-verification', // 需要添加 Google Search Console 验证码
  },
  alternates: {
    canonical: 'https://awesome-gpt-images.com',
    languages: {
      'en-US': '/en',
      'zh-CN': '/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon/ms-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/favicon/ms-icon-310x310.png', sizes: '310x310', type: 'image/png' },
    ],
    shortcut: '/favicon/ms-icon-144x144.png',
    apple: [
      { url: '/favicon/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/favicon/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/favicon/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/favicon/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/favicon/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/favicon/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/favicon/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/favicon/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/favicon/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/favicon/apple-icon-precomposed.png',
      },
      {
        rel: 'android-chrome',
        url: '/favicon/android-icon-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome',
        url: '/favicon/android-icon-144x144.png',
        sizes: '144x144',
      },
      {
        rel: 'android-chrome',
        url: '/favicon/android-icon-96x96.png',
        sizes: '96x96',
      },
      {
        rel: 'android-chrome',
        url: '/favicon/android-icon-72x72.png',
        sizes: '72x72',
      },
      {
        rel: 'android-chrome',
        url: '/favicon/android-icon-48x48.png',
        sizes: '48x48',
      },
      {
        rel: 'android-chrome',
        url: '/favicon/android-icon-36x36.png',
        sizes: '36x36',
      },
      {
        rel: 'msapplication-TileImage',
        url: '/favicon/ms-icon-144x144.png',
      },
    ],
  },
  manifest: '/favicon/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={cn('min-h-screen font-sans antialiased relative', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange
        >
          <Navbar />
          <div className="pt-12">
            {children}
          </div>
          <Analytics debug={process.env.NODE_ENV === 'development'} />
        </ThemeProvider>
      </body>
    </html>
  );
} 
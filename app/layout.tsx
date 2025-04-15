import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import { cn } from '../lib/utils';
import { Navbar } from '../components/Navbar';
import { ScrollButton } from '../components/ScrollButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://awesome-gpt-images.com'),
  title: {
    default: 'Awesome GPT-4 Images - GPT-4 Vision 创作案例展示',
    template: '%s | Awesome GPT-4 Images'
  },
  description: '探索 GPT-4 Vision 图像创作的无限可能！收录精选 GPT-4V 提示词案例，展示 AI 图像理解与创作的最佳实践。包含详细的中英文提示词、创作技巧和实用指南。Explore the possibilities of GPT-4 Vision! A curated collection of GPT-4V prompts showcasing AI image understanding and creation best practices.',
  keywords: [
    'GPT-4 Vision',
    'GPT-4V',
    'AI Image Generation',
    'Prompt Engineering',
    'AI Prompts',
    'Image Analysis',
    'Computer Vision',
    'AI Creative Tools',
    'GPT-4 Examples',
    'AI Image Understanding',
    '人工智能图像生成',
    '提示词工程',
    'AI创意工具',
    '计算机视觉',
    'GPT-4案例',
    'AI图像理解'
  ].join(', '),
  authors: [{ 
    name: 'wowmarcomei',
    url: 'https://github.com/wowmarcomei'
  }],
  creator: 'wowmarcomei',
  publisher: 'wowmarcomei',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    url: 'https://awesome-gpt-images.com',
    siteName: 'Awesome GPT-4 Images',
    title: 'Awesome GPT-4 Images - GPT-4 Vision 创作案例展示',
    description: '探索 GPT-4 Vision 图像创作的无限可能！收录精选 GPT-4V 提示词案例，展示 AI 图像理解与创作的最佳实践。',
    images: [
      {
        url: 'https://awesome-gpt-images.com/og-image/og-image.png?v=1',
        width: 1088,
        height: 992,
        alt: 'Awesome GPT-4 Images - 探索 AI 图像理解的未来',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awesome GPT-4 Images - GPT-4 Vision 创作案例展示',
    description: '探索 GPT-4 Vision 图像创作的无限可能！收录精选 GPT-4V 提示词案例，展示 AI 图像理解与创作的最佳实践。',
    creator: '@wowmarcomei',
    site: '@wowmarcomei',
    images: [
      {
        url: 'https://awesome-gpt-images.com/og-image/og-image.png?v=1',
        width: 1088,
        height: 992,
        alt: 'Awesome GPT-4 Images - 探索 AI 图像理解的未来',
      }
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  verification: {
    google: 'your-google-site-verification', // 需要添加 Google Search Console 验证码
    yandex: 'yandex-verification',
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
  category: 'technology',
  classification: 'AI Tools, Image Generation, Computer Vision',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },
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
          <ScrollButton />
          <Analytics debug={process.env.NODE_ENV === 'development'} />
        </ThemeProvider>
      </body>
    </html>
  );
} 
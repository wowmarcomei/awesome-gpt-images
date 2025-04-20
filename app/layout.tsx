import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import { cn } from '../lib/utils';
import { I18nProvider } from '../lib/i18n/context';
import { LanguageAwareLayout } from '../components/LanguageAwareLayout';
import { AuthProvider } from '../lib/auth/context';
import { Toaster } from 'sonner';
import { Navbar } from '../components/Navbar';
import { ScrollButton } from '../components/ScrollButton';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://prompt.laomeinote.com'),
  title: {
    default: 'Awesome GPT4o Images Prompt List',
    template: '%s | Awesome GPT4o Images Prompt List'
  },
  description: '精选 GPT4o 图像提示词目录 | Curated GPT4o Images Prompt List Directory',
  keywords: ['GPT4o', 'AI', 'Image', 'Prompt', 'Directory', 'Showcase', '人工智能', '图像生成', '提示词', '提示词目录', 'GPT4o图像'],
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
    title: 'Awesome GPT4o Images Prompt List',
    description: '精选 GPT4o 图像提示词目录 | Curated GPT4o Images Prompt List Directory',
    url: 'https://prompt.laomeinote.com',
    siteName: 'Awesome GPT4o Images Prompt List',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: 'https://awesome-gpt-images.com/og-image/og-image.png?v=1',
        width: 1088,
        height: 992,
        alt: 'Awesome GPT Images Prompt - 探索 AI 图像理解的未来',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awesome GPT4o Images Prompt List',
    description: '精选 GPT4o 图像提示词目录 | Curated GPT4o Images Prompt List Directory',
    site: '@your-twitter-handle',
    creator: '@your-twitter-handle',
    images: [
      {
        url: 'https://awesome-gpt-images.com/og-image/og-image.png?v=1',
        width: 1088,
        height: 992,
        alt: 'Awesome GPT Images Prompt - 探索 AI 图像理解的未来',
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
    google: 'your-google-site-verification',
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

import { LayoutContentWrapper } from '../components/LayoutContentWrapper';

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
          <AuthProvider>
            <I18nProvider>
              <LanguageAwareLayout>
                <LayoutContentWrapper>
                  {children}
                </LayoutContentWrapper>
                <Analytics debug={process.env.NODE_ENV === 'development'} />
              </LanguageAwareLayout>
            </I18nProvider>
          </AuthProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
} 
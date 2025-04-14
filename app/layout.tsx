import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Awesome GPT-4 Images',
  description: '精选 GPT-4 Vision 图像创作案例展示，为创作者提供灵感和参考。Collection of amazing GPT-4 Vision image creation showcases.',
  keywords: 'GPT-4, Vision, AI, Image Generation, Prompts, Creative, Showcase, Examples',
  authors: [{ name: 'wowmarcomei' }],
  creator: 'wowmarcomei',
  publisher: 'wowmarcomei',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    url: 'https://awesome-gpt-images.vercel.app/',
    siteName: 'Awesome GPT-4 Images',
    title: 'Awesome GPT-4 Images - GPT-4 Vision 创作案例展示',
    description: '精选 GPT-4 Vision 图像创作案例展示，为创作者提供灵感和参考。Collection of amazing GPT-4 Vision image creation showcases.',
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
    description: '精选 GPT-4 Vision 图像创作案例展示，为创作者提供灵感和参考。',
    creator: '@wowmarcomei',
    images: ['/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/site.webmanifest',
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
    <html lang="zh-CN">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
} 
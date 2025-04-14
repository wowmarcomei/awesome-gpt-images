import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import { cn } from '../lib/utils';
import { ThemeToggle } from '../components/theme-toggle';

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
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={cn('min-h-screen font-sans antialiased relative', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange
        >
          <div className="relative">
            <ThemeToggle />
            {children}
          </div>
          <Analytics debug={process.env.NODE_ENV === 'development'} />
        </ThemeProvider>
      </body>
    </html>
  );
} 
'use client'

import { Sidebar } from './components/Sidebar'
import { I18nProvider } from '@/lib/i18n/context'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/30">
        {/* 背景装饰 */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-slate-200/[0.2] dark:bg-grid-white/[0.05] bg-[size:60px_60px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-blue-100/20 to-transparent dark:from-blue-500/5 blur-3xl" />
        </div>

        <div className="flex relative pt-16">
          {/* 桌面端侧边栏 */}
          <div className="hidden lg:block">
            <div className="fixed top-16 bottom-0 z-30">
              <div className="h-full w-64 border-r border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl">
                <Sidebar />
              </div>
            </div>
            <div className="w-64" /> {/* 占位 */}
          </div>
          
          {/* 移动端侧边栏 */}
          <div className="lg:hidden">
            <Sidebar />
          </div>
          
          {/* 主内容区 */}
          <main className="flex-1 min-h-screen">
            <div className="px-4 py-8 md:px-8 md:py-12 max-w-6xl mx-auto">
              <div className="grid gap-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </I18nProvider>
  )
} 
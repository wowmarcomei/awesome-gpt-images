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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
        {/* 背景装饰 - 简化为纯色背景，保留细微纹理 */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-slate-200/[0.15] dark:bg-grid-white/[0.05] bg-[size:60px_60px]" />
        </div>

        <div className="flex relative">
          {/* 桌面端侧边栏 - 使用新设计的 Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
            <div className="w-72" /> {/* 占位，宽度与新 Sidebar 一致 */}
          </div>
          
          {/* 移动端侧边栏 - 放在外层以避免布局问题 */}
          <div className="lg:hidden fixed top-0 left-0 z-[100]">
            <Sidebar />
          </div>
          
          {/* 主内容区 */}
          <main className="flex-1 min-h-screen w-full">
            <div className="px-4 pt-16 pb-8 md:px-8 md:pt-12 md:pb-12 max-w-6xl mx-auto">
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
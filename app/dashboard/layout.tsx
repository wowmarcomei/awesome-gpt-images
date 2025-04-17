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
      <div className="flex min-h-screen">
        {/* 左侧栏 */}
        <Sidebar />
        
        {/* 主内容区 */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </I18nProvider>
  )
} 
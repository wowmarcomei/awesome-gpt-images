'use client'

import { Heart, Star, LogOut, Menu, User, Moon, Sun, Home, Compass, Globe } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'
import { useAuth } from '@/hooks/use-auth'
import { useSidebar } from '@/hooks/use-sidebar'
import { useTheme } from 'next-themes'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Sidebar() {
  const pathname = usePathname()
  const { t, locale, setLanguage } = useI18n()
  const { signOut } = useAuth()
  const sidebar = useSidebar()
  const { theme, setTheme } = useTheme()

  const navigation = [
    {
      name: t('dashboard.favorites'),
      href: '/dashboard/favorites',
      icon: Star,
      current: pathname === '/dashboard/favorites'
    },
    {
      name: t('dashboard.likes'),
      href: '/dashboard/likes',
      icon: Heart,
      current: pathname === '/dashboard/likes'
    }
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="sticky top-4 bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-600">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <img src="/logo2.png" alt="Logo" className="w-6 h-6 object-contain" />
          {t('dashboard.navigation')}
        </h2>
        
        <div className="space-y-1.5">
          {/* 我的主页链接 */}
          <Link
            href="/dashboard"
            onClick={() => sidebar.onClose()}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
              pathname === '/dashboard'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600/70'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                pathname === '/dashboard'
                  ? 'bg-blue-400'
                  : 'bg-blue-50 dark:bg-gray-600'
              }`}>
                <Home className={`${
                  pathname === '/dashboard'
                    ? 'text-white'
                    : 'text-blue-500 dark:text-blue-300'
                }`} />
              </div>
              <span className="font-medium">{t('dashboard.profile')}</span>
            </div>
          </Link>
          
          {/* 收藏夹链接 */}
          <Link
            href="/dashboard/favorites"
            onClick={() => sidebar.onClose()}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
              pathname === '/dashboard/favorites'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600/70'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                pathname === '/dashboard/favorites'
                  ? 'bg-blue-400'
                  : 'bg-blue-50 dark:bg-gray-600'
              }`}>
                <Star className={`${
                  pathname === '/dashboard/favorites'
                    ? 'text-white'
                    : 'text-blue-500 dark:text-blue-300'
                }`} />
              </div>
              <span className="font-medium">{t('dashboard.favorites')}</span>
            </div>
          </Link>
          
          {/* 点赞链接 */}
          <Link
            href="/dashboard/likes"
            onClick={() => sidebar.onClose()}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
              pathname === '/dashboard/likes'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600/70'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                pathname === '/dashboard/likes'
                  ? 'bg-blue-400'
                  : 'bg-blue-50 dark:bg-gray-600'
              }`}>
                <Heart className={`${
                  pathname === '/dashboard/likes'
                    ? 'text-white'
                    : 'text-blue-500 dark:text-blue-300'
                }`} />
              </div>
              <span className="font-medium">{t('dashboard.likes')}</span>
            </div>
          </Link>
          
          {/* 探索更多链接 */}
          <Link
            href="/"
            onClick={() => sidebar.onClose()}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-200 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600/70 mt-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-gray-600">
                <Compass className="text-blue-500 dark:text-blue-300" />
              </div>
              <span className="font-medium">{t('dashboard.explore')}</span>
            </div>
          </Link>
          
          {/* 语言切换按钮 */}
          <button
            onClick={() => {
              setLanguage(locale === 'zh' ? 'en' : 'zh')
              sidebar.onClose()
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-200 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600/70 mt-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-gray-600">
                <Globe className="text-blue-500 dark:text-blue-300" />
              </div>
              <span className="font-medium">{locale === 'zh' ? t('dashboard.toEnglish') : t('dashboard.toChinese')}</span>
            </div>
          </button>
          
          {/* 主题切换按钮 */}
          <button
            onClick={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark')
              sidebar.onClose()
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-200 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600/70 mt-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-gray-600">
                {theme === 'dark' ? (
                  <Sun className="text-blue-500 dark:text-blue-300" />
                ) : (
                  <Moon className="text-blue-500 dark:text-blue-300" />
                )}
              </div>
              <span className="font-medium">{theme === 'dark' ? t('dashboard.lightMode') : t('dashboard.darkMode')}</span>
            </div>
          </button>
          
          {/* 退出按钮 */}
          <button
            onClick={() => {
              signOut()
              sidebar.onClose()
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-200 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600/70 mt-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-gray-600">
                <LogOut className="text-blue-500 dark:text-blue-300" />
              </div>
              <span className="font-medium">{t('dashboard.logout')}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* 移动端菜单按钮 */}
      <div className="lg:hidden fixed top-3 left-4 z-50">
        <Sheet open={sidebar.isOpen} onOpenChange={sidebar.toggle}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative -left-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* 桌面端侧边栏 */}
      <div className="hidden lg:block h-full w-72">
        <SidebarContent />
      </div>
    </>
  )
} 
'use client'

import { Heart, Star, LogOut, Menu, User, Moon, Sun, Home, Compass, Globe, FileText, X, Bookmark } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'
import { useAuth } from '@/hooks/use-auth'
import { useSidebar } from '@/hooks/use-sidebar'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion } from 'framer-motion'

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
      icon: Bookmark,
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
                <Bookmark className={`${
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
          
          {/* 我的创造链接 */}
          <Link
            href="/dashboard/creations"
            onClick={() => sidebar.onClose()}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
              pathname === '/dashboard/creations'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600/70'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                pathname === '/dashboard/creations'
                  ? 'bg-blue-400'
                  : 'bg-blue-50 dark:bg-gray-600'
              }`}>
                <FileText className={`${
                  pathname === '/dashboard/creations'
                    ? 'text-white'
                    : 'text-blue-500 dark:text-blue-300'
                }`} />
              </div>
              <span className="font-medium">{t('dashboard.creations')}</span>
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
      <div className="lg:hidden fixed top-4 left-4 z-[100]">
        <Button 
          variant="outline" 
          size="icon" 
          className="relative bg-white/90 dark:bg-gray-700/90 border border-gray-200 dark:border-gray-600 shadow-md hover:bg-white dark:hover:bg-gray-600 backdrop-blur-sm w-10 h-10"
          onClick={sidebar.toggle}
        >
          <Menu className="h-5 w-5 text-gray-700 dark:text-white" />
        </Button>
      </div>
      
      {/* 移动端菜单内容 */}
      <AnimatePresence>
        {sidebar.isOpen && (
          <>
            {/* 遮罩层 */}
            <motion.div 
              className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[150]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={sidebar.onClose}
            />
            
            {/* 菜单面板 */}
            <motion.div 
              className="lg:hidden fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-800 shadow-xl z-[200] border-r border-gray-200 dark:border-gray-600 overflow-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="p-4 flex justify-end">
                <Button variant="ghost" size="icon" onClick={sidebar.onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 桌面端侧边栏 */}
      <div className="hidden lg:block h-full w-72">
        <SidebarContent />
      </div>
    </>
  )
} 
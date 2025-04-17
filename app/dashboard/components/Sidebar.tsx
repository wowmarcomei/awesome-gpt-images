'use client'

import { Heart, Star, LogOut, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'
import { useAuth } from '@/hooks/use-auth'
import { useSidebar } from '@/hooks/use-sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useI18n()
  const { signOut } = useAuth()
  const sidebar = useSidebar()

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
    <div className="flex flex-col h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* 导航菜单 */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => sidebar.onClose()} // 移动端点击导航后关闭侧边栏
            className={cn(
              'flex items-center px-4 py-2 text-sm font-medium rounded-md',
              item.current
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* 底部退出按钮 */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            signOut()
            sidebar.onClose()
          }}
        >
          <LogOut className="w-5 h-5 mr-3" />
          {t('dashboard.logout')}
        </Button>
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
      <div className="hidden lg:block h-full">
        <SidebarContent />
      </div>
    </>
  )
} 
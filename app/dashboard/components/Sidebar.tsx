'use client'

import { Heart, Star, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'
import { useAuth } from '@/hooks/use-auth'

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useI18n()
  const { signOut } = useAuth()

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

  return (
    <div className="flex flex-col w-64 bg-gray-50 dark:bg-gray-900">
      {/* 导航菜单 */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
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
          onClick={() => signOut()}
        >
          <LogOut className="w-5 h-5 mr-3" />
          {t('dashboard.logout')}
        </Button>
      </div>
    </div>
  )
} 
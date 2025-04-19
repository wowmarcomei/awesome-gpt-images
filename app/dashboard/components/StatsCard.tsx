'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'
import { useAuth } from '@/hooks/use-auth'
import { Heart, Star, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { collections } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { mockStats } from '../mock/data'

export function StatsCard() {
  const { t } = useI18n()
  const { user } = useAuth()
  const [stats, setStats] = useState({
    favorites: 0,
    likes: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 使用模拟数据进行初始化
    setStats(mockStats)
    setLoading(false)

    // 如果有用户登录，则获取真实数据
    if (user) {
      const fetchStats = async () => {
        setLoading(true)
        try {
          const [favoritesRes, likesRes] = await Promise.all([
            collections.getUserCollections(user.id, 'FAVORITE'),
            collections.getUserCollections(user.id, 'LIKE')
          ])
          
          setStats({
            favorites: favoritesRes.data?.length || 0,
            likes: likesRes.data?.length || 0
          })
        } catch (error) {
          console.error('获取统计数据失败:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchStats()
    }
  }, [user])

  const statItems = [
    {
      name: t('dashboard.favorites'),
      value: stats.favorites,
      href: '/dashboard/favorites',
      icon: Star,
      gradient: 'from-amber-500/10 to-yellow-500/10',
      iconGradient: 'from-amber-500 to-yellow-500',
      actionText: t('dashboard.view_all')
    },
    {
      name: t('dashboard.likes'),
      value: stats.likes,
      href: '/dashboard/likes',
      icon: Heart,
      gradient: 'from-pink-500/10 to-rose-500/10',
      iconGradient: 'from-pink-500 to-rose-500',
      actionText: t('dashboard.view_all')
    }
  ]

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full">
      {statItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full overflow-hidden border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-md">
            <CardContent className="p-6">
              <div className="relative h-full">
                {/* 背景装饰 */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-6 p-6 pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                </div>

                <div className="relative space-y-4">
                  {/* 标题和更多按钮 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${item.iconGradient} p-0.5`}>
                        <div className="h-full w-full rounded-[10px] bg-background flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* 数值显示 */}
                  <div className="text-center py-4">
                    <div className="text-5xl font-bold tracking-tight">
                      {loading ? '-' : item.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {t('dashboard.total_items')}
                    </div>
                  </div>

                  {/* 查看全部按钮 */}
                  <div className="text-center">
                    <Link href={item.href}>
                      <Button variant="outline" size="sm" className="w-full">
                        {item.actionText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
} 
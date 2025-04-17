'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n/context'
import { useAuth } from '@/hooks/use-auth'
import { Heart, Star } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { collections } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

export function StatsCard() {
  const { t } = useI18n()
  const { user } = useAuth()
  const [stats, setStats] = useState({
    favorites: 0,
    likes: 0
  })

  useEffect(() => {
    if (user) {
      // 获取收藏和点赞数量
      const fetchStats = async () => {
        const [favoritesRes, likesRes] = await Promise.all([
          collections.getUserCollections(user.id, 'FAVORITE'),
          collections.getUserCollections(user.id, 'LIKE')
        ])
        
        setStats({
          favorites: favoritesRes.data?.length || 0,
          likes: likesRes.data?.length || 0
        })
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
      iconGradient: 'from-amber-500 to-yellow-500'
    },
    {
      name: t('dashboard.likes'),
      value: stats.likes,
      href: '/dashboard/likes',
      icon: Heart,
      gradient: 'from-pink-500/10 to-rose-500/10',
      iconGradient: 'from-pink-500 to-rose-500'
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {statItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={item.href}>
            <Card className="group overflow-hidden border-0 bg-gradient-to-br from-background to-background hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="relative">
                  {/* 背景装饰 */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-6 p-6 pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                  </div>

                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${item.iconGradient} p-0.5`}>
                          <div className="h-full w-full rounded-[10px] bg-background flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </div>

                    <div className="pl-[52px]">
                      <div className="text-3xl font-bold tracking-tight">
                        {item.value}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
} 
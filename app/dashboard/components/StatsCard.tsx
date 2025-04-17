'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n/context'
import { useAuth } from '@/hooks/use-auth'
import { Heart, Star } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { collections } from '@/lib/supabase/client'

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

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Link href="/dashboard/favorites">
        <Card className="hover:bg-accent transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.favorites')}
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favorites}</div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/dashboard/likes">
        <Card className="hover:bg-accent transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.likes')}
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.likes}</div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
} 
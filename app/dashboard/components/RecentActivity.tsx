'use client'

import { useI18n } from '@/lib/i18n/context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { useEffect, useState } from 'react'
import { collections } from '@/lib/supabase/client'
import { Skeleton } from '@/components/ui/skeleton'
import { Heart, Star } from 'lucide-react'

interface Activity {
  id: string
  case_id: string
  type: 'LIKE' | 'FAVORITE'
  created_at: string
  case: {
    title: string
    image_url: string
  }
}

export function RecentActivity() {
  const { t } = useI18n()
  const { user } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const fetchActivities = async () => {
        setLoading(true)
        try {
          const { data } = await collections.getUserCollections(user.id)
          // TODO: 需要添加 case 表的关联查询
          setActivities(data || [])
        } finally {
          setLoading(false)
        }
      }

      fetchActivities()
    }
  }, [user])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!activities.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            {t('dashboard.no_activity')}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {activities.slice(0, 4).map((activity) => (
            <Card key={activity.id}>
              <CardContent className="p-0">
                {/* TODO: 替换为实际的案例卡片组件 */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute top-2 right-2 z-10">
                    {activity.type === 'FAVORITE' ? (
                      <Star className="w-4 h-4" />
                    ) : (
                      <Heart className="w-4 h-4" />
                    )}
                  </div>
                  <img
                    src={activity.case?.image_url || '/placeholder.png'}
                    alt={activity.case?.title || ''}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium truncate">
                    {activity.case?.title || activity.case_id}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 
'use client'

import { useI18n } from '@/lib/i18n/context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { useEffect, useState } from 'react'
import { collections } from '@/lib/supabase/client'
import { Skeleton } from '@/components/ui/skeleton'
import { Heart, Star, Clock, History } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

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
      <Card className="border-0 bg-gradient-to-br from-background to-background">
        <CardHeader className="px-6">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <History className="w-5 h-5 text-primary" />
            </div>
            <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!activities.length) {
    return (
      <Card className="border-0 bg-gradient-to-br from-background to-background">
        <CardHeader className="px-6">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <History className="w-5 h-5 text-primary" />
            </div>
            <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-medium">{t('dashboard.no_activity_title')}</p>
              <p className="text-sm text-muted-foreground max-w-sm">
                {t('dashboard.no_activity')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-gradient-to-br from-background to-background">
      <CardHeader className="px-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <History className="w-5 h-5 text-primary" />
          </div>
          <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {activities.slice(0, 4).map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/case/${activity.case_id}`}>
                <Card className="group overflow-hidden border-0 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                      <div className="absolute top-3 right-3 z-10">
                        <div className={`h-10 w-10 rounded-xl bg-black/30 backdrop-blur-md flex items-center justify-center`}>
                          {activity.type === 'FAVORITE' ? (
                            <Star className="w-5 h-5 text-yellow-400" />
                          ) : (
                            <Heart className="w-5 h-5 text-pink-500" />
                          )}
                        </div>
                      </div>
                      <img
                        src={activity.case?.image_url || '/placeholder.png'}
                        alt={activity.case?.title || ''}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                        {activity.case?.title || activity.case_id}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <time className="text-sm text-muted-foreground">
                          {new Date(activity.created_at).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 
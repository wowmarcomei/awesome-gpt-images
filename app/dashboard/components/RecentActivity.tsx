'use client'

import { useI18n } from '@/lib/i18n/context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Heart, Star, Clock, History, MoreHorizontal, MessageSquare, User, FileText, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import { useActivities, Activity } from '@/hooks/use-activities'

export function RecentActivity() {
  const { t, currentLang } = useI18n()
  const { activities, loading, error, getActivityText } = useActivities(10)

  // 根据活动类型获取图标和颜色
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create':
        return { icon: Plus, color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' }
      case 'FAVORITE':
        return { icon: Star, color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30' }
      case 'LIKE':
        return { icon: Heart, color: 'text-rose-500 bg-rose-100 dark:bg-rose-900/30' }
      case 'comment':
        return { icon: MessageSquare, color: 'text-green-500 bg-green-100 dark:bg-green-900/30' }
      case 'system':
        return { icon: User, color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30' }
      default:
        return { icon: FileText, color: 'text-gray-500 bg-gray-100 dark:bg-gray-800' }
    }
  }

  // 格式化时间
  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp)
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: currentLang === 'zh' ? zhCN : enUS
      })
    } catch (e) {
      return timestamp
    }
  }

  if (loading) {
    return (
      <Card className="border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <History className="w-5 h-5 text-primary" />
              </div>
              <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-4 w-[60%]" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!activities.length) {
    return (
      <Card className="border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <History className="w-5 h-5 text-primary" />
              </div>
              <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
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
    <Card className="border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-blue-900/30 flex items-center justify-center">
              <History className="w-5 h-5 text-primary dark:text-blue-300" />
            </div>
            <CardTitle className="dark:text-white">{t('dashboard.recent_activity')}</CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {activities.map((activity, index) => {
            const { icon: Icon, color } = getActivityIcon(activity.type)
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start space-x-4"
              >
                {/* 活动图标 */}
                <div className={`h-10 w-10 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                {/* 活动内容 */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium dark:text-white">
                    {getActivityText(activity.type)}
                  </p>
                  {activity.caseId && (
                    <Link 
                      href={`/case/${activity.caseId}`} 
                      className="text-xs text-primary hover:underline dark:text-blue-300"
                    >
                      {t('common.view_case')}
                    </Link>
                  )}
                </div>
                
                {/* 活动时间 */}
                <div className="text-xs text-muted-foreground dark:text-gray-300 whitespace-nowrap">
                  {formatTime(activity.createdAt)}
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

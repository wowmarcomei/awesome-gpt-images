import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth/context'
import { useI18n } from '@/lib/i18n/context'
import { toast } from 'sonner'
import { cases } from '@/lib/data'

export interface Activity {
  id: string
  type: 'LIKE' | 'FAVORITE' | string
  caseId: string
  createdAt: string
  caseTitle?: string
  imageUrl?: string
}

export function useActivities(limit: number = 10) {
  const { user, loading: authLoading } = useAuth()
  const { t, currentLang } = useI18n()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // 获取用户活动数据
  const fetchActivities = async () => {
    if (!user) {
      setActivities([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // 获取收藏和点赞数据
      const res = await fetch(`/api/collections?limit=${limit}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (!res.ok) {
        throw new Error(`请求失败: ${res.status}`)
      }
      
      const data = await res.json()
      console.log('API返回的活动数据:', data)
      
      // 处理数据格式
      let processedActivities: Activity[] = []
      
      // 处理收藏数据
      if (data.favorites && Array.isArray(data.favorites)) {
        const favoriteActivities = data.favorites.map((caseId: string) => {
          const caseData = cases.find(c => c.id === caseId)
          if (!caseData) return null
          
          return {
            id: `favorite-${caseId}`,
            type: 'FAVORITE',
            caseId,
            createdAt: new Date().toISOString(), // 没有时间戳，使用当前时间
            caseTitle: caseData ? (currentLang === 'zh' ? caseData.title.zh : caseData.title.en) : '未知案例',
            imageUrl: caseData.image
          }
        }).filter(Boolean)
        
        processedActivities = [...processedActivities, ...favoriteActivities]
      }
      
      // 处理点赞数据
      if (data.likes && Array.isArray(data.likes)) {
        const likeActivities = data.likes.map((caseId: string) => {
          const caseData = cases.find(c => c.id === caseId)
          if (!caseData) return null
          
          return {
            id: `like-${caseId}`,
            type: 'LIKE',
            caseId,
            createdAt: new Date().toISOString(), // 没有时间戳，使用当前时间
            caseTitle: caseData ? (currentLang === 'zh' ? caseData.title.zh : caseData.title.en) : '未知案例',
            imageUrl: caseData.image
          }
        }).filter(Boolean)
        
        processedActivities = [...processedActivities, ...likeActivities]
      }
      
      // 如果有items数组，也处理它
      if (data.items && Array.isArray(data.items)) {
        const itemActivities = data.items.map((item: any) => {
          if (!item || !item.case_id) return null
          
          const caseData = cases.find(c => c.id === item.case_id)
          return {
            id: item.id || `activity-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            type: item.type || 'UNKNOWN',
            caseId: item.case_id,
            createdAt: item.created_at || new Date().toISOString(),
            caseTitle: caseData ? (currentLang === 'zh' ? caseData.title.zh : caseData.title.en) : '未知案例',
            imageUrl: caseData?.image
          }
        }).filter(Boolean)
        
        processedActivities = [...processedActivities, ...itemActivities]
      }
      
      // 按时间排序，最新的在前面
      processedActivities.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      
      // 限制数量
      processedActivities = processedActivities.slice(0, limit)
      
      setActivities(processedActivities)
    } catch (err) {
      console.error('获取活动数据失败:', err)
      setError(err instanceof Error ? err : new Error(String(err)))
      // 不显示toast，因为这可能会导致用户体验不佳
      // toast.error(t('error.fetch_failed'))
    } finally {
      setLoading(false)
    }
  }

  // 当用户变化时获取数据
  useEffect(() => {
    fetchActivities()
  }, [user, currentLang])

  // 获取活动文本描述
  const getActivityText = (type: string) => {
    switch (type) {
      case 'FAVORITE':
        return t('activity.favorited')
      case 'LIKE':
        return t('activity.liked')
      default:
        return t('activity.interacted')
    }
  }

  return {
    activities,
    loading: authLoading || loading,
    error,
    refresh: fetchActivities,
    getActivityText
  }
}

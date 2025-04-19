import useSWR from 'swr'
import { useAuth } from '@/lib/auth/context'
import { useI18n } from '@/lib/i18n/context'
import { toast } from 'sonner'
import { cases } from '@/lib/data'

export interface Activity {
  id: string
  type: 'LIKE' | 'FAVORITE'
  caseId: string
  createdAt: string
  caseTitle?: string
  imageUrl?: string
}

export function useActivities(limit: number = 10) {
  const { user, loading: authLoading } = useAuth()
  const { t, currentLang } = useI18n()

  // 获取用户活动数据
  const { data, error, isLoading, mutate } = useSWR<Activity[]>(
    user ? `/api/collections?limit=${limit}` : null,
    async (url) => {
      const res = await fetch(url, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (!res.ok) {
        throw new Error('Failed to fetch activities')
      }
      
      const data = await res.json()
      
      // 如果返回的是分页格式，获取items
      const items = data.items || data
      
      // 将API返回的数据与案例数据关联，添加标题和图片URL
      return items.map((item: any) => {
        const caseData = cases.find(c => c.id === item.case_id)
        return {
          id: item.id,
          type: item.type,
          caseId: item.case_id,
          createdAt: item.created_at,
          caseTitle: caseData ? (currentLang === 'zh' ? caseData.title.zh : caseData.title.en) : undefined,
          imageUrl: caseData?.image
        }
      })
    },
    {
      onError: (err) => {
        console.error('Error fetching activities:', err)
        toast.error(t('error.fetch_failed'))
      },
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 60000 // 1分钟内不重复请求
    }
  )

  // 获取活动文本描述
  const getActivityText = (type: string, title?: string) => {
    if (!title) return t('activity.unknown')
    
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
    activities: data || [],
    loading: authLoading || isLoading,
    error,
    refresh: mutate,
    getActivityText
  }
}

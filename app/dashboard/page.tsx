'use client'

import { ContentSection } from './components/ContentSection'
import { ContentCarousel } from './components/ContentCarousel'
import { RecentActivity } from './components/RecentActivity'
import { useI18n } from '@/lib/i18n/context'
import { useAuth } from '@/hooks/use-auth'
import { useCollections } from '@/hooks/use-collections'
import { ContentItem } from './components/ContentCard'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { cases } from '@/lib/data'

export default function DashboardPage() {
  const { t, currentLang } = useI18n()
  const { user } = useAuth()
  const router = useRouter()
  
  // 使用 useCollections hook 获取收藏和点赞数据
  const { 
    collections, 
    loading, 
    toggleCollection,
    isLiked,
    isFavorited
  } = useCollections()
  
  // 如果用户未登录，显示登录提示
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <h1 className="text-2xl font-bold">{t('auth.login_required')}</h1>
        <p className="text-muted-foreground">{t('auth.dialog.like_description')}</p>
        <Button onClick={() => router.push('/auth/login')}>
          {t('auth.login')}
        </Button>
      </div>
    )
  }
  
  // 将收藏和点赞的 case_id 转换为 ContentItem 数组
  const getFavoriteItems = (): ContentItem[] => {
    return collections.favorites
      .map(caseId => {
        const caseData = cases.find(c => c.id === caseId)
        if (!caseData) return null
        
        return {
          id: caseData.id,
          title: currentLang === 'zh' ? caseData.title.zh : caseData.title.en,
          description: (currentLang === 'zh' ? caseData.prompt.zh : caseData.prompt.en).substring(0, 100) + '...',
          imageUrl: caseData.image,
          createdAt: new Date().toISOString(),
          isLiked: isLiked(caseData.id),
          isFavorited: true
        }
      })
      .filter(Boolean) as ContentItem[]
  }
  
  const getLikeItems = (): ContentItem[] => {
    return collections.likes
      .map(caseId => {
        const caseData = cases.find(c => c.id === caseId)
        if (!caseData) return null
        
        return {
          id: caseData.id,
          title: currentLang === 'zh' ? caseData.title.zh : caseData.title.en,
          description: (currentLang === 'zh' ? caseData.prompt.zh : caseData.prompt.en).substring(0, 100) + '...',
          imageUrl: caseData.image,
          createdAt: new Date().toISOString(),
          isLiked: true,
          isFavorited: isFavorited(caseData.id)
        }
      })
      .filter(Boolean) as ContentItem[]
  }
  
  // 处理点赞操作
  const handleToggleLike = (id: string) => {
    toggleCollection(id, 'LIKE')
  }
  
  // 处理收藏操作
  const handleToggleFavorite = (id: string) => {
    toggleCollection(id, 'FAVORITE')
  }

  return (
    <div className="space-y-8">
      {/* 我的收藏区域 - 轮播图形式 */}
      <ContentCarousel
        title={t('dashboard.favorites')}
        viewAllLink="/dashboard/favorites"
        items={getFavoriteItems()}
        loading={loading}
        onToggleLike={handleToggleLike}
        onToggleFavorite={handleToggleFavorite}
      />
      
      {/* 我的点赞区域 - 轮播图形式，禁用自动轮播 */}
      <ContentCarousel
        title={t('dashboard.likes')}
        viewAllLink="/dashboard/likes"
        items={getLikeItems()}
        loading={loading}
        onToggleLike={handleToggleLike}
        onToggleFavorite={handleToggleFavorite}
        autoPlay={false} // 禁用自动轮播，用户需要手动点击切换
      />
      
      {/* 最近活动 */}
      <RecentActivity />
    </div>
  )
} 
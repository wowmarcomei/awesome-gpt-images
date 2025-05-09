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
import { ChevronLeft } from 'lucide-react'

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
      <div className="flex flex-col items-center justify-center space-y-6 py-16 max-w-md mx-auto text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{t('auth.login_required')}</h1>
          <p className="text-muted-foreground text-lg">{t('auth.dialog.like_description')}</p>
        </div>
        <Button 
          size="lg" 
          className="w-full sm:w-auto px-8 py-6 text-lg font-medium animate-pulse" 
          onClick={() => router.push('/auth')}
        >
          {t('auth.dialog.login')}
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
          isFavorited: true,
          author: caseData.author.name,
          authorUrl: caseData.author.twitter
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
          isFavorited: isFavorited(caseData.id),
          author: caseData.author.name,
          authorUrl: caseData.author.twitter
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
      {/* 面包屑导航 */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-fit flex items-center text-muted-foreground hover:text-foreground -ml-2"
          onClick={() => router.push('/')}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t('common.back')}
        </Button>
      </div>
      
      {/* 我的书签区域 - 轮播图形式 */}
      <ContentCarousel
        title={t('dashboard.bookmark')}
        viewAllLink="/dashboard/bookmark"
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
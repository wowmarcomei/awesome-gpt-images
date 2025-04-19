'use client'

import { CaseGrid } from '../components/CaseGrid'
import { CollectionLayout } from '../components/CollectionLayout'
import { useCollections } from '@/hooks/use-collections'
import { useI18n } from '@/lib/i18n/context'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { cases } from '@/lib/data'

export default function FavoritesPage() {
  const { t, currentLang } = useI18n()
  const { user } = useAuth()
  const router = useRouter()
  const {
    collections,
    loading: isLoading,
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
          <p className="text-muted-foreground text-lg">{t('auth.dialog.favorite_description')}</p>
        </div>
        <Button 
          size="lg" 
          className="w-full sm:w-auto px-8 py-6 text-lg font-medium animate-pulse" 
          onClick={() => router.push('/auth/login')}
        >
          {t('auth.dialog.login')}
        </Button>
      </div>
    )
  }
  
  // 将收藏的 case_id 转换为案例数据
  const favoriteCases = collections.favorites
    .map(caseId => {
      const caseData = cases.find(c => c.id === caseId)
      if (!caseData) return null
      
      return {
        id: caseData.id,
        title: currentLang === 'zh' ? caseData.title.zh : caseData.title.en,
        imageUrl: caseData.image,
        likes: 0, // 暂无真实数据
        favorites: 0, // 暂无真实数据
        isLiked: isLiked(caseData.id),
        isFavorited: true,
        author: {
          name: caseData.author.name,
          twitter: caseData.author.twitter
        },
        prompt: currentLang === 'zh' ? caseData.prompt.zh : caseData.prompt.en,
        originalLink: caseData.originalLink,
        createdAt: new Date().toISOString() // 暂时使用当前时间
      }
    })
    .filter(Boolean)

  return (
    <CollectionLayout
      title={t('dashboard.favorites')}
      description={t('dashboard.favorites_description')}
    >
      {favoriteCases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center bg-muted/20 rounded-xl border border-border p-8">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-4xl">⭐</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">{t('dashboard.no_favorites')}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t('common.no_items_description')}
            </p>
          </div>
          <Button 
            size="lg"
            className="px-6"
            onClick={() => router.push('/')}
          >
            {t('dashboard.explore')}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {t('dashboard.total_items')}: {favoriteCases.length}
            </p>
            {/* 批量操作按钮可以在这里添加 */}
          </div>
          
          <CaseGrid
            cases={favoriteCases}
            isLoading={isLoading}
            hasMore={false}
            onLoadMore={() => {}}
            onLike={(id) => toggleCollection(id, 'LIKE')}
            onFavorite={(id) => toggleCollection(id, 'FAVORITE')}
          />
        </div>
      )}
    </CollectionLayout>
  )
}
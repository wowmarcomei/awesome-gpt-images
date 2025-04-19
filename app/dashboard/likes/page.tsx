'use client'

import { CaseGrid } from '../components/CaseGrid'
import { useCollections } from '@/hooks/use-collections'
import { useI18n } from '@/lib/i18n/context'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { cases } from '@/lib/data'

export default function LikesPage() {
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
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <h1 className="text-2xl font-bold">{t('auth.login_required')}</h1>
        <p className="text-muted-foreground">{t('auth.dialog.like_description')}</p>
        <Button onClick={() => router.push('/auth')}>
          {t('auth.login')}
        </Button>
      </div>
    )
  }
  
  // 将点赞的 case_id 转换为案例数据
  const likeCases = collections.likes
    .map(caseId => {
      const caseData = cases.find(c => c.id === caseId)
      if (!caseData) return null
      
      return {
        id: caseData.id,
        title: currentLang === 'zh' ? caseData.title.zh : caseData.title.en,
        imageUrl: caseData.image,
        likes: 0, // 暂无真实数据
        favorites: 0, // 暂无真实数据
        isLiked: true,
        isFavorited: isFavorited(caseData.id)
      }
    })
    .filter(Boolean)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('dashboard.likes')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('dashboard.likes_description')}
        </p>
      </div>

      {likeCases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl">❤️</span>
          </div>
          <h3 className="text-lg font-medium">{t('dashboard.no_likes')}</h3>
          <p className="text-muted-foreground max-w-md">
            {t('common.no_items_description')}
          </p>
          <Button onClick={() => router.push('/')}>
            {t('dashboard.explore')}
          </Button>
        </div>
      ) : (
        <CaseGrid
          cases={likeCases}
          isLoading={isLoading}
          hasMore={false}
          onLoadMore={() => {}}
          onLike={(id) => toggleCollection(id, 'LIKE')}
          onFavorite={(id) => toggleCollection(id, 'FAVORITE')}
        />
      )}
    </div>
  )
}
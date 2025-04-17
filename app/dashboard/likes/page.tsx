'use client'

import { CaseGrid } from '../components/CaseGrid'
import { useCollections } from '@/hooks/use-collections'
import { useI18n } from '@/lib/i18n/context'

export default function LikesPage() {
  const { t } = useI18n()
  const {
    items,
    hasMore,
    isLoading,
    loadMore,
    add: addLike,
    remove: removeLike,
    optimisticFavorites,
    optimisticLikes
  } = useCollections('LIKE')

  const cases = items.map((item) => ({
    id: item.caseId,
    title: 'Case Title', // TODO: 从 API 获取案例详情
    imageUrl: '/placeholder.jpg', // TODO: 从 API 获取案例图片
    likes: 0, // TODO: 从 API 获取点赞数
    favorites: 0, // TODO: 从 API 获取收藏数
    isLiked: optimisticLikes.has(item.caseId),
    isFavorited: optimisticFavorites.has(item.caseId)
  }))

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

      <CaseGrid
        cases={cases}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onLike={(id) =>
          optimisticLikes.has(id) ? removeLike(id) : addLike(id)
        }
        onFavorite={() => {}} // TODO: 实现收藏功能
      />
    </div>
  )
} 
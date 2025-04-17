'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Heart, Star } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'

interface Case {
  id: string
  title: string
  imageUrl: string
  likes: number
  favorites: number
  isLiked: boolean
  isFavorited: boolean
}

interface CaseGridProps {
  cases: Case[]
  isLoading: boolean
  hasMore: boolean
  onLoadMore: () => void
  onLike: (id: string) => void
  onFavorite: (id: string) => void
}

export function CaseGrid({
  cases,
  isLoading,
  hasMore,
  onLoadMore,
  onLike,
  onFavorite
}: CaseGridProps) {
  const { t } = useI18n()
  const { ref, inView } = useInView()

  // 当滚动到底部时加载更多
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      onLoadMore()
    }
  }, [inView, hasMore, isLoading, onLoadMore])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cases.map((item) => (
        <div
          key={item.id}
          className="group relative bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* 图片容器 */}
          <div className="relative aspect-[4/3]">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* 卡片信息 */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {item.title}
            </h3>

            {/* 操作按钮 */}
            <div className="flex items-center justify-between mt-2">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'gap-2',
                  item.isLiked && 'text-pink-500 dark:text-pink-400'
                )}
                onClick={() => onLike(item.id)}
              >
                <Heart className="w-4 h-4" />
                <span>{item.likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'gap-2',
                  item.isFavorited && 'text-yellow-500 dark:text-yellow-400'
                )}
                onClick={() => onFavorite(item.id)}
              >
                <Star className="w-4 h-4" />
                <span>{item.favorites}</span>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* 加载更多触发器 */}
      {hasMore && (
        <div ref={ref} className="col-span-full flex justify-center p-4">
          {isLoading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          )}
        </div>
      )}

      {/* 无数据提示 */}
      {!isLoading && cases.length === 0 && (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          {t('dashboard.no_items')}
        </div>
      )}
    </div>
  )
} 
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cases.map((item) => (
        <div
          key={item.id}
          className="group relative bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          {/* 图片容器 */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            
            {/* 漂浮按钮容器 */}
            <div className="absolute top-2 right-2 flex space-x-1">
              <Button
                variant="secondary"
                size="icon"
                className={cn(
                  'h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-sm',
                  item.isLiked ? 'text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300' : 'text-muted-foreground hover:text-foreground'
                )}
                onClick={() => onLike(item.id)}
              >
                <Heart className={cn('h-4 w-4', item.isLiked && 'fill-current')} />
              </Button>
              
              <Button
                variant="secondary"
                size="icon"
                className={cn(
                  'h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-sm',
                  item.isFavorited ? 'text-yellow-500 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300' : 'text-muted-foreground hover:text-foreground'
                )}
                onClick={() => onFavorite(item.id)}
              >
                <Star className={cn('h-4 w-4', item.isFavorited && 'fill-current')} />
              </Button>
            </div>
          </div>

          {/* 卡片信息 */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-muted-foreground group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            
            {/* 统计信息 */}
            <div className="flex items-center text-sm text-muted-foreground mt-2 space-x-4">
              <div className="flex items-center">
                <Heart className="w-3.5 h-3.5 mr-1.5" />
                <span>{item.likes || 0}</span>
              </div>
              
              <div className="flex items-center">
                <Star className="w-3.5 h-3.5 mr-1.5" />
                <span>{item.favorites || 0}</span>
              </div>
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
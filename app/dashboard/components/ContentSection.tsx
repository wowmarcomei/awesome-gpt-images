'use client'

import { useI18n } from '@/lib/i18n/context'
import Link from 'next/link'
import { ContentCard, ContentItem } from './ContentCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'

interface ContentSectionProps {
  title: string
  viewAllLink: string
  items: ContentItem[]
  loading: boolean
  onToggleLike: (id: string) => void
  onToggleFavorite: (id: string) => void
}

export function ContentSection({
  title,
  viewAllLink,
  items,
  loading,
  onToggleLike,
  onToggleFavorite
}: ContentSectionProps) {
  const { t } = useI18n()

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <Link href={viewAllLink}>
          <Button variant="link" className="text-primary p-0 h-auto font-normal">
            {t('dashboard.view_all')}
          </Button>
        </Link>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-1/5" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
          <p className="text-muted-foreground">
            {title === t('dashboard.favorites') 
              ? t('dashboard.no_bookmark') 
              : t('dashboard.no_likes')}
          </p>
          <Link href="/">
            <Button variant="outline" className="mt-4">
              {t('dashboard.explore')}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ContentCard
                item={item}
                onToggleLike={onToggleLike}
                onToggleFavorite={onToggleFavorite}
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}

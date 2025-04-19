'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Heart, Star, Calendar, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import { useI18n } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface ActionButtonProps {
  icon: any
  onClick: () => void
  active: boolean
  className?: string
}

function ActionButton({ icon: Icon, onClick, active, className }: ActionButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      }}
      className={cn(
        'h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center transition-all',
        'hover:bg-white dark:hover:bg-gray-700 shadow-sm',
        className
      )}
    >
      <Icon
        className={cn(
          'w-4 h-4',
          active
            ? 'text-primary fill-primary'
            : 'text-gray-600 dark:text-gray-300'
        )}
      />
    </button>
  )
}

export interface ContentItem {
  id: string
  title: string
  description: string
  imageUrl: string
  createdAt: string
  isLiked: boolean
  isFavorited: boolean
  tags?: string[]
}

interface ContentCardProps {
  item: ContentItem
  onToggleLike: (id: string) => void
  onToggleFavorite: (id: string) => void
}

export function ContentCard({ item, onToggleLike, onToggleFavorite }: ContentCardProps) {
  const { t, currentLang } = useI18n()
  const [timeKey, setTimeKey] = useState(Date.now()) // 用于强制更新时间显示
  
  // 格式化时间
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: currentLang === 'zh' ? zhCN : enUS
      })
    } catch (e) {
      return dateString
    }
  }
  
  // 每分钟更新一次时间显示
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeKey(Date.now())
    }, 60000) // 每分钟更新一次
    
    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="group overflow-hidden hover:shadow-md hover:shadow-blue-900/10 dark:hover:shadow-blue-500/5 transition-all duration-300 h-full border border-gray-100 dark:border-gray-500 bg-white dark:bg-gray-700">
      <Link href={`/case/${item.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image 
            src={item.imageUrl} 
            alt={item.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* 移除了收藏与喜欢浮动按钮 */}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-1 dark:text-white">{item.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-200 mt-1 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-1 text-xs text-gray-400 dark:text-gray-300">
              <Calendar className="w-3 h-3" />
              <span key={timeKey}>{formatDate(item.createdAt)}</span>
            </div>
            <div className="text-xs text-primary dark:text-blue-300 hover:underline hover:text-blue-600 dark:hover:text-blue-200 flex items-center gap-1 font-medium">
              <span>{t('dashboard.view_details')}</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

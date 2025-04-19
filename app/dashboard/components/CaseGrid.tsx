'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Heart, Star, Eye, Bookmark, Heart as HeartIcon } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'
import { motion, AnimatePresence } from 'framer-motion'
import { FaXTwitter } from 'react-icons/fa6'

interface Case {
  id: string
  title: string
  imageUrl: string
  likes: number
  favorites: number
  isLiked: boolean
  isFavorited: boolean
  author?: {
    name: string
    twitter?: string
  }
  prompt?: string
  createdAt?: string
  originalLink?: string
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

  const [showPrompt, setShowPrompt] = useState<string | null>(null)
  const [showCopied, setShowCopied] = useState(false)
  const [activeToast, setActiveToast] = useState<{id: string, type: 'like' | 'favorite', isActive: boolean} | null>(null)
  
  // 处理提示词复制
  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }
  
  // 处理显示提示词并自动复制
  const handleShowPrompt = (prompt: string | null) => {
    setShowPrompt(prompt)
    if (prompt) {
      handleCopyPrompt(prompt)
    }
  }
  
  // 处理点赞/收藏后的提示
  const handleAction = (id: string, type: 'like' | 'favorite', callback: (id: string) => void, currentStatus: boolean) => {
    callback(id)
    setActiveToast({id, type, isActive: !currentStatus})
    setTimeout(() => setActiveToast(null), 2000)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cases.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
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
          </div>

          {/* 卡片信息 */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-muted-foreground group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            
            {/* 作者信息与原始链接 */}
            <div className="flex items-center justify-between mb-3">
              {item.author && (
                <a
                  href={item.author.twitter || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {item.author.twitter && <FaXTwitter className="w-3.5 h-3.5" />}
                  <span>{item.author.name}</span>
                </a>
              )}
              
              {item.originalLink && (
                <a
                  href={item.originalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span>{t('common.original')}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </div>
            
            {/* Prompt 信息 */}
            {item.prompt && (
              <div className="mt-3 mb-4">
                <div className="bg-muted rounded-md p-3 relative overflow-hidden">
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap line-clamp-3 font-mono">
                    {item.prompt}
                  </pre>
                </div>
              </div>
            )}
            
            {/* 按钮与统计信息 */}
            <div className="flex items-center justify-between mt-3">
              {/* 点赞与收藏按钮 */}
              <div className="flex space-x-2">
                <motion.div whileTap={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-10 w-10 rounded-full transition-all duration-300",
                      "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600",
                      "relative overflow-visible",
                      item.isLiked && "bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400"
                    )}
                    onClick={() => handleAction(item.id, 'like', onLike, item.isLiked)}
                  >
                    <HeartIcon
                      className={cn(
                        "h-4 w-4 transition-colors duration-200",
                        item.isLiked ? "fill-red-500 text-red-500" : "text-red-500/70 dark:text-red-400/70"
                      )}
                    />
                    <AnimatePresence>
                      {activeToast?.id === item.id && activeToast?.type === 'like' && (
                        <motion.div
                          initial={{ opacity: 0, y: 0, scale: 0.9 }}
                          animate={{ opacity: 1, y: -40, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="absolute top-0 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-full text-sm
                            bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700
                            flex items-center gap-1.5"
                        >
                          <span className="text-base">{activeToast?.isActive ? '❤️' : '🤍'}</span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {activeToast?.isActive ? t('activity.liked') : t('activity.unliked')}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
                
                <motion.div whileTap={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-10 w-10 rounded-full transition-all duration-300",
                      "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600",
                      "relative overflow-visible",
                      item.isFavorited && "bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400"
                    )}
                    onClick={() => handleAction(item.id, 'favorite', onFavorite, item.isFavorited)}
                  >
                    <Bookmark
                      className={cn(
                        "h-4 w-4 transition-colors duration-200",
                        item.isFavorited ? "fill-blue-500 text-blue-500" : "text-blue-500/70 dark:text-blue-400/70"
                      )}
                    />
                    <AnimatePresence>
                      {activeToast?.id === item.id && activeToast?.type === 'favorite' && (
                        <motion.div
                          initial={{ opacity: 0, y: 0, scale: 0.9 }}
                          animate={{ opacity: 1, y: -40, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="absolute top-0 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-full text-sm
                            bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700
                            flex items-center gap-1.5"
                        >
                          <span className="text-base">{activeToast?.isActive ? '📚' : '☆'}</span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {activeToast?.isActive ? t('activity.bookmarked') : t('activity.unbookmarked')}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
                
                {/* 查看提示词按钮 */}
                {item.prompt && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs px-2 py-1 h-8 bg-background/80 backdrop-blur-sm shadow-sm text-muted-foreground hover:text-primary border border-border rounded-full"
                      onClick={() => handleShowPrompt(item.prompt || null)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" />
                      {t('common.getPrompt')}
                    </Button>
                  </motion.div>
                )}
              </div>
              
              {/* 创建时间 */}
              {item.createdAt && (
                <span className="text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </motion.div>
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

      {/* 提示词模态框 */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPrompt(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {t('common.getPrompt')}
                </h3>
                <div className="flex items-center gap-4">
                  {showCopied && (
                    <span className="text-sm text-green-500 dark:text-green-400">✓ {t('common.copied')}</span>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyPrompt(showPrompt)}
                    className="border-border text-muted-foreground hover:bg-background/80 transition-colors"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {t('common.copy')}
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {showPrompt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 
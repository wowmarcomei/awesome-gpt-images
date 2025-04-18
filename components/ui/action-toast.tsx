'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ActionToastProps {
  isVisible: boolean
  type: 'like' | 'favorite'
  action: 'add' | 'remove'
  className?: string
}

export function ActionToast({ isVisible, type, action, className }: ActionToastProps) {
  const icon = type === 'like' ? '❤️' : '⭐️'
  const text = action === 'add' ? '已' + (type === 'like' ? '点赞' : '收藏') : '已取消' + (type === 'like' ? '点赞' : '收藏')

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute -top-12 left-1/2 -translate-x-1/2",
            "px-3 py-1.5 rounded-full text-sm",
            "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm",
            "shadow-lg shadow-black/5 dark:shadow-black/20",
            "border border-gray-200 dark:border-gray-700",
            "flex items-center gap-1.5",
            className
          )}
        >
          <span className="text-base">{icon}</span>
          <span className="text-gray-700 dark:text-gray-300">{text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 
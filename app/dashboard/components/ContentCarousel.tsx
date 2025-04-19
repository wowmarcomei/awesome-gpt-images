'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContentItem } from './ContentCard'
import { ContentCard } from './ContentCard'
import { useI18n } from '@/lib/i18n/context'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ContentCarouselProps {
  title: string
  viewAllLink: string
  items: ContentItem[]
  loading: boolean
  onToggleLike: (id: string) => void
  onToggleFavorite: (id: string) => void
  autoPlay?: boolean // 是否自动轮播
}

export function ContentCarousel({
  title,
  viewAllLink,
  items,
  loading,
  onToggleLike,
  onToggleFavorite,
  autoPlay = true // 默认启用自动轮播
}: ContentCarouselProps) {
  const { t } = useI18n()
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // 每页显示的卡片数量
  const getItemsPerPage = () => {
    if (typeof window === 'undefined') return 3 // 默认值
    
    // 基于屏幕宽度响应式调整
    if (window.innerWidth < 640) return 1 // 移动设备
    if (window.innerWidth < 1024) return 2 // 平板/小屏幕
    return 3 // 桌面设备
  }
  
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage())
  
  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage())
    }
    
    window.addEventListener('resize', handleResize)
    handleResize() // 初始化
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // 计算总页数，对于滑动窗口模式，总页数等于项目数
  const totalPages = items.length <= itemsPerPage ? 1 : items.length

  // 自动轮播
  useEffect(() => {
    if (totalPages <= 1 || !autoPlay) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 5000)

    return () => clearInterval(interval)
  }, [totalPages, autoPlay])

  const handlePrevious = () => {
    if (totalPages <= 1) return
    setDirection(-1)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleNext = () => {
    if (totalPages <= 1) return
    setDirection(1)
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  // 获取当前页的卡片，使用滑动窗口模式
  const getCurrentPageItems = () => {
    // 如果项目总数小于等于每页显示数量，直接返回所有项目
    if (items.length <= itemsPerPage) {
      return items
    }
    
    // 使用滑动窗口模式，确保每次只滑动一个卡片
    const startIndex = currentPage % items.length
    let result = []
    
    // 从当前索引开始收集卡片
    for (let i = 0; i < itemsPerPage; i++) {
      // 使用模运算确保索引在有效范围内循环
      const index = (startIndex + i) % items.length
      result.push(items[index])
    }
    
    return result
  }
  
  // 根据卡片数量动态计算高度
  const getContainerHeight = () => {
    if (itemsPerPage === 1) return 'h-[600px]' // 单卡片时高度更大
    if (itemsPerPage === 2) return 'h-[550px]' // 两卡片时高度适中
    return 'h-[500px]' // 三卡片时高度较小
  }

  // 轮播图动画变体
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  }

  // 加载状态显示
  if (loading) {
    return (
      <div className="w-full h-[550px] sm:h-[580px] md:h-[600px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
    )
  }

  // 无内容显示
  if (items.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
        <p className="text-muted-foreground">
          {title === t('dashboard.favorites') 
            ? t('dashboard.no_favorites') 
            : t('dashboard.no_likes')}
        </p>
        <Link href="/">
          <Button variant="outline" className="mt-4">
            {t('dashboard.explore')}
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <Link href={viewAllLink}>
          <Button variant="outline" className="bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 dark:text-blue-300 border-blue-200 dark:border-blue-800 font-medium rounded-full px-4 py-1 text-sm flex items-center gap-1">
            {t('dashboard.view_all')}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
      
      <div 
        ref={carouselRef}
        className={`relative ${getContainerHeight()} overflow-hidden rounded-lg border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700`}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 p-4 flex items-center justify-center gap-4"
          >
            {getCurrentPageItems().map((item) => (
              <div key={item.id} className={cn(
                "flex-1 h-full",
                itemsPerPage === 1 ? "max-w-full" : 
                itemsPerPage === 2 ? "max-w-[calc(50%-8px)]" : "max-w-[calc(33.333%-16px)]"
              )}>
                <ContentCard
                  item={item}
                  onToggleLike={onToggleLike}
                  onToggleFavorite={onToggleFavorite}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* 左右箭头 */}
        <button
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-700/90 flex items-center justify-center z-10 hover:bg-white dark:hover:bg-gray-600 shadow-md hover:shadow-lg transition-all duration-200"
          disabled={items.length <= 1}
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-700/90 flex items-center justify-center z-10 hover:bg-white dark:hover:bg-gray-600 shadow-md hover:shadow-lg transition-all duration-200"
          disabled={items.length <= 1}
        >
          <ChevronRight className="w-6 h-6 text-gray-700 dark:text-white" />
        </button>
        
        {/* 指示器 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentPage ? 1 : -1)
                setCurrentPage(index)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentPage
                  ? 'bg-primary dark:bg-blue-400 w-4'
                  : 'bg-gray-300 dark:bg-gray-500'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

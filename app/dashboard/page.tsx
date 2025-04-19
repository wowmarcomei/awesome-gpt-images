'use client'

import { ContentSection } from './components/ContentSection'
import { ContentCarousel } from './components/ContentCarousel'
import { RecentActivity } from './components/RecentActivity'
import { useI18n } from '@/lib/i18n/context'
import { useState, useEffect } from 'react'
import { mockFavorites, mockLikes } from './mock/data'
import { ContentItem } from './components/ContentCard'

export default function DashboardPage() {
  const { t } = useI18n()
  const [favorites, setFavorites] = useState<ContentItem[]>([])
  const [likes, setLikes] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟数据加载
    const loadData = async () => {
      setLoading(true)
      try {
        // 在真实应用中，这里会从 API 获取数据
        // 目前使用模拟数据
        setTimeout(() => {
          setFavorites(mockFavorites)
          setLikes(mockLikes)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error('加载数据失败:', error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleToggleLike = (id: string) => {
    // 在真实应用中，这里会调用 API 来更新点赞状态
    setLikes(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    )
    
    // 如果取消点赞，可能需要从列表中移除
    setLikes(prev => prev.filter(item => item.isLiked))
  }

  const handleToggleFavorite = (id: string) => {
    // 在真实应用中，这里会调用 API 来更新收藏状态
    setFavorites(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isFavorited: !item.isFavorited } : item
      )
    )
    
    // 如果取消收藏，可能需要从列表中移除
    setFavorites(prev => prev.filter(item => item.isFavorited))
  }

  return (
    <div className="space-y-8">
      {/* 我的收藏区域 - 轮播图形式 */}
      <ContentCarousel
        title={t('dashboard.favorites')}
        viewAllLink="/dashboard/favorites"
        items={favorites}
        loading={loading}
        onToggleLike={handleToggleLike}
        onToggleFavorite={handleToggleFavorite}
      />
      
      {/* 我的点赞区域 - 轮播图形式，禁用自动轮播 */}
      <ContentCarousel
        title={t('dashboard.likes')}
        viewAllLink="/dashboard/likes"
        items={likes}
        loading={loading}
        onToggleLike={handleToggleLike}
        onToggleFavorite={handleToggleFavorite}
        autoPlay={false} // 禁用自动轮播，用户需要手动点击切换
      />
      
      {/* 最近活动 */}
      <RecentActivity />
    </div>
  )
} 
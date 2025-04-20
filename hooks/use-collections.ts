import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { create } from 'zustand'
import { useAuth } from '@/lib/auth/context'
import { toast } from 'sonner'
import { useI18n } from '@/lib/i18n/context'
import { useEffect } from 'react'
import { cases } from '@/lib/data'

interface Collection {
  id: string
  caseId: string
  type: 'LIKE' | 'FAVORITE'
  createdAt: string
  updatedAt: string
}

interface CollectionResponse {
  items: Collection[]
  nextCursor?: string
  hasMore: boolean
}

interface Collections {
  likes: string[]
  favorites: string[]
}

interface CollectionsStore {
  // 服务器状态
  serverLikes: Set<string>
  serverFavorites: Set<string>
  // 乐观更新状态
  optimisticLikes: Set<string>
  optimisticFavorites: Set<string>
  // 初始化状态
  initialized: boolean
  userId: string | null
  // Actions
  initializeFromServer: (userId: string, likes: string[], favorites: string[]) => void
  addOptimisticLike: (caseId: string) => void
  removeOptimisticLike: (caseId: string) => void
  addOptimisticFavorite: (caseId: string) => void
  removeOptimisticFavorite: (caseId: string) => void
  reset: () => void
}

// 乐观更新状态管理
export const useCollectionsStore = create<CollectionsStore>((set) => ({
  // 初始状态
  serverLikes: new Set(),
  serverFavorites: new Set(),
  optimisticLikes: new Set(),
  optimisticFavorites: new Set(),
  initialized: false,
  userId: null,

  // 从服务器初始化状态
  initializeFromServer: (userId, likes, favorites) =>
    set({
      serverLikes: new Set(likes),
      serverFavorites: new Set(favorites),
      initialized: true,
      userId
    }),

  // 乐观更新操作
  addOptimisticLike: (caseId) =>
    set((state) => ({
      optimisticLikes: new Set(state.optimisticLikes).add(caseId)
    })),
  removeOptimisticLike: (caseId) =>
    set((state) => {
      const newSet = new Set(state.optimisticLikes)
      newSet.delete(caseId)
      return { optimisticLikes: newSet }
    }),
  addOptimisticFavorite: (caseId) =>
    set((state) => ({
      optimisticFavorites: new Set(state.optimisticFavorites).add(caseId)
    })),
  removeOptimisticFavorite: (caseId) =>
    set((state) => {
      const newSet = new Set(state.optimisticFavorites)
      newSet.delete(caseId)
      return { optimisticFavorites: newSet }
    }),
  reset: () =>
    set({
      serverLikes: new Set(),
      serverFavorites: new Set(),
      optimisticLikes: new Set(),
      optimisticFavorites: new Set(),
      initialized: false,
      userId: null
    })
}))

const PAGE_SIZE = 12

export function useCollections(type?: 'LIKE' | 'FAVORITE') {
  const { user, loading: authLoading } = useAuth()
  const { t } = useI18n()
  const store = useCollectionsStore()

  // 添加更详细的日志
  useEffect(() => {
    console.log('[useCollections]', {
      timestamp: new Date().toISOString(),
      userId: user?.id,
      authLoading,
      initialized: store.initialized,
      storeUserId: store.userId,
      serverLikesCount: store.serverLikes.size,
      serverFavoritesCount: store.serverFavorites.size
    })
  }, [user?.id, authLoading, store.initialized, store.userId, store.serverLikes, store.serverFavorites])

  // 获取用户收藏状态
  useEffect(() => {
    const initializeCollections = async () => {
      // 如果认证状态还在加载，或者已经初始化过且用户ID没变，则跳过
      if (authLoading) {
        console.log('[useCollections] Auth still loading, waiting...')
        return
      }

      if (store.initialized && store.userId === user?.id) {
        console.log('[useCollections] Already initialized for user:', user?.id)
        return
      }

      // 如果没有用户，重置状态
      if (!user?.id) {
        if (store.initialized) {
          console.log('[useCollections] No user, resetting collections state')
          store.reset()
        }
        return
      }

      console.log('[useCollections] Initializing collections for user:', user.id)
      try {
        const res = await fetch('/api/collections', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (!res.ok) {
          throw new Error('Failed to fetch collections')
        }

        const data: Collections = await res.json()
        console.log('[useCollections] Received collections from server:', {
          timestamp: new Date().toISOString(),
          userId: user.id,
          likesCount: data.likes?.length || 0,
          favoritesCount: data.favorites?.length || 0
        })
        
        // 初始化状态，包括用户ID
        store.initializeFromServer(user.id, data.likes || [], data.favorites || [])
        console.log('[useCollections] Store initialized with server data:', {
          timestamp: new Date().toISOString(),
          userId: user.id,
          serverLikesCount: store.serverLikes.size,
          serverFavoritesCount: store.serverFavorites.size
        })
      } catch (error) {
        console.error('[useCollections] Error fetching collections:', error)
        toast.error(t('error.fetch_failed'))
      }
    }

    initializeCollections()
  }, [user?.id, authLoading, store.initialized, store.userId, t])

  // 获取收藏/点赞列表
  const getKey = (pageIndex: number, previousPageData: CollectionResponse | null) => {
    if (!user?.id) {
      console.log('getKey - no user')
      return null
    }
    if (previousPageData && !previousPageData.hasMore) return null
    const cursor = previousPageData?.nextCursor
    return `/api/collections?type=${type}&limit=${PAGE_SIZE}${cursor ? `&cursor=${cursor}` : ''}`
  }

  const { data, size, setSize, isLoading, mutate, error } = useSWRInfinite<CollectionResponse>(
    type ? getKey : null,
    async (url) => {
      const res = await fetch(url, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) throw new Error('Failed to fetch collections')
      return res.json()
    }
  )

  // 获取统计数据
  const { data: stats } = useSWR<{ likes: number; favorites: number }>(
    user ? '/api/collections/stats' : null,
    async (url) => {
      const res = await fetch(url, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) throw new Error('Failed to fetch stats')
      return res.json()
    }
  )

  const showLoginToast = () => {
    toast.error(t('auth.error.login_required'))
  }

  const toggleCollection = async (caseId: string, type: 'LIKE' | 'FAVORITE') => {
    if (!user?.id) {
      console.log('toggleCollection - no user, showing login toast')
      showLoginToast()
      return
    }

    const isLike = type === 'LIKE'
    const serverSet = isLike ? store.serverLikes : store.serverFavorites
    const optimisticSet = isLike ? store.optimisticLikes : store.optimisticFavorites
    const addOptimistic = isLike ? store.addOptimisticLike : store.addOptimisticFavorite
    const removeOptimistic = isLike ? store.removeOptimisticLike : store.removeOptimisticFavorite
    
    // 检查服务器状态和乐观更新状态
    const isCollected = serverSet.has(caseId) || optimisticSet.has(caseId)
    const action = isCollected ? 'remove' : 'add'

    try {
      // 先进行乐观更新
      if (action === 'add') {
        addOptimistic(caseId)
      } else {
        removeOptimistic(caseId)
      }

      console.log(`Sending ${action} ${type} request for case:`, caseId)
      
      // 获取案例数据
      const caseData = cases.find(c => c.id === caseId);
      
      // 触发活动更新事件
      const activityType = action === 'add' ? type : `UN${type}`
      if (typeof window !== 'undefined' && caseData) {
        window.dispatchEvent(new CustomEvent('activity-update', {
          detail: {
            caseId,
            type: activityType,
            action,
            caseTitleZh: caseData.title.zh || '未知案例',
            caseTitleEn: caseData.title.en || 'Unknown Case',
            imageUrl: caseData.image || ''
          }
        }))
      }
      
      // API 请求
      const response = await fetch('/api/collections', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ caseId, type, action })
      })

      if (!response.ok) {
        throw new Error('Failed to update collection')
      }

      // 更新服务器状态
      const updatedData = await response.json()
      store.initializeFromServer(user.id, updatedData.likes || [], updatedData.favorites || [])
      
      // 显示成功消息
      const messageKey = isLike 
        ? (action === 'add' ? 'success.like_added' : 'success.like_removed')
        : (action === 'add' ? 'success.bookmark_added' : 'success.bookmark_removed')
      toast.success(t(messageKey))
      
    } catch (error) {
      console.error('Error toggling collection:', error)
      // 发生错误时回滚乐观更新
      if (action === 'add') {
        removeOptimistic(caseId)
      } else {
        addOptimistic(caseId)
      }
      toast.error(t('error.update_failed'))
    }
  }

  const hasMore = data ? data[data.length - 1]?.hasMore : true
  const items = data ? data.flatMap((page) => page.items) : []
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')

  return {
    collections: {
      likes: Array.from(store.serverLikes),
      favorites: Array.from(store.serverFavorites)
    },
    items,
    stats,
    hasMore,
    loading: authLoading || isLoadingMore,
    error,
    loadMore: () => setSize(size + 1),
    toggleCollection,
    isLiked: (caseId: string) => store.serverLikes.has(caseId) || store.optimisticLikes.has(caseId),
    isFavorited: (caseId: string) => store.serverFavorites.has(caseId) || store.optimisticFavorites.has(caseId)
  }
} 
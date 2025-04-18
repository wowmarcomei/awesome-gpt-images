import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { create } from 'zustand'
import { useAuth } from './use-auth'
import { toast } from 'sonner'
import { useI18n } from '@/lib/i18n/context'

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
  optimisticLikes: Set<string>
  optimisticFavorites: Set<string>
  addOptimisticLike: (caseId: string) => void
  removeOptimisticLike: (caseId: string) => void
  addOptimisticFavorite: (caseId: string) => void
  removeOptimisticFavorite: (caseId: string) => void
  reset: () => void
}

// 乐观更新状态管理
export const useCollectionsStore = create<CollectionsStore>((set) => ({
  optimisticLikes: new Set(),
  optimisticFavorites: new Set(),
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
  reset: () => set({ optimisticLikes: new Set(), optimisticFavorites: new Set() })
}))

const PAGE_SIZE = 12

export function useCollections(type?: 'LIKE' | 'FAVORITE') {
  const { user } = useAuth()
  const { t } = useI18n()
  const store = useCollectionsStore()

  console.log('useCollections - user:', user)

  // 获取收藏/点赞列表
  const getKey = (pageIndex: number, previousPageData: CollectionResponse | null) => {
    if (!user) {
      console.log('getKey - no user')
      return null
    }
    if (previousPageData && !previousPageData.hasMore) return null
    const cursor = previousPageData?.nextCursor
    return `/api/collections?type=${type}&limit=${PAGE_SIZE}${cursor ? `&cursor=${cursor}` : ''}`
  }

  const { data, size, setSize, isLoading, mutate } = useSWRInfinite<CollectionResponse>(
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

  // 获取所有收藏/点赞
  const { data: collections, error } = useSWR<Collections>(
    user ? '/api/collections' : null,
    async () => {
      const response = await fetch('/api/collections', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Failed to fetch collections')
      }
      return response.json()
    }
  )

  const showLoginToast = () => {
    toast.error(t('auth.error.login_required'))
  }

  const toggleCollection = async (caseId: string, type: 'LIKE' | 'FAVORITE') => {
    console.log('toggleCollection - user:', user)
    if (!user) {
      console.log('toggleCollection - no user, showing login toast')
      showLoginToast()
      return
    }

    const isLike = type === 'LIKE'
    const optimisticSet = isLike ? store.optimisticLikes : store.optimisticFavorites
    const addOptimistic = isLike ? store.addOptimisticLike : store.addOptimisticFavorite
    const removeOptimistic = isLike ? store.removeOptimisticLike : store.removeOptimisticFavorite
    
    const isCollected = optimisticSet.has(caseId)
    const action = isCollected ? 'remove' : 'add'

    try {
      // 乐观更新
      if (action === 'add') {
        addOptimistic(caseId)
      } else {
        removeOptimistic(caseId)
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
        if (response.status === 409) {
          // 已经存在，回滚乐观更新
          if (action === 'add') {
            removeOptimistic(caseId)
          } else {
            addOptimistic(caseId)
          }
          return
        }
        throw new Error('Failed to update collection')
      }

      // 更新缓存
      await mutate()
    } catch (error) {
      console.error('Error toggling collection:', error)
      // 回滚乐观更新
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
    collections: collections ?? { likes: [], favorites: [] },
    items,
    stats,
    hasMore,
    loading: isLoadingMore,
    error,
    loadMore: () => setSize(size + 1),
    toggleCollection,
    optimisticLikes: store.optimisticLikes,
    optimisticFavorites: store.optimisticFavorites
  }
} 
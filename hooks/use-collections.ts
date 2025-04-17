import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { create } from 'zustand'

interface Collection {
  id: string
  caseId: string
  type: 'LIKE' | 'FAVORITE'
  createdAt: string
}

interface CollectionResponse {
  items: Collection[]
  nextCursor?: string
  hasMore: boolean
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

export function useCollections(type: 'LIKE' | 'FAVORITE') {
  const store = useCollectionsStore()

  // 获取收藏/点赞列表
  const getKey = (pageIndex: number, previousPageData: CollectionResponse | null) => {
    if (previousPageData && !previousPageData.hasMore) return null
    const cursor = previousPageData?.nextCursor
    return `/api/collections?type=${type}&limit=${PAGE_SIZE}${cursor ? `&cursor=${cursor}` : ''}`
  }

  const { data, size, setSize, isLoading, mutate } = useSWRInfinite<CollectionResponse>(
    getKey,
    async (url) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch collections')
      return res.json()
    }
  )

  // 获取统计数据
  const { data: stats } = useSWR<{ likes: number; favorites: number }>(
    '/api/collections/stats',
    async (url) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch stats')
      return res.json()
    }
  )

  // 添加收藏/点赞
  const add = async (caseId: string) => {
    if (type === 'LIKE') {
      store.addOptimisticLike(caseId)
    } else {
      store.addOptimisticFavorite(caseId)
    }

    try {
      const res = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, type })
      })

      if (!res.ok) throw new Error('Failed to add collection')
      
      // 更新缓存数据
      await mutate()
    } catch (error) {
      // 发生错误时回滚乐观更新
      if (type === 'LIKE') {
        store.removeOptimisticLike(caseId)
      } else {
        store.removeOptimisticFavorite(caseId)
      }
      throw error
    }
  }

  // 删除收藏/点赞
  const remove = async (caseId: string) => {
    if (type === 'LIKE') {
      store.removeOptimisticLike(caseId)
    } else {
      store.removeOptimisticFavorite(caseId)
    }

    try {
      const res = await fetch(`/api/collections/${caseId}?type=${type}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Failed to remove collection')
      
      // 更新缓存数据
      await mutate()
    } catch (error) {
      // 发生错误时回滚乐观更新
      if (type === 'LIKE') {
        store.addOptimisticLike(caseId)
      } else {
        store.addOptimisticFavorite(caseId)
      }
      throw error
    }
  }

  const hasMore = data ? data[data.length - 1]?.hasMore : true
  const items = data ? data.flatMap((page) => page.items) : []
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')

  return {
    items,
    stats,
    hasMore,
    isLoading: isLoadingMore,
    loadMore: () => setSize(size + 1),
    add,
    remove,
    optimisticLikes: store.optimisticLikes,
    optimisticFavorites: store.optimisticFavorites
  }
} 
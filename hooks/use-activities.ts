import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/lib/auth/context'
import { useI18n } from '@/lib/i18n/context'
import { toast } from 'sonner'
import { cases } from '@/lib/data'
import useSWR from 'swr'

export interface Activity {
  id: string
  type: 'LIKE' | 'FAVORITE' | 'UNLIKE' | 'UNFAVORITE' | string
  caseId: string
  createdAt: string
  caseTitleZh: string  // 中文标题
  caseTitleEn: string  // 英文标题
  imageUrl: string     // 案例图片
  action: 'add' | 'remove' // 操作类型
}

// 数据获取函数
const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (!res.ok) {
    throw new Error(`请求失败: ${res.status}`);
  }
  
  return res.json();
};

// 处理 API 返回的数据，转换为活动列表
const processApiData = (data: any): Activity[] => {
  if (!data) return [];
  
  let activities: Activity[] = [];
  
  // 处理收藏数据
  if (data.favorites && Array.isArray(data.favorites)) {
    const favoriteActivities = data.favorites
      .map((item: any) => {
        // 当前数据格式为字符串（case_id）
        const caseId = item;
        // 使用数据库中的时间戳
        const createdAt = data.timestamps && data.timestamps[caseId] ? data.timestamps[caseId] : new Date().toISOString();
        
        const caseData = cases.find(c => c.id === caseId);
        if (!caseData) return null;
        
        return {
          id: `favorite-${caseId}`,
          type: 'FAVORITE',
          action: 'add',
          caseId,
          createdAt,
          caseTitleZh: caseData.title.zh || '未知案例',
          caseTitleEn: caseData.title.en || 'Unknown Case',
          imageUrl: caseData.image || ''
        };
      })
      .filter(Boolean);
    
    activities = [...activities, ...favoriteActivities];
  }
  
  // 处理点赞数据
  if (data.likes && Array.isArray(data.likes)) {
    const likeActivities = data.likes
      .map((item: any) => {
        // 当前数据格式为字符串（case_id）
        const caseId = item;
        // 使用数据库中的时间戳
        const createdAt = data.timestamps && data.timestamps[caseId] ? data.timestamps[caseId] : new Date().toISOString();
        
        const caseData = cases.find(c => c.id === caseId);
        if (!caseData) return null;
        
        return {
          id: `like-${caseId}`,
          type: 'LIKE',
          action: 'add',
          caseId,
          createdAt,
          caseTitleZh: caseData.title.zh || '未知案例',
          caseTitleEn: caseData.title.en || 'Unknown Case',
          imageUrl: caseData.image || ''
        };
      })
      .filter(Boolean);
    
    activities = [...activities, ...likeActivities];
  }
  
  // 按时间排序，最新的在前面
  activities.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  return activities;
};

export function useActivities(limit: number = 10) {
  const { user, loading: authLoading } = useAuth()
  const { t, currentLang } = useI18n()
  const [localActivities, setLocalActivities] = useState<Activity[]>([])
  
  // 使用 SWR 获取活动数据
  const { data, error, isLoading, mutate } = useSWR(
    user ? `/api/collections?limit=${limit}` : null,
    fetcher,
    {
      dedupingInterval: 600000, // 10分钟内不重复请求
      revalidateOnFocus: false,  // 页面获得焦点时不重新验证
      revalidateIfStale: false,  // 缓存过期时不自动重新验证
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // 最多重试 3 次
        if (retryCount >= 3) return;
        
        // 5秒后重试
        setTimeout(() => revalidate({ retryCount }), 5000);
      }
    }
  )
  
  // 处理 API 数据并更新本地状态
  useEffect(() => {
    if (data && !isLoading) {
      console.log('调试: API 原始数据', data);
      const activities = processApiData(data);
      console.log('调试: 处理后的活动数据', activities);
      setLocalActivities(activities.slice(0, limit));
    }
  }, [data, isLoading, limit]);

  // 添加新的活动记录
  const addActivity = useCallback((caseId: string, type: 'LIKE' | 'FAVORITE' | 'UNLIKE' | 'UNFAVORITE', action: 'add' | 'remove') => {
    if (!user) return;
    
    // 获取案例数据
    const caseData = cases.find(c => c.id === caseId);
    if (!caseData) return;
    
    // 创建活动记录，包含完整的案例信息
    const activity: Activity = {
      id: `activity-${caseId}-${type}`,
      type,
      action,
      caseId,
      // 使用服务器返回的时间戳，确保与数据库一致
      createdAt: data?.timestamp || new Date().toISOString(),
      caseTitleZh: caseData.title.zh || '未知案例',
      caseTitleEn: caseData.title.en || 'Unknown Case',
      imageUrl: caseData.image || ''
    };
    
    // 乐观更新本地状态
    setLocalActivities(prev => [activity, ...prev].slice(0, limit));
    
    // 触发 SWR 重新验证
    mutate();
    
    return activity;
  }, [user, limit, mutate]);

  // 监听活动更新事件
  useEffect(() => {
    const handleActivityUpdate = (event: CustomEvent) => {
      if (event.detail) {
        const { caseId, type, action } = event.detail;
        addActivity(caseId, type, action);
      }
    };
    
    // 添加事件监听器
    window.addEventListener('activity-update' as any, handleActivityUpdate as EventListener);
    
    // 清理事件监听器
    return () => {
      window.removeEventListener('activity-update' as any, handleActivityUpdate as EventListener);
    };
  }, [addActivity]);

  // 获取活动文本描述
  const getActivityText = (type: string) => {
    switch (type) {
      case 'FAVORITE':
        return t('activity.favorited')
      case 'UNFAVORITE':
        return t('activity.unfavorited')
      case 'LIKE':
        return t('activity.liked')
      case 'UNLIKE':
        return t('activity.unliked')
      default:
        return t('activity.interacted')
    }
  }

  // 手动刷新活动数据
  const refreshActivities = useCallback(() => {
    return mutate();
  }, [mutate]);

  return {
    activities: localActivities,
    loading: authLoading || isLoading,
    error,
    refresh: refreshActivities,
    getActivityText,
    addActivity
  }
}

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/lib/auth/context'
import { useI18n } from '@/lib/i18n/context'
import { toast } from 'sonner'
import { cases } from '@/lib/data'

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

// 定义本地存储的键名
const ACTIVITIES_STORAGE_KEY = 'awesome-gpt-images-activities';
const ACTIVITIES_LAST_SYNC_KEY = 'awesome-gpt-images-activities-last-sync';
const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24小时缓存过期时间

export function useActivities(limit: number = 10) {
  const { user, loading: authLoading } = useAuth()
  const { t, currentLang } = useI18n()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // 从本地存储获取活动数据
  const getStoredActivities = (): Activity[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const storedData = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : [];
    } catch (err) {
      console.error('从本地存储获取活动数据失败:', err);
      return [];
    }
  }

  // 将活动数据保存到本地存储
  const saveActivitiesToStorage = (data: Activity[]) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(data));
      // 更新最后同步时间
      localStorage.setItem(ACTIVITIES_LAST_SYNC_KEY, Date.now().toString());
    } catch (err) {
      console.error('保存活动数据到本地存储失败:', err);
    }
  }
  
  // 检查缓存是否过期
  const isCacheExpired = (): boolean => {
    if (typeof window === 'undefined') return true;
    
    try {
      const lastSync = localStorage.getItem(ACTIVITIES_LAST_SYNC_KEY);
      if (!lastSync) return true;
      
      const lastSyncTime = parseInt(lastSync, 10);
      const now = Date.now();
      
      return now - lastSyncTime > CACHE_EXPIRY_TIME;
    } catch (err) {
      console.error('检查缓存过期失败:', err);
      return true;
    }
  }

  // 初始化活动数据，包括从 API 和本地存储获取
  const fetchActivities = async (forceRefresh = false) => {
    if (!user) {
      setActivities([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // 从本地存储获取活动数据
      const storedActivities = getStoredActivities();
      
      // 如果缓存有效且不是强制刷新，直接使用本地数据
      if (!isCacheExpired() && !forceRefresh && storedActivities.length > 0) {
        console.log('使用缓存的活动数据');
        setActivities(storedActivities.slice(0, limit));
        setLoading(false);
        return;
      }
      
      console.log('从 API 获取活动数据');
      
      // 获取收藏和点赞数据
      const res = await fetch(`/api/collections?limit=${limit}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error(`请求失败: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('API返回的活动数据:', data);
      
      // 处理数据格式
      let processedActivities: Activity[] = [];
      
      // 处理收藏数据
      if (data.favorites && Array.isArray(data.favorites)) {
        const favoriteActivities = data.favorites.map((caseId: string) => {
          const caseData = cases.find(c => c.id === caseId);
          if (!caseData) return null;
          
          return {
            id: `favorite-${caseId}`,
            type: 'FAVORITE',
            action: 'add',
            caseId,
            createdAt: new Date().toISOString(), // 没有时间戳，使用当前时间
            caseTitleZh: caseData.title.zh || '未知案例',
            caseTitleEn: caseData.title.en || 'Unknown Case',
            imageUrl: caseData.image || ''
          };
        }).filter(Boolean);
        
        processedActivities = [...processedActivities, ...favoriteActivities];
      }
      
      // 处理点赞数据
      if (data.likes && Array.isArray(data.likes)) {
        const likeActivities = data.likes.map((caseId: string) => {
          const caseData = cases.find(c => c.id === caseId);
          if (!caseData) return null;
          
          return {
            id: `like-${caseId}`,
            type: 'LIKE',
            action: 'add',
            caseId,
            createdAt: new Date().toISOString(), // 没有时间戳，使用当前时间
            caseTitleZh: caseData.title.zh || '未知案例',
            caseTitleEn: caseData.title.en || 'Unknown Case',
            imageUrl: caseData.image || ''
          };
        }).filter(Boolean);
        
        processedActivities = [...processedActivities, ...likeActivities];
      }
      
      // 合并本地存储的活动数据
      const allActivities = [...storedActivities, ...processedActivities];
      
      // 去重，使用活动ID作为唯一标识
      const uniqueActivities = Array.from(new Map(allActivities.map(item => [item.id, item])).values());
      
      // 按时间排序，最新的在前面
      uniqueActivities.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      // 限制数量并保存到本地存储
      const limitedActivities = uniqueActivities.slice(0, 50); // 存储更多活动以便于切换限制
      saveActivitiesToStorage(limitedActivities);
      
      // 设置当前显示的活动
      setActivities(limitedActivities.slice(0, limit));
    } catch (err) {
      console.error('获取活动数据失败:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      
      // 如果 API 请求失败，使用本地存储的数据
      const storedActivities = getStoredActivities();
      setActivities(storedActivities.slice(0, limit));
    } finally {
      setLoading(false);
    }
  };

  // 添加新的活动记录
  const addActivity = useCallback((caseId: string, type: 'LIKE' | 'FAVORITE' | 'UNLIKE' | 'UNFAVORITE', action: 'add' | 'remove') => {
    if (!user) return;
    
    // 获取案例数据
    const caseData = cases.find(c => c.id === caseId);
    if (!caseData) return;
    
    // 创建活动记录，包含完整的案例信息
    const activity: Activity = {
      id: `activity-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type,
      action,
      caseId,
      createdAt: new Date().toISOString(),
      caseTitleZh: caseData.title.zh || '未知案例',
      caseTitleEn: caseData.title.en || 'Unknown Case',
      imageUrl: caseData.image || ''
    };
    
    // 获取当前存储的活动
    const storedActivities = getStoredActivities();
    
    // 添加新活动到列表头部
    const updatedActivities = [activity, ...storedActivities];
    
    // 限制存储的活动数量，防止数据过大
    const limitedActivities = updatedActivities.slice(0, 50);
    
    // 保存到本地存储
    saveActivitiesToStorage(limitedActivities);
    
    // 更新当前活动列表
    setActivities(prev => [activity, ...prev].slice(0, limit));
    
    return activity;
  }, [user, currentLang, limit]);

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

  // 初始加载活动数据
  useEffect(() => {
    fetchActivities();
  }, [user, currentLang]);

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
    return fetchActivities(true);
  }, []);

  return {
    activities,
    loading: authLoading || loading,
    error,
    refresh: refreshActivities,
    getActivityText,
    addActivity
  }
}

import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// 收藏相关的辅助函数
export const collections = {
  // 获取用户的收藏列表
  async getUserCollections(userId: string, type?: 'LIKE' | 'FAVORITE') {
    const query = supabase
      .from('collections')
      .select('*')
      .eq('user_id', userId)
    
    if (type) {
      query.eq('type', type)
    }
    
    return await query.order('created_at', { ascending: false })
  },

  // 添加收藏
  async addCollection(userId: string, caseId: string, type: 'LIKE' | 'FAVORITE') {
    return await supabase
      .from('collections')
      .insert({
        user_id: userId,
        case_id: caseId,
        type
      })
  },

  // 删除收藏
  async removeCollection(userId: string, caseId: string, type: 'LIKE' | 'FAVORITE') {
    return await supabase
      .from('collections')
      .delete()
      .match({
        user_id: userId,
        case_id: caseId,
        type
      })
  },

  // 检查是否已收藏
  async checkCollection(userId: string, caseId: string, type: 'LIKE' | 'FAVORITE') {
    const { data } = await supabase
      .from('collections')
      .select('id')
      .match({
        user_id: userId,
        case_id: caseId,
        type
      })
      .single()
    
    return !!data
  }
}

// 用户设置相关的辅助函数
export const userSettings = {
  // 获取用户设置
  async getUserSettings(userId: string) {
    const { data } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    return data
  },

  // 更新用户设置
  async updateUserSettings(userId: string, settings: {
    themePreference?: string
    languagePreference?: string
    notificationSettings?: any
  }) {
    const { data: existing } = await supabase
      .from('user_settings')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (existing) {
      // 更新现有设置
      return await supabase
        .from('user_settings')
        .update(settings)
        .eq('user_id', userId)
    } else {
      // 创建新设置
      return await supabase
        .from('user_settings')
        .insert({
          user_id: userId,
          ...settings
        })
    }
  }
} 
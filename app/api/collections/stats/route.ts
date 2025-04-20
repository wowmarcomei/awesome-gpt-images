import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// 设置 Edge Runtime
export const runtime = 'edge'

// 获取收藏和点赞统计
export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // 验证用户身份
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // 获取统计数据
    const { data, error } = await supabase
      .from('collections')
      .select('type')
      .eq('user_id', user.id)

    if (error) {
      console.error('Error fetching collection stats:', error)
      return new NextResponse('Internal Server Error', { status: 500 })
    }

    // 计算统计数据
    const stats = data.reduce(
      (acc, item) => {
        if (item.type === 'LIKE') {
          acc.likes++
        } else if (item.type === 'FAVORITE') {
          acc.favorites++
        }
        return acc
      },
      { likes: 0, favorites: 0 }
    )

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error in collections stats GET:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 
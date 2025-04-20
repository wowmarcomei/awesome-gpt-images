import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// 设置 Edge Runtime
export const runtime = 'edge'

// 获取收藏/点赞列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '12')
    const cursor = searchParams.get('cursor')

    const supabase = createRouteHandlerClient({ cookies })

    // 验证用户身份
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // 如果没有指定类型，返回所有收藏状态
    if (!type) {
      const { data: likesData } = await supabase
        .from('collections')
        .select('case_id, created_at')
        .eq('user_id', user.id)
        .eq('type', 'LIKE')
        .order('created_at', { ascending: false })

      const { data: favoritesData } = await supabase
        .from('collections')
        .select('case_id, created_at')
        .eq('user_id', user.id)
        .eq('type', 'FAVORITE')
        .order('created_at', { ascending: false })

      // 返回原始格式，以保持兼容性
      return NextResponse.json({
        likes: likesData?.map(item => item.case_id) || [],
        favorites: favoritesData?.map(item => item.case_id) || [],
        // 添加时间戳映射，便于前端使用
        timestamps: {
          ...Object.fromEntries((likesData || []).map(item => [item.case_id, item.created_at])),
          ...Object.fromEntries((favoritesData || []).map(item => [item.case_id, item.created_at]))
        },
        timestamp: new Date().toISOString()
      })
    }

    // 验证类型
    if (!['LIKE', 'FAVORITE'].includes(type)) {
      return new NextResponse('Invalid collection type', { status: 400 })
    }

    // 构建查询
    let query = supabase
      .from('collections')
      .select('*')
      .eq('user_id', user.id)
      .eq('type', type)
      .order('created_at', { ascending: false })
      .limit(limit + 1) // 多获取一条用于判断是否还有更多

    // 如果有游标，添加游标条件
    if (cursor) {
      query = query.lt('created_at', cursor)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching collections:', error)
      return new NextResponse('Internal Server Error', { status: 500 })
    }

    // 判断是否还有更多数据
    const hasMore = data.length > limit
    const items = hasMore ? data.slice(0, -1) : data
    const nextCursor = hasMore ? items[items.length - 1].created_at : undefined

    return NextResponse.json({
      items,
      hasMore,
      nextCursor
    })
  } catch (error) {
    console.error('Error in collections GET:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// 添加收藏/点赞
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // 验证用户身份
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('POST /api/collections - auth check:', { user, authError })
    
    if (authError || !user) {
      console.log('POST /api/collections - unauthorized')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { caseId, type, action } = await request.json()
    console.log('POST /api/collections - request body:', { caseId, type, action })

    // 验证必要参数
    if (!caseId || !type || !action) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // 验证类型
    if (!['LIKE', 'FAVORITE'].includes(type)) {
      return new NextResponse('Invalid collection type', { status: 400 })
    }

    // 根据 action 执行不同操作
    if (action === 'add') {
      // 检查是否已经存在
      const { data: existing } = await supabase
        .from('collections')
        .select('id')
        .eq('user_id', user.id)
        .eq('case_id', caseId)
        .eq('type', type)
        .single()

      if (existing) {
        return new NextResponse('Already exists', { status: 409 })
      }

      // 添加新记录
      const { error: insertError } = await supabase
        .from('collections')
        .insert({
          user_id: user.id,
          case_id: caseId,
          type
        })

      if (insertError) {
        console.error('Error adding collection:', insertError)
        return new NextResponse('Internal Server Error', { status: 500 })
      }
    } else if (action === 'remove') {
      // 删除记录
      const { error: deleteError } = await supabase
        .from('collections')
        .delete()
        .eq('user_id', user.id)
        .eq('case_id', caseId)
        .eq('type', type)

      if (deleteError) {
        console.error('Error removing collection:', deleteError)
        return new NextResponse('Internal Server Error', { status: 500 })
      }
    } else {
      return new NextResponse('Invalid action', { status: 400 })
    }

    // 获取更新后的收藏状态
    const { data: likesData } = await supabase
      .from('collections')
      .select('case_id')
      .eq('user_id', user.id)
      .eq('type', 'LIKE')

    const { data: favoritesData } = await supabase
      .from('collections')
      .select('case_id')
      .eq('user_id', user.id)
      .eq('type', 'FAVORITE')

    // 返回更新后的状态
    return NextResponse.json({
      likes: likesData?.map(item => item.case_id) || [],
      favorites: favoritesData?.map(item => item.case_id) || []
    })

  } catch (error) {
    console.error('Error in collections POST:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 
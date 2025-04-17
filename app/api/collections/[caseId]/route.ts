import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// 删除收藏/点赞
export async function DELETE(
  request: Request,
  { params }: { params: { caseId: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as 'LIKE' | 'FAVORITE'
    const caseId = params.caseId

    const supabase = createRouteHandlerClient({ cookies })

    // 验证用户身份
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // 删除记录
    const { error } = await supabase
      .from('collections')
      .delete()
      .eq('user_id', user.id)
      .eq('case_id', caseId)
      .eq('type', type)

    if (error) {
      console.error('Error deleting collection:', error)
      return new NextResponse('Internal Server Error', { status: 500 })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error in collections DELETE:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 
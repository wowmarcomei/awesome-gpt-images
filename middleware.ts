import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 检查是否是仪表盘路由
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('Checking dashboard access...')
    
    // 从 cookie 中获取 auth token
    const token = request.cookies.get('sb-rxiqowwjimgmjipwmteh-auth-token')?.value
    console.log('Found token:', !!token)

    if (!token) {
      console.log('No token found, redirecting to auth')
      const loginUrl = new URL('/auth', request.url)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // 解码 Base64 token
      const decodedToken = decodeURIComponent(token)
      console.log('Decoded token:', decodedToken.substring(0, 50) + '...')
      
      // 解析 token 数组并获取第一个元素
      const tokenData = JSON.parse(decodedToken)[0]
      console.log('Token data type:', typeof tokenData)
      console.log('Has access_token:', !!tokenData)

      if (!tokenData) {
        console.error('No valid token data found')
        const loginUrl = new URL('/auth', request.url)
        return NextResponse.redirect(loginUrl)
      }

      // 验证 token 是否有效
      console.log('Validating token with Supabase...')
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
        headers: {
          'Authorization': `Bearer ${tokenData}`,
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        }
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Token validation failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        })
        const loginUrl = new URL('/auth', request.url)
        return NextResponse.redirect(loginUrl)
      }

      console.log('Token validated successfully')
      return NextResponse.next()
    } catch (error) {
      console.error('Auth error:', error)
      const loginUrl = new URL('/auth', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
} 
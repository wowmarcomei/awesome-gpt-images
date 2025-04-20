import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// 设置 Edge Runtime
export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth?error=missing_token', request.url));
  }

  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email',
    });

    if (error) {
      throw error;
    }

    // 验证成功，重定向到登录页面
    return NextResponse.redirect(new URL('/auth?verified=true', request.url));
  } catch (error) {
    console.error('验证失败:', error);
    return NextResponse.redirect(new URL('/auth?error=verification_failed', request.url));
  }
} 
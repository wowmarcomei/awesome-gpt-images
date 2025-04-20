import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// 设置 Edge Runtime
export const runtime = 'edge';

import { sendVerificationEmail } from '../../../../lib/email';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const supabase = createRouteHandlerClient({ cookies });

    // 创建用户
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (signUpError) {
      return NextResponse.json(
        { error: '注册失败', details: signUpError.message },
        { status: 400 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: '注册失败，请稍后重试' },
        { status: 400 }
      );
    }

    // Supabase 已经自动发送验证邮件，所以这里不需要再发送
    // 如果你想自定义邮件内容，可以禁用 Supabase 的自动邮件，使用下面的代码：
    /*
    const token = user.confirmation_token;
    const emailResult = await sendVerificationEmail(email, token);
    
    if (!emailResult.success) {
      return NextResponse.json(
        { error: '发送验证邮件失败，请稍后重试' },
        { status: 500 }
      );
    }
    */

    return NextResponse.json({
      message: '注册成功，请查收验证邮件',
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('注册失败:', error);
    return NextResponse.json(
      { error: '注册失败，请稍后重试' },
      { status: 500 }
    );
  }
} 
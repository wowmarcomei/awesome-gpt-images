import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { serverLog } from '../../../lib/logger';

// 设置 Edge Runtime
export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    // 记录完整的请求 URL 和所有参数
    serverLog.info('===== Auth 回调处理开始 =====');
    serverLog.info('回调 URL: ' + request.url);
    serverLog.info('请求头:', Object.fromEntries(request.headers.entries()));
    
    const requestUrl = new URL(request.url);
    serverLog.info('URL 路径: ' + requestUrl.pathname);
    
    // 记录所有查询参数
    serverLog.info('所有查询参数:');
    const params: Record<string, string> = {};
    requestUrl.searchParams.forEach((value, key) => {
      serverLog.info(`- ${key}: ${value}`);
      params[key] = value;
    });
    
    const code = requestUrl.searchParams.get('code');
    const error = requestUrl.searchParams.get('error');
    const error_description = requestUrl.searchParams.get('error_description');
    const state = requestUrl.searchParams.get('state');
    const next = requestUrl.searchParams.get('next') ?? '/';
    
    serverLog.info('参数信息:', {
      code: !!code,
      error,
      error_description,
      state,
      next
    });

    // 如果有错误，记录错误信息
    if (error) {
      serverLog.error('Auth 回调错误:', { error, error_description });
      // 重定向到带有错误参数的登录页面
      return NextResponse.redirect(
        new URL(`/auth?error=${encodeURIComponent(error)}&error_description=${encodeURIComponent(error_description || '')}`, request.url)
      );
    }

    // 处理授权码
    if (code) {
      try {
        serverLog.info('开始处理授权码...');
        const supabase = createRouteHandlerClient({ cookies });
        
        serverLog.info('开始交换授权码为会话...');
        const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
        
        if (sessionError) {
          serverLog.error('Session 交换错误:', sessionError);
          return NextResponse.redirect(
            new URL('/auth?error=session_exchange_failed', request.url)
          );
        }

        serverLog.info('会话交换成功:', {
          userId: session?.user?.id,
          email: session?.user?.email
        });

        // 获取原始请求的主机名
        const forwardedHost = request.headers.get('x-forwarded-host');
        const origin = request.headers.get('origin');
        const host = forwardedHost || new URL(request.url).host;
        
        serverLog.info('重定向信息:', { forwardedHost, origin, host });

        // 构建重定向 URL
        const baseUrl = process.env.NODE_ENV === 'development' 
          ? `http://${host}`
          : `https://${host}`;
        
        const redirectUrl = new URL(next, baseUrl);
        serverLog.info('最终重定向到:', redirectUrl.toString());
        
        return NextResponse.redirect(redirectUrl);
      } catch (err) {
        serverLog.error('处理授权码时发生异常:', err);
        return NextResponse.redirect(
          new URL('/auth?error=session_error', request.url)
        );
      }
    }

    serverLog.warn('未收到授权码，无法完成认证');
    return NextResponse.redirect(new URL('/auth?error=no_code', request.url));
  } catch (error) {
    serverLog.error('回调处理发生未预期的错误:', error);
    return NextResponse.redirect(new URL('/auth?error=unexpected_error', request.url));
  } finally {
    serverLog.info('===== Auth 回调处理结束 =====');
  }
}
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { serverLog } from '../../../lib/logger';

// 设置 Edge Runtime
export const runtime = 'edge';

export async function GET(request: Request) {
  // 记录完整的请求 URL 和所有参数
  serverLog.info('===== Auth 回调处理开始 =====');
  serverLog.info('回调 URL: ' + request.url);
  
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
  
  serverLog.info('全部参数: ' + JSON.stringify(params));
  serverLog.info('授权码存在: ' + !!code);
  serverLog.info('错误存在: ' + !!error);
  serverLog.info('状态存在: ' + !!state);

  // 如果有错误，记录错误信息
  if (error) {
    serverLog.error('Auth 回调错误: ' + error);
    serverLog.error('错误描述: ' + (error_description || '无描述'));
    // 重定向到带有错误参数的登录页面
    const redirectUrl = new URL(`/auth?error=${encodeURIComponent(error)}&error_description=${encodeURIComponent(error_description || '')}`, request.url);
    serverLog.info('错误重定向到: ' + redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  }

  // 处理授权码
  if (code) {
    try {
      serverLog.info('开始处理授权码...');
      const supabase = createRouteHandlerClient({ cookies });
      serverLog.info('Supabase 客户端创建成功');
      
      serverLog.info('开始交换授权码为会话...');
      const sessionResult = await supabase.auth.exchangeCodeForSession(code);
      
      const sessionInfo = {
        success: !sessionResult.error,
        hasSession: !!sessionResult.data.session,
        error: sessionResult.error ? sessionResult.error.message : null
      };
      
      serverLog.info('Session 交换结果: ' + JSON.stringify(sessionInfo));
      
      if (sessionResult.error) {
        serverLog.error('Session 交换错误: ' + JSON.stringify(sessionResult.error));
        return NextResponse.redirect(
          new URL('/auth?error=session_exchange_failed', request.url)
        );
      }
      
      serverLog.info('会话交换成功，用户已登录');
    } catch (err) {
      serverLog.error('处理授权码时发生异常: ' + (err instanceof Error ? err.message : String(err)));
      return NextResponse.redirect(
        new URL('/auth?error=session_error', request.url)
      );
    }
  } else {
    serverLog.warn('未收到授权码，无法完成认证');
  }

  // 成功后重定向到首页
  serverLog.info('认证流程完成，重定向到首页');
  serverLog.info('===== Auth 回调处理结束 =====');
  return NextResponse.redirect(new URL('/', request.url));
}
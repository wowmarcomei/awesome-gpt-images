import { NextRequest, NextResponse } from 'next/server';

// 设置 Edge Runtime
export const runtime = 'edge';

// 日志级别类型
type LogLevel = 'info' | 'error' | 'warn' | 'debug';

// 日志请求体类型
interface LogRequestBody {
  level: LogLevel;
  message: string;
  args: string[];
}

// 处理客户端发送的日志请求
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LogRequestBody;
    
    // 根据日志级别选择相应的控制台方法
    switch (body.level) {
      case 'info':
        console.log(`[客户端] INFO: ${body.message}`, ...body.args);
        break;
      case 'error':
        console.error(`[客户端] ERROR: ${body.message}`, ...body.args);
        break;
      case 'warn':
        console.warn(`[客户端] WARN: ${body.message}`, ...body.args);
        break;
      case 'debug':
        console.debug(`[客户端] DEBUG: ${body.message}`, ...body.args);
        break;
      default:
        console.log(`[客户端] LOG: ${body.message}`, ...body.args);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('处理日志请求时出错:', error);
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}

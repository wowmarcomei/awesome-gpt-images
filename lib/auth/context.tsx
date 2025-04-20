'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { clientLog } from '../logger';

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signInWithTwitter: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    // 检查初始会话
    const checkUser = async () => {
      try {
        console.log('[AuthProvider] Checking initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('[AuthProvider] Error checking session:', error);
          return;
        }
        console.log('[AuthProvider] Initial session:', {
          timestamp: new Date().toISOString(),
          userId: session?.user?.id,
          isAuthenticated: !!session?.user
        });
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('[AuthProvider] Error in checkUser:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[AuthProvider] Auth state changed:', {
          timestamp: new Date().toISOString(),
          event,
          userId: session?.user?.id,
          isAuthenticated: !!session?.user
        });
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        if (event === 'SIGNED_IN') {
          router.refresh();
        }
        if (event === 'SIGNED_OUT') {
          router.refresh();
          router.push('/');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signInWithGitHub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
    }
  };

  const signInWithTwitter = async () => {
    try {
      await clientLog.info('开始 Twitter 登录流程...');
      await clientLog.info('当前 URL:', window.location.href);
      
      // 尝试直接使用 signInWithProvider
      await clientLog.info('尝试使用简化的 Twitter 登录方式');
      
      // 记录 Supabase 项目 URL
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '未设置';
      await clientLog.info('Supabase URL:', supabaseUrl);
      
      // 添加额外的调试信息
      await clientLog.info('浏览器 User Agent:', navigator.userAgent);
      
      // 使用简化的方式尝试登录
      await clientLog.info('尝试使用 signInWithOAuth 方法并简化参数');
      
      // 使用环境变量中的应用 URL
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      await clientLog.info('环境变量中的应用 URL:', appUrl);
      
      // 构建回调 URL
      const redirectUrl = `${appUrl}/auth/callback`;
      await clientLog.info('使用回调 URL:', redirectUrl);
      
      // 检测是否在本地开发环境
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocalhost) {
        await clientLog.info('在本地开发环境中运行，使用环境变量中的 URL');
      }
      
      // 使用最简化的配置
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: redirectUrl
        }
      });
      
      await clientLog.info('Supabase OAuth 响应:', { data, error });
      
      if (error) {
        await clientLog.error('Twitter OAuth 错误:', error);
        throw error;
      } else if (data?.url) {
        await clientLog.info('将重定向到:', data.url);
        // 手动重定向到授权 URL
        window.location.href = data.url;
      }
    } catch (error) {
      await clientLog.error('Twitter 登录过程中发生错误:', error);
    }
  };

  const value = {
    user,
    loading: isLoading,
    signInWithEmail,
    signInWithGoogle,
    signInWithGitHub,
    signInWithTwitter,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
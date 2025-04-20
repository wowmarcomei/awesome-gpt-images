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
      await clientLog.info('开始 Google 登录流程...');
      await clientLog.info('当前 URL:', window.location.href);
      
      // 直接使用当前域名作为应用 URL
      const appUrl = window.location.origin;
      await clientLog.info('Google 登录 - 当前网站域名:', appUrl);
      
      // 构建回调 URL
      const redirectUrl = `${appUrl}/auth/callback`;
      await clientLog.info('Google 登录 - 使用回调 URL:', redirectUrl);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });
      
      if (error) {
        await clientLog.error('Google 登录错误:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signInWithGitHub = async () => {
    try {
      await clientLog.info('开始 GitHub 登录流程...');
      await clientLog.info('当前 URL:', window.location.href);
      
      // 直接使用当前域名作为应用 URL
      const appUrl = window.location.origin;
      await clientLog.info('GitHub 登录 - 当前网站域名:', appUrl);
      
      // 构建回调 URL
      const redirectUrl = `${appUrl}/auth/callback`;
      await clientLog.info('GitHub 登录 - 使用回调 URL:', redirectUrl);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: redirectUrl
        }
      });
      
      if (error) {
        await clientLog.error('GitHub 登录错误:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
    }
  };

  const signInWithTwitter = async () => {
    try {
      await clientLog.info('开始 Twitter 登录流程...');
      await clientLog.info('当前 URL:', window.location.href);
      
      // 直接使用当前域名作为应用 URL
      const appUrl = window.location.origin;
      await clientLog.info('Twitter 登录 - 当前网站域名:', appUrl);
      
      // 构建回调 URL
      const redirectUrl = `${appUrl}/auth/callback`;
      await clientLog.info('Twitter 登录 - 使用回调 URL:', redirectUrl);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: redirectUrl
        }
      });
      
      if (error) {
        await clientLog.error('Twitter 登录错误:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error signing in with Twitter:', error);
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
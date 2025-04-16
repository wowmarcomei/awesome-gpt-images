'use client';

import { useState } from 'react';
import { useAuth } from '../lib/auth/context';
import { FaGoogle } from 'react-icons/fa';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export function AuthButton() {
  const { user, loading, signIn, signOut } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async (provider: 'google') => {
    try {
      setIsSigningIn(true);
      await signIn(provider);
    } catch (error) {
      console.error('登录失败:', error);
      // 在这里可以添加一个 toast 提示
    } finally {
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[150px]">
          {user.email}
        </span>
        <Button
          onClick={() => signOut()}
          variant="outline"
          size="sm"
        >
          退出登录
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => handleSignIn('google')}
      className={cn(
        "flex items-center justify-center gap-2 text-white bg-red-500 hover:bg-red-600",
        "relative",
        isSigningIn && "opacity-70 cursor-not-allowed"
      )}
      size="sm"
      disabled={isSigningIn}
    >
      <FaGoogle className="h-4 w-4" />
      <span>{isSigningIn ? '登录中...' : '使用 Google 登录'}</span>
    </Button>
  );
} 
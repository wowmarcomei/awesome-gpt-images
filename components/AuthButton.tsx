'use client';

import { useAuth } from '../lib/auth/context';
import { FaUser } from 'react-icons/fa';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import Link from 'next/link';

export function AuthButton() {
  const { user, loading, signOut } = useAuth();

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
      asChild
      variant="outline"
      size="sm"
      className={cn(
        "flex items-center justify-center gap-2",
        "text-gray-700 dark:text-gray-300",
        "hover:text-gray-900 dark:hover:text-white"
      )}
    >
      <Link href="/auth/login">
        <FaUser className="h-4 w-4" />
        <span>登录</span>
      </Link>
    </Button>
  );
} 
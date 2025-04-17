'use client';

import { useAuth } from '../lib/auth/context';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { FiUser, FiLogOut, FiLogIn } from 'react-icons/fi';
import { cn } from '../lib/utils';

interface AuthButtonProps {
  className?: string;
  onClick?: () => void;
}

export function AuthButton({ className, onClick }: AuthButtonProps) {
  const { user, signOut, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled className={className}>
        加载中...
      </Button>
    );
  }

  if (!user) {
    return (
      <Link href="/auth" className={cn("w-full", className)} onClick={onClick}>
        <Button 
          variant="outline" 
          size="sm"
          className={cn(
            "w-full h-full flex items-center justify-center",
            "md:hidden",
            "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
            "dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800",
            "text-white dark:text-white",
            "hover:text-white dark:hover:text-white",
            "border-0 outline-none ring-0 shadow-none",
            "font-medium",
            "md:w-auto md:p-2.5 md:rounded-full md:transition-all md:duration-200",
            "md:bg-gray-900 md:text-white md:dark:bg-white md:dark:text-gray-900",
            "md:hover:bg-gray-800 md:dark:hover:bg-gray-100"
          )}
        >
          <FiLogIn className="w-5 h-5" />
          <span className="md:hidden">登录</span>
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "p-2.5 rounded-full transition-all duration-200",
            "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
            "hover:bg-gray-800 dark:hover:bg-gray-100",
            className
          )}
        >
          <Avatar className="h-5 w-5">
            <AvatarImage 
              src={user.user_metadata?.avatar_url} 
              alt={user.email || ''} 
              className="object-cover"
            />
            <AvatarFallback className="text-xs bg-primary/10 text-primary dark:bg-primary/20">
              {user.email?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline text-sm truncate max-w-[100px]">
            {user.user_metadata?.full_name || user.email?.split('@')[0] || '用户'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 p-2"
      >
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={user.user_metadata?.avatar_url} 
              alt={user.email || ''} 
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-primary dark:bg-primary/20">
              {user.email?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {user.user_metadata?.full_name || '用户'}
            </span>
            <span className="text-xs text-muted-foreground truncate max-w-[160px]">
              {user.email}
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            signOut();
            onClick?.();
          }}
        >
          <FiLogOut className="w-4 h-4" />
          <span>退出登录</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
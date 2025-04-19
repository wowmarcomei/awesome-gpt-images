'use client';

import { useState, useEffect } from 'react';
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
import { Badge } from './ui/badge';
import Link from 'next/link';
import { 
  FiUser, 
  FiLogOut, 
  FiLogIn, 
  FiHeart, 
  FiStar, 
  FiSettings,
  FiHome,
  FiBell,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../lib/i18n/context';
import { useTheme } from 'next-themes';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface AuthButtonProps {
  className?: string;
  onClick?: () => void;
}

const menuItems = [
  { icon: FiHome, label: '个人主页', href: '/dashboard' },
  { icon: FiHeart, label: '我的点赞', href: '/dashboard/likes' },
  { icon: FiStar, label: '我的收藏', href: '/dashboard/bookmark' },
  { icon: FiSettings, label: '设置', href: '/settings' },
];

export function AuthButton({ className, onClick }: AuthButtonProps) {
  const { user, signOut, loading } = useAuth();
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [unreadCount, setUnreadCount] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isOpen, setIsOpen] = useState(false);

  // 模拟未读消息
  useEffect(() => {
    const interval = setInterval(() => {
      setUnreadCount(prev => Math.min(prev + 1, 99));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
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

  const UserMenu = () => (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2 p-2"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage 
            src={user.user_metadata?.avatar_url || '/examples/avatar_sample.png'} 
            alt={user.email || ''} 
            className="object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/examples/avatar_sample.png';
            }}
          />
          <AvatarFallback className="bg-primary/10 text-primary dark:bg-primary/20">
            {user.email?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {user.user_metadata?.full_name || '用户'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[160px]">
            {user.email}
          </span>
        </div>
      </motion.div>
      
      <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700" />
      
      <div className="py-1">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <DropdownMenuItem 
              className="flex items-center gap-2 cursor-pointer px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              asChild
            >
              <Link href={item.href} onClick={() => setIsOpen(false)}>
                <item.icon className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          </motion.div>
        ))}
      </div>

      <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <FiSun className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          ) : (
            <FiMoon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          )}
          <span>切换主题</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer px-2 py-2 rounded-md text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          onClick={() => {
            signOut();
            onClick?.();
            setIsOpen(false);
          }}
        >
          <FiLogOut className="w-4 h-4" />
          <span>退出登录</span>
        </DropdownMenuItem>
      </motion.div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "p-2.5 rounded-full transition-all duration-200",
              "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
              "hover:bg-gray-800 dark:hover:bg-gray-100",
              "relative overflow-hidden group",
              className
            )}
            aria-label="用户菜单"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Avatar className="h-5 w-5">
                <AvatarImage 
                  src={user.user_metadata?.avatar_url || '/examples/avatar_sample.png'} 
                  alt={user.email || ''} 
                  className="object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/examples/avatar_sample.png';
                  }}
                />
                <AvatarFallback className="text-xs bg-primary/10 text-primary dark:bg-primary/20">
                  {user.email?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </motion.div>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] p-0">
          <div className="p-4">
            <UserMenu />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "w-10 h-10 p-0 rounded-full overflow-hidden",
            "bg-gray-900 dark:bg-white",
            "hover:opacity-90 transition-opacity",
            className
          )}
          aria-label="用户菜单"
        >
          <Avatar className="w-full h-full">
            <AvatarImage 
              src={user.user_metadata?.avatar_url || '/examples/avatar_sample.png'} 
              alt={user.email || ''} 
              className="object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = '/examples/avatar_sample.png';
              }}
            />
            <AvatarFallback className="text-base font-medium bg-primary text-primary-foreground">
              <AvatarImage 
                src="/examples/avatar_sample.png"
                alt="Default avatar"
                className="object-cover"
              />
            </AvatarFallback>
          </Avatar>
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        sideOffset={8}
      >
        <UserMenu />
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
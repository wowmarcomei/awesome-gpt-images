'use client';

import { useAuth } from '../lib/auth/context';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { 
  FiUser, 
  FiLogOut, 
  FiHeart, 
  FiStar, 
  FiSettings,
  FiHome,
} from 'react-icons/fi';
import { cn } from '../lib/utils';

interface AuthButtonMobileProps {
  onItemClick?: () => void;
}

const menuItems = [
  { icon: FiHome, label: '个人主页', href: '/dashboard' },
  { icon: FiHeart, label: '我的点赞', href: '/dashboard/likes' },
  { icon: FiStar, label: '我的收藏', href: '/dashboard/favorites' },
  { icon: FiSettings, label: '设置', href: '/settings' },
];

export function AuthButtonMobile({ onItemClick }: AuthButtonMobileProps) {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          登录后可以：
        </div>
        <ul className="text-sm text-gray-500 dark:text-gray-400 list-disc pl-4 space-y-1">
          <li>收藏喜欢的提示词</li>
          <li>分享你的作品</li>
          <li>参与社区讨论</li>
        </ul>
        <Link
          href="/auth"
          className={cn(
            "flex items-center justify-center gap-2",
            "w-full h-10 px-4 rounded-xl",
            "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
            "dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800",
            "text-white"
          )}
          onClick={onItemClick}
        >
          <FiUser className="w-5 h-5" />
          <span>登录</span>
        </Link>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 用户信息 */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
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
        <div className="flex flex-col flex-1">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {user.user_metadata?.full_name || '用户'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {user.email}
          </span>
        </div>
      </div>

      {/* 菜单项 */}
      <div className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={onItemClick}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* 退出按钮 */}
      <button
        onClick={() => {
          signOut();
          onItemClick?.();
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      >
        <FiLogOut className="w-5 h-5" />
        <span className="text-sm">退出登录</span>
      </button>
    </div>
  );
} 
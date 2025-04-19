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
import { useI18n } from '../lib/i18n/context';

interface AuthButtonMobileProps {
  onItemClick?: () => void;
}

const menuItems = [
  { icon: FiHome, label: 'dashboard.profile', href: '/dashboard' },
  { icon: FiHeart, label: 'dashboard.likes', href: '/dashboard/likes' },
  { icon: FiStar, label: 'dashboard.bookmark', href: '/dashboard/bookmark' },
];

export function AuthButtonMobile({ onItemClick }: AuthButtonMobileProps) {
  const { user, signOut } = useAuth();
  const { t } = useI18n();

  if (!user) {
    return (
      <>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {t('auth.login_benefits')}:
        </div>
        <ul className="text-sm text-gray-500 dark:text-gray-400 list-disc pl-4 space-y-1">
          <li>{t('auth.benefit_bookmark')}</li>
          <li>{t('auth.benefit_share')}</li>
          <li>{t('auth.benefit_community')}</li>
        </ul>
        <Link
          href="/auth/login"
          className={cn(
            "flex items-center gap-2",
            "w-full h-10 px-4 rounded-xl",
            "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
            "dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800",
            "text-white"
          )}
          onClick={onItemClick}
        >
          <FiUser className="w-5 h-5" />
          <span>{t('auth.login')}/{t('auth.register')}</span>
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
            src={user.user_metadata?.avatar_url || '/examples/avatar_sample.png'} 
            alt={user.email || ''} 
            className="object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/examples/avatar_sample.png';
            }}
          />
          <AvatarFallback className="bg-primary/10 text-primary dark:bg-primary/20">
            <AvatarImage 
              src="/examples/avatar_sample.png"
              alt="Default avatar"
              className="object-cover"
            />
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
            className="flex items-center px-4 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={onItemClick}
          >
            <div className="w-7 flex items-center">
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">{t(item.label)}</span>
          </Link>
        ))}
      </div>

      {/* 退出按钮 */}
      <button
        onClick={() => {
          signOut();
          onItemClick?.();
        }}
        className="flex items-center px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left w-full"
      >
        <div className="w-7 flex items-center">
          <FiLogOut className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-red-500">{t('dashboard.logout')}</span>
      </button>
    </div>
  );
} 
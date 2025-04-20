'use client';

import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { ThemeToggle } from './theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '../lib/utils';
import { LanguageMenu } from './LanguageMenu';
import { LanguageMenuMobile } from './LanguageMenuMobile';
import { useTheme } from 'next-themes';
import { AuthButton } from './AuthButton';
import { useI18n } from '../lib/i18n/context';
import { useAuth } from '../lib/auth/context';
import { AuthButtonMobile } from './AuthButtonMobile';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const { user } = useAuth();

  // 处理滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 当认证状态变化时关闭移动端菜单
  useEffect(() => {
    if (user) {
      setIsOpen(false);
    }
  }, [user]);

  // 统一的菜单项点击处理函数
  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md',
          isScrolled && 'border-b border-gray-200 dark:border-gray-800'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo和标题 */}
            <div className="flex items-center gap-3">
              <Link 
                href="/"
                className="flex items-center"
              >
                <div className="relative w-12 h-12">
                  <Image
                    src="/favicon/ms-icon-310x310.png"
                    alt="Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
              <Link 
                href="/"
                className="flex items-center gap-1 text-xl font-bold text-gray-900 dark:text-white hover:opacity-90 transition-opacity"
              >
                <span className="hidden sm:inline">Awesome</span>
                <span>GPT4o Images Prompt List</span>
                <span className="text-blue-500 ml-0.5">✨</span>
              </Link>
            </div>

            {/* 桌面端导航 */}
            <nav className="hidden md:flex items-center gap-3">
              <LanguageMenu />
              <ThemeToggle />
              <a
                href="https://x.com/wowmarcomei"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2.5 rounded-full transition-all duration-200",
                  "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
                  "hover:bg-gray-800 dark:hover:bg-gray-100",
                  "focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
                )}
                aria-label="Social"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/wowmarcomei/awesome-gpt-images"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2.5 rounded-full transition-all duration-200",
                  "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
                  "hover:bg-gray-800 dark:hover:bg-gray-100",
                  "focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
                )}
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              {/* 分隔符 */}
              <div className="hidden md:block w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
              {!user && (
                <Link
                  href="/auth"
                  className={cn(
                    // 移动端样式
                    "flex items-center justify-center gap-2 w-full h-10 px-4 rounded-xl",
                    "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
                    "dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800",
                    "text-white border-0",
                    // 桌面端样式
                    "md:w-auto md:h-auto md:p-2.5 md:rounded-full",
                    "md:bg-blue-500 md:dark:bg-blue-600",
                    "md:text-white",
                    "md:hover:bg-blue-600 md:dark:hover:bg-blue-700",
                    "transition-all duration-200"
                  )}
                  aria-label="Login"
                  onClick={handleItemClick}
                >
                  <FiUser className="w-5 h-5" />
                  <span className="md:hidden">登录</span>
                </Link>
              )}
              {user && <AuthButton onClick={handleItemClick} />}
            </nav>

            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* 菜单面板 */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 z-50 md:hidden shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* 菜单头部 */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/favicon/ms-icon-310x310.png"
                      alt="Logo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                      菜单
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="关闭菜单"
                  >
                    <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                {/* 菜单内容 */}
                <div className="p-4 space-y-3">
                  <div className="flex flex-col gap-3">
                    {/* 语言切换 */}
                    <LanguageMenuMobile onItemClick={handleItemClick} />

                    {/* 主题切换 */}
                    <button
                      onClick={() => {
                        setTheme(theme === 'dark' ? 'light' : 'dark');
                        handleItemClick();
                      }}
                      className={cn(
                        "w-full flex items-center px-4 py-2.5 rounded-xl transition-all",
                        "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
                        "text-gray-900 dark:text-white"
                      )}
                    >
                      <div className="w-7 flex items-center">
                        {theme === 'dark' ? (
                          <MdLightMode className="w-5 h-5" />
                        ) : (
                          <MdDarkMode className="w-5 h-5" />
                        )}
                      </div>
                      <span className="text-sm font-medium">
                        {theme === 'dark' ? t('dashboard.lightMode') : t('dashboard.darkMode')}
                      </span>
                    </button>

                    {/* Twitter */}
                    <a
                      href="https://x.com/wowmarcomei"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleItemClick}
                      className={cn(
                        "w-full flex items-center px-4 py-2.5 rounded-xl transition-all",
                        "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
                        "text-gray-900 dark:text-white"
                      )}
                    >
                      <div className="w-7 flex items-center">
                        <FaXTwitter className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">Twitter</span>
                    </a>

                    {/* GitHub */}
                    <a
                      href="https://github.com/wowmarcomei/awesome-gpt-images"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleItemClick}
                      className={cn(
                        "w-full flex items-center px-4 py-2.5 rounded-xl transition-all",
                        "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
                        "text-gray-900 dark:text-white"
                      )}
                    >
                      <div className="w-7 flex items-center">
                        <FaGithub className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">GitHub</span>
                    </a>

                    {/* 用户认证状态 */}
                    <AuthButtonMobile onItemClick={handleItemClick} />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 
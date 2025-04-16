'use client';

import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiMenu, FiX } from 'react-icons/fi';
import { ThemeToggle } from './theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '../lib/utils';
import { LanguageSwitch } from './LanguageSwitch';
import { useTheme } from 'next-themes';
import { AuthButton } from './AuthButton';
import { useI18n } from '../lib/i18n/context';
import { useAuth } from '../lib/auth/context';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const { t } = useI18n();
  const { user, isLoading } = useAuth();

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
                <span>GPT-4 Images</span>
                <span className="text-blue-500 ml-0.5">✨</span>
              </Link>
            </div>

            {/* 桌面端导航 */}
            <nav className="hidden md:flex items-center gap-3">
              <LanguageSwitch />
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
              <AuthButton />
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 md:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                <LanguageSwitch />
                <ThemeToggle />
                <div className="flex gap-2">
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
                </div>
                <AuthButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 
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

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 处理滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                aria-label="GitHub 仓库"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </nav>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "md:hidden p-2 rounded-lg transition-colors",
                "bg-gray-100 dark:bg-gray-800",
                "text-gray-700 dark:text-gray-200",
                "hover:bg-gray-200 dark:hover:bg-gray-700",
                "border border-gray-200 dark:border-gray-700",
                "focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
              )}
              aria-label="菜单"
            >
              {isOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
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
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            {/* 菜单内容 */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 z-50 md:hidden shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">菜单</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="关闭菜单"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3">
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
                      aria-label="GitHub 仓库"
                    >
                      <FaGithub className="w-5 h-5" />
                    </a>
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
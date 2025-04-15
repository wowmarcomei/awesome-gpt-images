'use client';

import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { ThemeToggle } from './theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 md:py-6">
            {/* Logo和标题 */}
            <Link 
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white"
            >
              <span className="hidden sm:inline">Awesome</span>
              <span>GPT-4 Images</span>
              <span className="text-blue-500">✨</span>
            </Link>

            {/* 桌面端导航 */}
            <nav className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <a
                href="https://github.com/wowmarcomei/awesome-gpt-images"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-gray-100 dark:hover:bg-gray-700/90 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 ease-in-out backdrop-blur-sm"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </nav>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
              className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 z-50 md:hidden shadow-xl"
            >
              <div className="flex flex-col p-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-col space-y-4 mt-4">
                  <ThemeToggle />
                  <a
                    href="https://github.com/wowmarcomei/awesome-gpt-images"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 
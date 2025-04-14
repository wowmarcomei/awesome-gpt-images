'use client';

import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 避免水合不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed md:absolute top-4 right-[120px] p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-gray-100 dark:hover:bg-gray-700/90 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 ease-in-out backdrop-blur-sm z-50"
      aria-label="切换主题"
    >
      {theme === 'dark' ? (
        <FiSun className="w-5 h-5 text-yellow-500 hover:text-yellow-600 transition-colors" />
      ) : (
        <FiMoon className="w-5 h-5 text-gray-700 hover:text-gray-800 transition-colors" />
      )}
    </button>
  );
} 
'use client';

import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

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
      className={cn(
        "p-2.5 rounded-full transition-all duration-200",
        "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
        "hover:bg-gray-800 dark:hover:bg-gray-100",
        "focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
      )}
      aria-label="切换主题"
    >
      {theme === 'dark' ? (
        <FiSun className="w-5 h-5" />
      ) : (
        <FiMoon className="w-5 h-5" />
      )}
    </button>
  );
} 
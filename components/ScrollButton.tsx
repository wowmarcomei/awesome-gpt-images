'use client';

import { useState, useEffect } from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { cn } from '../lib/utils';

export function ScrollButton() {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUpNow = currentScrollY < lastScrollY;
      
      // 只有当滚动超过 100px 时才显示按钮
      setIsVisible(currentScrollY > 100);
      setIsScrollingUp(isScrollingUpNow);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleClick = () => {
    const targetPosition = isScrollingUp ? 0 : document.documentElement.scrollHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed right-6 z-40 p-2.5 rounded-full transition-all duration-200",
        "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
        "hover:bg-gray-800 dark:hover:bg-gray-100",
        "focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700",
        "shadow-lg",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        "bottom-6 md:bottom-8"
      )}
      aria-label={isScrollingUp ? "返回顶部" : "滚动到底部"}
    >
      {isScrollingUp ? (
        <FiArrowUp className="w-5 h-5" />
      ) : (
        <FiArrowDown className="w-5 h-5" />
      )}
    </button>
  );
} 
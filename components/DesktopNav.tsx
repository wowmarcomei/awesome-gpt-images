'use client';

import { FaGithub, FaShareAlt } from 'react-icons/fa';
import { ThemeToggle } from './theme-toggle';

interface Props {
  onShare: () => void;
}

export function DesktopNav({ onShare }: Props) {
  return (
    <div className="hidden lg:flex fixed top-4 right-4 items-center gap-4 z-50">
      <ThemeToggle />
      <a
        href="https://github.com/wowmarcomei/awesome-gpt-images"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-gray-100 dark:hover:bg-gray-700/90 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 ease-in-out backdrop-blur-sm"
      >
        <FaGithub className="w-5 h-5" />
      </a>
      <button
        onClick={onShare}
        className="p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-gray-100 dark:hover:bg-gray-700/90 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 ease-in-out backdrop-blur-sm"
      >
        <FaShareAlt className="w-5 h-5" />
      </button>
    </div>
  );
} 
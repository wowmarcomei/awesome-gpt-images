'use client';

import { useState } from 'react';
import { FaTwitter, FaGithub, FaShareAlt, FaBars, FaTimes } from 'react-icons/fa';
import { ThemeToggle } from './theme-toggle';

interface Author {
  name: string;
  count: number;
  twitter: string;
}

interface Props {
  authors: Author[];
  selectedAuthor: string | null;
  onAuthorClick: (name: string) => void;
  onShare: () => void;
}

export function MobileDrawer({ authors, selectedAuthor, onAuthorClick, onShare }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 汉堡菜单按钮 - 仅在移动端显示 */}
      <button
        onClick={toggleDrawer}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
        aria-label="菜单"
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <FaBars className="w-6 h-6" />
        )}
      </button>

      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleDrawer}
        />
      )}

      {/* 抽屉菜单 */}
      <div className={`
        lg:hidden fixed top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-gray-800 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full px-4 py-16 overflow-y-auto">
          {/* 创作者列表 */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              创作者
            </h2>
            <div className="space-y-1">
              {authors.map((author) => (
                <button
                  key={author.name}
                  onClick={() => {
                    onAuthorClick(author.name);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-sm ${
                    selectedAuthor === author.name
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FaTwitter className="w-4 h-4" />
                    <span>{author.name}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-opacity-50 bg-gray-200 dark:bg-gray-700">
                    {author.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 操作按钮组 */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/wowmarcomei/awesome-gpt-images"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <button
                onClick={() => {
                  onShare();
                  setIsOpen(false);
                }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <FaShareAlt className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
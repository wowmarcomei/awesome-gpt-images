'use client';

import { useState, useMemo } from 'react';
import CaseCard from '../components/CaseCard';
import { cases, authors } from '../lib/data';
import TabFilter from '../components/TabFilter';
import { FaTwitter, FaGithub, FaShareAlt } from 'react-icons/fa';
import { MobileDrawer } from '../components/MobileDrawer';
import { DesktopNav } from '../components/DesktopNav';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  // 提取所有唯一的标签
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    cases.forEach(caseData => {
      caseData.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, []);

  // 提取所有唯一的作者
  const authors = useMemo(() => {
    const authorMap = new Map<string, { name: string; twitter: string; count: number }>();
    cases.forEach(caseData => {
      const author = caseData.author;
      if (!authorMap.has(author.name)) {
        authorMap.set(author.name, { ...author, count: 1 });
      } else {
        const current = authorMap.get(author.name)!;
        authorMap.set(author.name, { ...current, count: current.count + 1 });
      }
    });
    return Array.from(authorMap.values());
  }, []);

  // 根据搜索词、标签和作者筛选案例
  const filteredCases = useMemo(() => {
    return cases.filter(caseData => {
      const matchesSearch = searchTerm === '' || 
        caseData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseData.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseData.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTag = !selectedTag || caseData.tags.includes(selectedTag);
      const matchesAuthor = !selectedAuthor || caseData.author.name === selectedAuthor;
      
      return matchesSearch && matchesTag && matchesAuthor;
    });
  }, [searchTerm, selectedTag, selectedAuthor]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    if (tag === '全部') {
      setSelectedTag(null);
    } else {
      setSelectedTag(selectedTag === tag ? null : tag);
    }
  };

  const handleAuthorClick = (authorName: string) => {
    setSelectedAuthor(selectedAuthor === authorName ? null : authorName);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Awesome GPT-4 Images',
          text: '精选 GPT-4 Vision 图像创作案例展示',
          url: window.location.href,
        });
      } catch (error) {
        console.log('分享失败');
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {/* 移动端抽屉菜单 */}
      <MobileDrawer
        authors={authors}
        selectedAuthor={selectedAuthor}
        onAuthorClick={(name) => setSelectedAuthor(name === selectedAuthor ? null : name)}
        onShare={handleShare}
      />

      {/* 桌面端导航 */}
      <DesktopNav onShare={handleShare} />

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Awesome GPT-4 Images ✨
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧作者列表 - 仅在桌面端显示 */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                创作者
              </h2>
              <div className="space-y-1.5">
                {authors.map((author) => (
                  <button
                    key={author.name}
                    onClick={() => setSelectedAuthor(author.name === selectedAuthor ? null : author.name)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      selectedAuthor === author.name
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        selectedAuthor === author.name
                          ? 'bg-blue-400'
                          : 'bg-blue-50 dark:bg-gray-700'
                      }`}>
                        <FaTwitter className={`${
                          selectedAuthor === author.name
                            ? 'text-white'
                            : 'text-blue-500 dark:text-blue-400'
                        }`} />
                      </div>
                      <span className="font-medium">{author.name}</span>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-xs ${
                      selectedAuthor === author.name
                        ? 'bg-blue-400 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {author.count}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 主要内容区域 */}
          <div className="flex-1">
            <div className="max-w-2xl mx-auto mb-8">
              <input
                type="text"
                placeholder="搜索案例..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <TabFilter
              tags={allTags}
              activeTag={selectedTag || '全部'}
              onTagChange={handleTagClick}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
              {filteredCases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  case={caseItem}
                  onTagClick={handleTagClick}
                />
              ))}
            </div>

            {filteredCases.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                没有找到匹配的案例
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              {/* 项目信息 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaGithub className="w-5 h-5" />
                  项目信息
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  本项目旨在收集和展示优秀的 GPT-4 Vision 图像创作案例，为创作者提供灵感和参考。
                </p>
                <a
                  href="https://github.com/wowmarcomei/awesome-gpt-images"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                  访问项目
                </a>
              </div>

              {/* 灵感来源 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="i-carbon-idea w-5 h-5" />
                  灵感来源
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  感谢 jamez-bondos 的开源项目提供灵感，启发了本项目的开发。
                </p>
                <a
                  href="https://github.com/jamez-bondos/awesome-gpt4o-images"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                  原项目
                </a>
              </div>

              {/* 创作者 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaTwitter className="w-5 h-5 text-blue-400" />
                  创作者
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  感谢以下创作者的精彩分享和贡献
                </p>
                <div className="flex flex-wrap gap-2">
                  {authors.map((author) => (
                    <a
                      key={author.name}
                      href={author.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      <FaTwitter className="w-3.5 h-3.5" />
                      {author.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 底部版权信息 */}
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>© {new Date().getFullYear()} Awesome GPT-4 Images</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
} 
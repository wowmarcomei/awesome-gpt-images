'use client';

import { useState, useMemo } from 'react';
import CaseCard from '../components/CaseCard';
import { cases } from '../lib/data';
import TabFilter from '../components/TabFilter';
import { FaTwitter, FaGithub, FaShareAlt } from 'react-icons/fa';

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
    const shareData = {
      title: 'Awesome GPT-4 Images',
      text: '收集整理 GPT-4 Vision 图像创作精选案例，激发你的创作灵感！',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
      }
    } catch (err) {
      console.error('分享失败:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* 顶部操作栏 */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
          <a
            href="https://github.com/wowmarcomei/awesome-gpt-images"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <FaGithub className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </a>
          <button
            onClick={handleShare}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <FaShareAlt className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Awesome GPT-4 Images ✨
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧作者列表 - 在移动端变为可折叠面板 */}
          <div className="w-full lg:w-72 lg:shrink-0">
            <div className="sticky top-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                创作者
              </h2>
              <div className="space-y-1.5">
                {authors.map((author) => (
                  <button
                    key={author.name}
                    onClick={() => handleAuthorClick(author.name)}
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
      </div>
    </main>
  );
} 
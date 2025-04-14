'use client';

import { useState, useMemo } from 'react';
import CaseCard from '../components/CaseCard';
import { cases } from '../lib/data';
import TabFilter from '../components/TabFilter';
import { FaTwitter } from 'react-icons/fa';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

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

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Awesome GPT-4 Images ✨
        </h1>

        <div className="flex gap-8">
          {/* 左侧作者列表 */}
          <div className="w-64 shrink-0">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">作者</h2>
            <div className="space-y-2">
              {authors.map((author) => (
                <button
                  key={author.name}
                  onClick={() => handleAuthorClick(author.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedAuthor === author.name
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FaTwitter className="text-blue-400" />
                    <span>{author.name}</span>
                  </div>
                  <span className="text-xs opacity-70">({author.count})</span>
                </button>
              ))}
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
            
            {(selectedTag || selectedAuthor) && (
              <div className="mb-6 flex items-center justify-center gap-2">
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    标签: {selectedTag}
                    <span className="ml-2 text-sm">×</span>
                  </button>
                )}
                {selectedAuthor && (
                  <button
                    onClick={() => setSelectedAuthor(null)}
                    className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    作者: {selectedAuthor}
                    <span className="ml-2 text-sm">×</span>
                  </button>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
'use client';

import { useState, useMemo } from 'react';
import CaseCard from '../components/CaseCard';
import { cases } from '../lib/data';
import TabFilter from '../components/TabFilter';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 提取所有唯一的标签
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    cases.forEach(caseData => {
      caseData.tags.forEach(tag => tagSet.add(tag));
    });
    return ['全部', ...Array.from(tagSet)];
  }, []);

  // 根据搜索词和标签筛选案例
  const filteredCases = useMemo(() => {
    return cases.filter(caseData => {
      const matchesSearch = searchTerm === '' || 
        caseData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseData.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseData.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTag = !selectedTag || caseData.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 处理标签点击（包括卡片上的标签和顶部标签栏）
  const handleTagClick = (tag: string) => {
    if (tag === '全部') {
      setSelectedTag(null);
    } else {
      setSelectedTag(selectedTag === tag ? null : tag);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Awesome GPT-4 Images ✨
        </h1>
        
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
        
        {selectedTag && (
          <div className="container mx-auto mb-6 flex items-center justify-center">
            <button
              onClick={() => setSelectedTag(null)}
              className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              清除筛选: {selectedTag}
              <span className="ml-2 text-sm">×</span>
            </button>
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
    </main>
  );
} 
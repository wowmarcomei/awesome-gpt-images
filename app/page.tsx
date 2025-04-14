'use client';

import { useState, useMemo } from 'react';
import { cases } from '../lib/data';
import CaseCard from '../components/CaseCard';
import TabFilter from '../components/TabFilter';
import { Case } from '../types';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('全部');

  // 提取所有唯一的标签
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    cases.forEach(caseData => {
      caseData.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, []);

  // 根据搜索词和标签筛选案例
  const filteredCases = useMemo(() => {
    return cases.filter(caseData => {
      const matchesSearch = 
        caseData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseData.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseData.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTag = activeTag === '全部' || caseData.tags.includes(activeTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, activeTag]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Awesome GPT-4o Images ✨
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
          activeTag={activeTag}
          onTagChange={setActiveTag}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseData) => (
            <CaseCard key={caseData.id} case={caseData} />
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
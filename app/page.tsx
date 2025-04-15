'use client';

import { useState, useMemo } from 'react';
import CaseCard from '../components/CaseCard';
import { cases, authors } from '../lib/data';
import { CategoryFilter } from '../components/CategoryFilter';
import { categories } from '../lib/categories';
import { FaGithub, FaShareAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Pagination from '../components/Pagination';
import { useI18n } from '../lib/i18n/context';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 每页显示9个卡片
  const { t } = useI18n();

  // 提取所有唯一的标签
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    cases.forEach(caseData => {
      caseData.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [cases]);

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
  }, [cases]);

  // 处理分类变化
  const handleCategoryChange = (categoryId: string, subCategoryId: string) => {
    const newSelected = new Set(selectedCategories);
    
    if (categoryId === '' && subCategoryId === '') {
      // 清除所有选择
      newSelected.clear();
    } else if (categoryId === '') {
      // 从卡片点击 Tag
      // 查找对应的分类和子分类
      let found = false;
      const tagLower = subCategoryId.toLowerCase();
      
      // 遍历所有分类
      for (const category of categories) {
        for (const subCategory of category.subcategories) {
          // 使用 name 进行匹配，而不是 id
          if (subCategory.name.toLowerCase() === tagLower) {
            const key = `${category.id}::${subCategory.id}`;
            newSelected.clear(); // 清除之前的选择
            newSelected.add(key);
            found = true;
            break;
          }
        }
        if (found) break;
      }
    } else {
      // 从分类筛选器点击
      const key = `${categoryId}::${subCategoryId}`;
      if (newSelected.has(key)) {
        // 取消选择
        newSelected.delete(key);
      } else {
        // 添加选择
        newSelected.clear(); // 清除之前的选择
        newSelected.add(key);
      }
    }
    
    setSelectedCategories(newSelected);
    setCurrentPage(1); // 重置页码
  };

  // 根据搜索词和分类筛选案例
  const filteredCases = useMemo(() => {
    return cases.filter(caseData => {
      const matchesSearch = searchTerm === '' || 
        caseData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseData.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseData.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategories = selectedCategories.size === 0 || 
        caseData.tags.some(tag => 
          Array.from(selectedCategories).some(selectedCategory => {
            const [categoryId, subCategoryId] = selectedCategory.split('::');
            const category = categories.find(c => c.id === categoryId);
            const subCategory = category?.subcategories.find(sc => sc.id === subCategoryId);
            // 使用 name 进行匹配，而不是 id
            return tag.toLowerCase() === subCategory?.name.toLowerCase();
          })
        );
      
      const matchesAuthor = !selectedAuthor || caseData.author.name === selectedAuthor;
      
      return matchesSearch && matchesCategories && matchesAuthor;
    });
  }, [searchTerm, selectedCategories, selectedAuthor, cases, categories]);

  // 计算分页数据
  const paginatedCases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCases.slice(startIndex, endIndex);
  }, [filteredCases, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAuthorClick = (authorName: string) => {
    setSelectedAuthor(selectedAuthor === authorName ? null : authorName);
    setCurrentPage(1);
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
                {t('footer.creators.title')}
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
                        <FaXTwitter className={`${
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
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              {/* 移动端作者筛选下拉菜单 */}
              <select
                value={selectedAuthor || ''}
                onChange={(e) => setSelectedAuthor(e.target.value || null)}
                className="lg:hidden w-full mt-4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t('common.allAuthors')}</option>
                {authors.map((author) => (
                  <option key={author.name} value={author.name}>
                    {author.name} ({author.count})
                  </option>
                ))}
              </select>
            </div>

            <CategoryFilter
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
              {paginatedCases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  case={caseItem}
                  onTagClick={(tag) => handleCategoryChange('', tag)}
                />
              ))}
            </div>

            {filteredCases.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {t('common.noResults')}
              </div>
            )}

            {filteredCases.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
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
                  {t('footer.projectInfo.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('footer.projectInfo.description')}
                </p>
                <a
                  href="https://github.com/wowmarcomei/awesome-gpt-images"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                  {t('footer.projectInfo.visitProject')}
                </a>
              </div>

              {/* 灵感来源 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="i-carbon-idea w-5 h-5" />
                  {t('footer.inspiration.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('footer.inspiration.description')}
                </p>
                <a
                  href="https://github.com/jamez-bondos/awesome-gpt4o-images"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                  {t('footer.inspiration.originalProject')}
                </a>
              </div>

              {/* 创作者 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaXTwitter className="w-5 h-5 text-blue-400" />
                  {t('footer.creators.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('footer.creators.description')}
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
                      <FaXTwitter className="w-3.5 h-3.5" />
                      {author.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 底部版权信息 */}
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>{t('footer.copyright')}</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
} 
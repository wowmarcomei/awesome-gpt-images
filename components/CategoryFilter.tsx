'use client';

import { useState } from 'react';
import { Category, SubCategory, categories } from '../lib/categories';
import { cn } from '../lib/utils';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';

interface CategoryFilterProps {
  onCategoryChange: (categoryId: string, subCategoryId: string) => void;
  selectedCategories: Set<string>;
}

export function CategoryFilter({ onCategoryChange, selectedCategories }: CategoryFilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleSubCategoryClick = (categoryId: string, subCategoryId: string) => {
    onCategoryChange(categoryId, subCategoryId);
  };

  return (
    <div className="space-y-4">
      {/* 主分类行 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('', '')}
          className={cn(
            "h-9 px-5 rounded-full text-sm font-medium transition-all duration-200",
            selectedCategories.size === 0
              ? "bg-blue-500 text-white shadow-sm hover:bg-blue-600"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800"
          )}
        >
          全部
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={cn(
              "h-9 px-5 rounded-full text-sm font-medium transition-all duration-200",
              expandedCategories.has(category.id)
                ? "bg-gray-900 text-white shadow-sm dark:bg-white dark:text-gray-900"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800",
              "flex items-center gap-1.5"
            )}
          >
            {category.name}
            {expandedCategories.has(category.id) ? (
              <FiChevronUp className="w-4 h-4 opacity-80" />
            ) : (
              <FiChevronDown className="w-4 h-4 opacity-80" />
            )}
          </button>
        ))}
      </div>

      {/* 已选标签 */}
      {selectedCategories.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">已选择：</span>
          {Array.from(selectedCategories).map(id => {
            const [categoryId, subCategoryId] = id.split('::');
            const category = categories.find(c => c.id === categoryId);
            const subCategory = category?.subcategories.find(sc => sc.id === subCategoryId);
            if (!category || !subCategory) return null;
            
            return (
              <button
                key={id}
                onClick={() => handleSubCategoryClick(categoryId, subCategoryId)}
                className="inline-flex items-center gap-1.5 h-7 px-3 text-xs font-medium rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
              >
                {subCategory.name}
                <FiX className="w-3.5 h-3.5" />
              </button>
            );
          })}
          <button
            onClick={() => onCategoryChange('', '')}
            className="h-7 px-3 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            清除全部
          </button>
        </div>
      )}

      {/* 子分类区域 */}
      <div className="space-y-3">
        {categories.map((category) => (
          expandedCategories.has(category.id) && (
            <div key={category.id} className="pl-4 space-y-2">
              <div className="flex flex-wrap gap-2">
                {category.subcategories.map((subCategory) => {
                  const isSelected = selectedCategories.has(`${category.id}::${subCategory.id}`);
                  return (
                    <button
                      key={subCategory.id}
                      onClick={() => handleSubCategoryClick(category.id, subCategory.id)}
                      className={cn(
                        "h-8 px-4 rounded-full text-sm font-medium transition-colors",
                        isSelected
                          ? "bg-blue-500 text-white shadow-sm hover:bg-blue-600"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800"
                      )}
                    >
                      {subCategory.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
} 
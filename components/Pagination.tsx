import { cn } from '../lib/utils';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // 生成要显示的页码数组
  const getPageNumbers = () => {
    const delta = 1; // 当前页前后显示的页码数
    const range = [];
    const rangeWithDots = [];
    let l;

    // 计算需要显示的页码范围
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // 第一页
        i === totalPages || // 最后一页
        i >= currentPage - delta && i <= currentPage + delta // 当前页前后的页码
      ) {
        range.push(i);
      }
    }

    // 添加省略号
    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          // 如果页码间隔为2，则添加中间的页码
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          // 如果页码不连续，添加省略号
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center items-center gap-2 my-8">
      {/* 移动端显示 */}
      <div className="flex md:hidden items-center gap-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
            'bg-white dark:bg-gray-800',
            'border border-gray-200 dark:border-gray-700',
            'text-gray-900 dark:text-white',
            'hover:bg-gray-100 dark:hover:bg-gray-700',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="上一页"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
            'bg-white dark:bg-gray-800',
            'border border-gray-200 dark:border-gray-700',
            'text-gray-900 dark:text-white',
            'hover:bg-gray-100 dark:hover:bg-gray-700',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="下一页"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 桌面端显示 */}
      <div className="hidden md:flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
            'bg-white dark:bg-gray-800',
            'border border-gray-200 dark:border-gray-700',
            'text-gray-900 dark:text-white',
            'hover:bg-gray-100 dark:hover:bg-gray-700',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="上一页"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span
                key={`dots-${index}`}
                className="w-10 h-10 flex items-center justify-center text-gray-400 dark:text-gray-500"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(Number(page))}
                className={cn(
                  'w-10 h-10 rounded-lg transition-colors',
                  'border border-gray-200 dark:border-gray-700',
                  currentPage === page
                    ? 'bg-blue-500 text-white border-blue-500 dark:border-blue-500'
                    : [
                        'bg-white dark:bg-gray-800',
                        'text-gray-900 dark:text-white',
                        'hover:bg-gray-100 dark:hover:bg-gray-700'
                      ]
                )}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
            'bg-white dark:bg-gray-800',
            'border border-gray-200 dark:border-gray-700',
            'text-gray-900 dark:text-white',
            'hover:bg-gray-100 dark:hover:bg-gray-700',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="下一页"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
} 
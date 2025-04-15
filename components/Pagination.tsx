import { cn } from '../lib/utils';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
          'bg-white dark:bg-gray-800',
          'border border-gray-200 dark:border-gray-700',
          'text-gray-900 dark:text-gray-100',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        aria-label="上一页"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'w-10 h-10 rounded-lg transition-colors',
              'border border-gray-200 dark:border-gray-700',
              currentPage === page
                ? 'bg-blue-500 text-white border-blue-500 dark:border-blue-500'
                : [
                    'bg-white dark:bg-gray-800',
                    'text-gray-900 dark:text-gray-100',
                    'hover:bg-gray-100 dark:hover:bg-gray-700'
                  ]
            )}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
          'bg-white dark:bg-gray-800',
          'border border-gray-200 dark:border-gray-700',
          'text-gray-900 dark:text-gray-100',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        aria-label="下一页"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
} 
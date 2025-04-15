import { cn } from '../lib/utils';

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
          'px-4 py-2 rounded-lg transition-colors',
          'border border-gray-200 dark:border-gray-700',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        上一页
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
                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
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
          'px-4 py-2 rounded-lg transition-colors',
          'border border-gray-200 dark:border-gray-700',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        下一页
      </button>
    </div>
  );
} 